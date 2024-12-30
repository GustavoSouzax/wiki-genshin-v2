import styles from "./Input.module.css";
//import { FaMagnifyingGlass } from "react-icons/fa6";
import PropType from "prop-types";

function Input({ type, placeholder, onChange }) {
    return (
            <input type={type} placeholder={placeholder} onChange={onChange} className={styles.input} />
    )
}

Input.propTypes = {
    type: PropType.string,
    placeholder: PropType.string,
    onChange: PropType.func,
}

export default Input