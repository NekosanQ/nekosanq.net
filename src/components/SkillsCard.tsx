'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools } from '@fortawesome/free-solid-svg-icons';

const icons = [
  { name: 'React', url: 'https://skillicons.dev/icons?i=react' },
  { name: 'Next.js', url: 'https://skillicons.dev/icons?i=nextjs' },
  { name: 'TypeScript', url: 'https://skillicons.dev/icons?i=typescript' },
  { name: 'Node.js', url: 'https://skillicons.dev/icons?i=nodejs' },
  { name: 'Express', url: 'https://skillicons.dev/icons?i=express' },
  { name: 'Tailwind CSS', url: 'https://skillicons.dev/icons?i=tailwind' },
  { name: 'Git', url: 'https://skillicons.dev/icons?i=git' },
  { name: 'Docker', url: 'https://skillicons.dev/icons?i=docker' },
  { name: 'JavaScript', url: 'https://skillicons.dev/icons?i=javascript' },
  { name: 'Discord.js', url: 'https://skillicons.dev/icons?i=discordjs' },
  { name: 'Python', url: 'https://skillicons.dev/icons?i=python' },
  { name: 'Java', url: 'https://skillicons.dev/icons?i=java' },
  { name: 'Kotlin', url: 'https://skillicons.dev/icons?i=kotlin' },
  { name: 'MySQL', url: 'https://skillicons.dev/icons?i=mysql' },
  { name: 'Linux', url: 'https://skillicons.dev/icons?i=linux' },
  { name: 'Prisma', url: 'https://skillicons.dev/icons?i=prisma' },
  { name: 'Bootstrap', url: 'https://skillicons.dev/icons?i=bootstrap' },
  { name: 'Cloudflare', url: 'https://skillicons.dev/icons?i=cloudflare' }
];

const SkillsCard: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mt-10 md:mt-0 md:ml-5 w-72 md:w-96 h-96 p-1 rounded-2xl bg-gradient-to-tr from-slate-500 via-lime-100 to-slate-500 shadow-2xl overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div
        className="w-full h-full bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700
        rounded-2xl text-white flex flex-col p-6"
      >
        {/* 上部タイトル */}
        <div className="flex items-center space-x-2 mb-4 justify-center">
          <FontAwesomeIcon icon={faTools} className="text-xl" />
          <h1 className="text-xl font-semibold tracking-wide">My Skills</h1>
        </div>

        {/* 技術アイコン横並び */}
        <div className="flex flex-wrap justify-center items-center gap-4 flex-grow mt-4 overflow-auto">
          {icons.map(({ name, url }) => (
            <img key={name} src={url} alt={name} title={name} className="w-12 h-12 object-contain" draggable={false} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsCard;
