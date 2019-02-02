'use strict';

const panels = nodecg.Replicant('panels');
const rows = nodecg.Replicant('rows');
const title = nodecg.Replicant('title');
const bingoMap = nodecg.Replicant('bingo');
const modeList = nodecg.bundleConfig.modeList;

/* Define map, it has Called Functions by panel's "MODE" */
const funcMap = {
    "video": editPanelforVideo,
    "bingo": editPanelforBingo,
    "text": editPanelforText
}

var preClass = 'r2_'
var preClassAry = ['r1_', 'r2_', 'r3_'];
var dataAry = [];

panels.on('change', (newVal, oldVal) => {
    dataAry = newVal;
    replaceMain(newVal, oldVal);
});

rows.on('change', newVal => {
    preClass = preClassAry[newVal - 1];
    replaceMain(dataAry, null);
});

title.on('change', newVal => {
    $('span#title').text(newVal);
});

/* Replace main div with new div */
function replaceMain(newList, oldList) {
    var maindiv = $('div#main');
    if (!oldList) {
        oldList = [];
        maindiv.empty();
    }
    for (var i = 0; i < newList.length; i++) {
        /* Compare Elements Parameter in List */
        if (i < oldList.length) {
            if (newList[i]['mode'] != oldList[i]['mode']
                || newList[i]['param'] != oldList[i]['param']
                || JSON.stringify(newList[i]['text']) != JSON.stringify(oldList[i]['text'])) {
                var panelEle = $('<div class="panel"></div>').attr('id', i);
                funcMap[modeList[dataAry[i]['mode']][0]](panelEle, i);
                var target = $('div#' + i);
                if (target) {
                    target.replaceWith(panelEle);
                } else {
                    maindiv.append(panelEle);
                }
            }
        } else {
            var panelEle = $('<div class="panel"></div>').attr('id', i);
            funcMap[modeList[dataAry[i]['mode']][0]](panelEle, i);
            maindiv.append(panelEle);
        }
    }
    /* Remove old elements */
    for (var j = i; j < oldList.length; j++) {
        console.log(j);
        maindiv.children('div#' + j).remove();
    }
}

/* Edit panel for showing Video */
const aspects = ['4-3', '16-9'];
function editPanelforVideo(ele, i) {
    var param = dataAry[i]['param'];
    console.log(dataAry[i]['text']);
    var text = dataAry[i]['text'][0];
    var overText = ''
    if (dataAry[i]['text'].length > 1) {
        overText = dataAry[i]['text'][1];
    }

    ele.addClass('video ' + preClass + aspects[param]);
    ele.text(overText);
    ele.append($('<span class="name"></span>').text(text));
}

/* Edit panel for showing Bingo */
function editPanelforBingo(ele, i) {
    var param = dataAry[i]['param'];
    var seed = dataAry[i]['text'][0];

    /* Set Seed ID to this panel */
    ele.attr('seed', seed);
    /* Set Class for bingo */
    ele.addClass('bingo');

    /* Call function for getting Bingo List */
    if (seed) {
        nodecg.sendMessage('getBingoList', seed, () => {
            return;
        });
    }
}

/* When Bingo is changed, Show Bingo to panel it has same seed id */

bingoMap.on('change', list => {
    for (var key in list) {
        var target = $('div[seed="' + key + '"]');
        makeBingoDom(key, target, list[key]);
    }
});


/* Make Bingo DOM */
function makeBingoDom(seed, ele, bingo) {
    ele.empty();
    ele.append($('<div></div>').addClass('bingoTitle').text('Seed:' + seed))
    var table = $('<table></table>')

    /* Prepare Rows */
    for (var i = 0; i < 5; i++) {
        table.append($('<tr></tr>').attr('id', 'row' + (i + 1)));
    }
    for (var i = 0; i < bingo.length; i++) {
        var row = parseInt(i / 5) + 1;
        var col = parseInt(i % 5) + 1;

        table.children('#row' + row).append($('<td></td>')
            .addClass('col' + col).addClass('slot c_0').attr('onclick', 'toggleColor(this)').text(bingo[i]));
    }
    ele.append(table);
}

/* Toggle Bingo Slot's Color */
const classList = ['c_0', 'c_1', 'c_2', 'c_3'];
function toggleColor(ele) {
    console.log($(ele).hasClass('c_0'));
    for (var i = 0; i < classList.length; i++) {
        if ($(ele).hasClass(classList[i])) {
            var idx = (i + 1) % classList.length;
            $(ele).removeClass(classList[i]);
            $(ele).addClass(classList[idx]);
            break;
        }
    }
}

/* Edit panel for showing Text */
const align = ['left', 'center', 'right'];
function editPanelforText(ele, i) {
    var alignClass = align[dataAry[i]['param']];
    var texts = dataAry[i]['text'];
    var html = texts.join('<br />');
    ele.addClass(alignClass);
    ele.addClass('text');
    ele.html(html);
}