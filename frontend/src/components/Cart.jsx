import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useNavigate } from 'react-router'
import {addItem,removeAll,removeItem,getTotals} from'../features/cartSlice';
import { useEffect } from "react";
import PayButton from "./PayButton";
export default function Cart() {
    const { cartItems,cartTotalAmount } = useSelector((state) => state.cart)
    const auth = useSelector((state) => state.auth)
    const Navigate=useNavigate()
    const dispatch=useDispatch();
    useEffect(()=>{
            dispatch(getTotals());
    },[cartItems, cartTotalAmount,dispatch])
    
    function plus(id){
        dispatch(addItem(id))
    }
    function minus(id){
        dispatch(removeItem(id))
    }
    return (
        <>
            <div className="cart-container">
                <h2>Shopping Cart</h2>
                {
                    cartItems.length == 0 ? <div className="cart-empty">
                        <p>Your cart is currently empty</p>
                        <div className="start-shopping">
                            <Link to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                                <span>Start Shopping</span></Link>
                        </div>
                    </div> : <div>
                        <div className="titles">
                            <h3 className="product-title">Product</h3>
                            <h3 className="price">Price</h3>
                            <h3 className="Quantity">Quantity</h3>
                            <h3 className="total">Total</h3>
                        </div>
                        <div className="cart-items">
                            {
                                cartItems?.map((item) => {
                                    return (
                                        <div className="cart-item" key={item._id}>
                                            <div className="cart-product">
                                                <img src={item.image.url} alt={item.name} />
                                                <div>
                                                    <h3>{item.name}.....</h3>
                                                    <p>{item.desc}....</p>
                                                    <button onClick={()=>dispatch(removeAll(item))}>Remove</button>
                                                </div>
                                                <div className="cart-product-price">${item.price}</div>
                                            </div>
                                            <div className="cart-product-quantity">
                                                <button onClick={()=>minus(item._id)}>-</button>
                                                <div className="count">{item.cartQuantity}</div>
                                                <button onClick={()=>plus(item._id)}>+</button>
                                            </div>
                                             <div className="cart-product-total-price2">
                                                {item.cartQuantity}
                                            </div>
                                            <div className="cart-product-total-price">
                                                ${item.price * item.cartQuantity}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="cart-summary">
                                <button className="clear-cart" onClick={() => {
                                    localStorage.removeItem('cartItems')
                                    window.location.reload()
                                }
                                }>
                                    Clear Cart
                                </button>
                                <div className="cart-checkout">
                                    <div className="subtotal">
                                        <span>Subtotal</span>
                                        <span className="amount">${cartTotalAmount}</span>
                                    </div>
                                    <p>Taxes and shipping calculated at checkout</p>
                                   {auth._id?<PayButton cartItems={cartItems}/>:<button className="cart-login" onClick={()=>Navigate('/login')}>Login to Checkout</button>}
                                    <div className="continue-shopping">
                                        <Link to="/">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                            </svg>
                                            <span>Continue Shopping</span></Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>

        </>
    )
}