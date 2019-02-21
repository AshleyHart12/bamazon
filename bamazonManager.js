var mysql = require("mysql");
var inquirer = require('inquirer');
require("console.table");

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
    whichAction();
 });

 var whichAction = function() {
     inquirer.prompt({
         name: "Action",
         type: "list",
         message: "What would like to do?",
         choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
     }).then(function(input) {
        switch(input.action) {
            case 'View Products for Sale':
            productsForSale();
            break;
          
            case 'View Low Inventory':
            lowInventory();
            break;
          
            case 'Add to Inventory':
            addToInventory();
            break;
          
            case 'Add New Product':
            newProduct();
            break;
          }  
     }) 
     }
     

     // productsForSale
     function productsForSale() {
      connection.query("SELECT * FROM products", function(err, action) {
      if (err) {
        throw err;
      } else {
        console.table(action);
      }   
  });  
}

     // lowInventory


     // addToInventory
     function addToInventory(product, quantity) {
      connection.query(
        "UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?", 
        [quantity, product],
        function(error) {
          if (error) {
            throw error;
          } 
          });
        }
     

     // newProduct
