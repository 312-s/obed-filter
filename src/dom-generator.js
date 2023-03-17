export default class DomGenerator {
    static generateFilterForm() {
        const form = document.createElement('section');
        form.classList.add('ob-restaurantList__wrap');
        form.innerHTML =
            `<form class="form-sorter" id="sort-settings">
                <div class="sorter">
                    <input type="radio" class="sorter__field" id="larger-to-smaller" name="sort" value="descending">
                    <label for="larger-to-smaller" class="sorter__label"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>sort-variant</title><path d="M3,13H15V11H3M3,6V8H21V6M3,18H9V16H3V18Z" /></svg></label>
                </div>
                <div class="sorter">
                    <input type="radio" class="sorter__field" id="smaller-to-larger" value="ascending" name="sort">
                    <label for="smaller-to-larger" class="sorter__label"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>sort-reverse-variant</title><path d="M3 11H15V13H3M3 18V16H21V18M3 6H9V8H3Z" /></svg></label>
                </div>
                <input type="radio" name="sort">
                <input type="number" class="ob-input" placeholder="Нижняя граница" name="minPrice">
                <input type="number" class="ob-input" placeholder="Верхняя граница" name="maxPrice">
                <button class="ob-btn">Фильтровать</button>
                <button type="reset" class="ob-btn">Сбросить</button>
            </form>`;
        return form;
    }
    static generateGoToTopButton() {
        const button = document.createElement('button');
        button.innerText = 'Вверх ⬆';
        button.classList.add('ob-btn', 'go-to-top');
        return button;
    }
}
