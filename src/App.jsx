import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import AlertProvider from "./providers/AlertProvider"
import Router from "./router"
import { persistor, store } from "./store"
// import "./i18next"
import { Suspense } from "react"

function App() {
  return (
    <Suspense fallback={<></>} >
      <div className="App">
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AlertProvider>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </AlertProvider>
          </PersistGate>
        </Provider>
      </div>
    </Suspense>
  )
}

export default App
