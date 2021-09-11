"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.get("/api", (_, res) => {
    res.json({ msg: "hello from the server" });
});
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static("client/build"));
    app.get("*", (_, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
app.listen(process.env.PORT || 4000, () => {
    console.log("server started!");
});
//# sourceMappingURL=index.js.map