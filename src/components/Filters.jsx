import React from 'react'
import Input from './UI/input/Input'
import styles from '../Styles/Filters.module.scss'
import GenresList from './GenresList'
import { useTranslation } from 'react-i18next'

export default function Filters({filters, genres, selectedGenre}) {

    const { search, setSearch, setPriceFrom, priceFrom, priceTo, setPriceTo} = filters
    const { t, i18n } = useTranslation()



    
  return (
    <div className={styles.blockFilters}>
        <div className={styles.blockFilters__body}>
        <Input
                value={search}
                onChange={ e => setSearch(e.target.value)}
                placeholder={t('search')}
            />
            <h2>Цена:</h2>
            <Input
                value={priceFrom}
                onChange={ e => setPriceFrom(e.target.value)}
                placeholder='От'
                type='number'
            />
            <Input
                value={priceTo}
                onChange={ e => setPriceTo(e.target.value)}
                placeholder='До'
                type='number'
            />
            <h2>Жанры:</h2>
            <GenresList
                genres={genres}
                selectedGenre={selectedGenre}
            />
        </div>
    </div>
  )
}
