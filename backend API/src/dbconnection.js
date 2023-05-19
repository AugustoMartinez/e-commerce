const mongoose = require('mongoose');

(async () => {
	//Declarando la URL de MongoDB Atlas
	const user = process.env.USER_DB;
	const password = process.env.PASSWORD_DB;
	const url = `mongodb+srv://${user}:${password}@cluster0.4tqsb.mongodb.net/e-commerce?retryWrites=true&w=majority`;

	console.log('Conectando a DB...');

	try {
		//Iniciando la conexion con MongoDB
		const db = await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: 'e-commerce',
		});
		console.log('Databse is connected to: ', db.connection.name);
	} catch (e) {
		console.error(e);
	}
})();