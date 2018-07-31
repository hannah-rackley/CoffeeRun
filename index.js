var URL = "https://dc-coffeerun.herokuapp.com/api/coffeeorders";
var globalOrders;
function storeData(orders) {
    localStorage.setItem('coffeeOrders', JSON.stringify(orders))
    for (var property in orders) {
        addStoredOrders(orders[property]);
    };
}
// var myData = {
//     coffee: 'espresso', 
//     emailAddress: 'hello@world.com',
//     strength: 30,
//     size: "tall",
//     flavor: "vanilla"
// }
// $.post(URL, myData);
$.get(URL, storeData);


var coffeeOrderForm = document.querySelector(".coffee-order-form");
var deleteForm = document.querySelector(".remove-orders");
var orderList = document.querySelector('.order-list');
var orderListArray = [];

var addStoredOrders = function(orderObject) {
    var orderArray = [orderObject["size"], orderObject["coffee"], "with a shot of ", orderObject["flavor"], "and", orderObject["strength"], "milligrams of caffeine for ", orderObject["emailAddress"]]
    var order = document.createElement('li');
    order.setAttribute('class', 'order');
    order.textContent = orderArray.join(" ");
    var checkBox = document.createElement("input");
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('class', 'checkbox')
    order.appendChild(checkBox);
    orderList.appendChild(order);    
}

var addPendingOrderOnPage = function(orderObject) {
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
    orderListArray.push(orderContent);
    addPendingOrderOnPage(orderContent);
}

// var compareOrderListArray = function() {
//     var newArray = [];
//     var orders = document.querySelectorAll('.order');
//     console.log(orders);
//     orderListArray.forEach(function(order) {
//         if (orders.indexOf(order) > -1) {
//             newArray.push(order);
//         }
//     })
//     orderListArray = newArray;
// }

var getLocalStorage = function() {
    var pending = localStorage.getItem('pending-orders');
    var pendingArray = JSON.parse(pending);
    if (pendingArray != null) {
        pendingArray.forEach(function(order) {
            addPendingOrderOnPage(order);
        });
    }
}

var updateOrderLists = function() {
    localStorage.setItem('pending-orders', JSON.stringify(orderListArray));
}

var handleSubmit = function(event) {
    event.preventDefault();
    createOrder();
    updateOrderLists();
}

var deleteOrder = function(event) {
    event.preventDefault();
    checkBoxOrders = orderList.querySelectorAll('input[type=checkbox]:checked')
    checkBoxOrders.forEach(function(element, position) {
        parent = element.parentElement;
        if (parent.parentNode) {
            parent.parentNode.removeChild(parent);
        }
    });
    // updateOrderLists();
}

getLocalStorage();

coffeeOrderForm.addEventListener('submit', handleSubmit);
deleteForm.addEventListener('submit', deleteOrder);


//$.ajax('https://dc-coffeerun.herokuapp.com/api/coffeeorders', 