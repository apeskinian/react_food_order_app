import Modal from "./UI/Modal";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting.js";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalAmount, item) => {
        return totalAmount + (item.price * item.quantity)
    }, 0)

    function handleClose() {
        userProgressCtx.hideCheckout();
    };

    // manual form validation
    function handleSubmit(event) {
        // preventing the submission of the form
        event.preventDefault();
        // getting the form data which uses the name tag
        const fd = new FormData(event.target);
        // create an object containing the form data
        // { email: tesstyuza@gmail.com }
        const customerData = Object.fromEntries(fd.entries());
        
        // sending a POST of the data to the backend
        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        });
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label='Full Name' type='text' id='name' />
                <Input label='Email Address' type='email' id='email' />
                <Input label='Street' type='text' id='street' />
                <div className="control-row">
                    <Input label='Postal Code' type='text' id='postal-code' />
                    <Input label='City' type='text' id='city' />
                </div>
                <p className="modal-actions">
                    <Button type='button' textOnly onClick={handleClose}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    )
}