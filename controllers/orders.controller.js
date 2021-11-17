const Order = require("../models/orders");
const Items = require("../models/items");

const updateItemsQuantity = (data) => {
  try {
    data.forEach((data) => {
      console.log(data.id, data.quantity);
      const id = data.id;
      const quantity = data.quantity;

      Items.find({ _id: data.id }, { _id: 0, quantity: 1 }, (err, data) => {
        if (err) return console.log(err);
        const [{ quantity: val }] = [...data];
        console.log(val);
        update(id, quantity, val);
      }).lean();
    });
  } catch (err) {
    console.log(err);
  }
};

const update = (id, orderQuantity, currentQuantity) => {
  try {
    if (orderQuantity <= currentQuantity) {
      const newQuantity = currentQuantity - orderQuantity;
      Items.updateOne(
        { _id: id },
        { $set: { quantity: newQuantity } },
        { new: true },
        (err, data) => {
          if (err) return console.log(err);
          console.log(id, data, newQuantity, currentQuantity, orderQuantity);
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

//include in the schema that the user has to remove 0 from the start of the number, so maybe begin with a +234
exports.createOrder = async (req, res) => {
  /* 	#swagger.tags = ['user']
        #swagger.description = 'creates a new order and automatically updates the item quantity remaining, phone number should not begin with zero'

         /*  #swagger.parameters['body'] = {
                in: 'body',
                required: true,
               schema: { $ref: '#/definitions/orders' }
        } */

  /* #swagger.responses[201] = {
                    schema: { $ref: '#/definitions/ordersRes' }
            } */
  try {
    const newOrder = Order({ ...req.body });
    await newOrder
      .save()
      .then((data) => {
        // console.log(data);
        res.status(201).send(data);
        updateItemsQuantity(data.items);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: err });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
};
