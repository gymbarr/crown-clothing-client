import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import DirectoryItem from "../directory-item/directory-item"

import { getCategories } from "../../utils/api/categories"
import { showFlashMessageAsync } from "../../store/flash/flash-action"

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
        dispatch(showFlashMessageAsync(error))
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
