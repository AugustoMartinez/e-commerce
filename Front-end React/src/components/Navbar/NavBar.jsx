import styles from '../../css/Navbar.module.css';
import Logo from '../../logoJam.png';
import { Link } from 'react-router-dom';

const Navbar = ({ product }) => {
	return (
		<header>
			<section className={styles.subSection}>
				<div className={styles.contactPart}>
					<p className={styles.contactText}>223 5555-5555</p>
					<p className={styles.contactText}>jamtechnology@gmail.com</p>
				</div>
				<div className={styles.contactPart}>
					<p className={styles.contactText}>
						ARS <i className='bx bxs-chevron-down'></i>
					</p>
					<p className={styles.contactText}>
						Español <i className='bx bxs-chevron-down'></i>
					</p>
					<Link to='/' className={styles.contactText}>
						Seguimientos de pedidos
					</Link>
				</div>
			</section>
			<section className={styles.mainSection}>
				<div>
					<Link to='/' className={styles.logoLink}>
						<img src={Logo} alt='Logo de la pagina' width='50px' className={styles.logoImg} />
						<p>TECHNOLOGY</p>
					</Link>
				</div>
				<div className={styles.searchContainer}>
					<input type='text' placeholder='Buscar' className={styles.searchInput} />
					<button type='button' className={styles.searchButton}>
						<i className='bx bx-search-alt'></i>
					</button>
				</div>
				<div>
					<ul className={styles.userIconsInterfaces}>
						<li className={styles.userIcons}>
							<Link to='/'>
								<i className='bx bx-bell'></i>
							</Link>
						</li>
						<li className={styles.userIcons}>
							<Link to='/'>
								<i className='bx bx-user'></i>
							</Link>
						</li>
						<li className={styles.userIcons}>
							<Link to='/'>
								<i className='bx bx-cart-alt'></i>
							</Link>
						</li>
					</ul>
				</div>
			</section>
			<nav className={styles.subSection}>
				<div className={styles.navMenu}>
					<Link to='/' className={styles.navItems}>
						Inicio
					</Link>
					<Link to='/' className={styles.navItems}>
						Tienda <i className='bx bxs-chevron-down'></i>
					</Link>
					<Link to='/' className={styles.navItems}>
						Ofertas
					</Link>
					<Link to='/' className={styles.navItems}>
						Soporte
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
