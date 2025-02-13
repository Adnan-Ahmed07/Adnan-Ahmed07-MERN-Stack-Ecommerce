const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const { Category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (Category.length) {
      filters.category = { $in: Category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }
    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }
    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
module.exports = { getFilteredProducts };
