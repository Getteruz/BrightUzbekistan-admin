import App from './App'
import { Suspense } from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { PersistGate } from 'redux-persist/integration/react'
import { CookiesProvider } from 'react-cookie'
import { persistor, store } from './store'
import { queryClient } from './services/api'
import AlertProvider from './providers/AlertProvider'
import LoaderProvider from './providers/LoaderProvider'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Suspense fallback={<>Loading...</>}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AlertProvider>
            <LoaderProvider>
              <BrowserRouter>
                <CookiesProvider>
                  <App />
                </CookiesProvider>
              </BrowserRouter>
            </LoaderProvider>
          </AlertProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </Suspense>
)
