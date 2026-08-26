import { Route } from "react-router-dom";

import AdminLogin from "../admin/pages/AdminLogin";
import ProtectedRoute from "./protected.routes";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";


const AdminRoutes = (
    <Route path="/admin">
        {/* Public Route */}
        <Route
            index
            element={<AdminLogin />}
        />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
                {/* Dashboard */}
                <Route
                    path="dashboard"
                    element={<AdminDashboard />}
                />
            </Route>
        </Route>
    </Route>
);

export default AdminRoutes;