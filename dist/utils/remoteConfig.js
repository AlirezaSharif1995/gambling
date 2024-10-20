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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const contryAccessKey = "";
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(200).json({ success: true, message: "configs received", countryAccessKey: "Asdasd" });
    }
    catch (error) {
        console.error('Error registering player:', error);
        res.status(500).json({ success: false, message: 'Error registering player', error: error });
    }
}));
exports.default = router;
