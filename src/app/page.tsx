import StarBackground from '../components/StarBackground';
import BigText from '../components/BigText';
import HomeClient from '../components/HomeClient';
import ScrollDownIndicator from '../components/ScrollDownIndicator';
import AboutMeCard from '../components/Profile';
import StacksCard from '../components/SkillsCard';
import GroupAboutCard from '../components/GroupAbout';

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

        <section id="about" className="relative flex flex-col md:flex-row items-center justify-center md:py-32 md:-mt-96">
          <AboutMeCard />
          <StacksCard />
          <GroupAboutCard />
        </section>
      </main>
    </div>
  );
};

export default Home;
