"use client";

import React, { useEffect } from 'react'

type Props = {
  name: string
  numbers: Array<number>,
}

export default function Box(props: Props) {
  return (
    <div className="my-6">
      <h2 className="mb-2">{props.name}</h2>
      <div className="box">
        {
          props.numbers.map((number, index) => (
            <div key={index} className="strip" style={{ height: `${(number + 1) * 0.35}rem` }}></div>
          ))
        }
      </div>
    </div>
  )
}