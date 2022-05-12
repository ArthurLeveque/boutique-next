import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

const index = () => {
    const router = useRouter();
    const { id } = router.query;

    const [productData, setProductData] = useState();
    const [authorData, setAuthorData] = useState();
    const [loaded, setLoaded] = useState(false);

    const [userID, setUserID] = useState('');

    const userCookie = getCookie('userId');

    const data = {
        userId: parseInt(userID),
        productId: parseInt(id)
    };

    const getProductData = async () => {
        const product = await axios.get(`/api/products/${id}`);
        setProductData(product.data);
        console.log(product.data)

        setAuthorData(product.data.user);

        setLoaded(true);
    };

    const addToCart = () => {
        axios.post(`/api/cart/add`, data);
    }

    useEffect(() => {
        setUserID(userCookie)
    }, [userCookie])

    useEffect(() => {
        if(id) {
            getProductData();
        }
    }, [id])

    return(
        <div>
            {!loaded &&
                <p>Loading...</p>
            }
            {loaded && productData &&
                <div>
                    <div>
                        <h1>{productData.name}</h1>
                        <i>Par : {authorData.name}</i>
                        <p>{productData.description}</p>
                        <p>{productData.price} €</p>
                    </div>

                    {userID &&
                        <button type="button" onClick={() => addToCart()}>Ajouter au panier</button>
                    }
                </div>
            }
        </div>
    );
};

export default index;