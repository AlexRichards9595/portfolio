import Image from "next/image";
import SidebarMenuItem from "@/components/SidebarMenuItem";
import Link from "next/link";
import CopiableEmail from "@/components/CopiableEmail";

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
    <div className={'flex flex-row w-full justify-around my-6 px-4'}>
      <CopiableEmail/>
      <Link className={'flex flex-col items-center gap-2 text-center hover:scale-105 ease-in-out transition-all duration-500'} href={'https://www.linkedin.com/in/alexrichards9595/'} target="_blank">
        <Image className={'h-14 w-14'} src={'/icon-linkedin.png'} alt={'LinkedIn'} width={50} height={50} priority={true}/>
      </Link>
      <Link className={'flex flex-col items-center gap-2 text-center hover:scale-105 ease-in-out transition-all duration-500'} href={'https://github.com/AlexRichards9595'} target="_blank">
        <Image className={'h-14 w-14'} src={'/icon-github.png'} alt={'Github'} width={50} height={50} priority={true}/>
      </Link>
      <Link className={'flex flex-col items-center gap-2 text-center hover:scale-105 ease-in-out transition-all duration-500'} download={"Alexander_Richards_Resume.pdf"} href={'/Alexander_Richards_Resume.pdf'}>
        <Image className={'h-14 w-14'} src={'/icon-download.png'} alt={'Download'} width={50} height={50} priority={true}/>
      </Link>
    </div>
  </div>
}

export default Sidebar