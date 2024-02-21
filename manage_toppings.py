#Manage pizza toppings section
class PizzaToppingsList:
    def __init__(self):
        self.toppings = ["Pepperoni", "Sausage", "Ham", "Pineapple", "Green Peppers", "Black Olives", "Mushrooms", "Onions", "Jalapenos", "Broccoli" ]

    def add_topping(self, new_topping):
        if new_topping.strip() == "":
            print("Invalid topping name. Topping name cannot be empty.")
            return
        if new_topping.lower() not in [topping.lower() for topping in self.toppings]:
            self.toppings.append(new_topping)
            print(f"{new_topping} has been added to the list of pizza toppings.")
        else:
            print(f"{new_topping} is already in the list of pizza toppings.")

    def delete_topping(self, topping_to_delete):
        if topping_to_delete.strip() == "":
            print("Invalid topping name. Please provide valid topping name.")
            return
        if topping_to_delete in self.toppings:
            self.toppings.remove(topping_to_delete)
            print(f"{topping_to_delete} has been removed from the list of pizza toppings.")
        else:
            print(f"{topping_to_delete} is not in the list of pizza toppings.")

    def update_topping(self, old_topping, new_topping):
        if old_topping.strip() == "" or new_topping.strip() == "":
            print("Invalid topping names. Please provide valid topping names.")
            return
        if old_topping in self.toppings:
            index = self.toppings.index(old_topping)
            self.toppings[index] = new_topping
            print(f"{old_topping} has been updated to {new_topping}.")
        else:
            print(f"{old_topping} is not in the list of pizza toppings.")

    def display_toppings(self):
        print("Current list of pizza toppings:")
        for topping in self.toppings:
            print("-", topping)

def manage_pizza_toppings():
    pizza_list = PizzaToppingsList()
    while True:
        pizza_list.display_toppings()
        action = input("\nWould you like to add, delete, or update a topping? (add/delete/update/exit): ").strip().lower()

        if action == "add":
            new_topping = input("Enter the new topping you want to add: ").strip()
            pizza_list.add_topping(new_topping)
        elif action == "delete":
            topping_to_delete = input("Enter the topping you want to delete: ").strip()
            pizza_list.delete_topping(topping_to_delete)
        elif action == "update":
            old_topping = input("Enter the topping you would like to update: ").strip()
            new_topping = input("Enter the new topping: ").strip()
            pizza_list.update_topping(old_topping, new_topping)
        elif action == "exit":
            print("Exiting pizza topping management.")
            break
        else:
            print("Invalid action. Please choose 'add', 'delete', 'update', or 'exit'.")

if __name__ == "__main__":
    manage_pizza_toppings()