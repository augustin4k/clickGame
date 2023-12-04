import DOMInterface from "./DOMInterface.js";
import AbstractDOMElement from './AbstractDOMElement.js'

export default class SpanElement extends AbstractDOMElement {
    #currType;
    constructor(owner) {
        super(owner);
        // for changing any attributes globally for parent element
        this.#createElement();
    }
    
    #createElement() {
        const types = DOMInterface.getCollectTypes();
        const backgroundColors = DOMInterface.getBackgroundColors();
        const element = document.createElement('span');
        this.#setSizeAndPosition(element);
        element.addEventListener('click', (event) => {
            this.#handleClick(event.target, this.#currType);
        });
        DOMInterface.getGameArea().appendChild(element);
        // take a random value from those provided
        const type = types[Math.floor(Math.random() * types.length)];
        if (['change', 'collect'].includes(type)) {
            let totalPass = DOMInterface.getTotalPass();
            totalPass++;
            DOMInterface.setTotalPass(totalPass);
        }
        if (type != 'change') {
            element.classList.add(type)
            this.#currType = type;
            return;
        }
        // choose a value between collect and avoid
        let toogleType = Math.round(Math.random());
        this.#currType = types[toogleType];
        element.classList.add(`${types[toogleType]}`);
        element.classList.add(`change`);
        
        const randomDuration = Math.floor(Math.random() * 3000) + 2000; // Random value between 1000 and 3000 milliseconds (1 to 3 seconds)
        const intervalID = setInterval(() => {
            // toogle value
            toogleType = Math.abs(toogleType - 1);
            // lets collect information about styles
            element.style.backgroundColor =
                backgroundColors[toogleType];
            this.#currType = types[toogleType];
        }, randomDuration);
        // PUSH NEW INTERVAL ID FOR TO CLEAR IN FUTURE
        DOMInterface.setIntervalIds(intervalID);
    }

    #generateRandomPosition(size) {
        const x = Math.abs(Math.random() * (window.innerWidth - size));
        let y = Math.abs(Math.random() * (window.innerHeight - size));
        const offsetTop  = DOMInterface.getGameArea().offsetTop + 5;
        if (y < offsetTop) y = offsetTop;

        return { left: x, top: y };
    }

    #setSizeAndPosition(element) {
        const randomValue = Math.floor(Math.random() * (50 - 30 + 1)) + 30; // between 30 and 50
        element.style.width = `${randomValue}px`;
        element.style.height = `${randomValue}px`;

        const { left, top } = this.#generateRandomPosition(randomValue);
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
    }

    #handleClick(element, type) {
        super.handleClick();
        const gameAreaDom = DOMInterface.getGameArea();
        if (type === 'collect') {
            let score = DOMInterface.getScore();
            score++;
            DOMInterface.setScore(score);
            gameAreaDom.removeChild(element);
            if (DOMInterface.getScore() == DOMInterface.getTotalPass()) {
                this.owner.setOverGame(true);
                return;
            }
        } else if (type === 'avoid') {
            this.owner.setOverGame(false);
            return;
        }

        DOMInterface.updateCounter();
    }

}