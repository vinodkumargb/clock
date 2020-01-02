var isClock = true;
var wdt = window.innerWidth;
var ht = window.innerHeight;
var size = 0;
var portrait = true;
function init() {
  wdt = window.innerWidth;
  ht = window.innerHeight;
  portrait = wdt < ht;
  if (portrait) {
    size = wdt;
    draw();
  } else {
    size = ht < wdt/2 ? ht : wdt/2;
    draw();
  }
}

function draw(dt)
{
  var  canvas = document.getElementById("myCanvas");
  var  context = canvas.getContext("2d");
  context.canvas.width  = size;
  context.canvas.height = size;
  context.clearRect(0,0,size, size);
  var centerX = size / 2;
  var centerY = size / 2;
  var radius = size / 2 - 20;

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  var gradience = context.createRadialGradient(centerX, centerY, radius-30, centerX, centerY, radius-15);
  gradience.addColorStop(0, '#ffffff');
  gradience.addColorStop(1, '#000000');
  
  context.fillStyle = gradience;
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = '#003300';
  context.closePath();
  context.restore();
    
  context.beginPath();
  context.arc(centerX, centerY, 10, 0, 2 * Math.PI, false);
  context.stroke();
  context.fillStyle = "black";
  context.fill();
  context.closePath();
  context.restore();
  context.font = "60px Arial"
  
	context.strokeStyle = '#000000';
	context.translate(centerX,centerY);

  for (var i=1; i<=60; i++)
  {
    angle = Math.PI/30*i;
    sineAngle = Math.sin(angle);
    cosAngle = -Math.cos(angle);
    
    //Hour Ticks
    if (i % 5 == 0) {
      context.lineWidth = 2;
      iPointX = sineAngle *(radius -55);
      iPointY = cosAngle *(radius -60);
      oPointX = sineAngle *(radius -40);
      oPointY = cosAngle *(radius -40);
      context.strokeText(i/5,iPointX-20,iPointY+30)
    }
    else
    {
      //Minute Ticks
      context.lineWidth = 3; 			
      iPointX = sineAngle *(radius -50);
      iPointY = cosAngle *(radius -50);
      oPointX = sineAngle *(radius -48);
      oPointY = cosAngle *(radius -48);
      context.beginPath();
      context.moveTo(iPointX,iPointY);
      context.lineTo(oPointX,oPointY);
      context.stroke();
    }
  }

  if (dt) {
    var now=new Date(dt);
  } else {
    var now=new Date();
  }
  var hrs=now.getHours();
  var min=now.getMinutes();
  var sec=now.getSeconds();
      
  //Seconds
  var sangle = (Math.PI/30 * sec);
  var sPointX = Math.sin(sangle)*(radius - 60);
  var sPointY = -Math.cos(sangle)*(radius - 60);
  context.beginPath();
  context.lineWidth = 2; 
  context.moveTo(0,0);
  context.lineTo(sPointX,sPointY);
  context.stroke();     
  context.closePath();
  
  context.beginPath();
  context.lineWidth = 4; 
  
  sangle = (Math.PI/30*(min+(sec/60)));
  sPointX = Math.sin(sangle)*(radius - 80);
  sPointY = -Math.cos(sangle)*(radius - 80);
  context.moveTo(0,0);
  context.lineTo(sPointX,sPointY);
  context.stroke();   
  context.closePath();  
  
  context.beginPath();
  context.lineWidth = 6; 

  sangle = (Math.PI/6*(hrs+(min/60)+(sec/3600)));
  sPointX = Math.sin(sangle)*(radius - 100);
  sPointY = -Math.cos(sangle)*(radius - 100);
  context.moveTo(0,0);
  context.lineTo(sPointX,sPointY);
  
  context.stroke();   
  context.closePath();  
    
  context.beginPath();
  context.font="25px Helvetica light";
  if (hrs > 12)
  {
    context.fillText(hrs-12,-30,canvas.height/8);
  }
  else
  {
    context.fillText(hrs,-30,canvas.height/8);
  }
  context.fillText(":",-6,canvas.height/8);
  context.fillText(min,0,canvas.height/8);
  context.fillText(":",25,canvas.height/8);
  context.fillText(sec,30,canvas.height/8);
  context.closePath();
    
  context.restore();
  context.translate(-centerX,-centerY);

  if (isClock) {
    setTimeout(draw,1000);
  }
}

function setTimeOnClock() {
  isClock = false;
  var phr = $('#phrase').val();
  var hr = $('#hour').val();
  var min = 0;
  if (phr === "Quarter Past") {
    min = 15;
  } if (phr === "Half Past") {
    min = 30;
  } if (phr === "Quarter To") {
    min = 45;
    if (hr === "1") {
      hr = 12;
    } else {
      hr--;
    }
  }

  var dt = new Date(0, 0, 0, hr, min, 0, 0);
  setTimeout(function(){
      draw(dt);
    },1000);
}

function reset() {
  isClock = true;
  draw();
}

function onResizeFunc() {
  setTimeout(function(){
    init();
  }, 0);
}