export const saveUserToLocalStorage = (userData) => {
  localStorage.setItem("username", userData.username)
  localStorage.setItem("token", userData.token)
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("username")
  localStorage.removeItem("token")
}