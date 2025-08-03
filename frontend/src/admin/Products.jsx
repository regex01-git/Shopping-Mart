import { Outlet,useNavigate } from "react-router"
export default function Products(){
    const navigate=useNavigate()
    return (
        <>
        <div className="admin-product-head">
        <h3>Products</h3><button onClick={()=>navigate("/admin/products/create-product")}>Create</button>
        </div>
       <div className="admin-product-head-content">
         <Outlet/>
       </div>
        </>
    )
}