// Manage pizza toppings functions

// Function to fetch and display toppings
function displayToppings() {
    fetch("/toppings") // Fetch the list of toppings
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        // Get the DOM element for displaying toppings
        const toppingsList = document.getElementById("toppings-list");
        if (!toppingsList) {
            console.error("Element with ID 'toppings-list' not found.");
            return;
        }
        toppingsList.innerHTML = "";
        // Check if there are toppings available in the data
        if (!data?.toppings?.length) {
            console.log("No toppings available.");
            return;
        }
        // Iterate over each topping
        data.toppings.forEach(topping => {
            const listItem = document.createElement("li");
            listItem.textContent = topping;

            // Add delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            // Set the onclick event handler to call deleteTopping function
            deleteButton.onclick = () => deleteTopping(topping);

            // Append the delete button to the list item
            listItem.appendChild(deleteButton);
            // Append the list item to the toppings list
            toppingsList.appendChild(listItem);
        });
    })
    // Handle and log any errors that occur during the fetch operation
    .catch(error => console.error("Error:", error));
}

// Function to add a new topping
function addTopping() {
    // Get the value of the new topping input and remove any leading/trailing whitespace
    const newTopping = document.getElementById("new-topping").value.trim();
    // Check if the new topping value is empty
    if (!newTopping) {
        alert("Please enter a topping.");
        return;
    }
    // Make a POST request to add the new topping to the server
    fetch("/add_topping", {
        method: "POST", // Specify the HTTP method as POST
        headers: { "Content-Type": "application/json" }, // Set request headers
        body: JSON.stringify({ topping: newTopping }) // Convert data to JSON format
    })
    .then(response => response.json()) // Parse response as JSON
    .then(({ message }) => {
        alert(message);
        // If topping was added successfully, update toppings list
        if (message.includes("added")) {
            displayToppings();
        }
    })
    // Handle and log any errors that occur during the fetch operation
    .catch(error => console.error("Error:", error));
}

// Function to delete a topping
function deleteTopping(topping) {
    // Make a DELETE request to remove the specified topping from the server
    fetch(`/delete_topping?topping=${topping}`, {
        method: "DELETE"
    })
    .then(response => response.json()) // Parse response as JSON
    .then(({ message }) => {
        alert(message);
        // If topping was removed successfully, update toppings list
        if (message.includes("removed")) {
            displayToppings();
        }
    })
        // Handle and log any errors that occur during the fetch operation
        .catch(error => console.error("Error:", error));
}

//Manage pizzas functions

// Function to fetch and display existing pizzas
function displayPizzas() {
    // Fetch the existing pizzas from the server
    fetch("/existing_pizzas")
    .then(response => response.json()) // Parse response as JSON
    .then(data => {
        // Get the DOM element for displaying pizzas
        const pizzasList = document.getElementById("pizzas-list");
        pizzasList.innerHTML = "";
        // Iterate over each pizza in the data
        data.forEach(pizza => {
            // Create a new list item element
            const listItem = document.createElement("li");
            // Set the text content of the list item to the pizza's name and toppings
            listItem.textContent = `${pizza.name} - ${pizza.toppings}`;

            // Add delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            // Set the onclick event handler to call ther deletePizza function with pizza's name as parameter
            deleteButton.onclick = function() {
                deletePizza(pizza.name);
            };
            // Append the delete button to the list item
            listItem.appendChild(deleteButton);
            // Append the list item to the pizzas list
            pizzasList.appendChild(listItem);
        });
    })
    // Handle and log any errors that occur during the fetch operation
    .catch(error => console.error("Error:", error));
}

// Function to add a new pizza
function addPizza() {
    // Get the value of the new pizza name input
    const newPizzaName = document.getElementById("new-pizza-name").value;
    // Check if the new pizza name is not empty after trimming
    if (newPizzaName.trim() !== "") {
        // Make a POST request to create a new pizza on the server
        fetch("/create_pizza", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newPizzaName })
        })
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            alert(data.message);
            // If pizza was added successfully, update pizzas list
            if (data.message.includes("added")) {
                displayPizzas();
            }
        })
        // Handle and log any errors that occur during the fetch operation
        .catch(error => console.error("Error:", error));
    } else {
        // Alert user if pizza name field is empty
        alert("Please enter a pizza name.");
    }
}

// Function to delete a pizza
function deletePizza(pizzaName) {
    // Make a DELETE request to remove the specified pizza from the server
    fetch(`/delete_pizza/${pizzaName}`, {
        method: "DELETE"
    })
    .then(response => {
        // Check if the response indicates success
        if (response.ok) {
            displayPizzas();
        } else {
            // If not successful, log an error message
            console.error('Failed to delete pizza:', response.statusText);
        }
    })
    // Handle and log any errors that occur during the fetch operation
    .catch(error => console.error("Error:", error));
}

// Call displayPizzas() to initially display pizzas
displayPizzas();
// Call displayToppings() to initially display toppings
displayToppings();