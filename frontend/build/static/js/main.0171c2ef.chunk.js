(this["webpackJsonptt-miner"]=this["webpackJsonptt-miner"]||[]).push([[0],{176:function(e){e.exports=JSON.parse('{"a":[{"constant":true,"inputs":[],"name":"size","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"playerPositions","outputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"},{"internalType":"bool","name":"initialized","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"state","outputs":[{"internalType":"enum Miner.GameState","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_size","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"GameStarted","type":"event"},{"anonymous":false,"inputs":[],"name":"GameEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"playerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"positionX","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"positionY","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"}],"name":"PlayerMoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"playerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"positionX","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"positionY","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"}],"name":"PlayerJoined","type":"event"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_blocksUntilEnd","type":"uint256"}],"name":"startGame","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"joinGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"enum Miner.Direction","name":"_direction","type":"uint8"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]}')},180:function(e,t,n){e.exports=n.p+"static/media/box-closed.3f0598f3.png"},196:function(e,t,n){e.exports=n(366)},203:function(e,t){},207:function(e,t){},236:function(e,t){},238:function(e,t){},366:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(14),s=n.n(i),c=n(399),o=n(402),u=n(21),l=n.n(u),d=n(45),m=n(18),p=n(84),f=n(113),h=n(83),y=n(27),b=r.a.createContext({setCode:function(e){},sendAll:function(e){},provider:new f.JsonRpcProvider(""),address:"",isValid:!1,signer:void 0});function v(e){var t=e.children,n=e.rpcUrl,i=Object(a.useState)((function(){var e=new f.JsonRpcProvider(n);return e.pollingInterval=400,e})),s=Object(m.a)(i,1)[0],c=Object(a.useState)(),o=Object(m.a)(c,2),u=o[0],v=o[1],g=Object(a.useState)(!0),x=Object(m.a)(g,2),O=x[0],j=x[1];Object(a.useEffect)((function(){u&&(j(!0),u.getBalance().then((function(e){j(e.gt(Object(y.bigNumberify)(0)))})))}),[u]),console.log(u&&u.address);var w=function(){var e=Object(d.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.getBalance();case 3:if(!(n=e.sent).lt(Object(y.parseEther)("0.001"))){e.next=8;break}alert("TT has already been sent"),e.next=14;break;case 8:return e.next=10,u.sendTransaction({to:t,value:n.sub(Object(y.bigNumberify)(Object(y.parseEther)("0.001")))});case 10:return a=e.sent,e.next=13,a.wait();case 13:alert("Sent!");case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),alert("Invalid Address or TT has already been sent");case 19:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(b.Provider,{value:{provider:s,signer:u,isValid:O,address:u?u.address.toLowerCase():"",setCode:function(e){var t=Object(h.fromSeed)(Object(y.sha256)("0x"+Object(y.toUtf8Bytes)(e).join("")));v(new p.Wallet(t).connect(s))},sendAll:w}},t)}var g=function(){return Object(a.useContext)(b)},x="https://rpc.platform.dev.tt-eng.com",O="0xAae17b33620ccA388549454c7a083A26806eF3c1",j=n(403),w=n(404),E=n(405),k=n(411),U=n(185),M=n(85),S=r.a.memo((function(e){var t=e.address,n=e.color,i=e.spot,s=Object(U.a)(e,["address","color","spot"]),c=Object(a.useMemo)((function(){return M({seed:t,color:n,bgcolor:"#00000000",size:6,scale:4,spotcolor:i?void 0:"#00000000"}).toDataURL()}),[t]);return r.a.createElement("img",Object.assign({},s,{src:c}))})),T=n(412),C=Object(c.a)((function(e){return Object(o.a)({container:{justifyContent:"space-between"},title:{fontSize:22,fontFamily:"Courier",fontWeight:700}})})),L=r.a.memo((function(e){var t=C(e),n=g(),a=n.address,i=n.isValid;return r.a.createElement(j.a,{position:"relative"},r.a.createElement(w.a,{className:t.container},r.a.createElement(E.a,{variant:"h6",className:t.title},"Open That Box"),a&&i&&r.a.createElement(T.a,{href:"https://scan.thundercore.com/address/"+a,target:"_blank"},r.a.createElement(k.a,{display:"flex",alignItems:"center"},r.a.createElement(k.a,{mr:1},r.a.createElement(E.a,null,a)),r.a.createElement(S,{spot:!0,address:a,height:24,width:24,color:"black"})))))})),z=n(176),A=r.a.createContext({isLoading:!1,error:!1});function P(e){var t=Object(a.useState)(),n=Object(m.a)(t,2),i=n[0],s=n[1],c=Object(a.useState)(!1),o=Object(m.a)(c,2),u=o[0],l=o[1],d=Object(a.useState)(!1),f=Object(m.a)(d,2),h=f[0],y=f[1],b=e.contractAddress,v=g(),x=v.signer;v.provider;return Object(a.useEffect)((function(){if(b&&x){l(!0),y(!1);try{new p.Contract(b,z.a,x).deployed().then((function(e){l(!1),s(e)})).catch((function(e){console.log(e),l(!1),y(!0),s(void 0)}))}catch(e){l(!1),y(!0),s(void 0)}}}),[x,b]),r.a.createElement(A.Provider,{value:{contract:i,isLoading:u,error:h}},e.children)}var I=function(){return Object(a.useContext)(A)},R=n(409),D=Object(c.a)((function(e){return Object(o.a)({})})),N=r.a.memo((function(e){D(e);var t=g(),n=t.setCode,i=t.isValid,s=t.address,c=I(),o=c.contract,u=c.isLoading,l=Object(a.useState)(""),d=Object(m.a)(l,2),p=d[0],f=d[1];return i&&s&&!!o?r.a.createElement("div",null,e.children):r.a.createElement(k.a,{display:"flex",pt:8,alignItems:"center",justifyContent:"center"},r.a.createElement(k.a,{mr:2,width:400},r.a.createElement(R.a,{fullWidth:!0,color:"inherit",variant:"filled",error:!!s&&!i,onChange:function(e){return f(e.target.value)},label:s&&!i?"Invalid Code":"Code"})),r.a.createElement(T.a,{color:"primary",variant:"contained",disabled:u,onClick:function(){n(p)}},"Login"))})),B=n(407),G=n(177),W=n(178),Y=n(179);function H(e,t,n,a,r){return{address:e.toLowerCase(),x:t.toNumber(),y:n.toNumber(),total:r,initialized:!0}}var J,X,F=n(410);function V(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?V(n,!0).forEach((function(t){Object(G.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):V(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}!function(e){e[e.Unmined=0]="Unmined",e[e.Mined=1]="Mined",e[e.Treasure=2]="Treasure"}(J||(J={})),function(e){e[e.Left=0]="Left",e[e.Right=1]="Right",e[e.Down=2]="Down",e[e.Up=3]="Up"}(X||(X={}));var q=function(){function e(t,n){var a=this;Object(W.a)(this,e),this.contract=t,this.address=n,this.isMoving=!1,this.size=0,this.stateUpdate=new F.a,this.currentUser={image:"",total:Object(y.bigNumberify)(0),x:0,y:0,address:"fake",initialized:!1},this.characters={},this.gameState=0,this.map=[],this.getCurrentUser=Object(d.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.contract.playerPositions(a.address);case 2:return t=e.sent,e.abrupt("return",{x:t.x.toNumber(),y:t.y.toNumber(),initialized:t.initialized});case 4:case"end":return e.stop()}}),e)})))}return Object(Y.a)(e,[{key:"createImage",value:function(e,t){return M({seed:e,color:"black",bgcolor:"#00000000",size:6,scale:4,spotcolor:t?void 0:"#00000000"}).toDataURL()}},{key:"initialize",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t,n,a,r,i,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([this.getCurrentUser(),this.contract.size(),this.contract.state()]);case 2:if(t=e.sent,n=Object(m.a)(t,3),a=n[0],r=n[1],i=n[2],this.size=r.toNumber(),this.map=this.makeMap(this.size),this.currentUser=_({total:Object(y.bigNumberify)(0),address:this.address,image:this.createImage(this.address,!0)},a),this.currentUser.initialized){e.next=24;break}return e.next=13,this.contract.joinGame();case 13:return s=e.sent,e.next=16,s.wait();case 16:return e.t0=_,e.t1={},e.t2=this.currentUser,e.t3={},e.next=22,this.getCurrentUser();case 22:e.t4=e.sent,this.currentUser=(0,e.t0)(e.t1,e.t2,e.t3,e.t4);case 24:return this.map[this.currentUser.x][this.currentUser.y]=J.Mined,this.gameState=i,e.next=28,this.loadHistoricalData();case 28:this.watchMovement();case 29:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"makeMap",value:function(e){return Array(e).fill(J.Unmined).map((function(t){return Array(e).fill(J.Unmined)}))}},{key:"watchMovement",value:function(){var e=this,t=function(t,n,a,r,i){var s=H(t=t.toLowerCase(),n,a,0,i);t!==e.address?(e.characters[t]=_({},s,{image:e.characters[t]?e.characters[t].image:e.createImage(t)}),e.map[s.x][s.y]=J.Mined):e.currentUser.total=s.total,e.stateUpdate.next()};this.contract.on("PlayerJoined",t),this.contract.on("PlayerMoved",t),this.contract.on("GameStarted",(function(){e.gameState=1,e.stateUpdate.next()})),this.contract.on("GameEnded",(function(){e.gameState=2,e.stateUpdate.next()}))}},{key:"loadHistoricalData",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t,n,a,r=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=_({},this.contract.filters.PlayerJoined(),{fromBlock:"0x0",toBlock:"latest"}),n=_({},this.contract.filters.PlayerMoved(),{fromBlock:"0x0",toBlock:"latest"}),e.next=4,this.contract.provider.getLogs(t);case 4:return a=e.sent,e.t0=a,e.next=8,this.contract.provider.getLogs(n);case 8:e.t1=e.sent,e.t0.concat.call(e.t0,e.t1).forEach((function(e){var t=r.contract.interface.parseLog(e).values,n=t[0].toLowerCase(),a=_({},H(n,t[1],t[2],t[3],t[4]));n!==r.address?r.characters[n]=_({},a,{image:r.createImage(n)}):r.currentUser.total=a.total,r.map[a.x][a.y]=J.Mined}));case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"canMove",value:function(e,t){return 1===this.gameState&&e>=0&&t>=0&&e<this.size&&t<this.size&&Math.abs(this.currentUser.x-e)+Math.abs(this.currentUser.y-t)===1}},{key:"callMove",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.contract.move(t);case 2:return n=e.sent,e.next=5,n.wait();case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"move",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var n,a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("move",t),n=this.currentUser,a=n.x,r=n.y,!this.isMoving){e.next=4;break}return e.abrupt("return");case 4:if(this.isMoving=!0,e.prev=5,t!==X.Down||!this.canMove(a,r+1)){e.next=13;break}return this.currentUser.y+=.4,e.next=10,this.callMove(X.Down);case 10:this.currentUser.y=r+1,e.next=32;break;case 13:if(t!==X.Up||!this.canMove(a,r-1)){e.next=20;break}return this.currentUser.y-=.4,e.next=17,this.callMove(X.Up);case 17:this.currentUser.y=r-1,e.next=32;break;case 20:if(t!==X.Left||!this.canMove(a-1,r)){e.next=27;break}return this.currentUser.x-=.4,e.next=24,this.callMove(X.Left);case 24:this.currentUser.x=a-1,e.next=32;break;case 27:if(t!==X.Right||!this.canMove(a+1,r)){e.next=32;break}return this.currentUser.x+=.4,e.next=31,this.callMove(X.Right);case 31:this.currentUser.x=a+1;case 32:this.map[this.currentUser.x][this.currentUser.y]=J.Mined,this.isMoving=!1,e.next=41;break;case 36:e.prev=36,e.t0=e.catch(5),this.isMoving=!1,this.currentUser.y=r,this.currentUser.x=a;case 41:case"end":return e.stop()}}),e,this,[[5,36]])})));return function(t){return e.apply(this,arguments)}}()}]),e}(),$=n(180),K=n.n($),Q=Object(c.a)((function(e){return Object(o.a)({})})),Z=32,ee=r.a.memo((function(e){Q(e);var t=e.service,n=Object(a.useRef)(),i=new Image;i.src=K.a;var s=29,c=19;function o(e,n,a){var r=t.characters;Object.values(r).forEach((function(t){t.x>=n.boundsXLow&&t.x<=n.boundsXHigh&&t.y>=n.boundsYLow&&t.y<=n.boundsYHigh&&function(e,t,n){var a=new Image;a.src=t.image,e.drawImage(a,(t.x-n.x+s/2)*Z+6,(t.y-n.y+c/2)*Z+6,20,20)}(e,t,a)}))}requestAnimationFrame((function e(){if(n.current){var a=n.current.getContext("2d");a.clearRect(0,0,s*Z,c*Z);var r=t.currentUser,u=Math.round(r.x)-15<0?0:Math.round(r.x)-15,l=Math.round(r.x)+14>t.size-1?t.size-1:Math.round(r.x)+14,d=Math.round(r.y)-10<0?0:Math.round(r.y)-10,m=Math.round(r.y)+10>t.size-1?t.size-1:Math.round(r.y)+10,p={boundsXHigh:l=l>t.size-1?t.size-1:l,boundsXLow:u=u<0?0:u,boundsYHigh:m=m>t.size-1?t.size-1:m,boundsYLow:d=d<0?0:d};!function(e,n,a){for(var r=n.boundsXLow;r<=n.boundsXHigh;r++)for(var o=n.boundsYLow;o<=n.boundsYHigh;o++){var u=(r-a.x+s/2)*Z,l=(o-a.y+c/2)*Z;e.lineWidth=2,e.strokeStyle="black",e.strokeRect(u,l,Z,Z),t.map[r][o]===J.Unmined&&e.drawImage(i,u+5,l+5,20,20)}}(a,p,t.currentUser),o(a,p,t.currentUser),function(e,t){var n=new Image;n.src=t.image,e.drawImage(n,s*Z/2+6,c*Z/2+6,20,20)}(a,t.currentUser),requestAnimationFrame(e)}}));var u=r.a.useCallback((function(e){"ArrowDown"===e.key||"s"===e.key?t.move(X.Down):"ArrowUp"===e.key||"w"===e.key?t.move(X.Up):"ArrowLeft"===e.key||"a"===e.key?t.move(X.Left):"ArrowRight"!==e.key&&"d"!==e.key||t.move(X.Right)}),[t]);return Object(a.useEffect)((function(){return window.addEventListener("keydown",u),function(){window.removeEventListener("keydown",u)}}),[u]),r.a.createElement("canvas",{ref:n,width:s*Z,height:c*Z})})),te=n(181),ne=n.n(te),ae=Object(c.a)((function(e){return Object(o.a)({scoreBox:{width:250,padding:8,borderRadius:4,height:50,position:"absolute",left:0,transition:e.transitions.create("all"),border:"1px solid black  "}})})),re=r.a.memo((function(e){var t=ae(e),n=g().sendAll,i=Object(a.useState)(1),s=Object(m.a)(i,2),c=(s[0],s[1]),o=Object(a.useState)(""),u=Object(m.a)(o,2),l=u[0],d=u[1];return Object(a.useEffect)((function(){e.service.stateUpdate.subscribe((function(){c(Math.random())}))}),[e.service]),r.a.createElement("div",null,0==e.service.gameState&&r.a.createElement(E.a,null,"WAITING FOR PLAYERS"),1==e.service.gameState&&r.a.createElement(E.a,null,"GAME STARTED"),2==e.service.gameState&&r.a.createElement(E.a,null,"GAME OVER"),r.a.createElement(k.a,{position:"relative",mt:2},Object.values(e.service.characters).sort((function(e,t){return t.total.gt(e.total)?1:-1})).slice(0,10).concat([e.service.currentUser]).sort((function(e,t){return t.total.gt(e.total)?1:-1})).map((function(n,a){var i=n.address,s=n.total;return r.a.createElement(k.a,{key:i,display:"flex",alignItems:"center",className:t.scoreBox,style:{top:50*a}},r.a.createElement(k.a,{mr:2},r.a.createElement(S,{address:i,color:"black",spot:i===e.service.currentUser.address})),r.a.createElement(ne.a,{component:E.a,value:parseFloat(Object(y.formatEther)(s)),variant:"h6",duration:500,stepPrecision:8}),r.a.createElement(k.a,{ml:1},r.a.createElement(E.a,null,r.a.createElement("b",null,"TT"))))}))),2==e.service.gameState&&r.a.createElement(k.a,{display:"flex",pt:8,alignItems:"center",justifyContent:"center"},r.a.createElement(k.a,{mr:2,width:250},r.a.createElement(R.a,{fullWidth:!0,color:"inherit",variant:"filled",label:"Send To Address",onChange:function(e){return d(e.target.value)}})),r.a.createElement(T.a,{color:"primary",variant:"contained",onClick:function(){return n(l)}},"Send")))})),ie=(Object(c.a)((function(e){return Object(o.a)({})})),r.a.memo((function(e){var t=I().contract,n=g().address,i=Object(a.useState)(new q(t,n)),s=Object(m.a)(i,1)[0],c=Object(a.useState)(!0),o=Object(m.a)(c,2),u=o[0],l=o[1],d=Object(a.useState)(!1),p=Object(m.a)(d,2),f=p[0],h=p[1];return Object(a.useEffect)((function(){s.initialize().then((function(){return l(!1)})).catch((function(e){console.log(e),h(!0)}))}),[s]),f?r.a.createElement(E.a,null,"Please Refresh the Page and Try again"):u?r.a.createElement(k.a,{display:"flex",alignItems:"center",mt:10,justifyContent:"center"},r.a.createElement(B.a,null)):r.a.createElement(k.a,{display:"flex",mt:6,justifyContent:"center"},r.a.createElement(k.a,{minWidth:300,mr:4,position:"relative"},r.a.createElement(re,{service:s})),r.a.createElement(k.a,null,r.a.createElement(ee,{service:s,stop:!1})))}))),se=Object(c.a)((function(e){return Object(o.a)({})})),ce=r.a.memo((function(e){se(e);return r.a.createElement(v,{rpcUrl:x},r.a.createElement(P,{contractAddress:O},r.a.createElement(L,null),r.a.createElement(N,null,r.a.createElement(ie,null))))})),oe=n(182),ue=n.n(oe);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var le=n(408),de=n(184);s.a.render(r.a.createElement(le.a,{theme:Object(de.a)({palette:{background:{default:"#edeceb"},primary:{main:"#ffe81c"}}})},r.a.createElement(ue.a,null,r.a.createElement(ce,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[196,1,2]]]);
//# sourceMappingURL=main.0171c2ef.chunk.js.map