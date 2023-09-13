import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App";
import * as webix from "./codebase/webix/webix";

// hardcode a global variable (required for complex widgeets)
window.webix = webix;
webix.CustomScroll.init();

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(<App />);
