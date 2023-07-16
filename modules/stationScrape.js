const axios = require('axios')
const https  = require('https')
const cheerio = require('cheerio')
const httpsAgent = new https.Agent({rejectUnauthorized: false})

/**
 * Retrieves the station data with web scraping.
 *
 * @return {Promise<Array>} The promise that resolves to an array of station coordinates.
 */
/**
 * The function `getStationWithWeb` retrieves station coordinates from a website and returns them as a
 * promise.
 * @returns The function `getStationWithWeb` returns a promise that resolves to an array of
 * coordinates.
 */
const getStationWithWeb = () => {
    const coreStationURL = "https://www.balikesirulasim.com.tr/ajax/busline/list/bandirma";
    const stationDetailBaseURL = "https://www.balikesirulasim.com.tr/hat/";

    return new Promise((resolve, reject) => {
        axios.get(coreStationURL, { httpsAgent })
            .then(response => {
                const coordinatesResult = [];

                /* The code `const promises = response.data.map(element => { ... })` is creating an
                array of promises. */
                const promises = response.data.map(element => {
                    return axios.get(stationDetailBaseURL + element.seo, { httpsAgent })
                        .then(result => {
                            const $ = cheerio.load(result.data).html().toString('utf-8');
                            const allCoordinates = $.match(/let stationsData = \[(.*?)\]/);

                            /* The code block is checking if the variable `allCoordinates` has a length
                            greater than 0. If it does, it means that there are coordinates
                            available. */
                            if (allCoordinates.length > 0) {
                                for (const coordinate of allCoordinates){
                                    const jsonData = JSON.parse(`[${coordinate}]`)
                                    coordinatesResult.push(jsonData)
                                }
                            }
                        })
                        .catch(err => {
                            reject(err);
                        });
                });

                Promise.all(promises)
                    .then(() => {
                        resolve(coordinatesResult);
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
};


module.exports = getStationWithWeb