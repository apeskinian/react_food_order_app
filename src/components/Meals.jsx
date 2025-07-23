import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";

// creating the config outside of the component function to stop an infinite
// loop when sending the httpRequest
const requestConfig = {};

export default function Meals({  }) {
    // using the custom useHttp hook to retrieve the meal data
    // destructuring the returned data into a const
    const { 
        data: loadedMeals,
        isLoading,
        error
        // sending the url, an empty object as is GET request and initial data
        // for the meals
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p>Fetching meals...</p>;
    }

    return (
        <ul id='meals'>
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    )
}