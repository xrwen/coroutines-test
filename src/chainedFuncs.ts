
type ComputeFn = () => number;

class Computed {
    value: number;
    computeFn: ComputeFn;

    constructor(computeFn: ComputeFn | undefined = undefined) {
        this.value = 0.0;
        if (computeFn != undefined) {
            this.computeFn = computeFn;
        } else {
            this.computeFn = () => this.value;
        }
    }

    get(): number {
        return this.computeFn();
    }

    set(value: number) {
        this.value = value;
    }
};

let A = new Computed();
let B = new Computed(() => A.get() + 20);
let C = new Computed(() => B.get() + 3);
let D = new Computed(() => C.get() * 1000 + A.get());

console.log("A = " + A.get() + ", D = " + D.get());
A.set(100);
console.log("A = " + A.get() + ", D = " + D.get());
