import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch,useSelector } from 'react-redux';
import {toggleSort} from '../redux/reducers/product'
function FilterData() {
  const dispatch=useDispatch();
  const {sorted}=useSelector((state)=>state.product)

  return (
    <div className='filterBtn'>
<button onClick={()=>dispatch(toggleSort())}>{sorted?<>sort by price <AiOutlineClose className='colSet'/></>:"sort by price"}</button>
    </div>
  )
}

export default FilterData