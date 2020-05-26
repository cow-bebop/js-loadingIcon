'use strict';



(() => {
  window.onload = function() {
    const loading = document.querySelector('.loading');
    loading.classList.add('loaded');
  }



  class Icon {
    constructor(canvas) {
      this.ctx = canvas.getContext('2d');
      this.width = canvas.width;
      this.height = canvas.height;
      this.r = 60;
      this.angle = 0;
    }

    draw(){
      // 領域を半透明の白で塗りつぶす,drawが呼ばれるたびに背景が白くなっていく
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      this.ctx.fillRect(0, 0, this.width, this.height);

      // 現在の描画状態をセーブする
      this.ctx.save();

      // アイコンの円の中心の位置をcanvasの中心に移動させる
      this.ctx.translate(this.width / 2, this.height / 2);

      // 座標空間を回転させる。回転する角度はラジアンに変換する
      this.ctx.rotate(Math.PI / 180 * this.angle);

      // 円をかく
      // this.ctx.beginPath();
      // this.ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
      // this.ctx.stroke();

      // 円の上を走る線を描く
      this.ctx.beginPath();
      this.ctx.moveTo(0, -this.r - 5);
      this.ctx.lineTo(0, -this.r + 5);
      this.ctx.strokeStyle = 'orange';
      this.ctx.lineWidth = 6;
      this.ctx.stroke();

      // restoreは描画状態を保存した時点のものに戻す
      this.ctx.restore();
    }

    update() {
      this.angle += 12;
    }

    run() {
      this.update();
      this.draw();

      setTimeout(() => {
        this.run();
      }, 100);
    }
  }

  const canvas = document.querySelector('canvas');
  if(typeof canvas.getContext == 'undefined') {
    return;
  }

  const icon = new Icon(canvas);
  icon.run();
})();