import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const index = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [userID, setUserID] = useState('');

    const userCookie = getCookie('userId');

    const data = {
        name: name,
        description: description,
        price: price,
        userId: parseInt(userID)
    };

    const addProduct = async () => {
        const request = await axios.post("/api/products/add", data);
        if(request.status === 200) {
            router.push(`/products/${request.data.id}`);
        }
    }

    useEffect(() => {
        setUserID(userCookie)
    }, [userCookie])

    return (
        <div className='flex justify-center'>
            <form action="post" className='max-w-screen-lg flex justify-center flex-col'>
                <label htmlFor="input-name-product">Nom du produit</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id='input-name-product' className='my-2 border-black border-2'/>

                <label htmlFor="input-description-product">Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} id='input-description-product' className='my-2 border-black border-2'/>

                <label htmlFor="input-price-product">Prix</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} id='input-price-product' className='my-2 border-black border-2'/>

                <button type="button" onClick={() => addProduct()} className='my-2 bg-[#272A30] text-gray-300 px-8 text-sm py-2 rounded-md'>Poster l'offre</button>
            </form>
        </div>
    );
};

export default index;