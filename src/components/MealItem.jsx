import { useContext } from "react";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button";
import CartContext from "../store/CartContext.jsx";

export default function MealItem({ meal }) {
    // using the useContext hook to access the cart context and create a const
    // that is the cart
    const cartCtx = useContext(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to Basket</Button>
                </p>
            </article>
        </li>
    )
}