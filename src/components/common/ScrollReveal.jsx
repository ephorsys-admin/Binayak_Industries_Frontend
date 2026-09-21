import React from "react";
import { motion } from "framer-motion";

/**
 * ScrollReveal: Animates elements into view when scrolled.
 * Mobile-safe with amount: 0.01 so it never stays hidden on small screens.
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
  const getInitialVariants = () => {
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

  const getAnimateVariants = () => {
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
      initial={getInitialVariants()}
      whileInView={getAnimateVariants()}
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
 * ScrollStagger: Stagger container for animating lists/grids of cards.
 */
export const ScrollStagger = ({
  children,
  staggerChildren = 0.06,
  delayChildren = 0,
  className = "",
  once = true,
  ...props
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: "some", margin: "0px 0px 50px 0px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScrollItem: Child element inside a ScrollStagger container.
 */
export const ScrollItem = ({
  children,
  direction = "up",
  distance = 15,
  duration = 0.4,
  className = "",
  ...props
}) => {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      scale: direction === "scale" ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
