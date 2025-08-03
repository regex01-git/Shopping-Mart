import { Link } from "react-router"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { toast } from 'react-toastify'
export default function NavBar() {
  const { cartTotalQuantity } = useSelector((state) => state.cart)
  const auth = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Shopping Cart</Navbar.Brand>
          <Nav className="me-auto">
            <div className="nav" style={{ display: "flex", gap: "1rem" }}>
              {/* <Nav.Link className="lf" as={Link} to="/">Shopping Cart</Nav.Link> */}
              <Nav.Link className="lf" style={{float:"right"}} as={Link} to="/cart">Cart<span className="bag-quantity">{cartTotalQuantity}</span></Nav.Link>

              {
                auth._id ? <Nav.Link className="lf" onClick={
                  () => {
                    dispatch(logoutUser())
                    toast.warning("Logged Out!", { position: "bottom-left" })
                  }
                }>Logout</Nav.Link> :
                  (
                    <>


                      <Nav.Link className="lf" as={Link} to="/login">Log In</Nav.Link>
                      <Nav.Link className="lf" as={Link} to="/register">Register</Nav.Link>
                    </>
                  )
              }
              {
                auth.isAdmin ? <Nav.Link className="lf" as={Link} to="/admin/summary">Admin</Nav.Link> : null
              }





            </div>
          </Nav>
        </Container>
      </Navbar>
      <br />

    </>
  )
}