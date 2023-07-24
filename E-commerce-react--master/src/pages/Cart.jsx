import React, { useState,useEffect } from "react";
import TotalPrice from "../components/TotalPrice";
import {useDispatch,useSelector} from 'react-redux';
import {fetchCartItem,increment,decrement,removeCart} from '../redux/reducers/cart'
function Cart() {
  const [count, setCount] = useState(0);
  const dispatch=useDispatch();
const {cart}=useSelector((state)=>state.cart);
  
  const handledecrement=(id)=>{
 
   const result=cart.find((x)=>x.id===id);
   if(result.qty===0){
return;
   }
dispatch(decrement({count:result.qty-1,id}))
  }

   const handleIncrement=(id)=>{
   const result=cart.find((x)=>x.id===id);
  

    dispatch(increment({count:result.qty+1,id}))
  }
useEffect(()=>{
dispatch(fetchCartItem());
},[dispatch])

if(cart.length===0){
  return <div className="text-center">
  <h1>CART IS EMPTY </h1>
  </div>
}

  return (
    <>
      <div className="main-container">
      <div className="leftCartSec">

         {
        cart?.map((x)=>(

           <div className="cart-container mt-5" key={x.id}>
          <div className="cart-left">
            <img height='200' width='300'
              src={x.image}
              alt={x.name}
            />
          </div>

          <div className="cart-right">
            <p>{x.name}</p>
            <p>&#8377; {x.price}</p>
            <div className="qty">
              <button onClick={() => handledecrement(x.id)} >-</button>
              <p>{x.qty}</p>
              <button onClick={() => handleIncrement(x.id)}>+</button>
            </div>
            <button className="remove" onClick={()=>dispatch(removeCart(x.id))}>Remove</button>
          </div>
        </div>
        ))
       }
      </div>
      <div className="rightCartSec mt-5">
          <TotalPrice />
      </div>
      </div>
    </>
  );
}

export default Cart;
