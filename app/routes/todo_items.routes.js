module.exports = app => {
    const todo_items = require("../controllers/todo_items.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Todo Items
    router.post("/", todo_items.create);
  
    // Retrieve all Todo Items
    router.get("/", todo_items.findAll);
  
    // Retrieve a single Todo Items with id
    router.get("/:id", todo_items.findOne);
  
    // Update a Todo Items with id
    router.patch("/:id", todo_items.update);
  
    // Delete a Todo Items with id
    router.delete("/:id", todo_items.delete);
  
    app.use('/todo-items', router);
  };