var mongoose = require('mongoose')
	, linkedin = require('../models/linkedin.js');
	
module.exports = Linkedin;

var nodeio = require('node.io'), options = {timeout: 10};


function Linkedin(connection) {
	mongoose.connect(connection);
}

Linkedin.prototype = {
	
	addInfo: function(req, res) {
		
		var item = req.body.item;
		
		
		var job = new nodeio.Job(options, {
			input: item,
			run: function (path) {
				this.getHtml(path, function (err, $) {
					var results = []
					var name = $('span.full-name').text;
					var title = $('#headline-container p.title').text;
					results.push["name"] = name;
					results.push["title"] = title;
					this.emit(results);
				});
			}
		});
		
		nodeio.start(job, function (err, output) {
			linkitem = new linkedin();
			linkitem.name = output[name];
			linkitem.title = output[title];
			linkitem.save(function savedItem(err) {
				if (err) {
					throw err;
				}
			});				
		}, true);
		
		res.redirect('/';)
	}
}
