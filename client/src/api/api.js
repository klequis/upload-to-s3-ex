import { fetchJson, fetchUploadImage } from './api-helpers'

/* Dev */
// eslint-disable-next-line
import { pink } from 'logger'

export default {
  images: {
    async list(maxKeys) {
      // const maxKeys = JSON.stringify({ maxKeys: 30 })
      // pink('images.list: maxKeys', maxKeys)
      try {
        const data = await fetchJson(
          '/api/images',
          {
            method: 'GET',
            // body: maxKeys,
          }
          )
          // pink('api.images.list: data', data)
          // pink('api.images.list: data.images', data.images)
        return { data }
      }
      catch (e) {
        const error = await e.error
        throw error
      }
    },
    create(formData) {
      return fetchUploadImage(
        '/api/images',
        {
          method: 'POST',
          body: formData
        }
      ).then(data => {
        return data
      }).catch(e => {
        const error = e.error
        throw error
      })
    },
    async delete(key) {
      pink('images.delete')
      try {
        const data = await fetchJson(
          `/api/images/${key}`,
          {
            method: 'DELETE'
          }
        )
        return data
      }
      catch (e) {
        const error = await e.error
        throw error
      }
    },
  },
}
