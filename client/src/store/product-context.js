import { createContext, useContext, useEffect, useState } from "react";
import secureLocalStorage from 'react-secure-storage'
import { UiContext } from "./ui-context";

const ProductContext = createContext({ getProductsByName: () => {}, searchString: "", setSearchString: () => {}, getProductFromMainCategory: () => {}, cartItems: [], setCartItems:() => {}, addProductToCart:() => {}, getProductFromCart:() => {}, updateCartCount: () => {}, getProductById:() => {}, buy_products: () => {}, remove_from_cart: () => {}, updateCartItems: () => {}, removeFromCartItems: () => {} })
const ProductProvider = (props) => {
    const uiContext = useContext(UiContext)

    const [searchString, setSearchString] = useState("null")
    const [cartItems, setCartItems] = useState([])
    
    const updateCartItems = (item) => {
        setCartItems(prevItems => [...prevItems, item])
    }
    const removeFromCartItems = (item) => {
        console.log(cartItems)
        const filteredData = cartItems.filter(e => e !== item)
        setCartItems(filteredData)
    }

    // * Product Route Calls * //

    const getProductFromMainCategory = async (main_category) => {
        const response = await fetch('http://localhost:8000/product/get_from_main_category', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ token: secureLocalStorage.getItem('token'), main_category: main_category })
        })
        .then(response => response.json())
        return response
    }

    const getProductsByName = async () => {
        const response = await fetch('http://localhost:8000/product/get_by_name', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({text: searchString})
        })
        .then(res => res.json())
        console.log(response)
        return response
    }
    
    const addProductToCart = async (product_id) => {
        updateCartItems(product_id)
        const response = await fetch('http://localhost:8000/product/add_to_cart', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: secureLocalStorage.getItem('token'), product_id: product_id})
        })
        .then(res => res.json())

        console.log(response)

        return response
    }

    const getProductFromCart = async () => {
        const response =  await fetch('http://localhost:8000/product/get_from_cart', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: secureLocalStorage.getItem('token')})
        })
        .then(res => res.json())

        const items_ids = response.message.map(ele => ele._id)
        setCartItems(items_ids)
        console.log(cartItems)
        return response
    }

    const updateCartCount = async (product_id, count) => {
        const response = await fetch('http://localhost:8000/product/update_cart_count', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: secureLocalStorage.getItem('token'),product_id: product_id, count: count})
        })
        .then(res => res.json())

        return response
    }

    const getProductById = async (product_id) => {
        const response = await fetch('http://localhost:8000/product/get_product_by_id', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({_id: product_id, token: secureLocalStorage.getItem('token')})
        })
        .then(res => res.json())

        return response
    }

    const buy_products = async (product_ids) => {
        const response = await fetch('http://localhost:8000/product/buy_products', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: secureLocalStorage.getItem('token'), products: product_ids})
        })
        .then(res => res.json())

        if (response.status === "success") {
            uiContext.confirmModelHandler("Congratulations! You got a good deal 🎉 ", true)
        } else {
            uiContext.confirmModelHandler("Didnt work! Please wait...", true)
        }

        return response
    }

    const remove_from_cart = async (product_id) => {
        const response = await fetch('http://localhost:8000/product/remove_from_cart', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: secureLocalStorage.getItem('token'), product_id: product_id})
        })
        .then(res => res.json())

        // if (response.status === "success") {
        //     uiContext.confirmModelHandler("Congratulations! You got a good deal 🎉 ", true)
        // } else {
        //     uiContext.confirmModelHandler("Didnt work! Please wait...", true)
        // }

        return response
    }

    return (
        <ProductContext.Provider value={{getProductsByName: getProductsByName, searchString: searchString, setSearchString: setSearchString, getProductFromMainCategory: getProductFromMainCategory, cartItems: cartItems, setCartItems: updateCartItems, addProductToCart: addProductToCart, getProductFromCart: getProductFromCart, updateCartCount: updateCartCount, getProductById: getProductById, buy_products: buy_products, remove_from_cart: remove_from_cart, updateCartItems: updateCartItems, removeFromCartItems: removeFromCartItems}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export {ProductProvider, ProductContext}