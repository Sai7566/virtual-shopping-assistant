import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./i18n/i18n"; // Import i18n configuration
import ShopContextProvider from "./Context/ShopContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <App />
        </ShopContextProvider>
    </BrowserRouter>
  </StrictMode>
);
