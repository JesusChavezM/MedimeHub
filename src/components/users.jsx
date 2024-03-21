"use client";

import { useEffect, useState } from 'react';


export default function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data);
            console.log(data)
        };

        getUsers();
    }, []);

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Image: {user.image}</p>
                        <p>Email Verified: {user.emailVerified}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
