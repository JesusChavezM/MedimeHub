"use client";
import { useState } from 'react';
import Users from "../../components/users";
import Faqs from "../../components/faqs";
import Locations from "../../components/Locations";
import { useSession } from 'next-auth/react';

export default function UsersPage() {
    const { data: session } = useSession();
    const [activeComponent, setActiveComponent] = useState('users');

    if (!session || session.user.role !== 'admin') {
        return <div className="flex min-h-screen flex-col items-center text-2xl justify-between p-24 text-red-700 font-bold"><h1>Acceso Denegado...</h1></div>;
    }

    const renderComponent = () => {
        switch (activeComponent) {
            case 'users':
                return <Users />;
            case 'faqs':
                return <Faqs />;
            case 'locations':
                return <Locations />;
            default:
                return <Users />;
        }
    }

    return (
        <div className="flex h-[85vh] mt-20 p-4 gap-4">
            <div className="w-1/4 p-4 border-r-2 bg-100 text-800 border border-600 rounded-xl overflow-auto">
                <h1 className="text-2xl font-bold text-center text-700 p-2 mb-2">Panel de administrador</h1>
                <button onClick={() => setActiveComponent('users')} className="w-full text-xl mb-2 p-2 text-800 font-bold cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg">Usuarios</button>
                <button onClick={() => setActiveComponent('faqs')} className="w-full text-xl mb-2 p-2 text-800 font-bold cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg">FAQs</button>
                <button onClick={() => setActiveComponent('locations')} className="w-full text-xl mb-2 p-2 text-800 font-bold cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg">Puntos del mapa</button>
            </div>
            <div className="w-3/4 overflow-auto bg-100 border border-600 rounded-xl">
                {renderComponent()}
            </div>
        </div>
    );
}
