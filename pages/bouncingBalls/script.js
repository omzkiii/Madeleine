var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.outerWidth*0.9;
canvas.height = window.outerHeight*0.8;
let circleArr = []

class Circle{
  constructor(xPos, yPos, radius, name){
    this.name = name
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.speed = 5;
    this.directionX = 1;
    this.directionY = 1;
  }
  createCircle(){
    if (this.xPos > canvas.width - 100 || this.xPos < 100){
      this.directionX = -1 * this.directionX
    }
    if (this.yPos > canvas.height - 100 || this.yPos < 100){
      this.directionY = -1 * this.directionY
    }
    if (this.collisionChecker() === 'c'){
      this.directionX = -1 * Math.floor(this.collisionAngle()[0]); 
      this.directionY = -1 * Math.floor(this.collisionAngle()[1]);
    }
    
    this.collisionAngle()
    // if (this.xPos > canvas.width || this.xPos < 50){
    //   this.directionX = -1 * this.directionX
    // }
    // else if (this.yPos > canvas.height || this.yPos < 50){
    //   this.directionY = -1 * this.directionY
    // }
    //
    // if(this.collisionChecker()){
    //   this.directionY = (-1 * this.collisionAngle()) * this.directionY
    //   this.directionX = (-1 * (this.collisionAngle()-1)) * this.directionX
    // }
    //
    // MOVEMENT
    this.xPos = this.xPos + this.directionX * this.speed;
    this.yPos = this.yPos + this.directionY * this.speed;

    //DrawCircle
    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
  collisionChecker(){
    this.arr = circleArr.filter(circle => circle.name !== this.name)
    this.samePos = this.arr.find(circle => Math.sqrt(Math.pow((this.xPos - circle.xPos),2) + Math.pow((this.yPos - circle.yPos),2)) <= this.radius * 2)
    if(this.samePos !== undefined){
      console.log("COLLISION!!!");
      const xDist = this.samePos.xPos - this.xPos
      const yDist = this.samePos.yPos - this.yPos
      // if(Math.abs(xDist) == Math.abs(yDist)){
      //   console.log("COLLISION EQUAL!!!");
      //   return 'c'
      // }
      // else if(Math.abs(xDist) > Math.abs(yDist)){
      //   console.log("COLLISION Y!!!");
      //   return 'y'
      // }
      // else if(Math.abs(xDist) < Math.abs(yDist)){
      //   console.log("COLLISION X!!!");
      //   return 'x'
      // }
      return 'c'
    }
    return false
      
  }
  collisionAngle(){
    if(this.samePos != undefined){
      const xDist = this.samePos.xPos - this.xPos;
      const yDist = this.samePos.yPos - this.yPos;
      const dist = Math.sqrt(Math.pow((this.xPos - this.samePos.xPos),2) + Math.pow((this.yPos - this.samePos.yPos),2))
      // const angleX = Math.acos(xDist/dist);
      // const angleY = Math.asin(yDist/dist);
      // const pointX = Math.cos(angleX)
      // const pointY = Math.sin(angleX)
      // console.log("Y distance" + yDist)
      // console.log("X distance:" + xDist)
      // console.log("DISTANCE: " + dist)
      // console.log("Radian X: " + angleX)
      // console.log("Radian Y: " + angleY)
      // console.log("Point X: " + pointX)
      // console.log("Point Y: " + pointY)
      return [xDist/dist, yDist/dist]


    }
}
}
  // circleArr.push(new Circle(100, 100, 100, 1));  
  // circleArr[0].createCircle();
  // circleArr.push(new Circle(300, 200, 100, 2));  
  // circleArr[1].createCircle();

for (let index = 0; index < 5; index++) {
  xPos = Math.floor(Math.random() * (canvas.width));
  yPos = Math.floor(Math.random() * (canvas.height));
  circleArr.push(new Circle(xPos, yPos, 100, index));  
  circleArr[index].createCircle();
}
function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  circleArr.forEach(element => {
    element.createCircle();
    element.collisionChecker();
  });
  window.requestAnimationFrame(animate)
}
animate();
console.log(circleArr)
