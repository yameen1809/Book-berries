const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  listSearch,
  photo,
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth.js");
const { userById } = require("../controllers/user");

// Route Method and the its controller method.
router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.get("/products", list);
router.get("/products/search", listSearch);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);
// Middleware for getting user id
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
