import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: [],
}


const findItem = action => item => {
    const id = item.id === action.payload.id
    const sizes = item.sizes === action.payload.sizes
    const types = item.types === action.payload.types
    return id && sizes && types
}

const findItemRemove = action => item => {
    const id = item.id === action.payload.id
    const sizes = item.sizes === action.payload.sizes
    const types = item.types === action.payload.types
    return !(id && sizes && types)
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addItem: (state, action) => {
        //     state.items.push(action.payload)
        //     state.totalPrice = state.items.reduce((sum, obj) => {
        //         return obj.price + sum
        //     }, 0)
        // },

        addItem: (state, action) => {
            console.log(action.payload)
            const findPizza = state.items.find(findItem(action))

            if (findPizza) {
                findPizza.count++
            }else{
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        removeItem: (state, action) => {
            const identifyPizza = state.items.find(findItem(action))
            if (identifyPizza){
                state.totalPrice = state.totalPrice - (identifyPizza.count * identifyPizza.price)
            }
            state.items = state.items.filter(findItemRemove(action))

        },
        minusItem: (state, action) => {
            const findPizza = state.items.find(findItem(action))
            if (findPizza && findPizza.count > 1){
                findPizza.count--
                state.totalPrice = state.totalPrice - findPizza.price
            }else if (findPizza.count === 1){
                const identifyPizza = state.items.find(findItem(action))
                if (identifyPizza){
                    state.totalPrice = state.totalPrice - (identifyPizza.count * identifyPizza.price)
                }
                state.items = state.items.filter(findItemRemove(action))
            }
        },
        clearItem: (state) => {
            state.items = []
            state.totalPrice = 0
        },
        totalPrice: (state, action) => {
            state.totalPrice += action.payload
        }
    }
})

export const {addItem, removeItem, minusItem, clearItem} = cartSlice.actions

export default cartSlice.reducer