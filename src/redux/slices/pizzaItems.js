import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    data: null,
    status: 'loading',
}

export const fetchPizzaItem = createAsyncThunk(
    'pizza/fetchPizzaItem',
    async (id) => {

        const response = await axios.get(`https://637c636572f3ce38eaa0e257.mockapi.io/items/${id}`)
        return response.data
    }
)


const pizzaItem = createSlice({
    name: 'pizza',
    initialState,
    extraReducers: {
        [fetchPizzaItem.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchPizzaItem.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'success'
        },
        [fetchPizzaItem.rejected]: (state) => {
            state.status = 'error'
        }
    }
})

export default pizzaItem.reducer