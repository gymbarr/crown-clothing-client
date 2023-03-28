import { useState } from 'react'

const useImagesPreloader = (images) => {
  const [isLoaded, setIsLoaded] = useState(false)

  if (images.length === 0) return

  const loadImage = (imageUrl) => new Promise((resolve, reject) => {
    const loadImg = new Image()
    loadImg.src = imageUrl
    loadImg.onload = () => resolve()
    loadImg.onerror = (err) => reject(err)
  })

  Promise.all(images.map((image) => loadImage(image)))
    .then(() => setIsLoaded(true))
    .catch(() => {
      // error handling
    })

  // eslint-disable-next-line consistent-return
  return isLoaded
}

export default useImagesPreloader
