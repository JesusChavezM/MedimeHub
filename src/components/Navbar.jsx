import Image from "next/image";
import logo from "../assets/logo-landing.svg";
import LoginPage from "../components/Providers-login.jsx";

export default function Navbar() {
    return (
        <div className="sticky top-1 z-50 bg-50 rounded-xl shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8">
                <div className="flex items-center">
                    <div className="h-8 w-8 sm:h-16 sm:w-16" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Image src={logo} width={70} height={70} alt="Logo" />
                    </div>
                    <div className="text-xl sm:text-4xl font-bold text-violet-600">MedimeHub</div>
                </div>
                <div className="flex gap-2 sm:flex-row mx-2 sm:mx-20">
                    <div className="text-center text-violet-900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-10">Home</div>
                    <div className="text-center text-violet-900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-10">About</div>
                    <div className="text-center text-violet-900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-10">FAQ</div>
                </div>
                <div className="flex sm:flex-row flex-col-reverse sm:items-center">
                    <div className="sm:ml-5">
                        <LoginPage />
                    </div>
                    {/* <div className="bg-violet-600 rounded-lg justify-center items-center gap-2.5 inline-flex my-2 sm:my-0">
                        <div className="text-violet-50 text-xl sm:text-2xl font-bold mx-6">Register</div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
