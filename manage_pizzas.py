#Manage pizzas

class PizzaManager:
    def __init__(self):
        self.existing_pizzas = [
            {
                "name": "Margherita",
                "toppings": ["Tomatoes", "Mozzarella", "Basil"]
            },
            {
                "name": "Hawaiian",
                "toppings": ["Ham", "Pineapple"]
            },
            {
                "name": "White",
                "toppings": ["Mozzarella", "Ricotta", "Garlic"]
            },
            {
                "name": "Veggie Supreme",
                "toppings": ["Green peppers", "Black olives", "Tomatoes", "Mushrooms", "Onions"]
            },
            {
                "name": "Meat Galore",
                "toppings": ["Pepperoni", "Sausage", "Bacon", "Ham", "Meatballs"]
            }
        ]

    def display_existing_pizzas(self):
        for pizza in self.existing_pizzas:
            print("Name:", pizza["name"])
            print("Toppings:", ", ".join(pizza["toppings"]))
            print()

    def create_pizza(self, name, toppings):
        for pizza in self.existing_pizzas:
            if pizza["name"].lower() == name.lower():
                print(f"Error: Pizza '{name}' already exists.")
                return
        
        new_pizza = {
            "name": name,
            "toppings": toppings
        }
        self.existing_pizzas.append(new_pizza)
        print(f"New pizza '{name}' created with toppings: {', '.join(toppings)}")        

    def delete_pizza(self, name):
        updated_pizzas = []
        pizza_deleted = False
        for pizza in self.existing_pizzas:
            if pizza["name"] == name:
                pizza_deleted = True
            else:
                updated_pizzas.append(pizza)
        if pizza_deleted:            
            self.existing_pizzas = updated_pizzas
            print(f"Pizza '{name}' deleted successfully.")
        else:
            print(f"Error: Pizza '{name}' not found.")

    def update_pizza(self, name, new_toppings):
        for pizza in self.existing_pizzas:
            if pizza["name"] == name:
                pizza["toppings"] = new_toppings
                print(f"Pizza '{name}' toppings updated to: {', '.join(new_toppings)}")
                return
        print(f"Error: Pizza '{name}' not found.")

    def update_toppings(self, name, new_toppings):
        for pizza in self.existing_pizzas:
            if pizza["name"].lower() == name.lower():
                pizza["toppings"] = new_toppings
                print(f"Toppings of pizza '{name}' updated to: {', '.join(new_toppings)}")
                return
        print(f"Error: Pizza '{name}' not found.")

def pizza_manager():
    pizza_manager = PizzaManager()

    while True:
        print("\n==== Pizza Manager ====")
        print("1. Display existing pizzas")
        print("2. Create a new pizza")
        print("3. Update toppings of an existing pizza")
        print("4. Delete a pizza")
        print("5. Exit")
        choice = input("Enter your choice: ")

        if choice == "1":
            print("\nExisting Pizzas:")
            pizza_manager.display_existing_pizzas()
        elif choice == "2":
            name = input("Enter the name of the new pizza: ")
            toppings = input("Enter toppings (comma-separated): ").split(',')
            pizza_manager.create_pizza(name, toppings)
        elif choice == "3":
            name = input("Enter the name of the pizza to update: ")
            toppings = input("Enter new toppings (comma-separated): ").split(',')
            pizza_manager.update_toppings(name, toppings)
        elif choice == "4":
            name = input("Enter the name of the pizza to delete: ")
            pizza_manager.delete_pizza(name)
        elif choice == "5":
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please enter a number between 1 and 5.")

if __name__ == "__main__":
    pizza_manager()