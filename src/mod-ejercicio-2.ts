/**
 * Interface para el tipo de dato de un numero racional
 * tiene como atributos un numerador y un denominador
 */
export interface rationalNum {
  numerator: number;
  denominator: number;
}

/**
 * Clase para operar con numeros racionales
 * usamos un atributo para el numerador y otro para el
 * denominador de tipo number
 */
export class rationalNumbers {
  private numerator: number;
  private denominator: number;

  constructor(numerator: number, denominator: number) {
    this.numerator = numerator;
    this.denominator = denominator;
  }

  /**
   * Metodo para comprobar si numerador y denomiador
   * son numeros enteros
   * @returns devolvemos true o false
   */
  checkInts() {
    if (this.numerator % 1 == 0 && this.denominator % 1 === 0) {
      return true;
    }
    return false;
  }

  /**
   * Metodo para comprobar si el denominador es 0
   * @returns Devolvemos false si es 0,
   * es decir el numero racional es invalido
   */
  checkDenominator() {
    if (this.denominator === 0) {
      return false;
    }
    return true;
  }

  /**
   * Metodo para simpplificar un numero racional
   * Sacamos el maximo comun divisor y dividimos
   * el numerador y denomiador entre el
   * Guardamos los nuevos valores
   */
  simplifyNumber() {
    let a = this.numerator;
    let b = this.denominator;

    while (b !== 0) {
      const r = a % b;
      a = b;
      b = r;
    }

    this.numerator /= a;
    this.denominator /= a;
  }

  /**
   * Metodo para ver el en string el numero racional
   * @returns devolvemos n/d
   */
  toString(): string {
    return `${this.numerator}/${this.denominator}`;
  }

  /**
   * Metodo para invertir el numero racional
   * Simplemente cambiamos de posicion el numerador y denominador
   */
  invert() {
    const aux = this.numerator;
    this.numerator = this.denominator;
    this.denominator = aux;
  }

  /**
   * Metodo para sumar dos numeros racionales
   * @param rationalNum numero racional con el que operamos
   */
  addNumbers(rationalNum: rationalNumbers) {
    const aux1 = this.numerator * rationalNum.denominator;
    const aux2 = this.denominator * rationalNum.numerator;
    this.numerator = aux1 + aux2;
    this.denominator = this.denominator * rationalNum.denominator;
  }

  /**
   * Metodo para restar dos numeros racionales
   * @param rationalNum numero racional con el que operamos
   */
  substractNumbers(rationalNum: rationalNumbers) {
    const aux1 = this.numerator * rationalNum.denominator;
    const aux2 = this.denominator * rationalNum.numerator;
    this.numerator = aux1 - aux2;
    this.denominator = this.denominator * rationalNum.denominator;
  }

  /**
   * Metodo para multiplicar dos numeros racionales
   * @param rationalNum numero racional con el que operamos
   */
  multiplyNumbers(rationalNum: rationalNumbers) {
    this.numerator = this.numerator * rationalNum.numerator;
    this.denominator = this.denominator * rationalNum.denominator;
  }

  /**
   * Metodo para dividir dos numeros racionales
   * @param rationalNum numero racional con el que operamos
   */
  divideNumbers(rationalNum: rationalNumbers) {
    this.numerator = this.numerator * rationalNum.denominator;
    this.denominator = this.denominator * rationalNum.numerator;
  }

  /**
   * Metodo para pasar un numero racional a decimal
   * @returns devolvemos el numero racional en decimal
   */
  rationalToDecimal() {
    return this.numerator / this.denominator;
  }
}