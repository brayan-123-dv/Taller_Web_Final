const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");
const app = express();

// Permitir recibir JSON
app.use(express.json());

// Permitir peticiones desde el navegador
app.use(cors());

app.use(express.static(path.join(__dirname, "..")));

// Conectar con SQLite
const db = new sqlite3.Database("./database/foodsave.db", (err) => {
  if (err) {
    console.log("Error al conectar la base de datos");
  } else {
    console.log("Base de datos conectada");
  }
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.delete("/pedido/:id", (req, res) => {
  const id = req.params.id;

  const sql = `
    DELETE FROM pedidos
    WHERE id = ?
  `;

  db.run(sql, [id], function (err) {
    if (err) {
      res.json({
        ok: false,
        mensaje: "Error al eliminar pedido",
      });
      return;
    }

    if (this.changes === 0) {
      res.json({
        ok: false,
        mensaje: "Pedido no encontrado",
      });
      return;
    }

    res.json({
      ok: true,
      mensaje: "Pedido eliminado",
    });
  });
});

// Puerto
app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});

db.serialize(() => {
  db.run(
    `
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombres TEXT NOT NULL,
            apellidos TEXT NOT NULL,
            nacimiento TEXT NOT NULL,
            genero TEXT NOT NULL,
            correo TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `,
    (err) => {
      if (err) {
        console.log("Error al crear la tabla usuarios");
      } else {
        console.log("Tabla usuarios lista");
      }
    },
  );
  db.run(
    `
    CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        producto TEXT NOT NULL,
        precio REAL NOT NULL,
        cantidad INTEGER NOT NULL,
        metodo_pago TEXT NOT NULL,
        tiempo_entrega INTEGER NOT NULL,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )
    `,
    (err) => {
      if (err) {
        console.log("Error al crear la tabla pedidos");
      } else {
        console.log("Tabla pedidos lista");
      }
    },
  );
});

app.post("/registrar", (req, res) => {
  const { nombres, apellidos, nacimiento, genero, correo, password } = req.body;

  const sql = `
        INSERT INTO usuarios (nombres, apellidos, nacimiento, genero, correo, password)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  db.run(
    sql,
    [nombres, apellidos, nacimiento, genero, correo, password],
    function (err) {
      if (err) {
        console.log(err.message);
        res.json({ ok: false, mensaje: "Error al registrar usuario" });
      } else {
        res.json({ ok: true, mensaje: "Usuario registrado correctamente" });
      }
    },
  );
});

app.post("/login", (req, res) => {
  const { correo, password } = req.body;

  const sql = `
        SELECT * FROM usuarios 
        WHERE correo = ? AND password = ?
    `;

  db.get(sql, [correo, password], (err, row) => {
    if (err) {
      res.json({ ok: false, mensaje: "Error en el servidor" });
      return;
    }

    if (row) {
      res.json({ ok: true, mensaje: "Login correcto", usuario: row });
    } else {
      res.json({ ok: false, mensaje: "Correo o contraseña incorrectos" });
    }
  });
});

app.post("/pedido", (req, res) => {
  const { usuario_id, producto, precio, cantidad, metodo_pago, tiempo_entrega} =
    req.body;

  const sql = `
        INSERT INTO pedidos
        (usuario_id, producto, precio, cantidad, metodo_pago, tiempo_entrega)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  db.run(
    sql,
    [usuario_id, producto, precio, cantidad, metodo_pago, tiempo_entrega],
    function (err) {
      if (err) {
        console.log(err.message);
        res.json({
          ok: false,
          mensaje: "No se pudo registrar el pedido",
        });
      } else {
        res.json({
          ok: true,
          mensaje: "Pedido registrado correctamente",
        });
      }
    },
  );
});

app.get("/pedidos/:usuario_id", (req, res) => {
  const usuario_id = req.params.usuario_id;

  const sql = `
        SELECT *
        FROM pedidos
        WHERE usuario_id = ?
        ORDER BY fecha DESC
    `;

  db.all(sql, [usuario_id], (err, rows) => {
    if (err) {
      res.json({
        ok: false,
        mensaje: "Error al obtener los pedidos",
      });
      return;
    }

    res.json({
      ok: true,
      pedidos: rows,
    });
  });
});
