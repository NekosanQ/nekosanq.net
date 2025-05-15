import StarBackground from '../components/StarBackground';
import BigText from '../components/BigText';
import HomeClient from '../components/HomeClient';
import ScrollDownIndicator from '../components/ScrollDownIndicator';
import AboutMeCard from '../components/AboutMeCard';

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">

      {/* 背景 */}
      <div className="fixed inset-0 z-0">
        <StarBackground />
      </div>
      {/* メインコンテンツ */}
      <main className="relative z-10">
        <section className="relative h-screen">
          <HomeClient />
          <BigText />
        </section>
        
        <section className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <ScrollDownIndicator />
        </section>

        <section className="relative flex items-center justify-center min-h-screen -mt-96">
          <AboutMeCard />
        </section>
      </main>
    </div>
  );
};

export default Home;
