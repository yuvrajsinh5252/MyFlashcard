import './index.css'
import { ThemeProvider } from "@/components/theme/theme-provider"
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <KindeProvider
          clientId={import.meta.env.VITE_KINDE_CLIENT_ID as string}
          domain={import.meta.env.VITE_KINDE_DOMAIN as string}
          redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URL as string}
          logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URI as string}
        >
          <RouterProvider router={router} />
        </KindeProvider>
      </ThemeProvider>
    </StrictMode>,
  )
}
