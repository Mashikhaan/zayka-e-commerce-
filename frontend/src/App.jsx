import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from "./components/ScrollToTop";
import ScrollToHash from "./components/ScrollToHash";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./features/hooks/useAuth";
import AuthRedirectHandler from "./components/AuthRedirectHandler";



function App() {
  const { handleGetMe } = useAuth(); // 👈 hook use
   

  return (
    <>
      <ScrollToHash />
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} className={'mt-12'} />
      <AuthRedirectHandler /> {/* 👈 auto redirect if not authenticated */}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;