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
CanvasClass.prototype.imagesCrossOrigin = function (path, image, type) {
    type = type ? type : '*';
    var reg = /(http|https):\/\/([\w.]+\/?)\S*/;
    if (reg.test(path)) {
        image.crossOrigin = type;
    }
    image.src = path;
};

CanvasClass.prototype.createDraw = function (path) {
    var self = this;
    path = path ? path : "/images/ico/file-stystems.png";
    var image = new Image();
    self.imagesCrossOrigin(path, image);
    var base64;
    image.onload = function () {
        var draw_width = image.width > self.canvas.width ? self.canvas.width : image.width;
        var draw_height = image.height > self.canvas.height ? self.canvas.height : image.height;
        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
        self.ctx.translate(0, 0);
        self.ctx.save();
        self.ctx.drawImage(image, 0, 0, draw_width, draw_height);
        self.ctx.restore();
        base64 = self.canvas.toDataURL("image/png", 1.0);
        if (document.querySelector('#draw-images-show')) {
            document.querySelector('#draw-images-show').setAttribute('src', base64);
        }
        console.log(base64);
    }
};

CanvasClass.prototype.drawLocalImage = function () {

};


