import styles from '../../css/Footer.module.css'

import { Link } from 'react-router-dom';

const Footerpart = ({title, textSections}) => {
	return (
		<>
			<div className={styles.footerSection}>
                <h3 className={styles.titleFooterPart}>{title}</h3>
                <ul className={styles.listFooter}>
                    {textSections.map(text =>{
                        return <li className={styles.listTextFooter}><Link to="/">{text}</Link></li>
                    })}
                </ul>
            </div>
		</>
	);
};

export default Footerpart;
