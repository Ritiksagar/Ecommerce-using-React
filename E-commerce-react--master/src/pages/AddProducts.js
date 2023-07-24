import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/reducers/product";
function AddProducts() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    price: "",
    rating: "",
    content: "",
    image: "",
    // editable: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(createProduct(data));
    setData({
      name: "",
      price: "",
      rating: "",
      content: "",
      image: "",
    });
  };
  return (
    <div className="mainCreate">
      <div className="createItem">
        <div className="text-left">
          {/* heading */}
          <h3>Add Product</h3>
        </div>
        <div>
          {/* form */}
          <Form className="formController" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="boldLabel">Name</Form.Label>
              <Form.Control
                type="text"
                value={data.name}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
              <Form.Label className="boldLabel">Description</Form.Label>

              <Form.Control
                as="textarea"
                value={data.content}
                style={{ height: "100px" }}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
              />
            </FloatingLabel>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="boldLabel">Price</Form.Label>
              <Form.Control
                type="number"
                value={data.price}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="boldLabel">Rating</Form.Label>
              <Form.Control
                type="number"
                value={data.rating}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    rating: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="boldLabel">Image</Form.Label>
              <Form.Control
                type="text"
                value={data.image}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    image: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
