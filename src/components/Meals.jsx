import { useState, useEffect } from "react";
import MealItem from "./MealItem.jsx";

export default function Meals({  }) {
    const [ loadedMeals, setLoadedMeals ] = useState([]);
    
    // useEffect to load the meals and prevent reloading every time
    useEffect(() => {
        // async function inside component function is allowed so we can use await
        async function fetchMeals() {
            const response = await fetch('http://localhost:3000/meals');
            if (!response.ok) {
                // handle error
            }
            const meals = await response.json();
            setLoadedMeals(meals);
        }
        fetchMeals();
    }, []);

    return (
        <ul id='meals'>
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    )
}