import dynamic from 'next/dynamic'
import StarBackground from '../components/StarBackground';
import BigText from '../components/BigText';

const HomeClient = dynamic(() => import('../components/HomeClient'));

const Home = () => {
  return (
    <div className="absolute inset-0 z-0">
      <HomeClient />
      <StarBackground />
      <div className='fixed inset-0 z-10'>
        <BigText />
      </div>
    </div>
  );
};

export default Home;
