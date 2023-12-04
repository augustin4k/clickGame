export default class DOMInterface {
    static #collectTypes = ['collect', 'avoid', 'change'];
    static #backgroundColors = ['green', 'red'];
    static #totalPass = 0;
    static #score = 0;
    static #intervalIDs = [];
    // common static elements
    static #gameArea = document.getElementById('game-area');
    static #counterElement = document.getElementById('counter');
    static #chronoElement = document.getElementById('chronometer');
    static #form = document.getElementById('showForm');
    static #dashboard = document.getElementById('showDashboard');

    static setScore(score) {
        this.#score = score;
    }
    static setTotalPass(totalPass) {
        this.#totalPass = totalPass;
    }
    static setIntervalIds(id) {
        this.#intervalIDs.push(id);
    }
    static setCounterElementContent(string) {
        this.#counterElement.textContent = string;
    }
    static setChronoElementContent(string) {
        this.#chronoElement.textContent = string;
    }
    static getCounterElement() {
        return this.#counterElement;
    }
    static getChronoElement() {
        return this.#chronoElement;
    }
    static getGameArea() {
        return this.#gameArea;
    }
    static getCollectTypes() {
        return this.#collectTypes;
    }
    static getTotalPass() {
        return this.#totalPass;
    }
    static getBackgroundColors() {
        return this.#backgroundColors;
    }
    static getIntervalIds() {
        return this.#intervalIDs;
    }
    static getScore() {
        return this.#score;
    }
    static getForm() {
        return this.#form;
    }
    static getDashboard() {
        return this.#dashboard;
    }

    static updateCounter(success = null) {
        if (success) {
            // finish with success
            this.#counterElement.classList.remove('btn-light');
            this.#counterElement.classList.add('btn-success');
            this.setCounterElementContent('Game is finished, congratulations!');
            return;
        } else if (success == false) {
            // finish with unsuccess
            this.setCounterElementContent(`You lost the game`);
            this.#counterElement.classList.remove('btn-light');
            this.#counterElement.classList.add('btn-danger');
            setTimeout(() => {
                this.#counterElement.classList.remove('btn-danger');
                this.#counterElement.classList.add('btn-primary');
                this.#counterElement.removeAttribute('disabled');
                this.setCounterElementContent('Restart your game');
                this.setScore(0);
            }, 2000);
            return;
        }

        if (this.getScore() > 0) {
            // during the game
            this.setCounterElementContent(`Score: ${this.getScore()}`);
        } else if (this.getScore() == 0) {
            // at starting of the game
            this.#counterElement.classList.remove('btn-primary');
            this.#counterElement.classList.add('btn-light');
            this.#counterElement.setAttribute('disabled', 'true');
        }
        return;
    }
}
