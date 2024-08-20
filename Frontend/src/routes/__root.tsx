import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import Navbar from '@/components/navbar'

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  ),
})
