import styles from './Error.module.css'
import imgError from '../../../assets/icons/furina-error.gif'
import PropTypes from 'prop-types'

function Error({ message }) {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorContent}>
            <img className={styles.errorIcon} src={imgError} alt="Error" />
                <div className={styles.errorMessage}>
                    <h2>Ops! Algo deu errado</h2>
                    <p>Recarregue a página</p>
                    <p><span>Erro:</span> {message}</p>
                </div>

            </div>
        </div>
    )
}

Error.propTypes = {
    message: PropTypes.string
}

export default Error