import Image from "next/image";
import Link from "next/link";
import CopiableEmail from "@/components/CopiableEmail";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-center gap-10 px-6 py-10 lg:flex-row lg:items-center lg:gap-14 lg:py-16">
      {/* Portrait */}
      <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
        <div className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-grape/15 blur-2xl" />
        <Image
          className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-lift ring-1 ring-line"
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mMMtbSsZyACMI4qpK9CACBcDMdIFQKLAAAAAElFTkSuQmCC"
          src="/landing-image.jpg"
          width={800}
          height={1000}
          alt="Alex Richards"
        />
      </div>

      {/* Intro */}
      <div className="flex flex-col text-center lg:max-w-md lg:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grape">Web &amp; Mobile Builder</p>
        <h1 className="mt-3 font-display text-5xl leading-[1.05] text-ink lg:text-6xl">
          Hi, I&rsquo;m Alex&nbsp;Richards.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/75">
          I like travelling more than working. But when I do work, I love building beautiful,
          valuable web and mobile applications — and I&rsquo;m pretty good at it, too. Poke around and
          see for yourself.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
          <Link
            href="/work"
            className="rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
          >
            View my work
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-line bg-paper px-6 py-3 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
          >
            Projects
          </Link>
          <Link
            href="/Alexander_Richards_Resume.pdf"
            download="Alexander_Richards_Resume.pdf"
            className="rounded-full px-6 py-3 text-sm font-semibold text-grape underline-offset-4 hover:underline"
          >
            R&eacute;sum&eacute; &darr;
          </Link>
        </div>

        {/* Mobile socials */}
        <div className="mt-10 flex items-center justify-center gap-6 lg:hidden">
          <div className="rounded-full bg-plum-deep p-3">
            <CopiableEmail imgClassName="h-5 w-5" />
          </div>
          <Link
            href="https://www.linkedin.com/in/alexrichards9595/"
            target="_blank"
            className="rounded-full bg-plum-deep p-3 transition-transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <Image className="h-5 w-5" src="/icon-linkedin.png" alt="LinkedIn" width={50} height={50} />
          </Link>
          <Link
            href="https://github.com/AlexRichards9595"
            target="_blank"
            className="rounded-full bg-plum-deep p-3 transition-transform hover:scale-110"
            aria-label="GitHub"
          >
            <Image className="h-5 w-5" src="/icon-github.png" alt="GitHub" width={50} height={50} />
          </Link>
        </div>
      </div>
    </div>
  );
}
