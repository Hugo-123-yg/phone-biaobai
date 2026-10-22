window.PHONE_CONTENT = {
  owner: '韩振', passcode: '1107',
  avatars: {shinyu:'assets/avatars/shinyu.jpg',hanjin:'assets/avatars/hanjin.jpg'},
  contacts: [
    {id:'shinyu',name:'申惟',color:'#657b89',photo:'assets/ig/申惟/72a85bd592fb8073b461e7a41db44d6d.jpg'},
    {id:'youngjae',name:'崔英宰',color:'#83958a'},
    {id:'dohoon',name:'金道勋',color:'#8b849c'},
    {id:'jihoon',name:'韩志薰',color:'#8598aa'},
    {id:'kyungmin',name:'李炅潣',color:'#b1927c'}
  ],
  script: [
    {from:'me',text:'申惟哥'},
    {from:'them',text:'韩振'},
    {from:'them',text:'我'},
    {from:'me',text:'哥直播的时候'},
    {from:'them',text:'嗯'},
    {from:'me',text:'那哥说的还算数吗'},
    {from:'me',text:'说你爱我'},
    {from:'them',text:'算数'},
    {from:'me',text:'那哥为什么不当面和我说呢？'},
    {from:'me',text:'为什么一定要在直播里'},
    {type:'call'},
    {from:'me',text:'哥，我不要电话里听'},
    {from:'me',text:'哥不要再当胆小鬼了'},
    {from:'me',text:'我也喜欢你，我爱你，申惟'},
    {from:'me',text:'当面告诉我吧'},
    {from:'them',text:'等我'}
  ],
  histories: {
    youngjae:[
      ['me','英宰哥，申惟哥他最近有啥异常吗？'],
      ['them','你快别说了，他自从从日本回来，每天在屋里都魂不守舍的'],
      ['them','一会儿猛锤那只鹅，一会儿又把脸埋在床里'],
      ['them','你看现在又来了'],
      ['them','', 'assets/chat-photo.jpeg'],
      ['them','你看，鹅都不要了'],
      ['me','呜呜麻烦英宰哥了，我俩就是，哎，我也说不清楚'],
      ['them','所以他还没跟你表白吗？'],
      ['me','！！'],['me','哥，你怎么知道……'],
      ['them','太明显了吧你们……'],
      ['me','那麻烦英宰哥帮我看着点申惟哥的情况了']
    ],
    dohoon:[['them','韩振！要不要一起去吃烤肉'],['me','道勋哥这都几点了……'],['me','没几天就回归了小心经纪人'],['them','可是这个宿舍真是待不下去了，韩志薰一直在我旁边跳舞'],['me','哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'],['me','哥你加油']],
    jihoon:[['me','韩志薰你别跳舞了！'],['me','志薰？'],['me','……'],['me','希望道勋哥没事']],
    kyungmin:[['them','韩振哥我还在公司呢'],['them','可能还得待一会，哥你先关灯睡觉吧，我会悄悄回去的'],['me','没事，没事'],['me','别太辛苦！早点回来！'],['them','呜呜好']]
  },
  notes: [
    '今天和申惟哥一起拍了内页，嗯。申惟哥真的好帅啊，没忍住最后说我俩真是很搭呢，没想到他会直接抱住我。应该会剪辑掉这部分吧，可是申惟哥真的很帅啊，我俩真的很搭吧。。。',
    '好烦，喜欢上一个不该喜欢的人真的好烦',
    '啊，这个人怎么这样呢，说都不说就直接把我抱起来了，我看粉丝都在怀疑申惟哥抱不动我，哈哈哈哈。其实完全抱起来了呢！可恶的公司为什么不放那一版',
    '怎么突然有人闯进来拍物料啊！吓死我了申惟哥和英宰哥像两个土匪一样就冲进来了！申惟啊申惟，所以有镜头在你就敢为所欲为了吗，差点就亲到我的耳朵了。。。耳朵到现在都痒痒的呢。。。为什么镜头外躲我躲得这么远，为什么啊？如果你也喜欢我，为什么不告诉我呢，你明明就也喜欢我',
    '这到底是什么吗。。。明明知道在日本看烟花是什么意思，明明都单独邀请我了，怎么还是不说话，为什么不敢直视我的眼睛。我不想要listening party的隔空表白啊。难道是因为我们看的花火隔着一层玻璃吗？我们的心也隔着一层玻璃吗？',
    '他又在直播里说爱我，申惟，你是胆小鬼啊'
  ].reverse(),
  gallery:[
    '2dba3053a461c9aa149acf5712133625.jpg', '3f62d4a7de8cdc20fdc3d24a5b27523f.jpg',
    '5a3059cad41106f2b8073ccfb11dd545.jpg', '9f875eba7dbc5a8c0357eb8a055125ae.jpg',
    'b86c35dafb1667e2b247e7c1e560d6bf.jpg', 'b990c8fc677500f2e49dcb9536b15058.jpg',
    'baac3fee9c7cb55dde524e38aeed5c8e.jpg', 'c8bb59252a0a8070bd89e69656b9a7f6.mp4'
  ].map(name=>({src:'assets/相册/'+name,type:name.endsWith('.mp4')?'video':'image'})),
  instagram:{
    me:'Hanjin_zhen',other:'Shinyu1107',
    myPhotos:['0a35ee9b0636a5b02ea9682eaf1a3c29.jpg','ec000d4d8fcd0bdb75bdd39d7db077d7.jpg','8ad0fa6a0669fd2831a1e1b6db39d6a1.jpg','85c4c86fb509edfdbb0ed83ed14380de.jpg'].map(n=>'assets/ig/韩振/'+n),
    otherPhotos:['60a7543e27bad04e2cbf9f5e06f72e7e.jpg','efabd3555331b3dc3f6b756aab7fc8b8.jpg','72a85bd592fb8073b461e7a41db44d6d.jpg','ae7a7e39baa08311f6a27c26e0cb9df7.jpg'].map(n=>'assets/ig/申惟/'+n),
    preview:'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/1e/43/89/1e4389a9-8059-020d-7723-72c2d3ca1475/mzaf_382941391276719959.plus.aac.p.m4a',
    songLink:'https://music.apple.com/us/album/soda-soda/6793458528?i=6793458541'
  },
  x:{name:'Shinyu',handle:'shinyu1107',myName:'Hanjin',myHandle:'hanzhen0105',text:'가자 숙소로',translation:'走吧 回宿舍',photos:['assets/x/53a2813df2f2ffad0c0a996514eff535.jpg','assets/x/e01adfdcaee9bba216c57c02c912037d.jpg']}
};
