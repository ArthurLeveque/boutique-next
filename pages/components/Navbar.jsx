import { getCookie, removeCookies } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const router = useRouter();
  const [userID, setUserID] = useState('');

  const userCookie = getCookie('userId');

  const disconnectUser = () => {
    removeCookies('token');
    removeCookies('userId');
    router.push('/');
  }

  useEffect(() => {
    setUserID(userCookie)
  }, [userCookie])

  return (
    <div className="flex flex-row items-center  justify-between px-20 py-10 bg-[#6699ff]">
      <div className="flex flex-row items-center">
        <h1 className="font-bold italic text-2xl mr-10 text-white"><a href="/">Boutique-Next</a></h1>
        <ul className="flex flex-row space-x-10">
          <li>
            <a
              href="/products"
              className="tracking-wide font-bold text-white"
            >
              Produits
            </a>
          </li>
          {userID &&
          <li>
            <a
              href="/products/add"
              className="tracking-wide font-bold text-white"
            >
              Ajouter un produit
            </a>
          </li>
          }
        </ul>
      </div>
        {userID &&
          <div className="flex flex-row space-x-10 items-center">
            <a href="/cart" className="tracking-wide font-bold text-white">
              Panier
            </a>
            <button onClick={() => disconnectUser()} className="bg-[#272A30] text-gray-300 px-8 text-sm py-2 rounded-md shadow-xl drop-shadow-2xl">
              Se déconnecter
            </button>
          </div>
        }
        {!userID &&
          <div className="flex flex-row space-x-10 items-center">
            <a href="/login" className="bg-[#272A30] text-gray-300 px-8 text-sm py-2 rounded-md shadow-xl drop-shadow-2xl">
              Se connecter
            </a>
          </div>
        }
    </div>
  );
};