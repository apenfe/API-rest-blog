const validator = require("validator");
const Articulo = require("../modelos/Articulo");

const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una accion de prueba en controlador de articulos"
    });
}

const curso = (req, res) => {

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

};

const crear = (req, res) => {

    // recoger los parametros por post
    let parametros = req.body;

    // validar los datos
    try {

        let validarTitulo = !validator.isEmpty(parametros.titulo) &&
            validator.isLength(parametros.titulo, { min: 5, max: undefined });
        let validarContenido = !validator.isEmpty(parametros.contenido);

        if (!validarContenido || !validarTitulo) {
            throw new Error("No se ha validado la información");
        }

    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Faltan datos por enviar"
        });
    }

    // crear el objeto siguienddo el modelo creado
    const articulo = new Articulo(parametros); // automatico

    // asignar valores a objeto (manual o auto)
    // articulo.titulo = parametros.titulo; MANUAL


    // guardar articulo en base de datos
    articulo.save()
        .then((articuloGuardado) => {
            return res.status(200).json({
                status: 'success',
                Articulo: articuloGuardado,
                mensaje: 'Articulo creado con exito'
            });
        })
        .catch((error) => {
            return res.status(400).json({
                status: 'error',
                mensaje: 'No se ha guardado el articulo: ' + error.message
            });
        });

}

const listar = (req, res) => {

    let consulta = Articulo.find({});

    if (req.params.ultimos) {
        consulta.limit(3);
    }

    consulta.sort({ fecha: -1 })
        .then((articulos) => {

            if (!articulos) {

                return res.status(404).json({
                    status: "error",
                    mensaje: "No se han encontrado articulos",
                });
            }

            return res.status(200).send({
                status: "success",
                parametro_url: req.params.ultimos,
                contador: articulos.length,
                articulos,

            });

        })

        .catch((error) => {

            return res.status(500).json({
                status: "error",
                mensaje: "Ha ocurrido un error al listar los articulos",
                error: error.message,
            });
        });

};

module.exports = {
    prueba,
    curso,
    crear,
    listar
}