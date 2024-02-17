#Manage pizza toppings section

class PizzaToppingsList:
    def __init__(self):
        self.toppings = ["pepperoni", "sausage", "ham", "pineapple", "green peppers", "black olives", "mushrooms", "onions", "jalapenos", "broccoli" ]

    def add_topping(self, new_topping):
        if new_topping.lower() not in map(str.lower, self.toppings):
            self.toppings.append(new_topping)
            print(f"{new_topping} has been added to the list of pizza toppings.")
        else:
            print(f"{new_topping} is already in the list of pizza toppings.")

    def delete_topping(self, topping_to_delete):
        if topping_to_delete in self.toppings:
            self.toppings.remove(topping_to_delete)
            print(f"{topping_to_delete} has been removed from the list of pizza toppings.")
        else:
            print(f"{topping_to_delete} is not in the list of pizza toppings.")

    def update_topping(self, old_topping, new_topping):
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

def main():
    pizza_list = PizzaToppingsList()

    pizza_list.display_toppings()

    action = input("\nWould you like to add, delete, or update a topping? (add/delete/update): ").strip().lower()

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
    else:
        print("Invalid action. Please choose 'add', 'delete', or 'update'.")

    pizza_list.display_toppings()

if __name__ == "__main__":
    main()