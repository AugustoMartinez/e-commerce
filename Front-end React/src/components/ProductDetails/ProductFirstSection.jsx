import styles from '../../css/ProductFirstSection.module.css';

const ProductFirstSection = ({ productName, productBrand, productDescription, productPrice, productStock, productImage }) => {
	return (
		<section className={styles.mainProductFirstSection}>
			<div className={styles.productImgSection} width='50%'>
				<img src={productImage} alt='product box' className={styles.imgProduct} width='75%' />
			</div>
			<div className={styles.productData}>
				<h1>{productName}</h1>
				<p className={styles.productDataBrand}>
					<span>Marca: </span>
					{productBrand}
				</p>
				<p className={styles.productDataDescription}>{productDescription}</p>
				<p className={styles.productDataPrice}>${productPrice}</p>
				<div className={styles.buttonSection} >
					<button type="button" className={styles.button} >
						<i class='bx bx-minus'></i>
					</button>
					<p className={styles.productDataStock}>{productStock}</p>
                    <button type="button" className={styles.button} >
						<i class='bx bx-plus'></i>
					</button>
				</div>
				<button type='button' className={styles.buttonComprar} >Añadir al carrito</button>
			</div>
		</section>
	);
};

export default ProductFirstSection;
