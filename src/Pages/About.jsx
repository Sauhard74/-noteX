import React from 'react';
import { motion } from 'framer-motion';
import { TextGenerateEffectDemo } from '../Components/ui/Abouttext';
import { FaLinkedin, FaInstagram, FaGlobe, FaFileAlt, FaDiscord } from 'react-icons/fa';
import AuroraBackground from '../Components/ui/aurora-background';

const About = () => {
  const githubUsername = 'soummyaanon';

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <AuroraBackground>
      <div className="container mx-auto px-4 py-12 min-h-screen flex flex-col justify-center">
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6 text-white">About NoteX</h1>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <TextGenerateEffectDemo />
          </div>
        </motion.section>
        
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Meet the Creator</h2>
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl">
            <div className="flex flex-col items-center">
              <img
                src={`https://github.com/${githubUsername}.png`}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg mb-6"
              />
              <h3 className="text-2xl font-bold text-white mb-2">Soumyaranjan Panda</h3>
              <p className="text-gray-300 mb-6">Fullstack Developer / Tech Enthusiast</p>
              
              <div className="flex space-x-6 mb-8">
                <SocialLink href="https://www.linkedin.com/in/soumyaranjan-panda-33496a179/" icon={<FaLinkedin />} label="LinkedIn" />
                <SocialLink href="https://www.instagram.com/anonymous__warior/" icon={<FaInstagram />} label="Instagram" />
                <SocialLink href="https://soumya-ranjan.tech/" icon={<FaGlobe />} label="Portfolio" />
                <SocialLink href="https://drive.google.com/file/d/1tO0jIv9wThvdWw6v-ANUkygzPX9HdsJJ/view?usp=share_link" icon={<FaFileAlt />} label="Resume" />
              </div>
              
              <a
                href="https://www.discord.com/soumyapanda2000" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 flex items-center"
              >
                <FaDiscord className="mr-2" />
                Contact Me on Discord
              </a>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-8 text-white">Featured On</h2>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl inline-block">
            <a href="https://www.producthunt.com/posts/notex-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-notex&#0045;2" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=487462&theme=light" 
                alt="noteX - Discover the power of AI-powered note-taking with noteX | Product Hunt" 
                width="250" 
                height="54" 
                className="transform hover:scale-105 transition duration-300"
              />
            </a>
          </div>
        </motion.section>
      </div>
    </AuroraBackground>
  );
};

const SocialLink = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:scale-110"
      aria-label={label}
    >
      {React.cloneElement(icon, { size: 28 })}
    </a>
  );
};

export default About;