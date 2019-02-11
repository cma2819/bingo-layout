'use strict';

const LS_TIMER_PHASE = {
    NotRunning: 0,
    Running: 1,
    Ended: 2,
    Paused: 3
};
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
const TimeUtils = require("./lib/time");

// LiveSplit Core
const liveSplitCore = require('livesplit-core');
// Setting
const lsRun = liveSplitCore.Run.new();
const segment = liveSplitCore.Segment.new('finish');
lsRun.pushSegment(segment);
const timer = liveSplitCore.Timer.new(lsRun);

// Replicant
const stopwatch = nodecg.Replicant('stopwatch');

// Load the existing time and start the stopwatch at that.
timer.start();
timer.pause();
initGameTime();
if (stopwatch.value.state === 'running') {
    const missedTime = Date.now() - stopwatch.value.time.timestamp;
    const previousTime = stopwatch.value.time.raw;
    const timeOffset = previousTime + missedTime;
    nodecg.log.info('Recovered %s seconds of lost time.', (missedTime / 1000).toFixed(2));
    start(true);
    liveSplitCore.TimeSpan.fromSeconds(timeOffset / 1000).with((t) => timer.setGameTime(t));
}
nodecg.listenFor('startTimer', start);
nodecg.listenFor('stopTimer', pause);
nodecg.listenFor('resetTimer', reset);
setInterval(tick, 100); // 10 times per second.

/**
 * Starts the timer.
 * @param force - Forces the timer to start again, even if already running.
 */
function start(force = false) {
    nodecg.log.info('timekeeper: start');
    if (!force && stopwatch.value.state === 'running') {
        return;
    }
    stopwatch.value.state = 'running';
    if (timer.currentPhase() === LS_TIMER_PHASE.NotRunning) {
        timer.start();
        initGameTime();
    }
    else {
        timer.resume();
    }
}
module.exports.start = start;
function initGameTime() {
    liveSplitCore.TimeSpan.fromSeconds(0).with((t) => timer.setLoadingTimes(t));
    timer.initializeGameTime();
    const existingSeconds = (stopwatch.value.time.raw / 1000);
    liveSplitCore.TimeSpan.fromSeconds(existingSeconds).with((t) => timer.setGameTime(t));
}
/**
 * Updates the stopwatch replicant.
 */
function tick() {
    if (stopwatch.value.state !== 'running') {
        return;
    }
    const time = timer.currentTime();
    const gameTime = time.gameTime();
    if (!gameTime) {
        return;
    }
    stopwatch.value.time = TimeUtils.createTimeStruct((gameTime.totalSeconds() * 1000));
}
/**
 * Pauses the timer.
 */
function pause() {
    nodecg.log.info('timekeeper: pause');
    timer.pause();
    stopwatch.value.state = 'paused';
}
module.exports.pause = pause;
/**
 * Pauses and resets the timer, clearing the time and results.
 */
function reset() {
    nodecg.log.info('reset');
    pause();
    timer.reset(true);
    stopwatch.value.time = TimeUtils.createTimeStruct();
    /*
    stopwatch.value.results = [null, null, null, null];
    */
    stopwatch.value.state = 'not_started';
}
module.exports.reset = reset;