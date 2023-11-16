import React, { useState } from 'react'
import Input from './UI/input/Input'
import styles from '../Styles/AddGamePopup.module.scss'
import Button from '../components/UI/button/Button'



export default function AddGamePopup({isCreateGamePopup, setIsCreateGamePopup, createGame}) {


    const [game, setGame] = useState({ 
        id: '',
        name: "",
        mainImage: "",
        genresEn: [],
        price: '',
        genre1: "",
        genre2: "",
        genre3: "",
        genre4: "",
        genreEn1: "",
        genreEn2: "",
        genreEn3: "",
        genreEn4: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        releaseDate: '',
        RuReleaseDateCorrect : "",
        EnReleaseDateCorrect : "",
        DeReleaseDateCorrect : "",
        RuDescription1: "",
        EnDescription1: "",
        DeDescription1: "",
        RuDescription2: "",
        EnDescription2: "",
        DeDescription2: "",
        platforms: "",
        publisher: "",
        developer: "",
        minOperatingSystem: "",
        minProcessor: "",
        minGraphics: "",
        minMemory: "",
        minStorage: "",
        recOperatingSystem: "",
        recProcessor: "",
        recGraphics: "",
        recMemory: "",
        recStorage: ""
    })

    

    
    // ДОБАВИТЬ ИГРУ
    const addGame = () => {
        const newGame = {
            ...game,
            id: Date.now()
        }
        // id для того, чтобы браузер не ругался на одинаковый ключ во время рендера карточки игры
        game.genresEn.push(
            {value: game.genreEn1, id: Date.now()}, 
            {value: game.genreEn2, id: Date.now() + 1}, 
            {value: game.genreEn3, id: Date.now() + 2}, 
            {value: game.genreEn4, id: Date.now() + 3}
            )
        createGame(newGame)
        
        setGame({
            id: '',
            name: "",
            mainImage: "",
            genresEn: [],
            price: '',
            genre1: "",
            genre2: "",
            genre3: "",
            genre4: "",
            genreEn1: "",
            genreEn2: "",
            genreEn3: "",
            genreEn4: "",
            image1: "",
            image2: "",
            image3: "",
            image4: "",
            releaseDate: '',
            RuReleaseDateCorrect : "",
            EnReleaseDateCorrect : "",
            DeReleaseDateCorrect : "",
            RuDescription1: "",
            EnDescription1: "",
            DeDescription1: "",
            RuDescription2: "",
            EnDescription2: "",
            DeDescription2: "",
            platforms: "",
            publisher: "",
            developer: "",
            minOperatingSystem: "",
            minProcessor: "",
            minGraphics: "",
            minMemory: "",
            minStorage: "",
            recOperatingSystem: "",
            recProcessor: "",
            recGraphics: "",
            recMemory: "",
            recStorage: ""
        })
    }


    // ЗАКРЫТЬ ПОПАП
    const closePopup = () => {
        setIsCreateGamePopup(false)
        setGame({
            id: '',
            name: "",
            mainImage: "",
            genresEn: [""],
            price: '',
            genre1: "",
            genre2: "",
            genre3: "",
            genre4: "",
            genreEn1: "",
            genreEn2: "",
            genreEn3: "",
            genreEn4: "",
            image1: "",
            image2: "",
            image3: "",
            image4: "",
            releaseDate: '',
            RuReleaseDateCorrect : "",
            EnReleaseDateCorrect : "",
            DeReleaseDateCorrect : "",
            RuDescription1: "",
            EnDescription1: "",
            DeDescription1: "",
            RuDescription2: "",
            EnDescription2: "",
            DeDescription2: "",
            platforms: "",
            publisher: "",
            developer: "",
            minOperatingSystem: "",
            minProcessor: "",
            minGraphics: "",
            minMemory: "",
            minStorage: "",
            recOperatingSystem: "",
            recProcessor: "",
            recGraphics: "",
            recMemory: "",
            recStorage: ""
        })
    }


    const rootStyles = [styles.popup]
    if(isCreateGamePopup) {
      rootStyles.push(styles.active)
      document.querySelector('body').classList.add('block-scroll')
    }
  


  return (
    <div 
        className={rootStyles.join(' ')}
        onClick={closePopup}
    >
        <div 
            className={styles.popup__content}
            onClick={ (e) => e.stopPropagation()}
        >


            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Название</p>
                <Input
                    value={game.name}
                    onChange={ (e) => setGame({...game, name: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Название"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Обложка</p>
                <Input
                    value={game.mainImage}
                    onChange={ (e) => setGame({...game, mainImage: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}  
                    type='text' 
                    placeholder="Обложка"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Цена</p>
                <Input 
                    value={game.price}
                    onChange={ (e) => setGame({...game, price: e.target.value * 1})} 
                    style={{marginBottom: 0, width: '100%'}}  
                    type='number' 
                    placeholder="Цена"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 1 на английском</p>
                <Input
                    value={game.genreEn1}
                    onChange={ (e) => setGame({...game, genreEn1: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 1 на английском"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 2 на английском</p>
                <Input
                    value={game.genreEn2}
                    onChange={ (e) => setGame({...game, genreEn2: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 2 на английском"
                />
            </div>
            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 3 на английском</p>
                <Input
                    value={game.genreEn3}
                    onChange={ (e) => setGame({...game, genreEn3: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 3 на английском"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 4 на английском</p>
                <Input
                    value={game.genreEn4}
                    onChange={ (e) => setGame({...game, genreEn4: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 4 на английском"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 1</p>
                <Input
                    value={game.genre1}
                    onChange={ (e) => setGame({...game, genre1: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 1"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 2</p>
                <Input
                    value={game.genre2}
                    onChange={ (e) => setGame({...game, genre2: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 2"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 3</p>
                <Input
                    value={game.genre3}
                    onChange={ (e) => setGame({...game, genre3: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 3"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 4</p>
                <Input
                    value={game.genre4}
                    onChange={ (e) => setGame({...game, genre4: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 4"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Изображение 1</p>
                <Input
                    value={game.image1}
                    onChange={ (e) => setGame({...game, image1: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Изображение 1"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Изображение 2</p>
                <Input
                    value={game.image2}
                    onChange={ (e) => setGame({...game, image2: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}  
                    type='text' 
                    placeholder="Изображение 2"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Изображение 3</p>
                <Input
                    value={game.image3}
                    onChange={ (e) => setGame({...game, image3: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}  
                    type='text' 
                    placeholder="Изображение 3"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Изображение 4</p>
                <Input
                    value={game.image4}
                    onChange={ (e) => setGame({...game, image4: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Изображение 4"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Год выхода</p>
                <Input
                    value={game.releaseDate}
                    onChange={ (e) => setGame({...game, releaseDate: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}  
                    type='number' 
                    placeholder="Год выхода"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Полная дата выхода на русском</p>
                <Input
                    value={game.RuReleaseDateCorrect}
                    onChange={ (e) => setGame({...game, RuReleaseDateCorrect: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Полная дата выхода на русском"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Полная дата выхода на английском</p>
                <Input
                    value={game.EnReleaseDateCorrect}
                    onChange={ (e) => setGame({...game, EnReleaseDateCorrect: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}  
                    type='text' 
                    placeholder="Полная дата выхода на английском"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Полная дата выхода на немецком</p>
                <Input
                    value={game.DeReleaseDateCorrect}
                    onChange={ (e) => setGame({...game, DeReleaseDateCorrect: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Полная дата выхода на немецком"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Описание 1 на русском</p>
                <textarea className={styles.popup__infoTextarea} value={game.RuDescription1} onChange={ (e) => setGame({...game, RuDescription1: e.target.value})}  name="" id="" cols="30" rows="10"  placeholder="Описание 1 на русском"></textarea>
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Описание 2 на русском</p>
                <textarea className={styles.popup__infoTextarea} value={game.RuDescription2} onChange={ (e) => setGame({...game, RuDescription2: e.target.value})}  name="" id="" cols="30" rows="10"  placeholder="Описание 2 на русском"></textarea>
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Описание 1 на английском</p>
                <textarea className={styles.popup__infoTextarea} value={game.EnDescription1} onChange={ (e) => setGame({...game, EnDescription1: e.target.value})}  name="" id="" cols="30" rows="10"  placeholder="Описание 1 на английском"></textarea>
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Описание 2 на английском</p>
                <textarea className={styles.popup__infoTextarea} value={game.EnDescription2} onChange={ (e) => setGame({...game, EnDescription2: e.target.value})}  name="" id="" cols="30" rows="10"  placeholder="Описание 2 на английском"></textarea>
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Описание 1 на немецком</p>
                <textarea className={styles.popup__infoTextarea} value={game.DeDescription1} onChange={ (e) => setGame({...game, DeDescription1: e.target.value})}  name="" id="" cols="30" rows="10"  placeholder="Описание 1 на немецком"></textarea>
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Описание 2 на немецком</p>
                <textarea className={styles.popup__infoTextarea} value={game.DeDescription2} onChange={ (e) => setGame({...game, DeDescription2: e.target.value})}  name="" id="" cols="30" rows="10"  placeholder="Описание 2 на немецком"></textarea>
            </div>

            
            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Платформы ( писать через знак / )</p>
                <Input
                    value={game.platforms}
                    onChange={ (e) => setGame({...game, platforms: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Платформы ( писать через знак / )"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Издатель</p>
                <Input
                    value={game.publisher}
                    onChange={ (e) => setGame({...game, publisher: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}  
                    type='text' 
                    placeholder="Издатель"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Разработчик</p>
                <Input
                    value={game.developer}
                    onChange={ (e) => setGame({...game, developer: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Разработчик"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Минимальная операционная система</p>
                <Input
                    value={game.minOperatingSystem}
                    onChange={ (e) => setGame({...game, minOperatingSystem: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Минимальная операционная система"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Минимальный процессор</p>
                <Input
                    value={game.minProcessor}
                    onChange={ (e) => setGame({...game, minProcessor: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}  
                    type='text' 
                    placeholder="Минимальный процессор"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Минимальная видеокарта</p>
                <Input
                    value={game.minGraphics}
                    onChange={ (e) => setGame({...game, minGraphics: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Минимальная видеокарта"
                />    
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Минимальный объем оперативной памяти</p>
                <Input
                    value={game.minMemory}
                    onChange={ (e) => setGame({...game, minMemory: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Минимальный объем оперативной памяти"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Минимальное свободное место на диске</p>
                <Input
                    value={game.minStorage}
                    onChange={ (e) => setGame({...game, minStorage: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Минимальное свободное место на диске"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Рекомендуемая операционная система</p>
                <Input
                    value={game.recOperatingSystem}
                    onChange={ (e) => setGame({...game, recOperatingSystem: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Рекомендуемая операционная система"
                />
            </div>
            
            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Рекомендуемый процессор</p>
                <Input
                    value={game.recProcessor}
                    onChange={ (e) => setGame({...game, recProcessor: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Рекомендуемый процессор"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Рекомендуемая видеокарта</p>
                <Input
                    value={game.recGraphics}
                    onChange={ (e) => setGame({...game, recGraphics: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Рекомендуемая видеокарта"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Рекомендуемый объем оперативной памяти</p>
                <Input
                    value={game.recMemory}
                    onChange={ (e) => setGame({...game, recMemory: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}  
                    type='text' 
                    placeholder="Рекомендуемый объем оперативной памяти"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Рекомендуемое свободное место на диске</p>
            <Input
                value={game.recStorage}
                onChange={ (e) => setGame({...game, recStorage: e.target.value})} 
                style={{marginBottom: 0, width: '100%'}}  
                type='text' 
                placeholder="Рекомендуемое свободное место на диске"
            />
            </div>

            <div className={styles.popup__infoBtns}>
                <Button onClick={addGame}>Сохранить</Button>
                <Button onClick={closePopup} delete>Отмена</Button>
            </div>




        </div>
    </div>
  )
}
