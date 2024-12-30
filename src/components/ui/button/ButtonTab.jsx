import PropTypes from 'prop-types'
import styles from './ButtonTab.module.css'

function ButtonTab({ text, active, onClick }) {
    return (
        <button 
            className={`${styles.btn} ${active ? styles.active : ''}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

ButtonTab.propTypes = {
    text: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
}

export default ButtonTab

