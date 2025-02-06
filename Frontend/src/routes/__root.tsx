import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "@/components/navbar";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <Navbar />
      <MaxWidthWrapper>
        <Outlet />
      </MaxWidthWrapper>
    </React.Fragment>
  ),
});
