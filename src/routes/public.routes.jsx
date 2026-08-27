import { Route } from "react-router-dom";
import NotFound from "../NotFound";
import MainLayout from "../layout/MainLayout";
import Home from "../website/pages/Home";
import ExploreSnacks from "../website/pages/ExploreSnacks";
import Orders from "../website/pages/Orders";
import About from "../website/pages/About";
import Contact from "../website/pages/Contact";
import Cart from "../website/pages/Cart";

const PublicRoutes = (
    <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<ExploreSnacks />} />
        <Route path="products" element={<ExploreSnacks />} />
        <Route path="orders" element={<Orders />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
    </Route>
);

export default PublicRoutes;