var request = require('request')
	, jsdom = require('jsdom')
	, simplexml = require('xml-simple')
	, fs = require('fs')

module.exports.items = function(callback) {
	request({url: 'http://gameupdates.org/rss.xml'}, function(error, response, body){
		simplexml.parse(body, function(e, parsed) {
			var results = [];
			if (e) return console.error(e);
			if(typeof parsed.channel.item !== 'undefined') {
				var items = Object.keys(parsed.channel.item);
				for ( var i = 0 ; i < items.length ; i++ ) {
					var title = parsed.channel.item[items[i]].title;
					results.push({
						name: title
						, url: parsed.channel.item[items[i]].link
					});
				}
				callback(false, results);
			} else {
				callback(false, {});
			};
		});
	});
};

module.exports.download = function(url, path, callback){
	console.log('starting file download');
	request({url: url}, function(error, response, body) {
		if (error) callback(error);
		else callback(false);
	}).pipe(fs.createWriteStream(path));
};
