import React from 'react'

type Props = {
  name: string
  numbers: Array<number>,
}

export default function Box(props: Props) {
  const numbers = props.numbers;

  return (
    <div className="my-6">
      <h2 className="mb-2">{props.name}</h2>
      <div className="box">
        {
          numbers.map((number, index) => (
            <div key={index} className="strip" style={{ height: `${(number + 1) * 5}px` }}></div>
          ))
        }
      </div>
    </div>
  )
}