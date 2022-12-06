import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sort: {
        title: "популярности (DESC)",
        sortProperty: "rating",
    },
    currentPage: 1,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {

        changeIndex: (state, action) => {
            state.categoryId = action.payload
        },

        sortPizza: (state, action) => {
            state.sort = action.payload
        },

        onChangePage(state, action){
            state.currentPage = action.payload
        },
        setFilters: (state, action) => {
            state.sort = action.payload.sort
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)
        }
    }
})

export const {changeIndex, sortPizza, onChangePage, setFilters} = filterSlice.actions

export default filterSlice.reducer