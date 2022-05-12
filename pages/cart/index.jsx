import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

const products = () => {
    const [cartData, setCartData] = useState();
    const [loaded, setLoaded] = useState(false);

    const [userID, setUserID] = useState('');

    const userCookie = getCookie('userId');

    var totalPrice = 0;

    const getCartData = async () => {
        const products = await axios.get("/api/cart", {userId: userID})
        setCartData(products.data);
        setLoaded(true);
    };

    useEffect(() => {
        setUserID(userCookie)
    }, [userCookie])

    useEffect(() => {
            getCartData()
    }, [setCartData])

    return (
        <div>     
            <h1>Les produits</h1>

            {!loaded &&
                    <p>Loading...</p>
            }
            {loaded && 
                <div>
                    <ul>
                        {cartData.map(product => {
                            totalPrice = totalPrice + (product.product.price * product.quantity)
                            return (
                                <li key={product.id}><Link href={`/products/${product.product.id}`}>{product.product.name}</Link> {product.product.price}€ x{product.quantity}</li>
                            )
                        })}
                    </ul>
                    <p>Prix total : {totalPrice}€</p>
                </div>
            }
            
        </div>
    );
};

export default products;