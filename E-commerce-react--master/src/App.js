import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/reducers/product";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AddProducts,
  Home,
  Cart,
  Product,
  NotFound,
  ConfirmOrder,
} from "./pages";
import {
  Navbar,
  Loader,
  Item,
  ItemList,
  FilterData,
  Counter,
  Footer,
} from "./components";
import "./styles/cart.css";
import "./styles/product.css";
import "./styles/addproduct.css";
import "./styles/notfound.css";
import "./styles/loader.css";
import "./styles/navbar.css";
import "./styles/confirmOrder.css";
import "./styles/globalVariable.css";
import "./styles/filterData.css";
import "./styles/itemList.css";
import "./styles/totalprice.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const { product, isLoading } = useSelector((state) => state.product);
  // console.log("LOADING**", isLoading);
  if (false) {
    return <h1>LOADING ....</h1>;
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/add" element={<AddProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirmorder" element={<ConfirmOrder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
