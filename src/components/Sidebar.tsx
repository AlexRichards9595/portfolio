import Image from "next/image";
import SidebarMenuItem from "@/components/SidebarMenuItem";
import Link from "next/link";
import CopiableEmail from "@/components/CopiableEmail";

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col items-stretch h-screen w-1/5 bg-plum-deep plum-glow border-r border-white/5 px-6 pt-16 pb-6">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3 mb-4">
          <Image src={"/logo.svg"} className="w-12 h-12" width={400} height={400} alt={"Logo"} />
        </div>
        <p className="font-display text-3xl leading-tight text-cream">Alex Richards</p>
        <p className="mt-1 text-sm tracking-wide uppercase text-lightest/80">
          Web Builder · Happy Camper
        </p>
      </div>

      <nav className="flex flex-col grow justify-center gap-1.5">
        <SidebarMenuItem route={"/"} label={"Home"} />
        <SidebarMenuItem route={"/work"} label={"Work"} />
        <SidebarMenuItem route={"/reviews"} label={"Reviews"} />
        <SidebarMenuItem route={"/projects"} label={"Projects"} />
      </nav>

      <div className="flex flex-row items-center justify-center gap-6 pt-6 border-t border-white/10">
        <CopiableEmail />
        <Link
          className="opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
          href={"https://www.linkedin.com/in/alexrichards9595/"}
          target="_blank"
          aria-label="LinkedIn"
        >
          <Image className="h-7 w-7" src={"/icon-linkedin.png"} alt={"LinkedIn"} width={50} height={50} priority />
        </Link>
        <Link
          className="opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
          href={"https://github.com/AlexRichards9595"}
          target="_blank"
          aria-label="GitHub"
        >
          <Image className="h-7 w-7" src={"/icon-github.png"} alt={"Github"} width={50} height={50} priority />
        </Link>
        <Link
          className="opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
          download={"Alexander_Richards_Resume.pdf"}
          href={"/Alexander_Richards_Resume.pdf"}
          aria-label="Download résumé"
        >
          <Image className="h-7 w-7" src={"/icon-download.png"} alt={"Download"} width={50} height={50} priority />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
