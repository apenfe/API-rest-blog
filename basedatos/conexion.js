const mongoose = require("mongoose");

const conexion = async() => {

    try{

        await mongoose.connect("mongodb://localhost:27017/mi_blog");
        console.log("Conexion exitosa a la BBDD");

    }catch(error){

        console.log(error);
        throw new Error("No se ha podidodo conectar a la BBDD");

    }

}

module.exports = {
    conexion
}
