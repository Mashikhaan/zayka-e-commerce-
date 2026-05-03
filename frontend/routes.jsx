import { createBrowserRouter } from "react-router-dom";
import App from "./src/App";
import Home from "./src/pages/Home";
import Organic from "./src/pages/Organic";
import Delivery from "./src/pages/Delivery";
import Payment from "./src/pages/Payment";
import VegCat from "./src/pages/VegCat";
import FruitCat from "./src/pages/FruitCat";
import DairyCat from "./src/pages/DairyCat";
import MeatCat from "./src/pages/MeatCat";
import Blog1 from "./src/pages/Blog1";
import Blog2 from "./src/pages/Blog2";
import Blog3 from "./src/pages/Blog3";
import NotFound from "./src/pages/NotFound";
import Shop from "./src/pages/Shop";
import Register from "./src/features/pages/Register";
import Login from "./src/features/pages/Login";
import Profile from "./src/features/pages/Profile";
import CartPage from "./src/pages/CartPage";
import CreateProduct from "./src/features/pages/admin/CreateProduct";
import ProtectedAdminRoute from "./src/components/ProtectedAdminRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout
    children: [
      { index: true, element: <Home /> },
      { path: "organic", element: <Organic /> },
      { path: "delivery", element: <Delivery /> },
      { path: "payment", element: <Payment /> },
      { path: "vegcategory", element: <VegCat/>},
      { path: "fruitcategory", element: <FruitCat/>},
      { path: "dairycategory", element: <DairyCat/>},
      { path: "meatcategory", element: <MeatCat/>},
      {path: "blog1", element: <Blog1/>},
      {path: "blog2", element: <Blog2/>},
      {path: "blog3", element: <Blog3/>},
      {path: "shop", element: <Shop/>},
      {path: "register",element: <Register />},
      {path: "login",element: <Login />},         
      {path: "profile",element: <Profile />},         
      {path: "cart",element: <CartPage />},         
      {path: "admin/create-product",element: <ProtectedAdminRoute><CreateProduct /></ProtectedAdminRoute>},         
    
    ],
  },
  {
    path: "*",
    element: <NotFound />, // 👈 separate layout (no navbar/footer)
  },
]);