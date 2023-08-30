// import * as Phaser from 'phaser';
import Scrollable from '../utils/scrollable/Scrollable';
import CanvasInput from '../canvasinput/CanvasInput';


export default TextAreaInput;

declare namespace TextAreaInput {

    interface IConfig extends Scrollable.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            text?: number | {
                left?: number, right?: number, top?: number, bottom?: number,
            },

            header?: number,
            footer?: number,
        },

        scroller?: false,

        text?: CanvasInput.IConfig | Phaser.GameObjects.GameObject,
        alwaysScrollable?: boolean,

        content?: string
    }

}

declare class TextAreaInput extends Scrollable {
    constructor(
        scene: Phaser.Scene,
        config?: TextAreaInput.IConfig
    );

    text: string;
    setText(text: string): this;
    appendText(text: string): this;

    scrollToLine(lineIndex: number): this;
    scrollToNextLine(lineCount?: number): this;

    readonly lineIndex: number;
    readonly lineHeight: number;
    readonly linesCount: number;
}