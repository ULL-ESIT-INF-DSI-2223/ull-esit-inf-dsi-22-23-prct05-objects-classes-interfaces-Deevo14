import { Artist } from "./artist";
/**
 * Clase MusicLibrary
 * Los atributos de la clase son:
 * artists: artistas de la biblioteca
 */
export class MusicLibrary {
  private _artists: Artist[];

  /**
   * Constructor de la clase MusicLibrary
   * @param artists artistas de la biblioteca
   */
  constructor(artistas: Artist[]) {
    this._artists = artistas;
  }

  /**
   * Getter artists
   * @return retorna los artistas de la biblioteca
   */
  get artistas(): Artist[] {
    return this._artists;
  }

  /**
   * Setter artists
   * @param artists artistas de la biblioteca
   */
  set artistas(artistas: Artist[]) {
    this._artists = artistas;
  }

  /**
   * Método para mostrar la biblioteca
   * @return retorna la biblioteca en forma de tabla
   * con un console.table
   */
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

  /**
   * Método para buscar un artista
   * @param name nombre del artista a buscar
   * @returns retorna la información del artista en forma de tabla
   */
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

  /**
   * Método para buscar un álbum
   * @param name nombre del álbum a buscar
   * @returns retorna la información del álbum en forma de tabla
   */
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
  /**
   * Método para buscar una canción
   * @param name nombre de la canción a buscar
   * @returns retorna la información de la canción en forma de tabla
   */
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

  /**
   * Metodo para saber cuantas canciones tiene un album
   * @param name nombre del album
   * @returns retorna el numero de canciones del album
   * o undefined si no se encuentra
   */
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

  /**
   * Metodo para saber la duracion de un album
   * @param name nombre del album
   * @returns retorna la duracion del album
   * o undefined si no se encuentra
   */
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

  /**
   * Metodo para saber cuantas reproducciones tiene un album
   * @param name nombre del album
   * @returns retorna el numero de reproducciones del album
   * o undefined si no se encuentra
   */
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

