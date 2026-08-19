'use client'

import {useEffect, useState} from "react";
import {Tooltip} from "@/components/MaterialTailwind";
import Image from "next/image";

const CopiableEmail = ({ imgClassName = "h-7 w-7" }: { imgClassName?: string }) => {
  const [showToolTip, setShowToolTip] = useState(false)

  useEffect(() => {
    if(showToolTip) {
      const timeoutId = setTimeout(() => {
        setShowToolTip(false);
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [showToolTip]);

  return (
      <Tooltip open={showToolTip} content={'Copied!'} placement={'right-start'}>
        <div
            className={'cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 ease-in-out transition-all duration-300'}
            onClick={async () => {
              setShowToolTip(true)
              await navigator.clipboard.writeText('hello@alexrichards.dev')
            }}
        >
          <Image className={imgClassName} src={'/icon-email.png'} alt={'Email'} width={50} height={50} priority={true}/>
        </div>
      </Tooltip>
  )
}

export default CopiableEmail