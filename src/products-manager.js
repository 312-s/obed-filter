import Product from "./product.js";

export default class ProductsManager {
    constructor() {
        this.#initProductsByCategory();
    }

    #products = Array.from(document.querySelectorAll('.js-food-item')).map(product => {
        return new Product(product);
    }).sort((a, b) => a.price - b.price);

    #productsByCategories = [];

    #rangeModifications = {
        indexStart: 0,
        indexEnd: this.#products.length
    }

    filterProducts(minPrice, maxPrice) {
        const newIndexStart = minPrice ? this.#products.findIndex(product => product.price >= minPrice) : 0;
        const newIndexEnd = maxPrice ? this.#products.findLastIndex(product => product.price <= maxPrice) : this.#products.length - 1;

        if (newIndexStart === 0 && newIndexEnd === this.#products.length - 1) {
            this.#discardChanges();
        } else if (newIndexStart > this.#rangeModifications.indexEnd && newIndexEnd > this.#rangeModifications.indexEnd ||
            newIndexStart < this.#rangeModifications.indexStart && newIndexEnd < this.#rangeModifications.indexStart) {
            this.#hideElements(this.#rangeModifications.indexStart, this.#rangeModifications.indexEnd);
            this.#showElements(newIndexStart, newIndexEnd);
        } else {
            if (newIndexEnd - this.#rangeModifications.indexEnd > 0) {
                this.#showElements(this.#rangeModifications.indexEnd, newIndexEnd);
            } else if (newIndexEnd - this.#rangeModifications.indexEnd < 0) {
                this.#hideElements(newIndexEnd, this.#rangeModifications.indexEnd)
            }

            if (newIndexStart - this.#rangeModifications.indexStart > 0) {
                this.#hideElements(this.#rangeModifications.indexStart, newIndexStart)
            } else if (newIndexStart - this.#rangeModifications.indexStart < 0) {
                this.#showElements(newIndexStart, this.#rangeModifications.indexStart);
            }
        }

        this.#rangeModifications.indexStart = newIndexStart;
        this.#rangeModifications.indexEnd = newIndexEnd;
    }

    sortDescending() {
        this.#productsByCategories.forEach(productsCategory => {
            productsCategory.sort((a, b) => b.price - a.price);
            productsCategory.forEach((product, index) => product.order(index));
        });
    }

    sortAscending() {
        this.#productsByCategories.forEach(productsCategory => {
            productsCategory.sort((a, b) => a.price - b.price);
            productsCategory.forEach((product, index) => product.order(index));
        });
    }

    #hideElements(from, to) {
        for (let i = from; i < to; i++) {
            this.#products[i].hide();
        }
    }

    #showElements(from, to) {
        for (let i = from; i < to; i++) {
            this.#products[i].show();
        }
    }

    #initProductsByCategory() {
        const categoriesNode = document.querySelectorAll('.ob-restaurantList__wrap');
        categoriesNode.forEach(productContainer => {
            this.#productsByCategories.push(Array.from(productContainer.querySelectorAll('.js-food-item')).map(product => new Product(product)));
        })
    }

    #discardChanges() {
        this.#showElements(0, this.#rangeModifications.indexStart - 1);
        this.#showElements(this.#rangeModifications.indexStart, this.#products.length - 1);
    }
}

