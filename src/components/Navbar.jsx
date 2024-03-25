import Image from "next/image";
import logo from "../assets/logo-landing.svg";
import LoginPage from "../components/Providers-login.jsx";

export default function Navbar() {
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8">
                <div className="flex items-center">
                    <div className="h-16 w-16 sm:h-20 sm:w-20" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Image src={logo} width={70} height={70} alt="Logo" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-violet-600">MedimeHub</div>
                </div>
                <div className="flex mx-20">
                    <div className="text-center text-violet-900 text-2xl font-bold mx-10">Home</div>
                    <div className="text-center text-violet-900 text-2xl font-bold mx-10">About</div>
                    <div className="text-center text-violet-900 text-2xl font-bold mx-10">FAQ</div>
                </div>
                <div className="flex">
                    <LoginPage />
                    <div className="h-12 sm:h-14 lg:h-16 w-32 sm:w-36 lg:w-40 bg-purple-600 rounded-lg flex justify-center items-center text-white font-bold text-lg">Register</div>

                </div>
            </div>
        </div>
    );
}