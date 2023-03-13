import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "react-query"
import { PersistGate } from "redux-persist/integration/react"
import AlertProvider from "./providers/AlertProvider"
import Router from "./router"
import { persistor, store } from "./store"
// import "./i18next"
import { Suspense } from "react"
import { queryClient } from "./services/api"

function App() {
  return (
    <Suspense fallback={<></>} >
      <div className="App">
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <AlertProvider>
                <BrowserRouter>
                  <Router />
                </BrowserRouter>
              </AlertProvider>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </div>
    </Suspense>
  )
}

export default App
