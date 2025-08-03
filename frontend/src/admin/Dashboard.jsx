import { Link, NavLink, Outlet } from "react-router";

export default function Dashboard(){
    return (
        <>
        <div className="parent-dashboard-links">
       <div className="dashboard-links">
         <h4>QUICK LINKS</h4>
         <NavLink className="dashboard-link" to="summary">Summary</NavLink>
        <NavLink className="dashboard-link" to="products">Product</NavLink>
        
       </div>
       <div className="dashboard-content">
        <Outlet/>
       </div>
       </div>
        </>
    )
}