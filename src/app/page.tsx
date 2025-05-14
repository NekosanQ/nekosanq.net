import dynamic from 'next/dynamic'
import StarBackground from '../components/StarBackground';

const HomeClient = dynamic(() => import('../components/HomeClient'));
const Home = () => {
  return(
    <div className="absolute inset-0 z-0">
        <HomeClient />
        <StarBackground />
    </div>
  )
}
export default Home;
