"use client";
import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "猫の隠れ家 - CatHideaway",
    description: "猫好きの人達で交流し、国籍・年齢問わず楽しく過ごすDiscordコミュニティです。\n主に雑談・作業・配信・ゲームなどをしてます。",
    image: "/CatHideaway.png",
    achievements: ["参加者 3,200人以上", "累計参加者 10,000人以上"],
    actionLabel: "参加する",
    actionUrl: "https://discord.gg/8RAtEcwMBU"
  },
  {
    title: "猫咲 紬",
    description: "「可愛くて便利」\n2022年2月22日に作成し、サービスを開始したDiscordBOTです。",
    image: "/tsumugi.png",
    achievements: ["導入数 約1,500サーバー"],
    actionLabel: "導入する",
    actionUrl: "https://discord.com/oauth2/authorize?client_id=945369875516366909&permissions=8&scope=applications.commands+bot"
  },
  {
    title: "Japan Hideaway Server",
    description: "学生や社会人でも楽しめるようにレイド制限を設定したRustサーバーです。\n初心者から上級者まで幅広く楽しめる環境を提供しています。",
    image: "/JHS.png",
    achievements: ["最高同時接続 100人以上", "1週間のワイプ参加者 1,000人以上"],
    actionLabel: "参加する",
    actionUrl: "https://discord.gg/qhfFgnT7rr"
  }
];

export const Service: React.FC = () => {
  return (
    <section className="max-w-5xl w-full mx-auto px-2 sm:px-6 py-12 text-gray-100">
      <div className="flex flex-col space-y-28">
        {services.map(({ title, description, image, achievements, actionLabel, actionUrl }, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={title}
              className={`flex flex-col md:flex-row items-center md:items-start ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-16`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* 画像 */}
              <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden shadow-[0_0_24px_rgba(255,255,255,0.12)] border border-white/50 transition-shadow duration-400">
                <img src={image} alt={title} className="object-cover w-full h-full" loading="lazy" />
              </div>

              {/* 説明テキスト */}
              <div className="md:mb-20 md:w-2/3 max-w-xl text-center md:text-start">
                <h3 className="text-3xl md:text-4xl font-bold mb-5 tracking-wide text-slate-100">{title}</h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {description.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-5" aria-label={`${title}の実績`}>
                  {achievements.map((achievement) => (
                    <span
                      key={achievement}
                      className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1.5 text-sm font-semibold text-emerald-100"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
                <a
                  href={actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mt-7 inline-flex items-center gap-3 overflow-hidden rounded-xl border border-emerald-400/70 bg-gradient-to-r from-emerald-950/90 via-slate-950/95 to-green-950/90 px-6 py-3 font-semibold tracking-wide text-emerald-100 shadow-[0_0_14px_rgba(52,211,153,0.2),inset_0_0_14px_rgba(52,211,153,0.06)] transition-all duration-300 before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:-translate-y-0.5 hover:border-emerald-300 hover:text-white hover:shadow-[0_0_24px_rgba(52,211,153,0.4),inset_0_0_18px_rgba(52,211,153,0.1)] hover:before:left-[120%] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label={`${title}に${actionLabel}`}
                >
                  <span className="relative">{actionLabel}</span>
                  <span aria-hidden="true" className="relative text-emerald-300 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Service;
