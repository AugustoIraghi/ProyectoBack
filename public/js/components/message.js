window.onload = updateClock;

let redirectUrl = document.getElementById('redirectUrl').value;

redirectUrl ? null : redirectUrl = '/log/in';


let totalTime = 5;

function updateClock() {
    document.getElementById('countdown').innerHTML = totalTime;
    if(totalTime==0){
        window.location.href = redirectUrl;
    }else{
        totalTime-=1;
        setTimeout("updateClock()",1000);
    }
}