(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[420],{6981:function(e,r,t){Promise.resolve().then(t.bind(t,3427))},3427:function(e,r,t){"use strict";t.r(r);var n=t(3827),s=t(1585),l=t(4922),a=t(4090);t(2413),t(7015),r.default=function(){let e;let r=new Date("2022-10-01T07:30:00-04:00"),t=new Date("2022-11-30T07:30:00-04:00"),[u,i]=(0,a.useState)(r),[c,o]=(0,a.useState)(t),[m,d]=(0,a.useState)({x:0,y:0}),[h,p]=(0,a.useState)([]),[v,N]=(0,a.useState)({TOTALREPORT:{revenue:0,loss:0,revenueNumSmallCar:0,revenueNumMediumCar:0,revenueNumBigCar:0,revenueNumTruck1:0,revenueNumTruck2:0,lossNumSmallCar:0,lossNumMediumCar:0,lossNumBigCar:0,lossNumTruck1:0,lossNumTruck2:0},DAYREPORTARRAY:[{revenue:0,loss:0,revenueNumSmallCar:0,revenueNumMediumCar:0,revenueNumBigCar:0,revenueNumTruck1:0,revenueNumTruck2:0,lossNumSmallCar:0,lossNumMediumCar:0,lossNumBigCar:0,lossNumTruck1:0,lossNumTruck2:0},{revenue:0,loss:0,revenueNumSmallCar:0,revenueNumMediumCar:0,revenueNumBigCar:0,revenueNumTruck1:0,revenueNumTruck2:0,lossNumSmallCar:0,lossNumMediumCar:0,lossNumBigCar:0,lossNumTruck1:0,lossNumTruck2:0}]}),[g,T]=(0,a.useState)(!1);(0,a.useEffect)(()=>{{T(!1);let e=e=>{let{clientX:r,clientY:t}=e;d({x:r,y:t})};return window.addEventListener("mousemove",e),()=>{window.removeEventListener("mousemove",e)}}},[]),(0,a.useEffect)(()=>{var r,t;e=g?{transform:"translate(-70rem, -70rem) rotate(30deg)",transition:"transform 1s ease, opacity 1s ease"}:{transform:"rotate(20deg) translateX(".concat(m.x/((null===(r=window)||void 0===r?void 0:r.innerWidth)||document.documentElement.clientWidth)*3-25,"rem) translateY(").concat(m.y/((null===(t=window)||void 0===t?void 0:t.innerHeight)||document.documentElement.clientHeight)*3-20,"rem)"),opacity:.4}},[g]),(0,a.useEffect)(()=>{let e=new URLSearchParams(window.location.search),r=e.get("startDate"),t=e.get("endDate");i(new Date(r+"T00:30:00-04:00")),o(new Date(t+"T00:30:00-04:00")),console.log(r)},[]),(0,a.useEffect)(()=>{let e=new URLSearchParams({startDate:u.toISOString().split("T")[0],endDate:c.toISOString().split("T")[0]});window.history.replaceState({},"","".concat(window.location.pathname,"?").concat(e.toString())),k(u,c)},[u,c]);let k=async(e,r)=>{try{let t=await (0,s.w)(e,r);console.log(t);let n=await (0,l.O)(t);N(n)}catch(e){console.error("Error truncating data:",e)}};return(0,n.jsxs)("div",{className:"App",children:[console.log(v),(0,n.jsxs)("div",{className:"App",children:[(0,n.jsx)("h1",{className:"title1",children:"ReTirely Report"}),(0,n.jsx)("div",{className:"wallpaper",style:e})]}),(0,n.jsxs)("div",{className:"information",children:[(0,n.jsx)("h2",{children:"Total Report"}),(0,n.jsx)("div",{id:"total-report",children:(0,n.jsxs)("div",{id:"tr-table",children:[(0,n.jsxs)("p",{children:["Revenue: ",v.TOTALREPORT.revenue]}),(0,n.jsxs)("p",{children:["Loss: ",v.TOTALREPORT.loss]})]})}),(0,n.jsx)("div",{id:"graph",children:" Graph"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{children:"Day Report Array"}),v.DAYREPORTARRAY.map(e=>(0,n.jsxs)("div",{children:[(0,n.jsxs)("h3",{children:["Date: ",e.date]}),(0,n.jsxs)("p",{children:["Revenue: ",e.revenue]}),(0,n.jsxs)("p",{children:["Loss: ",e.loss]})]},e.date))]})]})}},9411:function(e,r,t){"use strict";t.d(r,{F:function(){return l}});var n=t(6491),s=t.n(n);let l=async()=>{let e=await fetch("../database/datafile.csv"),r=await e.text(),t=new Blob([r],{type:"text/csv"}),n=new File([t],"sample.csv",{type:"text/csv"});return new Promise((e,r)=>{let t=new FileReader;t.onload=async t=>{let n=t.target.result;s().parse(n,{header:!1,dynamicTyping:!0,complete:r=>{let t=r.data.map(e=>({callDate:a(e[0]),apptDate:a(e[1]),category:e[2]}));t.sort((e,r)=>{let t=e.apptDate-r.apptDate;return 0!==t?t:e.callDate-r.callDate}),e(t)},error:e=>{r(e.message)}})},t.readAsText(n)})},a=e=>{if(!e)return null;let[r,t]=e.split(" "),[n,s,l]=r.split("-"),[a,u]=t.split(":");return new Date(n,s-1,l,a,u)}},4922:function(e,r,t){"use strict";t.d(r,{O:function(){return n}});let n=e=>{let r={servicingTime:30,charge:150},t={servicingTime:30,charge:150},n={servicingTime:30,charge:150},s={servicingTime:60,charge:250},l={servicingTime:120,charge:700},a=[],u={date:"",revenue:0,loss:0,revenueNumSmallCar:0,revenueNumMediumCar:0,revenueNumBigCar:0,revenueNumTruck1:0,revenueNumTruck2:0,lossNumSmallCar:0,lossNumMediumCar:0,lossNumBigCar:0,lossNumTruck1:0,lossNumTruck2:0},i={revenue:0,loss:0,revenueNumSmallCar:0,revenueNumMediumCar:0,revenueNumBigCar:0,revenueNumTruck1:0,revenueNumTruck2:0,lossNumSmallCar:0,lossNumMediumCar:0,lossNumBigCar:0,lossNumTruck1:0,lossNumTruck2:0},c=[{id:1,isFree:!0,type:null,timeWhenFree:null,isWalkIn:!1},{id:2,isFree:!0,type:null,timeWhenFree:null,isWalkIn:!1},{id:3,isFree:!0,type:null,timeWhenFree:null,isWalkIn:!1},{id:4,isFree:!0,type:null,timeWhenFree:null,isWalkIn:!1},{id:5,isFree:!0,type:null,timeWhenFree:null,isWalkIn:!1},{id:6,isFree:!0,type:null,timeWhenFree:null,isWalkIn:!1},{id:7,isFree:!0,type:null,timeWhenFree:null,isWalkIn:!1},{id:8,isFree:!0,type:null,timeWhenFree:null,isWalkIn:!1},{id:9,isFree:!0,type:null,timeWhenFree:null,isWalkIn:!1},{id:10,isFree:!0,type:null,timeWhenFree:null,isWalkIn:!1}],o=e[0].apptDate,m={...u},d=e=>{switch(e.toLowerCase()){case"compact":return"SmallCar";case"medium":return"MediumCar";case"full-size":return"BigCar";case"class 1 truck":return"Truck1";case"class 2 truck":return"Truck2";default:return"UnknownCategory"}},h=e=>{switch(e){case"SmallCar":return r;case"MediumCar":return t;case"BigCar":return n;case"Truck1":return s;case"Truck2":return l;default:return{}}},p=(e,r)=>{let{category:t}=e,n=d(t),s=r?"revenueNum".concat(n):"lossNum".concat(n),{servicingTime:l,charge:a}=h(n);i[r?"revenue":"loss"]+=a,i[s]++},v=(e,r)=>{let{category:t}=e,n=d(t),s=r?"revenueNum".concat(n):"lossNum".concat(n),{servicingTime:l,charge:a}=h(n);m[r?"revenue":"loss"]+=a,m[s]++},N=(e,r)=>e.getTime()===r.getTime(),g=e=>{let{category:r}=e,t=c.filter(e=>!e.isFree&&e.isWalkIn&&e.type===r).length,n=c.filter(e=>e.isFree).length;return 0===t&&n>=1||t>0&&n-t>=1},T=e=>c.filter(e=>e.isFree).length+c.filter(r=>!r.isFree&&r.isWalkIn&&r.type===e).length>5,k=(e,r,t)=>{let{category:n}=e,s=c.find(e=>e.isFree&&(!t||!e.isWalkIn));s&&(r?(s.isFree=!1,s.type=n,s.timeWhenFree=new Date(e.apptDate.getTime()+6e4*h(d(n)).servicingTime),s.isWalkIn=t):(s.isFree=!0,s.type=null,s.timeWhenFree=null,s.isWalkIn=!1))},f=e=>{c.forEach(r=>{!r.isFree&&r.timeWhenFree&&e>=r.timeWhenFree&&(r.isFree=!0,r.type=null,r.timeWhenFree=null,r.isWalkIn=!1)})};return e.forEach(e=>{let{callDate:r,apptDate:t,category:n}=e;t.getDate()!==o.getDate()&&(m.date=o.toISOString().split("T")[0],a.push({...m}),m={...u},c.forEach(e=>{e.isFree=!0,e.type=null,e.timeWhenFree=null,e.isWalkIn=!1})),f(o=t),N(r,t)?g(e)?(k(e,!0,!0),v(e,!0),p(e,!0)):(v(e,!1),p(e,!1)):T(e)?(k(e,!0,!1),v(e,!0),p(e,!0)):(v(e,!1),p(e,!1))}),m.date=o.toISOString().split("T")[0],a.push({...m}),console.log(i),{TOTALREPORT:i,DAYREPORTARRAY:a}}},1585:function(e,r,t){"use strict";t.d(r,{w:function(){return s}});var n=t(9411);let s=async(e,r)=>{let t=[];try{let s=await (0,n.F)();r.setDate(r.getDate()+1),e.setDate(e.getDate()-1),s.forEach(n=>{let s=n.apptDate;s>=e&&s<r&&t.push(n)})}catch(e){console.error("Error fetching or parsing CSV file:",e)}return t}},2413:function(){},7015:function(){}},function(e){e.O(0,[491,559,971,69,744],function(){return e(e.s=6981)}),_N_E=e.O()}]);