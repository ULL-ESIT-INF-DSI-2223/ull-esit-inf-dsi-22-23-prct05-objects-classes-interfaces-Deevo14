/**
 * Clase Player
 * Los atributos de la clase son:
 * name: nombre del jugador
 * fichas: fichas del jugador
 */
export class Player {
  private _fichas: number;
  /**
   * Constructor de la clase Player
   * @param name nombre del jugador
   */
  constructor(public name: string) {
    this._fichas = 21;
  }

  /**
   * Getter fichas
   * @return retorna las fichas del jugador
   */
  get fichas() {
    return this._fichas;
  }

  /**
   * Setter fichas
   * @param fichas fichas del jugador
   */
  set fichas(n: number) {
    this._fichas = this._fichas - n;
  }
}
