# Práctica 5 - Objetos, clases e interfaces
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct05-objects-classes-interfaces-Deevo14/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct05-objects-classes-interfaces-Deevo14?branch=main)

## Índice

  1. Tareas Previas
  2. Ejercicios
  3. Conclusiones
  

## 1. Tareas Previas

  1. Aceptar la asignación de GitHub Classroom asociada a esta práctica
  2. Comience a familiarizarse con los principios _SOLID_ y con las herramientas _Instanbul y Coveralls_.
  3. Utilizar _prompt-sync_ para entrada desde teclado.


## 2. Ejercicios

### Ejercicio 1 - Biblioteca musical

Para este ejercicio hemos creado 4 clases

- Song:

```
export interface ISong {
  name: string;
  duration: number;
  genres: string[];
  single: boolean;
  plays: number;
}

export class Song implements ISong {
  private _name: string;
  private _duration: number;
  private _genres: string[];
  private _single: boolean;
  private _plays: number;

  constructor(
    name: string,
    duration: number,
    genres: string[],
    single: boolean,
    plays: number
  ) {
    this._name = name;
    this._duration = duration;
    this._genres = genres;
    this._single = single;
    this._plays = plays;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get duration(): number {
    return this._duration;
  }

  set duration(duration: number) {
    this._duration = duration;
  }

  get genres(): string[] {
    return this._genres;
  }

  set genres(genres: string[]) {
    this._genres = genres;
  }

  get single(): boolean {
    return this._single;
  }

  set single(single: boolean) {
    this._single = single;
  }

  get plays(): number {
    return this._plays;
  }

  set plays(plays: number) {
    this._plays = plays;
  }
}
```

La clase Song implementa la interfaz ISong, por lo que tiene que tener todos los atributos y métodos de la interfaz.
Tiene un constructor, que recibe 5 parámetros, que son los atributos de la clase.
Despues, usamos getters y setters para cada atributo.

- Album:
```
import { Song } from "./song";

export interface IAlbum {
  name: string;
  year: number;
  songs: Song[];
}

export class Album implements IAlbum {
  private _name: string;
  private _year: number;
  private _songs: Song[];

  constructor(name: string, year: number, songs: Song[]) {
    this._name = name;
    this._year = year;
    this._songs = songs;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get year(): number {
    return this._year;
  }

  set year(year: number) {
    this._year = year;
  }

  get songs(): Song[] {
    return this._songs;
  }

  set songs(songs: Song[]) {
    this._songs = songs;
  }
}
```

Esta clase es muy parecida a song, utilizamos una interfaz para los atributos, un constructor
donde le pasamos como parametros los atributos y sus respectivos getters y setters.

- Artist:

```
import { Song } from "./song";

export interface IAlbum {
  name: string;
  year: number;
  songs: Song[];
}

export class Album implements IAlbum {
  private _name: string;
  private _year: number;
  private _songs: Song[];

  constructor(name: string, year: number, songs: Song[]) {
    this._name = name;
    this._year = year;
    this._songs = songs;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get year(): number {
    return this._year;
  }

  set year(year: number) {
    this._year = year;
  }

  get songs(): Song[] {
    return this._songs;
  }

  set songs(songs: Song[]) {
    this._songs = songs;
  }
}
```

Al igual que en las otra dos clase, tenemos una interfaz para los atributos,
un constructor y sus getters y setters.

- MusicLibrary:

```
import { Artist } from "./artist";

export class MusicLibrary {
  private _artists: Artist[];

  constructor(artistas: Artist[]) {
    this._artists = artistas;
  }

  get artistas(): Artist[] {
    return this._artists;
  }

  set artistas(artistas: Artist[]) {
    this._artists = artistas;
  }

  viewLibrary() {
    console.table(
      this._artists
        .map((artista) => {
          return {
            Artista: artista.name,
            "Oyentes Mensuales": artista.monthlyListeners,
            Discografía: artista.discography.map((album) => {
              return {
                Álbum: album.name,
                Año: album.year,
                Canciones: album.songs.map((cancion) => {
                  return {
                    Nombre: cancion.name,
                    Duración: cancion.duration,
                    Géneros: cancion.genres,
                    Single: cancion.single,
                    Reproducciones: cancion.plays,
                  };
                }),
              };
            }),
          };
        })
        .flatMap((artista) => {
          return artista.Discografía.flatMap((album) => {
            return album.Canciones.map((cancion) => {
              return {
                Artista: artista.Artista,
                "Oyentes Mensuales": artista["Oyentes Mensuales"],
                Álbum: album["Álbum"],
                Año: album.Año,
                Nombre: cancion.Nombre,
                Duración: cancion.Duración,
                Géneros: cancion.Géneros,
                Single: cancion.Single,
                Reproducciones: cancion.Reproducciones,
              };
            });
          });
        })
    );
  }

  searchArtist(name: string) {
    const artista = this._artists.find((a) => a.name === name);
    if (!artista) {
      console.log(`Artista ${name} no encontrado`);
      return;
    }
    console.table(
      artista.discography.flatMap((album) =>
        album.songs.map((cancion) => ({
          Artista: artista.name,
          "Oyentes Mensuales": artista.monthlyListeners,
          Álbum: album.name,
          Año: album.year,
          Nombre: cancion.name,
          Duración: cancion.duration,
          Géneros: cancion.genres,
          Single: cancion.single,
          Reproducciones: cancion.plays,
        }))
      )
    );
  }

  searchAlbum(name: string) {
    const results = this._artists.flatMap((artist) => {
      const album = artist.discography.find((album) => album.name === name);
      if (album) {
        return album.songs.map((song) => {
          return {
            Artista: artist.name,
            "Oyentes Mensuales": artist.monthlyListeners,
            Álbum: album.name,
            Año: album.year,
            Nombre: song.name,
            Duración: song.duration,
            Géneros: song.genres,
            Single: song.single,
            Reproducciones: song.plays,
          };
        });
      } else {
        return [];
      }
    });

    if (results.length > 0) {
      console.table(results);
    } else {
      console.log(`Album ${name} no encontrado`);
    }
  }

  searchSong(name: string) {
    const results = this._artists.flatMap((artist) => {
      return artist.discography.flatMap((album) => {
        const song = album.songs.find((song) => song.name === name);
        if (song) {
          return {
            Artista: artist.name,
            "Oyentes Mensuales": artist.monthlyListeners,
            Álbum: album.name,
            Año: album.year,
            Nombre: song.name,
            Duración: song.duration,
            Géneros: song.genres,
            Single: song.single,
            Reproducciones: song.plays,
          };
        } else {
          return [];
        }
      });
    });

    if (results.length > 0) {
      console.table(results);
    } else {
      console.log(`Cancion ${name} no encontrada`);
    }
  }

  totalSongs(name: string): number | undefined {
    const album = this._artists
      .flatMap((artist) => artist.discography)
      .find((album) => album.name === name);
    if (album) {
      console.log(
        `El álbum "${album.name}" tiene ${album.songs.length} canciones`
      );
      return album.songs.length;
    } else {
      console.log(`No se encontró el álbum "${name}"`);
      return undefined;
    }
  }

  albumDuration(name: string): number | undefined {
    const album = this._artists
      .flatMap((artist) => artist.discography)
      .find((album) => album.name === name);
    if (album) {
      let duration = 0;
      for (let i = 0; i < album.songs.length; i++) {
        duration += album.songs[i].duration;
      }
      console.log(
        `El álbum "${album.name}" tiene una duración de ${duration} segundos`
      );
      return duration;
    } else {
      console.log(`No se encontró el álbum "${name}"`);
      return undefined;
    }
  }

  albumPlays(name: string): number | undefined {
    const album = this._artists
      .flatMap((artist) => artist.discography)
      .find((album) => album.name === name);
    if (album) {
      let plays = 0;
      for (let i = 0; i < album.songs.length; i++) {
        plays += album.songs[i].plays;
      }
      console.log(
        `El álbum "${album.name}" tiene un total de ${plays} reproducciones`
      );
      return plays;
    } else {
      console.log(`No se encontró el álbum "${name}"`);
      return undefined;
    }
  }
}

```
En esta clase es donde tenemos toda la logica del programa.
La clase contiene un constructor que recibe un arreglo de artistas, y lo guarda en una variable privada, 
su getter y su setter y una serie de metodos que son:

 - __viewLibrary__: imprime la información de todos lo´s artistas, álbumes y canciones en forma de tabla. Cabe destacar que tuve bastantes
dificultades para imprimir correctamente la tabla al completo, ya que al principio, cuando quería imprimir los albumnes o las canciones,
me salia _object_ en vez de el resto de la tabla. Después de buscar informacion en internet sobre como usar correctamente el _.map_ y el _.flatMap_,
conseguí hacerlo correctamente.
 
 - __searchArtist__: recibe un nombre de artista, y busca en el arreglo de artistas si existe un artista con ese nombre, si existe, imprime la 
información del artista en forma de tabla, si no existe, devuelve _undefined_.
 - __searchAlbum__: recibe un nombre de álbum, y busca en el arreglo de artistas si existe un álbum con ese nombre, si existe, imprime la información del 
álbum en forma de tabla, si no existe, devuelve _undefined_.
 - __searchSong__: mismo funcionamiento pero con una canción.
 - __totalSongs__: recibe un nombre de álbum, y busca en el arreglo de artistas si existe un álbum con ese nombre, si existe, imprime el número de canciones 
del álbum, si no existe, devuelve _undefined_.
 - __albumDuration__: recibe un nombre de álbum, y busca en el arreglo de artistas si existe un álbum con ese nombre, si existe, imprime la duración del 
álbum, si no existe, devuelve _undefined_.
 - __albumPlays__: recibe un nombre de álbum, y busca en el arreglo de artistas si existe un álbum con ese nombre, si existe, imprime el número de 
reproducciones del álbum, si no existe, devuelve _undefined_.

### Ejercicio 2 - Conecta 4
En este segundo ejercicio hemos creado 3 clases:

 - Player:
 ```
export class Player {
  private _fichas: number;
  
  constructor(public name: string) {
    this._fichas = 21;
  }

  get fichas() {
    return this._fichas;
  }

  set fichas(n: number) {
    this._fichas = this._fichas - n;
  }
}
```
Está primera clase es muy simple, con ella creamos a un jugador y le asignamos 21 fichas para 
poder jugar. El constructor será solo el nombre del jugador, ya que no necesitamos más datos.
También tenemos los getters y los setters de fichas. Cabe destacar que al setter no le ponemos
cuantas fichas vamos a tener, sino cuantas le vamos a restar a las que tenemos.

 - Map:
```
export type Ficha = "Vacia" | "Roja" | "Azul";

export class Map {
  private map: Ficha[][] = [];

  constructor() {
    for (let i = 0; i < 6; i++) {
      this.map[i] = [];
      for (let j = 0; j < 7; j++) {
        this.map[i][j] = "Vacia";
      }
    }
  }

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
```
La clase __Map__ nos servirá para todo lo relacionado con el "tablero" del juego.
Primero de todo, creamos un tipo __Ficha__ con los 3 posibles estados de una casilla:
_Vacio_ si no hay ninguna ficha y _Rojo_ o _Azul_ dependiendo del jugador.

Al constructor de la clase no le pasamos nada como parámetro ya que no es necesario ningún
dato, y lo que hacemos es crear el tablero con fichas "vacias" para posteriormente cambiarles
el valor al color de las fichas de los jugadores.

La función __imprimirMap__ simplemente recorre todo el tablero y lo va imprimiendo por consola,
donde haya una casilla vacía pondremos un guión bajo y si es una casilla con una ficha roja o azul, "X" y "O" respectivamente.

La funcion __insertFicha__ inserta una ficha del color que le pasamos como parámetro y en la columna que también le pasamos. Si encontramos una posición vacía en la columna que hemos seleccionado, colocaremos ahí la ficha. En caso de que la columna este completa, retornamos _false_.

Después nos encontramos con 3 funciones que comprueban el mapa de 3 formas para ver si hay 4 fichas seguidas: 

 - __checkHorizontal__: Comprobamos si hay 4 fichas del mismo color horizontalmente en el tablero usando dos bucles para recorrer todo el tablero. Cada vez que se encuentre consecutivamente una ficha igual, sumaremos 1 al contador. Si llega a 4 es que hay 4 fichas seguidas.
 - __checkVertical__: Igual que el anterior pero esta vez en vertical, y además recorremos el tablero por columnas en vez de por filas.
 - __checkDiagonales__: Está función es un poco mas complicada de entender. Recorremos el tablero y cada vez que encontremos una ficha, recorreremos tanto la diagonal inferior izquierda
 como la derecha, si encuentra 4 fichas seguidas del mismo color, retornamos true.

La última función, llamada __checkWin__, compureba si alguna de las 3 funciones de checkeo ha retornado _true_, si es así, retornamos _true_ para dar por finalizada la partida.

 - Game:
 ```
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
```

La última clase que tenemos es __Game__, donde tenemos el funcionamiento de la partida.
El constructor de la clase es un array al cual le pasamos los 2 jugadores que van a jugar.

La función __start__ empieza la partida. Mientras los jugadores tengan fichas se seguirá jugando o hasta que alguno de los dos gane. Imprimos el tablero y pedimos que el primer jugador introduzca una columna, si esta completa le volveremos a pedir que introduzca otra y checkeamos si ha ganado(es decir, si hay 4 fichas consecutivas iguales). Si no es así, haremos los mismo para el jugador 2. En el momento que alguno de los dos gane, saldremos del bucle y finalizará la partida. Si ninguno de los dos consigue ganar, imprimiremos el tablero final y un mensaje por consola donde se dice que ha habido un empate.

Al final de fichero observamos unas lineas donde pone _Pruebas interactivas para la clase Game_. Esto es porque 
no supe realizar correctamente los tests de esta clase, al tener entradas por teclado. Entonces la forma que hice para comprobar su
funcionamiento es hacerlo manualmente ejecutando el programa, probando todas las posibilidades. Se que no es lo optimo y debería
estar automatizado en los tests, pero no encontre la forma de hacerlo.

### Ejercicio 1 clase - ProductTable

```
export function productTable(n: number): number[][]|undefined {

  if(n < 1 || n % 1 !== 0){
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
```

Primero comprobamos que el numero que nos pasan como parametro es mayor que 1 y que es un numero entero y si no es asi devolvemos _undefined_.
Si cumple con esto creamos un array de arrays vacio
y hacemos un bucle que recorra el numero de veces que nos han pasado como parametro
Ahora en cada iteracion creamos un array vacio y hacemos otro bucle for que recorra el tambien n.
Finalmenete, en cada iteracion del bucle for anidado vamos a ir rellenando el array vacio con los valores de la tabla de multiplicar.

### Ejercicio 2 clase - RationalNumbers

```
export interface rationalNum{
    numerator:number;
    denominator:number;
}

export class rationalNumbers{
    private numerator:number;
    private denominator:number;

    constructor(numerator:number, denominator:number){
        this.numerator = numerator;
        this.denominator = denominator;
    }

    checkInts(){
        if(this.numerator % 1 == 0 && this.denominator % 1 === 0 ){
            return true;
        }
        return false;
    }

    checkDenominator(){
        if(this.denominator === 0){
            return false;
        }
        return true;
    }

    simplifyNumber(){
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

    toString():string{
        return `${this.numerator}/${this.denominator}`;
    }

    invert(){
        const aux = this.numerator;
        this.numerator = this.denominator;
        this.denominator = aux;
    }

    addNumbers(rationalNum:rationalNumbers){
        const aux1 = this.numerator * rationalNum.denominator;
        const aux2 = this.denominator * rationalNum.numerator;
        this.numerator = aux1 + aux2;
        this.denominator = this.denominator * rationalNum.denominator;
    }

    substractNumbers(rationalNum:rationalNumbers){
        const aux1 = this.numerator * rationalNum.denominator;
        const aux2 = this.denominator * rationalNum.numerator;
        this.numerator = aux1 - aux2;
        this.denominator = this.denominator * rationalNum.denominator;
    }

    multiplyNumbers(rationalNum:rationalNumbers){
        this.numerator = this.numerator * rationalNum.numerator;
        this.denominator = this.denominator * rationalNum.denominator;
    }

    divideNumbers(rationalNum:rationalNumbers){
        this.numerator = this.numerator * rationalNum.denominator;
        this.denominator = this.denominator * rationalNum.numerator;
    }

    rationalToDecimal(){
        return this.numerator / this.denominator;
    }
}
```
En esta clase tenemos dos atributos, numerador y denominador.
El constructor recibe dos numeros, el numerador y denominador, respectivamente.
Despues, tenemos varios métodos:

 - checkInts: Comprueba que tanto el numerador como el denominador son numeros enteros.
 - checkDenominator: Comprueba que el denominador es diferente de 0.
 - simplifyNumber: Simplifica el numero racional usando el algoritmo de euclides para calcular el maximo comun divisor 
 y divide el numerador y denominador entre el mcd.
 - toString: devuelve en _String_ el numero racional en formato _numerador_/_denominador_.
 - invert: cambia de posicion el numerador y el denominador.
 - addNumbers: suma dos numeros racionales. Primero multiplicamos el numerador de uno por el denominador del otro y guardamos cada uno en un _aux_.
 Despues sumamos los _aux_ para el numerador, y multiplicamos los denomiadores para el denominador.
 - subtractNumbers: Igual que la suma pero restamos los _aux_.
 - multiplyNumbers: Simplemente multiplicamos los numeradores y los denominadores.
 - divideNumbers: Multiplicamos el numerador de uno por el denominador del otro.
 - rationalToDecimal: Dividimos el numerador entre el denominador y devolvemos ese numero.

## 3. Conclusiones

Está práctica ha sido un poco más difícil que las anteriores. La parte mas complicada ha sido saber si la elección de clases y métodos es la más óptima para realizar cada ejercicio. En el primer ejercicio no tuve muchos problemas, pero el conecta 4 si fue bastante más difícil, donde tuve bastantes dudas en cuanto a clases, constructores y métodos a elegir. Al final decidí optar por lo explicado en el informe, sabiendo que no es la mejor manera de resolver el ejercico.

Aparte de estos problemas, creo que me voy familiarizando bastante bien con TypeScript, aunque tengo que tratar de entender mejor las facilidades que te da el uso de clases, interfaces, etc.