import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { updateCart } from "../Components/API";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();
const cProduct = JSON.parse(localStorage.getItem("cartProduct")) || [];

function CartContextProvider({ children }) {
  const [cartProduct, setCartProduct] = useState(cProduct);
  const [isCoupanApplied, setIsCoupanApplied] = useState(false);
  const toast = useToast();
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem("cartProduct", JSON.stringify(cartProduct));
  }, [cartProduct]);


  const handleCartProduct = async (p, setLoading) => {

    // is product already exists
    const isAlreadyExist = cartProduct.filter((product) => p.id === product.id);
    if (isAlreadyExist.length) return toast({
      title: 'Product already exists in cart', position: 'bottom-left', status: 'info', duration: 5000, isClosable: true,
    });

    try {
      setLoading(true);
      p.quantity = 1;
      // adding product to database
      await updateCart(userData.id, [...cartProduct, p]);

      // addding product to cart
      setCartProduct([...cartProduct, p]);
      setLoading(false);

      // success message 
      toast({
        title: `${p.title} is added to cart`, position: 'bottom-left', status: 'success', duration: 5000, isClosable: true,
      })

    } catch (error) {
      console.log(error);
      setLoading(false);
      //error
      toast({
        title: 'Something went wrong', position: 'bottom-left', status: 'error', duration: 5000, isClosable: true,
      })
    }

  };

  const removeCartItem = async (id, setLoading) => {
    const cProducts = cartProduct.filter((el) => el.id !== id);

    try {
      setLoading(true)
      // removing product from database
      await updateCart(userData.id, cProducts);

      // removing product from cart
      setCartProduct(cProducts);
      setLoading(false)
      // success message 
      toast({
        title: `product is removed from cart`, position: 'bottom-left', status: 'success', duration: 5000, isClosable: true,
      })

    } catch (error) {
      console.log(error);
      // setLoading(false)
      //error
      toast({
        title: 'Something went wrong', position: 'bottom-left', status: 'error', duration: 5000, isClosable: true,
      })
    }

  }

  // updting coupan application status
  const handleCoupanStatus = async (status) => {
    setIsCoupanApplied(status);
  }


  // showing update message
  useEffect(() => {
    let title = isCoupanApplied ? "Coupan Applied Successfully" : "Coupon removed";
    toast({
      title,
      position: 'bottom-left',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  }, [isCoupanApplied]);

  return (
    <CartContext.Provider
      value={{
        handleCartProduct,
        setCartProduct,
        cartProduct,
        handleCoupanStatus,
        removeCartItem,
        isCoupanApplied
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
