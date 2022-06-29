var PouchDB = require('pouchdb')
const { Parser } = require('json2csv');
const fs = require('fs');

try {
    const config = require('./config.json')
    var db_url = config.targetUrl
} catch (err) {
    if (err.error == 'not_found') {
        console.log('User must create the config.json file with the information for couchdb')
        return
    } else {
        throw err
    }
}

if (process.argv.length < 3) {
    help()
    return -1
}

const db_name = process.argv[2]
const start_key = process.argv[3]
var end_key = `${start_key}\ufff0`
if (process.argv.length > 4) {
    end_key = process.argv[4]
}
go(db_url, db_name, start_key, end_key)


function help() {
    console.log("couchdb_download_data help")
    console.log("node download_data.js <db_name> <start_key> [end_key]")
}

async function go(db_url, db_name, start_key, end_key) {
    var db = new PouchDB(`${db_url}/${db_name}`)

    var allDocs = [];
    if (db) {
        var docs = await db.allDocs({startkey: `${start_key}`, endkey: `${end_key}`, include_docs:true})
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
        } else {
            console.log(`No couchdb documents found in ${db_name} with startkey ${start_key} and endkey ${end_key}`)
        }
    }
}