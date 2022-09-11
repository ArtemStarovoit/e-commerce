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
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const shop_item_1 = require("./models/shop-item");
const order_1 = require("./models/order");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
(0, mongoose_1.connect)(config_1.MONGO, (err) => {
    if (err)
        throw err;
    console.log('Мы подключились');
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/api/shop-items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gerItems = yield shop_item_1.Items.find().sort({ _id: 1 });
        if (!gerItems)
            throw new Error('Не найдены товары');
        res.status(200).send(gerItems);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.get('/api/shop-items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gerItem = yield shop_item_1.Items.findOne({ id: req.params.id });
        if (!gerItem)
            throw new Error('Не найдены товары');
        res.status(200).send(gerItem);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.post('/api/shop-items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_1.Order.insertMany(req.body);
        if (!result)
            throw new Error('Товар не добавлен');
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.post('/api/shop-items/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield shop_item_1.Items.find({ $text: { $search: req.body.search } });
        if (!result)
            throw new Error('Товар не добавлен');
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.listen(config_1.PORT, () => { console.log('Сервер запущен'); });
