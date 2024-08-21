"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resourceController_1 = require("../controllers/resourceController");
const router = express_1.default.Router();
router.post('/resources', resourceController_1.createResource);
router.get('/resources', resourceController_1.listResources);
router.get('/resources/:id', resourceController_1.getResource);
router.put('/resources/:id', resourceController_1.updateResource);
router.delete('/resources/:id', resourceController_1.deleteResource);
exports.default = router;
