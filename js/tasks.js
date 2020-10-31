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
            let elemParent = elem.closest(`.product-box__item`);
            let prodPriece = findProdPrice(elemParent);
            if (prodPriece >= 30) {
                elemParent.classList.add('hide');
            }
        }
    } else if (PRICE_SELECT.value === `50`) {
        for (let i = 0; i < PRODUCT_LIST.length; i++) {
            let elem = PRODUCT_LIST[i];
            let elemParent = elem.closest(`.product-box__item`);
            let prodPriece = findProdPrice(elemParent);
            if (prodPriece >= 50) {
                elemParent.classList.add('hide');
            }
        }
    } else if (PRICE_SELECT.value === `100`) {
        for (let i = 0; i < PRODUCT_LIST.length; i++) {
            let elem = PRODUCT_LIST[i];
            let elemParent = elem.closest(`.product-box__item`);
            let prodPriece = findProdPrice(elemParent);
            if (prodPriece >= 100) {
                elemParent.classList.add('hide');
            }
        }
    } else if (PRICE_SELECT.value === `150`) {
        for (let i = 0; i < PRODUCT_LIST.length; i++) {
            let elem = PRODUCT_LIST[i];
            let elemParent = elem.closest(`.product-box__item`);
            let prodPriece = findProdPrice(elemParent);
            if (prodPriece >= 150) {
                elemParent.classList.add('hide');
            }
        }
    }
};
PRICE_SELECT.onclick = productFilter;
CATEGORY_SELECT.onclick = productFilter;


/*--------------------------------------------------------------------------------*/
/*let orderFormRender__1 = function () {
 mainContainer += `<div class="order-form-container">`;
 mainContainer += `<div class="order-form">`;
 mainContainer += `<input id="order-form__name" type="text" placeholder="Имя"/>`;
 mainContainer += `<input id="order-form__email" type="email" placeholder="Email"/>`;
 mainContainer += `<input id="order-form__btn" type="submit" value="Отправить"/>`;
 mainContainer += `</div>`;
 mainContainer += `</div>`;
 };
 orderFormRender__1();*/
/*------------------------------------Form Submit --------------------------------*/
let orderFormRender = function () {
    document.body.style.overflowY = 'hidden';
    let orderFormContainer = document.createElement('div');
    let orderForm = document.createElement('form');
    let userNameInput = document.createElement('input');
    let userEmailInput = document.createElement('input');
    let orderFormBtn = document.createElement('input');
    userNameInput.setAttribute(`type`, `text`);
    userEmailInput.setAttribute(`type`, `email`);
    orderFormBtn.setAttribute(`type`, `submit`);
    userNameInput.setAttribute(`placeholder`, `Имя`);
    userEmailInput.setAttribute(`placeholder`, `Email`);
    orderFormBtn.setAttribute(`value`, `Отправить`);
    orderFormBtn.innerText = `Отправить`;
    userNameInput.setAttribute(`id`, `order-form__name`);
    userEmailInput.setAttribute(`id`, `order-form__email`);
    orderFormContainer.setAttribute(`id`, `order-form-container`);
    orderFormContainer.classList.add('order-form-container');
    orderForm.classList.add('order-form');
    orderFormBtn.classList.add('order-form__btn');
    mainContainer.appendChild(orderFormContainer);
    orderFormContainer.appendChild(orderForm);
    orderForm.appendChild(userNameInput);
    orderForm.appendChild(userEmailInput);
    orderForm.appendChild(orderFormBtn);
    orderFormBtn.onclick = orderFormValidation;
    userEmailInput.onfocus = function () {
        userEmailInput.setAttribute(`placeholder`, ``);
    };
    userNameInput.onfocus = function () {
        userNameInput.setAttribute(`placeholder`, ``);
    }
};

let orderFormValidation = function (e) {
    e.preventDefault();
    let tmp1 = userNameInputValidation();
    let tmp2 = userEmailInputValidation();
    let orderFormContainer = document.getElementById('order-form-container');
    if (tmp1 === true && tmp2 === true) {
        alert('Спасибо за покупку!!! Ваш заказ принят.');
        orderFormContainer.remove();
    }
};

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
BTN_CHECK.onclick = orderFormRender;



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
        if (tmp !== undefined) {
            return tmp;
        }
    }
};

let findprodQuantity = function (node) {
    if (node.classList.contains('qty__item')) {
        return node.value;

    }
    for (let i = 0; i < node.children.length; i++) {
        let tmp = findprodQuantity(node.children[i]);
        if (tmp !== undefined) {
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


document.onclick = function (e) {
    let prodPrice;
    let prodQuantity;
    if (e.target.classList.contains('product-box__btn')) {
        let productNode = e.target.closest('.product-box__item');
        prodPrice = findProdPrice(productNode);
        prodQuantity = findprodQuantity(productNode);
        cartCount(prodQuantity, prodPrice);
    }
};




