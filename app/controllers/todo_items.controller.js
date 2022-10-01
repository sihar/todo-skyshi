const e = require("express");
const db = require("../models");
const myCache = require("../../cache");
const Activity_groups = db.activity_groups;
const Todo_items = db.todo_items;

// Create and Save a new Todo Items
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        await res.status(400).send({
            status: "Bad Request",
            message: "title cannot be null",
            data: {}
        });
        return;
    }

    if (!req.body.activity_group_id) {
      await res.status(400).send({
          status: "Bad Request",
          message: "activity_group_id cannot be null",
          data: {}
      });
      return;
  }
    
    // Create a Todo Items
    const todo_items = {
        title: req.body.title,
        activity_group_id: req.body.activity_group_id
    };
    
      // Save Todo Items in the database
      await Todo_items.create(todo_items)
        .then(async data => {
            await res.status(201).send({
                status: "Success",
                message: "Success",
                data
            });
        })
        .catch(async err => {
          await res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Todo Items."
          });
        });
};

// Retrieve all Todo Items from the database.
exports.findAll = async (req, res) => {
  const id = req.query.activity_group_id;

  let condition = { };
  let todoAllKey = 'todoAll';

  if(id) {
    condition = { where: { activity_group_id: id } };
    todoAllKey = 'todoAll' + id;
  } 

  value = myCache.get( todoAllKey );

  if ( value == undefined ){
    data = await Todo_items.findAll(condition);
    result = myCache.set( todoAllKey, data, 10000 );
  } else {
    data = value;
  }

  await res.send({
    status: "Success",
    message: "Success",
    data
  });

};

// Find a single Todo Items with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    await Todo_items.findByPk(id)
      .then(async data => {
        if (data) {
          await res.send({
            status: "Success",
            message: "Success",
            data
          });
        } else {
          await res.status(404).send({
            status: "Not Found",
            message: `Todo with ID ${id} Not Found`,
            "data": {}
          });
        }
      })
      .catch(async err => {
        await res.status(500).send({
          message: "Error retrieving Todo Items with id=" + id
        });
      });  
};

// Update a Todo Items by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    await Todo_items.update(req.body, {
      where: { id: id }
    })
    .then(async result => {
        const data = await Todo_items.findByPk(id);
        if(result == 1) {
          await res.send({
              status: "Success",
              message: "Success",
              data
          });
        
        }else if(!data) {
          
          await res.status(404).send({
            status: "Not Found",
            message: `Todo with ID ${id} Not Found`,
            "data": {}
          });

        }else {

          await res.status(500).send({
            status: "Bad Request",
            message: "error when update Todo Items" + err,
            data
          });
          
        }
    })
    .catch(async err => {
        await res.status(500).send({
            status: "Bad Request",
            message: "error when update Todo Items" + err,
            data: {}
        });
    });  
};

// Delete a Todo Items with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    await Todo_items.destroy({
      where: { id: id }
    })
      .then(async num => {
        if (num == 1) {
            await res.send({
                status: "Success",
                message: "Success",
                data: {}
            });
        } else {
          await res.status(404).send({
            status: "Not Found",
            message: `Todo with ID ${id} Not Found`,
            "data": {}
          });
        }
      })
      .catch(async err => {
        await res.status(500).send({
          message: "Could not delete Todo Items with id=" + id
        });
      });  
};