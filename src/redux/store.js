import { configureStore } from '@reduxjs/toolkit'
import filterPizza from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import dates from "./slices/pizzasSlice"
import pizza from "./slices/pizzaItems"

export const store = configureStore({
    reducer: {
        filterPizza,
        cart,
        dates,
        pizza,
    },
})