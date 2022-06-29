## couchdb-download-csv

This tool is a Nodejs command line script that connects to a couchdb database and downloads data in a flat csv file. CSV files created by the script are saved in a folder called `output`

### Pre-requisites

Before running the script, you must have Node and NPM installed. 

1. [Nodejs](https://nodejs.org/en/download/)
2. [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
3. URL and credentials for a couchdb database

### Installation

Run the following to install the dependencies needed to run the script

    npm install
    
Set up the connection to the database url

    cp config.defaults.json config.json

Edit `config.json` to set the `targetUrl` for the database
    
### Run the script

To download the data, run the script below filling in the required and optional parameters

    node download_data.js <db-name> <start-key> [end-key]
    
Parameters:
- db-nam: The name of the database in couchdb to connect to
- start-key: The startkey used to search for and download documents in couchdb
- end-key (optional): The endkey used to search for and download documents in couchdb

## Example usage

The following example downloads a csv of the data from the `zanzibar` database with all documents starting with `results-Case`:

    node download_data.js zanzibar results-Case
    
