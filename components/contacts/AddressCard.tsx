import React, { Dispatch, SetStateAction } from 'react'

interface IСoordinates {
    latitude: number;
    longitude: number;
    address: string;
}

interface IAddressData {
    address: string,
    budgets: string[],
    latitude: number,
    longitude: number,
    activeCard: any,
    moveMap: any
    mapCenter: any
}

// address также используется как костыль вместо уникального id, чтобы обработать стиль активной карточки  
function AddressCard({ address, budgets, latitude, longitude, activeCard, moveMap, mapCenter }: IAddressData) {

    // Функция которая обрабатывает клик по карточке слева
    const ClickHandler = ({ latitude, longitude }: IСoordinates) => {

        // Вызываем функцию плавного перемещения карты, которую передали в пропсах
        // Передаем ей центр карты в качестве точки начала движения, 2 аргумент это то куда хотим прийти
        // Третий аргумент установит данные активной карточки в стейт
        moveMap(mapCenter, [latitude, longitude], {latitude, longitude, address})
    }

    return (
        <div onClick={() => ClickHandler({ latitude, longitude, address })} className={`flex flex-col gap-3 px-3 py-2 bg-[#3a3d3e] text-white hover:bg-[#404749] hover:cursor-pointer border border-[#252a2c] ${address == activeCard.address ? 'bg-[#404749]' : ''}`}>
            <p>{address}</p>
            <div className='flex flex-row gap-3 text-xs'>
                {
                    budgets.map((name: string, i: number) => {
                        return (
                            <div key={i} className='bg-[#282c2d] px-2 py-1 rounded'>{name}</div>)
                    })
                }
            </div>

        </div>
    )
}

export default AddressCard