import {useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { registerUser } from '../../features/authSlice'
import { StyledForm } from './StyledForm'
import { useNavigate } from 'react-router'
export default function Register(){
    const Navigate=useNavigate()
    const dispatch=useDispatch()
    const auth=useSelector((store)=>store.auth)
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    })
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(registerUser(user))
    }
     useEffect(()=>{
        if(auth._id){
            Navigate('/cart')
        }
    },[auth._id])
    return(
        <>
        <div style={{width:"50%",margin:"auto",backgroundColor:"#ecf0f1",height:"600px",paddingTop:"70px",borderRadius:"10%"}}>
        <StyledForm onSubmit={handleSubmit}>
            <h2>Register Form</h2>
            <input type="text" placeholder="Enter Name" onChange={(e)=>setUser({...user,name:e.target.value})}/>
            <input type="email" placeholder="Enter Email" onChange={(e)=>setUser({...user,email:e.target.value})}/>
            <input type="password" placeholder="Enter password" onChange={(e)=>setUser({...user,password:e.target.value})}/>
            <button >{auth.registerStatus==="pending"?"Submitting":"Submitted"}</button>
            {
                auth.registerStatus=="rejected"?<p style={{color:'red'}}>{auth.registerError}</p>:null
            }
        </StyledForm>
        </div>
        </>
    )
}