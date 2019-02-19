var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
 host: "localhost",

 // Your port; if not 3306
 port: 3306,

 // Your username
 user: "root",

 // Your password
 password: "Noles08!!",
 database: "bamazonDB"
});

connection.connect(function(err) {
   if (err) throw err;
   console.log("connected as id " + connection.threadId);
  displayItems();
   shopping();
 });


//  Function to display all items available for sale
function displayItems() {
      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("----------------------------------");
      for (var i = 0; i < res.length; i++) {
        console.log("Item Id: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Price: " + res[i].price);
      }
      console.log("-----------------------------------");
    });
    
}

function shopping() {
  inquirer.prompt([
    {
    name: "product",
    type: "input",
    message: "What is the ID of the product you would like to buy?"
  }, {
    name: "units",
    type: "input",
    message: "How many units would you like to purchase?"
  }]).then(function(input) {
    var query = "SELECT * FROM products WHERE ?";
    connection.query(query, {
      id: input.product}, function(err, res) {
        var inStock = res[0].stock_quantity;
        var itemBought = input.units;

        if (inStock >= itemBought) {
          var leftInStock = inStock - itemBought;
          var totalPrice = res[0].price * itemBought;
          var itemPurchased = res[0].product;
          console.log("------------------------------------");
          console.log("Product Name: " + res[0].product_name + "\nQuantity: " + itemBought + "\nPrice per unit: $" + res[0].price + "\nYour total comes to: $" + totalPrice + "\n\nThank you for your purchase!" + "\n-----------------------------------\n");
          connection.end();
          

         
      } else {
        console.log("\n Insufficient Inventory! \n")
        shopping();
      };
   });
});

} // END OF shopping FUNCTION
