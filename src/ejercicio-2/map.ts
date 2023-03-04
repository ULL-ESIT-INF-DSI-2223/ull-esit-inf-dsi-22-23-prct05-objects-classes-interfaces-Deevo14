export type Ficha = "Vacia" | "Roja" | "Azul";

/**
 * Clase Map donde se crea el tablero
 * Los atributos de la clase son:
 * map: Array de dos dimensiones que contiene las fichas
 * de cada jugador
 */
export class Map {
  private map: Ficha[][] = [];

  /**
   * Constructor de la clase donde se crea el tablero
   * con 6 filas y 7 columnas
   * y se rellena con fichas vacías
   */
  constructor() {
    for (let i = 0; i < 6; i++) {
      this.map[i] = [];
      for (let j = 0; j < 7; j++) {
        this.map[i][j] = "Vacia";
      }
    }
  }

  /**
   * Funcion para imprimir el tablero
   * en la consola
   * @returns Imprime el tablero en la consola
   */
  imprimirMap() {
    console.log(`\n`);
    for (let i = 0; i < 6; i++) {
      let auxfilas = "";
      for (let j = 0; j < 7; j++) {
        switch (this.map[i][j]) {
          case "Vacia": {
            auxfilas += "_   ";
            break;
          }
          case "Roja": {
            auxfilas += "X   ";
            break;
          }
          case "Azul": {
            auxfilas += "O   ";
            break;
          }
        }
      }
      console.log(`${auxfilas}\n`);
    }
  }

  /**
   * Funcion para insertar una ficha en el tablero
   * @param column  columna donde se inserta la ficha
   * @param player jugador que inserta la ficha
   * @returns retorna _true_ si se ha insertado la ficha
   */
  insertFicha(column: number, player: number): boolean {
    if (column >= 0 && column < 7) {
      for (let i = 5; i >= 0; i--) {
        if (this.map[i][column] === "Vacia") {
          switch (player) {
            case 1: {
              this.map[i][column] = "Roja";
              return true;
            }
            case 2: {
              this.map[i][column] = "Azul";
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  /**
   * Funcion para comprobar si hay 4 fichas de un mismo color en horizontal
   * @param color le pasamos el color de la ficha a comprobar
   * @returns retornamos _true_ si hay 4 contiguas y _false_ si no.
   */
  checkHorizontal(color: Ficha): boolean {
    let counth = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.map[i][j] === color) {
          counth++;
          if (counth === 4) {
            return true;
          }
        } else {
          counth = 0;
        }
      }
    }
    return false;
  }

  /**
   * Funcion para comprobar si hay 4 fichas de un mismo color en vertical
   * @param color le pasamos el color de la ficha a comprobar
   * @returns retornamos _true_ si hay 4 contiguas y _false_ si no.
   */
  checkVertical(color: Ficha): boolean {
    let countv = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        if (this.map[j][i] === color) {
          countv++;
          if (countv === 4) {
            return true;
          }
        } else {
          countv = 0;
        }
      }
    }
    return false;
  }

  /**
   * Funcion para comprobar si hay 4 fichas de un mismo color en diagonal
   * @param color le pasamos el color de la ficha a comprobar
   * @returns retornamos _true_ si hay 4 contiguas y _false_ si no.
   */
  checkDiagonal(color: Ficha): boolean {
    let countd = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.map[i][j] === color) {
          let k: number = i;
          let l: number = j;
          countd = 0;
          while (
            k < 6 &&
            k >= 0 &&
            l >= 0 &&
            l < 7 &&
            this.map[k][l] === color
          ) {
            countd++;
            k++;
            l++;
            if (countd === 4) {
              return true;
            }
          }
          countd = 0;
          k = i;
          l = j;
          while (
            k < 6 &&
            k >= 0 &&
            l >= 0 &&
            l < 7 &&
            this.map[k][l] === color
          ) {
            countd++;
            k++;
            l--;
            if (countd === 4) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  /**
   * Funcion para comprobar si algun jugador ha ganado
   * @param color le pasamos el color de la ficha a comprobar
   * @returns retornamos _true_ si hay 4 contiguas en cualquier direccion y _false_ si no.
   */
  checkWin(color: Ficha): boolean {
    if (
      this.checkDiagonal(color) === true ||
      this.checkVertical(color) === true ||
      this.checkHorizontal(color) === true
    ) {
      return true;
    } else {
      return false;
    }
  }
}
