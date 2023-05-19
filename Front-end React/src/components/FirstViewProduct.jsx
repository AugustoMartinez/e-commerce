import styles from '../css/FirstViewProduct.module.css';

const FirstViewProduct = ({ prod }) => {
	return (
		<div className={styles.cardProduct}>
			<div className={styles.cardProductImageSection}>
				<img src={prod.image} alt='cosas lindas' className={styles.cardProductImage} width='100%' />
			</div>
			<div className={styles.cardProductTextSection}>
				<div className={styles.cardProductButtonSection}>
					<button type='button' className={styles.cardProductButton}>
						Comprar
					</button>
					<button type='button' className={styles.cardProductButton}>
						<i class='bx bxs-cart-add'></i>
					</button>
					<button type='button' className={styles.cardProductButton}>
						<i class='bx bxs-heart'></i>
					</button>
				</div>
				<div className={styles.cardProductText}>
					<h1>{prod.name}</h1>
					<p>${prod.price}</p>
				</div>
			</div>
		</div>
	);
};

export default FirstViewProduct;
