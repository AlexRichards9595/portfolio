'use client'

import {useEffect, useState} from "react";
import {Tooltip} from "@/components/MaterialTailwind";
import Image from "next/image";

const CopiableEmail = () => {
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
            className={'cursor-pointer hover:scale-105 ease-in-out transition-all duration-500'}
            onClick={async () => {
              setShowToolTip(true)
              await navigator.clipboard.writeText('alex.richards9595@gmail.com')
            }}
        >
          <Image className={'h-14 w-14'} src={'/icon-email.png'} alt={'Github'} width={50} height={50} priority={true}/>
        </div>
      </Tooltip>
  )
}

export default CopiableEmail