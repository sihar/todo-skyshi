const e = require("express");
const db = require("../models");
const Activity_groups = db.activity_groups;

// Create and Save a new Activity Groups
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
    
    // Create a Activity Groups
    const activity_groups = {
        title: req.body.title,
        email: req.body.email
    };
    
      // Save Activity Groups in the database
      await Activity_groups.create(activity_groups)
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
              err.message || "Some error occurred while creating the Activity Groups."
          });
        });
};

// Retrieve all Activity Groupss from the database.
exports.findAll = async (req, res) => {
    await Activity_groups.findAll()
    .then(async data => {
      await res.send({
        status: "Success",
        message: "Success",
        data
    });
    })
    .catch(async err => {
      await res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving activity groups."
      });
    });
};

// Find a single Activity Groups with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    await Activity_groups.findByPk(id)
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
            message: `Activity with ID ${id} Not Found`,
            "data": {}
          });
        }
      })
      .catch(async err => {
        await res.status(500).send({
          message: "Error retrieving Activity Groups with id=" + id
        });
      });  
};

// Update a Activity Groups by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    if (!req.body.title) {
        await res.status(400).send({
            status: "Bad Request",
            message: "title cannot be null!",
            data: {}
        });
        return;
    }

    await Activity_groups.update(req.body, {
      where: { id: id }
    })
    .then(async result => {
        const data = await Activity_groups.findByPk(id);
        if(result == 1) {
          await res.send({
              status: "Success",
              message: "Success",
              data
          });
        
        }else if(!data) {
          
          await res.status(404).send({
            status: "Not Found",
            message: `Activity with ID ${id} Not Found`,
            "data": {}
          });

        }else {
          await res.status(500).send({
            status: "Bad Request",
            message: "error when update activity groups" + err,
            data
          });
        }
    })
    .catch(async err => {
        await res.status(500).send({
            status: "Bad Request",
            message: "error when update activity groups" + err,
            data: {}
        });
    });  
};

// Delete a Activity Groups with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    await Activity_groups.destroy({
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
            message: `Activity with ID ${id} Not Found`,
            "data": {}
          });
        }
      })
      .catch(async err => {
        await res.status(500).send({
          message: "Could not delete Activity Groups with id=" + id
        });
      });  
};