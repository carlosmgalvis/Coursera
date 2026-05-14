"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from 'framer-motion' 


const links = [
  { url: '/', title: 'Home' },
  { url: '/about', title: 'About' },
  { url: '/portfolio', title: 'Portfolio' },
  { url: '/contact', title: 'Contact' },
]


const Navbar = () => {

  const [open, setOpen] = useState(false)

  const activeLink = usePathname()

  const topVariants = {
    closed: {
      rotate: 0
    },
    opened: {
      rotate: 45
    }
  }
  const centerVariants = {
    closed: {
      opacity: 1
    },
    opened: {
      opacity: 0
    }
  }
  const bootomVariants = {
    closed: {
      rotate: 0
    },
    opened: {
      rotate: -45
    }
  }

  const menuVariants = {
    closed: {
      x: '100vw'
    },
    opened: {
      x: 0,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2
      }
    }
  }

  const menuLinksVariants = {
    closed: {
      x: -10,
      opacity: 0
    },
    opened: {
      x: 0,
      opacity: 1
    }
  }

  return (
    <div className='h-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl'>

      {/* LINKS */}
      <div className='hidden md:flex items-center gap-5 w-1/3'>
        {links.map((link) => (
          <Link 
            href={link.url} 
            key={link.title} 
            className={activeLink === link.url && 'bg-black text-white p-2 rounded'}
          >
            {link.title}
          </Link>
        ))}
      </div>

      {/* LOGO */}
      <div className='md:hidden lg:flex lg:w-1/3 justify-center'>
        <Link href='/' className='text-sm bg-black rounded-md p-1 font-bold flex items-center justify-center'>
          <span className='text-white mr-1 px-1'>OMARIANO</span>
          <span className='w-12 h-8 rounded bg-white text-black flex items-center justify-center'>.dev</span>
        </Link>
      </div>

      {/* SOCIAL ICONS */}
      <div className='hidden md:flex gap-4 w-1/3 justify-end'>
        <Link target='_blank' href='https://github.com/omarsalemj'> <Image src='/github.png' alt='github' width={24} height={24} /> </Link>
        <Link target='_blank' href='https://www.linkedin.com/in/omar-salem-a17941388/'> <Image src='/linkedin.png' alt='github' width={24} height={24} /> </Link>
        <Link target='_blank' href='https://www.facebook.com/omer.salem.610516?mibextid=ZbWKwL'> <Image src='/facebook.png' alt='github' width={24} height={24} /> </Link>
        <Link target='_blank' href='https://www.instagram.com/3omar_512?igsh=MXA0NGs2ZTZsbGJyMQ=='> <Image src='/instagram.png' alt='github' width={24} height={24} /> </Link>
        <Link target='_blank' href='https://wa.me/+201021087077'> <Image src='/whatsapp.png' alt='github' width={24} height={24} /> </Link>
      </div>

      {/* MENU */}
      <div className='md:hidden'>
        <button 
          className='w-10 h-8 flex flex-col justify-between z-50 relative outline-none'
          onClick={() => setOpen(!open)}
        >
            <motion.div 
              variants={topVariants} 
              animate={open ? 'opened' : 'closed'} 
              className={`w-10 h-1 rounded origin-left bg-${open ? 'white' : 'black'}`}>
            </motion.div>
            <motion.div 
              variants={centerVariants} 
              animate={open ? 'opened' : 'closed'} 
              className={`w-10 h-1 rounded bg-${open ? 'white' : 'black'}`}>
            </motion.div>
            <motion.div 
              variants={bootomVariants} 
              animate={open ? 'opened' : 'closed'} 
              className={`w-10 h-1 rounded origin-left bg-${open ? 'white' : 'black'}`}>
            </motion.div>
        </button>

        {open &&
          <motion.div variants={menuVariants} initial='closed' animate='opened' className='absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center text-4xl gap-8 z-40 overflow-hidden'>
            {links.map( (link) => (
              <motion.div key={link.title} variants={menuLinksVariants}>
                <Link 
                  href={link.url}
                  onClick={ () => setOpen(false) }
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        }
      </div>

    </div>
  )
}

export default Navbar