import Home from "./components/Home"
import Cart from "./components/Cart"
import NavBar from "./components/Navbar"
import Pagenotfound from "./components/Pagenotfound"
import 'react-toastify/dist/ReactToastify.css'  //import for toastify css
import { Routes,Route,Link } from "react-router"
import {ToastContainer} from 'react-toastify'
import Register from "./components/forms/Register"
import Login_user from "./components/forms/Login_user"
import CheckoutSucess from "./components/CheckoutSuccess"
import Dashboard from "./admin/Dashboard"
import Products from "./admin/Products"
import Summary from "./admin/Summary"
import CreateProduct from "./admin/Products/CreateProduct"
export default function App(){
  return (
    <>
    <ToastContainer/>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login_user/>}/>
      <Route path="/checkout-success" element={<CheckoutSucess/>}/>
      <Route path="/login" element={<Login_user/>}/>
      <Route path="/admin" element={<Dashboard/>}>     
          
          <Route path="summary" element={<Summary/>}/>
          <Route path="products" element={<Products/>}>
      <Route path="create-product" element={<CreateProduct/>}/>     
          
          </Route>
      </Route>
      <Route path="/cart/:_id?" element={<Cart/>}/>
      <Route path='/*' element={<Pagenotfound/>}/>
    </Routes>
    </>
  )
}