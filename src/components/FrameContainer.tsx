'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FrameContainerProps {
  children: ReactNode;
  variant?: 'default';
}

export default function FrameContainer({ children, variant = 'default' }: FrameContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-surface rounded-lg shadow-card p-6"
    >
      {children}
    </motion.div>
  );
}

