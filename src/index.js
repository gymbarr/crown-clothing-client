import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'

import App from './App'
import FlashMessage from './components/feedback/flash-message/flash-message'
import reportWebVitals from './reportWebVitals'
import store from './store/store'
import './index.scss'
import history from './utils/history'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HistoryRouter history={history} forceRefresh>
      <FlashMessage />
      <App />
    </HistoryRouter>
  </Provider>,
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
