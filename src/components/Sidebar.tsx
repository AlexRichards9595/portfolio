import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return <div className={'hidden lg:flex flex-col items-center h-screen w-96 bg-secondary pt-20 sticky'}>
    <div className={'flex flex-col items-center'}>
      <Image src={'/logo.svg'} className={'w-16 h-16 mb-4'} width={400} height={400} alt={'Logo'}/>
      <p className={'text-3xl text-center'}>Alex Richards</p>
      <p className={'text-lg text-center text-lightest'}>Web Builder | Happy Camper</p>
    </div>
    <div className={'flex flex-col grow justify-center items-center w-full'}>
      <Link href={'/'} className={'hover:bg-primary w-full p-4 text-center'}><p className={'text-xl'}>Home</p></Link>
      <Link href={'/work'} className={'hover:bg-primary w-full p-4 text-center'}><p className={'text-xl'}>Work</p></Link>
      <Link href={'/reviews'} className={'hover:bg-primary w-full p-4 text-center'}><p className={'text-xl'}>Reviews</p></Link>
      <Link href={'/projects'} className={'hover:bg-primary w-full p-4 text-center'}><p className={'text-xl'}>Projects</p></Link>
    </div>
  </div>
}

export default Sidebar