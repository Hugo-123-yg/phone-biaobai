'use strict';
// Pointer events support a finger on mobile and dragging with a mouse on desktop.
(()=>{
  const phone=document.querySelector('.phone');
  let gesture=null,suppressClickUntil=0,suppressClickPoint=null;
  const isVisible=selector=>!document.querySelector(selector).classList.contains('hidden');
  function changeMedia(direction){const next=mediaIndex+direction;if(next>=0&&next<mediaItems.length){mediaIndex=next;paintMedia()}}
  function changeStory(direction){const next=storyIndex+direction;if(next>=storyPhotos.length){closeStory();return}if(next>=0){storyIndex=next;paintStory()}}
  function changePost(index,direction){const post=posts[index];const next=post.index+direction;if(next<0||next>=post.photos.length)return;post.index=next;document.querySelector(`#ig-feed [data-post="${index}"]`).outerHTML=postMarkup(post,index);updateMusicButtons()}
  phone.addEventListener('dragstart',e=>{if(e.target.closest('img'))e.preventDefault()});
  phone.addEventListener('pointerdown',e=>{
    if(!e.isPrimary||e.button!==0){gesture=null;return}
    const rect=phone.getBoundingClientRect(),target=e.target;
    let kind=null,post=null;
    if(unlocked&&e.clientY>=rect.bottom-32)kind='home';
    else if(isVisible('#media-viewer')&&target.closest('#media-content')){
      // Keep the video's native scrubber, volume and full-screen controls usable.
      const video=target.closest('video');if(video&&e.clientY>video.getBoundingClientRect().bottom-55)return;
      kind='media';
    }else if(isVisible('#ig-story')&&target.closest('.story-touch,#story-image'))kind='story';
    else if(view==='instagram'&&target.closest('.carousel>img')){kind='post';post=+target.closest('[data-post]').dataset.post}
    if(!kind)return;
    gesture={kind,post,id:e.pointerId,x:e.clientX,y:e.clientY,at:performance.now(),moving:false};
  });
  phone.addEventListener('pointermove',e=>{
    if(!gesture||gesture.id!==e.pointerId)return;
    const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
    const active=gesture.kind==='home'?dy<-9&&Math.abs(dy)>Math.abs(dx):Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.15;
    if(active){gesture.moving=true;if(e.cancelable)e.preventDefault();if(!phone.hasPointerCapture(e.pointerId))phone.setPointerCapture(e.pointerId)}
  },{passive:false});
  phone.addEventListener('pointerup',e=>{
    if(!gesture||gesture.id!==e.pointerId)return;
    const g=gesture;gesture=null;
    const dx=e.clientX-g.x,dy=e.clientY-g.y;
    let handled=false;
    if(performance.now()-g.at>2200)return;
    if(g.kind==='home'&&dy<-42&&Math.abs(dy)>Math.abs(dx)*1.2){goHome();handled=true}
    else if(g.kind!=='home'&&Math.abs(dx)>44&&Math.abs(dx)>Math.abs(dy)*1.25){
      const direction=dx<0?1:-1;
      if(g.kind==='media')changeMedia(direction);
      if(g.kind==='story')changeStory(direction);
      if(g.kind==='post')changePost(g.post,direction);
      handled=true;
    }
    if(handled){suppressClickUntil=performance.now()+350;suppressClickPoint={x:e.clientX,y:e.clientY};if(e.cancelable)e.preventDefault()}
  });
  phone.addEventListener('pointercancel',()=>gesture=null);
  // Do not also treat a completed swipe as a tap on the photo or story.
  phone.addEventListener('click',e=>{if(performance.now()<suppressClickUntil&&suppressClickPoint&&Math.hypot(e.clientX-suppressClickPoint.x,e.clientY-suppressClickPoint.y)<20){e.preventDefault();e.stopImmediatePropagation()}},true);
})();
