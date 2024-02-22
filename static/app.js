// Manage pizza toppings functions
function displayToppings() {
    fetch("/toppings")
    .then(response => response.json())
    .then(data => {
        const toppingsList = document.getElementById("toppings-list");
        toppingsList.innerHTML = "";
        if (!data?.toppings?.length) {
            console.log("No toppings available.");
            return;
        }
        data.toppings.forEach(topping => {
            const listItem = document.createElement("li");
            listItem.textContent = topping;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.onclick = () => deleteTopping(topping);

            listItem.appendChild(deleteButton);
            toppingsList.appendChild(listItem);
        });
    })
    .catch(error => console.error("Error:", error));
}


function addTopping() {
    const newTopping = document.getElementById("new-topping").value.trim();
    if (!newTopping) {
        alert("Please enter a topping.");
        return;
    }
    fetch("/add_topping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topping: newTopping })
    })
    .then(response => response.json())
    .then(({ message }) => {
        alert(message);
        if (message.includes("added")) {
            displayToppings();
        }
    })
    .catch(error => console.error("Error:", error));
}


function deleteTopping(topping) {
    fetch(`/delete_topping?topping=${topping}`, { method: "DELETE" })
        .then(response => response.json())
        .then(({ message }) => {
            alert(message);
            if (message.includes("removed")) {
                displayToppings();
            }
        })
        .catch(error => console.error("Error:", error));
}

//Manage pizzas functions
function displayPizzas() {
    fetch("/existing_pizzas")
    .then(response => response.json())
    .then(data => {
        const pizzasList = document.getElementById("pizzas-list");
        pizzasList.innerHTML = "";
        data.forEach(pizza => {
            const listItem = document.createElement("li");
            listItem.textContent = `${pizza.name} - ${pizza.toppings}`;

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

function deletePizza(pizzaName) {
    fetch(`/delete_pizza/${pizzaName}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            displayPizzas();
        } else {
            console.error('Failed to delete pizza:', response.statusText);
        }
    })
    .catch(error => console.error("Error:", error));
}

displayPizzas();
displayToppings();