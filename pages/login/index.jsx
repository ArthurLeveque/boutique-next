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
        <form onSubmit={handleSubmit}>
            <input
                id="email"
                type="text"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input
                id="password"
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
            />
            <button>Se connecter</button>
        </form>
    )
}

export default login;