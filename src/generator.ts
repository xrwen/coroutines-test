function* generatorA() {
    yield 100;
}

function* generatorB() {
    var valA = yield generatorA;
    yield valA + 20;
}

function* generatorC() {
    var valB = yield generatorB;
    yield valB + 3;
}

function* generatorD() {
    var valC = yield generatorC;
    var valA = yield generatorA;

    yield valC * 1000 + valA;
}

type ComputeGenerator = Iterator<number>;
type ComputeFunc = () => ComputeGenerator;

function runComputation(func: ComputeFunc) {
    let generators: Array<ComputeGenerator> = [];
    let lastRet: number = 0.0;
    let retValid: boolean = false;

    generators.push(func());

    while (generators.length > 0) {
        let top = generators[generators.length - 1];
        
        var result: IteratorResult<number>;

        if (retValid) {
            result = top.next(lastRet);
            retValid = false;
            lastRet = 0.0;
        } else {
            result = top.next();
        }

        if (result.done) {
            generators.pop();
            retValid = true;
        } else if (typeof result.value === "number") {
            lastRet = result.value as number;
        } else {
            let computeFunc = result.value as ComputeFunc;
            let computeGenenerator = computeFunc();
            generators.push(computeGenenerator);
        }
    }

    return lastRet;
}

export function generatorTest() {
    let result = runComputation(generatorD);
    console.log(result);
}
