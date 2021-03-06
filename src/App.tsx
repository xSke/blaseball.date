import { differenceInHours, intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

function TimeDisplay(props: {
    hours: string | null;
    minutes: string | null;
    seconds: string | null;
}) {
    return (
        <div className="timer">
            {props.hours !== null && (
                <span className="timer-section">
                    <span className="timer-block">{props.hours}</span> Hours
                </span>
            )}
            {props.minutes !== null && (
                <span className="timer-section">
                    <span className="timer-block">{props.minutes}</span> Minutes
                </span>
            )}
            {props.seconds !== null && (
                <span className="timer-section">
                    <span className="timer-block">{props.seconds}</span> Seconds
                </span>
            )}
        </div>
    );
}

/*const times = [
    { time: "2021-01-18T17:00:00.000Z", chance: 0.0 },
    { time: "2021-01-25T17:00:00.000Z", chance: 0.0 },
    { time: "2021-02-01T17:00:00.000Z", chance: 0.0 },
    { time: "2021-02-08T17:00:00.000Z", chance: 0.01 },
    { time: "2021-02-15T17:00:00.000Z", chance: 0.03 },
    { time: "2021-02-22T17:00:00.000Z", chance: 0.66 },
    { time: "2021-03-01T17:00:00.000Z", chance: 0.23 },
    { time: "2021-03-08T17:00:00.000Z", chance: 0.04 },
    { time: "2021-03-15T17:00:00.000Z", chance: 0.01 },
    { time: "2021-03-22T17:00:00.000Z", chance: 0.01 },
    { time: "2021-03-29T17:00:00.000Z", chance: 0.0 },
];*/

/*const times = [
    { time: "2021-01-18T17:00:00.000Z", chance: 0.0 },
    { time: "2021-01-25T17:00:00.000Z", chance: 0.0 },
    { time: "2021-02-01T17:00:00.000Z", chance: 0.0 },
    { time: "2021-02-08T17:00:00.000Z", chance: 0.01 },
    { time: "2021-02-15T17:00:00.000Z", chance: 0.03 },
    { time: "2021-02-22T17:00:00.000Z", chance: 0.68 },
    { time: "2021-03-01T17:00:00.000Z", chance: 0.24 },
    { time: "2021-03-08T17:00:00.000Z", chance: 0.04 },
    { time: "2021-03-15T17:00:00.000Z", chance: 0.01 },
    { time: "2021-03-22T17:00:00.000Z", chance: 0.01 },
    { time: "2021-03-29T17:00:00.000Z", chance: 0.0 },
];*/

/*const times = [
    { time: "2021-01-18T17:00:00.000Z", chance: 0.0 },
    { time: "2021-01-25T17:00:00.000Z", chance: 0.0 },
    { time: "2021-02-01T17:00:00.000Z", chance: 0.0 },
    { time: "2021-02-08T17:00:00.000Z", chance: 0.0 },
    { time: "2021-02-15T17:00:00.000Z", chance: 0.222 },
    { time: "2021-02-22T17:00:00.000Z", chance: 0.777 },
    { time: "2021-03-01T17:00:00.000Z", chance: 0.0222 },
    { time: "2021-03-08T17:00:00.000Z", chance: 0.0222 },
    { time: "2021-03-15T17:00:00.000Z", chance: 0.0222 },
    { time: "2021-03-22T17:00:00.000Z", chance: 0.0222 },
    { time: "2021-03-29T17:00:00.000Z", chance: 0.0222 },
];*/

const times = [{ time: "2021-03-01T16:00:00.000Z", chance: 0.999 }];

/*function pickIndex(current: number): number {
    let next = Math.floor(Math.random() * times.length);
    while (next === current) {
        next = Math.floor(Math.random() * times.length);
    }
    return next;
}*/

function App(): JSX.Element {
    const [targetIndex] = useState<number>(0);

    const target = new Date(times[targetIndex].time);
    const chance = times[targetIndex].chance;

    const [now, setNow] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setTimeout(() => {
            setNow(new Date());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const diff = intervalToDuration({ start: now, end: target });

    const hours = differenceInHours(target, now).toString();
    const minutes = diff.minutes?.toString() ?? "??";
    const seconds = diff.seconds?.toString() ?? "??";

    return (
        <div className="app">
            <div className="lead-text">
                There is a <strong>{chance * 100}%</strong> chance that{" "}
                <strong>Blaseball</strong> will return in...
            </div>

            <TimeDisplay hours={hours} minutes={minutes} seconds={seconds} />

            <footer>
                <a href="https://twitter.com/blaseball/status/1361711010793410571">
                    probably*.
                </a>
                {/* &nbsp;&nbsp;&nbsp;
                <a
                    href="#"
                    onClick={() => setTargetIndex(pickIndex(targetIndex))}
                >
                    ...unless?
                </a> */}
                <br />
                <small>
                    (this site is not affiliated with The Game Band. information
                    may change whenever Parker feels like it.)
                </small>
            </footer>
        </div>
    );
}

export default App;
