const expressJwt = require('express-jwt');

async function isRevoked(req, payload, done) {
	if (!payload.isAdmin) {
		done(null, true);
	}

	done();
}

function authJwt() {
	const secret = process.env.SECRET;
	const api = process.env.API_URL;

	return expressJwt({
		secret,
		algorithms: ['HS256'],
		isRevoked: isRevoked,
	}).unless({
		path: [
			{ url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
			{ url: /\/e-commerce\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
			{ url: /\/e-commerce\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
			{ url: /\/e-commerce\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
			`${api}/users/login`,
			`${api}/users/register`,
		],
	});
}

module.exports = authJwt;