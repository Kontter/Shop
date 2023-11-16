import axios from "axios"
import { useEffect, useMemo, useState } from "react"



export function useSelectedGenre (games, isGenre, genre, search, setSearch, priceFrom, priceTo, setPriceFrom, setPriceTo, allGamess, setAllGamess) {

  
    
    const [isSelectedGenre, setIsSelectedGenre] = useState(false)

    // СОРТИРОВКА ПО ЖАНРУ
    const selectedGenre = useMemo( () => {
        if(isGenre) {

            if (genre === 'all') {
                setPriceTo('9999999')
                setIsSelectedGenre(false)
                return games                
                } 
                setIsSelectedGenre(true)
                setPriceTo('9999999')
                let newGameArray = []
                games.forEach( game => game.genresEn.forEach( gameGenre => {
                    if(gameGenre.value.toLowerCase().includes(genre.toLowerCase())) {
                        newGameArray.push(game)
                    }
                }))

                return  newGameArray
        } 
            return games 
    }, [games, isGenre, genre,])    
   
    return [isSelectedGenre, selectedGenre]
}







    // ФИЛЬТР ПО ЦЕНЕ
    const usePrice = (games, isGenre, genre, search, setSearch, priceFrom, priceTo, setPriceFrom, setPriceTo, allGamess, setAllGamess) => {

        const [isSelectedGenre, selectedGenre] = useSelectedGenre(games, isGenre, genre, search, setSearch, priceFrom, priceTo, setPriceFrom, setPriceTo, allGamess, setAllGamess)

        
        const selectedPrice = useMemo( () => {
            if(isSelectedGenre) {
                return selectedGenre.filter( game => game.price >= priceFrom && game.price <= priceTo)
            }
                return [...games].filter( game => game.price >= priceFrom && game.price <= priceTo)
        }, [isSelectedGenre, selectedGenre, priceFrom, priceTo])

        return selectedPrice
    }







// ПОИСК
export const useGames = (games, isGenre, genre, search, setSearch, priceFrom, priceTo, setPriceFrom, setPriceTo) => {

    const [allGamess, setAllGamess] = useState([])



    const fetchGames = async () => {
        const response = await axios.get(`http://localhost:3001/games`)
        setAllGamess(response.data)
    }

    useEffect( () => {
        fetchGames()
    }, [])



    const sortAndPriceGames = usePrice(games, isGenre, genre, search, setSearch, priceFrom, priceTo, setPriceFrom, setPriceTo, allGamess, setAllGamess)



    const sortedAndSearchedAndPriceGames = useMemo( () => {
        return sortAndPriceGames.filter(   game => game.name.toLowerCase().includes(search.toLowerCase()))
    }, [sortAndPriceGames, search])


    
    return sortedAndSearchedAndPriceGames
}
