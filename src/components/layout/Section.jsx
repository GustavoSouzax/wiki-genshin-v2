import styles from './Section.module.css'
import PropTypes from 'prop-types'

function Section (props) {
    return (
        <section className={styles.section}>
            {props.children}
        </section>
    )
}

Section.propTypes = {
    children: PropTypes.node.isRequired
}

export default Section