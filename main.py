from flask import Flask, render_template, request, jsonify
from manage_toppings import PizzaToppingsList
from manage_pizzas import PizzaManager

app = Flask(__name__, static_url_path='/static')

# Instantiate PizzaToppingsList to manage toppings and PizzaManager to manage pizzas
pizza_list = PizzaToppingsList()
pizza_manager = PizzaManager()

# Routes to render HTML pages
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/manage_toppings")
def manage_toppings():
    return render_template("manage_toppings.html")

@app.route("/manage_pizzas")
def manage_pizzas():
    return render_template("manage_pizzas.html")

# Routes to return list of pizza toppings, add a new topping, delete a topping, and update a topping
@app.route("/toppings", methods=["GET"])
def get_toppings():
    return jsonify({"toppings": pizza_list.toppings})

@app.route("/add_topping", methods=["POST"])
def add_topping():
    new_topping = request.json.get("topping")
    if new_topping:
        pizza_list.add_topping(new_topping)
        return jsonify({"message": f"{new_topping} has been added to the list of pizza toppings."}), 200
    else:
        return jsonify({"error": "Missing topping parameter."}), 400

@app.route("/delete_topping", methods=["DELETE"])
def delete_topping():
    topping_to_delete = request.args.get("topping")
    for topping in pizza_list:
        if topping["name"] == topping_to_delete:
            pizza_list.remove(topping)
            return jsonify({"message": f"{topping_to_delete} has been removed from the list of pizza toppings."}), 204
    return jsonify({"error": f"Topping '{topping_to_delete}' not found."}), 404

@app.route("/update_topping", methods=["PUT"])
def update_topping():
    old_topping = request.args.get("old_topping")
    new_topping = request.args.get("new_topping")
    if old_topping and new_topping:
        pizza_list.update_topping(old_topping, new_topping)
        return jsonify({"message": f"{old_topping} has been updated to {new_topping}."}), 200
    else:
        return jsonify({"error": "Missing old_topping or new_topping parameter."}), 400

# Routes to return list of pizzas, add a new pizza, delete a pizza, update a pizza, and update pizza toppings
@app.route('/existing_pizzas', methods=['GET'])
def get_pizzas():
    return jsonify(pizza_manager.existing_pizzas)

@app.route('/create_pizza', methods=['POST'])
def create_pizza():
    data = request.json
    pizza_name = data.get('name')
    toppings = data.get('toppings')
    if pizza_name and toppings:
        pizza_manager.create_pizza(pizza_name, toppings)
        return jsonify({"message": "Pizza added successfully"}), 201
    else:
        return jsonify({"error": "Missing pizza name or toppings"}), 400

@app.route('/delete_pizza/<pizza_name>', methods=['DELETE'])
def delete_pizza(pizza_name):
    if pizza_name.lower() in pizza_manager.pizzas:
        pizza_manager.delete_pizza(pizza_name)
        return jsonify({"message": "Pizza deleted successfully"}), 200
    else:
        return jsonify({"error": "Pizza not found"}), 404

@app.route('/update_pizza/<pizza_name>', methods=['PUT'])
def update_pizza(pizza_name):
    data = request.json
    new_name = data.get('name')
    new_toppings = data.get('toppings')
    if new_name and new_toppings:
        pizza_manager.update_pizza(pizza_name, new_name, new_toppings)
        return jsonify({"message": "Pizza updated successfully"}), 200
    else:
        return jsonify({"error": "Missing new pizza name or toppings"}), 400

@app.route('/update_toppings/<pizza_name>', methods=['PUT'])
def update_toppings(pizza_name):
    data = request.json
    new_toppings = data.get('toppings')
    if new_toppings:
        pizza_manager.update_toppings(pizza_name, new_toppings)
        return jsonify({"message": "Pizza toppings updated successfully"}), 200
    else:
        return jsonify({"error": "Missing new toppings"}), 400

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)