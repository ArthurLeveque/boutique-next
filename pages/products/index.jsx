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
            <h1 className='text-center text-4xl font-bold'>Les produits</h1>

            <ul className='flex flex-wrap mt-10'>
                {!loaded &&
                    <p>Loading...</p>
                }
                {loaded && productsData.map(product => {
                    return (
                        <li key={product.id} className="border-2 border-black px-8 py-2 w-1/5 text-center"><Link href={`/products/${product.id}`}>{product.name}</Link></li>
                    )
                })}
            </ul>
        </div>
    );
};

export default products;