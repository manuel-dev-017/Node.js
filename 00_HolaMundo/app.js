let nombre = "Manuel";
console.log(
  `Hola Mundo, mi nombre es  ${nombre}. Este es mi primer mensaje desde Node.js`,
);

let edad = 32;
if (edad >= 18) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres enor de edad");
}

function sumar(a, b) {
  return a + b;
}

console.log(sumar(4, 6));
