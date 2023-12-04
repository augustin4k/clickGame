import DOMInterface from "./DOMInterface.js";
import AbstractDOMElement from './AbstractDOMElement.js';
import { config } from '../config.js';

export default class Form extends AbstractDOMElement {
    #baseUrl = config.baseUrl;

    constructor(owner) {
        super(owner);
        this.#openForm();
    }

    async #renderDashboard() {
        const dashboard = DOMInterface.getDashboard();
        // show it
        dashboard.classList.toggle('d-none');
        dashboard.classList.toggle('d-block');
        const tableBody = dashboard.querySelector('tbody');
        try {
            const response = await fetch(this.#baseUrl + '/topPlayers', {
                method: 'get',
            });
            const sortedPlayers = await response.json();
            sortedPlayers.forEach((player) => {
                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = player.name;

                const scoreCell = document.createElement('td');
                scoreCell.textContent = player.score;

                const timeCell = document.createElement('td');
                timeCell.textContent = player.time;

                row.appendChild(nameCell);
                row.appendChild(scoreCell);
                row.appendChild(timeCell);

                tableBody.appendChild(row);
            });
        } catch (error) {
            console.dir(error);
        }
    }

    #openForm() {
        // show form
        const formContainer = DOMInterface.getForm();
        const form = DOMInterface.getForm().querySelector('form');
        formContainer.classList.toggle('d-none');
        formContainer.classList.toggle('d-flex');
        form.querySelector('#score').value = DOMInterface.getScore();
        const time = DOMInterface.getChronoElement().textContent.replace(
            'Time: ',
            ''
        );
        form.querySelector('#time').value = time.replace('Time: ', '');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            try {
                await fetch(this.#baseUrl + '/addPlayer', {
                    method: 'POST',
                    body: formData,
                });
                // lets now to fetch our dashboard
                // hide form
                formContainer.classList.toggle('d-flex');
                formContainer.classList.toggle('d-none');
                await this.#renderDashboard();
            } catch (error) {
                console.dir(error);
            }
        });
    }
}