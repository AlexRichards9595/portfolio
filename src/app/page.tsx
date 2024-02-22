import Image from "next/image";
import Link from "next/link";
import CopiableEmail from "@/components/CopiableEmail";

export default function Home() {
  return (
    <div className={'flex flex-col items-center lg:pt-8 lg:px-48 w-full h-full overflow-y-auto pb-8'}>
      <Image
          className={'w-full h-96 lg:h-[600px] object-cover object-top lg:rounded-2xl mb-8'}
          priority={true}
          placeholder={'blur'}
          blurDataURL={'data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mMMtbSsZyACMI4qpK9CACBcDMdIFQKLAAAAAElFTkSuQmCC'}
          src={'/landing-image.jpg'}
          width={800}
          height={600}
          alt={'Landing Image'}
      />
      <p className={'text-lg px-4 lg:px-0 lg:w-4/5 text-center'}>My name is Alex Richards and I like travelling more than working. But when I do work, I love building beautiful and valuable web applications. I am pretty good at it too. Feel free to
       poke around and see for yourself. Or grab what you need below and go.</p>
      <div className={'lg:hidden flex flex-col'}>
        <div className={'flex flex-row w-96 justify-between mt-12 mb-6 px-4'}>
          <Link className={'flex flex-col items-center gap-2 text-center hover:scale-105 ease-in-out transition-all duration-500'} href={'https://www.linkedin.com/in/alexrichards9595/'} target="_blank">
            <Image className={'h-14 w-14'} src={'/icon-linkedin.png'} alt={'LinkedIn'} width={50} height={50}/>
            <p>LinkedIn</p>
          </Link>
          <Link className={'flex flex-col items-center gap-2 text-center hover:scale-105 ease-in-out transition-all duration-500'} href={'https://github.com/AlexRichards9595'} target="_blank">
            <Image className={'h-14 w-14'} src={'/icon-github.png'} alt={'Github'} width={50} height={50}/>
            <p>Github</p>
          </Link>
          <Link className={'flex flex-col items-center gap-2 text-center hover:scale-105 ease-in-out transition-all duration-500'} download={"Alexander_Richards_Resume.pdf"} href={'/Alexander_Richards_Resume.pdf'}>
            <Image className={'h-14 w-14'} src={'/icon-download.png'} alt={'Download'} width={50} height={50}/>
            <p>Resume</p>
          </Link>
        </div>
        <CopiableEmail/>
      </div>
    </div>
  );
}
