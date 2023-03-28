import { Link } from 'react-router-dom'

const NotFound = () => (
  <div>
    <h1>Oops! You seem to be lost.</h1>
    <p>Here are some helpful links:</p>
    <h3><Link to="/">Home</Link></h3>
  </div>
)

export default NotFound
