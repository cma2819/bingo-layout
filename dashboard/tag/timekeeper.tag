<timekeeper>
    <div id="top">
        <h2>Time</h2>
        <div id="time">00:00:00</div>
        <button disabled={ !isAllReady || isTimerWorking }>Start</button>
        <button disabled={ false }>Reset</button>
        <button disabled={ !isTimerWorking }>Finish</button>
    </div>
    <div class="runner-time" each="{runner, i in runners}">
        <runner-timer runner_idx="{i}" data="{runner}"></runner-timer>
    </div>
    <button onclick="{ readyAllRunners }">Ready All</button>
    <button onclick="{ unreadyAllRunners }">Unready All</button>
    <style>
        #top {
            overflow: auto;
        }

        #top>* {
            float: left;
        }

        #time {
            background-color: #ffffff;
            border-bottom: 2px solid #222222;
            border-radius: 5px;
            font-weight: bold;
            padding: 0.2em 0.5em;
            font-size: 150%;
        }

        #top button {
            font-size: 150%;
            padding: 0.2em 0.5em;
            margin-left: 0.5em;
        }

        div.runner-time {
            margin: 2px 0px;
        }
    </style>
    <script>

        // タイマー等状態管理用
        this.isAllReady = false;
        this.isTimerWorking = false;

        this.runners = [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {}
        ]

        readyAllRunners (e) {
            observer.trigger('ready-all-runners', true);
            for (var i = 0; i < this.runners.length; i++) {
                this.runners[i].ready = true;
            }
            this.isAllReady = checkAllReady(this.runners);
        }
        unreadyAllRunners (e) {
            observer.trigger('ready-all-runners', false);
            for (var i = 0; i < this.runners.length; i++) {
                this.runners[i].ready = false;
            }
            this.isAllReady = checkAllReady(this.runners);
        }

        // Ready状態変化時に発火
        observer.on('update-ready', (runneridx, state) => {
            this.runners[runneridx].ready = state;
            const allready = checkAllReady(this.runners);
            this.update({ isAllReady:checkAllReady(this.runners) });
        });

        // Runners情報更新時に発火（有効走者のカウント）
        observer.on('update-runners-info', (runners) => {
            for (var i = 0; i < this.runners.length; i++) {
                if (runners[i].name) {
                    this.runners[i].enable = true;
                } else {
                    this.runners[i].enable = false;
                }
            }
            this.update({ isAllReady:checkAllReady(this.runners) });
        });

        // 全員準備完了かどうかチェック
        // 名前が入っていないプレイヤーは見ない
        function checkAllReady(runners) {
            // 1人もenableがいなければ出走不可
            let enableFlg = false;
            for (var i = 0; i < runners.length; i++) {
                enableFlg = enableFlg || runners[i].enable;
                console.log(enableFlg);
                if (runners[i].enable && !runners[i].ready) {
                    return false;
                }
            }
            return true && enableFlg;
        }
    </script>
</timekeeper>