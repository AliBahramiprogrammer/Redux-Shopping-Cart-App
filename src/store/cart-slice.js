import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         itemsList: [],
//         totalQuantity: 0,
//         showCart: false,
//         changed: false,
//     },
//     reducers: {
//         replaceData(state , action) {
//             state.totalQuantity = action.payload.totalPrice;
//             state.itemsList = action.payload.itemsList
//             state.totalQuantity = action.payload.totalQuantity
//         },
//         addToCart(state, action) {
//             state.changed = true
//             const newItem = action.payload;
//             // To check if item is already available
//             const existingItem = state.itemsList.find(
//                 (item) => item.id === newItem.id
//             );

//             if (existingItem) {
//                 existingItem.quantity++;
//                 existingItem.totalPrice += newItem.price;
//             } else {
//                 state.itemsList.push({
//                     id: newItem.id,
//                     price: newItem.price,
//                     quantity: 1,
//                     totalPrice: newItem.price,
//                     name: newItem.name,
//                 });
//                 state.totalQuantity++;
//             }
//         },
//         removeFromCart(state, action) {
//             console.log(111);
//             state.changed = true;
//             const newItem = action.payload;
//             console.log(newItem);
//             const itemSelected = state.itemsList.find(
//                 (item) => item.id === newItem
//             );
//             if (itemSelected.quantity == 1) {
//                 state.itemsList = state.itemsList.filter(
//                     (item) => item.id !== newItem
//                 );
//                 state.totalQuantity--;
//             } else {
//                 itemSelected.quantity = itemSelected.quantity - 1;
//                 itemSelected.totalPrice -= itemSelected.price;
//             }
//         },
//         setShowCart(state) {
//             state.showCart = !state.showCart;
//         },
//     },
// });

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false,
        changed: false,
    },
    reducers: {
        replaceData(state , action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.itemsList = action.payload.itemsList || [];
            },
        addToCart(state, action) {
            state.changed = true;
            const newItem = action.payload;
            const existingItem = state.itemsList.find((item) => item.id === newItem.id);
            
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price
            } else {
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                })
                state.totalQuantity++;
            }
        },
        removeFromCart(state, action) {
            state.changed = true;
            const newItem = action.payload;
            const itemSelected = state.itemsList.find((item) => item.id === newItem);

            if (itemSelected.quantity === 1) {
                state.itemsList = state.itemsList.filter((item) => item.id !== newItem);
                state.totalQuantity--;
            } else {
                itemSelected.quantity--;
                itemSelected.totalPrice -= itemSelected.price;
            }

         },
        setShowCart(state) {
            state.showCart = !state.showCart
        },
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;
