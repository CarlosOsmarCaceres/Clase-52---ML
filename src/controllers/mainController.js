const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Funcion toThousand pasa una expresion regularn.string pasa el numero string y replace, reemplaza cada 3 espacios el espacio por punto
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	//Lista de productos
	index: (req, res) => {
		let productsInSale = products.filter(product => product.category==="in-sale");
		let productsVisited = products.filter(product => product.category==="visited");
		// index es la vista index.ejs
		res.render("index",{
			productsInSale,
			productsVisited,
			toThousand
		})
	},
	//Buscador
	search: (req, res) => {
		let searchResult = []
		products.forEach(product => {
			if(product.name.toLowerCase().includes(req.query.keywords.toLowerCase())){
				searchResult.push(product)
			}			
		});
		res.render("results", {
			searchResult,
			keyword:req.query.keywords,
			toThousand
		})
		// let keyword = req.query;
		// res.send(keyword)
		// let keyword = req.query.keywords.toLowerCase(); /* Obtengo la palabra clave del buscador query string, toLowerCase para may y min */
		// // keywords es la palabra clave del input
		// let searchResult = products.filter(product => product.name.toLowerCase() === keywords); /* el productos aplicado al metodo filter devuelva en su propiedad name aplicado toLowerCase sea igual a la palabra clave del buscador */
		
		// res.render("results"),{
		// 	searchResult,
		// 	keyword: req.query.keywords
		},
	};


module.exports = controller;
