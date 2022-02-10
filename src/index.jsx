import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./utils/context/context";

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
