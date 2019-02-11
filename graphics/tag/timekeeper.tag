<time show="{enable}">
    <div class="{state}">
        {time}
    </div>

    <style>
        div {
            padding: 0.2em 0.5em;
            margin: 0 auto;
            width: 5em;
            height: 1.4em;
            font-weight: bold;
            text-align: center;
            background-color: #000000;
            color: #ffffff;
            border: 2px solid #ffffff;
        }

        div.not_started {
            color: #aaaaaa;
        }
        div.running {
            color: #ffffff;
        }
        div.paused, div.finised {
            color: #ffff22;
        }
    </style>

    <script>
        this.time = opts.time;
        this.state = opts.state;
        this.enable = opts.enable;

        // 形式はhh:MM:SS
        observer.on('time-changed', data => {
            this.update({time: data.time, state: data.state});
        })

        observer.on('update-time-enable', enable => {
            this.update({enable: enable});
        })
    </script>
</time>