#Manage specialty pizzas section

class SpecialtyPizzas:
    def __init__(self):
        self.specialty_pizzas = [
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
    }]

    def add_pizza(self, name, toppings):
        for pizza in self.specialty_pizzas:
            if pizza["name"] == name:
                print(f"A pizza with the name '{name}' already exists.")
                return
        new_pizza = {
            "name": name,
            "toppings": toppings
        }
        self.specialty_pizzas.append(new_pizza)
        print(f"New pizza '{name}' added successfully!")

    def delete_pizza(self, name):
        for pizza in self.specialty_pizzas:
            if pizza["name"] == name:
                self.specialty_pizzas.remove(pizza)
                print(f"Pizza '{name}' deleted successfully!")
                return
        print(f"Pizza '{name}' not found.")

    def update_toppings(self, name, new_toppings):
        for pizza in self.specialty_pizzas:
            if pizza["name"] == name:
                pizza["toppings"] = new_toppings
                print(f"Toppings for pizza '{name}' updated successfully!")
                return
        print(f"Pizza '{name}' not found.")

pizza_menu = SpecialtyPizzas()
pizza_menu.add_pizza("BBQ Chicken", ["Grilled chicken", "BBQ sauce", "Red onions", "Cilantro"])
pizza_menu.update_toppings("BBQ Chicken", ["Grilled chicken", "BBQ sauce", "Red onions", "Cilantro", "Cheddar cheese"])