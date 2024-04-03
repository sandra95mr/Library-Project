const controladorUser ={}
const users = require("../models/user")

controladorUser.crearUser = async (req,res)=>{
    const user = new users({

        nombre: req.body.nombre,
        ciudad: req.body.ciudad,
        email: req.body.email,
        contrasenia: req.body.contrasenia,
    
      });

      await user.save();
      res.json({ status: "Usuario Creado" });
   
    
}

controladorUser.mostrarUsers = async(req,res)=>{
  const leerUsuarios = await users.find()   //mientras busca estamos a la escucha y lo guarda en la constante, proceso asincrono
  res.json(leerUsuarios)
}


controladorUser.editarUser = async(req,res)=>{
  await users.findByIdAndUpdate(req.params.id.trim(), req.body)
  res.json({
      status:"Usuario Actualizado"
  })
  //Para actualizar un producto necesito pasarle su id y el body de la request donde están los datos actuales
}


controladorUser.borrarUser = async(req,res)=>{
  const userBorrado = await users.findByIdAndDelete(req.params.id.trim())
  res.json({
      'status':'Usuario Borrado'
  })
}


module.exports = controladorUser
