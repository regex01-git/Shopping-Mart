import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { loginUser } from '../../features/authSlice'
import { StyledForm } from './StyledForm'
import { useNavigate } from 'react-router'
export default function Login_user() {
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector((store) => store.auth)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const handleSubmit = (e) => {

        e.preventDefault();
        dispatch(loginUser(user))
    }
    useEffect(() => {
        if (auth._id) {
            Navigate('/cart')
        }
    }, [auth._id])
    return (
        <>
            <div style={{ width: "50%", margin: "auto", backgroundColor: "#ecf0f1", height: "600px", paddingTop: "70px", borderRadius: "10%" }}>
                <StyledForm onSubmit={handleSubmit}>
                    <h2>Login Form</h2>

                    <input type="email" placeholder="Enter Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <input type="password" placeholder="Enter password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    <button >{auth.loginStatus === "pending" ? "Submitting" : "Submitted"}</button>
                    {
                        auth.loginStatus == "rejected" ? <p style={{ color: 'red' }}>{auth.loginError}</p> : null
                    }
                </StyledForm>
            </div>
        </>
    )
}