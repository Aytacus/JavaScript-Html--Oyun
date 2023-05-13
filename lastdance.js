// Burada window.onload tum javascript islemleri bittikten sonra sayfanin kullaniciya sunulması icin kullandim.
window.onload = function () {
    // Bu kisimda oyun baslamadan once bir aciklama yazdim. 
    alert("Oyunuma hoşgeldiniz!!!\nOyunun kuralları basit:\nKural1: Toptan kaçının sizi vurmasını engellemelisin.\n"+
    "Kural2: Sarı dikdörtgenin dışına çıkarsan oyunu kaybedersin.Kısacası alanda kalın.\nOyunu isterseniz ok yönleriyle oyna isterseniz w a s d tuşlarıyla oynayın.\nİyi Eğlenceler!!!\n Not: Mobile uyumlu degildir"+
    "\nOyunu isterseniz ok yönleriyle oyna isterseniz w a s d tuşlarıyla oynayın.\nİyi Eğlenceler!!!\n Not: Mobile uyumlu degildir ve 200 puanı gecerseniz gercekten çok iyi oyuncusunuz. ");
    // Burada canvasi olusturdum ve canvasin icindeki nesneleri olusturmak icin de getContext metodunu kullandim.
    var canvason = document.getElementById("mylastdance");
    var nesne = canvason.getContext('2d');
    var skorsayac=0; //Skor tutsun diye.
    var gerilim=new Audio();
    gerilim.src="muzik4.mp3"; // Muziksiz bir oyun olmaz diye dusundum...
    // Kutunun ozelliklerini ve koordinatlarini yazdim
    var kutu = {
        x: canvason.width / 2,
        y: canvason.height / 2,
        width: 12,
        height: 12,
        color: "red"
    };
    // Topun ozelliklerini ve koordinatlarini yazdim
    var top = {
        x: 0,
        y: 0,
        radius: 4,
        speedX: 3,
        speedY: 3,
        color: "blue"
    };
    //Aşagıdaki fonksiyon, olusturdugum kutuyu canvasin icine cizmemi saglayacak fonksiyon.
    function kutuciz(x, y, width, height, color) {
        nesne.fillStyle = color;
        nesne.fillRect(x, y, width, height);
    }
    //Yukaridaki fonksiyonun aynisi farki ise su: Bu da canvasin icine ozelliklerini yazdigim topu cizmemi saglayacak fonksiyon.
    function topciz(x, y, radius, color) {
        nesne.beginPath();
        nesne.arc(x, y, radius, 0, Math.PI * 2, false);
        nesne.fillStyle = color;
        nesne.fill();
        nesne.closePath();
    }
    function canvasiduzenle() {
        nesne.clearRect(0, 0, canvason.width, canvason.height); // Canvasta top ve kutu hareket ettiklerinde eski yerlerinde iz kalmamasi için böyle bir sey yazdim.
        kutuciz(kutu.x, kutu.y, kutu.width, kutu.height, kutu.color);//Az yukarida yazdigim fonksiyonu burada kullanarak kutuyu cizmesini sagladim
        topciz(top.x, top.y, top.radius, top.color);//Az yukarıda yazdigim fonksiyonu burada kullanarak topu cizmesini sagladim.
        dikdortgenciz();//Bunla ise sari dikdortgeni cizdim.
        /* canvasi duzenle de niye kutuyu, topu ve dikdortgeni yeniden cizdirdigimi sorarsaniz diye aciklama yapmak istiyorum:
        ClearRecti kullandiktan sonra canvasin ici tamamen temizleniyor. Bunu onlemek icin yaptim.*/
    }
    //Bu fonksiyon ise sari dikdortgeni cizmesini saglayan fonksiyon.
    function dikdortgenciz() {
        nesne.strokeStyle = "yellow";
        nesne.strokeRect(20, 20, canvason.width - 50, canvason.height - 45);
    }//Chrome oldugunu kontrol ediyor. Bunu yapmamin sebebi ise oyun hizindan dolayi. Chrome'da oyun daha hizli iken Firefox'ta daha yavas. Bende ikisini ayni hiza getirdim gibi.
    function isChrome() {
    var userAgent = navigator.userAgent.toLowerCase();
    return /chrome/.test(userAgent);
    }

// Firefox oldugunu kontrol eden fonksiyondur.
    function isFirefox() {
    var userAgent = navigator.userAgent.toLowerCase();
     return /firefox/.test(userAgent);
        }
    function tophareket() {
        top.x += top.speedX; // topun X konumunu guncelliyor.
        top.y += top.speedY; //topun Y konumunu guncelliyor.
        if(isFirefox()){
        if (top.x - top.radius < 0) {
            top.x = top.radius; //top sola carptiginda oyun disina cikmasini onlemek icin.
            top.speedX = ((Math.random()+0.35)*3.05); // Burada ise topun x yonunde oncekine gore ya hizi artacak yada hizi azalacaktır. Bu da kullaniciyi zorlayacak bir seydir:)
            
        }
        if (top.x + top.radius > canvason.width) {
            top.x = canvason.width - top.radius;//top saga carptiginda oyun disina cikmasini onlemek icin.
            top.speedX = -((Math.random()+0.35)*3.05); // Yukaridaki ile ayni mantik tek farki - yonlu olmasi (Sahaya geri donmesi icin)
            
        }

        if (top.y - top.radius < 0) {
            top.y = top.radius;       //Topun yukaridan oyun disina cikmasini onlemek icin yaptim.
            top.speedY = ((Math.random()+0.35)*3.05); // Xtekiler ile ayni mantık calisiyor. Ilk X ile ayni mantık her konuda.
            
        }
        if (top.y + top.radius > canvason.height) {
            top.y = canvason.height - top.radius;  // Topun asagidan cikmasini onlemek icin yaptim
            top.speedY = -((Math.random()+0.35)*3.05);// Xtekiler ile ayni mantık calisiyor. Ikinci X ile ayni mantik her konuda.
             
        }
       
    }
        if(isChrome()){
            //Ayni seyleri Chrome icinde yaptim. Bazi seyleri degistirdim. Top hizini dusurdum.
            top.radius=3.8;
            if (top.x - top.radius < 0) {
            top.x = top.radius;
            top.speedX = ((Math.random()+0.23)*3.05);
            
        }
        if (top.x + top.radius > canvason.width) {
            top.x = canvason.width - top.radius;
            
            top.speedX = -((Math.random()+0.23)*3.05);
            
        }

        if (top.y - top.radius < 0) {
            top.y = top.radius;
            top.speedY = ((Math.random()+0.23)*3.05);
            
        }
        if (top.y + top.radius > canvason.height) {
            top.y = canvason.height - top.radius;
           
            top.speedY = -((Math.random()+0.23)*3.05);
             
        } 
        
           
           
        }
       //Alttaki if kosulu kutunun sari dikdortgenin icinden cikinca yada top kutuyu vurunca oyunun bitmesi icin yaptim.
        if ((top.x + top.radius > kutu.x && top.x - top.radius < kutu.x + kutu.width && top.y + top.radius > kutu.y && top.y - top.radius < kutu.y + kutu.height)
            || (kutu.x > canvason.width - 45 + kutu.width || kutu.x + kutu.width < 20 || kutu.y + kutu.height <= 20 || kutu.y > canvason.height - 40 + kutu.height)) {
             alert("Oyun bitti!"+"\nSkorunuz: "+Math.floor(skorsayac/20)); //Skorsayac/20 ye bolerek asil skorumuzu yazdim.
             // Hersey sifirlansin diye asagisini boyle yaptim.
            kutu.x = canvason.width / 2;
            kutu.y = canvason.height / 2;
            top.x = 0;
            top.y = 0;
           skorsayac=0;
           
        }


    }
    // Bu kisim oyuncunun w a s d ile veya ok isaretleri ile hareket etmesini saglamak icin yazdim.
    document.addEventListener("keydown", hareketlazim);
    function hareketlazim(event) {
        var tsk = event.keyCode;
    if(isChrome()){
        if (tsk === 38 && kutu.y > 0) {
            kutu.y = kutu.y - 7;
        }
        if (tsk === 40 && kutu.y + kutu.height + 12 < canvason.height) {
            kutu.y = kutu.y + 7;

        }
        if (tsk === 37 && kutu.x > 0) {
            kutu.x = kutu.x - 7;
        }
        if (tsk === 39 && kutu.x + kutu.width + 12 < canvason.width) {
            kutu.x = kutu.x + 7;
        }
        if (tsk === 87 && kutu.y > 0 ) {
            kutu.y = kutu.y - 7;
        }
        if (tsk === 83 && kutu.y + kutu.height + 12 < canvason.height) {
            kutu.y = kutu.y + 7;
        }
        if (tsk === 65 && kutu.x > 0) {
            kutu.x = kutu.x - 7;
        }
        if (tsk === 68 && kutu.x + kutu.width + 12 < canvason.width) {
            kutu.x = kutu.x + 7;
        }
        
    }
    if(isFirefox()){
        if (tsk === 38 && kutu.y > 0) {
            kutu.y = kutu.y - 5.8;
        }
        if (tsk === 40 && kutu.y + kutu.height + 12 < canvason.height) {
            kutu.y = kutu.y + 5.8;

        }
        if (tsk === 37 && kutu.x > 0) {
            kutu.x = kutu.x - 5.8;
        }
        if (tsk === 39 && kutu.x + kutu.width + 12 < canvason.width) {
            kutu.x = kutu.x + 5.8;
        }
        if (tsk === 87 && kutu.y > 0 ) {
            kutu.y = kutu.y - 5.8;
        }
        if (tsk === 83 && kutu.y + kutu.height + 12 < canvason.height) {
            kutu.y = kutu.y + 5.8;
        }
        if (tsk === 65 && kutu.x > 0) {
            kutu.x = kutu.x - 5.8;
        }
        if (tsk === 68 && kutu.x + kutu.width + 12 < canvason.width) {
            kutu.x = kutu.x + 5.8;
        }
    }
    canvasiduzenle();
}

    setInterval(function () {
        // Belirli aralıklarla oyun ekrani yenileniyor. 20 ms de kasma var gibi oldugu icin 10 ms yaptim ve guzel oldu.
        tophareket();
        canvasiduzenle();
        gerilim.play(); // muzik calsin diye koydum.
        skorsayac++; // 10 ms de bir bu deger artiyor.
    }, 10);
};
//IYI EGLENCELER!!!
