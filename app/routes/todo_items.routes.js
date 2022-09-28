module.exports = app => {
    const todo_items = require("../controllers/todo_items.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Activity Groups
    router.post("/", todo_items.create);
  
    // Retrieve all Activity Groups
    router.get("/", todo_items.findAll);
  
    // Retrieve a single Activity Groups with id
    router.get("/:id", todo_items.findOne);
  
    // Update a Activity Groups with id
    router.patch("/:id", todo_items.update);
  
    // Delete a Activity Groups with id
    router.delete("/:id", todo_items.delete);
  
    app.use('/todo-items', router);
  };