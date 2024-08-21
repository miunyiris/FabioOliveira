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
exports.deleteResource = exports.updateResource = exports.getResource = exports.listResources = exports.createResource = void 0;
const database_1 = require("../database");
const createResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.connectDB)();
    const { name, description } = req.body;
    const result = yield db.run('INSERT INTO resources (name, description) VALUES (?, ?)', [name, description]);
    const newResource = {
        id: result.lastID,
        name,
        description,
    };
    res.status(201).json(newResource);
});
exports.createResource = createResource;
const listResources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.connectDB)();
    const resources = yield db.all('SELECT * FROM resources');
    res.json(resources);
});
exports.listResources = listResources;
const getResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.connectDB)();
    const { id } = req.params;
    const resource = yield db.get('SELECT * FROM resources WHERE id = ?', [id]);
    if (resource) {
        res.json(resource);
    }
    else {
        res.status(404).json({ message: 'Resource not found' });
    }
});
exports.getResource = getResource;
const updateResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.connectDB)();
    const { id } = req.params;
    const { name, description } = req.body;
    const result = yield db.run('UPDATE resources SET name = ?, description = ? WHERE id = ?', [name, description, id]);
    if (result.changes !== undefined && result.changes > 0) {
        res.json({ id, name, description });
    }
    else {
        res.status(404).json({ message: 'Resource not found' });
    }
});
exports.updateResource = updateResource;
const deleteResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.connectDB)();
    const { id } = req.params;
    const result = yield db.run('DELETE FROM resources WHERE id = ?', [id]);
    if (result.changes !== undefined && result.changes > 0) {
        res.status(204).send();
    }
    else {
        res.status(404).json({ message: 'Resource not found' });
    }
});
exports.deleteResource = deleteResource;
