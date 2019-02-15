<time show="{enable}">
    <div class="{state} {locked}">
        {time}
    </div>

    <style>
        div {
            padding: 0.2em 0.5em;
            margin: 0 auto;
            width: 180px;
            height: 1.4em;
            font-weight: bold;
            text-align: center;
            background-color: #000000;
            color: #ffffff;
            border: 2px solid #ffffff;
        }
        div.locked {
            z-index: 90;
            position: fixed;
            top: 328px;
            left: 530px;
        }

        div.not_started {
            color: #aaaaaa;
        }

        div.running {
            color: #ffffff;
        }

        div.paused,
        div.finised {
            color: #ffff22;
        }
    </style>

    <script>
        this.time = opts.time;
        this.state = opts.state;
        this.enable = opts.enable;
        this.locked = opts.locked;

        // 形式はhh:MM:SS
        observer.on('time-changed', data => {
            this.update({ time: data.time, state: data.state });
        })

        observer.on('update-time-option', options => {
            this.update({ enable: options[0], locked: options[1] });
        })
    </script>
</time>