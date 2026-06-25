require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/db");

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");

  
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ Database synced successfully");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ DB Error:", error);
  });