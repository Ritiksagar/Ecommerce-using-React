import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// product get
export const fetchData = createAsyncThunk("product/fetchData", async () => {
  try {
    const response = await fetch(" https://jsonapi-fay8.onrender.com/product");
    let data= await response.json();
    // console.log("jsonn",data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
});
// product delete
export const deleteData = createAsyncThunk(
  "product/deleteData",
  async (productid) => {
    try {
      const response = await fetch(
        `https://jsonapi-fay8.onrender.com/product/${productid}`,
        {
          method: "DELETE",
        }
      );
      return productid;
    } catch (error) {
      throw new Error(error);
    }
  }
);
// product post
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData) => {
    try {
      const response = await fetch(" https://jsonapi-fay8.onrender.com/product", {
        method: "POST",
        body: JSON.stringify({ ...productData, editable: true }),
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

// editable mode  update method
export const productUpdate = createAsyncThunk(
  "product/productUpdate",
  async (productId) => {
    try {
      const response = await fetch(
        `https://jsonapi-fay8.onrender.com/product/${productId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ editable: false }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
);

// editable mode cancel  update method
export const editModeCancel = createAsyncThunk(
  "product/editModeCancel",
  async (productId) => {
    try {
      const response = await fetch(
        `https://jsonapi-fay8.onrender.com/product/${productId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ editable: true }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
);

// updateCall
export const updateCall = createAsyncThunk(
  "product/updateCall",
  async (user) => {
    try {
      const response = await fetch(`https://jsonapi-fay8.onrender.com/product/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify(user),
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

const initialState = {
  product: [],
  isLoading: false,
  isError: null,
  sorted: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    toggleSort: (state, action) => {
      console.log("reduce", state);
      state.sorted = !state.sorted;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      console.log("responsese", action.payload);
      state.isLoading = false;
      console.log("****", state.isLoading);
      state.product = action.payload;
      state.isError = null;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });

    builder.addCase(deleteData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = state.product.filter((p) => p.id !== action.payload);
      state.isError = null;
    });

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.product.push(action.payload);
    });

    builder.addCase(productUpdate.fulfilled, (state, action) => {
      const { editable, id, name } = action.payload;
      const product = state.product.find((x) => x.id === id);
      if (product) {
        product.editable = false;
      }
    });

    builder.addCase(editModeCancel.fulfilled, (state, action) => {
      const { editable, id, name } = action.payload;
      const product = state.product.find((x) => x.id === id);
      if (product) {
        product.editable = true;
      }
    });

    builder.addCase(updateCall.fulfilled, (state, action) => {
      const { id, name, price, content, rating } = action.payload;
      console.log("huy", id, name, price, content);
      const product = state.product.find((x) => x.id === id);
      if (product) {
        product.editable = true;
        product.name = name;
        product.price = price;
        product.content = content;
        product.rating = rating;
      }
    });
  },
});
export const productReducer = productSlice.reducer;
export const { toggleSort } = productSlice.actions;
