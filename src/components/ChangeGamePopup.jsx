import React, { useEffect, useState } from 'react'
import styles from '../Styles/ChangeGamePopup.module.scss'
import Input from './UI/input/Input'
import Button from '../components/UI/button/Button'
import { useFetching } from '../hooks/useFetching'
import Service from '../API/Service'





export default function ChangeGamePopup({isChangeGamePopup, gameToChange, confirmChangeGame, setGameToChange, setIsChangeGamePopup}) {


    const [changedGame, setChangedGame] = useState({})                           


    // ЗАГРУЗКА ИНФОРМАЦИИ ОБ ИГРЕ
    const [fetchGame, gameError] = useFetching( async (id) => {
        const game = await Service.getGameById(gameToChange.id)
        setChangedGame(game)
      })
    if(gameError) {
        console.log('Ошибка загрузки игры:', gameError);
    }



    // ИЗМЕНЕНИЕ ИГРЫ
    const changeGame = () => {
        const   NewchangedGame = {
            ...changedGame
        }
        NewchangedGame.genresEn = []
        NewchangedGame.genresEn.push(
            {value: changedGame.genreEn1, id: Date.now()}, 
            {value: changedGame.genreEn2, id: Date.now() + 1}, 
            {value: changedGame.genreEn3, id: Date.now() + 2}, 
            {value: changedGame.genreEn4, id: Date.now() + 3}
        )
        confirmChangeGame(NewchangedGame)
    }


    
    useEffect( () => {
        if(isChangeGamePopup) {
            fetchGame()
        }
    }, [isChangeGamePopup])
    
    



    const rootStyles = [styles.popup]
    if(isChangeGamePopup) {
      rootStyles.push(styles.active)
      document.querySelector('body').classList.add('block-scroll')
    }
    



  return (
    <div  
        className={rootStyles.join(' ')}
        onClick={ () => {
            setIsChangeGamePopup(false)
            setGameToChange({})
        }}
    >
        <div 
            className={styles.popup__content}
            onClick={ (e) => e.stopPropagation()}>


            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Название</p>
                <Input
                    value={changedGame.name}
                    onChange={ (e) => setChangedGame({...changedGame, name: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Название"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Обложка</p>
                <Input
                    value={changedGame.mainImage}
                    onChange={ (e) => setChangedGame({...changedGame, mainImage: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Обложка"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Цена</p>
                <Input 
                    value={changedGame.price}
                    onChange={ (e) => setChangedGame({...changedGame, price: e.target.value * 1})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='number' 
                    placeholder="Цена"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 1 на английском</p>
                <Input
                    value={changedGame.genreEn1}
                    onChange={ (e) => setChangedGame({...changedGame, genreEn1: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 1 на английском"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 2 на английском</p>
                <Input
                    value={changedGame.genreEn2}
                    onChange={ (e) => setChangedGame({...changedGame, genreEn2: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 2 на английском"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 3 на английском</p>
                <Input
                    value={changedGame.genreEn3}
                    onChange={ (e) => setChangedGame({...changedGame, genreEn3: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 3 на английском"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 4 на английском</p>
                <Input
                    value={changedGame.genreEn4}
                    onChange={ (e) => setChangedGame({...changedGame, genreEn4: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 4 на английском"
                />
            </div>
            
            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 1</p>
                <Input
                    value={changedGame.genre1}
                    onChange={ (e) => setChangedGame({...changedGame, genre1: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Жанр 1"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 2</p>
                <Input
                    value={changedGame.genre2}
                    onChange={ (e) => setChangedGame({...changedGame, genre2: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 2"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 3</p>
                <Input
                    value={changedGame.genre3}
                    onChange={ (e) => setChangedGame({...changedGame, genre3: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 3"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Жанр 4</p>
                <Input
                    value={changedGame.genre4}
                    onChange={ (e) => setChangedGame({...changedGame, genre4: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Жанр 4"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Изображение 1</p>
                <Input
                    value={changedGame.image1}
                    onChange={ (e) => setChangedGame({...changedGame, image1: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Изображение 1"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Изображение 2</p>
                <Input
                    value={changedGame.image2}
                    onChange={ (e) => setChangedGame({...changedGame, image2: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Изображение 2"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Изображение 3</p>
                <Input
                    value={changedGame.image3}
                    onChange={ (e) => setChangedGame({...changedGame, image3: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Изображение 3"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Изображение 4</p>
                <Input
                    value={changedGame.image4}
                    onChange={ (e) => setChangedGame({...changedGame, image4: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Изображение 4"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Год выхода</p>
                <Input
                    value={changedGame.releaseDate}
                    onChange={ (e) => setChangedGame({...changedGame, releaseDate: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='number' 
                    placeholder="Год выхода"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Полная дата выхода на русском</p>
                <Input
                    value={changedGame.RuReleaseDateCorrect}
                    onChange={ (e) => setChangedGame({...changedGame, RuReleaseDateCorrect: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Полная дата выхода на русском"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Полная дата выхода на английском</p>
                <Input
                    value={changedGame.EnReleaseDateCorrect}
                    onChange={ (e) => setChangedGame({...changedGame, EnReleaseDateCorrect: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Полная дата выхода на английском"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Полная дата выхода на немецком</p>
                <Input
                    value={changedGame.DeReleaseDateCorrect}
                    onChange={ (e) => setChangedGame({...changedGame, DeReleaseDateCorrect: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Полная дата выхода на немецком"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Описание 1 на русском</p>
                <textarea className={styles.popup__infoTextarea} value={changedGame.RuDescription1} onChange={ (e) => setChangedGame({...changedGame, RuDescription1: e.target.value})}  name="" id="" cols="30" rows="10"  placeholder="Описание 1 на русском"></textarea>
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Описание 2 на русском</p>
                <textarea className={styles.popup__infoTextarea} value={changedGame.RuDescription2} onChange={ (e) => setChangedGame({...changedGame, RuDescription2: e.target.value})}  name="" id="" cols="30" rows="10"  placeholder="Описание 2 на русском"></textarea>
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Описание 1 на английском</p>
                <textarea className={styles.popup__infoTextarea} value={changedGame.EnDescription1} onChange={ (e) => setChangedGame({...changedGame, EnDescription1: e.target.value})}  name="" id="" cols="30" rows="10"  placeholder="Описание 1 на английском"></textarea>
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Описание 2 на английском</p>
                <textarea className={styles.popup__infoTextarea} value={changedGame.EnDescription2} onChange={ (e) => setChangedGame({...changedGame, EnDescription2: e.target.value})}  name="" id="" cols="30" rows="10"  placeholder="Описание 2 на английском"></textarea>
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Описание 1 на немецком</p>
                <textarea className={styles.popup__infoTextarea} value={changedGame.DeDescription1} onChange={ (e) => setChangedGame({...changedGame, DeDescription1: e.target.value})}  name="" id="" cols="30" rows="10"  placeholder="Описание 1 на немецком"></textarea>
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Описание 2 на немецком</p>
                <textarea className={styles.popup__infoTextarea} value={changedGame.DeDescription2} onChange={ (e) => setChangedGame({...changedGame, DeDescription2: e.target.value})}  name="" id="" cols="30" rows="10"  placeholder="Описание 2 на немецком"></textarea>
            </div>
            
            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Платформы ( писать через знак / )</p>
                <Input
                    value={changedGame.platforms}
                    onChange={ (e) => setChangedGame({...changedGame, platforms: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Платформы ( писать через знак / )"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Издатель</p>
                <Input
                    value={changedGame.publisher}
                    onChange={ (e) => setChangedGame({...changedGame, publisher: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Издатель"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Разработчик</p>
                <Input
                    value={changedGame.developer}
                    onChange={ (e) => setChangedGame({...changedGame, developer: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Разработчик"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Минимальная операционная система</p>
                <Input
                    value={changedGame.minOperatingSystem}
                    onChange={ (e) => setChangedGame({...changedGame, minOperatingSystem: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Минимальная операционная система"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Минимальный процессор</p>
                <Input
                    value={changedGame.minProcessor}
                    onChange={ (e) => setChangedGame({...changedGame, minProcessor: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Минимальный процессор"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Минимальная видеокарта</p>
                <Input
                    value={changedGame.minGraphics}
                    onChange={ (e) => setChangedGame({...changedGame, minGraphics: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Минимальная видеокарта"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Минимальный объем оперативной памяти</p>
                <Input
                    value={changedGame.minMemory}
                    onChange={ (e) => setChangedGame({...changedGame, minMemory: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}} 
                    type='text' 
                    placeholder="Минимальный объем оперативной памяти"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Минимальное свободное место на диске</p>
                <Input
                    value={changedGame.minStorage}
                    onChange={ (e) => setChangedGame({...changedGame, minStorage: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Минимальное свободное место на диске"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Рекомендуемая операционная система</p>
                <Input
                    value={changedGame.recOperatingSystem}
                    onChange={ (e) => setChangedGame({...changedGame, recOperatingSystem: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Рекомендуемая операционная система"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Рекомендуемый процессор</p>
                <Input
                    value={changedGame.recProcessor}
                    onChange={ (e) => setChangedGame({...changedGame, recProcessor: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Рекомендуемый процессор"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Рекомендуемая видеокарта</p>
                <Input
                    value={changedGame.recGraphics}
                    onChange={ (e) => setChangedGame({...changedGame, recGraphics: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Рекомендуемая видеокарта"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Рекомендуемый объем оперативной памяти</p>
                <Input
                    value={changedGame.recMemory}
                    onChange={ (e) => setChangedGame({...changedGame, recMemory: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Рекомендуемый объем оперативной памяти"
                />
            </div>

            <div className={styles.popup__info}>
                <p className={styles.popup__infoTitle}>Рекомендуемое свободное место на диске</p>
                <Input
                    value={changedGame.recStorage}
                    onChange={ (e) => setChangedGame({...changedGame, recStorage: e.target.value})} 
                    style={{marginBottom: 0, width: '100%'}}
                    type='text' 
                    placeholder="Рекомендуемое свободное место на диске"
                />
            </div>

            <div className={styles.popup__infoBtns}>
                <Button onClick={ () => changeGame()}>Изменить</Button>
                <Button 
                    onClick={ () => {
                        setIsChangeGamePopup(false)
                        setGameToChange({})
                    }}
                    delete
                >Отмена</Button>
            </div>
        </div>
    </div>
  )
}
