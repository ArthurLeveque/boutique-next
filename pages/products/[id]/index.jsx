import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const index = () => {
    const router = useRouter();
    const { id } = router.query;

    const [productData, setProductData] = useState();
    const [authorData, setAuthorData] = useState();
    const [loaded, setLoaded] = useState(false);

    const getProductData = async () => {
        const product = await axios.get(`/api/products/${id}`);
        setProductData(product.data);
        console.log(product.data)

        setAuthorData(product.data.user);

        setLoaded(true);
    };

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
                    <h1>{productData.name}</h1>
                    <i>Par : {authorData.name}</i>
                    <p>{productData.description}</p>
                    <p>{productData.price} €</p>
                </div>
            }
        </div>
    );
};

export default index;