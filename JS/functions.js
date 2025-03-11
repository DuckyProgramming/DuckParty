//calculatory
function distPos(p1,p2){
	return dist(p1.position.x,p1.position.y,p2.position.x,p2.position.y)
}
function dirPos(p1,p2){
	return atan2(p2.position.x-p1.position.x,p2.position.y-p1.position.y)
}
function magVec(vec){
	return sqrt(vec.x**2+vec.y**2)
}
function spinControl(base){
	return base<-180?base+360:base>180?base-360:base
}
function spinDirection(base,goal,speed){
	if(
		abs(base-goal)<speed||
		abs(base-goal-360)<speed||
		abs(base-goal+360)<speed
	){
		return goal
	}else if(
		base>goal-540&&base<goal-360||
		base>goal-180&&base<goal||
		base>goal+180&&base<goal+360
	){
		return base+speed
	}else if(
		base>goal-360&&base<goal-180||
		base>goal&&base<goal+180||
		base>goal+360&&base<goal+540
	){
		return base-speed
	}
	return base+speed*(floor(random(0,2))*2-1)
}
function smoothAnim(anim,trigger,minPoint,maxPoint,speed){
	if(trigger&&anim<maxPoint){
		return min(round(anim*speed+1)/speed,maxPoint)
	}
	if(!trigger&&anim>minPoint){
		return max(round(anim*speed-1)/speed,minPoint)
	}
	return anim
}
function elementArray(base,number){
	let result=[]
	for(let a=0,la=number;a<la;a++){
		result.push(base)
	}
	return result
}
//operational
function basicCollideBoxBox(static,mobile){
    return abs(static.poition.y-mobile.position.y)/abs(static.poition.x-mobile.position.x)>static.height/static.width?(mobile.position.y>static.position.y?0:2):(mobile.position.x>static.position.x?1:3)
}
function collideBoxBox(static,mobile){
    for(let a=0,la=static.boundary.length;a<la;a++){
        for(let b=0,lb=static.boundary[a].length;b<lb;b++){
            if(a<=3){
                if(intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2*(a==2?1:-1),y:static.boundary[a][b][0].y+mobile.height/2*(a==0?1:-1)-(a==0?0.02:0)},
                    {x:static.boundary[a][b][1].x+mobile.width/2*(a!=3?1:-1),y:static.boundary[a][b][1].y+mobile.height/2*(a!=1?1:-1)-(a==0?0.02:0)})
                ){
                    return a
                }
            }else if(a==4){
                if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})
                ){
                    return 8
                }
            }else if(a==5){
                if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})
                ){
                    return 9
                }
            }else if(a==6){
                if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})
                ){
                    return 10
                }
            }else if(a==7){
                if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})
                ){
                    return 11
                }
            }
        }
    }
    return -1
}
//main
function displayTransition(layer,transition){
	layer.noStroke()
	layer.fill(0)
	layer.rect(transition.anim*layer.width/4,layer.height/2,transition.anim*layer.width/2,layer.height)
	layer.rect(layer.width-transition.anim*layer.width/4,layer.height/2,transition.anim*layer.width/2,layer.height)
	layer.rect(layer.width/2,transition.anim*layer.height/4,layer.width,transition.anim*layer.height/2)
	layer.rect(layer.width/2,layer.height-transition.anim*layer.height/4,layer.width,transition.anim*layer.height/2)
	if(transition.trigger){
		transition.anim=round(transition.anim*10+1)/10
		if(transition.anim>=1){
			transition.trigger=false
			stage.scene=transition.scene
		}
	}
	else if(transition.anim>0){
		transition.anim=round(transition.anim*10-1)/10
	}
}