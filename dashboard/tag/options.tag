<options>
    <h2>Options</h2>
    <div class="options">
        <dl each={option in options}>
            <label>
                <input type="checkbox" name="{option.name}" value="1" checked="{values[option.name]}" onchange="{changeCheck}"/> {option.label}
            </label>
        </dl>
    </div>
    <style>
        label {
            margin: 0px 0.5em;
        }
    </style>
    <script>
        this.options = opts.optionList;

        this.values = opts.options || {}; // option.nameでひもづくMap

        changeCheck(e) {
            const name = e.currentTarget.name;
            const checked = e.currentTarget.checked;
            observer.trigger('update-option', {name: name, checked: checked});
        }
    </script>
</options>