import { createRouter } from "@/router";
import { RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/inter";
import "@/index.css";

const router = createRouter();

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
