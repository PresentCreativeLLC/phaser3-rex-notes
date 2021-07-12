import Board from '../../plugins/board/board/Board';
import Match from '../../plugins/board/match/Match';
import MoveTo from '../../plugins/board/moveto/MoveTo';
import { TileXYType } from '../../plugins/board/types/Position';

export default Bejeweled;

declare namespace Bejeweled {

    type ChessSymbol = number | string;

    type GenerateSymbolCallbackType = (
        board: Board,
        tileX: number, tileY: number,
        excluded: undefined | ChessSymbol[]
    ) => ChessSymbol;

    type CreateChessCallbackType = (
        board: Board
    ) => Phaser.GameObjects.GameObject;

    type OnMatchLinesCallbackType = (
        lines: Phaser.Structs.Set<Phaser.GameObjects.GameObject>[],
        board: Board,
        bejeweled: Bejeweled,
    ) => void;

    type OnEliminatingChessCallbackType = (
        chessArray: Phaser.GameObjects.GameObject[],
        board: Board,
        bejeweled: Bejeweled,
    ) => void | boolean;

    type OnFallingChessCallbackType = (
        board: Board,
        bejeweled: Bejeweled,
    ) => void | boolean;

    interface IConfig {
        rexBoard?: string,

        board: Board.IConfig,
        match?: Match.IConfig,

        chess: {
            symbols: ChessSymbol[] | GenerateSymbolCallbackType,

            create: CreateChessCallbackType,

            scope?: unknown,

            moveTo?: MoveTo.IConfig,

            tileZ?: number | string,
        },


        onMatchLinesCallback?: OnMatchLinesCallbackType,
        onMatchLinesCallbackScope?: unknown,

        onEliminatingChessCallback?: OnEliminatingChessCallbackType,
        onEliminatingChessCallbackScope?: unknown,

        onFallingChessCallback?: OnFallingChessCallbackType,
        onFallingChessCallbackScope?: unknown,

        input?: boolean,

        debug?: boolean

    }
}

declare class Bejeweled extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: Bejeweled.IConfig
    );

    start(): this;

    setInputEnable(enable?: boolean): this;

    worldXYToChess(
        worldX: number,
        worldY: number
    ): Phaser.GameObjects.GameObject;

    tileXYToChess(
        tileX: number,
        tileY: number
    ): Phaser.GameObjects.GameObject;

    getNeighborChessAtAngle(
        chess: Phaser.GameObjects.GameObject | TileXYType,
        angle: number
    ): Phaser.GameObjects.GameObject;

    getNeighborChessAtDirection(
        chess: Phaser.GameObjects.GameObject | TileXYType,
        direction: number
    ): Phaser.GameObjects.GameObject;

    selectChess1(
        chess: Phaser.GameObjects.GameObject
    ): this;
    readonly selectedChess1: Phaser.GameObjects.GameObject;

    selectChess2(
        chess: Phaser.GameObjects.GameObject
    ): this;
    readonly selectedChess2: Phaser.GameObjects.GameObject;

    // Chess properties
    getChessMoveTo(
        chess: Phaser.GameObjects.GameObject
    ): MoveTo | undefined;

    readonly chessTileZ: number;

    // Custom eliminateChess, falling action
    waitEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName?: string
    ): this;

}