import styles from '../../css/Home.module.css'
import imgProducto from './1636918198460-598150853-i3_10100f.jpg';

const CarrouselElement = () => {

	return (
		<div className={styles.carrouselElement}>
            <section className={styles.carrouselElementTextsSection}>
                <h3 className={styles.textSectionBrand}>Intel</h3>
                <h1 className={styles.textSectionProductName}>i3 10100F</h1>
                <p className={styles.textSectionProductDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est minus, alias dolorum mollitia, itaque sint dolor harum ex quam, voluptatem cupiditate! Repellat, reiciendis. Modi quisquam pariatur unde a eius quidem?</p>
                <input type="button" value="Comprar ahora" className={styles.textSectionBuyButton} />
            </section>
            <section className={styles.textSectionImg}>
                <img src={imgProducto} alt="" width="300px" className={styles.textSectionImgProduct} />
            </section>
        </div>
	);
};

export default CarrouselElement;
