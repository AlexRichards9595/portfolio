import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className={'flex flex-col items-center lg:pt-8 lg:px-48 w-full h-full overflow-y-auto pb-8'}>
      <Image className={'w-full h-96 lg:h-[600px] object-cover object-top lg:rounded-2xl mb-8'} src={'/landing-image.jpg'} width={1000} height={1000} alt={'Landing Image'}/>
      <p className={'text-lg w-4/5 text-center'}>I like travelling more than working. But when I do work, I love building beautiful and valuable web applications. I am pretty good at it too. Feel free to
       poke around and see for yourself. Or grab what you need below and go.</p>
      <div className={'flex flex-row w-96 justify-between mt-20 px-4'}>
        <Link className={'flex flex-col items-center gap-2 text-center hover:scale-105 ease-in-out transition-all duration-500'} href={'https://www.linkedin.com/in/alexrichards9595/'} target="_blank">
          <Image src={'/linkedin-icon.png'} alt={'LinkedIn'} width={50} height={50}/>
          <p>LinkedIn</p>
        </Link>
        <Link className={'flex flex-col items-center gap-2 text-center hover:scale-105 ease-in-out transition-all duration-500'} href={'https://github.com/AlexRichards9595'} target="_blank">
          <Image src={'/github-icon.png'} alt={'Github'} width={50} height={50}/>
          <p>Github</p>
        </Link>
        <Link className={'flex flex-col items-center gap-2 text-center hover:scale-105 ease-in-out transition-all duration-500'} download={"Alexander_Richards_Resume.pdf"} href={'/Alexander_Richards_Resume.pdf'}>
          <Image src={'/download-icon.png'} alt={'Download'} width={50} height={50}/>
          <p>Resume</p>
        </Link>
      </div>
    </div>
  );
}
