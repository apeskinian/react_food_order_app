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
            updatedItems[existingCartItemIndex] = updatedItem;
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
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        // getting existing item
        const existingCartItem = state.items[existingCartItemIndex]
        // check existing item quantity
        // create a copy of the items
        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            // use splice to remove a set amount of items from the array
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            // create updated item with quantity changed
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return { ...state, items: updatedItems };
    }

    return state;
}

export function CartContextProvider({ children }) {
    // defining state to be used for context
    const [ cart, dispatchCartAction ] = useReducer(cartReducer, { items: [] });
    // defining context for the cartReducer function above
    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item: item });
    }
    // defining context for the cartReducer function above
    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
    }
    // setting context to use as the value to the CartContext component wrapper
    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
    }

    console.info(cartContext)

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext;