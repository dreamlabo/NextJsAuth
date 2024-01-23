'use client'
import React, { useState } from "react"
import { useRouter } from "next/navigation"

const RegistrationForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password) {
            return;
        }

        const res = await fetch('/api/Users', {
            method: "POST",
            body: JSON.stringify({
                name, email, password
            }),
            "content-type": "application/json",
        });

        if(!res.ok){
            const response = await res.json();
            setErrorMessage(response.message);
        } else {
            router.refresh();
            router.push("/")
        }
    };

  return (
    <div>
        <form onSubmit={handleSubmit} action="post">
        <label htmlFor="name">Name</label>
            <input id="name" 
                    name="name" 
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
                    type="text" />

            <label htmlFor="email">Email</label>
            <input id="email" 
                    name="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                    type="text" />

            <label htmlFor="password">Password</label>
            <input id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} type="password" />
            <button type="submit">Submit</button>
        </form>
        <p>{errorMessage}</p>
    </div>
  )
}

export default RegistrationForm;