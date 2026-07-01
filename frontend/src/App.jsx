import { Route, Routes } from "react-router-dom";
import PublicLayout from "./components/PublicLayout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminUpload from "./pages/AdminUpload.jsx";
import AdminManage from "./pages/AdminManage.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Route>

    <Route path="/admin" element={<AdminLogin />} />
    <Route
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/upload" element={<AdminUpload />} />
      <Route path="/admin/manage" element={<AdminManage />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
