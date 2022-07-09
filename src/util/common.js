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