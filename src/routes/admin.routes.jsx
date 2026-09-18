import { Route } from "react-router-dom";

import AdminLogin from "../admin/pages/AdminLogin";
import ProtectedRoute from "./protected.routes";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import AdminCategories from "../admin/pages/AdminCategories";
import AdminAddCategory from "../admin/pages/AdminAddCategory";
import AdminEditCategory from "../admin/pages/AdminEditCategory";
import AdminProducts from "../admin/pages/AdminProducts";
import AdminAddProduct from "../admin/pages/AdminAddProduct";
import AdminEditProduct from "../admin/pages/AdminEditProduct";
import AdminOrders from "../admin/pages/AdminOrders";
import AdminBilling from "../admin/pages/AdminBilling";
import AdminInquiries from "../admin/pages/AdminInquiries";

const AdminRoutes = (
  <Route path="/admin">
    {/* Public Route */}
    <Route index element={<AdminLogin />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        {/* 1. Dashboard */}
        <Route path="dashboard" element={<AdminDashboard />} />

        {/* 2. Categories (List, Add page, and Edit page) */}
        <Route path="categories" element={<AdminCategories />} />
        <Route path="categories/add" element={<AdminAddCategory />} />
        <Route path="categories/edit/:categoryId" element={<AdminEditCategory />} />

        {/* 3. Products (List, Add page, and Edit page) */}
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/add" element={<AdminAddProduct />} />
        <Route path="products/edit/:productId" element={<AdminEditProduct />} />

        {/* 4. Orders */}
        <Route path="orders" element={<AdminOrders />} />

        {/* 5. Billing */}
        <Route path="billing" element={<AdminBilling />} />

        {/* 6. Inquiries */}
        <Route path="inquiries" element={<AdminInquiries />} />
      </Route>
    </Route>
  </Route>
);

export default AdminRoutes;