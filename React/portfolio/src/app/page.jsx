"use client"

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Homepage = () => {
  return (
    <motion.div className='h-full' initial={{y:'-200vh'}} animate={{y:'0%'}} transition={{duration:1}}>
      <div className="h-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 md:flex items-center">
        
        {/* IMAGE */}
        <div className="hidden md:block relative h-1/3 md:h-3/4 w-full flex-1">
          <Image src='/hero.png' alt="hero" fill objectFit="contain"/>
        </div>

        {/* DESCRIPTION */}
        <div className="h-full py-8 flex flex-col justify-center gap-8 flex-1 md:py-0">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl flex flex-col gap-4">Hi There !! 👋<span>I&apos;m <span className="text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent py-10">Omar Salem.</span></span><span className="text-2xl md:text-3xl lg:text-4xl font-semibold italic">Front-End developer | Next.js</span></h1>
          <p className="md:text-xl">💻 Front-End Developer (Junior) passionate about building clean, modern, and responsive web applications. I enjoy turning ideas into interactive experiences using React, Next.js, HTML, CSS, and JavaScript. Always learning and improving — I believe great interfaces come from creativity, logic, and attention to detail.</p>
          <div className="flex gap-4 items-center">
            <Link href='/portfolio' className="p-4 rounded-xl bg-black text-white border-2 border-black font-bold ">View My Work</Link>
            <Link href='/contact' className="p-4 rounded-xl border-2 border-black font-bold">Contact Me</Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Homepage;
