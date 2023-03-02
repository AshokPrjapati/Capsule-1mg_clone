import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchUser, updateCart } from "../Components/API";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const fetchCartData = async (id) => {
  try {
    let res = await fetchUser();
    let users = await res.data;
    if (users.length) {
      let user = users.filter(u => u.id === id);
      return user[0]?.cart || [];
    } else return [];
  } catch (error) {
    console.log(error)
  }
}

function CartContextProvider({ children }) {
  const [load, setLoad] = useState(false);
  const { userData } = useContext(AuthContext);
  const [cartProduct, setCartProduct] = useState([]);
  const [discount, setDiscount] = useState();
  const [isCoupanApplied, setIsCoupanApplied] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchCartData(userData.id).then(res => setCartProduct(res));
  }, [])


  useEffect(() => {
    localStorage.setItem("cartProduct", JSON.stringify(cartProduct));
  }, [cartProduct]);


  const handleCartProduct = async (p, setLoading) => {
    console.log(cartProduct)

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
      getDiscount();

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
      getDiscount();

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
    let title = status ? "Coupan Applied Successfully" : "Coupon removed";
    toast({
      title,
      position: 'bottom-left',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  }

  // calculating discounting by getting mrp from database
  const getDiscount = () => {
    setLoad(true);
    fetchUser().then(res => {
      let mrp = 0;
      let price = 0;
      let dis = 0;
      const users = res.data;
      let user = users.filter(u => u.id === userData.id);
      let cart = user[0].cart;
      if (cart.length) {
        cart.forEach(product => {
          product["strike-price"] ? mrp += product["strike-price"] * product.quantity : mrp += product.price * product.quantity
          price += product.price * product.quantity
        })
      }
      if (mrp) dis += mrp - price;
      if (isCoupanApplied) dis += price * .10;
      setLoad(false);
      setDiscount(dis.toFixed(2));
    }).catch((err) => setLoad(false));
  };

  useEffect(() => {
    getDiscount();
  }, [isCoupanApplied]);

  return (
    <CartContext.Provider
      value={{
        handleCartProduct,
        setCartProduct,
        cartProduct,
        handleCoupanStatus,
        removeCartItem,
        isCoupanApplied,
        getDiscount,
        discount,
        load
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
