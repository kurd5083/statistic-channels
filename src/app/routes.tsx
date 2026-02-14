import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Home from "@/pages/Home";
import Auth from "@/pages/Auth";

export const router = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            { path: '/', element: <Home /> },
        ],
    },
    {
        path: "/auth",
        element: <Auth />,
    }
]);