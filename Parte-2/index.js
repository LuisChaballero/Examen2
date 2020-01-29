let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );
let {BookmarkList} = require('./model');

let app = express();

let server;

/* Tu código va aquí */
app.put('/api/boojmarks/:id', jsonParser, (req, res) => {
	let id = req.params.id;
	let bodyId = req.body.id;
	let titulo = req.body.titulo;
	let descripcion = req.body.descripcion;
	let url = req.body.url;
	
	if (!bodyId){
		res.statusMessage = "Id no proporcionado";
		res.status(406).send();
	}
	else if(id != bodyId){
		res.statusMessage = "No coinciden los ids";
		res.status(409).send();
	}
	else if(titulo == "" && descripcion == "" && url == ""){
		res.statusMessage = "Datos no proporcionados";
		res.status(406).send();

	}
	else {
		let updatedBookmark = {};
		if (titulo != ""){
			updatedBookmark.titulo = titulo;
		}
		if (descripcion != ""){
			updatedBookmark.descripcion = descripcion;
		}
		if (url != ""){
			updatedBookmark.url = url;
		}

		BookmarkList.updatedBookmark(bodyId, updatedBookmark)
			.then( result => {
				if (result.length > 0){
					res.status(202).json(updatedBookmark)
				}

			})
			.catch( error => {
				throw Error (error);
			})
	}
});

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}