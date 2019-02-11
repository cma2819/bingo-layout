const request = require('request')
const puppeteer = require("puppeteer");

const nodecgApiContext = require("./util/nodecg-api-context");

module.exports = nodecg => {
    // Store a reference to this nodecg API context in a place where other libs can easily access it.
    // This must be done before any other files are `require`d.
    nodecgApiContext.set(nodecg);
    // Initialize Extentions
    init().then(() => {
        nodecg.log.info('Initialization successful.');
    }).catch(error => {
        nodecg.log.error('Failed to initialize:', error);
    });

    nodecg.listenFor('getBingoList', async (url, ack) => {
        const browser = await puppeteer.launch({"args": ['--no-sandbox']});
        const page = await browser.newPage();
        await page.goto(
            url, { waitUntil: 'networkidle0' }
        );
        const bingoList = [];
        const bingoDom = await page.$('#bingo');
        if (bingoDom) {
            for (var i = 0; i < 25; i++) {
                bingoList.push(await page.$eval('#slot' + (i + 1), e => e.textContent));
            }
        }
        await page.close();
        return ack(null, bingoList);
    });
};

async function init() {
    require('./timekeeping');
}