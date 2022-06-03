import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const wishlist = () => {
    const router = useRouter();
    const [wishlistData, setWishlistData] = useState();
    const [loaded, setLoaded] = useState(false);

    const [userID, setUserID] = useState('');

    const userCookie = getCookie('userId');

    const getWishlistData = async () => {
        const products = await axios.get("/api/wishlist", {userId: userID})
        setWishlistData(products.data);
        console.log(products.data);
        setLoaded(true);
    };

    useEffect(() => {
        setUserID(userCookie)
    }, [userCookie])

    useEffect(() => {
        getWishlistData();
    }, [setWishlistData])

    return (
        <div>     
            <h1 className='text-center text-4xl font-bold'>Votre liste de souhait</h1>

            {!loaded &&
                    <p>Loading...</p>
            }
            {loaded && 
                <div>
                    <ul className='flex flex-wrap mt-10'>
                        {!loaded &&
                            <p>Loading...</p>
                        }
                        {loaded && wishlistData.map(product => {
                            return (
                                <li key={product.product.id} className="border-2 border-black px-8 py-2 w-1/5 text-center"><Link href={`/products/${product.product.id}`}>{product.product.name}</Link></li>
                            )
                        })}
                    </ul>
                </div>
            }
        </div>
    );
};

export default wishlist;