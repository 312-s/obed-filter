import DomGenerator from "./dom-generator";
import ProductsManager from './products-manager.js';

export default class FilterForm {
    init() {
        this.#injectForm();
    }

    #injectForm() {
        const formPlace = document.querySelector('.ob-supplier__content-col .ob-layout__box');
        formPlace.prepend(this.#formSectionElement);
        this.#formElement.addEventListener("submit", this.#onFormSubmit);
        this.#formElement.addEventListener('reset', this.#onFormReset)
    }

    #onFormSubmit = (event) => {
        event.preventDefault();
        const sortSettings = new FormData(event.currentTarget);
        const minPrice = Number(sortSettings.get('minPrice'));
        const maxPrice = Number(sortSettings.get('maxPrice'));

        if (minPrice > maxPrice) {
            alert('Нижняя граница не может быть больше верхней');
        } else {
            this.#filterOptions.maxPrice = maxPrice;
            this.#filterOptions.minPrice = minPrice;
            this.#setSortOption(sortSettings.get('sort'));
        }
    }

    #onFormReset = () => {
        this.#filterOptions.minPrice = 0;
        this.#filterOptions.maxPrice = 0;
    }

    #setSortOption(option) {
        if (option === 'ascending') {
            this.#filterOptions.sortAscending = true;
            this.#filterOptions.sortDescending = false;
        } else if (option === 'descending') {
            this.#filterOptions.sortDescending = true;
            this.#filterOptions.sortAscending = false;
        }
    }

    #formSectionElement = DomGenerator.generateFilterForm();
    #formElement = this.#formSectionElement.querySelector('form');
    #productManager = new ProductsManager();
    #filterOptions = new Proxy({
        minPrice: 0,
        maxPrice: 0,
        sortDescending: false,
        sortAscending: false,
    }, {
        set: (target, key, value) => {
            if (!(key in target)) {
                return false;
            }

            const oldValue = target[key];
            target[key] = value;

            if ((key === 'minPrice' || key === 'maxPrice') && oldValue !== target[key]) {
                this.#productManager.filterProducts(target.minPrice, target.maxPrice);
            } else if (key === 'sortDescending' && value) {
                this.#productManager.sortDescending();
            } else if (key === 'sortAscending' && value) {
                this.#productManager.sortAscending();
            }

            return true;
        }
    });
}
