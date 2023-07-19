import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('user', './assets/images/person.png');
        this.load.image('password', './assets/images/key.png');
    }

    create() {
        var print = this.add.text(0, 0, '');

        var dialog = CreateFeedbackDialog(this)
            .setPosition(400, 300)
            .layout()
            .popUp(500)
            .on('send', function (content) {
                print.text = `Send: '${content}'`;
            })

    }

    update() { }
}

var CreateFeedbackDialog = function (scene, config) {
    var dialog = scene.rexUI.add.dialog({
        space: {
            left: 20, right: 20, top: 20, bottom: -20,
            title: 10,
            content: 10,
            action: 30

        },

        background: scene.rexUI.add.roundRectangle({
            radius: 20, color: COLOR_PRIMARY
        }),

        title: CreateTitle(scene).setText('Feedback'),

        content: CreateCanvasInput(scene),

        actions: [
            CreateButton(scene).setText('Send'),
            CreateButton(scene).setText('Close'),
        ],

        expand: {
            title: false,
        }
    })

    dialog
        .on('action.click', function (button, index, pointer, event) {
            if (index === 0) { // Send button                
                var content = dialog.getElement('content').text;                
                dialog.emit('send', content);
            }

            dialog.scaleDownDestroy(500);
        });

    return dialog;
}

var CreateCanvasInput = function (scene) {
    return scene.rexUI.add.canvasInput({
        width: 400, height: 300,
        background: {
            color: '#260e04',

            stroke: null,
            'focus.stroke': 'white',
        },

        style: {
            fontSize: 20,
            backgroundBottomY: 1,
            backgroundHeight: 20,

            'cursor.color': 'black',
            'cursor.backgroundColor': 'white',
        },

        textArea: true,
    })
}

var CreateTitle = function (scene) {
    return scene.add.text(0, 0, '', { fontSize: 30 });

    // Or using Label
    // return scene.rexUI.add.label({
    //     space: { left: 10, right: 10, top: 10, bottom: 10, },
    // 
    //     background: scene.rexUI.add.roundRectangle({
    //         radius: 10, color: COLOR_LIGHT
    //     }),
    // 
    //     text: scene.add.text(0, 0, '', { fontSize: 30 }),
    // })


}

var CreateButton = function (scene) {
    return scene.rexUI.add.label({
        space: { left: 10, right: 10, top: 10, bottom: 10, },

        background: scene.rexUI.add.roundRectangle({
            radius: 10, color: COLOR_DARK, strokeColor: COLOR_LIGHT
        }),

        text: scene.add.text(0, 0, '', { fontSize: 20 }),
    })
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
        createContainer: true
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);