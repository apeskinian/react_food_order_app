import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {}
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        // check whether item already exists in the cart by looking in
        // state.items and using findIndex to match the id of the item in
        // the action
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        // creating a copy of the current state
        const updatedItems = [...state.items];
        // if the item does not exist findIndex returns -1 so check for that:
        if (existingCartItemIndex > -1) {
            // get existing item
            const existingItem = state.items[existingCartItemIndex]
            // make a new version of the item with all the old properties
            // spread to it first
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            // overriding item in updatedItems with the new updatedItem
            updatedItem[existingCartItemIndex] = updatedItem;
        } else {
            // item didn't exist and so push to copy of state items and add
            // a quantity of 1
            updatedItems.push({ ...action.item, quantity: 1 });
        }
        // returning updated state by spreading original state and just
        // updating the items array
        return { ...state, items: updatedItems };
    }
    if (action.type === 'REMOVE_ITEM') {
        // remove an item
    }

    return state;
}

export function CartContextProvider({ children }) {
    useReducer(cartReducer, { items: [] });

    return <CartContext.Provider>{children}</CartContext.Provider>;
}

export default CartContext;