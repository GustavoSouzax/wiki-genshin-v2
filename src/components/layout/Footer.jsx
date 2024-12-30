import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <p>&copy; 2024 Genshin Impact. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;