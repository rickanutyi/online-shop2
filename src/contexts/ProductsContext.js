import React, { createContext, useReducer, useState } from "react";
import axios from "axios";
import {
  calcSubPrice,
  calcTotalPrice,
  getCountProductsInCart,
} from "../helpers/CartFunction";
export const productsContext = createContext();

const INIT_STATE = {
  products: [],
  paginateProducts: [],
  currentProduct: {},
  cartLength: getCountProductsInCart(),
  cart: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_CURRENT_PRODUCT":
      return { ...state, currentProduct: action.payload };
    case "GET_PAGINATE_PRODUCTS":
      return { ...state, paginateProducts: action.payload };
    case "CHANGE_CARD_COUNT":
      return { ...state, cartLength: action.payload };
    case "GET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const getProducts = async (params) => {
    const { data } = await axios(
      `https://erlan-shop-shop.herokuapp.com/api/products?${params}`
    );

    dispatch({
      type: "GET_PRODUCTS",
      payload: data,
    });
  };
  //wdwe
  async function getPageProducts(page = 1) {
    const { data } = await axios(
      `https://erlan-shop-shop.herokuapp.com/api/products?_page=${page}&_limit=4`
    );

    dispatch({
      type: "GET_PAGINATE_PRODUCTS",
      payload: data,
    });
  }
  const getCurProduct = async (id) => {
    const { data } = await axios(
      `https://erlan-shop-shop.herokuapp.com/api/products/${id}`
    );
    dispatch({
      type: "GET_CURRENT_PRODUCT",
      payload: data,
    });
  };
  //корзина
  const [cartProducts, setCartProducts] = useState([]);

  function addToBasket(cardToBasket) {
    let productInBasket = JSON.parse(localStorage.getItem("Basket"));
    if (!productInBasket) {
      productInBasket = {
        cardToBasket: [],
        totalPrice: 0,
      };
    }
    let newProduct = {
      item: cardToBasket,
      count: 1,
      subPrice: 0,
    };

    let filteredCard = productInBasket.cardToBasket.filter(
      (elem) => elem.item.id === cardToBasket.id
    );
    if (filteredCard.length > 0) {
      productInBasket.cardToBasket.filter(
        (elem) => elem.item.id !== cardToBasket.id
      );
    } else {
      productInBasket.cardToBasket.push(newProduct);
    }
    newProduct.subPrice = calcSubPrice(newProduct);
    productInBasket.totalPrice = calcTotalPrice(productInBasket.cardToBasket);

    // productInBasket.cardToBasket.push(newPeoduct);
    localStorage.setItem("Basket", JSON.stringify(productInBasket));

    dispatch({
      type: "CHANGE_CARD_COUNT",
      payload: productInBasket.cardToBasket.length,
    });
  }

  function getProductsFromBasket() {
    let productInBasket = JSON.parse(localStorage.getItem("Basket"));
    if (!productInBasket) {
      productInBasket = {
        cardToBasket: [],
        totalPrice: 0,
      };
    }
    dispatch({
      type: "GET_CART",
      payload: productInBasket,
    });
  }

  function changeProductCount(count, id) {
    let cart = JSON.parse(localStorage.getItem("Basket"));
    cart.products = cart.cardToBasket.map((elem) => {
      if (elem.item.id === id) {
        elem.count = count;
        elem.subPrice = calcSubPrice(elem);
      }
      return elem;
    });
    cart.totalPrice = calcTotalPrice(cart.cardToBasket);
    localStorage.setItem("Basket", JSON.stringify(cart));
    getProductsFromBasket();
  }

  return (
    <productsContext.Provider
      value={{
        products: state.products,
        currentProduct: state.currentProduct,
        getProducts,
        getCurProduct,
        getPageProducts,
        paginateProducts: state.paginateProducts,
        addToBasket,
        cartLength: state.cartLength,
        cart: state.cart,
        cartProducts,
        getProductsFromBasket,
        changeProductCount,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
