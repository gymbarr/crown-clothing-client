import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import DirectoryItem from "../directory-item/directory-item"

import { getCategories } from "../../utils/api/categories"

import { DirectoryContainer } from "./directory.styles"

const Directory = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        // error handling
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
