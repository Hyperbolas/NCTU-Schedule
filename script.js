class Time {

    constructor(arg0, arg1) {
        if (arguments.length === 1) {
            this.h = arg0.h;
            this.m = arg0.m;
        }
        else if (arguments.length === 2) {
            this.h = arg0;
            this.m = arg1;
        }
        else
            throw "Invalid arguments."
    }

    add(minute) {
        let m = this.m + minute,
            hourCarry = Math.floor(m / 60);

        let h = this.h + hourCarry;
        m -= 60 * hourCarry;

        return new Time(h, m);
    }

    after(time) {
        if (this.h === time.h) return this.m > time.m;
        return this.h > time.h
    }

    equals(time) {
        return this.s === time.h && this.m === time.m;
    }

    before(time) {
        return !this.after(time) && !this.equals(time);
    }
}

const classes = [
    {
        className: "密碼學",
        time: [
            { day: 1, period: "C" },
            { day: 1, period: "D" },
            { day: 3, period: "B" },
        ],
        place: "ED117"
    }, {
        className: "資料結構",
        time: [
            { day: 1, period: "E" },
            { day: 1, period: "F" },
            { day: 1, period: "I" },
            { day: 1, period: "J" },
            { day: 1, period: "K" },
            { day: 4, period: "B" },
        ],
        place: "EC022"
    }, {
        className: "人工智慧",
        time: [
            { day: 2, period: "E" },
            { day: 2, period: "F" },
            { day: 5, period: "B" }
        ],
        place: "EC122"
    }, {
        className: "離散數學",
        time: [
            { day: 2, period: "G" },
            { day: 5, period: "C" },
            { day: 5, period: "D" },
        ],
        place: "EC114"
    }, {
        className: "組合語言",
        time: [
            { day: 3, period: "C" },
            { day: 3, period: "D" },
            { day: 5, period: "G" }
        ],
        place: "EC016"
    }, {
        className: "競技程式",
        time: [
            { day: 5, period: "I" },
            { day: 5, period: "J" },
            { day: 5, period: "K" }
        ],
        place: "EC016"
    }
];
const periods = {
    "A": new Time(8, 0),
    "B": new Time(9, 0),
    "C": new Time(10, 10),
    "D": new Time(11, 10),
    "E": new Time(13, 20),
    "F": new Time(14, 20),
    "G": new Time(15, 30),
    "H": new Time(16, 30),
    "I": new Time(18, 30),
    "J": new Time(19, 30),
    "K": new Time(20, 30),
};
const classTime = 50;
const delay = 30;

function getPeriod(time) {
    for (let index in periods) {
        let targetTime = periods[index];
        if ((time.after(targetTime) || time.equals(targetTime))
            && time.before(targetTime.add(classTime))) {
            return index;
        }
    }
}

function getClass(day, time) {
    let period = getPeriod(time);
    if (!period) return undefined;
    return classes.find(c => c.time.some(t => t.day === day && t.period === period));
}

const date = new Date();
const currDay = date.getDay();
const currTime = new Time(date.getHours(), date.getMinutes());
const currClass = getClass(currDay, currTime) || getClass(currDay, currTime.add(delay));
if (currClass) {
    document.getElementById("course").innerHTML = currClass.className;
    document.getElementById("classroom").innerHTML = currClass.place;
}
else {
    document.getElementById("course").innerHTML = "放假囉";
    document.getElementById("classroom").innerHTML = "去睡覺吧";
}
