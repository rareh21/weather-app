const request = require('request');

const weather = (lat, lon, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=d245d8f1d3ef1e0fe3c8d17e78ed6e13&query=${lat},${lon}&units=m`;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service', undefined);
		} else if (body.error) {
			callback('Unable to find location!', undefined);
		} else {
			callback(undefined, `It is currently ${body.current.temperature} degree out. There is a ${body.current.precip} % chance of rain.`);
		}
	});
}

module.exports = weather;