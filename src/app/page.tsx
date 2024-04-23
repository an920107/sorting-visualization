"use client";

import Box from "@/components/box";
import { BubbleSort, HeapSort, InsertionSort, MergeSort, QuickSort, SortingMethod } from "@/core/sorting";
import { useEffect, useState } from "react";

function generateArray(size: number): Array<number> {
  const arr = Array(size);
  for (var i = 0; i < size; i++) {
    arr[i] = Math.floor(Math.random() * size);
    // arr[i] = size - i - 1;
  }
  return arr;
}

export default function Home() {
  const initialNumbers = generateArray(50);

  const [sortingMethods, setSortingMethods] = useState<Array<SortingMethod>>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    setSortingMethods([
      new BubbleSort(Array.from(initialNumbers)),
      new InsertionSort(Array.from(initialNumbers)),
      new MergeSort(Array.from(initialNumbers)),
      new QuickSort(Array.from(initialNumbers)),
      new HeapSort(Array.from(initialNumbers)),
    ]);
  }, []);

  useEffect(() => {
    if (!isStarted || isCompleted) return;
    const interval = setInterval(() => {
      setSortingMethods(
        sortingMethods => {
          var isAllCompleted = true;
          for (var i = 0; i < sortingMethods.length; i++) {
            if (!sortingMethods[i].isCompleted()) {
              isAllCompleted = false;
              break;
            }
          }
          if (isAllCompleted) {
            clearInterval(interval);
            setIsCompleted(true);
          }
          return sortingMethods.map((method) => {
            method.next();
            return method;
          });
        }
      );
    }, 10);
  }, [isStarted]);

  return (
    <div className="container mb-20">
      <div className="grid grid-cols-3 gap-x-8">
        {
          sortingMethods.map((value, index) => (
            <Box key={value.name} name={value.name} numbers={value.numbers} />
          ))
        }
      </div>
      <div className="h-8"></div>
      <div className="text-center">
        {isStarted ? (<></>) : (<button onClick={() => setIsStarted(true)}>Start Sorting</button>)}
        {isCompleted ? (<h2>Done!</h2>) : (isStarted ? (<h2>Sorting...</h2>) : (<></>))}
      </div>
    </div>
  );
}
