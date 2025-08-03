import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import DataLoading from "../spinners/Beet";
export default function Home(){
    const navigate=useNavigate();
    const {items,status,error}=useSelector((store)=>store.products)
    console.log("items",items)
    const dispatch=useDispatch();
    const handleAddToCart=(item)=>{
        dispatch(addToCart(item));
    }
   
    const [pagination,setPagination]=useState([]);
     const [max,setMax]=useState(6)
     const [display,setDisplay]=useState(false);
    useEffect(()=>{
        // console.log("rao")
        if(max<items.length)
        setPagination(items.slice(0,max))
    },[items])
    useEffect(()=>{
       async function scroll(){
            const {scrollTop,scrollHeight,clientHeight}=document.documentElement
            if(pagination.length>=items.length)
                return;
            if(scrollTop+clientHeight+10>scrollHeight){
                setDisplay(true);
                await new Promise(res=>setTimeout(res,2000))
                setDisplay(false)      
                        setPagination(items.slice(0,max+3));
                setMax(max+3)
            }
            }
              window.addEventListener('scroll',scroll);
            return ()=>{
                window.removeEventListener('scroll',scroll)
        }
    },[max,pagination,items])
    return (
        <>
        {
            console.log(pagination)
        }
        
        <div className="home-container">
        {error||status=='rejected'?<h1>Failed to load</h1>:status=='pending'?<h1><DataLoading/></h1>:null}
        <h1 className="arrival">New Arrivals</h1>
        <div className="products">
            {
            items&&items.map((item)=>{
                return(
                    <div className="product" key={item._id}>
                        <h3>{item.brand}</h3>
                        <img src={item.image.url} alt={item.name}/>
                        <div className="details">
                            <span>{item.desc.slice(0,100)}....</span>
                            <span className="price"> ${item.price}</span>
                        </div>
                        <button onClick={()=>{
                            handleAddToCart(item)
                            navigate('./cart')}}>Add to Cart</button>
                    </div>
                )
            })
        }
          {  
            display?<h1 style={{width:"100%",textAlign:"center"}}><DataLoading/></h1>:null
          }

        </div>
        </div>
        </>
    )
}