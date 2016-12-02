module.exports = function animate(asciimation, delay, repeat, message) {

    const frames = asciimation.content.map(frame => frame.text);

    let i          = 0;
    let drawnLines = 1;

    let interval;

    return interval = setInterval(function () {
        console.log([
            '\033[2J',
            message,
            frames[i]
        ].join(''));

        drawnLines = frames[i].match(/\n/g).length + 1;

        i++;

        if (i === frames.length) {
            if (repeat) i = 0;
            else clearInterval(interval)
        }
    }, delay);
};
