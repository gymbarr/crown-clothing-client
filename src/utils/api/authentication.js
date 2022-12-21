import axios from "axios"

export const signUp = (user) => {
  axios.post('/api/users', user)
    .then(response => {
      console.log(response)
    })
    .catch(error => console.log('error', error));
}
