
const panels = nodecg.Replicant('panels', { defaultValue: "", persistent: true });
const rows = nodecg.Replicant('rows', { defaultValue: 1 });
const title = nodecg.Replicant('title', { defaultValue: "", persistent: true });
const modeList = nodecg.bundleConfig.modeList;

const panelEle = $('#panels');

var cntPanel = 0;
//var aryPanel = [];

/* Init panels when dashborad is launched */

function initPanel() {
    var dataAry = panels.value || [];
    for (var i = 0; i < dataAry.length; i++) {
        var panel = makePanel(i);
        var data = dataAry[i];
        /* init values */
        panel.children('select[name="mode"]').val(data['mode']);
        panel.children('select[name="param"]').val(data['param']);
        panel.children('input[name="text"]').val(data['text']);
        panelEle.append(panel);
    }
}

function addPanel() {
    //    var lenPanels = aryPanel.length;
    //    aryPanel.push(makePanel(cntPanel));
    panelEle.append(makePanel(cntPanel));
    cntPanel++;

    reflect();
}

function makePanel(num) {
    var elePanel = $('<div class="panel" id="' + num + '"></div>');

    /* Make Select input for Mode value */
    var selectEle = $('<select name="mode"></select>');
    selectEle.attr('onchange', 'changeMode(this.value,' + num + ')');
    for (var i = 0; i < modeList.length; i++) {
        selectEle.append($('<option>' + modeList[i][0] + '</option>').val(i));
    }
    elePanel.append(selectEle);

    /* Make Select input for Param value with mode[0]*/
    var paramEle = $('<select name="param"></select>');
    for (var i = 0; i < modeList[0][1].length; i++) {
        paramEle.append($('<option>' + modeList[0][1][i] + '</option>').val(i));
    }
    elePanel.append(paramEle);

    /* Make Panel Controller */
    elePanel.append(
        $('<a href="javascript:void(0)">▲</a>').attr('onclick', 'upPanel(' + num + ')')
    );
    elePanel.append(
        $('<a href="javascript:void(0)">▼</a>').attr('onclick', 'downPanel(' + num + ')')
    );
    elePanel.append(
        $('<a href="javascript:void(0)">×</a>').attr('onclick', 'deletePanel(' + num + ')')
    );
    /* Make Text input */
    var txtPanel = $('<div class="text"></div>');
    txtPanel.append($('<input type="text" name="text" size="60"/>'));
    /* Add Sub-Control for video */
    txtPanel.append($('<span class="sub-ctrl"><input type="text" name="text" size="40" placeholder="Over-lay text" /></span>'));
    elePanel.append(txtPanel);

    return elePanel;
}

/* Change Param values when Mode is changed */
function changeMode(val, num) {
    /* Get Param select Elements with element number */
    //var paramEle = aryPanel[num].children('select[name="param"]');
    var paramEle = $('.panel#' + num).children('select[name="param"]');

    paramEle.empty();
    for (var i = 0; i < modeList[val][1].length; i++) {
        paramEle.append($('<option>' + modeList[val][1][i] + '</option>').val(i));
    }
    updateSubCtrl(val, num);
}

/* Update Sub-Controller for Panel */
function updateSubCtrl(mode, num) {
    ele = $('.panel#' + num);
    /* Remove before updateSubCtrl */
    $(ele).find('.sub-ctrl').replaceWith('');
    if (mode == 0) {
        /* Add Sub-Control for video */
        ele.children('div.text')
            .append($('<span class="sub-ctrl"><input type="text" name="text" size="40" placeholder="Over-lay text" /></span>'));
    } else if (mode == 2) {
        /* Add Sub-Control for text */
        $(ele).children('select[name="param"]').after(
            $('<span class="sub-ctrl"></span>')
                .append($('<a href="javascript:void(0)" onclick="addSubRow(' + num + ')"></a>').text('＋'))
                .append($('<a href="javascript:void(0)" onclick="removeSubRow(' + num + ')"></a>').text('ー'))
        )
    }
}

/* Change Row counts when Rows is changed */
function changeRows(val) {
    rows.value = val;
    reflect();
}

/* Change Title content when Title is changed */
function changeTitle(val) {
    title.value = val;
    reflect();
}

/* Reflect replicant for drawing Panels */
function reflect() {
    /* Call reflect() for sync drawing */
    if ($('input[name="auto"]').prop("checked")) {
        reflect_update();
    }
}

/* Reflect with Update Button */
function reflect_update() {
    /* Update Rows for Update Panel */
    rows.value = $('select[name="row"]').val();
    /* Update Title for Update Title */
    title.value = $('input[name=title]').val();
    /* Call reflect() for sync drawing */
    var dataAry = [];
    var aryPanel = $('.panel');
    for (var i = 0; i < aryPanel.length; i++) {
        var data = {};
        var ele = $(aryPanel[i]);
        data['mode'] = ele.children('select[name="mode"]').val();
        data['param'] = ele.children('select[name="param"]').val();
        data['text'] = getTexts(ele.children('div.text'));
        dataAry.push(data);
    }
    panels.value = dataAry;
}

/* Get texts from span.text */
function getTexts(txtPanel) {
    var texts = [];
    var inputs = $(txtPanel).find('input[name="text"]');
    for (var i = 0; i < inputs.length; i++) {
        texts.push($(inputs[i]).val());
    }
    return texts;
}

/* Controller for panels */
function upPanel(num) {
    /* Find div it has id=num */
    var aryPanel = $('.panel');
    for (var i = 0; i < cntPanel; i++) {
        if (i != 0 && $(aryPanel[i]).attr('id') == num) {
            /* Execute Swapping */
            swapPanel(i - 1, i);
        }
    }
}

function downPanel(num) {
    /* Find div it has id=num */
    var aryPanel = $('.panel');
    for (var i = 0; i < cntPanel - 1; i++) {
        if ($(aryPanel[i]).attr('id') == num) {
            /* Execute Swapping */
            swapPanel(i, i + 1);
        }
    }
}

function swapPanel(i1, i2) {
    var above = $('.panel')[i1];
    var below = $('.panel')[i2];
    /*
    var tmpData = {
        'mode': above.children('select[name="mode"]').val(),
        'param': above.children('select[name="param"]').val(),
        'text': above.children('input[name="text"]').val()
    }
    above.children('select[name="mode"]').val(
        below.children('select[name="mode"]').val()
    );
    above.children('select[name="param"]').val(
        below.children('select[name="param"]').val()
    );
    above.children('input[name="text"]').val(
        below.children('input[name="text"]').val()
    );
    below.children('select[name="mode"]').val(tmpData['mode']);
    below.children('select[name="param"]').val(tmpData['param']);
    below.children('input[name="text"]').val(tmpData['text']);
    */
    $(above).before(below);
}

function deletePanel(num) {
    /* Swap delete Panel to last */
    /*
    for (var i = num; i < aryPanel.length - 1; i++) {
        swapPanel(i, i + 1);
    }
    */
    /* Delete Panel from DOM and Array */
    //var delEle = aryPanel.pop();
    $('.panel#' + num).replaceWith('');
    cntPanel--;
}

/* Add new row to input text */
function addSubRow(num) {
    var panel = $('.panel#' + num);
    panel.children('div.text').append($('<input type="text" name="text" size="60" class="sub-ctrl"/>'));
}

/* Remove row from input text */
function removeSubRow(num) {
    var texts = $('.panel#' + num).children('div.text').children('input');
    if (texts.length > 1) {
        texts.last().replaceWith('');
    }
}