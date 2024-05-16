import Image from "next/image";

export default function UsersPage() {
    return (
      <div className="flex flex-col items-center mt-40 xl:mt-0 justify-center xl:min-h-90vh xl:flex-row">
        <div className="flex flex-col space-y-8 items-center xl:w-2/4 xl:space-y-6">
          <div className="text-900 text-2xl font-bold font text-center xl:text-4xl">
            Nuestro Proposito
          </div>
          <div className="m-8 text-950 font-medium text-justify text-xl xl:w-3/5 xl:text-2xl">
            Creemos que la salud es un derecho fundamental y que todos merecen
            tener acceso a una atención médica de calidad. Nuestra plataforma fue
            creada con el propósito de empoderar a los pacientes y facilitarles el
            control sobre su información médica, así como mejorar su experiencia
            en la búsqueda de atención médica.
          </div>
        </div>
        <div className="mt-8 w-3/5 h-4/5 xl:w-auto">
          <Image
            src="/static/media/about_img.png"
            width={446}
            height={661}
            alt="about-img"
          />
        </div>
      </div>
    );
  }