import { useEffect, useState } from 'react'

export const useImagesPreloader = (images) => {
  const [isLoaded, setIsLoaded] = useState(false)

  if (images.length === 0) return

  const loadImage = imageUrl => {
    return new Promise((resolve, reject) => {
      const loadImg = new Image()
      loadImg.src = imageUrl
      loadImg.onload = () => resolve()
      loadImg.onerror = err => reject(err)
    })
  }

  Promise.all(images.map(image => loadImage(image)))
    .then(() => setIsLoaded(true))
    .catch(err => console.log("Failed to load images", err))

  return isLoaded
}