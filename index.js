var URL = "https://dc-coffeerun.herokuapp.com/api/coffeeorders";
function displayData(orders) {
    localStorage.setItem('coffeeOrders', JSON.stringify(orders))
    for (var property in orders) {
        addStoredOrders(orders[property]);
    };
}

$.get(URL, displayData);

var coffeeOrderForm = document.querySelector(".coffee-order-form");
var deleteForm = document.querySelector(".remove-orders");
var orderList = document.querySelector('.order-list');
var orderListArray = [];
var deleted;

var addStoredOrders = function(orderObject) {
    var orderArray = [orderObject["size"], orderObject["coffee"], "with a shot of ", orderObject["flavor"], "and", orderObject["strength"], "milligrams of caffeine for ", orderObject["emailAddress"]]
    var order = document.createElement('li');
    order.setAttribute('class', 'order');
    order.setAttribute('id', orderObject["emailAddress"]);
    order.textContent = orderArray.join(" ");
    var checkBox = document.createElement("input");
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('class', 'checkbox')
    order.appendChild(checkBox);
    orderList.appendChild(order);    
}

var createOrder = function() {
    var coffeeOrder = document.querySelector('[name="coffee-order"]');
    var emailInput = document.querySelector('[name="email"]');
    var size = document.querySelector('[name="size"]:checked');
    var flavorShot = document.querySelector('[name="flavor-shot"]');
    var caffeineRating = document.querySelector('[name="caffeine-rating"]');
    var checkBox = document.createElement("input");
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('class', 'checkbox')
    var orderContent = {
        coffee: coffeeOrder.value,
        emailAddress: emailInput.value,
        size: size.value, 
        flavor: flavorShot.value,
        strength: caffeineRating.value, 
        checkbox: checkBox.checked, 
    }
    orderListArray.push(orderContent);
    addStoredOrders(orderContent);
    $.post(URL, orderContent);
}

var handleSubmit = function(event) {
    event.preventDefault();
    createOrder();
}

var deleteOrder = function(event) {
    event.preventDefault();
    checkBoxOrders = orderList.querySelectorAll('input[type=checkbox]:checked')
    checkBoxOrders.forEach(function(element) {
        parent = element.parentElement;
        if (parent.parentNode) {
            parent.parentNode.removeChild(parent);
            var id = parent.getAttribute('id');
            deleted = URL + "/" + id;
        }
    });
}

coffeeOrderForm.addEventListener('submit', handleSubmit);
deleteForm.addEventListener('submit', deleteOrder);