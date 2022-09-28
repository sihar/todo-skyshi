module.exports = app => {
    const activity_groups = require("../controllers/activity_groups.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Activity Groups
    router.post("/", activity_groups.create);
  
    // Retrieve all Activity Groups
    router.get("/", activity_groups.findAll);
  
    // Retrieve a single Activity Groups with id
    router.get("/:id", activity_groups.findOne);
  
    // Update a Activity Groups with id
    router.patch("/:id", activity_groups.update);
  
    // Delete a Activity Groups with id
    router.delete("/:id", activity_groups.delete);
  
    app.use('/activity-groups', router);
  };