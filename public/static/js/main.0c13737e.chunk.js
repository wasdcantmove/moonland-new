(this.webpackJsonpmoonland=this.webpackJsonpmoonland||[]).push([[0],{104:function(e,n,t){e.exports=t(189)},109:function(e,n,t){},133:function(e,n){},137:function(e,n){},162:function(e,n){},163:function(e,n){},188:function(e,n,t){},189:function(e,n,t){"use strict";t.r(n);var o,a,r=t(11),c=t.n(r),i=t(97),s=t.n(i),l=(t(109),t(1)),u=t.n(l),d=t(3),p=t(12),f=t(62),b=t.n(f),w=t(98),g=t.n(w),h=t(99),m=t.n(h),O=t(26),y=t(47),v=(t(188),t(102)),S=t(103),C=new f.UnityContext({loaderUrl:"./Build/public.loader.js",dataUrl:"./Build/public.data.unityweb",frameworkUrl:"./Build/public.framework.js.unityweb",codeUrl:"./Build/public.wasm.unityweb"}),j=Object(v.a)({apiKey:"AIzaSyDcvry5_ArzMtQPFKAqawHgnAZuBusa_Ws",authDomain:"moonland-8788b.firebaseapp.com",projectId:"moonland-8788b",storageBucket:"moonland-8788b.appspot.com",messagingSenderId:"533308612802",appId:"1:533308612802:web:2f02128e0d471808d3db5b",measurementId:"G-GQHPLJ7Y5M"});Object(S.a)(j);var A=function(){var e=Object(r.useState)(!1),n=Object(p.a)(e,2),t=n[0],i=n[1],s=Object(r.useState)(0),l=Object(p.a)(s,2),f=l[0],w=l[1],h=Object(r.useState)(""),v=Object(p.a)(h,2),S=v[0],j=v[1],A=function(){var e=Object(d.a)(u.a.mark((function e(){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!("solana"in window)){e.next=8;break}return e.next=3,window.solana.connect();case 3:if(!(n=window.solana).isPhantom){e.next=6;break}return e.abrupt("return",n);case 6:e.next=9;break;case 8:window.alert("Install https://www.phantom.app/");case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function x(){return(x=Object(d.a)(u.a.mark((function e(){var n,t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=function(){return(t=Object(d.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E();case 2:e.sent,T();case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)},n=function(){return t.apply(this,arguments)},k(),A(),n();case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var k=function(){return new O.Connection("https://solana-api.projectserum.com/",{headers:{"Access-Control-Allow-Origin":"*","Access-Control-Request-Headers":"*","Access-Control-Allow-Methods":"GET, POST, PATCH, PUT, DELETE, OPTIONS","Access-Control-Allow-Headers":"Origin, Content-Type"},mode:"no-cors"})},E=function(){var e=Object(d.a)(u.a.mark((function e(){var n,t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=Object(y.createConnectionConfig)("https://solana-api.projectserum.com/",{headers:{"Access-Control-Allow-Origin":"*","Access-Control-Request-Headers":"*","Access-Control-Allow-Methods":"GET, POST, PATCH, PUT, DELETE, OPTIONS","Access-Control-Allow-Headers":"Origin, Content-Type"},mode:"no-cors"}),A(),t=o,Object(y.isValidSolanaAddress)(t),e.next=7,Object(y.getParsedNftAccountsByOwner)({publicAddress:t,connection:n,serialization:!0});case 7:return a=e.sent,e.abrupt("return",a);case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),T=function(){var e=Object(d.a)(u.a.mark((function e(){var n,t,o,r,c,i,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={data:{arr:[]}},e.next=4,E();case 4:t=e.sent,o=Object.keys(t).map((function(e){return t[e]})),r=o.length,c=0;case 8:if(!(c<r)){e.next=20;break}return e.next=11,m.a.get(o[c].data.uri,{statusCode:200,headers:{},mode:"no-cors"});case 11:i=e.sent,n.data.arr.push(i),s=JSON.parse(JSON.stringify(n.data),(function(e,n){return"number"===typeof n||"boolean"===typeof n?n.toString():n})),a=s,console.log(c),C.send("SolanaWalletConnect","SetNFTData",JSON.stringify(a));case 17:c++,e.next=8;break;case 20:return console.log("Finished Loading NFTs"),e.abrupt("return",n.data.arr);case 24:e.prev=24,e.t0=e.catch(0),console.log(e.t0);case 27:case"end":return e.stop()}}),e,null,[[0,24]])})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){j(o)}),[]),Object(r.useEffect)((function(){j(o)}),[]),Object(r.useEffect)((function(){C.on("NFT",(function(){"solana"in window?window.solana.isConnected?(C.send("SolanaWalletConnect","SetWalletAddress",S.publicKey.toString()),C.send("SolanaWalletConnect","SetNFTData",JSON.stringify(a))):A().then((function(e){o=e.publicKey.toString(),C.send("SolanaWalletConnect","SetWalletAddress",e.publicKey.toString()),j(e.publicKey.toString())})).then((function(){!function(){x.apply(this,arguments)}()})).catch((function(e){console.log(e),console.log("fail to make connection5")})):window.alert("Install https://www.phantom.app/")}))}),[]),Object(r.useEffect)((function(){C.on("Logout",(function(){window.solana.isConnected&&(window.solana.disconnect(),window.solana.on("disconnect",(function(){return console.log("disconnected!")})),C.send("SolanaWalletConnect","Disconnected"))}))}),[]),Object(r.useEffect)((function(){C.on("progress",(function(e){console.log("progress"),w(parseFloat(100*e).toFixed(2))}))}),[]),Object(r.useEffect)((function(){C.on("loaded",(function(){console.log("loaded"),i(!0)}))}),[]),c.a.createElement("div",{style:{visibility:t?"hidden":"visible",backgroundImage:"url(".concat(g.a,")"),backgroundSize:"cover",height:"100%",width:"100%",color:"#f5f5f5",position:"absolute",left:0,top:0}},c.a.createElement("p",{style:{visibility:t?"hidden":"visible",height:"30px",width:"100%",position:"absolute",textAlign:"center",bottom:"100px",fontSize:"2em",fontColor:"red"}},"Loading... ",f,"%"),c.a.createElement("div",null,c.a.createElement(b.a,{style:{visibility:t?"visible":"hidden",height:"100%",width:"100%",background:"grey",position:"absolute",left:0,top:0,overflow:"hidden"},unityContext:C})))},x=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,190)).then((function(n){var t=n.getCLS,o=n.getFID,a=n.getFCP,r=n.getLCP,c=n.getTTFB;t(e),o(e),a(e),r(e),c(e)}))};s.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(A,null)),document.getElementById("root")),x()},98:function(e,n,t){e.exports=t.p+"static/media/background.f45e90e0.png"}},[[104,1,2]]]);
//# sourceMappingURL=main.0c13737e.chunk.js.map