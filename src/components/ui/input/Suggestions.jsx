import PropTypes from 'prop-types'
import styles from './Suggestions.module.css'

function Suggestions({ suggestions, onSelect }) {
  if (suggestions.length === 0) return null

  return (
    <ul className={styles.suggestions}>
      {suggestions.map((suggestion) => (
        <li key={suggestion} onClick={() => onSelect(suggestion)}>
          {suggestion}
        </li>
      ))}
    </ul>
  )
}

Suggestions.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default Suggestions