import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import EventEmitter from 'eventemitter3';
import MainEventSheet from 'raw-loader!/assets/markedeventsheet/next-round/main.md';
import TaskEventSheet from 'raw-loader!/assets/markedeventsheet/next-round/task.md';
import TestRoundCounterEventSheet from 'raw-loader!/assets/markedeventsheet/next-round/round-counter.md';


class CommandExecutor extends EventEmitter {
    print({ text = '' } = {}, manager) {
        console.log(text);
        this.wait({ duration: 1000 });
        return this;
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
    .addEventSheet(MainEventSheet)
    .addEventSheet(TaskEventSheet)
    .addEventSheet(TestRoundCounterEventSheet)

console.log(manager.dumpTrees())

manager.setData('coin', 3)
console.log(manager.memory)

manager.on('complete', function () {
    if (manager.$roundCounter < 10) {
        // Run next round
        manager.updateRoundCounter();
        console.log(`---- Round : ${manager.$roundCounter} ----`)
        manager.start();
    }
})

manager.start()


