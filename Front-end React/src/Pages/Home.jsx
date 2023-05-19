import styles from '../css/Home.module.css'

import Carrousel from '../components/HomeComponents/Carrousel'
import LastProduct from '../components/HomeComponents/LastProduct'
import MostBuyProduct from '../components/HomeComponents/MostBuyProduct'

const Home = () => {

	return (
		<main className={styles.mainHome}>
			<Carrousel />
			<LastProduct />
			<MostBuyProduct />
		</main>
	);
};

export default Home;
