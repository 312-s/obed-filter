import DomGenerator from './dom-generator.js';

export default class GoToTop {
    init() {
        window.addEventListener('scroll', (event) => {
            if (this.#isHidden() && window.scrollY > window.innerHeight) {
                this.#show();
            } else if (this.#isShown() && window.scrollY < window.innerHeight) {
                this.#hide();
            }
        });

        this.#injectButton()
    }

    #injectButton() {
        this.#button.addEventListener('click', this.#onButtonClick);
        this.#hide();
        this.#place.prepend(this.#button);
    }

    #onButtonClick = () => {
        window.scrollTo(0, 0);
    }

    #hide() {
        this.#button.classList.add(this.#hiddenClass);
        this.#button.classList.remove(this.#shownClass);
    }

    #show() {
        this.#button.classList.add(this.#shownClass);
        this.#button.classList.remove(this.#hiddenClass);
    }

    #isHidden() {
        return this.#button.classList.contains(this.#hiddenClass);
    }

    #isShown() {
        return this.#button.classList.contains(this.#shownClass);
    }

    #button = DomGenerator.generateGoToTopButton();
    #place = document.body;
    #hiddenClass = 'go-to-top__hidden';
    #shownClass = 'go-to-top__shown';
}
