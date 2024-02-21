// app.js

//Manage pizza toppings functions
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
    // Implement logic to display regular pizzas using AJAX
    // Example:
    $.get("/api/regular_pizzas", function(data) {
        alert("Regular Pizzas:\n" + data.join("\n"));
    });
}

function addPizza() {
    // Implement logic to add regular pizza using AJAX
    // Example:
    var pizzaName = prompt("Enter the name of the pizza:");
    var toppings = prompt("Enter the toppings (comma-separated):").split(",");
    $.post("/api/regular_pizzas", { name: pizzaName, toppings: toppings }, function(data) {
        alert(data.message);
    });
}

// Implement similar functions for other regular pizza methods (delete, update, update toppings)

function displaySpecialtyPizzas() {
    // Implement logic to display specialty pizzas using AJAX
    // Example:
    $.get("/api/specialty_pizzas", function(data) {
        alert("Specialty Pizzas:\n" + data.join("\n"));
    });
}

function addSpecialtyPizza() {
    // Implement logic to add specialty pizza using AJAX
    // Example:
    var pizzaName = prompt("Enter the name of the pizza:");
    var toppings = prompt("Enter the toppings (comma-separated):").split(",");
    $.post("/api/specialty_pizzas", { name: pizzaName, toppings: toppings }, function(data) {
        alert(data.message);
    });
}