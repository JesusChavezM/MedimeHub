"use client";
import { useState } from 'react';
import Users from "../../components/users";
import Doctors from "../../components/doctors";
import Faqs from "../../components/faqs";

export default function UsersPage() {
    const [activeComponent, setActiveComponent] = useState('users');

    const renderComponent = () => {
        switch(activeComponent) {
            case 'users':
                return <Users />;
            case 'doctors':
                return <Doctors />;
            case 'faqs':
                return <Faqs />;
            default:
                return <Users />;
        }
    }

    return (
        <div className="flex h-[85vh] mt-20 p-4 gap-4">
            <div className="w-1/4 p-4 border-r-2 bg-100 text-800 border border-600 rounded-xl overflow-auto">
                <button onClick={() => setActiveComponent('users')} className="w-full text-xl mb-2 p-2 text-800 font-bold cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg">Usuarios</button>
                <button onClick={() => setActiveComponent('doctors')} className="w-full text-xl mb-2 p-2 text-800 font-bold cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg">Doctores</button>
                <button onClick={() => setActiveComponent('faqs')} className="w-full text-xl mb-2 p-2 text-800 font-bold cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg">FAQs</button>
            </div>
            <div className="w-3/4 overflow-auto bg-100 border border-600 rounded-xl">
                {renderComponent()}
            </div>
        </div>
    );
}
