import React from 'react'

const TopButtons = ({setQuery}) => {
    const cities = [
        {
            id:1,
            title:'London',
        },
        {
            id:2,
            title:'Sydney',
        },
        {
            id:3,
            title:'Tokyo',
        },
        {
            id:4,
            title:'Delhi',
        },
        {
            id:5,
            title:'New York',
        },
        {
            id:6,
            title:'Paris',
        },
        {
            id:7,
            title:'Dubai',
        },
        {
            id:8,
            title:'Beijing',
        },
    ]
  return (
    <div className='flex items-center justify-around my-6'>
      {cities.map((city)=>(
        <button key={city.id} onClick={()=>setQuery({q: city.title})} className='text-white text-lg font-medium'>{city.title}</button>
      ))}
    </div>
  )
}

export default TopButtons
