import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// cartItem get
export const fetchCartItem = createAsyncThunk(
  "product/fetchCartItem",
  async () => {
    try {
      const response = await fetch(" https://jsonapi-fay8.onrender.com/cart");

      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
);
// cartItem delete
export const removeCart = createAsyncThunk(
  "product/removeCart",
  async (productid) => {
    try {
      const response = await fetch(`https://jsonapi-fay8.onrender.com/cart/${productid}`, {
        method: "DELETE",
      });
      return productid;
    } catch (error) {
      throw new Error(error);
    }
  }
);
// push in cart
export const pushCart = createAsyncThunk(
  "product/pushCart",
  async (cartData) => {
    try {
      const response = await fetch(" https://jsonapi-fay8.onrender.com/cart", {
        method: "POST",
        body: JSON.stringify(cartData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
);

// increment
export const increment = createAsyncThunk("product/increment", async (cart) => {
  try {
    console.log("cartSlice", cart.count);
    const response = await fetch(`https://jsonapi-fay8.onrender.com/cart/${cart.id}`, {
      method: "PATCH",
      body: JSON.stringify({ qty: cart.count }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
});

// increment
export const decrement = createAsyncThunk("product/decrement", async (cart) => {
  try {
    const response = await fetch(`https://jsonapi-fay8.onrender.com/cart/${cart.id}`, {
      method: "PATCH",
      body: JSON.stringify({ qty: cart.count }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
});

const initialState = {
  cart: [],
  addToCart: false,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      console.log("reduce", state);
      state.addToCart = !state.addToCart;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItem.fulfilled, (state, action) => {
      state.cart = action.payload;
    });

    builder.addCase(removeCart.fulfilled, (state, action) => {
      state.cart = state.cart.filter((p) => p.id !== action.payload);
      state.addToCart = false;
    });

    builder.addCase(pushCart.fulfilled, (state, action) => {
      state.cart.push(action.payload);
      state.addToCart = true;
    });

    builder.addCase(increment.fulfilled, (state, action) => {
      const { id, qty } = action.payload;
      const cart = state.cart.find((x) => x.id === id);
      if (cart) {
        cart.qty = qty;
      }
    });

    builder.addCase(decrement.fulfilled, (state, action) => {
      const { id, qty } = action.payload;
      const cart = state.cart.find((x) => x.id === id);
      if (cart) {
        cart.qty = qty;
      }
    });
  },
});
export const cartReducer = CartSlice.reducer;
export const { toggleCart } = CartSlice.actions;
