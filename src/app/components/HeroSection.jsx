"use client";
import React, { useState, useEffect } from "react"; // ---> ADDED useState and useEffect
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  // ---> START: ADDED STATE AND EFFECT
  // State to hold the formatted sequence for TypeAnimation
  const [greetingSequence, setGreetingSequence] = useState([]);

  // Effect to fetch greetings and format them for the sequence
  useEffect(() => {
    async function fetchAndSetGreetings() {
      try {
        const response = await fetch("/api/greetings");
        const data = await response.json();

        // Transform the data into the format TypeAnimation needs:
        // From: [{ greeting: "Hello" }, { greeting: "Hola" }]
        // To:   ["Hello", 1500, "Hola", 1500]
        const formattedSequence = data.flatMap((item) => [item.greeting, 1500]); // 1.5-second pause after each

        setGreetingSequence(formattedSequence);
      } catch (error) {
        console.error("Failed to fetch greetings:", error);
        // Set a default sequence in case of an error
        setGreetingSequence(["Hello!", 1500, "Welcome!", 1500]);
      }
    }

    fetchAndSetGreetings();
  }, []); // The empty array [] means this effect runs only once
  // ---> END: ADDED STATE AND EFFECT

  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12 py-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400 ">
              I'm Reza
            </span>
            <br></br>
            {/* ---> MODIFIED THIS COMPONENT */}
            {/* Conditionally render TypeAnimation only when the sequence is ready */}
            {greetingSequence.length > 0 && (
              <TypeAnimation
                sequence={greetingSequence}
                wrapper="span"
                speed={25}
                style={{ fontSize: "1em", display: "inline-block" }}
                repeat={Infinity}
              />
            )}
          </h1>
          {/* I also fixed the typo in this paragraph for you :) */}
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            I am an Undergraduate Information Technology Student at Institut
            Teknologi Sepuluh Nopember (ITS)
          </p>
          <div>
            <Link
              href="/#contact"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-teal-400 to-blue-400 hover:bg-slate-200 text-white"
            >
              Hire Me
            </Link>
            <Link
              href="/"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-teal-400 to-blue-400 hover:bg-slate-800 text-white mt-3"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                Download CV
              </span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            <Image
              src="/images/potoku.png"
              alt="Reza"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={500}
              height={500}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
