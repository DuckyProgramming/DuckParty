function setupGraphics(){
    setupBase()
    setupTrig()
    graphics.main=createGraphics(960,600)
    setupLayer(graphics.main)
    graphics.menu=createGraphics(960,600)
    setupLayer(graphics.menu)
	displayScene(0,graphics.menu)
}
function setupBase(){
    noStroke()
    angleMode(DEGREES)
	textAlign(CENTER,CENTER)
	rectMode(CENTER)
	colorMode(RGB,255,255,255,1)
	imageMode(CENTER)
    strokeJoin(ROUND)
}
function setupLayer(layer){
    layer.noStroke()
    layer.angleMode(DEGREES)
	layer.textAlign(CENTER,CENTER)
	layer.rectMode(CENTER)
	layer.colorMode(RGB,255,255,255,1)
	layer.imageMode(CENTER)
    layer.strokeJoin(ROUND)
}
function displayMain(layer){
    let scale=min(width/layer.width,height/layer.height)
    image(layer,width/2,height/2,layer.width*scale,layer.height*scale)
	updateMouse(layer,scale)
}
function setupTrig(){
	for(let a=0,la=360;a<la;a++){
		constants.trig[0].push(sin(a/2))
		constants.trig[1].push(cos(a/2))
		if(abs(constants.trig[0][a])<0.001){
			constants.trig[0][a]=0
		}
		if(abs(constants.trig[1][a])<0.001){
			constants.trig[1][a]=0
		}
	}
	for(let a=0,la=360;a<la;a++){
		constants.trig[0].push(-constants.trig[0][a])
		constants.trig[1].push(-constants.trig[1][a])
	}
	constants.sqrt2=sqrt(2)
	constants.sqrt3=sqrt(3)
}
function lsin(direction){
	return constants.trig[0][floor((direction%360+360)%360*2)]
}
function lcos(direction){
	return constants.trig[1][floor((direction%360+360)%360*2)]
}
function displayScene(scene,layer){
	switch(scene){
		case 0:
			layer.background(225)
			for(let a=0,la=30;a<la;a++){
				for(let b=0,lb=30;b<lb;b++){
					let p1=new player(layer,layer.width/2+(a*25-la*12.5+6.25+b%2*12.5)*1.5,layer.height/2+(b-lb*0.5+0.5)*12.5*1.5*constants.sqrt3,1,-1,-1,floor(random(0,6)))
					p1.color=p1.copyColor(p1.color)
					for(let c=0,lc=3;c<lc;c++){
						p1.color.skin.head[c]+=random(-25,25)
						p1.color.skin.body[c]+=random(-25,25)
						p1.color.skin.legs[c]+=random(-25,25)
						p1.color.skin.arms[c]+=random(-25,25)
					}
					p1.size=1.5
					p1.direction.main=random(0,360)
					p1.display()
				}
			}
			for(let a=0,la=100;a<la;a++){
				layer.fill(225,0.0025*(a+1))
				layer.ellipse(layer.width*0.5,layer.height*0.5,layer.width*(1-a/la),layer.height*(1-a/la))
			}
		break
	}
}