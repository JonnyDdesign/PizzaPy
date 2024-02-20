from flask import Flask, render_template, request, jsonify
from manage_toppings import PizzaToppingsList

app = Flask(__name__)

# Instantiate PizzaToppingsList to manage toppings
pizza_list = PizzaToppingsList()

@app.route("/")
def index():
    return render_template("index.html")

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
    if topping_to_delete:
        pizza_list.delete_topping(topping_to_delete)
        return jsonify({"message": f"{topping_to_delete} has been removed from the list of pizza toppings."}), 200
    else:
        return jsonify({"error": "Missing topping parameter."}), 400

@app.route("/update_topping", methods=["PUT"])
def update_topping():
    old_topping = request.args.get("old_topping")
    new_topping = request.args.get("new_topping")
    if old_topping and new_topping:
        pizza_list.update_topping(old_topping, new_topping)
        return jsonify({"message": f"{old_topping} has been updated to {new_topping}."}), 200
    else:
        return jsonify({"error": "Missing old_topping or new_topping parameter."}), 400

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)