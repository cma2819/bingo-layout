<basis>
    <h2>Basic Information</h2>
    <div class="basis-input">
        <label>タイトル
            <input type="text" name="title" size="60" /></label>
        <label>ゲーム
            <select name="game" onchange="{ changeGame }">
                <option each={game,i in gameList} value="{i}">{game.name}</option>
            </select>
        </label>
        <label>モード
            <select name="mode">
                <option each={mode, j in modeList} value="{mode.param}">{mode.name}</option>
            </select>
        </label>
        <label>Seed
            <input type="text" name="seed" size="10" maxlength="10" /></label>
        <button onclick="{ randomSeed }">シード生成</button>
        <button onclick="{ updateBasicInformation }">更新</button>
    </div>
    <style>
        :scope {
            font-size: 110%;
        }

        div {
            margin: 10px 0px;
        }
    </style>

    <script>
        this.gameList = [
            {
                name: '時のオカリナ',
                url: 'oot-bingo',
                mode: [
                    {
                        name: 'Normal',
                        param: 'normal'
                    },
                    {
                        name: 'Short',
                        param: 'short'
                    },
                    {
                        name: 'BlackOut',
                        param: 'blackout'
                    }
                ]
            },
            {
                name: '時のオカリナ',
                url: 'oot-bingo',
                mode: [
                    {
                        name: 'Short',
                        param: 'short'
                    },
                    {
                        name: 'BlackOut',
                        param: 'blackout'
                    }
                ]
            }
        ]; // あとでconfig化する

        // モードリスト初期化
        this.modeList = this.gameList[0].mode;

        // ゲーム変更時のイベントハンドラ
        changeGame (e) {
            const target = e.currentTarget;
            const newMode = this.gameList[target.value].mode;
            this.modeList = newMode;
        }

        // シード値の生成
        randomSeed (e) {
            const seedAry = [];
            for (var i = 0; i < 6; i++) {
                seedAry.push(Math.floor(Math.random() * 10));
            }
            const seed = seedAry.join('');
            document.getElementsByName('seed')[0].value = seed;
        }

        // 情報の更新をObserverに通知
        updateBasicInformation (e) {
            // タイトル
            const title = document.getElementsByName('title')[0].value;
            // ゲーム
            const gameIdx = document.getElementsByName('game')[0].value;
            const game = this.gameList[gameIdx];
            // モード
            const mode = document.getElementsByName('mode')[0].value;
            // Seed
            const seed = document.getElementsByName('seed')[0].value;

            const basicInfo = {
                'title': title,
                'game': game,
                'mode': mode,
                'seed': seed
            };

            observer.trigger('update-basic-information', basicInfo);
        }
    </script>

</basis>