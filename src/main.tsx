import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import router from "./routes";
// import {myRouter} from "./routes";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { NotificationProvider } from "./components/notification/NotificationProvider";
import "./index.css";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      {/* <RouterProvider router={myRouter} /> */}
      <RouterProvider router={router} />
    </NotificationProvider>
  </StrictMode>
);
