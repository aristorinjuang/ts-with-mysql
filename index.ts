import express, { Express, Request, Response } from 'express';
import mysql, { Connection, MysqlError } from 'mysql';

const app: Express = express();
const port: number = 8000;
const connection: Connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'go_database'
});

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  connection.query("SELECT * FROM articles", (err: MysqlError | null, result: any) => {
    if (err) {
      console.error(err)

      res.status(500).end()

      return
    }

    res.status(200).json(result).end()
  });
})

app.post('/', (req: Request, res: Response) => {
  connection.query("INSERT INTO articles SET ?", req.body, (err: MysqlError | null, result: any) => {
    if (err) {
      console.error(err)

      res.status(500).end()

      return
    }

    req.body.id = result.insertId
    res.status(200).json(req.body).end()
  });
})

app.get('/:id', (req: Request, res: Response) => {
  connection.query("SELECT * FROM articles WHERE id = ?", [req.params.id], (err: MysqlError | null, result: any) => {
    if (err) {
      console.error(err)

      res.status(500).end()

      return
    }

    res.status(200).json(result).end()
  });
})

app.put('/:id', (req: Request, res: Response) => {
  req.body.id = Number(req.params.id)
  connection.query(
    "UPDATE articles SET title = ?, content = ? WHERE id = ?",
    [req.body.title, req.body.content, req.body.id],
    (err: MysqlError | null) => {
    if (err) {
      console.error(err)

      res.status(500).end()

      return
    }

    res.status(200).json(req.body).end()
  });
})

app.delete('/:id', (req: Request, res: Response) => {
  connection.query("DELETE FROM articles WHERE id = ?", [req.params.id], (err: MysqlError | null) => {
    if (err) {
      console.error(err)

      res.status(500).end()

      return
    }

    res.status(200).end()
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})