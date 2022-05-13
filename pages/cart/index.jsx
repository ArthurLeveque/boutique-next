import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const products = () => {
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
        if(products.data[0].user){
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
      // const data = await axios.post("/api/razorpay", {userData: userData});

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
          router.push('/confirmation')
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
            <h1>Votre panier</h1>

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

                    <button type="button" onClick={() => makePayment()}>Acheter</button>
                </div>
            }
        </div>
    );
};

export default products;