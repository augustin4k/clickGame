import DOMInterface from './DOMInterface.js'
import HandleBar from './HandleBar.js';
import SpanElement from './SpanElementClass.js';
import Form from './FormClass.js';
import { config } from '../config.js';

export default class Game {
    constructor() {
        new HandleBar(this)
    }

    startGame() {
        DOMInterface.updateCounter();
        // launch timer
        let time = 0;
        let intervalCrono = setInterval(() => {
            time++;
            DOMInterface.setChronoElementContent('Time: ' + time);
        }, 1000);
        DOMInterface.setIntervalIds(intervalCrono);
        // from env
        for (let index = 0; index < config.countElements; index++) {
            new SpanElement(this);
        }
    }

    setOverGame(success) {
        const gameArea = DOMInterface.getGameArea();
        // clear all area
        while (gameArea.firstChild) {
            gameArea.removeChild(gameArea.firstChild);
        }
        DOMInterface.getIntervalIds().forEach((intervalId) =>
            clearInterval(intervalId)
        );
        DOMInterface.updateCounter(success);
        // set total pass to 0
        DOMInterface.setTotalPass(0);
        if (success) {
            // open the from to ask user to introduce some data
            new Form(this);
        } else if (success == false) {
            // set back to 0 chrono
            DOMInterface.setChronoElementContent('Time: 0');
        }
    }
}