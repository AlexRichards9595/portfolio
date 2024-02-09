import * as React from "react";
import { motion } from "framer-motion";

// @ts-ignore
export const MenuToggle = ({toggle, open}) => (
    <button onClick={toggle} className={'m-2'}>
      {!open && (
          <motion.svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              initial="hidden"
              animate="visible"
              className={'mx-2'}
          >
            <motion.line
                x1="0"
                y1="18"
                x2="22"
                y2="18"
                strokeWidth={2}
                stroke="#FFFFFF"
            />
            <motion.line
                x1="0"
                y1="11"
                x2="22"
                y2="11"
                strokeWidth={2}
                stroke="#FFFFFF"
            />
            <motion.line
                x1="0"
                y1="4"
                x2="22"
                y2="4"
                strokeWidth={2}
                stroke="#FFFFFF"
            />
          </motion.svg>)}
      {open && (
          <motion.svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              initial="hidden"
              animate="spring"
              className={'mx-2'}
          >
              <motion.line
                  x1="0"
                  y1="18"
                  x2="11"
                  y2="21"
                  strokeWidth={2}
                  stroke="#FFFFFF"
              />
              <motion.line
                  x1="11"
                  y1="21"
                  x2="22"
                  y2="18"
                  strokeWidth={2}
                  stroke="#FFFFFF"
              />
              <motion.line
                  x1="0"
                  y1="11"
                  x2="11"
                  y2="14"
                  strokeWidth={2}
                  stroke="#FFFFFF"
              />
              <motion.line
                  x1="11"
                  y1="14"
                  x2="22"
                  y2="11"
                  strokeWidth={2}
                  stroke="#FFFFFF"
              />
              <motion.line
                  x1="0"
                  y1="4"
                  x2="11"
                  y2="7"
                  strokeWidth={2}
                  stroke="#FFFFFF"
              />
              <motion.line
                  x1="11"
                  y1="7"
                  x2="22"
                  y2="4"
                  strokeWidth={2}
                  stroke="#FFFFFF"
              />
          </motion.svg>
      )}
    </button>
);
