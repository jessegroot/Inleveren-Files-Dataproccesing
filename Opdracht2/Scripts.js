// scripts.js
//
// DataProccesing
// Jesse Groot 11012579
//
// Javascript for html
// from pattern.web import URL, DOM
// Date.getTime()
datesArray = [];
tempArray = [];
minmaxTemp = [];
var response;

function main(){
  filename = "WeerDeBilt.txt"
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if(this.readyState === 4 && this.status === 200) {
      response = this.responseText;
      // console.log("failure");
    }
  }
  request.open("GET", filename, false);
  request.send();
}

function obtainData(){
  values = response.split("\n");
  for (element = 0; element < values.length - 1; element++){
    split = values[element].split(",");
    datesArray.push(split[0]);
    tempArray.push(split[1]);
  };
  firstDate = datesArray[0];
  lastDate = datesArray[364];

  String.prototype.splice = function(idx, rem, str) {
      return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  };

  for (day = 0; day < 364; day++){
    datesArray[day] = datesArray[day].splice(4, 0, "-");
    datesArray[day] = datesArray[day].splice(7, 0, "-");
    datesArray[day] = new Date(datesArray[day]);
    if (day == 0){
      firstDay = ((datesArray[0])/1);
    };
    datesArray[day] = ((((datesArray[day])/1) - firstDay) / 86400000 + 1);
  }
  minTemp = 0;
  maxTemp = 0;
  for (rounds = 0; rounds < tempArray.length; rounds++){
    if (Number(tempArray[rounds]) < (Number(minTemp))){
      minTemp = tempArray[rounds];
    } else if (Number(tempArray[rounds]) > (Number(maxTemp))){
      maxTemp = tempArray[rounds];
    }
  }
  minmaxTemp.push(minTemp, maxTemp)
}

function letsStartBasics(){
  var canvas = document.getElementById('myCanvas'); // in your HTML this element appears as <canvas id="myCanvas"></canvas>
  var ctx = canvas.getContext('2d');

// canvas = 600 bij 400
  function rightY(oldY){
    return (400 - oldY);
  }
  domainGraffY = [30, 370]
  tempDiff = minmaxTemp[1] - minmaxTemp[0];
  graffDiffY = domainGraffY[1] - domainGraffY[0];
  increaseY = graffDiffY/tempDiff;

  domainGraffX = [30, 580]
  daysDiff = datesArray[363] - datesArray[0]
  graffDiffX = domainGraffX[1] - domainGraffX[0]
  increaseX = graffDiffX/daysDiff

  function giveYCoord(temp){
    yCoord = (temp - minmaxTemp[0]) * increaseY
    return Math.round(rightY(yCoord + 30));
  }
  function giveXCoord(days){
    xCoord = days * increaseX
    return (Math.round(xCoord)+30);
  }


  ctx.fillStyle = 'rgb(0, 0, 0)'; // sets the color to fill in the rectangle with
  ctx.beginPath();
  ctx.moveTo(30, rightY(370)); // starts at
  ctx.lineTo(30, rightY(30));
  ctx.moveTo(30, rightY(100)); // starts at
  ctx.lineTo(600, rightY(100));
  month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"," Okt", "Nov", "Dec"]
  for (months = 0; months < 12; months++){
    ctx.moveTo(30 + (months*((580-30)/11)), rightY(100)); // starts at
    ctx.lineTo(30 + (months*((580-30)/11)), rightY(95));

    ctx.font = '12px serif';
    ctx.fillText(month[months], 30 + (months*((580-30)/11)), rightY(80));
  }
  for (rounds = 0; rounds < datesArray.length; rounds++){
    if (rounds == 0){
      ctx.moveTo(giveXCoord(datesArray[rounds]), giveYCoord(tempArray[rounds]));
    } else{
      ctx.lineTo(giveXCoord(datesArray[rounds]), giveYCoord(tempArray[rounds]));
    }
  }
  for (rounds = 0; rounds < 6; rounds++){
    ctx.moveTo(30, rightY(100 + ((370-100)/5)*rounds));
    ctx.lineTo(25, rightY(100 + ((370-100)/5)*rounds));

    ctx.font = '12px serif';
    ctx.fillText((Math.round(minmaxTemp[1]/5 * rounds)/10), 5, rightY(100 + ((370-100)/5)*rounds));
  }
  for (rounds = 0; rounds < 2; rounds++){
    ctx.moveTo(30, rightY(100 + ((30-100)/2)*(rounds+1)));
    ctx.lineTo(25, rightY(100 + ((30-100)/2)*(rounds+1)));

    ctx.font = '12px serif';
    ctx.fillText((Math.round(minmaxTemp[0]/2 * (rounds + 1))/10), 5, rightY(100 + ((30-100)/2)*(rounds+1)));
  }
  ctx.font = '20px serif';
  ctx.fillText("Weer in de Bilt jan-dec 2016", 40, rightY(380));
  ctx.stroke();
}

main();
obtainData();
letsStartBasics();
