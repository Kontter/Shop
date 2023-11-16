import React, { useState } from 'react'
import styles from '../Styles/GenresList.module.scss'




export default function GenresList({genres, selectedGenre}) {

  const [activeGenre, setActiveGenre] = useState(0)

  return (
    <div>
        {genres.map( (genre, id) =>
            <div 
                className={activeGenre === id ? styles.genresList__itemActive : styles.genresList__item}
                onClick={() => {
                  setActiveGenre(id)
                  selectedGenre(genre.value)
                  }}
                key={genre.value}
            >{genre.body}
            </div>
            )
        }
    </div>
  )
}
