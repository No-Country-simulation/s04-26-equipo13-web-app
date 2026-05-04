const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server corriendo en puerto ${PORT}`);
});
