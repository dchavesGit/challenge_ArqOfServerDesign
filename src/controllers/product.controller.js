const SORT_ORDER = { asc: 1, desc: -1 };
const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, query } = req.query; //toma valor por defectro de este query param en uno, si es que no tiene valor
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
      await productManager.paginate(query, {
        limit,
        page,
        lean: true,
        sort: sort ? { price: SORT_ORDER[sort.toLowerCase()] } : {},
      });
    const products = docs;
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    if (!product) {
      res.status(400).send({ status: "error", error: "product not found" });
    } else {
      res.send({ status: "product found", product });
    }
  } catch (error) {
    res.status(400).send({ status: "error", error: error });
  }
};

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    if (!product.status) {
      product.status = true;
    }
    const result = await productManager.addProduct(
      product.title,
      product.description,
      product.code,
      product.price,
      product.status,
      product.stock,
      product.category,
      product.thumbnail
    );
    res.send({ status: "added success", result });
  } catch (error) {
    res.status(400).send({ status: "error", error: error });
  }
};

const updateProduct = async (req, res) => {
  let update = req.body;
  const { pid } = req.params;
  try {
    let productUpdated = await productManager.updateProduct(pid, update);
    return res.send({ status: "success", productUpdated });
  } catch (error) {
    res.status(400).send({ status: "error", error: error });
  }
};

const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const result = await productManager.deleteProduct({ _id: pid });
    res.send({ result: "success delete", payload: result });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export {
  getProducts,
  getProductById,
  deleteProduct,
  addProduct,
  updateProduct,
};
