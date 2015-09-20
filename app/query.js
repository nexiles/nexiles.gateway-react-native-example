'use strict';

var gateway = require("./gateway");
var query_service = "services/query";

function qs(p) {return query_service + "/" + p; }


function demo_query(q) {
	return {
		qq: [
			q
		],
		fields: [
			"name",
			"number",
			"CADName",
			"state",
			"location",
			"containerName"
		],
		associations: [
			"representations"
		]
	}
}

function version() {
	return gateway.getJSON(qs("version"));
}

function query(q) {
	var uri = qs("1.0/query");
	var query = demo_query(q);

	query.limit = 100;
	query.start = 0;
	query.pos = 0;

	console.debug("query.query: uri %s, query %o", uri, query);

	return gateway.api_request("POST", uri)
		.send(query)
		.end()
		.catch(function (err) {
			console.error("QUERY FAIL: err=%o, response=%o", err, err.response);
		}).then(function(res){
			return res.body
		})
}

/*
function resolveThumbs(items, cb) {
	var promises = [];
	for (let item of items) {
		for (let rep of item.representations) {
			if (rep.role == "THUMBNAIL") {
				console.debug("rep: %s, %o", rep.url, rep);
				var prom = gateway.request("GET", rep.url)
					.auth("wcadmin", "wcadmin")
					.accept("image/jpeg")
					.then(function (response) {
						console.debug(" *** item: %s", item.name);
						cb(item, response);
					})
					.catch(function (err) {
						console.error(err.response);
					});
				promises.push(prom)
			}
		}
	}

	return Promise.all(promises);
}
*/


module.exports = {
	version: version,
	query: query,
	// resolveThumbs: resolveThumbs,
};