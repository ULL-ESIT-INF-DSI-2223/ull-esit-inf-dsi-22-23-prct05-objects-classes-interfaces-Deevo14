import { Map } from "./map";
import { Ficha } from "./map";
import { Player } from "./player";
import * as Prompt from "prompt-sync";

/**
 * Variable para usar prompt-sync
 */
const prompt = Prompt();

/**
 * Clase Game donde se inicia la partida
 * Los atributos de la clase son:
 * players: Array de los dos jugadores
 */
export class Game {
  /**
   * Constructor de la clase donde le pasamos dos jugadores
   * @param players Array de los dos jugadores
   */
  constructor(public players: Player[]) {}

  /**
   * Método para iniciar la partida
   * @return retorna un mensaje de empate o de que jugador ha ganado
   * y muestra el tablero
   */
  start() {
    console.log("Empieza la partida:");
    const mapa = new Map();
    const ficha: Ficha[] = ["Roja", "Azul"];

    loop: while (this.players[0].fichas > 0 && this.players[1].fichas > 0) {
      for (let i = 1; i < 3; i++) {
        let error = 0;
        let column = 0;
        mapa.imprimirMap();
        while (mapa.insertFicha(column - 1, i) !== true) {
          if (error === 1) {
            console.log(
              `La columna está completa, seleccione otra diferente.\n`
            );
          }
          column = parseInt(
            prompt(`${this.players[i - 1].name} seleccione una columna: `)
          );
          error = 1;
        }
        this.players[i - 1].fichas = 1;
        if (mapa.checkWin(ficha[i - 1]) === true) {
          mapa.imprimirMap();
          console.log(`${this.players[i - 1].name} Gana\n`);
          break loop;
        }
      }
    }
    if (this.players[0].fichas <= 0 || this.players[1].fichas <= 0) {
      mapa.imprimirMap();
      console.log(`Empate, el tablero se ha completado sin ningún ganador`);
    }
  }
}
// Pruebas interactivas para la clase Game
// const p1 = new Player("Roberto");
// const p2 = new Player("David");
// const game = new Game([p1, p2]);

// game.start();
