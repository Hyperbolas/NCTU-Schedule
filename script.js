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
        className: "計算機組織",
        time: [
            { day: 1, period: "B" },
            { day: 4, period: "E" },
            { day: 4, period: "F" }
        ],
        place: "EC115"
    }, {
        className: "正規語言",
        time: [
            { day: 2, period: "C" },
            { day: 2, period: "D" },
            { day: 4, period: "G" }
        ],
        place: "Online"
    }, {
        className: "資料庫",
        time: [
            { day: 3, period: "C" },
            { day: 3, period: "D" },
            { day: 5, period: "G" }
        ],
        place: "Online"
    }, {
        className: "NA",
        time: [
            { day: 4, period: "I" },
            { day: 4, period: "J" },
            { day: 4, period: "K" }
        ],
        place: "EC114"
    }, {
        className: "系統管理",
        time: [
            { day: 2, period: "I" },
            { day: 2, period: "J" },
            { day: 2, period: "K" }
        ],
        place: "校計中"
    }, {
        className: "游泳",
        time: [
            { day: 2, period: "E" },
            { day: 2, period: "F" }
        ],
        place: "游泳池"
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
const delay = 40;

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
