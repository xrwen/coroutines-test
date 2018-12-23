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

type ComputeFunc = () => Iterator<number>;
type ComputeGenerator = Iterator<number>;

function runGenerator(func: ComputeFunc) {
    let generators: Array<ComputeGenerator> = [];
    let lastRet: number | undefined = undefined;

    generators.push(func());

    while (generators.length > 0) {
        let top = generators[generators.length - 1];
        
        var result: any;

        if (lastRet === undefined) {
            result = top.next().value as any
        } else {
            result = top.next(lastRet).value as any
            lastRet = undefined;
        }

        if (typeof result === "number") {
            generators.pop();
            lastRet = result as number;
        } else {
            var resultFunc = result as ComputeFunc;
            generators.push(resultFunc());
        }
    }

    return lastRet;
}

export function generatorTest() {
    let result = runGenerator(generatorD);
    console.log(result);
}
