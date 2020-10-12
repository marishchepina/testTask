let mainContainer = document.getElementById(`js-container`);
let priceSelect = document.getElementById(`priceSelect`);
let categorySelect = document.getElementById(`categorySelect`);
let productList = document.getElementsByClassName(`product-box__item`);
let btnCheck = document.getElementById(`js-btn-check`);
let priceList = document.getElementsByTagName(`p`);
let PruductBuyBtn = document.getElementsByClassName(`product-box__btn`);


/*------------------------------------Filter--------------------------------*/
let productFilter = function () {
    if (categorySelect.value == `0`) {
        for (let i = 0; i < productList.length; i++) {
            let elem = productList[i];
            elem.classList.remove("hide");
        }
    }
    else if (categorySelect.value == `1`) {
        for (let i = 0; i < productList.length; i++) {
            let elem = productList[i];
            elem.classList.remove("hide");
            if (elem.getAttribute('data-category') !== "breakfast") {
                elem.classList.add("hide");
            }
        }
    }
    else if (categorySelect.value == `2`) {
        for (let i = 0; i < productList.length; i++) {
            let elem = productList[i];
            elem.classList.remove("hide");
            if (elem.getAttribute('data-category') !== "first course") {
                elem.classList.add("hide");
            }
        }
    }
    else if (categorySelect.value == `3`) {
        for (let i = 0; i < productList.length; i++) {
            let elem = productList[i];
            elem.classList.remove("hide");
            if (elem.getAttribute('data-category') !== "garnish") {
                elem.classList.add("hide");
            }
        }
    }
    if (priceSelect.value === `0`) {
    }
    else if (priceSelect.value === `30`) {
        for (let i = 0; i < priceList.length; i++) {
            let elem = priceList[i];
            let elemParent = elem.closest(`.product-box__item`);
            let elemPrice = Number(elem.getAttribute('data-price'));
            if (elemPrice >= 30) {
                elemParent.classList.add("hide");
            }
        }
    }
    else if (priceSelect.value === `50`) {
        for (let i = 0; i < priceList.length; i++) {
            let elem = priceList[i];
            var elemParent = elem.closest(`.product-box__item`);
            let elemPrice = Number(elem.getAttribute('data-price'));
            if (elemPrice >= 50) {
                elemParent.classList.add("hide");
            }
        }
    }
    else if (priceSelect.value === `100`) {
        for (let i = 0; i < priceList.length; i++) {
            let elem = priceList[i];
            var elemParent = elem.closest(`.product-box__item`);
            let elemPrice = Number(elem.getAttribute('data-price'));
            if (elemPrice >= 100) {
                elemParent.classList.add("hide");
            }
        }
    }
    else if (priceSelect.value === `150`) {
        for (let i = 0; i < priceList.length; i++) {
            let elem = priceList[i];
            var elemParent = elem.closest(`.product-box__item`);
            let elemPrice = Number(elem.getAttribute('data-price'));
            if (elemPrice >= 150) {
                elemParent.classList.add("hide");
            }
        }
    }
};
priceSelect.onclick = productFilter;
categorySelect.onclick = productFilter;
/*--------------------------------------------------------------------------------*/
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
    }
    userNameInput.onfocus = function () {
        userNameInput.setAttribute(`placeholder`, ``);
    }

}

let orderFormValidation = function (e) {
    e.preventDefault();
    let tmp1 = userNameInputValidation();
    let tmp2 = userEmailInputValidation();
    let orderFormSend = document.getElementById("js-btn-check");
    let orderFormContainer = document.getElementById("order-form-container");
    if (tmp1 == true && tmp2 == true) {
        alert("Спасибо за покупку!!! Ваш заказ принят.");
        orderFormContainer.remove();
    }
    else {

    }
}

let userNameInputValidation = function () {
    let userNameInput = document.getElementById("order-form__name");
    let userNameInputValue = userNameInput.value;
    let spaceCheck = userNameInputValue.trim();
    if (userNameInputValue == "" || spaceCheck.length == 0) {
        alert("Необходимо ввести имя");
        return false;
    }
    else {
        return true;
    }
}

let userEmailInputValidation = function () {
    let userEmailInput = document.getElementById("order-form__email");
    let userEmailInputValue = userEmailInput.value;
    let res;
    const RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    res = RE.test(String(userEmailInputValue).toLowerCase());
    if (!res) {
        alert("Неправильный имейл");
        return false;
    }
    else {
        return true;
    }
}
btnCheck.onclick = orderFormRender;


/*--------------------------------------------------------------------------------*/
/*------------------------------------ Shopping  basket --------------------------------*/



/*
 var myFunction = function() {
 var attribute = this.getAttribute("data-myattribute");
 alert(attribute);
 };

 for (var i = 0; i < classname.length; i++) {
 classname[i].addEventListener('click', myFunction, false);
 }*/


let ProductPriceCount = function () {
    let elemParent = this.closest(`.product-box__item`);
    let elem;
    let productsCount;
    let prodPrice;
    let sumPrice;
    let productsCountElement = null;

    elem = elemParent.lastElementChild.children[0];
    prodPrice = Number(elem.getAttribute('data-price'));
    console.log(prodPrice);

    productsCount = 1;
    productsCountElement =  elemParent.lastElementChild.children[1].children[0];
    productsCountElement.setAttribute(`value`, `1`);





    /*for (let i = 0; i < elemParent.childNodes.length; i++) {
        if (elemParent.childNodes[i].className == "qty__item") {
            productsCountElement = elemParent.childNodes[i];
            console.log(productsCountElement);
            break;
        }
    }*/
}

    for (let i = 0; i < PruductBuyBtn.length; i++) {
        PruductBuyBtn[i].addEventListener('click', ProductPriceCount);
    }