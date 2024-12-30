import { useState, useEffect } from 'react'
import styles from './Personagens.module.css'
import CharacterCard from "../character/CharacterCard"
import Container from "../layout/Container"
import Loading from "../layout/message/Loading"
import Input from '../ui/input/Input'
import ButtonTab from '../ui/button/ButtonTab'
import Section from '../layout/Section'
import Error from '../layout/message/Error'

function Personagens() {
    const [characters, setCharacters] = useState([])
    const [filteredCharacters, setFilteredCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeFilter, setActiveFilter] = useState('Todos')
    const [searchTerm, setSearchTerm] = useState('')

    const visions = ['Todos', 'Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo']

    useEffect(() => {
        async function fetchCharacters() {
            try {
                const response = await fetch('https://genshin.jmp.blue/characters/all')
                if (!response.ok) {
                    throw new Error('Falha ao buscar personagens')
                }
                const data = await response.json()

                // Filtrar personagens (retirar o Traveler)
                const filteredData = Object.values(data).filter(
                    (character) => !character.name.toLowerCase().includes('traveler')
                )

                const charactersWithImages = await Promise.all(
                    filteredData.map(async (character) => {
                        let imageSrc = null
                        try {
                            imageSrc = new URL(`../../assets/img/character-icons/ui-avataricon-${character.name.toLowerCase()}.png`, import.meta.url).href
                        } catch (err) {
                            console.error(`Erro ao carregar a imagem para ${character.name}:`, err)
                        }
                        return { ...character, imageSrc }
                    })
                )
                setCharacters(charactersWithImages)
                setFilteredCharacters(charactersWithImages)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCharacters()
    }, [])

    useEffect(() => {
        const filtered = characters.filter(char =>
            (activeFilter === 'Todos' || char.vision === activeFilter) &&
            char.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredCharacters(filtered)
    }, [activeFilter, characters, searchTerm])

    const handleFilterClick = (vision) => {
        setActiveFilter(vision)
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <Section>
            <h1 className={styles.title}>Personagens de Gensgin Impact</h1>
            {/*<Error message={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam incidunt magni libero assumenda, quidem perspiciatis quibusdam temporibus consectetur veniam iure vel dolorum eaque architecto! Labore, aperiam? Nam amet maiores iure."}/> */}
            <Container customClass='searchFilterContainer'>
                <div className={styles.searchBar}>
                    <Input
                        type="text"
                        placeholder="Buscar personagem"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className={styles.filterMenu}>
                    {visions.map((vision) => (
                        <ButtonTab
                            key={vision}
                            text={vision}
                            active={activeFilter === vision}
                            onClick={() => handleFilterClick(vision)}
                        />
                    ))}
                </div>
            </Container>
                    
            <Container customClass={loading ? "loadingGrid" : "containerGrid"}>
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Error message={error} />
                ) : (
                    filteredCharacters.map((character) => (
                        <CharacterCard
                            key={character.name}
                            character={character}
                            imageSrc={character.imageSrc}
                        />
                    ))
                )}
            </Container>
        </Section>
    )
}

export default Personagens