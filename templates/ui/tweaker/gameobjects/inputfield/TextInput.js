import Sizer from '../../../sizer/Sizer.js';
import InputFiledBase from './InputFieldBase.js';
import CreateCanvasInput from './CreateCanvasInput.js';

class TextInput extends InputFiledBase(Sizer) {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var sizerConfig = {
            orientation: 0, // x            
        }
        super(scene, sizerConfig);

        var inputTextConfig = config.inputText;
        var inputText = CreateCanvasInput(scene, inputTextConfig);

        this.add(
            inputText,
            { proportion: 1, expand: true }
        )

        this.addChildrenMap('inputText', inputText);

        inputText.on('close', this.onValueChange, this);
    }

    get value() {
        return this.childrenMap.inputText.value;
    }

    set value(value) {
        this.childrenMap.inputText.value = value;
    }

}

export default TextInput;