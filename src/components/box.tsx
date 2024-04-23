"use client";

import React, { useEffect } from 'react'
import Spinner from '@/components/spinner';

type Props = {
  name: string,
  numbers: Array<number>,
  isLoading: boolean,
  isDone: boolean,
}

export default function Box(props: Props) {
  return (
    <div className="my-6">
      <div className="flex flex-row justify-between items-center pl-1">
        <h2 className="mb-2">{props.name}</h2>
        <Spinner status={props.isDone ? 2 : (props.isLoading ? 1 : 0)} />
      </div>
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