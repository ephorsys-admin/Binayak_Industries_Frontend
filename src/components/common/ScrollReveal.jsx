import React from "react";
import { motion } from "framer-motion";

/**
 * ScrollReveal: Animates elements into view when scrolled.
 * Fail-safe: Self-contained so async data never gets stuck at opacity 0.
 */
export const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.45,
  distance = 20,
  className = "",
  once = true,
  ...props
}) => {
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      case "scale":
        return { opacity: 0, scale: 0.95 };
      case "fade":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "scale":
        return { opacity: 1, scale: 1 };
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "fade":
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, amount: "some", margin: "0px 0px 50px 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScrollStagger: Container for lists/grids.
 */
export const ScrollStagger = ({
  children,
  staggerChildren = 0.05,
  delayChildren = 0,
  className = "",
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

/**
 * ScrollItem: Self-contained motion item that animates smoothly into view.
 * Even if data loads asynchronously from backend API, it will ALWAYS animate and show.
 */
export const ScrollItem = ({
  children,
  direction = "up",
  distance = 15,
  duration = 0.35,
  delay = 0,
  className = "",
  ...props
}) => {
  const initialVariants = {
    opacity: 0,
    y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    x: direction === "left" ? distance : direction === "right" ? -distance : 0,
    scale: direction === "scale" ? 0.96 : 1,
  };

  return (
    <motion.div
      initial={initialVariants}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: "some" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
