import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// ---- Helper Functions ----
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// ---- Initial State ----
const initialState = {
  userData: null,
  currentCity: null,
  currentState: null,
  currentAddress: null,
  shopsInMyCity: null,
  itemInMyCity: null,
  cartItems: loadCartFromStorage(), // 👈 load from storage
  totalAmount: 0,
  myOrders: [],
  searchItems: null,
  socket: null,
};

// recalc total
const calculateTotal = (cartItems) => {
  return cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
};

initialState.totalAmount = calculateTotal(initialState.cartItems);

// ---- Slice ----
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setShopsInMyCity: (state, action) => {
      state.shopsInMyCity = action.payload;
    },
    setItemInMyCity: (state, action) => {
      state.itemInMyCity = action.payload;
    },

    // ---- CART SYSTEM ----
    addToCart: (state, action) => {
      
      const cartItem = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === cartItem.id);

      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        state.cartItems.push(cartItem);
      }

      state.totalAmount = calculateTotal(state.cartItems);
      saveCartToStorage(state.cartItems); // 👈 save to localStorage
      
    },

    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);

      if (item) {
        item.quantity = quantity;
      }

      state.totalAmount = calculateTotal(state.cartItems);
      saveCartToStorage(state.cartItems);
    },

    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      state.totalAmount = calculateTotal(state.cartItems);
      saveCartToStorage(state.cartItems);
      toast.success("Item has been Removed into CartPage !")
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      localStorage.removeItem("cartItems"); // 👈 clear after checkout
    },

    // ---- ORDERS ----
    setMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },
    addMyOrder: (state, action) => {
      state.myOrders = [action.payload, ...state.myOrders];
    },

    updateOrderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;
      const order = state.myOrders.find((o) => o._id === orderId);

      if (order) {
        if (order.shopOrders && order.shopOrders.shop._id === shopId) {
          order.shopOrders.status = status;
        }
      }
    },

    updateRealtimeOrderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;
      const order = state.myOrders.find((o) => o._id === orderId);

      if (order) {
        const shopOrder = order.shopOrders.find((so) => so.shop._id === shopId);
        if (shopOrder) {
          shopOrder.status = status;
        }
      }
    },

    // ---- Search & Socket ----
    setSearchItems: (state, action) => {
      state.searchItems = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const {
  setUserData,
  setCurrentCity,
  setCurrentState,
  setCurrentAddress,
  setShopsInMyCity,
  setItemInMyCity,
  addToCart,
  updateQuantity,
  removeCartItem,
  clearCart, // 👈 use this after checkout
  setMyOrders,
  addMyOrder,
  updateOrderStatus,
  updateRealtimeOrderStatus,
  setSearchItems,
  setSocket,
} = userSlice.actions;

export default userSlice.reducer;
