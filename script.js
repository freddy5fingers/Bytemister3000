const http = require('https');

const options = {
	method: 'GET',
	hostname: 'billboard-api2.p.rapidapi.com',
	port: null,
	path: '/hot-100?date=2019-05-11&range=1-10',
	headers: {
		'X-RapidAPI-Key': 'aef6113c9bmshfe5fe8318f667b3p1230b7jsn69df26eda595',
		'X-RapidAPI-Host': 'billboard-api2.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();