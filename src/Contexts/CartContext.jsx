import { useToast } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import { updateCart } from "../Components/API";

export const CartContext = createContext();
const cCount = JSON.parse(localStorage.getItem("cartCount")) || 0;
const cProduct = JSON.parse(localStorage.getItem("cartProduct")) || [];

function CartContextProvider({ children }) {
  const [cartCount, setCartCount] = useState(cCount);
  const [cartProduct, setCartProduct] = useState(cProduct);
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  let regStatus = JSON.parse(localStorage.getItem("regStatus")) || false;

  useEffect(() => {
    localStorage.setItem("cartCount", JSON.stringify(cartCount));
  }, [cartCount]);

  useEffect(() => {
    localStorage.setItem("cartProduct", JSON.stringify(cartProduct));
    updateCart(user.id, cartProduct);
  }, [cartProduct]);


  const handleCartProduct = async (p) => {
    // checking authentication before adding product to cart
    if (!regStatus) {
      toast({
        title: 'Please Login/signup to add product to cart', position: 'bottom-left', status: 'error', duration: 3000, isClosable: true,
      });
    }

    // is product already exists
    const isAlreadyExist = cartProduct.filter((product) => p.id === product.id);
    if (isAlreadyExist.length) return toast({
      title: 'Product already exists in cart', position: 'bottom-left', status: 'info', duration: 5000, isClosable: true,
    });

    try {
      p.quantity = 1;
      // adding product to database
      await updateCart(user.id, [...cartProduct, p]);

      // addding product to cart
      setCartProduct([...cartProduct, p]);

      // setting cart count
      setCartCount(cartCount + 1)

      // success message 
      toast({
        title: `${p.title} is added to cart`, position: 'bottom-left', status: 'success', duration: 5000, isClosable: true,
      })

    } catch (error) {
      console.log(error);

      //error
      toast({
        title: 'Something went wrong', position: 'bottom-left', status: 'error', duration: 5000, isClosable: true,
      })
    }

  };

  const removeCartItem = async (id) => {
    const cProducts = cartProduct.filter((el) => el.id !== id);

    try {
      // removing product from database
      await updateCart(user.id, cProducts);

      // removing product from cart
      setCartProduct(cProducts);

      // setting cart count
      setCartCount(cartCount - 1);

      // success message 
      toast({
        title: `product is removed from cart`, position: 'bottom-left', status: 'success', duration: 5000, isClosable: true,
      })

    } catch (error) {
      console.log(error);
      //error
      toast({
        title: 'Something went wrong', position: 'bottom-left', status: 'error', duration: 5000, isClosable: true,
      })
    }

  }

  return (
    <CartContext.Provider
      value={{
        handleCartProduct,
        setCartProduct,
        cartProduct,
        cartCount,
        removeCartItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
