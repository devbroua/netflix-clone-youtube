import BgProvider from "@/app/components/BgProvider"
import Navbar from "./components/Navbar"

const LandingPage = () => {
  return (
    <BgProvider>
      <Navbar />
      <div className="flex flex-col justify-center items-center pt-80 px-5 text-center gap-10">
        <h1 className="font-extrabold text-white text-5xl">
          Фільми, серіали й інший контент без обмежень
        </h1>
        <h4 className="font-sm text-white text-3xl">
          Дивіться будь-де. Скасувати підписку можна будь-коли.
        </h4>
      </div>
    </BgProvider>
  )
}

export default LandingPage
