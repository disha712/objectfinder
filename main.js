var status="";
var objects="";
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
}
function start(){
    object_detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object=document.getElementById("type").value;
}
function modelLoaded(){
    status=true;
    console.log("Model is Loaded");
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        object_detector.detect(video,gotResult);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            fill("#873e23");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#e28743");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==object){
                document.getElementById("status").innerHTML="The Entered Object Is Being Detected";
            }
            document.getElementById("status").innerHTML="The Entered Object Is Not Being Detected";
        }
    }
}