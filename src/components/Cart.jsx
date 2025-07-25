import { useContext } from "react"
import Modal from "./UI/Modal"
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";


export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalAmount, item) => {
        return totalAmount + (item.price * item.quantity)
    }, 0)

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
        // using the userProgressCtx.progress value as a boolean to check
        // if the modal should be open
        <Modal
            className='cart'
            open={userProgressCtx.progress === 'cart'}
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
        >
            <h2>Your Basket</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    );
}