import App from './App'
import { Suspense } from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { persistor, store } from './store'
import { queryClient } from './services/api'
import { QueryClientProvider } from 'react-query'
import AlertProvider from './providers/AlertProvider'
import { PersistGate } from 'redux-persist/integration/react'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Suspense fallback={<>Loading...</>}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AlertProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AlertProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </Suspense>
)
