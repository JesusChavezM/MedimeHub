"use client";

import { useEffect, useState } from 'react';


export default function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch('/api/users', {cache: 'no-store'});
            const data = await response.json();
            setUsers(data);
            console.log(data)
        };

        getUsers();
    }, []);

    return (
        <div>
            <h1 className="flex items-center justify-center text-2xl font-bold mb-4">Lista de Usuarios</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {users.map(user => (
                    <div key={user._id} className="bg-purple-200 border border-purple-800 rounded-lg shadow-md p-4 m-1">
                        <div className="flex items-center mb-2">
                            <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full mr-2" />
                            <div>
                                <p className="font-bold text-lg">{user.name}</p>
                                <p className="text-gray-500 truncate">{user.email}</p>
                                <p className="text-gray-500 truncate">Id: {user._id}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
