import React from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    title: "猫の隠れ家 - CatHideaway",
    description: "猫好きの人達で交流し、国籍・年齢問わず楽しく過ごすDiscordコミュニティです。\n主に雑談・作業・配信・ゲームなどをしてます。",
    image: "/cat-hideaway.png",
    achievements: [
      { label: "参加者", value: "3,200人以上" },
      { label: "累計参加者", value: "5,000人以上" }
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
      { label: "1週間のワイプ参加者", value: "約 1,000人" }
    ],
    actionLabel: "参加する",
    actionUrl: "https://discord.gg/qhfFgnT7rr"
  }
];

export const Service: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-2 py-10 text-gray-100 sm:px-6">
      <div className="flex flex-col space-y-28 md:space-y-44">
        {services.map(({ title, description, image, achievements, actionLabel, actionUrl }, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <ScrollReveal key={title} className="w-full" delay={idx * 90} variant="stage">
              <article
                className={`flex min-h-[58vh] flex-col items-center justify-center gap-10 overflow-visible border-0 bg-transparent px-5 py-14 shadow-none md:min-h-[66vh] md:items-center md:gap-20 md:px-10 md:py-20 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* 画像 */}
                <div className="h-36 w-36 flex-shrink-0 overflow-hidden rounded-full bg-transparent md:h-40 md:w-40">
                  <Image
                    src={image}
                    alt={title}
                    width={300}
                    height={300}
                    sizes="(min-width: 768px) 160px, 144px"
                    unoptimized
                    className="h-full w-full scale-[1.12] object-cover [mask-image:radial-gradient(circle,#000_62%,transparent_76%)]"
                  />
                </div>

                {/* 説明テキスト */}
                <div className="max-w-2xl text-center md:flex-1 md:text-start">
                  <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.3em] text-emerald-300/70">Service / 0{idx + 1}</span>
                  <h3 className="mb-4 text-2xl font-light tracking-[-0.035em] text-slate-100 md:text-3xl">{title}</h3>
                  <p className="text-sm font-light leading-relaxed text-slate-400 md:text-base">
                    {description.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start" aria-label={`${title}の実績`}>
                    {achievements.map(({ label, value }) => (
                      <div
                        key={label}
                        className="min-w-32 rounded-xl border border-emerald-50/10 bg-emerald-50/[0.045] px-4 py-2.5 text-left shadow-[inset_0_1px_rgba(255,255,255,0.055),0_14px_34px_rgba(0,0,0,0.2)] backdrop-blur-md"
                      >
                        <span className="block text-xs font-medium tracking-wide text-slate-400">{label}</span>
                        <strong className="mt-0.5 block text-sm font-medium text-slate-100">{value}</strong>
                      </div>
                    ))}
                  </div>
                  <a
                    href={actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-5 rounded-xl border border-emerald-300/65 bg-emerald-400/[0.025] px-6 py-3 text-xs font-medium tracking-[0.14em] text-emerald-200 shadow-[0_0_18px_rgba(0,245,160,0.12),0_0_42px_rgba(0,245,160,0.06),inset_0_0_18px_rgba(0,245,160,0.025)] backdrop-blur-md transition-all duration-300 hover:border-emerald-200/95 hover:bg-emerald-400/[0.075] hover:text-emerald-100 hover:shadow-[0_0_22px_rgba(0,245,160,0.22),0_0_52px_rgba(0,245,160,0.11),inset_0_0_22px_rgba(0,245,160,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
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
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};

export default Service;
