var PouchDB = require('pouchdb')
const { Parser } = require('json2csv');

async function go() {
    var db = new PouchDB('http://analytics:usethedata@zanzibar.cococloud.co/mangosteen')

	var allDocs = [];
	if (db) {
		var docs = await db.allDocs({startkey: "result-household", endkey: "result-household\ufff0", include_docs:true})
		for (var row of docs.rows) {
			/// const newJSON = { ...toAppend, ...original };
            allDocs.push(row.doc)
		}
	}

	if (allDocs) {
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(allDocs);

        console.log(csv)
	}
}

go()
