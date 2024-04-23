export interface SortingMethod {
    name: string,
    numbers: Array<number>,
    isSorted: boolean,
    next: () => void,
}

export class BubbleSort implements SortingMethod {
    name = "Bubble Sort";
    numbers: number[];
    isSorted = false;

    next() {
        
    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers
    }
}

export class InsertionSort implements SortingMethod {
    name = "Insertion Sort";
    numbers: number[];
    isSorted = false;

    next() {

    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers
    }
}

export class MergeSort implements SortingMethod {
    name = "Merge Sort";
    numbers: number[];
    isSorted = false;

    next() {

    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers
    }
}

export class QuickSort implements SortingMethod {
    name = "Quick Sort";
    numbers: number[];
    isSorted = false;

    next() {

    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers
    }
}

export class HeapSort implements SortingMethod {
    name = "Heap Sort";
    numbers: number[];
    isSorted = false;

    next() {

    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers
    }
}
