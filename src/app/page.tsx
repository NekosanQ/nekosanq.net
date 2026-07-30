import React from "react";
import CatNetworkBackdrop from "../components/CatNetworkBackdrop";
import BigText from "../components/BigText";
import ScrollDownIndicator from "../components/ScrollDownIndicator";
import AboutMeCard from "../components/Profile";
import StacksCard from "../components/SkillsCard";
import GroupAboutCard from "../components/GroupAbout";
import Service from "../components/Service";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="section-heading mb-16 flex flex-col items-center justify-center gap-4">
    <h2 className="text-2xl font-extralight tracking-[-0.035em] text-slate-100 md:text-4xl">{title}</h2>
    <span className="h-px w-16 bg-emerald-300/50" aria-hidden="true" />
  </div>
);

const Home = () => {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-[#030607] text-white">
      {/* 背景 */}
      <CatNetworkBackdrop />

      {/* メインコンテンツ */}
      <main className="relative z-10">
        <section id="home" className="hero-section relative min-h-[100svh]">
          <BigText />
        </section>

        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20" aria-hidden="true">
          <ScrollDownIndicator />
        </div>

        {/* About Me セクション */}
        <section
          id="about"
          className="about-section relative z-20 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col items-center justify-center px-4 py-28 md:py-36"
        >
          <SectionHeader title="About me" />
          <div className="about-grid grid w-full grid-cols-1 place-items-center gap-8 lg:grid-cols-3">
            <ScrollReveal className="about-item" variant="safeCard">
              <AboutMeCard />
            </ScrollReveal>
            <ScrollReveal className="about-item" delay={220} variant="safeCard">
              <StacksCard />
            </ScrollReveal>
            <ScrollReveal className="about-item" delay={440} variant="safeCard">
              <GroupAboutCard />
            </ScrollReveal>
          </div>
        </section>

        {/* Service セクション */}
        <section id="service" className="content-section relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-28 md:py-36">
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
