import express from 'express'
import { pick, merge } from 'ramda'
import formidable from 'formidable'
import { red, blue, yellow } from '../logger'
import path from 'path'
import fs from 'fs'
import S3 from 'aws-sdk/clients/s3'
import { Route53Resolver } from 'aws-sdk/clients/all';

require('dotenv').config()


const router = express.Router()
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const baseUrl = `https://s3-${bucketRegion}.amazonaws.com/${bucketName}/`
const s3 = new S3({region: bucketRegion})

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

const parseFileName = (fullName) => {
  const lastDot = fullName.lastIndexOf('.')
  const len = fullName.length
  const name = fullName.slice(0, lastDot)
  const extension = fullName.slice(lastDot + 1, len)
  return { name, extension}
}

const addTimestamp = (fileName) => {
  yellow('fileName', fileName)
  const fileParts = parseFileName(fileName)
  return `${fileParts.name}-${Date.now()}.${fileParts.extension}`


}


router.post('/', async (req, res) => {
  try {
    const form = new formidable.IncomingForm()
    let newFileName = undefined
    let dirName = 'uploads'

    form.multiples = true
    form.uploadDir = path.join(__dirname, `../${dirName}`)
    checkDirectoryExists(dirName)

    form.on('file', function (field, file) {
      const fname = file.name

      // const newName = fname.substring(0, fname.lastIndexOf('.')) + '-' + getDateAndTime() + fname.substring(fname.lastIndexOf('.'))
      const newName = addTimestamp(fname)
      yellow('newName', newName)
      newFileName = path.join(form.uploadDir, newName)
      fs.rename(file.path, newFileName, function () {
        fs.readFile(newFileName, (err, data) => {
          if (err) throw err
          const s3 = new S3()
          const params = { Bucket: bucketName, Key: newName, Body: data }
          s3.upload(params, function (err, data) {
            // should be checking for an error here :(

            // res.status(400).send(e)
            if (err) {
              red('err', err)
            }
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
