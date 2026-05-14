"use client"

import { AnimatePresence } from 'framer-motion'
import React from 'react'
import Navbar from './Navbar'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const TransitionProvider = ({children}) => {

    const pathName = usePathname()

  return (
    <AnimatePresence mode='wait'>
        <div key={pathName} className="w-screen h-screen bg-gradient-to-b from-blue-50 to-red-100 overflow-x-hidden">

            <motion.div
                className='h-screen w-screen bg-black rounded-b-[100px] fixed z-40'
                animate={{height: '0vh'}}
                exit={{height: '140vh'}}
                transition={{duration: .5, ease: 'easeOut'}}
            />
            <motion.div
                className='fixed m-auto top-0 left-0 bottom-0 right-0 text-white text-8xl cursor-default w-fit h-fit z-50'
                initial={{opacity: 1}}
                animate={{opacity: 0, display:'none'}}
                exit={{opacity: 0}}
                transition={{duration: 1, ease: 'easeOut'}}
            >
                {pathName === '/' ? 'Home' : pathName.substring(1)}
            </motion.div>
            <motion.div
                className='h-screen w-screen bg-black rounded-t-[100px] fixed z-30 bottom-0'
                initial={{height: '140vh'}}
                animate={{height: '0vh', transition: {delay: .5}}}
            />

            <div className="h-24">
                <Navbar />
            </div>

            
            <div className="h-[calc(100vh-6rem)]">
                {children}
            </div>

        </div>
    </AnimatePresence>
  )
}

export default TransitionProvider