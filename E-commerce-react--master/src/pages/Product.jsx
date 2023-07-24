import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import {pushCart} from '../redux/reducers/cart'
function Product() {
  const navigate=useNavigate();
  const { id } = useParams();
  const {product}=useSelector((state)=>state.product);
  const {cart:item}=useSelector((state)=>state.cart);

const dispatch=useDispatch()
  let result={};
  const ProductGet=()=>{
result=product.find((x)=>x.id=== Number(id));
console.log('productDetails',result)
  }
  ProductGet();

console.log('re done',item)
  const handleAdd=(cart)=>{
// if(item.includes(cart)){
console.log('already added',item.includes(cart).toString());
// return;
// }
    const obj={
    name:cart.name,
    qty:1,
    price:cart.price,
    image:cart.image,
  }
dispatch(pushCart(obj));
  }
  return (
    <>
   
      <section className="productdetails">
        <div className="productleft">
          <div className="productimages">
            <img
              src={result.image}
              alt="shofar"
            />
          </div>
          <div>
            <div className="text-center">
              <span className="productNamedetail">{result.name}</span>

              <br />

              <span className="productprice">RS {result.price}</span>
            </div>
            <div>
              <span>{result.rating}</span>
            </div>
          </div>
        </div>
        <div className="productright">
          <div>
            <p className="about">
            {result.content}
            </p>
          </div>
          <div className="btns">
            <button onClick={()=>handleAdd(result)} className="ADD_CART bg-danger mt-1 px-2 py-2">
              ADD TO CART
            </button>
            <button className="ADD_CART bg-danger mt-1 px-2 py-2"
             onClick={()=>navigate('/')}
            >
              Go Back
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Product;
