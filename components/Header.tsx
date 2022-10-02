import Image from 'next/image';
import styles from '../styles/app.module.css'
import logo from '../assets/logo.png'

const Search = () => {
    return (
        <div className={styles.header}>
            <div className={styles.nav}>
                <div className={styles.nav_logo}>
               
                <span className={styles.nav_logo_text}>DAI Tracker</span>
                </div>
            </div>
            <div className={styles.line}></div>
        </div>
    )
}

export default Search;