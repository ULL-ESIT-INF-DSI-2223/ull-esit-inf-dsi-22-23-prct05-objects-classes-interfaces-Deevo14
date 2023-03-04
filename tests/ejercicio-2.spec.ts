import 'mocha';
import {expect} from 'chai';
import {Game} from '../src/ejercicio-2/game';
import {Player} from '../src/ejercicio-2/player';
import {Map} from '../src/ejercicio-2/map';

describe('Test ejercicio 2', () => {
describe('Comprobaciones Player', () => {
    it('Crear un player', () => {
        const player1 = new Player("David");
    });
    it('Getter', () => {
        const player1 = new Player("David");
        expect(player1.fichas).to.be.equal(21); 
    });
    it('Setter', () => {
        const player1 = new Player("David");
        player1.fichas = 1;
        expect(player1.fichas).to.be.equal(20); 
    });
});

describe('Comprobaciones Mapa', () => {

    it('Insercion de columna fuera del tablero', () => {
        const tablero = new Map;
        expect(tablero.insertFicha(8, 1)).to.be.equal(false);
    });

    it('Insertar ficha hasta que no haya espacacio en la columna', () => {
        const tablero = new Map;
        expect(tablero.insertFicha(1, 1)).to.be.equal(true);
        expect(tablero.insertFicha(1, 1)).to.be.equal(true);
        expect(tablero.insertFicha(1, 1)).to.be.equal(true);
        expect(tablero.insertFicha(1, 1)).to.be.equal(true);
        expect(tablero.insertFicha(1, 1)).to.be.equal(true);
        expect(tablero.insertFicha(1, 1)).to.be.equal(true);
        expect(tablero.insertFicha(1, 1)).to.be.equal(false);
    });
    it('Comprobar si hay 4 fichas verticales', () => {
        const tablero = new Map;
        expect(tablero.insertFicha(1, 1));
        expect(tablero.insertFicha(1, 1));
        expect(tablero.insertFicha(1, 1));
        expect(tablero.insertFicha(1, 1));
        expect(tablero.checkVertical('Roja')).to.be.equal(true);
    });
    it('Comprobar si hay 4 fichas horizontales', () => {
        const tablero = new Map;
        tablero.insertFicha(1, 1);
        tablero.insertFicha(2, 1);
        tablero.insertFicha(3, 1);
        tablero.insertFicha(4, 1);
        expect(tablero.checkHorizontal('Roja')).to.be.equal(true);
    });
    it('Comprobar si hay 4 fichas diagonales ascendentes', () => {
        const tablero = new Map;
        tablero.insertFicha(1, 1);
        tablero.insertFicha(2, 1);
        tablero.insertFicha(2, 1);
        tablero.insertFicha(3, 1);
        tablero.insertFicha(3, 1);
        tablero.insertFicha(3, 1);
        tablero.insertFicha(4, 1);
        tablero.insertFicha(4, 1);
        tablero.insertFicha(4, 1);
        tablero.insertFicha(4, 1);
        expect(tablero.checkDiagonal('Roja')).to.be.equal(true);
    });
    it('Comprobar si hay 4 fichas diagonales descendentes', () => {
        const tablero = new Map;
        tablero.insertFicha(1, 1);
        tablero.insertFicha(1, 1);
        tablero.insertFicha(1, 1);
        tablero.insertFicha(1, 1);
        tablero.insertFicha(2, 1);
        tablero.insertFicha(2, 1);
        tablero.insertFicha(2, 1);
        tablero.insertFicha(3, 1);
        tablero.insertFicha(3, 1);
        tablero.insertFicha(4, 1);
        expect(tablero.checkDiagonal('Roja')).to.be.equal(true);
    });
    it('Comprobar cuando no hay 4 fichas seguidas del mismo color', () => {
        const tablero = new Map;
        tablero.insertFicha(1, 1);
        expect(tablero.checkHorizontal('Roja')).to.be.equal(false);
        expect(tablero.checkVertical('Roja')).to.be.equal(false);
        expect(tablero.checkDiagonal('Roja')).to.be.equal(false);
    });
    it('Comprobar si un jugador ha ganado', () => {
        const tablero = new Map;
        tablero.insertFicha(1, 1);
        tablero.insertFicha(1, 1);
        tablero.insertFicha(1, 1);
        tablero.insertFicha(1, 1);
        expect(tablero.checkWin('Roja')).to.be.equal(true);
    });
    it('Comprobar si un jugador no ha ganado', () => {
        const tablero = new Map;
        tablero.insertFicha(1, 1);
        tablero.insertFicha(1, 1);
        tablero.insertFicha(1, 1);
        expect(tablero.checkWin('Roja')).to.be.equal(false);
    });
    it('Comprobar imprimir tablero', () => {
        const tablero = new Map;
        tablero.insertFicha(1, 1);
        tablero.insertFicha(0, 2);
        
        const output:string[] = [];
        console.log = (message) => output.push(message);

        tablero.imprimirMap();

        expect(output.join('')).to.be.equal(
            '\n_   _   _   _   _   _   _   \n' +
            '_   _   _   _   _   _   _   \n' +
            '_   _   _   _   _   _   _   \n' +
            '_   _   _   _   _   _   _   \n' +
            '_   _   _   _   _   _   _   \n' +
            'O   X   _   _   _   _   _   \n'
        );
    });
});
});