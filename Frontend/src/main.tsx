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
        clientId="37aee5993a8645db86f5d170d295fe40"
        domain="https://taskflash.kinde.com"
        redirectUri="https://swe-internship-take-uforward.vercel.app/root"
        logoutUri="https://swe-internship-take-uforward.vercel.app/"
      >
        <Navbar />
        <RouterProvider router={router} />
      </KindeProvider>
    </ThemeProvider>
  </StrictMode >,
)
