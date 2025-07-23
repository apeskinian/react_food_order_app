import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '',
    showCart: () => {},
    hideCart: () => {}, 
    showCheckout: () => {}, 
    hideCheckout: () => {}
})

export function UserProgressContextProvider({children}) {
    // defining context items
    const [ userProgress, setUserProgress ] = useState('');
    function showCart() {
        setUserProgress('cart');
    }
    function hideCart() {
        setUserProgress('');
    }
    function showCheckout() {
        setUserProgress('checkout');
    }    
    function hideCheckout() {
        setUserProgress('');
    }    
    // setting context
    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (
        <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
    )
}

export default UserProgressContext;