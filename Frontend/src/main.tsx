import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { ThemeProvider } from "@/components/theme/theme-provider"
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import Navbar from "@/components/navbar"
import Root from './routes/roots';
import Card from './routes/card';
import Home from './routes/home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/root",
    element: <Root />,
  },
  {
    path: "/root/card/:id",
    element: <Card />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <KindeProvider
        clientId={import.meta.env.VITE_KINDE_CLIENT_ID as string}
        domain={import.meta.env.VITE_KINDE_DOMAIN as string}
        redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URL as string}
        logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URI as string}
      >
        <Navbar />
        <RouterProvider router={router} />
      </KindeProvider>
    </ThemeProvider>
  </StrictMode >,
)
