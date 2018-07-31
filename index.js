var coffeeOrderForm = document.querySelector(".coffee-order-form");
var deleteForm = document.querySelector(".remove-orders");
var completedOrderForm = document.querySelector(".change-order-status");
var orderList = document.querySelector('.order-list');
var completedList = document.querySelector('.completed-order-list');
var orderListArray = [];
var completedOrderArray = [];
var deletedArray = [];

var handleSubmit = function(event) {
    event.preventDefault();
    createOrder();
}

var handleCompletedButton = function(event) {
    event.preventDefault();
    checkBoxOrders = orderList.querySelectorAll('input[type=checkbox]:checked')
    checkBoxOrders.forEach(function(element) {
        parent = element.parentElement;
        console.log(parent);
        completedList.appendChild(parent);
    });
}

var deleteOrder = function(event) {
    event.preventDefault();
    checkBoxOrders = orderList.querySelectorAll('input[type=checkbox]:checked')
    completedCheckBoxOrders = completedList.querySelectorAll('input[type=checkbox]:checked')
    checkBoxOrders.forEach(function(element) {
        parent = element.parentElement;
        if (parent.parentNode) {
            parent.parentNode.removeChild(parent);
        }
    });
    completedCheckBoxOrders.forEach(function(element) {
        parent = element.parentElement;
        if (parent.parentNode) {
            parent.parentNode.removeChild(parent);
        }
    });
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
        "Order": coffeeOrder.value,
        "Email": emailInput.value,
        "Size": size.value, 
        "Flavor": flavorShot.value,
        "Caffeine": caffeineRating.value, 
        "Checkbox": checkBox.checked, 
    }
    orderListArray.push(orderContent);
    var orderArray = [size.value, coffeeOrder.value, "with a shot of ", flavorShot.value, "and", caffeineRating.value, "milligrams of caffeine for ", emailInput.value]
    var order = document.createElement('li');
    order.setAttribute('class', 'order');
    order.textContent = orderArray.join(" ");
    order.appendChild(checkBox);
    orderList.appendChild(order);
}

// var createPosition = function() {
//     orderListArray.forEach(function(order, i) {
//         order.position = i;
//     });
// }

// createPosition();

coffeeOrderForm.addEventListener('submit', handleSubmit);
completedOrderForm.addEventListener('submit', handleCompletedButton);
deleteForm.addEventListener('submit', deleteOrder);