import express from 'express'
import { pick, merge } from 'ramda'
import formidable from 'formidable'
import { red, blue, yellow } from '../logger'
import path from 'path'
import fs from 'fs'
import S3 from 'aws-sdk/clients/s3'

const router = express.Router()
const bucketName = 'upload-to-s3-ex'
const bucketRegion = 'us-west-2'
const baseUrl = `https://s3-${bucketRegion}.amazonaws.com/${bucketName}/`
const s3 = new S3({region: bucketRegion})

const getDateAndTime = () => {
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth() + 1 // January is 0!
  var yyyy = today.getFullYear()

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = mm + '-' + dd + '-' + yyyy + '-' + today.getTime()
  return today
}

const checkDirectoryExists = (dir) => {
  try {
    fs.statSync(dir)
  } catch (e) {
    fs.mkdirSync(dir)
  }
}

const shapeData = (data) => {
  const withUrl = data.Contents.map(i => {
    return merge(i, { url: `${baseUrl}${i.Key}`})
  })
  const o = { images: withUrl, nextToken: data.NextContinuationToken}
  // yellow('o', o)
  return o
}

router.get('/', async (req, res) => {
  const maxKeys = 10
  try {
    const params = {
      Bucket: bucketName,
      MaxKeys: 10
    }
    const data = await s3.listObjectsV2(params).promise()
    const shapedData = shapeData(data)
    res.send(shapedData)
  }
  catch (e) {
    red('ERROR', e.stack)
    res.status(400).send(e)
  }
})

router.delete('/:key', async (req, res) => {
  try {
    const key = req.params.key
    yellow('delete: key', key)
    const params = {
      Bucket: bucketName,
      Key: key,
    }
    const data = s3.deleteObject(params).promise()
    // data is always {} so send the key back as the response

    res.send({ Key: key, action: 'deleteOne'})
  }
  catch (e) {
    res.status(400).send()
  }

})



router.post('/', async (req, res) => {
  try {
    const form = new formidable.IncomingForm()
    let newFileName = undefined
    let dirName = 'uploads'

    form.multiples = true
    form.uploadDir = path.join(__dirname, `../${dirName}`)
    checkDirectoryExists(dirName)

    form.on('file', function (field, file) {
      red('** form.on.file')
      const fname = file.name
      const newName = fname.substring(0, fname.lastIndexOf('.')) + '-' + getDateAndTime() + fname.substring(fname.lastIndexOf('.'))
      newFileName = path.join(form.uploadDir, newName)
      fs.rename(file.path, newFileName, function () {
        fs.readFile(newFileName, (err, data) => {
          if (err) throw err
          const s3 = new S3()
          const params = { Bucket: bucketName, Key: newName, Body: data }
          s3.upload(params, function (err, data) {
            red('done', `${err}, ${data}`)
            const ret = pick(['Location', 'Key'], data)
            res.send(ret)
          })
        })
        fs.unlink(newFileName, (err) => {
          if (err) {
            red('error while deleting', err)
          }
          // console.log('Successfully deleted ', newFileName)
        })
      })
    })
    form.on('error', function (err) {
      red('An error has occured: \n' + err)
    })
    form.on('end', function () {
      // red('** form.on.end')
      // res.status(200).send({"message": "done"})
    })
    form.parse(req)
  } catch (e) {
    // red('events.route: post', e)
    red('error', e)
    res.status(400).send(e)
  }
})

export default router
