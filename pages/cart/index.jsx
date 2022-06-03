import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const cart = () => {
    const router = useRouter();
    const [cartData, setCartData] = useState();
    const [userData, setUserData] = useState();
    const [loaded, setLoaded] = useState(false);

    const [userID, setUserID] = useState('');

    const userCookie = getCookie('userId');

    var totalPrice = 0;

    const getCartData = async () => {
        const products = await axios.get("/api/cart", {userId: userID})
        setCartData(products.data);
        console.log(products.data);
        if(products.data[0]){
          setUserData(products.data[0].user)
        }
        setLoaded(true);
    };

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
    
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
    
          document.body.appendChild(script);
        });
    };

    const makePayment = async () => {
      const res = await initializeRazorpay();
  
      if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
      }
  
      // Make API call to the serverless API
      const data = await fetch("/api/razorpay", { 
        method: "POST", 
        body: JSON.stringify({userId: userData.id})
      }).then((t) =>
        t.json()
      );
      console.log(data);
      var options = {
        key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        handler: function (response) {
        //   // Validate payment at server - using webhooks is a better idea.
        //   alert(response.razorpay_payment_id);
        //   alert(response.razorpay_order_id);
        //   alert(response.razorpay_signature);
          axios.post("/api/cart/empty", {userId : userData.id});
          router.push('/confirmation');
        },
        prefill: {
          name: userData.name,
          email: userData.email
        }
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };

    useEffect(() => {
        setUserID(userCookie)
    }, [userCookie])

    useEffect(() => {
        getCartData();
    }, [setCartData])

    return (
        <div>     
            <h1 className='text-center text-4xl font-bold'>Votre panier</h1>

            {!loaded &&
                    <p>Loading...</p>
            }
            {loaded && 
                <div>
                    <table className='border-2'>
                      <thead>
                        <tr>
                          <td className='p-3 border-2'>Produit</td>
                          <td className='p-3 border-2'>Prix unitaire</td>
                          <td className='p-3 border-2'>Quantité</td>
                        </tr>
                      </thead>
                      <tbody>
                        {cartData.map(product => {
                            totalPrice = totalPrice + (product.product.price * product.quantity)
                            return (
                                <tr key={product.id}>
                                  <td className='p-3 border-2 text-sky-700'><Link href={`/products/${product.product.id}`}>{product.product.name}</Link></td>
                                  <td className='p-3 border-2'>{product.product.price}€</td>
                                  <td className='p-3 border-2'>x{product.quantity}</td>
                                </tr>
                            )
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan='3' className='p-3 font-bold'>Prix total : {totalPrice}€</td>
                        </tr>
                      </tfoot>
                  </table>

                  <button type="button" onClick={() => makePayment()} className="bg-[#272A30] text-gray-300 px-8 text-sm py-2 rounded-md shadow-xl drop-shadow-2xl mt-5">Acheter</button>
                </div>
            }
        </div>
    );
};

export default cart;