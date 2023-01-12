export const saveToken = (token) => {
  if (token) return localStorage.setItem("token", token)
}

export const getToken = () => localStorage.getItem("token")

export const removeToken = () => localStorage.removeItem("token")

