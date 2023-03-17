export default class Product {
    #cardNode;
    #price;

    constructor(cardNode) {
        const cardPriceSelector = '.ob-restaurantList__base-price';

        this.#cardNode = cardNode;
        this.#price = Number.parseInt(this.#cardNode.querySelector(cardPriceSelector).textContent);
    }

    hide() {
        this.#cardNode.style.display = 'none';
    }

    show() {
        this.#cardNode.style.display = 'flex';
    }

    order(order) {
        this.#cardNode.style.order = order;
    }

    get price() {
        return this.#price;
    }
}
