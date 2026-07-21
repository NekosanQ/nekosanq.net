import React from "react";
import Image from "next/image";
import StarBackground from "../components/StarBackground";
import BigText from "../components/BigText";
import HomeClient from "../components/HomeClient";
import ScrollDownIndicator from "../components/ScrollDownIndicator";
import AboutMeCard from "../components/Profile";
import StacksCard from "../components/SkillsCard";
import GroupAboutCard from "../components/GroupAbout";
import Service from "../components/Service";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-center gap-4 mb-10">
    <Image src="/icon.svg" alt="" width={40} height={40} className="rounded-full" />
    <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-slate-100">{title}</h2>
  </div>
);

const Home = () => {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {/* 背景 */}
      <div className="fixed inset-0 z-0">
        <StarBackground />
      </div>

      {/* メインコンテンツ */}
      <main className="relative z-10">
        <section id="home" className="relative min-h-screen">
          <HomeClient />
          <BigText />
        </section>

        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20" aria-hidden="true">
          <ScrollDownIndicator />
        </div>

        {/* About Me セクション */}
        <section id="about" className="relative flex flex-col items-center justify-center md:py-32 md:-mt-96 space-y-20 max-w-7xl mx-auto px-4">
          <ScrollReveal>
            <SectionHeader title="About me" />
          </ScrollReveal>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full">
            <ScrollReveal delay={0}>
              <AboutMeCard />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <StacksCard />
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <GroupAboutCard />
            </ScrollReveal>
          </div>
        </section>

        {/* Service セクション */}
        <section id="service" className="relative flex flex-col items-center justify-center max-w-7xl mx-auto px-4 py-20">
          <ScrollReveal>
            <SectionHeader title="Nekonnection Service" />
          </ScrollReveal>
          <Service />
        </section>

        {/* フッター */}
        <Footer />
      </main>
    </div>
  );
};

export default Home;
