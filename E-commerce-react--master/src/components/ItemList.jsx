import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData,productUpdate,editModeCancel,updateCall } from "../redux/reducers/product";
import {pushCart } from "../redux/reducers/cart";

import Loader from "./Loader";
function ItemList() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  
  const [check, setCheck] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: "",
    rating: "",
    content: "",
   
  });

  useEffect(() => {
    dispatch(fetchData());
  },[dispatch])

  const {product,isLoading,sorted}=useSelector((state)=>state.product);
  const {addToCart}=useSelector((state)=>state.cart);
console.log('cart is: ',addToCart)
  const UpdateSave=(x)=>{
const obj={
  name: data.name?data.name:x.name,
     price:data.price?data.price:x.price,
    rating:data.rating?data.rating:x.rating,
    content:data.content?data.content:x.content,
    id:x.id,
}

console.log('57247624',obj)
dispatch(updateCall(obj));
  }
let filterData=[];
console.log(sorted)
 if(sorted){
 filterData=[...product].sort( (a,b)=>{ return a.price-b.price})

 }else{
  filterData=product;
 }

// handleAddToCart

const handleAddToCart=(cart)=>{
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
       

     { filterData.length>0?
      filterData.map((x) => {
        return (
          <section className={x.editable ? "listItem" : "listItemFalse"} key={x.id}>
            <div className="left">
              <div className="images">
                {
                  x.editable ?
                    <>
                      <Link to={`/product/${x.id}`} >
                        <img
                          src={x.image}
                          alt={x.name}
                        />
                      </Link>
                    </>
                    :
                    <img
                    src={x.image}
                    alt={x.name}
                    />
                }
              </div>
              <div>
                <div className="input_set">
                  {x.editable ? (
                    <span className="productName">{x.name}</span>
                  ) : (
                    <input
                      type="text"
                      defaultValue={x.name}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  )}
                  <br />
                  {x.editable ? (
                    <>
                      {" "}
                      <span>RS {x.price}</span>
                    </>
                  ) : (
                    <>
                      <span>RS</span>
                      <input
                        type="text"
                        defaultValue={x.price}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                      />
                    </>
                  )}
                </div>
                <div>
                  {x.editable ? (
                    <span>{x.rating}</span>
                  ) : (
                    <>
                      {" "}
                      <p>Rating</p>
                      <input className="last_input"
                        type="number"
                        defaultValue={x.rating}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            rating: e.target.value,
                          }))
                        }
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="right">
              <div>
                {x.editable ? (
                  <p>
                    {x.content}
                  </p>
                ) : (
                  <textarea
                    rows="5"

                    type="text"
                    defaultValue={x.content}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                  />
                )}
              </div>
              <div className="btns">
                {x.editable ? (
//                  <>
//                  {
// addToCart?  <button onClick={()=>navigate('/cart')} className="ADD_CART bg-danger mt-1 px-2 py-2">
//                     GO TO CART
//                   </button>:  
<button onClick={()=>handleAddToCart(x)} className="ADD_CART bg-danger mt-1 px-2 py-2">
                    ADD TO CART
                  </button>
                //  }
              
                 
                
                // </>
                ) : (
                  ""
                )}
                {x.editable ? (
                  <>
                    <button onClick={()=>dispatch(deleteData(x.id))}>
                      <AiFillDelete
                        style={{ color: "red", fontSize: "20px" }}
                      />
                    </button>
                    <button onClick={() => dispatch(productUpdate(x.id))}>
                      <BsFillPencilFill
                        style={{ color: "yellow", fontSize: "20px" }}
                      />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="update" onClick={() => dispatch(editModeCancel(x.id))}>
                      Cancel
                    </button>
                    <button className="update" onClick={() => UpdateSave(x)}>Save</button>
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })
      :'No Item to display'
    }
    </>
    );
    
}

export default ItemList;


// {
//   "id": 2,
//   "image": "https://w7.pngwing.com/pngs/313/947/png-transparent-gray-sony-smartwatch-sony-smartwatch-android-wear-smart-watches-gadget-electronics-mobile-phone.png",
//   "name": "Watch",
//   "price": 3999,
//   "rating": 3,
//   "editable": false,
//   "content": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex minima, quibusdam repellat dolorum dicta deserunt consequuntur quaerat neque. Rem omnis ab, iusto numquam voluptas dolore? Expedita perferendis iure cupiditate odio."
// },
// {
//   "id": 4,
//   "name": "CHAIR",
//   "image": "https://e7.pngegg.com/pngimages/184/85/png-clipart-throne-chair-red-throne-miscellaneous-furniture.png",
//   "price": 999,
//   "rating": 5,
//   "editable": false,
//   "content": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex minima, quibusdam repellat dolorum dicta deserunt consequuntur quaerat neque. Rem omnis ab, iusto numquam voluptas dolore? Expedita perferendis iure cupiditate odio."
// }