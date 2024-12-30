import PropTypes from 'prop-types'
import styles from './CharacterCard.module.css'
import { truncateText } from '../../utils/textUtils';

function CharacterCard({ character, imageSrc }) {
  if (!character) return null

  return (
    <div className={styles.characterCard}>
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt={character.name} 
          className={styles.characterImage}
        />
      )}
      <div className={styles.characterInfo}>
        <h3>{character.name}</h3>
        <p><span>Visão:</span> {character.vision}</p>
        <p className={styles.characterDescription}>{truncateText(character.description, 80)}</p>
      </div>
    </div>
  )
}

CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    vision: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  imageSrc: PropTypes.string,
}

export default CharacterCard