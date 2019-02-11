<bingo show="{enable}">
    <table class="{rowClass}">
        <tr each="{row, i in rows}">
            <td each="{task, j in row}" id="slot{i*5 + (j+1)}" class="slot c_0" onclick="{toggleColor}">{task}</td>
        </tr>
    </table>

    <style>
        table {
            color: #ffffff;
            border-collapse: collapse;
        }

        table.r3 {
            height: 428px;
        }

        .slot {
            width: 85px;
            height: 82px;
            font-size: 12px;
            padding: 2px;
            border: 0.2px solid white;
            text-align: center;
            vertical-align: middle;
        }

        .slot.c_0 {
            background-color: rgba(0, 0, 0, 1.0);
        }

        .slot.c_0:hover {
            background-color: rgba(32, 32, 32, 1.0);
        }

        .slot.c_1 {
            background-color: rgba(0, 128, 0, 1.0);
        }

        .slot.c_1:hover {
            background-color: rgba(32, 160, 32, 1.0);
        }

        .slot.c_2 {
            background-color: rgba(128, 0, 0, 1.0);
        }

        .slot.c_2:hover {
            background-color: rgba(160, 32, 32, 1.0);
        }

        .slot.c_3 {
            background-color: rgba(0, 0, 128, 1.0);
        }

        .slot.c_3:hover {
            background-color: rgba(32, 32, 160, 1.0);
        }
    </style>
    <script>
        this.rows = makeRows(opts.bingoList);
        this.rowClass = opts.rowClass;
        this.enable = opts.enable;

        observer.on('update-bingo', bingo => {
            this.rows = makeRows(bingo);
            this.update();
        });

        observer.on('update-class', rowClass => {
            this.rowClass = rowClass;
            this.update();
        })

        observer.on('update-bingo-enable', enable => {
            this.enable = enable;
            this.update();
        })

        function makeRows(bingo) {
            const rows = [
                [], [], [], [], []
            ];
            for (var i = 0; i < bingo.length; i++) {
                const rowIdx = Math.floor(i / 5);
                const colIdx = i % 5;
                rows[rowIdx][colIdx] = bingo[i];
            }
            return rows;
        }

        /* Toggle Bingo Slot's Color */
        const classList = ['c_0', 'c_1', 'c_2', 'c_3'];
        toggleColor(e) {
            const ele = $(e.currentTarget);
            for (var i = 0; i < classList.length; i++) {
                if (ele.hasClass(classList[i])) {
                    var idx = (i + 1) % classList.length;
                    $(ele).removeClass(classList[i]);
                    $(ele).addClass(classList[idx]);
                    break;
                }
            }
        }
    </script>
</bingo>