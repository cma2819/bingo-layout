const request = require('request')
const puppeteer = require("puppeteer");

module.exports = nodecg => {
    const bingoMap = nodecg.Replicant('bingo');
    nodecg.listenFor('getBingoList', async seed => {
        const browser = await puppeteer.launch({"args": ['--no-sandbox']});
        const page = await browser.newPage();
        await page.goto(
            'http://www.speedrunslive.com/tools/oot-bingo/?seed=' + seed + '&lang=jp',
            { waitUntil: 'networkidle0' }
        );

        const bingoDom = await page.$('#bingo');
        if (bingoDom) {
            const bingoList = [];
            for (var i = 0; i < 25; i++) {
                bingoList.push(await page.$eval('#slot' + (i + 1), e => e.textContent))
            }
            if (!bingoMap.value) {
                bingoMap.value = {};
            }
            bingoMap.value[seed] = bingoList;
        }
        await page.close();
        return 0;
    });
}