const addCart = async (res, req) => {
  try {
    const cart = await cartManager.addCart();
    res.send({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).send({ status: "Error, cannot creat cart", error: error });
  }
};

const getCartById = async (res, req) => {
  try {
    const cid = req.params.cid;
    const cartSelected = await cartManager.getCartById(cid);
    res.send({ status: "success found", payload: cartSelected });
  } catch (error) {
    res.status(400).send({ status: "Error, cannot found cart", error: error });
  }
};

const updateProductInCart = async (res, req) => {
  try {
    const productId = req.params.pid;

    const productQuantity = Number(Object.values(req.body));

    const cartId = req.params.cid;

    const cartSelected = await cartManager.updateCart(
      cartId,
      productId,
      productQuantity
    );
    res.send({ status: "product updated", payload: cartSelected });
  } catch (error) {
    res.status(400).send({ status: "Error, cannot update cart", error: error });
  }
};

const updateProducts = async (res, req) => {
  try {
    const cartId = req.params.cid;
    const products = req.body.map((p) => {
      p.product, p.quantity;
    });
    const cart = await cartManager.updateProducts(cartId, products);
    res.send({ status: "cart updated", payload: cart });
  } catch (error) {
    res.status(400).send({ status: "Error, modify cart", error: error });
  }
};

const removeProductInCart = async (res, req) => {
  try {
    const productId = req.params.pid;
    const cartId = req.params.cid;
    await cartManager.removeProduct(cartId, productId);
    res.send({ status: "deletion success" });
  } catch (error) {
    res.status(400).send({ status: "Error, cannot delete cart", error: error });
  }
};

const emptyCart = async (res, req) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.emptyCart(cartId);
    res.send({ status: "cart emptied", payload: cart });
  } catch (error) {
    res.send(400).send({ status: "Error, emptied cart", error: error });
  }
};

export {
  addCart,
  getCartById,
  updateProductInCart,
  updateProducts,
  removeProductInCart,
  emptyCart,
};
