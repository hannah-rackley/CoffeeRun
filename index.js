var coffeeOrderForm = document.querySelector(".coffee-order-form");
var deleteForm = document.querySelector(".remove-orders");
var completedOrderForm = document.querySelector(".change-order-status");
var orderList = document.querySelector('.order-list');
var completedList = document.querySelector('.completed-order-list');
var orderListArray = [];
var completedOrderArray = [];

var addPendingOrderOnPage = function(orderObject) {
        orderListArray.push(orderObject);
        var orderArray = [orderObject["Size"], orderObject["Order"], "with a shot of ", orderObject["Flavor"], "and", orderObject["Caffeine"], "milligrams of caffeine for ", orderObject["Email"]]
        var order = document.createElement('li');
        order.setAttribute('class', 'order');
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
        "Order": coffeeOrder.value,
        "Email": emailInput.value,
        "Size": size.value, 
        "Flavor": flavorShot.value,
        "Caffeine": caffeineRating.value, 
        "Checkbox": checkBox.checked, 
    }
    addPendingOrderOnPage(orderContent);
}

// var addCompletedOrderOnPage = function(array) {
//     array.forEach(function(order) {
//         var orderArray = [order["size"], order["Order"], "with a shot of ", order["Flavor"], "and", order["Caffeine"], "milligrams of caffeine for ", order["Email"]]
//         var order = document.createElement('li');
//         order.setAttribute('class', 'order');
//         order.textContent = orderArray.join(" ");
//         var checkBox =   document.createElement("input");
//         checkBox.setAttribute('type', 'checkbox');
//         checkBox.setAttribute('class', 'checkbox')
//         order.appendChild(checkBox);
//         completedList.appendChild(order);
//     });     
    
// }

var getLocalStorage = function() {
    var pending = localStorage.getItem('pending-orders');
    var pendingArray = JSON.parse(pending);
    if (pendingArray != null) {
        pendingArray.forEach(function(order) {
            addPendingOrderOnPage(order);
        });
    }
    // var completed = localStorage.getItem('completed-orders')
    // var completedArray = JSON.parse(completed);
    // addCompletedOrderOnPage(completedArray);
}

getLocalStorage();

var updateOrderLists = function() {
    localStorage.setItem('pending-orders', JSON.stringify(orderListArray));
    // localStorage.setItem('completed-orders', JSON.stringify(completedOrderArray))
}

var handleSubmit = function(event) {
    event.preventDefault();
    createOrder();
    updateOrderLists();
}

var handleCompletedButton = function(event) {
    event.preventDefault();
    checkBoxOrders = orderList.querySelectorAll('input[type=checkbox]:checked')
    checkBoxOrders.forEach(function(element, position) {
        parent = element.parentElement;
        completedList.appendChild(parent);
        var order = orderListArray.splice(position, 1);
        completedOrderArray.push(order);
    });
    updateOrderLists();
}

var deleteOrder = function(event) {
    event.preventDefault();
    checkBoxOrders = orderList.querySelectorAll('input[type=checkbox]:checked')
    completedCheckBoxOrders = completedList.querySelectorAll('input[type=checkbox]:checked')
    checkBoxOrders.forEach(function(element, position) {
        parent = element.parentElement;
        if (parent.parentNode) {
            parent.parentNode.removeChild(parent);
            orderListArray.splice(position, 1);
        }
    });
    completedCheckBoxOrders.forEach(function(element, position) {
        parent = element.parentElement;
        if (parent.parentNode) {
            parent.parentNode.removeChild(parent);
            completedOrderArray.splice(position, 1);
        }
    });
    updateOrderLists();
}

coffeeOrderForm.addEventListener('submit', handleSubmit);
completedOrderForm.addEventListener('submit', handleCompletedButton);
deleteForm.addEventListener('submit', deleteOrder)