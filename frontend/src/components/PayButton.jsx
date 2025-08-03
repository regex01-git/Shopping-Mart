import axios from 'axios'
import {useSelector} from 'react-redux'
// import  {url} from '../slices/api'
export default function PayButton({cartItems}){
    const {_id}=useSelector((store)=>store.auth)
    const handleCheckout=async ()=>{
        // console.log(cartItems)
       await axios.post('http://localhost:5000/api/stripe/create-checkout-session',{
            method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ items: cartItems })

        }).then((res)=>{
            // console.log(res.data)
            if(res.data.url){
                window.location.href=res.data.url;
            }
        }).catch((err)=>{
            console.log(err)
        })

        // console.log(response)
    }
    return (
        <>
        <button onClick={()=>handleCheckout()}>Check out</button>
        </>
    )
}