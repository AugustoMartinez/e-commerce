import styles from '../../css/Footer.module.css'
import FooterPart from './FooterPart'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<FooterPart title="Servicios" textSections={["Armado de PC", "Asesoramiento de compra"]} />
            <FooterPart title="Soporte" textSections={["Centro de ayuda", "Contacta con nosotros", "Consulta sobre producto", "Consulta", "Estado del pedido"]} />
            <div>
                <h2 className={styles.suscribeTitle}>JAM TECHNOLOGY</h2>
                <div className={styles.socialItems}>
                    <span className={styles.socialItem}><i class='bx bxl-facebook-circle'></i></span>
                    <span className={styles.socialItem}><i class='bx bxl-instagram-alt'></i></span>
                    <span className={styles.socialItem}><i class='bx bxl-youtube'></i></span>
                    <span className={styles.socialItem}><i class='bx bxl-twitter'></i></span>
                </div>
                <div className={styles.formSuscribe}>
                    <input type="email" name="" id="" placeholder="INGRESA TU EMAIL" className={styles.inputSuscribe} />
                    <input type="button" value="SUSCRIBETE" className={styles.buttonSuscribe} />
                </div>
            </div>
        </footer>
	);
};

export default Footer;
