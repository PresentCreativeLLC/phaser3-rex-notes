import Sizer from '../sizer/Sizer.js';
import Build from './methods/Build.js';
import SetValueMethods from './methods/SetValueMethods.js';

class NameValueLabel extends Sizer {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexNameValueLabel';

        Build.call(this, scene, config);
    }

    // Access nameText game object
    get nameText() {
        var textObject = this.childrenMap.name;
        if (textObject === undefined) {
            return '';
        }
        return textObject.text;
    }

    set nameText(value) {
        var textObject = this.childrenMap.name;
        if (textObject === undefined) {
            return;
        }
        textObject.setText(value);
    }

    setNameText(value) {
        this.nameText = value;
        return this;
    }

    // Access valueText game object
    get valueText() {
        var textObject = this.childrenMap.value;
        if (textObject === undefined) {
            return '';
        }
        return textObject.text;
    }

    set valueText(value) {
        var textObject = this.childrenMap.value;
        if (textObject === undefined) {
            return;
        }
        textObject.setText(value);
    }

    setValueText(value) {
        this.valueText = value;
        return this;
    }

    // Accrss bar game object
    get barValue() {
        var bar = this.childrenMap.bar;
        if (bar === undefined) {
            return;
        }
        return bar.value;
    }

    set barValue(value) {
        var bar = this.childrenMap.bar;
        if (bar === undefined) {
            return;
        }
        bar.setValue(value);
    }

    setBarValue(value, min, max) {
        var bar = this.childrenMap.bar;
        if (bar === undefined) {
            return this;
        }
        bar.setValue(value, min, max);
        return this;
    }

    easeBarValueTo(value, min, max) {
        var bar = this.childrenMap.bar;
        if (bar === undefined) {
            return this;
        }
        bar.easeValueTo(value, min, max);
        return this;
    }

    // Access icon game object
    setTexture(key, frame) {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return;
        }
        imageObject.setTexture(key, frame);
        return this;
    }

    get texture() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.texture;
    }

    get frame() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.frame;
    }

}

Object.assign(
    NameValueLabel.prototype,
    SetValueMethods,
)

export default NameValueLabel;