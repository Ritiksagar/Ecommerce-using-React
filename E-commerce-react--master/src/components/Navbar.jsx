import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function Navbar() {
  const {cart}=useSelector((state)=>state.cart)
  return (
    <>
    
    <header>
      <div className='leftDiv'>
        <nav>
          <ul>
            <li>
              <img className='profile' src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile" />
              
            </li>
            <li>
<Link to='/add'>Add Product</Link>
            </li>
            <li>
             <Link to='/cart' >
              <div className='cart'>
                <img src="https://cdn-icons-png.flaticon.com/512/3737/3737372.png" alt="" />
                <span>{cart.length}</span>
              </div>
             </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='rightDev'>
       <Link to='/'>
        <h2>eCommerce</h2>
       </Link>
      </div>
    </header>
    </>
  )
}

export default Navbar;