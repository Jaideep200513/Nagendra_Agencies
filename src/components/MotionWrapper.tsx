'use client';

import React, { useEffect, useRef } from 'react';
import { motion, HTMLMotionProps, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

// Refined industrial easing curve: snappy start, silky deceleration, zero rubber-band slop
const smoothEase = [0.16, 1, 0.3, 1];

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.45,
  direction = 'up',
  className = '',
  ...props
}: FadeInProps) {
  const directionOffset = {
    up: { y: 16, x: 0 },
    down: { y: -16, x: 0 },
    left: { x: 16, y: 0 },
    right: { x: -16, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: directionOffset[direction].x,
        y: directionOffset[direction].y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration,
        delay,
        ease: smoothEase,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.06,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-30px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.4, 
            ease: smoothEase 
          } 
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedStatNumber: Smoothly counts up to a target number when scrolled into view.
 * Subtle and fast (1.2s max), non-gimmicky, adds genuine polish.
 */
export function AnimatedStatNumber({
  value,
  suffix = '',
  className = '',
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (latest) => Math.floor(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(motionVal, value, {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [inView, motionVal, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/**
 * SectionTransition:
 * Elegant scroll-into-view animation wrapper for major page sections.
 * Features a subtle upward drift (y: 20 -> 0) with a fast, high-performance ease curve,
 * making moving from one section to another feel cohesive and physical.
 */
export function SectionTransition({
  children,
  className = '',
  id,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: smoothEase,
      }}
      className={`scroll-mt-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}

