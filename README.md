# Upload Images to AWS S3

A demo app for uploading, listing and deleting images in an AWS S3 bucket using (primarily)
- Client:  React, Redux, react-dropzone & react-jss
- Server: AWS SDK, Express

Server uses async/await for all calls. [pify](https://www.npmjs.com/package/pify) is used to promisify NodeJS calls.

<a href="http://www.youtube.com/watch?feature=player_embedded&v=YOUTUBE_VIDEO_ID_HERE
" target="_blank"><img src="https://github.com/klequis/upload-to-s3-ex/blob/master/screenshot.png"
alt="upload to s3 app screenshot" width="630" height="828" border="10" /></a>


## Usage
To run the app you will need an AWS account & a S3 bucket with proper access. There are more than one way to handle AWS credentials. For this app I have the keys in ~/.aws. Doing otherwise may require a code change. Consult the AWS documentation for more information.

```js
$ git clone https://github.com/klequis/upload-to-s3-ex.git
$ cd server
$ yarn install
$ yarn start
// new terminal
$ cd client
$ yarn install
$ yarn start
```
- Create a .env file using server/dot-env-sample as a template


### Helpful links
- https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html
- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html
- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html

## Actions

File: src/store/image-actions.js

| Name | Key | Public/Private |
| ---- | --- | -------------- |
| imagesRead | imagesReadKey | Private |
| imagesReadRequest | imagesReadRequest | Public |
| uploadOneImage | uploadOneImageKey | Private |
| imageUploadOneRequest | imageUploadOneRequestKey | Public |
| imagesDeleteOne | imagesDeleteOneKey | Private |
| imagesDeleteOneRequest | imagesDeleteOneRequestKey | Private |

## Reducers
| Name | Keys | File |
| ---- | ---- | ---- |
| imageUpload | imageUploadOneKey | src/store/reducers/image-reducers.js |
| images | imagesReadKey, imagesDeleteOneKey | src/store/reducers/image-reducers.js |

## Selectors
| Name | Returns |
| ---- | ------- |
| getUploadedImageUrl | URL of most recently uploaded image |
| getUploadedImageName | Name of most recently uploaded image |
| getImages | List of all images in bucket |