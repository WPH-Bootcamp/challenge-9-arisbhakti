import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import themeReducer from "../features/theme/themeSlice";
import cartReducer from "../features/cart/cartSlice";
import categoryFilterReducer from "../features/filters/categoryFilterSlice";
import homeCoachModalReducer from "../features/modals/homeCoachModalSlice";
import reviewModalReducer from "../features/modals/reviewModalSlice";
import profileModalReducer from "../features/modals/profileModalSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
    cart: cartReducer,
    categoryFilters: categoryFilterReducer,
    homeCoachModal: homeCoachModalReducer,
    reviewModal: reviewModalReducer,
    profileModal: profileModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
