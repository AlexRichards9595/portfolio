'use client'

import {useEffect, useState} from "react";
import {Tooltip} from "@/components/MaterialTailwind";

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
        <p
            className={'text-lg font-bold cursor-pointer'}
            onClick={async () => {
              setShowToolTip(true)
              await navigator.clipboard.writeText('alex.richards9595@gmail.com')
            }}
        >
          alex.richards9595@gmail.com
        </p>
      </Tooltip>
  )
}

export default CopiableEmail