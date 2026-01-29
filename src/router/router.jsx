import { createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "../layout/HomeLayout";
import { FormPage } from "../pages/FormPage";
import { VentasPage } from "../pages/VentasPage";
import { ReportesPage } from "../pages/ReportesPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <FormPage />,
            },
            {
                path: 'listar-ventas',
                element: <VentasPage />,
            },
            {
                path: 'reportes',
                element: <ReportesPage />,
            }
        ]
    }
])