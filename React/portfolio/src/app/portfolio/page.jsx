"use client"

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const myWorksData = [
  {
    id: 1,
    title: 'Dashboard',
    desc: 'Built a responsive full-stack dashboard connected to a JSON server, featuring complete CRUD operations (create, read, update, delete) for efficient data management.',
    img: 'https://res.cloudinary.com/dc7qyltbv/image/upload/v1759679452/dashbord_ij7fs3.png',
    link: 'https://dashboard-app-react-l4a22q2lh-omar-salems-projects-94cbece3.vercel.app/',
    tools: [
      {
        id: 1,
        name: 'React'
      },
      {
        id: 2,
        name: 'Tailwind'
      },
      {
        id: 3,
        name: 'MUI'
      },
      {
        id: 4,
        name: 'Sweetalert'
      },
      {
        id: 5,
        name: 'JSON-server'
      },
    ]
  },
  {
    id: 2,
    title: 'Restaurant',
    desc: 'Developed a modern and fully responsive restaurant web application built with Next.js and styled using Tailwind CSS, offering a sleek design and smooth user experience.',
    img: 'https://res.cloudinary.com/dc7qyltbv/image/upload/v1759679458/pizaniaho_snskkr.png',
    link: 'https://pizaniahonext-app.vercel.app/',
    tools: [
      {
        id: 1,
        name: 'React'
      },
      {
        id: 2,
        name: 'Next'
      },
      {
        id: 3,
        name: 'CSS3'
      },
      {
        id: 4,
        name: 'Tailwind'
      },
      {
        id: 5,
        name: 'TypeScript'
      },
    ]
  },
  {
    id: 3,
    title: 'E-commerce',
    desc: 'e-commerce web application using React, integrating Firebase for authentication. The app also utilizes local storage for a seamless shopping experience.',
    img: 'https://res.cloudinary.com/dc7qyltbv/image/upload/v1759679459/ecommerce_zhftcr.png',
    link: 'https://e-commerce-lyart-five-12.vercel.app/',
    tools: [
      {
        id: 1,
        name: 'React'
      },
      {
        id: 2,
        name: 'Tailwind'
      },
      {
        id: 3,
        name: 'CSS3'
      },
      {
        id: 4,
        name: 'Sweetalert'
      },
      {
        id: 5,
        name: 'Firebase'
      },
    ]
  },
  {
    id: 4,
    title: 'Demo',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quibusdam earum ipsa vero sed fugiat error iure',
    img: 'https://images.pexels.com/photos/33754560/pexels-photo-33754560.jpeg',
    link: '#',
    tools: [
      {
        id: 1,
        name: 'React'
      },
      {
        id: 2,
        name: 'Tailwind'
      },
      {
        id: 3,
        name: 'MUI'
      },
      {
        id: 4,
        name: 'Sweetalert'
      },
      {
        id: 5,
        name: 'json-server'
      },
    ]
  },
]

const PortfolioPage = () => {
  const hireMeRef = useRef()
  const isHireMeInView = useInView(hireMeRef, { margin: '-200px' })

  return (
    <motion.div 
      className='h-full overflow-x-hidden' 
      initial={{ y: '-200vh' }} 
      animate={{ y: '0%' }} 
      transition={{ duration: 1 }}
    >
      <div className='px-4 sm:px-8 md:px-12 lg:px-28 xl:px-36'>
        
        {/* Title */}
        <div className='flex items-center justify-center flex-col py-16 text-5xl font-bold gap-5'>
          <h1>PROJECTS</h1>
          <div className='relative w-64 h-1 bg-black'>
            <span className='w-4 h-4 rounded-full bg-white absolute ring-4 ring-black left-[47%] -top-1.5'></span>
          </div>
        </div>

        {/* Projects */}
        <div className='flex flex-col md:flex-row flex-wrap justify-between'>
          {myWorksData.map((item) => (
            <Link 
              key={item.id}
              target='_blank'
              href={item.link} 
              className='md:w-[48%] 2xl:w-[31%] hover:-translate-y-3 duration-300'
            >
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl mb-16 bg-white/50 backdrop-blur-md border border-white/20">
                {/* Image */}
                <div className='w-full relative h-[200px]'>
                  <Image fill src={item.img} alt={item.title} className='object-contain'/>
                </div>
                {/* Content */}
                <div className="px-6 py-4">
                  <h2 className="font-bold text-2xl mb-3">{item.title}</h2>
                  <p className="text-gray-700 text-base">{item.desc}</p>
                </div>
                {/* Tags */}
                <div className="px-6 pt-3 pb-5 flex flex-wrap gap-2">
                  {
                    item.tools.map((tool) => (
                      <span key={tool.id} className="inline-bloc rounded-full px-3 py-1 text-sm font-semibold bg-white">#{tool.name}</span>
                    ))
                  }
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className='flex flex-col gap-20 items-center justify-center text-center pt-24 pb-48' ref={hireMeRef}>
          <h2 className='text-5xl'>Do you have a project?</h2>
          <motion.div 
            initial={{scale:0}} 
            animate={isHireMeInView && {scale:1}} 
            transition={{duration:1, ease:'easeInOut'}} 
            className='relative'
          >
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              viewBox="0 0 300 300"
              className="w-64 h-64"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 150,150 m -120,0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
                />
              </defs>

              <text fill="#000">
                <textPath
                  href="#circlePath"
                  startOffset="50%"
                  textAnchor="middle"
                  className="text-[30px] tracking-[.38rem]"
                >
                  FRONT-END DEVELOPER • FOR YOU •
                </textPath>
              </text>
            </motion.svg>

            <Link
              href="/contact"
              className="w-36 h-36 absolute top-0 left-0 right-0 bottom-0 m-auto 
                         bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                         text-white rounded-full flex items-center justify-center 
                         text-xl font-bold shadow-lg hover:scale-110 active:scale-95 
                         transition-all duration-300"
            >
              Hire Me
            </Link>

          </motion.div>
        </div>

        
      </div>

    </motion.div>
  )
}

export default PortfolioPage