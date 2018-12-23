
function* generator() {
    yield 0;
    yield 1;
    yield 2;
}

function main() {
    var iter = generator();

    var result = iter.next();
    while (!result.done) {
        console.log("Found value: " + result.value);
        result = iter.next();
    }
}

main();
