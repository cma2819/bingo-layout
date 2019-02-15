<video-view>
    <div class="{rowClass} {type}" each="{runner,i in runners}" id="panel{i}" style="border-color:{colors[runner.color]}">
        <span class="info" show="{runner.time}" style="background-color:{colors[runner.color]}">{runner.time}</span>
        <span class="name" show="{runner.name}" style="background-color:{colors[runner.color]}">{runner.name}</span>
    </div>

    <style>
        video-view {
            margin: 0px;
            padding: 0px;
            overflow: auto;
        }

        div {
            border-width: 2px 4px;
            border-style: solid;
            border-color: var(--default-color);
            float: left;
            position: relative;
            margin: 0px;
        }

        div.r2 {
            width: 568px;
            height: 320px;
        }

        div.r3 {
            width: 418px;
            height: 236px;
        }

        span {
            position: absolute;
            padding: 1px 0.5em;
            background-color: var(--default-color);
            border-width: 1px;
            border-style: solid;
            border-color: #ffffff;
            font-size: 18px;
            color: #ffffff;
            text-shadow: var(--shadowing);
        }
        span.info {
            font-size: large;
        }

        .left span {
            left: 2%;
        }
        .right span, .center span {
            right: 2%;
        }
        div.r2#panel1 {
            position: absolute;
            bottom: 0px;
        }

        span.info {
            top: 2%;
        }

        span.name {
            bottom: 2%;
        }
    </style>

    <script>
        this.colors = ["#aaaaaa", "#ff4444", "#44ff44", "#4444ff"]
        this.runners = opts.runners;
        this.rowClass = opts.rows;
        this.type = opts.type;

        // 走者情報変更時
        observer.on('update-runners', data => {
            if (this.type == data.type) {
                this.runners = data.runners;
                this.rowClass = data.rows;
            }
            this.update();
        })
    </script>
</video-view>

<info-view show="{enable}">
    <div>
        {data}
    </div>
    <style>
        info-view {
            font-size: 18px;
            margin: 0px;
            padding: 0px;
            overflow: auto;
            color: #ffffff;
            width: 100%;
        }
        
        div {
            width:95%;
            margin: 0.2em auto;
            background-color: rgba(0, 0, 0, 0.8);
            border: 1px solid #ffffff;
            text-align: center;
        }
    </style>
    <script>
        this.data = opts.data;
        this.enable = opts.enable;

        observer.on('update-info', data => {
            this.data = data;
            this.update();
        })

        observer.on('update-title-enable', enable => {
            console.log(enable);
            this.enable = enable;
            this.update();
        })
    </script>
</info-view>