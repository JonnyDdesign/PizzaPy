// app.js

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