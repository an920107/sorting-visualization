"use client";

import React, { useEffect } from 'react'
import Spinner from '@/components/spinner';

type Props = {
  name: string,
  numbers: Array<number>,
  steps: number,
  isLoading: boolean,
  isDone: boolean,
}

export default function Box(props: Props) {
  return (
    <div className="my-6">
      <div className="flex flex-row justify-between items-center pl-1 mb-2">
        <h2>{props.name}</h2>
        <div className="flex flex-row gap-x-4 items-center h-auto">
          <h2>{props.steps} steps</h2>
          <Spinner status={props.isDone ? 2 : (props.isLoading ? 1 : 0)} />
        </div>
      </div>
      <div className="box">
        {
          props.numbers.map((number, index) => (
            <div key={index} className="strip" style={{ height: `${(number + 1) / props.numbers.length * 16}rem` }}></div>
          ))
        }
      </div>
    </div>
  )
}