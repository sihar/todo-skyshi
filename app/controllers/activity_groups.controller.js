const e = require("express");
const db = require("../models");
const Activity_groups = db.activity_groups;
const Op = db.Sequelize.Op;

// Create and Save a new Activity Groups
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            status: "Bad Request",
            message: "title cannot be null",
            data: {}
        });
        return;
    }
    
    // Create a Activity Groups
    const activity_groups = {
        title: req.body.title,
        email: req.body.email
    };
    
      // Save Activity Groups in the database
      Activity_groups.create(activity_groups)
        .then(data => {
            res.status(201).send({
                status: "Success",
                message: "Success",
                data
            });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Activity Groups."
          });
        });
};

// Retrieve all Activity Groupss from the database.
exports.findAll = (req, res) => {
    Activity_groups.findAll()
    .then(data => {
      res.send({
        status: "Success",
        message: "Success",
        data
    });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving activity groups."
      });
    });
};

// Find a single Activity Groups with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Activity_groups.findByPk(id)
      .then(data => {
        if (data) {
          res.send({
            status: "Success",
            message: "Success",
            data
          });
        } else {
          res.status(404).send({
            status: "Not Found",
            message: `Activity with ID ${id} Not Found`,
            "data": {}
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Activity Groups with id=" + id
        });
      });  
};

// Update a Activity Groups by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    if (!req.body.title) {
        res.status(400).send({
            status: "Bad Request",
            message: "title cannot be null!",
            data: {}
        });
        return;
    }

    Activity_groups.update(req.body, {
      where: { id: id }
    })
    .then(async result => {
        const data = await Activity_groups.findByPk(id);
        if(result == 1) {
          res.send({
              status: "Success",
              message: "Success",
              data
          });
        
        }else if(!data) {
          
          res.status(404).send({
            status: "Not Found",
            message: `Activity with ID ${id} Not Found`,
            "data": {}
          });

        }else {
          res.status(500).send({
            status: "Bad Request",
            message: "error when update activity groups" + err,
            data
          });
        }
    })
    .catch(err => {
        res.status(500).send({
            status: "Bad Request",
            message: "error when update activity groups" + err,
            data: {}
        });
    });  
};

// Delete a Activity Groups with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Activity_groups.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            res.send({
                status: "Success",
                message: "Success",
                data: {}
            });
        } else {
          res.status(404).send({
            status: "Not Found",
            message: `Activity with ID ${id} Not Found`,
            "data": {}
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Activity Groups with id=" + id
        });
      });  
};