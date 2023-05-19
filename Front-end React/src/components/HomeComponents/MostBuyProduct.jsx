import styles from '../../css/Home.module.css'
import FirstViewProduct from '../FirstViewProduct';
import productos from './productos.json'

import {Link} from 'react-router-dom'

const MostBuyProduct = () => {

	return (
		<section className={styles.lastProduct}>
			<h1 className={styles.lastProductTitle}>Los mas vendidos</h1>
			<div className={styles.cardsProducts} >
					{productos.map(product =>{
                        return <FirstViewProduct key={product.id} prod={product} className={styles.listTextFooter} />
                    })}
			</div>
			<div className={styles.buttonMoreSection}>
				<Link to="/shop" className={styles.buttonMore}>Ver mas</Link>
			</div>
		</section>
	);
};

export default MostBuyProduct;