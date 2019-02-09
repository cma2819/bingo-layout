<video-view>
    <div class="{rowClass}" each="{runner in runners}">
        <span class="info" show="{video_info}">{video_info}</span>
        <span class="name" show="{runner.name}">{runner.name}</span>
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
            width: 504px;
            height: 284px;
        }
        div.r3 {
            width: 418px;
            height: 236px;
        }

        span {
            position: absolute;
            padding: 0px 0.5em;
            background-color: var(--default-color);
            border-width: 2px;
            border-style: solid;
            border-color: var(--default-color);
            font-size: 18px;
            color: #ffffff;
            text-shadow: var(--shadowing);
        }

        span.info {
            top: 2%;
            left: 2%;
        }
        span.name {
            bottom: 2%;
            right: 2%;
        }
    </style>

    <script>
        this.runners = opts.runners;
        this.rowClass = opts.rows;
        this.type = opts.type;

        // 走者情報変更時
        observer.on('update-runners', data => {
            if (this.type == data.type) {
                this.runners = data.runners;
                this.rows = data.rows;
            }
            this.update();
        })
    </script>
</video-view>