import Image from "next/image";
import SidebarMenuItem from "@/components/SidebarMenuItem";

const Sidebar = () => {

  return <div className={'hidden lg:flex flex-col items-center h-screen w-1/5 bg-secondary pt-20'}>
    <div className={'flex flex-col items-center'}>
      <Image src={'/logo.svg'} className={'w-16 h-16 mb-4'} width={400} height={400} alt={'Logo'}/>
      <p className={'text-3xl text-center'}>Alex Richards</p>
      <p className={'text-lg text-center text-lightest'}>Web Builder | Happy Camper</p>
    </div>
    <div className={'flex flex-col grow justify-center items-center w-full'}>
      <SidebarMenuItem route={'/'} label={'Home'} />
      <SidebarMenuItem route={'/work'} label={'Work'} />
      <SidebarMenuItem route={'/reviews'} label={'Reviews'} />
      <SidebarMenuItem route={'/projects'} label={'Projects'} />
    </div>
  </div>
}

export default Sidebar