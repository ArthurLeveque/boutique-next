import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const data = {
        email: email,
        password: password
    };

    const handleSubmit = async () => {
        const request = await axios.post("/api/login", data);
        if(request.status === 200) {
            router.push('/')
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <form action="post" className='max-w-screen-lg flex justify-center flex-col'>
                <input
                    id="email"
                    type="text"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className='my-2 border-black border-2'
                />

                <input
                    id="password"
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className='my-2 border-black border-2'
                />
                <button type="button" onClick={() => handleSubmit()} className='my-2 bg-[#272A30] text-gray-300 px-8 text-sm py-2 rounded-md'>Se connecter</button>
            </form>

            <a href="/register">Pas de compte ?</a>
        </div>
    )
}

export default login;