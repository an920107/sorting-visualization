export interface SortingMethod {
    name: string,
    numbers: Array<number>,
    isCompleted: () => boolean,
    next: () => void,
}

export class BubbleSort implements SortingMethod {
    name = "Bubble Sort";
    numbers: number[];

    lastIndex: number;
    currentIndex = 0;

    isCompleted() {
        return this.lastIndex <= 0;
    }

    next() {
        if (this.isCompleted()) return;

        if (this.numbers[this.currentIndex] > this.numbers[this.currentIndex + 1]) {
            [this.numbers[this.currentIndex], this.numbers[this.currentIndex + 1]]
                = [this.numbers[this.currentIndex + 1], this.numbers[this.currentIndex]];
        }
        this.currentIndex++;
        if (this.currentIndex === this.lastIndex) {
            this.currentIndex = 0;
            this.lastIndex--;
        }
    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers;
        this.lastIndex = numbers.length - 1;
    }
}

export class InsertionSort implements SortingMethod {
    name = "Insertion Sort";
    numbers: number[];

    isCompleted() {
        return true;
    }

    next() {

    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers;
    }
}

export class MergeSort implements SortingMethod {
    name = "Merge Sort";
    numbers: number[];

    isCompleted() {
        return true;
    }

    next() {

    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers;
    }
}

export class QuickSort implements SortingMethod {
    name = "Quick Sort";
    numbers: number[];

    isCompleted() {
        return true;
    }

    next() {

    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers;
    }
}

export class HeapSort implements SortingMethod {
    name = "Heap Sort";
    numbers: number[];

    isCompleted() {
        return true;
    }

    next() {

    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers;
    }
}
