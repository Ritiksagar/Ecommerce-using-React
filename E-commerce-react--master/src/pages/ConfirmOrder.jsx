import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'
function ConfirmOrder() {
  return (
    <div className='confirmOrder'>

      <div className="text-center">
      <h2>Your order received successfully &#127881;</h2>
 <Link to='/'>
   <Button variant="info" >Buy More</Button>
 </Link>
    </div>
    </div>
  )
}

export default ConfirmOrder;