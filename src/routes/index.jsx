import { BrowserRouter, Routes } from "react-router-dom";
import AdminRoutes from "./admin.routes";
import PublicRoutes from "./public.routes";
import ScrollToTop from "../components/ui/ScrollToTop";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {PublicRoutes}
                {AdminRoutes}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;