'use strict'

const puppeteer = require("puppeteer");

const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();

/**
 * Getting Bingo Task List.
 * @param url - Web Page URL contains Bingo Card(#slot1-25).
 * @return Promise.String[] it has Task context, length 25.
 */
async function getBingolist(url) {
    const browser = await puppeteer.launch({ "args": ['--no-sandbox'] });
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
        await page.close();
        return bingoList;
    } else {
        await page.close();
        return Promise.reject('Bingo Card is not found.');
    }
}
nodecg.listenFor('getBingoList', (url, ack) => {
    getBingolist(url).then(bingoList => { return ack(null, bingoList) })
        .catch(reason => nodecg.log.info(reason));
})