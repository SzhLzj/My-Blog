//JS监听浏览器文字大小代码
(function(doc, win) {
  setRem();
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function() {
    setRem();
  };
  if (!doc.addEventListener)
  return;
  win.addEventListener(resizeEvt, recalc, false);
  // doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

function setRem() {
  let docEl = document.documentElement;
  let clientWidth = docEl.clientWidth;
  if (!clientWidth) {
    return;
  }
  // docEl.style.fontSize = 400 * (clientWidth / 1000 / 3) + 'px'; 调整1rem = ?% 设备独立像素 目前为10%,在750px设计稿上,1rem = 100px
  docEl.style.fontSize = 100 * (clientWidth / 1536) + 'px'; //调整rem 在1536px设计稿上,1rem = 100px
  
  //限制fontSize最大为 XXX px,根据项目不同而修改
  let fs = document.documentElement.style.fontSize;
  let fsn = fs.replace('px','');
  if (fsn > 100) {
    // docEl.style.fontSize = '85.3333px';
    // docEl.style.fontSize = '100px';
  }
  // console.log(docEl.style.fontSize);
}
