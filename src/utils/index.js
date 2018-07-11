function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatDate(dateStr) {
  const date = new Date(dateStr)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

//缓动动画封装：添加callback目的是为了完成最后一张跟第一张的衔接
export function animal(ele, target, callback) {
  // 怎么停止之前定时器内的动画
  clearInterval(ele.timer); //清楚历史定时器
  ele.timer = setInterval(function () {
    //获取步长 确定移动方向(正负值) 步长应该是越来越小的，缓动的算法。
    var step = (target - ele.offsetLeft) / 10;
    //对步长进行二次加工(大于0向上取整,小于0项下取整)
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    //动画原理： 目标位置 = 当前位置 + 步长
    ele.style.left = ele.offsetLeft + step + "rpx";
    //检测缓动动画有没有停止
    if (Math.abs(target - ele.offsetLeft) <= Math.abs(step)) {
      ele.style.left = target + "rpx"; //直接移动指定位置
      clearInterval(ele.timer);
      if (callback instanceof Function) {
        callback()
      }
    }
  }, 20);
}

export function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}


