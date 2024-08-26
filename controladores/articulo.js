const { validarArticulo } = require("../helper/validar")
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

        validarArticulo(parametros);

    } catch (error) {
        return res.status(400).json({
            status: "error",
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

const uno = (req, res) => {

    // recoger id por url
    let id = req.params.id;

    // buscar el articulo
    Articulo.findById(id)
        .then((articulo) => {
            return res.status(200).json({
                status: "success",
                articulo
            });
        })
        .catch(error => {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el articulo"
            });
        })

};

const borrar = (req, res) => {

    // recoger id por url
    let articulo_id = req.params.id;

    Articulo.findOneAndDelete({ _id: articulo_id })
        .then(articuloBorrado => {
            return res.status(200).json({
                status: "success",
                articuloBorrado
            });
        })
        .catch(error => {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el articulo"
            });
        });

}

const editar = (req, res) => {
    // Recoger id del cliente a editar    
    let editarId = req.params.id;
    // Recoger datos del body   
    let parametros = req.body;
    // Validamos datos   

    try {

        validarArticulo(parametros);

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    // Buscar y actualizar el articulo  
    Articulo.findOneAndUpdate({ _id: editarId }, req.body, { new: true })
        .then((clienteActualizado) => {
            if (!clienteActualizado) {
                return res.status(500).json({
                    status: "error",
                    mensaje: "Error al actualizar"
                });
            }
            // Devolver respuesta       
            return res.status(200).json({
                status: "success",
                cliente: clienteActualizado
            });
        })
        .catch((error) => {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al actualizar"
            });
        });
};

module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar
}