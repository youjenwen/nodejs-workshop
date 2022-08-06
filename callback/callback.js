// 刷牙(3) => 吃早餐(5) => 寫功課(3)
// 開始工作 at 2022-08-06T02:46:54.746Z
// 執行成功: 完成工作 刷牙 at 2022-08-06T02:46:57.761Z
// 執行成功: 完成工作 吃早餐 at 2022-08-06T02:47:02.761Z
// 執行成功: 完成工作 寫功課 at 2022-08-06T02:47:05.761Z
function doWork(job, timer, cb) {
    setTimeout(() => {
        let dt = new Date();
        cb(null, `完成工作 ${job} at ${dt.toISOString()}`);
    }, timer);
}
// function doBreakfast(job, timer, cb) {
//     setTimeout(() => {
//         let dt = new Date();
//         cb(null, `完成工作 ${job} at ${dt.toISOString()}`);
//     }, timer);
// }


let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

doWork('刷牙', 3000, function (err, data) {
    if (err) {
        console.error('發生錯誤了', err);
    } else {
        console.log('執行成功:', data);
    }
    doWork('吃早餐', 5000, function (err, data) {
        if (err) {
            console.error('發生錯誤了', err);
        } else {
            console.log('執行成功:', data);
        }
        doWork('寫功課', 3000, function (err, data) {
            if (err) {
                console.error('發生錯誤了', err);
            } else {
                console.log('執行成功:', data);
            }
        })
    })
});
// doBreakfast('吃早餐', 5000, function (err, data) {
//     if (err) {
//         console.error('發生錯誤了', err);
//     } else {
//         console.log('執行成功:', data);
//     }
// });