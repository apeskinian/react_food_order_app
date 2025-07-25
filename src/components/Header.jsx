import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    // getting total number of items by using the reduce method which iterates
    // through for each item and adds the item.quantity to the
    // totalNumberOfItems counter with a starting value of 0.
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0)

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logoImg} alt='restaurant logo'/>
                <h1>Apeskinian's Rest Bites</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}