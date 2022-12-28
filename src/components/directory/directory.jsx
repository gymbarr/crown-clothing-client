import { useState, useEffect } from "react"
import DirectoryItem from "../directory-item/directory-item"

import { getCategories } from "../../utils/api/categories"

import { DirectoryContainer } from "./directory.styles"

const Directory = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
      .then((response) => response.data)
      .then((categories) => setCategories(categories))
      .catch((error) => {
        alert(error.message)
      })
  }, [])

  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} directory={category} />
      ))}
    </DirectoryContainer>
  )
}

export default Directory
