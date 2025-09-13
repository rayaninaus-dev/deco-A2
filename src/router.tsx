import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Landing from "./pages/Landing";
import Intake from "./pages/Intake";
import Consent from "./pages/Consent";
import Confirm from "./pages/Confirm";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Appointment from "./pages/Appointment";
import Resources from "./pages/Resources";
import Share from "./pages/Share";
import QRCodeEntry from "./pages/QRCodeEntry";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "intake", element: <Intake /> },
      { path: "consent", element: <Consent /> },
      { path: "confirm", element: <Confirm /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "chat", element: <Chat /> },
      { path: "appointment", element: <Appointment /> },
      { path: "resources", element: <Resources /> },
      { path: "share", element: <Share /> },
      { path: "qrcode", element: <QRCodeEntry /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
