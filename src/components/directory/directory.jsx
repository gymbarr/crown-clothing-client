import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import DirectoryItem from "../directory-item/directory-item"

import { getCategories } from "../../utils/api/categories"
import { saveToken, getToken } from "../../utils/helpers/local-storage-manager"

import { DirectoryContainer } from "./directory.styles"

const Directory = () => {
  const [categories, setCategories] = useState([])
  const token = getToken()

  useEffect(() => {
    getCategories(token)
      .then((response) => {
        setCategories(response.data)
        saveToken(response.headers.token)
      })
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
