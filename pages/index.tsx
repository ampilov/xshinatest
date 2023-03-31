import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen bg-[#2a2c2d] flex justify-center">
      <div className="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] pt-10" >
        <p className="text-white text-3xl">Тестовое задание на должность Frontend-разработчика</p>
        <p className="text-white text-xl">Выполнил Ампилов Антон</p>
        
        <Link href={'/contacts'}>
        <p className="mt-5 text-white underline text-2xl">Перейти на страницу контакты →</p>
        </Link>
      </div>
    </main>
  )
}