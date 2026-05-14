"use client"

import React, { useRef } from 'react'
import { delay, motion, scale, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'


const skills = [
  { id: 1, title: 'HTML5' },
  { id: 2, title: 'CSS3' },
  { id: 3, title: 'JavaScript' },
  { id: 4, title: 'ES6' },
  { id: 5, title: 'TypeScript' },
  { id: 6, title: 'React.js' },
  { id: 7, title: 'Next.js' },
  { id: 8, title: 'Tailwind CSS' },
  { id: 12, title: 'Framer Motion' },
  { id: 9, title: 'MongoDB' },
  { id: 10, title: 'Node.js' },
  { id: 11, title: 'Express.js' },
]


const AboutPage = () => {

  const containerRef = useRef()

  const {scrollYProgress} = useScroll({container: containerRef})

  const rotateForward = useTransform(scrollYProgress, [0, 1], [0, 270])
  const rotateBackward = useTransform(scrollYProgress, [0, 1], [0, -270])

  const skillsRef = useRef()

  const isSkillsInView = useInView(skillsRef, {once: true})

  const skillsContainerVariants = {
    notViewed: {
      opacity: 0,
      scale: 0
    },
    viewed: {
      opacity: 1,
      scale: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: .15
      }
    }
  }

  const skillsVariants = {
    notViewed: {
      x: -10,
      opacity: 0
    },
    viewed: {
      x: 0,
      opacity: 1
    }
  }

  const experienceRef = useRef()

  const isExperienceInView = useInView(experienceRef, {margin: '-20px', once: true})

  return (
    <motion.div className='h-full overflow-x-hidden' initial={{y:'-200vh'}} animate={{y:'0%'}} transition={{duration:1}}  ref={containerRef}>

      <div className='flex'>

        {/* TEXT CONTAINER */}
        <div className='p-4 sm:p-8 md:p-12 lg:p-20 xl:p-48 flex flex-col gap-24 md:gap-32 lg:gap-48 lg:w-2/3'>
          {/* BIOGRAPHY */}
          <div className='flex flex-col gap-10 justify-center'>
            <h2 className='font-bold text-2xl'>ABOUT ME</h2>
            <p className='text-lg'>💻 Front-End Developer (Junior) passionate about building clean, modern, and responsive web applications. I enjoy turning ideas into interactive experiences using React, Next.js, HTML, CSS, and JavaScript. Always learning and improving — I believe great interfaces come from creativity, logic, and attention to detail.</p>
            <Link 
              href="/cv.pdf" 
              download 
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                        text-white font-semibold rounded-lg shadow-lg hover:scale-110 active:scale-95 
                        transition-all duration-200 w-fit"
            >
              📄 Download CV
            </Link>
            <motion.div initial={{opacity: .2, y: 0}} animate={{opacity: 1, y: '20px'}} transition={{duration: 2, repeat: Infinity, ease: 'easeOut'}} className='border-2 border-black w-fit pb-3 pt-1 rounded-2xl'>
              <Image src='/down.png' alt='down' width={25} height={25} objectFit='contain'></Image>
            </motion.div>
          </div>

          {/* SKILLS */}
          <motion.div variants={skillsContainerVariants} initial='notViewed' animate={isSkillsInView && 'viewed'} className='flex flex-col gap-12 justify-center' ref={skillsRef}>
            <motion.h2 className='font-bold text-2xl'>SKILLS</motion.h2>
            <div className='flex flex-wrap gap-4'>
              {skills.map((skill) => (
                <motion.div 
                  variants={skillsVariants}
                  key={skill.id} 
                  className='bg-black text-white rounded-md p-2 text-sm hover:text-black hover:bg-white hover:font-bold'
                >
                  {skill.title}
                </motion.div>
              ))}
            </div>
            <motion.div initial={{opacity: .2, y: 0}} animate={{opacity: 1, y: '20px'}} transition={{duration: 2, repeat: Infinity, ease: 'easeOut'}} className='border-2 border-black w-fit pb-3 pt-1 rounded-2xl'>
              <Image src='/down.png' alt='down' width={25} height={25} objectFit='contain'></Image>
            </motion.div>
          </motion.div>

          {/* EXPERIENCE */}
          <motion.div>
            <h2 className='font-bold text-2xl mb-14'>EXPERIENCE</h2>
            <div className="flex justify-between">
              <div className='w-1/3 flex flex-col gap-4'>
                <h3 className='bg-white p-3 font-bold rounded-b-lg rounded-s-lg'>Bachelor&apos;s degree in CS</h3>
                <p className='ps-2 italic text-sm w-full'>I graduated from faculty of Computers and information technology with grade: (very good).</p>
                <span className='text-red-500 text-sm font-semibold'>2019 - 2023</span>
                <span className='bg-white p-1 text-sm font-semibold rounded w-fit'>Mansoura University</span>
              </div>
              <div className='w-1 bg-gray-600 rounded relative'>
                <div className='absolute w-5 h-5 rounded-full bg-white ring-4 ring-red-400 -left-2'></div>
              </div>
              <div className='w-1/3'></div>
            </div>
            {/* /////////////// */}
            <div className="flex justify-between">
              <div className='w-1/3'>
              </div>
              <div className='w-1 bg-gray-600 rounded relative'>
                <div className='absolute w-5 h-5 rounded-full bg-white ring-4 ring-red-400 -left-2'></div>
              </div>
              <div className='w-1/3 flex flex-col gap-4'>
                <h3 className='bg-white p-3 font-bold rounded-b-lg rounded-e-lg'>Front-End Training</h3>
                <p className='ps-2 italic text-sm'>I was certified in Front-End Development during a summer training at my university.</p>
                <span className='text-red-500 text-sm font-semibold'>2022 - 2023</span>
                <span className='bg-white p-1 text-sm font-semibold rounded w-fit'>Mansoura University</span></div>
            </div>
            {/* /////////////// */}
            <div className="flex justify-between">
              <div className='w-1/3 flex flex-col gap-4'>
                <h3 className='bg-white p-3 font-bold rounded-b-lg rounded-s-lg'>Front-End Developer</h3>
                <p className='ps-2 italic text-sm'>During my studies, I worked on several projects, including building a dashboard using React and Next.js, as well as other projects with the same technologies.</p>
                <span className='text-red-500 text-sm font-semibold'>2022 - present</span>
                <span className='bg-white p-1 text-sm font-semibold rounded w-fit'>Personal Work</span>
              </div>
              <div className='w-1 bg-gray-600 rounded relative'>
                <div className='absolute w-5 h-5 rounded-full bg-white ring-4 ring-red-400 -left-2'></div>
              </div>
              <div className='w-1/3'></div>
            </div>
            {/* /////////////// */}
          </motion.div>
        </div>

        {/* IMAGE CONTAINER */}
        <div className='hidden lg:block w-1/3 sticky top-0 h-[75vh] '>
          <motion.div
            style={{
              rotate: rotateForward,
              top: "8rem",
              position: "absolute"
            }}
          >
            <Image src='/settings-1.png' alt='settings' width={180} height={180}  />
          </motion.div>
          <motion.div
            style={{
              rotate: rotateBackward,
              left: "95px",
              top: "16.7rem",
              position: "absolute"
            }}
          >
            <Image src='/settings-2.png' alt='settings' width={180} height={180}/>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}

export default AboutPage