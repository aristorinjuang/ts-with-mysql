"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const app = (0, express_1.default)();
const port = 8000;
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'go_database'
});
app.use(express_1.default.json());
app.get('/', (req, res) => {
    connection.query("SELECT * FROM articles", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        res.status(200).json(result).end();
    });
});
app.post('/', (req, res) => {
    connection.query("INSERT INTO articles SET ?", req.body, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        req.body.id = result.insertId;
        res.status(200).json(req.body).end();
    });
});
app.get('/:id', (req, res) => {
    connection.query("SELECT * FROM articles WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        res.status(200).json(result).end();
    });
});
app.put('/:id', (req, res) => {
    req.body.id = Number(req.params.id);
    connection.query("UPDATE articles SET title = ?, content = ? WHERE id = ?", [req.body.title, req.body.content, req.body.id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        res.status(200).json(req.body).end();
    });
});
app.delete('/:id', (req, res) => {
    connection.query("DELETE FROM articles WHERE id = ?", [req.params.id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        res.status(200).end();
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
