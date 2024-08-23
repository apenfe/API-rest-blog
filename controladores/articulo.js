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

module.exports = {
    prueba,
    curso
}