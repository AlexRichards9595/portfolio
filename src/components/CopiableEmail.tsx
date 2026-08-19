'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

const CopiableEmail = ({ imgClassName = "h-7 w-7" }: { imgClassName?: string }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className="relative flex">
      <button
        type="button"
        aria-label="Copy email address"
        className="cursor-pointer opacity-70 transition-all duration-300 ease-in-out hover:scale-110 hover:opacity-100"
        onClick={async () => {
          await navigator.clipboard.writeText("hello@alexrichards.dev");
          setCopied(true);
        }}
      >
        <Image className={imgClassName} src={"/icon-email.png"} alt={"Email"} width={50} height={50} priority />
      </button>
      {copied && (
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-cream px-2 py-1 text-xs font-medium text-deep shadow-lift">
          Copied!
        </span>
      )}
    </div>
  );
};

export default CopiableEmail;
