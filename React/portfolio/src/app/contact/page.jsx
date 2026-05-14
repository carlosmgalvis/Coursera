"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import { FaGithub, FaLinkedin, FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa"

const ContactPage = () => {
  const myText = "Say Hello"
  const formRef = useRef()
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState("")

  const sendEmail = (e) => {
    e.preventDefault()
    setIsSending(true)
    setStatus("")

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        () => {
          setIsSending(false)
          setStatus("✅ Message sent successfully!")
          formRef.current.reset()
        },
        (error) => {
          setIsSending(false)
          setStatus("❌ Failed to send, please try again.")
          console.error("EmailJS Error:", error)
        }
      )
  }

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full flex flex-col items-center lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl overflow-x-hidden">

        {/* TEXT CONTAINER */}
        <div className="h-1/4 lg:h-full lg:w-1/2 flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl font-bold">
          <div className="flex gap-1">
            {myText.split("").map((letter, index) => (
              <motion.span
                key={index}
                animate={{ opacity: [0, 1, 0], y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              😊
            </motion.span>
          </div>
        </div>

        {/* FORM CONTAINER */}
       <div className="flex flex-col h-3/4 lg:h-full lg:w-1/2 justify-center">
         <motion.form
          ref={formRef}
          onSubmit={sendEmail}
          whileHover={{ scale: 1.01 }}
          className="rounded-2xl text-lg flex flex-col gap-8 px-8 py-10 shadow-2xl 
                     bg-white/20 backdrop-blur-xl border border-white/30"
        >
          <textarea
            name="user_message"
            rows={2}
            placeholder="💬 Your Message..."
            aria-label="Your Message"
            className="p-4 outline-none rounded-xl bg-white/30 backdrop-blur-md 
                       border border-white/20 shadow-lg 
                       focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
            required
          />

          <input
            type="text"
            name="user_name"
            placeholder="👤 Your Name"
            aria-label="Your Name"
            className="p-4 outline-none rounded-xl bg-white/30 backdrop-blur-md 
                       border border-white/20 shadow-lg 
                       focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
            required
          />

          <input
            type="email"
            name="user_email"
            placeholder="📧 Your Email"
            aria-label="Your Email"
            className="p-4 outline-none rounded-xl bg-white/30 backdrop-blur-md 
                       border border-white/20 shadow-lg 
                       focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
            required
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            disabled={isSending}
            className={`mt-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                       text-white font-semibold tracking-wide shadow-lg transition-all duration-300 
                       ${isSending ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSending ? "⏳ Sending..." : "🚀 Send Message"}
          </motion.button>

          {status && (
            <p className="text-center text-sm mt-2 font-medium">
              {status}
            </p>
          )}
        </motion.form>
        {/* --- LINE WITH “or” --- */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-500"></div>
            <span className="px-3 text-gray-600 font-medium">or</span>
            <div className="flex-grow h-px bg-gray-500"></div>
          </div>

          {/* --- SOCIAL ICONS --- */}
          <div className="flex justify-center gap-6 text-3xl pb-10 md:pb-0">
            <motion.a
              href="https://github.com/omarsalemj"
              globalTapTarget="_blank"
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className="text-gray-700 hover:text-black transition-colors duration-300"
            >
              <FaGithub />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/omar-salem-a17941388/"
              globalTapTarget="_blank"
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className="text-cyan-700 hover:text-cyan-600 transition-colors duration-300"
            >
              <FaLinkedin />
            </motion.a>

            <motion.a
              href="https://www.facebook.com/omer.salem.610516?mibextid=ZbWKwL"
              globalTapTarget="_blank"
              whileHover={{ scale: 1.2 }}
              className="text-blue-800 hover:text-blue-600 transition-colors duration-300"
            >
              <FaFacebook />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/3omar_512?igsh=MXA0NGs2ZTZsbGJyMQ=="
              globalTapTarget="_blank"
              whileHover={{ scale: 1.2 }}
              className="hover:text-purple-600 transition-colors duration-300"
            >
              <FaInstagram />
            </motion.a>

            <motion.a
              href="https://wa.me/+201021087077"
              globalTapTarget="_blank"
              whileHover={{ scale: 1.2 }}
              className="text-green-600 hover:text-green-400 transition-colors duration-300"
            >
              <FaWhatsapp />
            </motion.a>
          </div>
       </div>
      </div>
    </motion.div>
  )
}

export default ContactPage
