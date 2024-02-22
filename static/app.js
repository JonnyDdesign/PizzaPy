// Manage pizza toppings functions

function displayToppings() {
    fetch("/toppings")
    .then(response => response.json())
    .then(data => {
        const toppingsList = document.getElementById("toppings-list");
        toppingsList.innerHTML = "";
        data.toppings.forEach(topping => {
            const listItem = document.createElement("li");
            listItem.textContent = topping;

            // Add delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.onclick = function() {
                deleteTopping(topping);
            };
            listItem.appendChild(deleteButton);

            toppingsList.appendChild(listItem);
        });
    })
    .catch(error => console.error("Error:", error));
}

function addTopping() {
    const newTopping = document.getElementById("new-topping").value;
    if (newTopping.trim() !== "") {
        fetch("/add_topping", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ topping: newTopping })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.message.includes("added")) {
                displayToppings();
            }
        })
        .catch(error => console.error("Error:", error));
    } else {
        alert("Please enter a topping.");
    }
}

function deleteTopping(topping) {
    fetch(`/delete_topping?topping=${topping}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message.includes("removed")) {
            displayToppings();
        }
    })
    .catch(error => console.error("Error:", error));
}

// Initial display of toppings when page loads
displayToppings();

//Manage pizzas functions
function displayPizzas() {
    fetch("/existing_pizzas")
    .then(response => response.json())
    .then(data => {
        const pizzasList = document.getElementById("pizzas-list");
        pizzasList.innerHTML = "";
        data.existing_pizzas.forEach(pizza => {
            const listItem = document.createElement("li");
            listItem.textContent = existing_pizzas.name;

            // Add delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.onclick = function() {
                deletePizza(pizza.name);
            };
            listItem.appendChild(deleteButton);

            pizzasList.appendChild(listItem);
        });
    })
    .catch(error => console.error("Error:", error));
}


function addPizza() {
    const newPizzaName = document.getElementById("new-pizza-name").value;
    if (newPizzaName.trim() !== "") {
        fetch("/create_pizza", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: newPizzaName })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.message.includes("added")) {
                displayPizzas();
            }
        })
        .catch(error => console.error("Error:", error));
    } else {
        alert("Please enter a pizza name.");
    }
}

function deletePizza(pizza) {
    fetch(`/delete_pizza?pizza.name=${pizza.name}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message.includes("removed")) {
            displayPizzas();
        }
    })
    .catch(error => console.error("Error:", error));
}