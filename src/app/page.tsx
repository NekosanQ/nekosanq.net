import React from 'react';
import StarBackground from '../components/StarBackground';
import BigText from '../components/BigText';
import HomeClient from '../components/HomeClient';
import ScrollDownIndicator from '../components/ScrollDownIndicator';
import AboutMeCard from '../components/Profile';
import StacksCard from '../components/SkillsCard';
import GroupAboutCard from '../components/GroupAbout';
import Service from '../components/Service';
import Footer from '../components/Footer';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-center gap-4 mb-10">
    <img src="icon.svg" alt={title} className="w-10 h-10 rounded-full filter invert drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]" />
    <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-slate-200 drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]">{title}</h2>
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

        <section className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <ScrollDownIndicator />
        </section>

        {/* About Me セクション */}
        <section id="about" className="relative flex flex-col items-center justify-center md:py-32 md:-mt-96 space-y-20 max-w-7xl mx-auto px-4">
          <SectionHeader title="About me" />

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full">
            <AboutMeCard />
            <StacksCard />
            <GroupAboutCard />
          </div>
        </section>

        {/* Service セクション */}
        <section id="service" className="relative flex flex-col items-center justify-center max-w-7xl mx-auto px-4 py-20">
          <SectionHeader title="Nekonnection Service" />
          <Service />
        </section>
        {/* フッター */}
        <Footer />
      </main>
    </div>
  );
};

export default Home;
