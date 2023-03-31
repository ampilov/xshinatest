import AddressCard from '@/components/contacts/AddressCard'
import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import YandexMap from '@/components/contacts/YandexMap';

interface IAddress {
    address: string;
    budgets: string[];
    latitude: number
    longitude: number
}

// Сделаем как будто с сервера получаем массив с данными 
export async function getServerSideProps(context: any) {

    const pickPoints = [
        {
            "address": "ул. Авиационная, 14",
            "budgets": [
                "Самовывоз",
                "Доставка",
                "Примерочная"
            ],
            "latitude": 56.80245,
            "longitude": 60.604913
        },
        {
            "address": "ул. Белореченская, 54",
            "budgets": [
                "Самовывоз"
            ],
            "latitude": 54.708415,
            "longitude": 55.975993
        },
        {
            "address": "ул. Первомайская, 8",
            "budgets": [
                "Доставка",
                "Примерочная",
                "Шоурум"
            ],
            "latitude": 53.364343,
            "longitude": 55.925364
        },
        {
            "address": "пер. Встречный, 9",
            "budgets": [
                "Примерочная",
                "Шоурум"
            ],
            "latitude": 56.821932,
            "longitude": 60.563563
        }
    ]

    return {
        props: { pickPoints }
    }

}

function Contacts({ pickPoints }: {pickPoints: IAddress[]}) {

    // Стейт для текущей активной карточки, что
    const [activeCard, setActiveCard] = useState({ latitude: 0, longitude: 0, address: '0' })

    // Создаем состояние для хранения текущих координат карты
    const [mapCenter, setMapCenter] = useState([activeCard.latitude, activeCard.longitude])

    // Создаем функцию для плавного перемещения карты между двумя точками, передаем в нее координаты точки к которой хотим прийти
    const moveMap = (pointA: number[], pointB: number[], currentCard: any) => {

        setActiveCard({ latitude: currentCard.latitude, longitude: currentCard.longitude, address: currentCard.address })

        //Если координатиы точки к которой мы хотим прийти совпадают с координатами точки в которой мы сейчас находимся, то отменяем движение, 
        // при этом округялем координаты до 4 цифр после запятой
        if (pointA[0].toFixed(4) == pointB[0].toFixed(4) && pointA[1].toFixed(4) == pointB[1].toFixed(4)) {
            return
        }

        // Определяем скорость перемещения
        const speed = 500;

        // Определяем интервал обновления координат
        const interval = 10;

        // Определяем шаг изменения координат по каждой оси
        const stepX = (pointB[0] - pointA[0]) / (speed / interval);
        const stepY = (pointB[1] - pointA[1]) / (speed / interval);

        // Создаем переменные для хранения текущих координат
        let currentX = pointA[0];
        let currentY = pointA[1];

        // Создаем таймер для обновления координат
        let timer = setInterval(() => {

            // Прибавляем шаг к текущим координатам
            currentX += stepX;
            currentY += stepY;

            // Обновляем состояние карты с новыми координатами
            setMapCenter([currentX, currentY]);

            // Проверяем, достигли ли мы конечной точки
            if (
                (stepX > 0 && currentX >= pointB[0]) ||
                (stepX < 0 && currentX <= pointB[0]) ||
                (stepY > 0 && currentY >= pointB[1]) ||
                (stepY < 0 && currentY <= pointB[1])
            ) {

                // Останавливаем таймер
                clearInterval(timer);
            }
        }, interval);



    }

    // В юзефекте проверяем если у нас стейт активной карточки пустой то сетаем туда первое значение из массива который приходит с сервера, в данном случае с pickPoints
    useEffect(() => {
        if (activeCard.latitude == 0 && activeCard.longitude == 0) {
            setActiveCard({ latitude: pickPoints[0].latitude, longitude: pickPoints[0].longitude, address: pickPoints[0].address })
            setMapCenter([pickPoints[0].latitude, pickPoints[0].longitude])
        }
    }, [activeCard])



    return (
        <div className=' bg-[#2a2c2d] p-3 h-screen'>

            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Котакты компании шоурумы и пункты выдачи</title>
                <meta name="description" content="Адреса магазинов и пунктов выдачи компании, реквизиты и контакты для связи." />
                <meta name="keywords" content='контакты филиалы пункты выдачи как проехать расположение на карте организация магазины' />
            </Head>

            <main className='w-full flex justify-center'>

                <div className='sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] grid grid-cols-1 sm:grid-cols-2 gap-3 self-center'>

                    <div className='flex flex-col gap-3'>
                        {pickPoints.map((item: any, i: number) => {
                            return <AddressCard key={i}
                                address={item.address}
                                budgets={item.budgets}
                                latitude={item.latitude}
                                longitude={item.longitude}
                                activeCard={activeCard}
                                moveMap={moveMap}
                                mapCenter={mapCenter}
                            />
                        })}
                    </div>

                    <div>
                        <YandexMap
                            pickPoints={pickPoints}
                            moveMap={moveMap}
                            mapCenter={mapCenter}
                        />
                    </div>

                </div>

            </main>

        </div>

    )
}

export default Contacts