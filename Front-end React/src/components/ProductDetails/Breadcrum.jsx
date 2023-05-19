import styles from '../../css/Breadcrum.module.css'

const Breadcrum = ({ productCategory, productName }) => {
	return (
		<section className={styles.sectionBreadcrum}>
			<p className={styles.textBreadcrum}>Inicio</p>
            <span className={styles.textBreadcrum}><i className='bx bxs-chevrons-right'></i></span>
            <p className={styles.textBreadcrum}>{productCategory}</p>
            <span className={styles.textBreadcrum}><i className='bx bxs-chevrons-right'></i></span>
            <p className={styles.textBreadcrum}>{productName}</p>
		</section>
	);
};

export default Breadcrum;


