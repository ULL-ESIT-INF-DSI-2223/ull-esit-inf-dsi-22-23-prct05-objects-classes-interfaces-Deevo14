/**
 * Funcion que recibe un numero entero "n" como parametro y devuelve "n" tablas de multiplciar,
 * donde cada tabla contiene los primeros "n" productos
 * @param n Recibimos como parametro un numero entero mayor que 1, en caso contrario devolvemos undefinded
 * @returns retornamos un array de arrays(number[][]) con n tablas de multplicar con los primeros n numeros
 */
export function productTable(n: number): number[][] | undefined {
  if (n < 1 || n % 1 !== 0) {
    return undefined;
  }

  const table: number[][] = [];

  for (let i = 0; i < n; i++) {
    table[i] = [];
    for (let j = 1; j <= n; j++) {
      table[i].push((i + 1) * j);
    }
  }

  return table;
}
