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
const path_1 = __importDefault(require("path"));
const users_1 = __importDefault(require("./routes/users"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get("/api", (_, res) => {
        res.json({ msg: "hello from the server" });
    });
    if (process.env.NODE_ENV === "production") {
        app.use(express_1.default.static("client/build"));
        app.get("*", (_, res) => {
            res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
        });
    }
    app.use("/api/users", users_1.default);
    app.listen(process.env.PORT || 4000, () => {
        console.log("server started!");
    });
});
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map