const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

// Inicializar APP
console.log("Iniciando APP...");
console.log("APP Iniciada exitosamente.");

// Conectar a la base de datos
console.log("Conectando con mongoDB...");
conexion();

// CREAR SERVIDOR DE NODE
const app = express();
const puerto = 3900;

// configurar cors
app.use(cors());

// convertir body a objeto js
app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({ extended: true })); // asi se pueden recibir datos de un formulario normal de html (form-url-encoded)

// craer rutas
const rutas_articulo = require("./rutas/articulo");
// cargo la ruta
app.use("/api", rutas_articulo);

// rutas de prueba hardcodeadas
app.get("/probando", (req, res) => {

    console.log("se ha ejecutado el endpoint probando");

    return res.status(200).json([
        {
            curso: "API rest",
            alumno: "adrian peñalver",
            url: "apenfe.es"
        },
        {
            curso: "Vue.js",
            alumno: "adrian peñalver",
            url: "apenfe.es"
        },
        {
            curso: "CSS",
            alumno: "adrian peñalver",
            url: "apenfe.es"
        },
    ]);

});

app.get("/", (req, res) => {

    console.log("se ha ejecutado el endpoint probando");

    return res.status(200).send("<h1>Raiz de la app</h1>");

});

//crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor a la escucha en el puerto: " + puerto);
});