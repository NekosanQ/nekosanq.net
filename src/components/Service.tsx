'use client';
import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: '猫の隠れ家 - CatHideaway',
    description: '猫好きの人達で交流し、国籍・年齢問わず楽しく過ごすDiscordコミュニティです。\n主に雑談・作業・配信・ゲームなどをしてます。',
    image: '/CatHideaway.png'
  },
  {
    title: '猫咲 紬',
    description: '「可愛くて便利」\n2022年2月22日に作成し、サービスを開始したDiscordBOTです。',
    image: '/tsumugi.png'
  }
];

export const Service: React.FC = () => {
  return (
    <section className="max-w-5xl w-full mx-auto px-2 sm:px-6 py-12 from-gray-900 via-gray-800 to-gray-900 rounded text-gray-100">
      <div className="flex flex-col space-y-28">
        {services.map(({ title, description, image }, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={title}
              className={`flex flex-col md:flex-row items-center md:items-start ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* 画像 */}
              <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden shadow-md border border-slate-300 border-opacity-50 transition-shadow duration-400">
                <img src={image} alt={title} className="object-cover w-full h-full" loading="lazy" />
              </div>

              {/* 説明テキスト */}
              <div className="md:mb-20 md:w-2/3 max-w-xl text-center md:text-start">
                <h3 className="text-4xl font-semibold mb-5 tracking-wide text-slate-200 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {description.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Service;
