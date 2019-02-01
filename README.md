


## To Do
- [ ] did not capture the focus and hover styles for the Raised button - do so
- [ ] change request-reducers.imagesList to 'images'
- [ ] finish readme

## Requirements
1. An AWS account
1. An AWS S3 bucket configured to accept uploads
1. Credentials: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html


## Actions

File: src/store/image-actions.js

| Name | Key | Public/Private |
| ---- | --- | -------------- |
| imagesList | imagesListKey | Private |
| imagesListRequest | imagesListRequest | Public |
| uploadOneImage | uploadOneImageKey | Private |
| imageUploadOneRequest | imageUploadOneRequestKey | Public |
| imagesDeleteOne | imagesDeleteOneKey | Private |
| imagesDeleteOneRequest | imagesDeleteOneRequestKey | Private |

## Reducers
| Name | Keys | File |
| ---- | ---- | ---- |
| imageUpload | imageUploadOneKey | src/store/reducers/image-reducers.js |
| imagesList | imagesListKey, imagesDeleteOneKey | src/store/reducers/image-reducers.js |

## Selectors
| Name | Returns |
| ---- | ------- |
| getUploadedImageUrl | URL of most recently uploaded image |
| getUploadedImageName | Name of most recently uploaded image |
| getImages | List of all images in bucket |