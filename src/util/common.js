export function Format(val, str) {
    // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
    let date = new Date(1398250549490);
    let Y = date.getFullYear() + str;
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + str;
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes();
    // s = date.getSeconds();
    console.log(Y + M + D + h + m);
    let res = Y + M + D + h + m
    return res
// 输出结果：2014-04-23 18:55:49

}

export function MillisecondToTime(msd) {
    if(msd > 86400) return '异常'
    let time = parseFloat(msd);
    if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) {
            let a = parseInt(time / 60.0) < 10 ? ('0' + parseInt(time / 60.0)) : parseInt(time / 60.0);
            let ms = parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60);
            let b = (ms < 10) ? ('0' + ms) : ms;
            time = '00:' + a + ':' + b;
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            let H = parseInt(time / 3600.0) < 10 ? ('0' + parseInt(time / 3600.0)) : parseInt(time / 3600.0);
            let ms = parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60);
            let M = (ms < 10) ? ('0' + ms) : ms;
            let ss = parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60);
            let S = (ss < 10) ? ('0' + ss) : ss;
            time = H + ':' + M + ':' + S;
        } else {
            let d = parseInt(time) < 10 ? ('0' + parseInt(time)) : parseInt(time);
            time = '00:00:' + d;
        }
    }
    return time;
};