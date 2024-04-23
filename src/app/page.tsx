"use client";

import Box from "@/components/box";
import { BubbleSort, HeapSort, InsertionSort, MergeSort, QuickSort, SortingMethod } from "@/core/sorting";
import { useState } from "react";

function generateArray(size: number): Array<number> {
  const arr = Array.from({ length: 50 }, (v, k) => k);
  shuffleArray(arr);
  return arr;
}

function shuffleArray(array: Array<number>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function Home() {
  const initialNumbers = generateArray(50);

  const [sortingMethods, setSortingMethods] = useState<Array<SortingMethod>>(
    [
      new BubbleSort(Array.from(initialNumbers)),
      new InsertionSort(Array.from(initialNumbers)),
      new MergeSort(Array.from(initialNumbers)),
      new QuickSort(Array.from(initialNumbers)),
      new HeapSort(Array.from(initialNumbers)),
    ]
  );

  return (
    <div className="container mb-20">
      <div className="grid grid-cols-3 gap-x-8">
        {
          sortingMethods.map((value, index) => (
            <Box name={value.name} numbers={value.numbers} />
          ))
        }
      </div>
      <div className="h-8"></div>
      <button>Start Sorting</button>
    </div>
  );
}
