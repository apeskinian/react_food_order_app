import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext.jsx";

function App() {
  return (
    <>
      {/* wrapping the Header and Meals components gives access to the cart
      context to them and all nested components. */}
      <CartContextProvider>
        <Header />
        <Meals />
      </CartContextProvider>
    </>
  );
}

export default App;
