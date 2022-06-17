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
    const [imageUploaded, setImageUploaded] = useState(null);

    const userCookie = getCookie('userId');

    const data = {
        name: name,
        description: description,
        price: price,
        userId: parseInt(userID)
    };

    const addProduct = async (e) => {
        e.preventDefault();

        const request = await axios.post("/api/products/add", data);

        const productId = request.data.id
        if (imageUploaded) {
            console.log(request)
            const formData = new FormData();
            console.log(imageUploaded)
            formData.append("file", imageUploaded);
            await axios.post(`/api/products/${productId}/addImage`, formData);
        }

        if(request.status === 200) {
            router.push(`/products/${productId}`);
        }
    };

    const handleChange = (event) => {
        setImageUploaded(event.target.files[0]);
        console.log(event.target.files)
    };

    useEffect(() => {
        setUserID(userCookie)
    }, [userCookie])

    return (
        <div className='flex justify-center'>
            <form action="post" className='max-w-screen-lg flex justify-center flex-col' onSubmit={addProduct}>
                <label htmlFor="input-name-product">Nom du produit</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id='input-name-product' className='my-2 border-black border-2'/>

                <label htmlFor="input-description-product">Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} id='input-description-product' className='my-2 border-black border-2'/>

                <label htmlFor="input-price-product">Prix</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} id='input-price-product' className='my-2 border-black border-2'/>

                <label htmlFor="input-image-product">Image du produit</label>
                <input
                    onChange={handleChange}
                    accept=".jpg, .png, .gif, .jpeg"
                    type="file"
                ></input>

                <button type="submit" className='my-2 bg-[#272A30] text-gray-300 px-8 text-sm py-2 rounded-md'>Poster l'offre</button>
            </form>
        </div>
    );
};

export default index;