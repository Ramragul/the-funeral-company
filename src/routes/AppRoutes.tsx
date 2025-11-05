import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import FuneralServicePage from "../pages/FuneralServicePage";
import Booking from "../pages/Booking";
import BookingSuccess from "../pages/BookingSuccess";
// import { CoffinPage } from "../pages/CoffinPage";
import { CoffinDetailPage } from "../pages/CoffinDetailPage";
import { CoffinCataloguePage } from "../pages/CoffinCataloguePage";
import CoffinPurchasePage from "../pages/CoffinPurchasePage";
import PurchaseSuccess from "../pages/PurchaseSuccess";
import ProductCataloguePage from "../pages/ProductCataloguePage";
import AdminDashboard from "../pages/AdminDashboard";
import GroundEditPage from "../pages/GroundEditPage";
import GroundManagerPage from "../pages/GroundManagerPage";
import GroundDetailsPage from "../pages/GroundDetailsPage";
import GroundsListPage from "../pages/GroundsListPage";
import GroundCreatePage from "../pages/GroundCreatePage";
import ServicesCatalog from "../pages/ServicesCatalog";
import ServiceCategory from "../pages/ServiceCategory";
import ServiceDetail from "../pages/ServiceDetail";
import AdminServiceUpload from "../pages/AdminServiceUpload";
import AdminHomePage from "../pages/AdminHomePage";
import VendorPaymentsPage from "../pages/VendorPaymentsPage";
import VendorDetailsPage from "../pages/VendorDetailsPage";
import VendorListPage from "../pages/VendorListPage";
import VendorFormModal from "../pages/VendorFormModal";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services/package" element={<FuneralServicePage/>} />
        <Route path="services/catalog" element={<ServicesCatalog/>} />
        <Route path="/services/coffin" element={<CoffinCataloguePage />} />
        <Route path="/coffins/:id" element={<CoffinDetailPage />} />
        <Route path="/coffin/purchase" element={<CoffinPurchasePage />} />
        <Route path="booking" element={<Booking/>} />
        <Route path="booking/success" element={<BookingSuccess/>} />
        <Route path="purchase/success" element={<PurchaseSuccess/>} />
        <Route path="admin/dashboard" element={<AdminDashboard/>} />
        <Route path="product/catalogue" element={<ProductCataloguePage/>} />
        
        <Route path="/ground/create" element={<GroundCreatePage/>} />
        <Route path="admin/grounds" element={<GroundManagerPage/>} />
        <Route path="admin/grounds/edit/:id" element={<GroundEditPage/>} />
        <Route path="grounds/:id" element={<GroundDetailsPage/>} />
        <Route path="services/funeralground" element={<GroundsListPage/>} />

        <Route path="/vendors" element={<VendorListPage />} />
        <Route path="/vendors/:id" element={<VendorDetailsPage />} />
        <Route path="/vendors/payments" element={<VendorPaymentsPage />} />

        {/* <Route path="/services" element={<Services />} /> */}
        <Route path="/services/category/:category" element={<ServiceCategory />} />
        <Route path="/services/:code" element={<ServiceDetail />} />
        <Route path="/admin/service/upload" element={<AdminServiceUpload />} />

        <Route path="/admin" element={<AdminHomePage />} />




      </Route>
    </Routes>
  );
}
