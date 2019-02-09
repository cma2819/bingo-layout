<runner-info>
    <h3>Runner{opts.runner_idx + 1}</h3>
    <input type="text" name="runner-name" placeholder="Player Name" onchange="{ changeName }" value="{ runner.name }" />
    <div class="colors">
        <label class="color-radio" each="{style,i in colors} " style={style}>
            ■<input type="radio" name="runner-color{opts.runner_idx}" value="{i}" checked="{style.checked}" onclick="{ changeColor }" />
        </label>
    </div>
    <style>
        h3 {
            margin-bottom: 5px;
        }

        input[type="text"] {
            margin: 5px 0.5em;
        }

        label.color-radio {
            margin: 0.2em;
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: #222222;
        }

        div.colors {
            display: inline-block;
            border-radius: 5px;
            background-color: #ffffff;
            padding: 5px 5px;
        }
    </style>
    <script>
        // 初期化
        this.runneridx = opts.runner_idx;
        this.runner = {
            'name': opts.data.name || '',
            'color': opts.data.color || 0,
            'enable': opts.data.enable || false
        }
        this.colors = [
            {
                color: "#222222",
                "border-color": "#222222",
                checked: false
            },
            {
                color: "#ff0000",
                "border-color": "#ff0000",
                checked: false
            },
            {
                color: "#00ff00",
                "border-color": "#00ff00",
                checked: false
            },
            {
                color: "#0000ff",
                "border-color": "#0000ff",
                checked: false
            }
        ]// あとでcolor値だけ設定ファイル化
        this.colors[this.runner.color].checked = true;

        // 名前変更時イベントハンドラ
        changeName(e) {
            const name = e.currentTarget.value;
            this.runner.name = name;
            this.runner.enable = name ? true : false;
            observer.trigger('update-runner', this.runneridx, this.runner);
        }

        // 色変更時イベントハンドラ
        changeColor(e) {
            const color = e.currentTarget.value;
            this.runner.color = color;
            console.log(this.runner);
            observer.trigger('update-runner', this.runneridx, this.runner);
        }

        // クリア命令時に発火
        observer.on('clear-runners-info', () =>{
            this.runner.name = '';
            this.runner.color = 0;
            this.update();
        });

    </script>
</runner-info>

<runner-timer>
    <h3>Runner{opts.runner_idx+1}</h3>
    <label> READY
        <input type="checkbox" name="ready" val="1" onchange="{ changeReadyState }" disabled="{ !runner.enable}" />
    </label>
    <input type="text" size="8" readonly="readonly" value="-" disabled="{ !runner.enable }"/>
    <input type="number" min="0" max="5" placeholder="0" />
    <button class="runner-finish">Finish</button>
    <button class="runner-resume">Resume</button>

    <style>
        h3 {
            margin-bottom: 5px;
        }

        label {
            margin-left: 0.5em;
            margin-right: 0.5em;
        }

        input[type="text"] {
            margin: 5px 0.5em;
            text-align: center;
        }

        input[type="number"] {
            width: 2em;
        }

        .runner-finish {
            --button-color: #00cc00;
        }

        .runner-resume {
            --button-color: #cc0000;
        }

        button {
            width: 6em;
            color: var(--button-color);
            border-color: var(--button-color);
        }
    </style>
    <script>
        // 初期化
        this.runner = opts.data;
        this.runneridx = opts.runner_idx;

        // Readyの命令受信時
        observer.on('ready-all-runners', (state) => {
            document.getElementsByName('ready')[this.runneridx].checked = state;
        });

        // Ready変更時のイベントハンドラ
        changeReadyState (e) {
            const ischecked = e.currentTarget.checked;
            observer.trigger('update-ready', this.runneridx, ischecked);
        }
    </script>
</runner-timer>