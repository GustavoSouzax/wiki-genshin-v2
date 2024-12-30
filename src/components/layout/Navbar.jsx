import { useState } from "react"
import { Link } from "react-router"
import styles from "./Navbar.module.css"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={styles.headerContainer}>
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    <Link to={"/wiki-genshin-v2"} className={styles.logo}>
                        GenshinImpact
                    </Link>
                    <div className={`${styles.links} ${isOpen ? styles.active : ''}`}>
                        <Link className={styles.link} to="/wiki-genshin-v2">
                            Home
                        </Link>
                        <Link className={styles.link} to="/wiki-genshin-v2/personagens">
                            Personagens
                        </Link>
                        <Link className={styles.link} to="/wiki-genshin-v2/noticias">
                            Noticias
                        </Link>
                        <Link className={styles.link} to="/wiki-genshin-v2/sobre">
                            Sobre
                        </Link>
                    </div>
                    <button 
                        className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
                        onClick={toggleMenu}
                        aria-label="Menu"
                    >
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </button>
                </nav>
            </header>
        </div>
    )
}

export default Navbar