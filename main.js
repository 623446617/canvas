var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var eraserEnabled = false;
var lineWidth = 3;

autoSetCanvasSize();

lisenToUser();

toolOptions();

// 切换橡皮擦与画笔
function toolOptions() {
    var eraser = document.getElementById('eraser'),
        pen = document.getElementById('pen');

    eraser.onclick = function () {
        eraserEnabled = true;
        eraser.classList.add('active');
        pen.classList.remove('active');
    }

    pen.onclick = function () {
        eraserEnabled = false;
        pen.classList.add('active');
        eraser.classList.remove('active');
    }

    black.onclick = function () {
        setPenColor('black');
        black.classList.add('active');
        red.classList.remove('active');
        green.classList.remove('active');
        blue.classList.remove('active');
    }

    red.onclick = function () {
        setPenColor('red');
        black.classList.remove('active');
        red.classList.add('active');
        green.classList.remove('active');
        blue.classList.remove('active');
    }

    green.onclick = function () {
        setPenColor('green');
        black.classList.remove('active');
        red.classList.remove('active');
        green.classList.add('active');
        blue.classList.remove('active');
    }

    blue.onclick = function () {
        setPenColor('blue');
        black.classList.remove('active');
        red.classList.remove('active');
        green.classList.remove('active');
        blue.classList.add('active');
    }

    thin.onclick = function () {
        this.classList.add('active');
        thick.classList.remove('active');
        lineWidth = 3;
    }

    thick.onclick = function () {
        this.classList.add('active');
        thin.classList.remove('active');
        lineWidth = 6;
    }

    save.onclick = function() {
        var url = canvas.toDataURL('image/png');
        var a = document.createElement('a');
        a.href = url;
        a.download = '画';
        a.click();
    }

    claer.onclick = function () {
        // 清空
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// 设置画笔颜色
function setPenColor(c) {
    ctx.fillStyle = c;
    ctx.strokeStyle = c;
}


// 监听用户事件
function lisenToUser() {

    // 触屏设备
    if (document.body.ontouchstart !== undefined) {
        var useEnabled = false;
        var lastPoint = {x: undefined, y: undefined};

        canvas.ontouchstart = function (e) {
            useEnabled = true;
            lastPoint.x = e.touches[0].clientX;
            lastPoint.y = e.touches[0].clientY;
            if (eraserEnabled) {
                clearLine(lastPoint);
            }
        }

        canvas.ontouchmove = function (e) {
            var newPoint = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
            if (useEnabled) {
                if (eraserEnabled) {
                    clearLine(lastPoint);
                } else {
                    drawLine(lastPoint, newPoint);
                }
                lastPoint = newPoint;
            }
        }

        canvas.ontouchend = function (e) {
            useEnabled = false;
        }
    }
    // 非触屏设备
    else {
        var useEnabled = false;
        var lastPoint = {x: undefined, y: undefined};

        canvas.onmousedown = function (e) {
            useEnabled = true;
            lastPoint.x = e.clientX;
            lastPoint.y = e.clientY;
            if (eraserEnabled) {
                clearLine(lastPoint);
            }
        }

        canvas.onmousemove = function (e) {
            var newPoint = {
                x: e.clientX,
                y: e.clientY
            };
            if (useEnabled) {
                if (eraserEnabled) {
                    clearLine(lastPoint);
                } else {
                    drawLine(lastPoint, newPoint);
                }
                lastPoint = newPoint;
            }
        }

        canvas.onmouseup = function (e) {
            useEnabled = false;
        }
    }

}

// 擦除
function clearLine(point) {
    ctx.clearRect(point.x - 5, point.y - 5, 10, 10);
}

// 画线
function drawLine(startPoint, endPoint) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.closePath();
    ctx.stroke();
}

// 设置canvas大小
function autoSetCanvasSize() {
    setCanvasSize();

    window.onresize = function () {
        setCanvasSize();
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth,
            pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}