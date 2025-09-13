import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { SubmissionProvider } from "./context/SubmissionContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SubmissionProvider>
      <RouterProvider router={router} />
    </SubmissionProvider>
  </React.StrictMode>
);

