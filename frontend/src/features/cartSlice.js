import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    cartItems:  localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems'))
    :[],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const index = state.cartItems.findIndex((item) => item._id === action.payload._id)
            if (index >= 0) {
                state.cartItems[index].cartQuantity += 1;
                toast.info(`Increase ${state.cartItems[index].name} quantity`, {
                    position: "bottom-left"
                });
                // console.log(state.cartItems[index].cartQuantity)
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                // console.log("cart"+action.payload)
                state.cartItems.push(tempProduct);
                toast.success(`Added ${action.payload.name} to the cart`, {
                    position: "bottom-left"
                });
            }
             localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        addItem(state,action){
            const ind=state.cartItems.findIndex((item)=>item._id===action.payload)
            state.cartItems[ind].cartQuantity+=1;
            toast.info(`Increased ${state.cartItems[ind].category} quantity`, {
                    position: "bottom-left"
                });
             localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
         removeItem(state,action){
            const ind=state.cartItems.findIndex((item)=>item._id===action.payload)
            state.cartItems[ind].cartQuantity-=1;
            if(state.cartItems[ind].cartQuantity<=0){
                state.cartItems=state.cartItems.filter((item)=>item._id!=action.payload);
                toast.info(`Removed from Cart`, {
                    position: "bottom-left"
                });
            }else{
            toast.info(`Decreased ${state.cartItems[ind].category} quantity`, {
                    position: "bottom-left"
                });
            }
             localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        removeAll:(state,action)=>{
            const newArr=state.cartItems.filter((item)=>item._id!==action.payload._id)
            state.cartItems=newArr;
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        getTotals:(state,action)=>{
            const {total,quantity}=state.cartItems.reduce((accumulator,currentItem)=>{
                    let amount=currentItem.price*currentItem.cartQuantity;
                    let quantity=currentItem.cartQuantity;
                    accumulator.total+=amount;
                    accumulator.quantity+=quantity;
                    return accumulator;
            },{
                total:0,
                quantity:0
            })
            state.cartTotalAmount=total;
            state.cartTotalQuantity=quantity;

        }

       
    }
})
export const { addToCart,addItem,removeItem,removeAll,getTotals } = cartSlice.actions;
export default cartSlice.reducer;