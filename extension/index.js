const request = require('request')
const puppeteer = require("puppeteer");

module.exports = nodecg => {
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
}