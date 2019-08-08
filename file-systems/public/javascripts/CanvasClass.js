/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function CanvasClass() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.ctx = this.canvas.getContext('2d');
}

/**
 * 图片跨域设置;不使用远程地址图片,需要关闭;否则在低版本IOS手机上会有问题
 * @param {type} path
 * @param {type} image
 * @param {type} type
 * @returns {undefined}
 */
function imagesCrossOrigin(path, image, type) {
    type = type ? type : '*';
    var reg = /(http|https):\/\/([\w.]+\/?)\S*/;
    if (reg.test(path)) {
        image.crossOrigin = type;
    }
    image.src = path;
};

CanvasClass.prototype.createDraw = async function(path) {
    path = path ? path : "/images/ico/file-stystems.png";
    var _this = this;
    var image = await loadImageAsync(path);
    var _imageW = image.width;
    var _imageH = image.height;
    var _pointerX = (_this.canvas.width - image.width) / 2;
    var _pointerY = (_this.canvas.height - image.height) / 2;
    _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
    _this.ctx.translate(0, 0);
    _this.ctx.save();
    _this.ctx.drawImage(image, _pointerX, _pointerY, _imageW, _imageH);
    _this.ctx.restore();
    var base64 = _this.canvas.toDataURL("image/png", 1.0);
    if (document.querySelector('#draw-images-show')) {
        document.querySelector('#draw-images-show').setAttribute('src', base64);
    }
};

CanvasClass.prototype.drawLocalImage = function() {

};

function loadImageAsync(path) {
    return new Promise((resolve, reject) => {
        var image = new Image();
        imagesCrossOrigin(path, image);
        image.onload = function() {
            resolve(image)
        }
        image.onerror = function() {
            reject(new Error("图片加载失败"))
        }
    });
}