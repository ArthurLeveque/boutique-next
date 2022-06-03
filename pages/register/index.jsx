import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const register = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const data = {
        name: name,
        email: email,
        password: password
    };

    const handleSubmit = async () => {
        const request = await axios.post("/api/register", data);
        if(request.status === 200) {
            router.push('/login')
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <form action="post" className='max-w-screen-lg flex justify-center flex-col'>
                <label htmlFor="input-username-register">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id='input-username-register' className='my-2 border-black border-2' />

                <label htmlFor="input-email-register">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id='input-email-register' className='my-2 border-black border-2' />

                <label htmlFor="input-password-register">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id='input-password-register' className='my-2 border-black border-2'/>

                <button type="button" onClick={() => handleSubmit()} className='my-2 bg-[#272A30] text-gray-300 px-8 text-sm py-2 rounded-md'>S'inscrire</button>
            </form>
        </div>
    );
};

export default register;