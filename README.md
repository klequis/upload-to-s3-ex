


## To Do
- [ ] vertically center name text in row. How to use flex box with textOverflow?
- [x] files are being uploaded but UI is not showing them. Error in console: Failed to load resource ...
- [ ] did not capture the focus and hover styles for the Raised button - do so
- [ ] handle s3 upload error
- [ ] change request-reducers.imagesList to 'images'
- [ ] finish readme

## Requirements
1. An AWS account
1. An AWS S3 bucket configured to accept uploads
1. Credentials - in home directory
### Helpful links
- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html
- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html
- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html


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