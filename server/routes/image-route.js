import express from 'express'
import { pick, merge } from 'ramda'
import formidable from 'formidable'
import path from 'path'
import S3 from 'aws-sdk/clients/s3'
import {
  fileExists,
  addTimestampToFileName,
  dirExists,
  makeDir,
  readFile,
  renameFile,
  unlinkFile,
} from '../lib/fileSys'
import {
  isUrl,
} from '../lib/isUrl'
import {
  hasProp,
} from '../lib/hasProp'

import { red, blue, yellow, green } from '../logger'

require('dotenv').config()

const router = express.Router()
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const baseUrl = `https://s3-${bucketRegion}.amazonaws.com/${bucketName}/`
const s3 = new S3({ apiVersion: '2006-03-01', region: bucketRegion })
const errorTag = 'Error (image-route: form.on): '

const shapeData = (data) => {
  const withUrl = data.Contents.map(i => {
    return merge(i, { url: `${baseUrl}${i.Key}`})
  })
  return { images: withUrl, nextToken: data.NextContinuationToken}
}

const checkData = (obj) => {
  if (hasProp('Key', obj) && hasProp('Location', obj)) {
    if ((obj.Key.length > 0) && isUrl(obj.Location)) {
      return true
    }
  } else {
    return false
  }
}

router.post('/', async (req, res) => {
  try {
    const form = new formidable.IncomingForm()
    let newFileName = undefined
    let dirName = 'uploads'
    form.multiples = true
    form.uploadDir = path.join(__dirname, `../${dirName}`)
    form.parse(req)
    if (!await dirExists(dirName)) {
      await makeDir(dirName)
    }
    form.on('file', async (field, file) => {
      const fname = file.name // white-horse.jpg
      const newName = addTimestampToFileName(fname)
      newFileName = path.join(form.uploadDir, newName)
      await renameFile(file.path, newFileName)
      const data = await readFile(newFileName)
      const params = { Bucket: bucketName, Key: newName, Body: data }
      const upload = await s3.upload(params).promise()
      if (!checkData) {
        res.status(400).send({ error: `${errorTag} Unknown returned data ${upload}`})
      }
      const ret = pick(['Location', 'Key'], upload)
      unlinkFile(newFileName)
      res.send(ret)
    })
    form.on('error', function (err) {
      red('Error (image-route: form.on)', err)
    })

  } catch (e) {
    // eslint-disable-next-line
    red("ERROR (image-route.router.post('/')", e)
    res.status(400).send(e)
  }
})


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
    // yellow('delete: key', key)
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

export default router
