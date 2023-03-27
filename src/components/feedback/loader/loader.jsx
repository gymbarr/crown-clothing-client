import { CircularProgress } from '@mui/material'

import LoaderContainer from './loader.styles'

function Loader() {
  return (
    <LoaderContainer>
      <CircularProgress color="inherit" />
    </LoaderContainer>
  )
}

export default Loader
