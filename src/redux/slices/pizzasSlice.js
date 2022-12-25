import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    items: [],
    status: 'loading',
}

export const fetchPizza = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params) => {

        const {sortBy, order, category, search, currentPage} = params
        const response = await axios.get(
            `https://637c636572f3ce38eaa0e257.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}&${category}${search}`
        )
        return response.data
    }
)


const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    extraReducers: {
        [fetchPizza.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizza.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizza.rejected]: (state) => {
            state.status = 'error'
        }
    }
})

export default pizzasSlice.reducer