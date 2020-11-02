`use strict`;

let mainContainer = document.getElementById(`js-container`);
const PRICE_SELECT = document.getElementById(`priceSelect`);
const CATEGORY_SELECT = document.getElementById(`categorySelect`);
const PRODUCT_LIST = document.getElementsByClassName(`product-box__item`);
const BTN_CHECK = document.getElementById(`js-btn-check`);
let cartQuantityNode = document.getElementById(`prod-count`);
let cartPriceNode = document.getElementById(`prod-total-price`);
cartQuantityNode.innerText = `0`;
cartPriceNode.innerText = `0`;
let cartQuantity;
let cartPrice;


/*--------------------------------------------------------------------------*/
/*------------------------------------Filter--------------------------------*/
let productFilter = function () {
    if (CATEGORY_SELECT.value === `0`) {
        for (let i = 0; i < PRODUCT_LIST.length; i++) {
            let elem = PRODUCT_LIST[i];
            elem.classList.remove('hide');
        }
    } else if (CATEGORY_SELECT.value === `1`) {
        for (let i = 0; i < PRODUCT_LIST.length; i++) {
            let elem = PRODUCT_LIST[i];
            elem.classList.remove('hide');
            if (elem.getAttribute('data-category') !== 'breakfast') {
                elem.classList.add('hide');
            }
        }
    } else if (CATEGORY_SELECT.value === `2`) {
        for (let i = 0; i < PRODUCT_LIST.length; i++) {
            let elem = PRODUCT_LIST[i];
            elem.classList.remove('hide');
            if (elem.getAttribute('data-category') !== 'first course') {
                elem.classList.add('hide');
            }
        }
    } else if (CATEGORY_SELECT.value === `3`) {
        for (let i = 0; i < PRODUCT_LIST.length; i++) {
            let elem = PRODUCT_LIST[i];
            elem.classList.remove('hide');
            if (elem.getAttribute('data-category') !== 'garnish') {
                elem.classList.add('hide');
            }
        }
    }
    if (PRICE_SELECT.value === `30`) {
        for (let i = 0; i < PRODUCT_LIST.length; i++) {
            let elem = PRODUCT_LIST[i];
            let prodPriece = findProdPrice(elem);
            if (prodPriece >= 30) {
                elem.classList.add('hide');
            }
        }
    } else if (PRICE_SELECT.value === `50`) {
        for (let i = 0; i < PRODUCT_LIST.length; i++) {
            let elem = PRODUCT_LIST[i];
            let prodPriece = findProdPrice(elem);
            if (prodPriece >= 50) {
                elem.classList.add('hide');
            }
        }
    } else if (PRICE_SELECT.value === `100`) {
        for (let i = 0; i < PRODUCT_LIST.length; i++) {
            let elem = PRODUCT_LIST[i];
            let prodPriece = findProdPrice(elem);
            if (prodPriece >= 100) {
                elem.classList.add('hide');
            }
        }
    } else if (PRICE_SELECT.value === `150`) {
        for (let i = 0; i < PRODUCT_LIST.length; i++) {
            let elem = PRODUCT_LIST[i];
            let prodPriece = findProdPrice(elem);
            if (prodPriece >= 150) {
                elem.classList.add('hide');
            }
        }
    }
};
PRICE_SELECT.addEventListener('click', productFilter);
CATEGORY_SELECT.addEventListener('click', productFilter);


/*--------------------------------------------------------------------------------*/
/*------------------------------------Form Submit --------------------------------*/
let orderFormRender = function () {
    let orderFormContainer = document.createElement('div');
    orderFormContainer.setAttribute(`id`, `order-form-container`);
    orderFormContainer.classList.add('order-form-container');
    mainContainer.appendChild(orderFormContainer);
    orderFormContainer.innerHTML = `
    <form class="order-form">
        <input id="order-form__name" type="text" placeholder="Имя"/>
        <input id="order-form__email" type="email"  placeholder="Email"/>
        <input id="order-form__btn" class="order-form__btn" type="submit" value="Отправить"/>
    </form>`;
};


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('order-form__btn')) {
        e.preventDefault();
        let tmp1 = userNameInputValidation();
        let tmp2 = userEmailInputValidation();
        let orderFormContainer = document.getElementById('order-form-container');
        if (tmp1 === true && tmp2 === true) {
            alert('Спасибо за покупку!!! Ваш заказ принят.');
            orderFormContainer.remove();
        }
    }
});


let userNameInputValidation = function () {
    let userNameInput = document.getElementById('order-form__name');
    let userNameInputValue = userNameInput.value;
    let spaceCheck = userNameInputValue.trim();
    if (userNameInputValue === '' || spaceCheck.length === 0) {
        alert('Необходимо ввести имя');
        return false;
    } else {
        return true;
    }
};

let userEmailInputValidation = function () {
    let userEmailInput = document.getElementById('order-form__email');
    let userEmailInputValue = userEmailInput.value;
    let res;
    const RE = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    res = RE.test(String(userEmailInputValue).toLowerCase());
    if (!res) {
        alert('Неправильный имейл');
        return false;
    } else {
        return true;
    }
};
BTN_CHECK.addEventListener('click', orderFormRender);


/*--------------------------------------------------------------------------------*/
/*------------------------------------ Shopping  cart --------------------------------*/
let findProdPrice = function (node) {
    if (node.hasAttribute('data-price')) {
        let prodPriceText;
        let prodPrice;
        prodPriceText = node.innerText;
        prodPrice = parseInt(prodPriceText.match(/\d+/));
        return prodPrice;
    }
    for (let i = 0; i < node.children.length; i++) {
        let tmp = findProdPrice(node.children[i]);
        if (tmp) {
            return tmp;
        }
    }
};

let findProdQuantity = function (node) {
    if (node.hasAttribute('data-quantity')) {
        return node.value;
    }
    for (let i = 0; i < node.children.length; i++) {
        let tmp = findProdQuantity(node.children[i]);
        if (tmp) {
            return tmp;
        }
    }
};


let cartCount = function (quantity, price) {
    cartQuantity = Number(cartQuantityNode.innerText) + Number(quantity);
    cartPrice = Number(cartPriceNode.innerText) + quantity * price;
    cartQuantityNode.innerText = cartQuantity;
    cartPriceNode.innerText = cartPrice;
};

document.addEventListener('click', (e) => {
    let prodPrice;
    let prodQuantity;
    if (e.target.classList.contains('product-box__btn')) {
        let productNode = e.target.closest('.product-box__item');
        prodPrice = findProdPrice(productNode);
        prodQuantity = findProdQuantity(productNode);
        cartCount(prodQuantity, prodPrice);
    }
});




