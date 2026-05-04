const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");

const generateRouter = require("./routes/generate");
const regenerateRouter = require("./routes/regenerate");
const publishRouter = require("./routes/publish");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/api", generateRouter);
app.use("/api", regenerateRouter);
app.use("/api", publishRouter);

app.listen(PORT, () => {
    console.log(`Server corriendo en puerto ${PORT}`);
});
