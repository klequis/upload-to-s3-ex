import { fetchJson, fetchUploadImage } from './api-helpers'

/* Dev */
// eslint-disable-next-line
import { pink } from 'logger'

export default {
  images: {
    async read(maxKeys) {
      try {
        const data = await fetchJson(
          '/api/images',
          {
            method: 'GET',
            // body: maxKeys,
          }
          )
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
