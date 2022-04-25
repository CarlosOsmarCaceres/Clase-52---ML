const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeProducts = (data)=> fs.writeFileSync(productsFilePath,JSON.stringify(data),"utf-8");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	//Muestra todos los productos
	index: (req, res) => {
		res.render("products", {
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let productId = +req.params.id;// Para obtener el id del producto
		let product = products.find(product => product.id === productId);

		res.render("detail",{
			product,
			toThousand
		})
	},

	// Create - Form to create
	//Muestra el formulario de creacion
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store - 
	// Desde Desde Vender, formulario de creacion, accion crear producto
		store: (req, res) => {
			let lastId = 0;
			products.forEach(product => {
				if(product.id > lastId){
					lastId = product.id
				}
			});
			let newProduct = {
				...req.body,//con expres operator ... trae todas las propiedades de req body.
				id: lastId + 1, // agrega un id nuevo
				image: "default-image.png"
			}
			products.push(newProduct);

			writeProducts(products);
			res.send(`El producto ${req.body.name} a sido creado exitosamente`)
	},

	// Update - Form to edit
	//muestra el formulario de edicion
	edit: (req, res) => {
		let productId = +req.params.id;// CApturamos el id del prodcuto
		let product = products.find(product => product.id === productId);
		
		res.render("product-edit-form",{
			product
		})
	},
	// Update - Method to update
	// MOdifica el producto
	update: (req, res) => {
		let productId = +req.params.id;// CApturamos el id del prodcuto
		products.forEach(product => {
			if (product.id === productId) {
				
				product.name = req.body.name,
				product.price = req.body.price,
				product.discount = req.body.discount,
				product.category = req.body.category,
				product.description = req.body.description
			
			}
		});
		//escribimos el array de productos con write
		writeProducts(products)

		res.send(`Modificaste el producto ${req.body.name} exitosamente`)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;