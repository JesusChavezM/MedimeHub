import Navbar from "../components/Navbar";

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen my-4">
      <Navbar/>
        <div className="flex flex-col justify-center items-center flex-grow">
          <div className="text-center">
            <span className="text-violet-950 text-6xl sm:text-7xl lg:text-8xl font-semibold">We Care About</span>
            <span className="text-violet-600 text-6xl sm:text-7xl lg:text-8xl font-semibold"> You</span>
          </div>
          <div className="text-violet-700 text-lg sm:text-xl font-semibold text-center mb-4 px-4 sm:px-8">Porque tu salud importa: Medimehub pone el control en tus manos, donde quiera que estés.</div>
        </div>
      </div>
  );
}
