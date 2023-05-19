import styles from '../../css/Home.module.css'

import CarrouselElement from './CarrouselElement';

const Carrousel = () => {

	return (
		<section className={styles.carrouselSection}>
			<button className={styles.slideControll}>
                <i className='bx bxs-chevron-left'></i>
            </button>
            <CarrouselElement />
			<button className={styles.slideControll}>
                <i className='bx bxs-chevron-right'></i>
            </button>
		</section>
	);
};

export default Carrousel;
