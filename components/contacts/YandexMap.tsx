import React, { useEffect, useRef, useState } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';


function YandexMap({ pickPoints, moveMap, mapCenter }: { pickPoints: any, moveMap: any, mapCenter: any }) {

  // Возвращаем компонент карты с двумя метками и кнопкой для перемещения
  return (
    <YMaps>
      <Map width={-1} height={500} state={{ center: mapCenter, zoom: 12 }}>
        {pickPoints.map((point: any, i: number) => {
          return <Placemark key={i}
            width={34} height={52}
            onClick={() => { moveMap(mapCenter, [point.latitude, point.longitude], point) }}
            geometry={[point.latitude, point.longitude]}
            options={{
              iconLayout: 'default#image',
              iconImageHref: 'https://storage.yandexcloud.net/testxshina/pointer.png',
              // iconImageSize: [34, 52], // странное моргание при указание размера изображения
            }}
          />
        })}

      </Map>
    </YMaps>
  );
}

export default YandexMap