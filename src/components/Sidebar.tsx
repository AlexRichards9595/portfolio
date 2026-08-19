import Image from "next/image";
import SidebarMenuItem from "@/components/SidebarMenuItem";
import Link from "next/link";
import CopiableEmail from "@/components/CopiableEmail";

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col items-stretch h-screen w-1/5 bg-deep border-r border-white/5 px-6 pt-14 pb-6">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3 mb-4">
          <Image src={"/logo.svg"} className="w-12 h-12" width={400} height={400} alt={"Logo"} />
        </div>
        <p className="font-display text-3xl leading-tight text-cream">Alex Richards</p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-lightest">
          Web &amp; Mobile Builder
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] text-accent">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Available for work
        </span>
      </div>

      <nav className="flex flex-col grow justify-center gap-1.5">
        <SidebarMenuItem route={"/"} label={"Home"} index={1} />
        <SidebarMenuItem route={"/work"} label={"Work"} index={2} />
        <SidebarMenuItem route={"/reviews"} label={"Reviews"} index={3} />
        <SidebarMenuItem route={"/projects"} label={"Projects"} index={4} />
      </nav>

      <div className="flex flex-row items-center justify-center gap-6 pt-6 border-t border-white/10">
        <CopiableEmail />
        <Link
          className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
          href={"https://www.linkedin.com/in/alexrichards9595/"}
          target="_blank"
          aria-label="LinkedIn"
        >
          <Image className="h-7 w-7" src={"/icon-linkedin.png"} alt={"LinkedIn"} width={50} height={50} priority />
        </Link>
        <Link
          className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
          href={"https://github.com/AlexRichards9595"}
          target="_blank"
          aria-label="GitHub"
        >
          <Image className="h-7 w-7" src={"/icon-github.png"} alt={"Github"} width={50} height={50} priority />
        </Link>
        <Link
          className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
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
