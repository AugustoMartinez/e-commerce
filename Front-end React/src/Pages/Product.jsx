import Breadcrum from '../components/ProductDetails/Breadcrum'
import ProductFirstSection from '../components/ProductDetails/ProductFirstSection'

import styles from '../css/Product.module.css'
import product from './producto.json'
import { useParams } from 'react-router-dom'

const Product = () => {
	const { id } = useParams();/* 
	const api = `http://127.0.0.1:4000/e-commerce/v1/products/${id}`  */
	return (
		<main className={styles.mainProduct}>
			<Breadcrum productCategory={product.category.name} productName={product.name} />
            <ProductFirstSection productName={product.name} productBrand={product.brand} productDescription={product.description} productPrice={product.price} productStock={product.countInStock} productImage={product.image} />
		</main>
	);
};

export default Product;
