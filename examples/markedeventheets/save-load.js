import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import EventEmitter from 'eventemitter3';
import eventSheet0 from 'raw-loader!/assets/markedeventsheet/save-load/eventsheet0.md';
import eventSheet1 from 'raw-loader!/assets/markedeventsheet/save-load/eventsheet1.md';
import eventSheet2 from 'raw-loader!/assets/markedeventsheet/save-load/eventsheet2.md';

class CommandExecutor extends EventEmitter {
    print({ text = '' } = {}, manager) {
        console.log(text);
        // return this;
        // Task will be running until 'complete' event fired
    }

    set(config, manager) {
        for (var name in config) {
            manager.setData(name, config[name]);
        }
    }

    wait({ duration = 1000 } = {}, manager) {
        var self = this;
        setTimeout(function () {
            self.complete();
        }, duration)
        return this;
    }

    complete() {
        this.emit('complete');
        return this;
    }
}
var commandExecutor = new CommandExecutor();

var manager = new MarkedEventSheets({
    commandExecutor: commandExecutor
});
manager
    .addEventSheet(eventSheet0)
    .addEventSheet(eventSheet1)
    .addEventSheet(eventSheet2)

var OnEnterEventSheet = function (title, groupName, manager) {
    console.log(`eventsheet.enter: '${title}'`);

    if (title !== 'Event sheet 1') {
        manager.once('eventsheet.enter', OnEnterEventSheet)
        return;
    }

    // Save state at 'eventsheet.enter' of 'Event sheet 1'
    var stateData = manager.dumpState();
    console.log(stateData);
    console.log('===save state===')

    setTimeout(function () {
        console.log('===load state===')
        manager.loadState(stateData);
    }, 2500)
}

manager.once('eventsheet.enter', OnEnterEventSheet)

manager
    .setData('金幣', 1)
    .setData('hp', 4)
    .start()