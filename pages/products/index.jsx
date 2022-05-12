import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const products = () => {
    const [productsData, setpProductsData] = useState();
    const [loaded, setLoaded] = useState(false);

    const getProductsData = async () => {
        const products = await axios.get("/api/products")
        setpProductsData(products.data);
        setLoaded(true);
    };

    useEffect(() => {
        getProductsData()
    }, [setpProductsData])

    return (
        <div>     
            <h1>Les produits</h1>

            <ul>
                {!loaded &&
                    <p>Loading...</p>
                }
                {loaded && productsData.map(product => {
                    return (
                        <li key={product.id}><Link href={`/products/${product.id}`}>{product.name}</Link></li>
                    )
                })}
            </ul>
        </div>
    );
};

export default products;