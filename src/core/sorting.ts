import { start } from "repl";

export interface SortingMethod {
    name: string,
    numbers: Array<number>,
    isCompleted: () => boolean,
    next: () => void,
}

function swap(arr: Array<number>, indexA: number, indexB: number) {
    [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
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
            swap(this.numbers, this.currentIndex, this.currentIndex + 1);
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

    sortedLength = 1;
    currentIndex = 1;

    isCompleted() {
        return this.sortedLength === this.numbers.length;
    }

    next() {
        if (this.isCompleted()) return;

        if (this.numbers[this.currentIndex] < this.numbers[this.currentIndex - 1]) {
            swap(this.numbers, this.currentIndex, this.currentIndex - 1);
            this.currentIndex--;
        } else {
            this.sortedLength++;
            this.currentIndex = this.sortedLength;
        }

        if (this.currentIndex === 0) {
            this.sortedLength++;
            this.currentIndex = this.sortedLength;
        }
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

    stack: Array<number> = [];
    begin = 0;
    end = 0;
    left = 0;
    right = 0;
    pivot = 0;

    state = 0;

    isCompleted() {
        return this.stack.length === 0 && this.state === 0;
    }

    next() {
        if (this.isCompleted()) return;

        switch (this.state) {
            case 0:
                this.end = this.stack.pop()!;
                this.begin = this.stack.pop()!;
                if (this.begin < this.end) {
                    this.pivot = this.numbers[this.begin];
                    this.left = this.begin + 1;
                    this.right = this.end;
                    this.state = 1;
                } else {
                    break;
                }
            case 1:
                if (this.right > this.begin && this.numbers[this.right] >= this.pivot) {
                    this.right--;
                    break;
                } else {
                    this.state = 2;
                }
            case 2:
                if (this.left <= this.right && this.numbers[this.left] <= this.pivot) {
                    this.left++;
                    break;
                } else {
                    this.state = 3;
                }
            case 3:
                if (this.left < this.right) {
                    swap(this.numbers, this.left, this.right);
                    this.state = 1;
                } else {
                    if (this.begin < this.right) {
                        swap(this.numbers, this.begin, this.right);
                        this.stack.push(this.begin);
                        this.stack.push(this.right - 1);
                    }
                    if (this.right < this.end) {
                        this.stack.push(this.right + 1);
                        this.stack.push(this.end);
                    }
                    this.state = 0;
                }
                break;
            default:
                break;
        }
    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers;
        this.stack.push(0);
        this.stack.push(numbers.length - 1);
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
