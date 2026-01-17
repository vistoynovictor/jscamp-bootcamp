import { useState } from 'react';

import { Link } from './Link.jsx'
import styles from './Header.module.css';

export function Header(){
    const [isExpanded, setIsExpanded] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    function handleExpansion(){
        isExpanded === '' ? setIsExpanded(styles.expanded) : setIsExpanded('')
        isOpen ===  false ? setIsOpen(true) : setIsOpen(false);
    }

    return (
        <>
            <header className={styles.siteHeader}>
                <h2>
                    <Link href="/">
                        <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        DevJobs
                    </Link>
                </h2>

                <nav className={`${styles.navbar} ${styles.desktopNavbar}`}>
                    <Link href="/search">Empleos</Link>
                    <Link href="/contact">Contacto</Link> 
                </nav>

                <div>
                    <button className={styles.btnStd}>Subir CV</button>
                    <devjobs-avatar></devjobs-avatar>
                    <button 
                    className={`${styles.btnNavbar} ${isExpanded}`}
                    onClick={handleExpansion}
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                    </button>
                </div>
            </header>

            <details
            className={styles.dropdownNavbar}
            open={isOpen}
            >
                <summary></summary>
                <nav className={`${styles.navbar} ${styles.mobileNavbar}`}>
                    <Link href="./search">Empleos</Link>
                    <Link href="/contact">Contacto</Link> 

                </nav>
            </details>
        </>
    );
}
