import Modal from "./UI/Modal";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting.js";
import useHttp from "../hooks/useHttp.js";
import ErrorMessage from "./Error.jsx";

// setting request config to stop an infinite loop, we still need the body
// content though so we get the sendRequest function in the component function
// so that we can send a custom sendRequest manually when ready
const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    // destructuring the data from useHttp and making sure sendRequest
    // is retrieved as we need that to send the request once we have the body
    // content further down
    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig, )

    const cartTotal = cartCtx.items.reduce((totalAmount, item) => {
        return totalAmount + (item.price * item.quantity)
    }, 0)

    function handleClose() {
        userProgressCtx.hideCheckout();
    };
    
    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    // manual form validation
    function handleSubmit(event) {
        // preventing the submission of the form
        event.preventDefault();
        // getting the form data which uses the name tag
        const fd = new FormData(event.target);
        // create an object containing the form data
        // { email: tesstyuza@gmail.com }
        const customerData = Object.fromEntries(fd.entries());

        // manually call sendRequest and adding the order info as the data
        // argument which will then be added to the config as the body
        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData, 
                },
            })
        );
    }

    let actions = (
        <>
            <Button type='button' textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>You should receive an order confirmation email shortly.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
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
                {error && <ErrorMessage title='Failed to submit order.' message={error} />}
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    )
}