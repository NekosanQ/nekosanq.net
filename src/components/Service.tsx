import React from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    title: "猫の隠れ家 - CatHideaway",
    description: "猫好きの人達で交流し、国籍・年齢問わず楽しく過ごすDiscordコミュニティです。\n主に雑談・作業・配信・ゲームなどをしてます。",
    image: "/CatHideaway.png",
    achievements: [
      { label: "参加者", value: "3,200人以上" },
      { label: "累計参加者", value: "10,000人以上" }
    ],
    actionLabel: "参加する",
    actionUrl: "https://discord.gg/8RAtEcwMBU"
  },
  {
    title: "猫咲 紬",
    description: "「可愛くて便利」\n2022年2月22日に作成し、サービスを開始したDiscordBOTです。",
    image: "/tsumugi.png",
    achievements: [{ label: "導入数", value: "約1,500サーバー" }],
    actionLabel: "導入する",
    actionUrl: "https://discord.com/oauth2/authorize?client_id=945369875516366909&permissions=8&scope=applications.commands+bot"
  },
  {
    title: "Japan Hideaway Server",
    description: "学生や社会人でも楽しめるようにレイド制限を設定したRustサーバーです。\n初心者から上級者まで幅広く楽しめる環境を提供しています。",
    image: "/JHS.png",
    achievements: [
      { label: "最高同時接続", value: "100人以上" },
      { label: "1週間のワイプ参加者", value: "1,000人以上" }
    ],
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
            <ScrollReveal key={title} className="w-full">
              <div className={`flex flex-col md:flex-row items-center md:items-start ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-16`}>
                {/* 画像 */}
                <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden shadow-[0_0_24px_rgba(255,255,255,0.12)] border border-white/50 transition-shadow duration-400">
                  <Image src={image} alt={title} width={128} height={128} sizes="128px" className="object-cover w-full h-full" />
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
                    {achievements.map(({ label, value }) => (
                      <div
                        key={label}
                        className="min-w-32 rounded-lg border border-white/10 border-l-2 border-l-white bg-gradient-to-r from-white/10 to-white/[0.03] px-4 py-2.5 text-left shadow-sm backdrop-blur-sm"
                      >
                        <span className="block text-xs font-medium tracking-wide text-slate-400">{label}</span>
                        <strong className="mt-0.5 block text-base font-bold text-slate-100">{value}</strong>
                      </div>
                    ))}
                  </div>
                  <a
                    href={actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative mt-7 inline-flex items-center gap-3 pb-1.5 text-base font-semibold text-slate-100 transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-slate-500 after:transition-all after:duration-200 hover:text-emerald-300 hover:after:h-0.5 hover:after:bg-emerald-400 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                    aria-label={`${title}に${actionLabel}`}
                  >
                    <span>{actionLabel}</span>
                    <span
                      aria-hidden="true"
                      className="text-lg text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-emerald-300"
                    >
                      →
                    </span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};

export default Service;
