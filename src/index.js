import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import store from "./store/store"
import "./index.scss"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

import { Elements } from "@stripe/react-stripe-js"
import { stripePromise } from "./utils/stripe/stripe"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import history from "../src/utils/history"

import FlashMessage from "./components/feedback/flash-message/flash-message"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={history} forceRefresh={true}>
        <Elements stripe={stripePromise}>
          <FlashMessage /> 
          <App />
        </Elements>
      </HistoryRouter>
    </Provider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
