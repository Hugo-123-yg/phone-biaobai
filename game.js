'use strict';
window.JumpGame=(()=>{
  const canvas=document.getElementById('jump-canvas'),ctx=canvas.getContext('2d');
  const scoreLabel=document.getElementById('jump-score'),feedback=document.getElementById('jump-feedback'),end=document.getElementById('game-end');
  let width=390,height=844,unit=1,raf=0,running=false,started=false,score=0,tiles=[],current=0,hero={x:0,y:0,z:0},camera={x:0,y:0},targetCamera={x:0,y:0},state='ready',heldAt=0,jump=null,fallAt=0,lastTime=0;
  const colors=[['#83bdb3','#5d9c93','#437f79'],['#e4b695','#c28e72','#a6765e'],['#b9c2a0','#97a780','#7b8f6c'],['#c3afca','#a58dae','#877497'],['#e4cb8f','#c6ab73','#aa8f5c']];
  function resize(){const box=canvas.getBoundingClientRect();if(!box.width||!box.height)return;width=box.width;height=box.height;unit=width/390;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
  function project(x,y,z=0){return {x:width*.5+(x-y-camera.x+camera.y)*.78*unit,y:height*.68-(x+y-camera.x-camera.y)*.42*unit-z*unit}}
  function nextTile(){const last=tiles.at(-1),gap=150+Math.random()*78,dir=Math.random()>.5;tiles.push({x:last.x+(dir?gap:0),y:last.y+(dir?0:gap),size:82+Math.random()*12,color:colors[Math.floor(Math.random()*colors.length)]})}
  function aimCamera(){const a=tiles[current],b=tiles[current+1];targetCamera={x:(a.x+b.x)/2,y:(a.y+b.y)/2}}
  function start(){resize();score=0;scoreLabel.textContent='0';feedback.textContent='长按蓄力 · 松手跳跃';end.classList.add('hidden');tiles=[{x:0,y:0,size:92,color:colors[0]}];nextTile();current=0;hero={x:0,y:0,z:0};state='ready';jump=null;aimCamera();camera={...targetCamera};started=true;resume()}
  function begin(){if(!running||state!=='ready')return;heldAt=performance.now();state='charging';feedback.textContent='蓄力中…'}
  function release(){if(state!=='charging')return;const hold=Math.min(performance.now()-heldAt,1300);const a=tiles[current],b=tiles[current+1],dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy),distance=45+hold*.24;const from={x:hero.x,y:hero.y};jump={from,to:{x:from.x+dx/len*distance,y:from.y+dy/len*distance},at:performance.now(),duration:500+Math.min(distance,300)*.3};state='jumping';feedback.textContent=''}
  function pause(){if(state==='charging')state='ready';running=false;cancelAnimationFrame(raf);raf=0;lastTime=0}
  function resume(){if(!started||running)return;resize();running=true;lastTime=performance.now();if(jump)jump.at=lastTime-(jump.progress||0)*jump.duration;raf=requestAnimationFrame(frame)}
  function polygon(points,fill){ctx.fillStyle=fill;ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fill()}
  function block(tile){const r=tile.size/2,depth=27,pts=[project(tile.x-r,tile.y-r),project(tile.x+r,tile.y-r),project(tile.x+r,tile.y+r),project(tile.x-r,tile.y+r)];const bottom=pts.map(p=>({x:p.x,y:p.y+depth*unit}));const center=project(tile.x,tile.y);
    ctx.fillStyle='#4f716a15';ctx.beginPath();ctx.ellipse(center.x+12*unit,center.y+35*unit,tile.size*.65*unit,tile.size*.24*unit,0,0,Math.PI*2);ctx.fill();
    polygon([pts[0],pts[1],bottom[1],bottom[0]],tile.color[2]);polygon([pts[3],pts[0],bottom[0],bottom[3]],tile.color[1]);polygon(pts,tile.color[0]);
    const dot=project(tile.x,tile.y);ctx.fillStyle='#ffffff55';ctx.beginPath();ctx.ellipse(dot.x,dot.y,8*unit,4*unit,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#ffffff35';ctx.lineWidth=unit;ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);ctx.lineTo(pts[1].x,pts[1].y);ctx.stroke();
  }
  function drawHero(now){const p=project(hero.x,hero.y,hero.z),ground=project(hero.x,hero.y),charge=state==='charging'?Math.min((now-heldAt)/1000,1):0,squash=1-charge*.28;
    ctx.save();if(state==='falling')ctx.globalAlpha=Math.max(0,1-(now-fallAt)/550);
    ctx.fillStyle='#193c3030';ctx.beginPath();const shadowSize=11*Math.max(.4,1-hero.z/220);ctx.ellipse(ground.x+4*unit,ground.y+4*unit,shadowSize*unit,shadowSize*.48*unit,0,0,Math.PI*2);ctx.fill();
    ctx.translate(p.x,p.y);ctx.scale(unit*(1+charge*.18),unit*squash);
    if(state==='jumping'){const t=jump.progress||0;ctx.translate(0,-22);ctx.rotate(Math.sin(t*Math.PI)*.22);ctx.translate(0,22)}
    const gradient=ctx.createLinearGradient(-11,0,11,0);gradient.addColorStop(0,'#262b2c');gradient.addColorStop(.5,'#45484b');gradient.addColorStop(1,'#202527');ctx.fillStyle=gradient;ctx.beginPath();ctx.moveTo(-9,0);ctx.bezierCurveTo(-10,-11,-6,-14,-5,-25);ctx.lineTo(5,-25);ctx.bezierCurveTo(6,-14,10,-11,9,0);ctx.quadraticCurveTo(0,6,-9,0);ctx.fill();
    ctx.beginPath();ctx.arc(0,-34,11,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffffff18';ctx.beginPath();ctx.arc(-3,-38,4,0,Math.PI*2);ctx.fill();
    if(state==='charging'){ctx.strokeStyle='#f9fcdfb0';ctx.lineWidth=1.3;for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(0,2,(15+i*5)*(1+charge*.2),4+i*2,0,0,Math.PI*2);ctx.stroke()}}
    ctx.restore();
  }
  function frame(now){if(!running)return;const dt=Math.min((now-lastTime)/16.67,3);lastTime=now;camera.x+=(targetCamera.x-camera.x)*Math.min(.11*dt,1);camera.y+=(targetCamera.y-camera.y)*Math.min(.11*dt,1);
    if(state==='jumping'){const t=Math.min((now-jump.at)/jump.duration,1);jump.progress=t;hero.x=jump.from.x+(jump.to.x-jump.from.x)*t;hero.y=jump.from.y+(jump.to.y-jump.from.y)*t;hero.z=Math.sin(t*Math.PI)*135;
      if(t===1){const b=tiles[current+1],r=b.size/2-3;hero.z=0;if(Math.abs(hero.x-b.x)<r&&Math.abs(hero.y-b.y)<r){const perfect=Math.hypot(hero.x-b.x,hero.y-b.y)<13;score+=perfect?2:1;scoreLabel.textContent=score;feedback.textContent=perfect?'正中中心 +2':'漂亮 +1';current++;nextTile();aimCamera();state='ready';jump=null}else{state='falling';fallAt=now;feedback.textContent='再试一次'}}
    }
    if(state==='falling'){hero.z=-Math.min((now-fallAt)*.24,130);if(now-fallAt>550){state='ended';document.getElementById('final-score').textContent=score;end.classList.remove('hidden')}}
    const bg=ctx.createLinearGradient(0,0,0,height);bg.addColorStop(0,'#f5f1e0');bg.addColorStop(1,'#dce8d7');ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);
    const visible=tiles.slice(Math.max(0,current-2),current+2).sort((a,b)=>(b.x+b.y)-(a.x+a.y));for(const tile of visible)block(tile);drawHero(now);raf=requestAnimationFrame(frame)
  }
  canvas.addEventListener('pointerdown',e=>{e.preventDefault();canvas.setPointerCapture(e.pointerId);begin()});canvas.addEventListener('pointerup',e=>{e.preventDefault();release()});canvas.addEventListener('pointercancel',()=>{if(state==='charging')state='ready'});canvas.addEventListener('contextmenu',e=>e.preventDefault());
  document.addEventListener('keydown',e=>{if(e.code==='Space'&&running&&!e.repeat){e.preventDefault();begin()}});document.addEventListener('keyup',e=>{if(e.code==='Space'&&running){e.preventDefault();release()}});window.addEventListener('resize',resize);
  return {start,pause,resume};
})();
