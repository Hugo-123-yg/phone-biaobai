const presets = {
  fog: {
    title: "", subtitle: "",
    contacts: [
      {id:"hanzhen",name:"珍珍韩振",phone:"186 0105 0105",note:"韩振",color:"#64758a"},
      {id:"cui",name:"崔英宰",phone:"010 2201 0707",note:"",color:"#758da2"},
      {id:"jin",name:"金道勋",phone:"010 2202 0808",note:"",color:"#83766c"},
      {id:"hanji",name:"韩志薰",phone:"010 2203 0909",note:"",color:"#617c75"},
      {id:"li",name:"李炅潣",phone:"010 2204 1010",note:"",color:"#8b6f82"}
    ],
    chats: {
      messages: [
        {id:"hanzhen",unread:true,time:"现在",messages:[{from:"them",text:"哥，你的脖子疼吗？",time:"现在"}]},
        {id:"cui",unread:false,time:"",messages:[]},
        {id:"jin",unread:false,time:"",messages:[]},
        {id:"hanji",unread:false,time:"",messages:[]},
        {id:"li",unread:false,time:"",messages:[]}
      ]
    },
    instagram:{stories:["韩振"],storyUser:"hanjin0105",user:"shinyu",caption:"今天也留下了很多照片。",likes:"36,842",comments:"12,680",shares:"15,903"}
  }
};

const PHOTO_KEY="storyphone.deletedPhotos.v1";
const PHOTO_NAMES=['70cb2f2414e785939c3dc6705fbdb473.jpg','6bf8c10259bd4cb78c9d3daf27e0adc6.jpg','f7d28d43e2206dbc8ccc5ce9935d1b9e.jpg','60a7543e27bad04e2cbf9f5e06f72e7e.jpg','efabd3555331b3dc3f6b756aab7fc8b8.jpg','72a85bd592fb8073b461e7a41db44d6d.jpg','ae7a7e39baa08311f6a27c26e0cb9df7.jpg','0a35ee9b0636a5b02ea9682eaf1a3c29.jpg','ec000d4d8fcd0bdb75bdd39d7db077d7.jpg','8ad0fa6a0669fd2831a1e1b6db39d6a1.jpg','85c4c86fb509edfdbb0ed83ed14380de.jpg','e8e56ea5105b4e9ace8cf2bc2263226f.jpg','0ff056af001e9d3a47eba0871cd5fc15.jpg','6ad7b3401990579f1cb20d8b221f8232.jpg','5ac16fd033960ccc3b05a6b5d2f3899a.jpg','3cb7f47a5347079781a222c13e38a4b8.jpg','9f10c804d14e5b8e8fc8ed1c3966d941.jpg','d7a25ad865073508aaa598088cd0c415.jpg','eba4c02598d6fb27ce574377aa3fe47a.jpg','c43f8b95abf7e7e37b89be6554e9ac9e.jpg','e5acdd90e2cfa0c4f0c2957f8b1965df.jpg','3483ab7dbd846db2bb0b0e9dff7bd0dd.jpg','da39901eff9bfcde54253be4b346ff81.jpg','dd728b4bf6cb942429d6f65f95a307b8.jpg','7c8868dec496d39b4467a7155917a345.jpg'];
let data=loadData(); data.scenario="fog"; if(!data.stories.fog)data.stories.fog=clone(presets.fog); let currentApp="messages"; let currentChat=null; let currentContact=null; let editId=null;
let deletedPhotos=readDeletedPhotos(),currentPhotoIndex=0;
function readDeletedPhotos(){try{const saved=JSON.parse(localStorage.getItem(PHOTO_KEY)||'[]');return new Set(Array.isArray(saved)?saved:[])}catch{return new Set()}}
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
function clone(v){return JSON.parse(JSON.stringify(v))}
function loadData(){return {scenario:'fog',stories:{fog:clone(presets.fog)}}}
function story(){if(!data.stories[data.scenario])data.stories[data.scenario]=clone(presets[data.scenario]);return data.stories[data.scenario]}
function save(){/* The story intentionally restarts on every page load. */}
function safe(t=""){const d=document.createElement("div");d.textContent=t;return d.innerHTML}
function showView(name){$$('.view').forEach(v=>v.classList.toggle('active',v.dataset.view===name));document.body.dataset.view=name}
function goHome(){showView('home');renderHome()}
function renderHome(){const s=story();const unread=s.chats.messages.filter(c=>c.unread).length;$('#messages-badge').textContent=unread||"";$('#messages-badge').classList.toggle('hidden',!unread)}
function contact(id){return story().contacts.find(c=>c.id===id)||{id,name:"未知联系人",phone:"",note:"",color:"#777"}}
function avatar(c){return `<span class="avatar" style="background:${c.color||'#68798a'}">${safe((c.name||'?').slice(0,1))}</span>`}
function openApp(app){currentApp=app;if(app==='instagram'){renderInstagram();showView('instagram');return}if(app==='x'){showView('x');return}if(app==='photos'){renderPhotos();showView('photos');return}if(app==='phone'||app==='contacts'){currentApp='phone';showPhoneTab(app==='contacts'?'contacts':phoneTab);return}if(['notes','camera'].includes(app)){showView(app);return}renderList(app);showView('list')}
function renderList(app){const s=story(), isContacts=app==='contacts';$('#list-kicker').textContent='';$('#list-title').textContent=isContacts?'通讯录':app==='wechat'?'微信':'信息';$('#list-context').textContent='';$('#add-contact').classList.toggle('hidden',!isContacts);$('#search-wrap').classList.toggle('hidden',app==='wechat');$('#search-input').value='';
  if(isContacts){const rows=s.contacts.slice().sort((a,b)=>a.name.localeCompare(b.name,'zh-CN')).map(c=>`<button class="contact-row" data-contact="${c.id}">${avatar(c)}<span class="row-main"><b>${safe(c.name)}</b><p>${safe(c.note||c.phone)}</p></span><span>›</span></button>`).join('');$('#list-content').innerHTML=`<p class="section-letter">A — Z</p>${rows}`}
  else renderConversationList(app)
}
function renderConversationList(app,query=''){const chats=story().chats[app]||[];const rows=chats.filter(x=>contact(x.id).name.toLowerCase().includes(query.toLowerCase())).map(x=>{const c=contact(x.id),last=x.messages.filter(m=>m.text).at(-1);return `<button class="conversation-row" data-chat="${x.id}">${avatar(c)}<span class="row-main"><span class="row-top"><b>${safe(c.name)}</b><time>${safe(x.time)}</time></span><p>${safe(last?.text||'暂无消息')}</p></span>${x.unread?'<i class="unread-dot"></i>':''}</button>`}).join('');$('#list-content').innerHTML=rows||'<p class="bubble-note">没有找到对话</p>'}
function openChat(id){currentChat=id;const c=contact(id),thread=story().chats[currentApp].find(x=>x.id===id);thread.unread=false;save();$('#message-input').value='';$('#message-input').readOnly=currentApp==='messages'&&id==='hanzhen';$('#chat-name').textContent=c.name;$('#chat-avatar').textContent=c.name.slice(0,1);$('#chat-avatar').style.background=c.color;$('#chat-back').textContent=`‹ ${currentApp==='wechat'?'微信':'信息'}`;renderMessages();showView('chat')}
function renderMessages(){const thread=story().chats[currentApp].find(x=>x.id===currentChat);$('#messages').innerHTML=thread.messages.map(m=>m.type==='note'?`<div class="bubble-note">${safe(m.text)}</div>`:`<div class="bubble ${m.from==='me'?'me':''} ${m.from==='them'?'them':''} ${currentApp==='wechat'&&m.from==='me'?'wechat-me':''}">${safe(m.text)}</div>`).join('');requestAnimationFrame(()=>{$('#messages').scrollTop=$('#messages').scrollHeight})}
function openContact(id){currentContact=id;const c=contact(id);$('#contact-detail').innerHTML=`<div class="detail-avatar" style="background:${c.color}">${safe(c.name.slice(0,1))}</div><h2>${safe(c.name)}</h2><p>${safe(c.note)}</p><div class="contact-actions"><button data-contact-message="${c.id}">信息</button><button data-open="phone">呼叫</button></div><div class="detail-card"><small>电话号码</small><p>${safe(c.phone||'未填写')}</p></div><div class="detail-card"><small>备注</small><p>${safe(c.note||'暂无备注')}</p></div>`;showView('contact')}
function renderInstagram(){const i=story().instagram;$('#stories').innerHTML='<button class="story" id="han-ig-story" type="button" aria-label="查看韩振的四张动态照片"><div class="story-ring"><img src="photos/'+IG_STORY_PHOTOS[0]+'" alt=""/></div>韩振</button>';$('#han-ig-story').addEventListener('click',openIGStory);$('#feed').innerHTML=`<div class="post-head"><span class="avatar">${safe(i.user.slice(0,1).toUpperCase())}</span><b>${safe(i.user)}</b></div><img class="social-photo" src="photos/70cb2f2414e785939c3dc6705fbdb473.jpg" alt="照片"/><div class="post-actions"><span>♡</span><span>○</span><span>⌁</span></div><p class="post-copy"><b>${safe(i.likes)} 次赞</b><br><b>${safe(i.user)}</b>${safe(i.caption)}<br><span style="color:#92959a">查看全部 ${safe(i.comments)} 条评论 · ${safe(i.shares)} 次转发</span></p>`}
function availablePhotos(){return PHOTO_NAMES.filter(name=>!deletedPhotos.has(name))}
function renderPhotos(){const photos=availablePhotos();$('#photo-grid').innerHTML=photos.map((name,i)=>`<button class="photo-tile" data-photo="${safe(name)}" aria-label="打开照片 ${i+1}"><img src="photos/${safe(name)}" alt="相册照片 ${i+1}" loading="lazy"></button>`).join('')||'<p class="bubble-note">没有照片</p>'}
function openPhoto(name){const photos=availablePhotos();currentPhotoIndex=Math.max(0,photos.indexOf(name));paintPhoto();$('#photo-viewer').classList.remove('hidden')}
function paintPhoto(){const photos=availablePhotos();if(!photos.length){$('#photo-viewer').classList.add('hidden');renderPhotos();return}currentPhotoIndex=(currentPhotoIndex+photos.length)%photos.length;$('#full-photo').src=`photos/${photos[currentPhotoIndex]}`;$('#photo-count').textContent=`${currentPhotoIndex+1} / ${photos.length}`}
function deleteCurrentPhoto(){const photos=availablePhotos();if(!photos.length)return;deletedPhotos.add(photos[currentPhotoIndex]);localStorage.setItem(PHOTO_KEY,JSON.stringify([...deletedPhotos]));$('#delete-sheet').classList.add('hidden');const next=availablePhotos();if(currentPhotoIndex>=next.length)currentPhotoIndex=Math.max(0,next.length-1);paintPhoto();renderPhotos();toast('照片已删除')}
function openContactForm(id=null){editId=id;const c=id?contact(id):{name:'',phone:'',note:''};$('#form-kicker').textContent=id?'编辑':'新建';$('#contact-name-input').value=c.name;$('#contact-phone-input').value=c.phone;$('#contact-note-input').value=c.note;$('#contact-modal').classList.remove('hidden');setTimeout(()=>$('#contact-name-input').focus(),200)}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),1800)}
function appendHan(text){const thread=story().chats.messages.find(x=>x.id==='hanzhen');thread.messages.push({from:'them',text,time:'现在'});thread.time='现在';thread.unread=currentChat!=='hanzhen';save();if(currentChat==='hanzhen'&&currentApp==='messages')renderMessages();renderHome()}
function showIncomingCall(thread){const overlay=$('#call-overlay');$('#call-state').textContent='iPhone 来电';$('#call-status').textContent='正在呼叫…';overlay.classList.remove('hidden');setTimeout(()=>{$('#call-state').textContent='通话已结束';$('#call-status').textContent='已挂断';setTimeout(()=>{overlay.classList.add('hidden');callHistory.unshift({name:contact('hanzhen').name,kind:'未接来电',time:'刚刚'});appendHan('哥如果不舒服一定要和我说，我去告诉经纪人哥带你去医院！！');thread.storyStep=2;save()},750)},1900)}
function handleHanFlow(thread,text){if((thread.storyStep||0)===0&&text.includes('没关系')){thread.storyStep=1;save();setTimeout(()=>showIncomingCall(thread),450);return}if(thread.storyStep===2&&text.includes('千万不要告诉经纪人哥')){thread.storyStep=3;save();['？啊','哦哦…对','我知道了！！！'].forEach((reply,i)=>setTimeout(()=>appendHan(reply),650+i*750))}}
function fillScriptedReply(){if(currentApp!=='messages'||currentChat!=='hanzhen')return;const thread=story().chats.messages.find(x=>x.id==='hanzhen');const step=thread.storyStep||0;const replies={0:'没关系…',2:'阿尼亚韩进ni，这件事千万不要告诉经纪人哥知道了吗？'};$('#message-input').value=replies[step]||''}
function updateClock(){const n=new Date(),time=n.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false});$('#clock').textContent=time;$('#lock-time').textContent=time;$('#lock-date').textContent=n.toLocaleDateString('zh-CN',{month:'long',day:'numeric',weekday:'long'})}
let pendingLockApp=null,enteredPasscode="",swipeStart=0;
function paintPasscode(){const dots=$$('#passcode-dots i');dots.forEach((d,i)=>d.classList.toggle('filled',i<enteredPasscode.length));$('#passcode-dots').setAttribute('aria-label',`已输入 ${enteredPasscode.length} 位`)}
function showPasscode(openAfter=null){pendingLockApp=openAfter||pendingLockApp;enteredPasscode="";paintPasscode();$('#passcode-error').textContent='请输入 4 位密码';$('#passcode-error').classList.remove('error');$('#passcode-screen').classList.remove('hidden')}
function unlockPhone(){const lock=$('#lock-screen');lock.classList.add('unlocked');$('#passcode-screen').classList.add('hidden');document.body.classList.remove('locked');if(pendingLockApp)setTimeout(()=>openApp(pendingLockApp),360)}
function submitDigit(digit){if(enteredPasscode.length>=4)return;enteredPasscode+=digit;paintPasscode();if(enteredPasscode.length===4){if(enteredPasscode==='0105'){setTimeout(unlockPhone,180)}else{const panel=$('.passcode-content');$('#passcode-error').textContent='密码错误';$('#passcode-error').classList.add('error');panel.classList.add('shake');setTimeout(()=>{enteredPasscode='';paintPasscode();panel.classList.remove('shake')},430)}}}

document.addEventListener('click',e=>{const open=e.target.closest('[data-open]');if(open)openApp(open.dataset.open);const chat=e.target.closest('[data-chat]');if(chat)openChat(chat.dataset.chat);const c=e.target.closest('[data-contact]');if(c)openContact(c.dataset.contact);const messageContact=e.target.closest('[data-contact-message]');if(messageContact){currentApp='messages';openChat(messageContact.dataset.contactMessage)}const photo=e.target.closest('[data-photo]');if(photo)openPhoto(photo.dataset.photo)});
$('#lock-screen').addEventListener('pointerdown',e=>{swipeStart=e.clientY});$('#lock-screen').addEventListener('pointerup',e=>{if(swipeStart-e.clientY>45)showPasscode()});$('#unlock-hint').addEventListener('click',()=>showPasscode());$$('[data-lock-open]').forEach(n=>n.addEventListener('click',()=>showPasscode(n.dataset.lockOpen)));$$('[data-digit]').forEach(n=>n.addEventListener('click',()=>submitDigit(n.dataset.digit)));$('#delete-digit').addEventListener('click',()=>{enteredPasscode=enteredPasscode.slice(0,-1);paintPasscode()});$('#cancel-passcode').addEventListener('click',()=>{$('#passcode-screen').classList.add('hidden');enteredPasscode='';paintPasscode()});document.body.classList.add('locked');setTimeout(()=>$('#han-notification').classList.add('pop'),650);
$$('.home-action').forEach(b=>b.addEventListener('click',goHome));$('#home-indicator').addEventListener('click',goHome);
$('#chat-back').addEventListener('click',()=>{renderList(currentApp);showView('list')});$('#contact-back').addEventListener('click',()=>{currentApp='phone';showPhoneTab('contacts')});$('#chat-person').addEventListener('click',()=>openContact(currentChat));
$('#message-input').addEventListener('click',fillScriptedReply);
$('#message-input').addEventListener('focus',fillScriptedReply);
$('#composer').addEventListener('submit',e=>{e.preventDefault();const input=$('#message-input'),text=input.value.trim();if(!text)return;const thread=story().chats[currentApp].find(x=>x.id===currentChat);thread.messages.push({from:'me',text,time:new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false})});thread.time='现在';input.value='';save();renderMessages();if(currentApp==='messages'&&currentChat==='hanzhen')handleHanFlow(thread,text)});
$('#search-input').addEventListener('input',e=>{if(currentApp==='contacts'){const q=e.target.value.toLowerCase();$$('[data-contact]').forEach(x=>x.classList.toggle('hidden',!x.textContent.toLowerCase().includes(q)))}else renderConversationList(currentApp,e.target.value)});
$('#add-contact').addEventListener('click',()=>openContactForm());$('#edit-contact').addEventListener('click',()=>openContactForm(currentContact));$('#cancel-contact').addEventListener('click',()=>$('#contact-modal').classList.add('hidden'));
$('#contact-form').addEventListener('submit',e=>{e.preventDefault();const values={name:$('#contact-name-input').value.trim(),phone:$('#contact-phone-input').value.trim(),note:$('#contact-note-input').value.trim()};if(editId){Object.assign(contact(editId),values)}else{story().contacts.push({id:`custom-${Date.now()}`,...values,color:'#8a6f91'})}save();$('#contact-modal').classList.add('hidden');if(editId)openContact(editId);else{currentApp='phone';showPhoneTab('contacts')}toast('联系人已保存在本机')});
$('#close-photo').addEventListener('click',()=>$('#photo-viewer').classList.add('hidden'));$('#prev-photo').addEventListener('click',()=>{currentPhotoIndex--;paintPhoto()});$('#next-photo').addEventListener('click',()=>{currentPhotoIndex++;paintPhoto()});$('#delete-photo').addEventListener('click',()=>$('#delete-sheet').classList.remove('hidden'));$('#cancel-delete-photo').addEventListener('click',()=>$('#delete-sheet').classList.add('hidden'));$('#confirm-delete-photo').addEventListener('click',deleteCurrentPhoto);

const IG_STORY_PHOTOS=['0a35ee9b0636a5b02ea9682eaf1a3c29.jpg','ec000d4d8fcd0bdb75bdd39d7db077d7.jpg','8ad0fa6a0669fd2831a1e1b6db39d6a1.jpg','85c4c86fb509edfdbb0ed83ed14380de.jpg'];
let igStoryIndex=0,phoneTab='keypad';
const callHistory=[];
function paintIGStory(){const name=IG_STORY_PHOTOS[igStoryIndex];$('#ig-story-photo').src='photos/'+name;$('#ig-story-count').textContent=(igStoryIndex+1)+' / 4';$('#ig-story-progress').innerHTML=IG_STORY_PHOTOS.map((_,i)=>'<i class="'+(i<=igStoryIndex?'seen':'')+'"></i>').join('')}
function openIGStory(){igStoryIndex=0;paintIGStory();$('#ig-story-handle').textContent='@'+story().instagram.storyUser;$('#ig-story-viewer').classList.remove('hidden')}
function changeIGStory(direction){const next=igStoryIndex+direction;if(next>=IG_STORY_PHOTOS.length){$('#ig-story-viewer').classList.add('hidden');return}igStoryIndex=Math.max(0,next);paintIGStory()}
function showPhoneTab(tab){phoneTab=tab;showView('phone');['recents','contacts','keypad'].forEach(t=>$('#phone-'+t+'-panel').classList.toggle('hidden',t!==tab));$$('[data-phone-tab]').forEach(b=>{b.classList.toggle('selected',b.dataset.phoneTab===tab);b.setAttribute('aria-pressed',String(b.dataset.phoneTab===tab))});$('#phone-title').textContent={recents:'通话记录',contacts:'联系人',keypad:'电话'}[tab];if(tab==='contacts')$('#phone-contacts').innerHTML=story().contacts.map(c=>'<button type="button" class="contact-row" data-contact="'+c.id+'">'+avatar(c)+'<span class="row-main"><b>'+safe(c.name)+'</b><p>'+safe(c.phone)+'</p></span><span>›</span></button>').join('');if(tab==='recents')$('#phone-recents').innerHTML=callHistory.map(c=>'<div class="recent-row"><div><b>'+safe(c.name)+'</b><small>'+safe(c.kind)+'</small></div><time>'+safe(c.time)+'</time></div>').join('')||'<p class="empty-recents">没有通话记录</p>'}
$('#close-ig-story').addEventListener('click',()=>$('#ig-story-viewer').classList.add('hidden'));
$('#prev-ig-story').addEventListener('click',()=>changeIGStory(-1));
$('#next-ig-story').addEventListener('click',()=>changeIGStory(1));
$$('[data-phone-tab]').forEach(b=>b.addEventListener('click',()=>showPhoneTab(b.dataset.phoneTab)));

let dialNumber='';
$('#dial-keypad').innerHTML=['1','2','3','4','5','6','7','8','9','*','0','#'].map(d=>'<button type="button" data-dial="'+d+'">'+d+'</button>').join('');
$('#dial-keypad').addEventListener('click',e=>{const key=e.target.closest('[data-dial]');if(key){dialNumber+=key.dataset.dial;$('#dial-number').textContent=dialNumber;$('#dial-status').textContent=''}});
$('#dial-number').addEventListener('click',()=>{dialNumber=dialNumber.slice(0,-1);$('#dial-number').textContent=dialNumber});
$('#dial-call').addEventListener('click',()=>{if(!dialNumber)return;$('#dial-status').textContent='正在呼叫…';const number=dialNumber;setTimeout(()=>{$('#dial-status').textContent='通话已结束';callHistory.unshift({name:number,kind:'呼出电话',time:'刚刚'})},1800)});
updateClock();setInterval(updateClock,30000);renderHome();

