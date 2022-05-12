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
        <div>
            <form action="post">
                <label htmlFor="input-username-register">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id='input-username-register' />

                <label htmlFor="input-email-register">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id='input-email-register' />

                <label htmlFor="input-password-register">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id='input-password-register'/>

                <button type="button" onClick={() => handleSubmit()}>S'inscrire</button>
            </form>
        </div>
    );
};

export default register;