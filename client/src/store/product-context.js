import { createContext, useContext, useEffect, useState } from "react";
import secureLocalStorage from 'react-secure-storage'
import { UiContext } from "./ui-context";

const ProductContext = createContext({ getProductFromMainCategory: () => {}, cartItems: [], setCartItems:() => {}, addProductToCart:() => {}, getProductFromCart:() => {}, updateCartCount: () => {}, getProductById:() => {}, buy_products: () => {} })

const ProductProvider = (props) => {
    const uiContext = useContext(UiContext)

    const [cartItems, setCartItems] = useState([])
    const updateCartItems = (item) => {
        setCartItems(prevItems => [...prevItems, item])
    }

    // * Product Route Calls * //

    const getProductFromMainCategory = async (main_category) => {
        const response = await fetch('http://localhost:5000/product/get_from_main_category', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ token: secureLocalStorage.getItem('token'), main_category: main_category })
        })
        .then(response => response.json())

        return response
    }
    
    const addProductToCart = async (product_id) => {
        const response = await fetch('http://localhost:5000/product/add_to_cart', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: secureLocalStorage.getItem('token'), product_id: product_id})
        })
        .then(res => res.json())

        return response
    }

    const getProductFromCart = async () => {
        const response =  await fetch('http://localhost:5000/product/get_from_cart', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: secureLocalStorage.getItem('token')})
        })
        .then(res => res.json())

        return response
    }

    const updateCartCount = async (product_id, count) => {
        const response = await fetch('http://localhost:5000/product/update_cart_count', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: secureLocalStorage.getItem('token'),product_id: product_id, count: count})
        })
        .then(res => res.json())

        return response
    }

    const getProductById = async (product_id) => {
        const response = await fetch('http://localhost:5000/product/get_product_by_id', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({_id: product_id, token: secureLocalStorage.getItem('token')})
        })
        .then(res => res.json())

        return response
    }

    const buy_products = async (product_ids) => {
        const response = await fetch('http://localhost:5000/product/buy_products', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: secureLocalStorage.getItem('token'), products: product_ids})
        })
        .then(res => res.json())

        console.log(response)

        if (response.status === "success") {
            uiContext.confirmModelHandler("Congratulations! You got a good deal 🎉 ", true)
        } else {
            uiContext.confirmModelHandler("Didnt work! Please wait...", true)
        }

        return response
    }

    return (
        <ProductContext.Provider value={{getProductFromMainCategory: getProductFromMainCategory, cartItems: cartItems, setCartItems: updateCartItems, addProductToCart: addProductToCart, getProductFromCart: getProductFromCart, updateCartCount: updateCartCount, getProductById: getProductById, buy_products: buy_products}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export {ProductProvider, ProductContext}