const express = require("express");
const router = express.Router();
const controller = require("../controllers/items.controller");
const verifyToken = require('../auth.middleware')


router.post("/create_item", verifyToken, controller.createItem);

router.get("/get_items", verifyToken, controller.getAll)

router.patch("/edit_item/:id", verifyToken, controller.editItem)

router.delete("/delete_item/:id", verifyToken, controller.deleteItem)

module.exports = router;
