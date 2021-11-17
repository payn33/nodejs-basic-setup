const Item = require("../models/items");

exports.createItem = async (req, res) => {
  /* 	#swagger.tags = ['Admin']
        #swagger.description = 'creates new stock item' 

         /*  #swagger.parameters['body'] = {
                in: 'body',
                required: true,
               schema: { $ref: '#/definitions/items' }
        } */

  /* #swagger.responses[201] = {
                    schema: { $ref: '#/definitions/items' }
            } */
  try {
    Item.findOne({ name: req.body.name, brand: req.body.brand })
      .lean()
      .then((data) => {
        if (data) return res.status(400).send({ error: "item already exists" });
        else {
          const newItem = Item({ ...req.body });
          newItem
            .save()
            .then((data) => {
              console.log(data);
              res.status(201).send(data);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({ error: err });
            });
        }
      });
    console.log(req.body);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

exports.getAll = async (req, res) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'gets all items in stock' 

         /*  #swagger.parameters['body'] = {
                in: 'body',
                required: true,
               schema: { $ref: '#/definitions/items' }
        } */

  /* #swagger.responses[200] = [{
                    schema: { $ref: '#/definitions/other' }
            }] */
  try {
    await Item.find({}, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: err });
      }
      res.status(200).send(data);
    })
      .lean()
      .clone();
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
};

exports.editItem = async (req, res) => {
  /* 	#swagger.tags = ['Admin']
        #swagger.description = 'edits stock item' 

         /*  #swagger.parameters['body'] = {
                in: 'body',
                required: true,
               schema: { $ref: '#/definitions/login' }
        } */

  /* #swagger.parameters['id'] = { description: 'user id' } */

  /* #swagger.responses[200] = {
                   success: 'edited successfully'
            } */

  try {
    const id = req.params.id;
    const data = req.body;
    await Item.updateMany({ _id: id }, { $set: data }, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: err });
      }
      res.status(200).send({ success: "updated successfully" });
    }).clone();
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
};

exports.deleteItem = async (req, res) => {
  /* 	#swagger.tags = ['Admin']
        #swagger.description = 'deletes stock item' 

         /*  #swagger.parameters['body'] = {
                in: 'body',
                required: true,
               schema: { $ref: '#/definitions/login' }
        } */

  /* #swagger.parameters['id'] = { description: 'user id' } */

  /* #swagger.responses[200] = {
                    success: "deleted successfully"
            } */

  try {
    const id = req.params.id;
    await Item.deleteOne({ _id: id }, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: err });
      }
      res.status(200).send({ success: "deleted successfully" });
    }).clone();
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
};
