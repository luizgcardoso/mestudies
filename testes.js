function show() {
    let a = "";
    for (let i = 0; i <= 10; i++) {
        if (i % 2 == 0) {
            a += i + " é par \n";
        } else {
            a += i + " é impar\n";
        }
    }
    return a;
}
console.log(show());
