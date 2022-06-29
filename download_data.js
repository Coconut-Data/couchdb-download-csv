var PouchDB = require('pouchdb')
const { Parser } = require('json2csv');
const fs = require('fs');

async function go(db_name, data_id, db_url) {
    var db = new PouchDB(`${db_url}/${db_name}`)

    var allDocs = [];
    if (db) {
        var docs = await db.allDocs({startkey: `${data_id}`, endkey: `${data_id}\ufff0`, include_docs:true})
        for (var row of docs.rows) {
            /// const newJSON = { ...toAppend, ...original };
            allDocs.push(row.doc)
        }

        if (allDocs.length > 0) {
            try {
                const json2csvParser = new Parser();
                var csv = json2csvParser.parse(allDocs);

                fs.mkdir('output', function(err) {
                    if (err) {
                        if (err.errno == -17) {
                            return;
                        } else {
                            throw err;
                        }
                    }
                 });

                fs.writeFile(`output/${db_name}-${data_id}-data.csv`, csv, function(err) {
                    if (err) throw err;
                    console.log('file saved');
                });

            } catch (err) {
                console.log(err)
            }
        }
    }
}

const db_name = process.argv[2] || 'mangosteen'
const data_id = process.argv[3] || 'result-SO'
const db_url = process.argv[4] || 'http://analytics:usethedata@zanzibar.cococloud.co'


go(db_name, data_id, db_url)
