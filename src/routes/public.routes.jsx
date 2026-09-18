import { Route } from "react-router-dom";
import NotFound from "../NotFound";
import MainLayout from "../layout/MainLayout";
import Home from "../website/pages/Home";
import ExploreSnacks from "../website/pages/ExploreSnacks";
import ProductDetails from "../website/pages/ProductDetails";
import About from "../website/pages/About";
import Contact from "../website/pages/Contact";
import Cart from "../website/pages/Cart";
import Checkout from "../website/pages/Checkout";
import TermAndCondition from "../components/footer/TermAndCondition";

const PublicRoutes = (
    <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<ExploreSnacks />} />
        <Route path="products" element={<ExploreSnacks />} />
        <Route path="product/:productId" element={<ProductDetails />} />
        <Route path="snack/:productId" element={<ProductDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="terms" element={<TermAndCondition />} />

        <Route path="*" element={<NotFound />} />
    </Route>
);

export default PublicRoutes;