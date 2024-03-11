"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todos_1 = __importDefault(require("./routes/todos"));
const cors_1 = __importDefault(require("cors"));
require("./config/db"); //mongodb
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = 8080;
// Parse incoming JSON requests
app.use(body_parser_1.default.json());
// API Routes
app.use("/api", todos_1.default);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
