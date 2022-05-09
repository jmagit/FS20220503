a = 'Adios mundo';
noSeaGlobal = 'mi valor'
function kk() {
    c = '';
}

const suma = (a = 0, b = 0) => {
    return a + b
}
function dobla(a = 0, b = 0, fn) {
    return fn(a, b) + 2
}
function calc(a = 0, b = 0, op) {
    return calcula(op)(a, b)
}

function calcula(op) {
    switch(op) {
        case '+': return (a, b) => a + b
        case '-': return (a, b) => a - b
        case '*': return (a, b) => a * b
        case '/': return (a, b) => a / b
        default:
            throw new Error('Operador desconocido')
    }
}
function resta() {
    return arguments[0] - arguments[1]
}

function avg() {
    var resultado = 0;
    for (var i = 0; i < arguments.length; i++) {
        resultado += arguments[i];
    }
    return arguments.length ? (resultado / arguments.length) : 0;
}

