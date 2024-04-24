export interface SortingMethod {
    name: string,
    numbers: Array<number>,
    steps: number,
    isCompleted: () => boolean,
    next: () => void,
}

function swap(arr: Array<number>, indexA: number, indexB: number) {
    [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

export class BubbleSort implements SortingMethod {
    name = "Bubble Sort";
    numbers: Array<number>;
    steps = 0;

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

        this.steps++;
    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers;
        this.lastIndex = numbers.length - 1;
    }
}

export class InsertionSort implements SortingMethod {
    name = "Insertion Sort";
    numbers: Array<number>;
    steps = 0;

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

        this.steps++;
    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers;
    }
}

export class MergeSort implements SortingMethod {
    name = "Merge Sort";
    numbers: Array<number>;
    steps = 0;

    buffer: Array<number>;
    width = 1;
    begin = 0;
    middle = 0;
    end = 0;
    leftBegin = 0;
    leftEnd = 0;
    rightBegin = 0;
    rightEnd = 0;
    currentIndex = 0;

    state = 0;

    isCompleted() {
        return this.width >= this.numbers.length && this.state === 0;
    }

    next() {
        if (this.isCompleted()) return;

        switch (this.state) {
            case 0:
                this.begin = 0;
                this.state = 1;
            case 1:
                if (this.begin <= this.numbers.length - this.width - 1) {
                    this.end = this.begin + this.width * 2 - 1;
                    this.end = Math.min(this.end, this.numbers.length - 1);
                    this.middle = this.begin + this.width;
                    this.leftBegin = this.begin;
                    this.leftEnd = this.middle - 1;
                    this.rightBegin = this.middle;
                    this.rightEnd = this.end;
                    this.currentIndex = this.begin;
                    this.state = 2;
                } else {
                    this.width *= 2;
                    this.state = 0;
                    break;
                }
            case 2:
                if (this.leftBegin <= this.leftEnd && this.rightBegin <= this.rightEnd) {
                    if (this.numbers[this.leftBegin] < this.numbers[this.rightBegin]) {
                        this.buffer[this.currentIndex] = this.numbers[this.leftBegin];
                        this.leftBegin++;
                    } else {
                        this.buffer[this.currentIndex] = this.numbers[this.rightBegin];
                        this.rightBegin++;
                    }
                    this.currentIndex++;
                } else {
                    this.state = 3;
                }
                break;
            case 3:
                if (this.leftBegin <= this.leftEnd) {
                    this.buffer[this.currentIndex] = this.numbers[this.leftBegin];
                    this.currentIndex++;
                    this.leftBegin++;
                } else {
                    this.state = 4;
                }
                break;
            case 4:
                if (this.rightBegin <= this.rightEnd) {
                    this.buffer[this.currentIndex] = this.numbers[this.rightBegin];
                    this.currentIndex++;
                    this.rightBegin++;
                } else {
                    this.currentIndex = this.begin;
                    this.state = 5;
                }
                break;
            case 5:
                if (this.currentIndex <= this.end) {
                    this.numbers[this.currentIndex] = this.buffer[this.currentIndex];
                    this.currentIndex++;
                } else {
                    this.begin += this.width * 2;
                    this.state = 1;
                }
                break;
            default:
                break;
        }

        this.steps++;
    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers;
        this.buffer = Array(numbers.length);
    }
}

export class QuickSort implements SortingMethod {
    name = "Quick Sort";
    numbers: Array<number>;
    steps = 0;

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
                } else {
                    this.state = 2;
                }
                break;
            case 2:
                if (this.left <= this.right && this.numbers[this.left] <= this.pivot) {
                    this.left++;
                } else {
                    this.state = 3;
                }
                break;
            case 3:
                if (this.left < this.right) {
                    swap(this.numbers, this.left, this.right);
                    this.state = 1;
                } else {
                    if (this.begin < this.right) {
                        swap(this.numbers, this.begin, this.right);
                        this.stack.push(this.begin, this.right - 1);
                    }
                    if (this.right < this.end) {
                        this.stack.push(this.right + 1, this.end);
                    }
                    this.state = 0;
                }
                break;
            default:
                break;
        }

        this.steps++;
    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers;
        this.stack.push(0, numbers.length - 1);
    }
}

export class HeapSort implements SortingMethod {
    name = "Heap Sort";
    numbers: Array<number>;
    steps = 0;

    stack: Array<number> = [];
    lastIndex: number;
    currentIndex = 0;
    left = 0;
    right = 0;
    end = 0;
    root = 0;
    largest = 0;

    state = 0;
    returnState = 0;

    isCompleted() {
        return this.lastIndex === 0 && this.state === 0;
    }

    next() {
        if (this.isCompleted()) return;

        switch (this.state) {
            case 0:
                this.root = Math.floor((this.lastIndex - 1) / 2);
            case 1:
                this.stack.push(this.root);
                this.returnState = 2;
                this.state = -1;
                break;
            case 2:
                this.root = this.stack.pop()!;
                if (this.root >= 1) {
                    this.root--;
                    this.state = 1;
                    break;
                } else {
                    this.state = 3;
                }
            case 3:
                if (this.lastIndex > 0) {
                    swap(this.numbers, this.lastIndex, 0);
                    this.root = 0;
                    this.lastIndex--;
                    this.returnState = 3;
                    this.state = -1;
                } else {
                    this.state = 0;
                }
                break;
            case -1:
                this.largest = this.root;
                this.left = this.root * 2 + 1;
                this.right = this.root * 2 + 2;
                if (this.left <= this.lastIndex &&
                    this.numbers[this.left] > this.numbers[this.largest]) {
                    this.largest = this.left;
                }
                if (this.right <= this.lastIndex &&
                    this.numbers[this.right] > this.numbers[this.largest]) {
                    this.largest = this.right;
                }
                if (this.largest !== this.root) {
                    swap(this.numbers, this.root, this.largest);
                    this.root = this.largest;
                } else {
                    this.state = this.returnState;
                }
                break;
            default:
                break;
        }

        this.steps++;
    }

    constructor(numbers: Array<number>) {
        this.numbers = numbers;
        this.lastIndex = numbers.length - 1;
    }
}
