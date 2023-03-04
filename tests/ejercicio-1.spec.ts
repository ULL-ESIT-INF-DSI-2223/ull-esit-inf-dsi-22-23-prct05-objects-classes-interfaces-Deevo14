import 'mocha';
import {expect} from 'chai';
import {Artist} from'../src/ejercicio-1/artist';
import {Album} from'../src/ejercicio-1/album';
import {Song} from'../src/ejercicio-1/song';
import {MusicLibrary} from '../src/ejercicio-1/musicLibrary';

describe('Test Ejercicio 1', () => {
describe('Comprobaciones Song', () => {
    it('Getters', () => {
        const song1 = new Song("Cancion1", 200, ["Rock"], true, 1000);
        expect(song1.name).to.be.equal("Cancion1");
        expect(song1.duration).to.be.equal(200);
        expect(song1.genres).to.be.eql(["Rock"]);
        expect(song1.single).to.be.equal(true);
        expect(song1.plays).to.be.equal(1000);
    });
    it('Setters', () => {
        const song1 = new Song("Cancion1", 200, ["Rock"], true, 1000);
        song1.name = "Cancion2";
        song1.duration = 300;
        song1.genres = ["Pop"];
        song1.single = false;
        song1.plays = 2000;
        expect(song1.name).to.be.equal("Cancion2");
        expect(song1.duration).to.be.equal(300);
        expect(song1.genres).to.be.eql(["Pop"]);
        expect(song1.single).to.be.equal(false);
        expect(song1.plays).to.be.equal(2000);
    });
});
describe('Comprobaciones Album', () => {
    it('Getters', () => {
        const album1 = new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)]);
        expect(album1.name).to.be.equal("Album1");
        expect(album1.year).to.be.equal(2000);
        expect(album1.songs).to.be.eql([new Song("Cancion1", 200, ["Rock"], true, 1000)]);
    });
    it('Setters', () => {
        const album1 = new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)]);
        album1.name = "Album2";
        album1.year = 2001;
        album1.songs = [new Song("Cancion2", 300, ["Pop"], false, 2000)];
        expect(album1.name).to.be.equal("Album2");
        expect(album1.year).to.be.equal(2001);
        expect(album1.songs).to.be.eql([new Song("Cancion2", 300, ["Pop"], false, 2000)]);
    });
});
describe('Comprobaciones Artist', () => {
    it('Getters', () => {
        const artist1 = new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])]);
        expect(artist1.name).to.be.equal("Artista1");
        expect(artist1.monthlyListeners).to.be.equal(1000);
        expect(artist1.discography).to.be.eql([new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])]);
    });
    it('Setters', () => {
        const artist1 = new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])]);
        artist1.name = "Artista2";
        artist1.monthlyListeners = 2000;
        artist1.discography = [new Album("Album2", 2001, [new Song("Cancion2", 300, ["Pop"], false, 2000)])];
        expect(artist1.name).to.be.equal("Artista2");
        expect(artist1.monthlyListeners).to.be.equal(2000);
        expect(artist1.discography).to.be.eql([new Album("Album2", 2001, [new Song("Cancion2", 300, ["Pop"], false, 2000)])]);
    });
});
describe('Comprobaciones musicalLibrary', () => {
    it('Getters', () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        expect(library1.artistas).to.be.eql([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
    });
    it('Setters', () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        library1.artistas = [new Artist("Artista2", 2000, [new Album("Album2", 2001, [new Song("Cancion2", 300, ["Pop"], false, 2000)])])];
        expect(library1.artistas).to.be.eql([new Artist("Artista2", 2000, [new Album("Album2", 2001, [new Song("Cancion2", 300, ["Pop"], false, 2000)])])]);
    });
    it('mostrarBiblioteca' , () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        const logs:any = [];
        const log:any = console.log;
        console.log = (message) => logs.push(message);

        library1.viewLibrary();
        expect(logs).to.be.eql([
            "┌─────────┬────────────┬───────────────────┬──────────┬──────┬────────────┬──────────┬────────────┬────────┬────────────────┐\n│ (index) │  Artista   │ Oyentes Mensuales │  Álbum   │ Año  │   Nombre   │ Duración │  Géneros   │ Single │ Reproducciones │\n├─────────┼────────────┼───────────────────┼──────────┼──────┼────────────┼──────────┼────────────┼────────┼────────────────┤\n│    0    │ \u001b[32m'Artista1'\u001b[39m │       \u001b[33m1000\u001b[39m        │ \u001b[32m'Album1'\u001b[39m │ \u001b[33m2000\u001b[39m │ \u001b[32m'Cancion1'\u001b[39m │   \u001b[33m200\u001b[39m    │ [ \u001b[32m'Rock'\u001b[39m ] │  \u001b[33mtrue\u001b[39m  │      \u001b[33m1000\u001b[39m      │\n└─────────┴────────────┴───────────────────┴──────────┴──────┴────────────┴──────────┴────────────┴────────┴────────────────┘"
        ]);
    });
    it('mostrarArtista' , () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        const logs:any = [];
        const log:any = console.log;
        console.log = (message) => logs.push(message);

        library1.searchArtist("Artista1");
        expect(logs).to.be.eql([
            "┌─────────┬────────────┬───────────────────┬──────────┬──────┬────────────┬──────────┬────────────┬────────┬────────────────┐\n│ (index) │  Artista   │ Oyentes Mensuales │  Álbum   │ Año  │   Nombre   │ Duración │  Géneros   │ Single │ Reproducciones │\n├─────────┼────────────┼───────────────────┼──────────┼──────┼────────────┼──────────┼────────────┼────────┼────────────────┤\n│    0    │ \u001b[32m'Artista1'\u001b[39m │       \u001b[33m1000\u001b[39m        │ \u001b[32m'Album1'\u001b[39m │ \u001b[33m2000\u001b[39m │ \u001b[32m'Cancion1'\u001b[39m │   \u001b[33m200\u001b[39m    │ [ \u001b[32m'Rock'\u001b[39m ] │  \u001b[33mtrue\u001b[39m  │      \u001b[33m1000\u001b[39m      │\n└─────────┴────────────┴───────────────────┴──────────┴──────┴────────────┴──────────┴────────────┴────────┴────────────────┘"
        ]);
    });
    it
    it('mostarArtista error' , () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        const logs:any = [];
        const log:any = console.log;
        console.log = (message) => logs.push(message);

        library1.searchArtist("Artista2");
        expect(logs).to.be.eql([
            "Artista Artista2 no encontrado"
        ]);
    });
    it('mostrarAlbum' , () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        const logs:any = [];
        const log:any = console.log;
        console.log = (message) => logs.push(message);

        library1.searchAlbum("Album1");
        expect(logs).to.be.eql([
            "┌─────────┬────────────┬───────────────────┬──────────┬──────┬────────────┬──────────┬────────────┬────────┬────────────────┐\n│ (index) │  Artista   │ Oyentes Mensuales │  Álbum   │ Año  │   Nombre   │ Duración │  Géneros   │ Single │ Reproducciones │\n├─────────┼────────────┼───────────────────┼──────────┼──────┼────────────┼──────────┼────────────┼────────┼────────────────┤\n│    0    │ \u001b[32m'Artista1'\u001b[39m │       \u001b[33m1000\u001b[39m        │ \u001b[32m'Album1'\u001b[39m │ \u001b[33m2000\u001b[39m │ \u001b[32m'Cancion1'\u001b[39m │   \u001b[33m200\u001b[39m    │ [ \u001b[32m'Rock'\u001b[39m ] │  \u001b[33mtrue\u001b[39m  │      \u001b[33m1000\u001b[39m      │\n└─────────┴────────────┴───────────────────┴──────────┴──────┴────────────┴──────────┴────────────┴────────┴────────────────┘"
        ]);
    });
    it('mostrarAlbum error' , () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        const logs:any = [];
        const log:any = console.log;
        console.log = (message) => logs.push(message);

        library1.searchAlbum("Album2");
        expect(logs).to.be.eql([
            "Album Album2 no encontrado"
        ]);
    });
    it('mostrarCancion' , () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        const logs:any = [];
        const log:any = console.log;
        console.log = (message) => logs.push(message);

        library1.searchSong("Cancion1");
        expect(logs).to.be.eql([
            "┌─────────┬────────────┬───────────────────┬──────────┬──────┬────────────┬──────────┬────────────┬────────┬────────────────┐\n│ (index) │  Artista   │ Oyentes Mensuales │  Álbum   │ Año  │   Nombre   │ Duración │  Géneros   │ Single │ Reproducciones │\n├─────────┼────────────┼───────────────────┼──────────┼──────┼────────────┼──────────┼────────────┼────────┼────────────────┤\n│    0    │ \u001b[32m'Artista1'\u001b[39m │       \u001b[33m1000\u001b[39m        │ \u001b[32m'Album1'\u001b[39m │ \u001b[33m2000\u001b[39m │ \u001b[32m'Cancion1'\u001b[39m │   \u001b[33m200\u001b[39m    │ [ \u001b[32m'Rock'\u001b[39m ] │  \u001b[33mtrue\u001b[39m  │      \u001b[33m1000\u001b[39m      │\n└─────────┴────────────┴───────────────────┴──────────┴──────┴────────────┴──────────┴────────────┴────────┴────────────────┘"
        ]);
    });
    it('mostrarCancion error' , () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        const logs:any = [];
        const log:any = console.log;
        console.log = (message) => logs.push(message);

        library1.searchSong("Cancion2");
        expect(logs).to.be.eql([
            "Cancion Cancion2 no encontrada"
        ]);
    });
    it('totalSongs' , () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        library1.totalSongs("Album1");
        expect(library1.totalSongs("Album1")).to.be.eql(1);
    });
    it('totalSongs error' , () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        library1.totalSongs("Album1");
        expect(library1.totalSongs("Album2")).to.be.undefined;
    });
    it('albumDuration' , () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        library1.albumDuration("Album1");
        expect(library1.albumDuration("Album1")).to.be.eql(200);
    });
    it('albumDuration error' , () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        library1.albumDuration("Album1");
        expect(library1.albumDuration("Album2")).to.be.undefined;
    });
    it('albumPlays' , () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        library1.albumPlays("Album1");
        expect(library1.albumPlays("Album1")).to.be.eql(1000);
    });
    it('albumPlays error' , () => {
        const library1 = new MusicLibrary([new Artist("Artista1", 1000, [new Album("Album1", 2000, [new Song("Cancion1", 200, ["Rock"], true, 1000)])])]);
        library1.albumPlays("Album1");
        expect(library1.albumPlays("Album2")).to.be.undefined;
    });
});
});