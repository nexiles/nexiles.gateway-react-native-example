'use strict';

var agent = require('superagent-promise')(require('superagent'), Promise);

var API_URL   = "http://wc002.dev.aws.nexiles.com/Windchill/servlet/nexiles/tools";

var username = "nexiles";
var password  = "nexiles";

function request(method, path) {
	var url = API_URL + "/" + path;
	// console.debug("request: url=", url);
	return agent(method, url).auth(username, password);
}

function get(path, query) {
	var req = request("GET", path);
	// console.debug("get: req=", req);

	if (query) {
		req.query(query);
	}

	return req.end()
}

function getJSON(path, query) {
	return get(path, query).then(function (res) {
		// console.debug("getJSON: res=%o", res);
		return res.body
	}).catch(function(err) {
		console.error(err);
	})
}

function version() {
	return getJSON("version")
}

function query(what, query) {
	return getJSON("api/1.0/" + what, query);
}

module.exports = {
	request: request,
	get: get,
	getJSON: getJSON,
	version: version,
	query: query,
};