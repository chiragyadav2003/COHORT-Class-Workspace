"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const JWT_SECRET = 'mySecret123';
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.get("/health", (req, res) => {
    return res.json({
        msg: "server is healthy"
    });
});
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    //do db validation
    const token = yield jsonwebtoken_1.default.sign({ id: 1 }, JWT_SECRET);
    res.cookie("token", token);
    res.send("logged in !!");
}));
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    const decoded = yield jsonwebtoken_1.default.verify(token, JWT_SECRET);
    //get email of user from db
    res.send({ userId: decoded.id });
}));
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ msg: "logged out !" });
});
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../src/index.html"));
});
app.listen(port, () => {
    console.log(`server is running as http://localhost:${port}`);
});
