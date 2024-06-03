import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom"
import { AppRoutes } from './appRoutes.tsx'
import { AuthProviderWithNavigation } from './auth/authProvider.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from "sonner"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProviderWithNavigation>
          <AppRoutes />
          <Toaster visibleToasts={1} position='top-right' richColors />
        </AuthProviderWithNavigation>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)
