import { useState, useEffect } from 'react'
import styles from './Home.module.css'
import CharacterCard from '../character/CharacterCard'
import Container from '../layout/Container'
import ButtonTab from '../ui/button/ButtonTab'
import Loading from '../layout/message/Loading'
import Error from '../layout/message/Error'

function Home() {
    const [characters, setCharacters] = useState([])
    const [filteredCharacters, setFilteredCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeFilter, setActiveFilter] = useState('Todos')

    const visions = ['Todos', 'Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo']

    useEffect(() => {
        async function fetchCharacters() {
            try {
                const response = await fetch('https://genshin.jmp.blue/characters/all')
                if (!response.ok) {
                    throw new Error('Falha ao buscar personagens')
                }
                const data = await response.json()
                const charactersWithImages = await Promise.all(
                    Object.values(data).map(async (character) => {
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
                setFilteredCharacters(charactersWithImages.slice(0, 8))
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCharacters()
    }, [])

    useEffect(() => {
        if (activeFilter === 'Todos') {
            setFilteredCharacters(characters.slice(0, 8))
        } else {
            const filtered = characters.filter(char => char.vision === activeFilter).slice(0, 8)
            setFilteredCharacters(filtered)
        }
    }, [activeFilter, characters])

    const handleFilterClick = (vision) => {
        setActiveFilter(vision)
    }

    return (
        <>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Bem-vindo a Teyvat</h1>
                    <p>Explore o mundo mágico de Genshin Impact</p>
                </div>
            </section>
            <section className={styles.sectionAbout}>
                <div className={styles.sectionAboutContainer}>
                    <h2>Sobre Genshin Impact</h2>
                    <p>Genshin Impact é um jogo de RPG de ação de mundo aberto. Embarque em uma jornada por Teyvat para encontrar sua família perdida e desvendar os mistérios deste mundo. Ao longo do caminho, você poderá controlar personagens únicos, cada um com habilidades e histórias próprias.</p>
                </div>
            </section>
            <Container customClass="containerTabs">
                {visions.map((vision) => (
                    <ButtonTab 
                        key={vision} 
                        text={vision} 
                        active={activeFilter === vision}
                        onClick={() => handleFilterClick(vision)}
                    />
                ))}
            </Container>
            <Container customClass="characters">
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
        </>
    )
}

export default Home

