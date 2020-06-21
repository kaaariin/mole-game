'use strict';

{
    class Panel{
        constructor() {
            const section = document.createElement('div');
            section.classList.add('mole__item');

            this.img = document.createElement('img');
            this.img.src = this.getRandomImage();
            section.appendChild(this.img);
            const container = document.getElementById('container');
            container.appendChild(section);
            

        }

        

        getRandomImage() {
            const images = [
                'img/cat.png',
                'img/mole-work.png',
                'img/dog.png',
            ];

            
            return images[Math.floor(Math.random() * images.length)];

        }
        spin() {
            let timer = document.getElementById('timer');
            this.img.src = this.getRandomImage();
            let url = this.img.src.split('/');
            if(url[4] === 'mole-work.png') {
                this.img.classList.add('mole');

            }else if(url[4] !== 'mole-work.png') {
                this.img.classList.remove('mole');
            }

            this.timeoutId = setTimeout(() => {
                this.spin();
                if(timer.classList.contains('stop')) {
                    clearTimeout(this.timeoutId);
                }
            }, 800);
        }
        
        
    }

    

    const panels = [
        new Panel(),
        new Panel(),
        new Panel(),
        new Panel(),
        new Panel(),
        new Panel(),
        new Panel(),
        new Panel(),
        new Panel(),
    ];
    let timer = document.getElementById('timer');
    const btn = document.getElementById('btn__start')//スタートボタン
    let success = document.getElementById('success');//point高い時に表示
    let good = document.getElementById('good');//point中くらい
    let cheer = document.getElementById('cheer');//point低い時に表示
    let scoreAlert = document.getElementById('scoreAlert');
   


function timerCount() {
    let getScores = document.querySelectorAll('.score__score');
    console.log(getScores);
    // カウントダウンする秒数
  let sec = 10;
  // 開始日時を設定
  let dt = new Date();
  console.log("Start: ", dt);
  // 終了時刻を開始日時+カウントダウンする秒数に設定
  let endDt = new Date(dt.getTime() + sec * 1000);

  console.log("End : ", endDt);

  // 1秒おきにカウントダウン
  let cnt = sec;
  let id = setInterval(() =>{
    cnt--;
  let label = cnt;
      timer.innerHTML = label;

    // 現在日時と終了日時を比較
    dt = new Date();
    if(dt.getTime() >= endDt.getTime()){
        console.log(dt.getTime());
        console.log(endDt.getTime());
        timer.classList.add('stop');
        clearInterval(id);
        if(timer.textContent === '0') {
            let scoreParsint = parseFloat(scoreAlert.textContent);
            getScores.forEach(getScore => {
                if(scoreParsint >= 70) {//pointが７点以上だった時に画像を表示
                    success.style.display ='block';
                    success.classList.add('block');
                    getScore.innerHTML = scoreParsint;
                }else if(scoreParsint >= 50) {//pointが５点以上だった時に画像を表示
                    good.style.display ='block';
                    good.classList.add('block');
                    getScore.innerHTML = scoreParsint;
                }else{//そのた
                    cheer.style.display = 'block';
                    cheer.classList.add('block');
                    getScore.innerHTML = scoreParsint;
                }
            });
        
    }
    }
    }, 1000);
}




        console.log(scoreAlert);
        function score(callback) {
            let point = 0;//最初は０点
            return callback(point);//呼び出された時にpointを持っていく
        }
    btn.addEventListener('click',() => {//スタートボタンが押されたら
        btn.classList.add('start');//startクラスを付けて
        btn.disabled = true;
        timerCount();//タイマー開始
        panels.forEach(panel => {//画像を一枚一枚に分けて
            panel.spin();//ランダムにスピンさせる
        });
        if(btn.classList.contains('start') === true) {//startクラスがついている時            
            score(function(point){//pointを材料にして処理をする、scoreGetに結果を代入する
                console.log(point);
                const imgs = document.querySelectorAll('img');//画像を取得
                for(let i =0; i < imgs.length; i++ )  {//一枚一枚に分ける
                    imgs[i].addEventListener('click', () => {//画像をクリックした時
                        if(imgs[i].classList.contains('mole') === true) {//moleクラスがついてたら
                            point++;//ポイントを１点づつ加算してね
                            console.log(point);
                            scoreAlert.innerHTML = point*10;
                            if(scoreAlert.innerHTML === '0') {
                                point = 0;
                            }
                        }
                    });
                }
            });
        }
    });

    let reset = document.querySelectorAll('.btn__continue');
    let scores = document.querySelectorAll('.score');

    scores.forEach(score => {
        let timer = document.getElementById('timer');
        for( let i =0; i<reset.length; i++) {
        reset[i].addEventListener('click',() => {
            if(score.classList.contains('block')) {
                score.style.display = 'none';
                score.classList.remove('block');
                btn.classList.remove('start');
                timer.innerHTML='10';
                timer.classList.remove('stop');
                btn.disabled = false;
                scoreAlert.innerHTML = '0';
            }
        });
        }
    }); 
    

    
}

