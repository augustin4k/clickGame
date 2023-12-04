import DOMInterface from './DOMInterface.js';
import AbstractDOMElement from './AbstractDOMElement.js';

export default class HandleBar extends AbstractDOMElement {
    constructor(owner) {
        super(owner);
        DOMInterface.getCounterElement().addEventListener('click', () =>
            this.#handleClick()
        );
    }

    #handleClick() {
        super.handleClick();
        this.owner.startGame();
    }
}

