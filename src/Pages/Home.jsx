import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../Components/ui/card";
import { Pencil, Users, Lock, Zap, FileText, Search, Star } from 'lucide-react';
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import AuroraBackground from "../Components/ui/aurora-background";
import { FlipWords } from "../Components/ui/flip-words";
import { getCurrentUser } from '../Services/appwrite';
import { Cover } from "../Components/ui/cover";

const FeatureIcon = React.memo(({ Icon }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="rounded-full bg-gradient-to-br from-primary/20 to-primary/30 p-2 w-10 h-10 flex items-center justify-center"
  >
    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
  </motion.div>
));

const features = [
  { title: "Create Note", description: "Start a new note or document", Icon: Pencil },
  { title: "Recent Notes", description: "Access your latest work", Icon: FileText },
  { title: "Search", description: "Find notes quickly", Icon: Search },
  { title: "Collaborate", description: "Invite others to your notes", Icon: Users },
  { title: "Favorites", description: "Access your starred notes", Icon: Star },
  { title: "Google Gemini Pro", description: "Get AI-powered insights", Icon: Zap },
];

const notLoggedInFeatures = [
  { title: "Collaborative Note-Taking", description: "Work together in real-time", Icon: Users },
  { title: "Smart Organization", description: "Keep your thoughts in order", Icon: Zap },
  { title: "Secure and Private", description: "Your data, your control", Icon: Lock }
];

const loggedInWords = [
  "Boost productivity",
  "Collaborate seamlessly",
  "Organize thoughts",
  "Gemini Pro insights",
  "Secure your ideas",
  "Access anywhere"
];

const notLoggedInWords = [
  "Organize your thoughts",
  "Secure your notes",
  "Gemini Pro assistance",
  "Smart Semantic Search",
  "Your notes, your way",
  "Enhanced productivity",
  "Seamless experience",
  "Innovative features"
];

const FeatureCard = React.memo(({ feature, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    className="bg-gradient-to-br from-white/5 to-white/10 rounded-lg p-3 hover:from-white/10 hover:to-white/20 transition-all duration-300 cursor-pointer group"
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="rounded-full bg-primary/20 p-2 w-8 h-8 flex items-center justify-center group-hover:bg-primary/30 transition-colors"
      >
        <feature.Icon className="w-4 h-4 text-primary group-hover:text-white transition-colors" aria-hidden="true" />
      </motion.div>
      <div>
        <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors">{feature.title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">{feature.description}</p>
      </div>
    </div>
  </motion.div>
));

export default function HomePage() {
  const [authState, setAuthState] = useState({ isLoggedIn: false, isLoading: true, userName: '' });
  const navigate = useNavigate();

  const checkLoginStatus = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      setAuthState({ 
        isLoggedIn: !!user, 
        isLoading: false, 
        userName: user ? user.name : '' 
      });
    } catch (error) {
      console.error('Failed to authenticate', error);
      setAuthState({ isLoggedIn: false, isLoading: false, userName: '' });
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const handleNavigation = useCallback((path) => () => navigate(path), [navigate]);

  const renderLoggedInContent = useCallback(() => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <FeatureCard 
              feature={feature} 
              onClick={feature.title === "Create Note" ? handleNavigation('/new-note') : undefined}
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-center"
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Ready to boost your productivity?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Start by creating a new note or accessing your recent work.</p>
        <Button
          onClick={handleNavigation('/new-note')}
          size="lg"
          className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
        >
          <motion.span
            className="flex items-center"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Pencil className="mr-2 h-4 w-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
            Create New Note
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  ), [handleNavigation]);

  const renderNotLoggedInContent = useCallback(() => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notLoggedInFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <FeatureIcon Icon={feature.Icon} />
            <h3 className="mt-3 font-semibold text-lg text-gray-800 dark:text-white">{feature.title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="flex flex-col items-center justify-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-lg text-center text-gray-800 dark:text-gray-200 max-w-2xl">
          Experience the future of note-taking with AI-powered insights and seamless collaboration.
        </p>
        <Button
          onClick={handleNavigation('/login')}
          size="lg"
          className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
        >
          <motion.span
            className="flex items-center"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Get Started
            <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  ), [handleNavigation]);

  return (
    <AuroraBackground>
      <AnimatePresence>
        {authState.isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn("min-h-screen flex items-center justify-center")}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeat: Infinity,
              }}
              className="loader text-lg text-gray-800 dark:text-gray-200"
              aria-live="polite"
            >
              Loading...
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={cn("min-h-screen flex items-center justify-center p-4")}
          >
            <Card className={cn("w-full max-w-4xl bg-white/90 dark:bg-black/10 backdrop-blur-lg shadow-xl")}>
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-extralight font-Orbitron text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                  <Cover>
                    {authState.isLoggedIn ? `Welcome back, ${authState.userName}!` : "Welcome to noteX"}
                  </Cover>
                </CardTitle>
                <FlipWords
                  words={authState.isLoggedIn ? loggedInWords : notLoggedInWords}
                  duration={3000}
                  className="text-lg md:text-xl font-extralight text-center mt-4 text-gray-800 dark:text-gray-200 font-Orbitron"
                />
              </CardHeader>
              <CardContent>
                {authState.isLoggedIn ? renderLoggedInContent() : renderNotLoggedInContent()}
              </CardContent>
              <CardFooter className="justify-center mt-4">
                <p className="text-xs text-gray-600 dark:text-gray-400">Discover the power of collaborative note-taking with noteX</p>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </AuroraBackground>
  );
}