// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

function menu() {
  const ingredients = {"water": 400, "milk": 540, "coffee": 120, "cups": 9, "money": 550}
  while (true) {
    switch (input("Write action (buy, fill, take, remaining, exit): ")) {
      case "buy":
        buy(ingredients);
        break;
      case "fill":
        fill(ingredients);
        break;
      case "take":
        take(ingredients);
        break;
      case "remaining":
        remaining(ingredients);
        break;
      case "exit":
        return;
    };
  }
}

function remaining(ingredients) {
  console.log(`The coffee machine has:
${ingredients.water} ml of water
${ingredients.milk} ml of milk
${ingredients.coffee} g of coffee beans
${ingredients.cups} disposable cups
${ingredients.money} of money`);
}

function buy(ingredients) {
  options = {
  1: {"water": 250, "coffee": 16, "money": -4, "cups": 1},
  2: {"water": 350, "milk": 75, "coffee": 20, "money": -7, "cups": 1},
  3: {"water": 200, "milk": 100, "coffee": 12, "money": -6, "cups": 1}
  };
  choice = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ")
  if (choice === "back") {
    return;
  }
  choice = options[choice]
  for (const [ingredient, amount] of Object.entries(choice)) {
    if (ingredients[ingredient] < amount) {
      console.log(`Sorry, not enough ${ingredient}!`);
      return;
    }
  }
  console.log("I have enough resources, making you a coffee!")
  for (const [ingredient, amount] of Object.entries(choice)) {
    ingredients[ingredient] -= amount;
  }
}

function fill(ingredients) {
  questions = {
    "water": "Write how many ml of water you want to add: ",
    "milk": "Write how many ml of milk you want to add: ",
    "coffee": "Write how many grams of coffee beans you want to add: ",
    "cups": "Write how many disposable cups you want to add: ",
  };
  for (const [ingredient, question] of Object.entries(questions)) {
    ingredients[ingredient] += new Number(input(question));
  }
}

function take(ingredients) {
  console.log(`I gave you ${ingredients.money}`);
  ingredients.money = 0;
}

menu();
