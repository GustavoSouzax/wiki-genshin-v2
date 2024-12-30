import { useState, useEffect } from 'react'
import styles from './Social.module.css'
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub, FaEnvelope, FaShareAlt } from 'react-icons/fa'

function Social() {
    const [isMobile, setIsMobile] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const socialLinks = [
        { icon: FaInstagram, href: "https://www.instagram.com/knights_works/", label: "Instagram" },
        { icon: FaTwitter, href: "#", label: "Twitter" },
        { icon: FaGithub, href: "https://github.com/GustavoSouzax", label: "GitHub" },
        { icon: FaLinkedin, href: "https://www.linkedin.com/in/gustavo-souzax/", label: "LinkedIn" },
        { icon: FaEnvelope, href: "mailto:gustavosiilvasouza3000@gmail.com", label: "Email" },
    ]

    return (
        <div className={`${styles.social} ${isMobile ? styles.mobile : ''} ${isExpanded ? styles.expanded : ''}`}>
            {isMobile && (
                <button className={styles.shareButton} onClick={toggleExpand}>
                    <FaShareAlt />
                </button>
            )}
            {socialLinks.map((link, index) => (
                <a 
                    key={index}
                    href={link.href} 
                    target={link.href === "#" ? '_self' : '_blank'} 
                    rel="noopener noreferrer"
                    className={`${styles.icon} ${styles[`icon${index + 1}`]}`}
                    aria-label={link.label}
                >
                    <link.icon />
                </a>
            ))}
        </div>
    )
}

export default Social