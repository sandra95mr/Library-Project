const controladorProduct ={}
const products = require("../models/product")

controladorProduct.getProducts = async(req,res)=>{
     const leerProducts = await products.find()   //mientras busca estamos a la escucha y lo guarda en la constante, proceso asincrono
     res.json(leerProducts)
}

controladorProduct.mostrarProducts = async(req,res)=>{
    const leerProducts = await products.find()   //mientras busca estamos a la escucha y lo guarda en la constante, proceso asincrono
    res.json(leerProducts)
}

controladorProduct.mostrarProduct = async(req,res)=>{
    const product = await products.findById(req.params.id.trim())
    res.json(product)
}
controladorProduct.crearProduct = async (req,res)=>{
    const product = new products({
        titulo: req.body.titulo,
        paginas: req.body.paginas,
        genero: req.body.genero,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        ruta: req.body.ruta,

      });

      await product.save();
      res.json({ status: "Producto Creado" });
   
    
}
controladorProduct.editarProduct = async(req,res)=>{
    await products.findByIdAndUpdate(req.params.id.trim(), req.body)
    res.json({
        status:"Producto Actualizado"
    })
    //Para actualizar un producto necesito pasarle su id y el body de la request donde están los datos actuales
}
controladorProduct.borrarProduct = async(req,res)=>{
    const productBorrado = await products.findByIdAndDelete(req.params.id.trim())
    res.json({
        'status':'Producto Borrado'
    })
}

module.exports = controladorProduct

