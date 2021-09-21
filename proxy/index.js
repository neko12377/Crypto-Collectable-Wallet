const http = require("http");
const axios = require("axios");
const chalk = require("chalk")

const router = (req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': 'http://localhost:3333',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days,
        'Content-Type': "application/json; charset=utf-8",
    };

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        return res.end();

    }
    // curl --request GET \
    //      --url 'https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20'
    if (['GET', 'POST'].indexOf(req.method) > -1) {
        res.writeHead(200, headers)
        if (req.url.includes("/opensea_proxy/")) {
            const urlPath = req.url.replace("/opensea_proxy/", "https://api.opensea.io/api/v1/")
            axios
                .get(urlPath)
                .then(response => {
                    console.log(response);
                    res.write(JSON.stringify(response.data))
                    return res.end();
                })
                .catch(error => {
                    if (error.response) {
                        console.log(error.response.status);
                        res.writeHead(error.response.status, headers)
                        return res.end();
                    }else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                })
        }
    }
}

console.info(chalk.bold.hex("#21d9cc")("Proxy starting..."));
const server = http.createServer(router);

server.listen(5000);

