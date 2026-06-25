const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const Property = require("../models/Property");

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const property = await Property.create({
        ...req.body,
        image: req.file
          ? `/uploads/${req.file.filename}`
          : null,
        userId: req.user.id,
      });

      res.status(201).json({
        message: "Property created",
        property,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const {
      city,
      type,
      minPrice,
      maxPrice,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    let where = {};

    if (city) where.city = city;
    if (type) where.type = type;

    if (minPrice && maxPrice) {
      where.price = {
        [require("sequelize").Op.between]: [minPrice, maxPrice],
      };
    }

    if (search) {
      where.title = {
        [require("sequelize").Op.like]: `%${search}%`,
      };
    }

    const properties = await Property.findAll({
      where,
      limit: Number(limit),
      offset: (page - 1) * limit,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      page: Number(page),
      limit: Number(limit),
      count: properties.length,
      data: properties,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Not found" });
    }

    if (property.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await property.update(req.body);

    res.json({
      message: "Updated successfully",
      property,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Not found" });
    }

    if (property.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await property.destroy();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;