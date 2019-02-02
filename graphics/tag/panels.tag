<video-view>
    <div class="r2">
        <span class="info" show="{video_info}">{video_info}</span>
        <span class="name" show="{video_name}">{video_name}</span>
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
    </script>
</video-view>