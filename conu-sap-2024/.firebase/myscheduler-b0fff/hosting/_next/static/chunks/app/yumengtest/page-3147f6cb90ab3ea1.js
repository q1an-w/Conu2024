(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[109],{7872:function(e,t,a){Promise.resolve().then(a.bind(a,7718))},9411:function(e,t,a){"use strict";a.d(t,{F:function(){return c}});var n=a(6491),r=a.n(n);let c=async()=>{let e=await fetch("../database/datafile.csv"),t=await e.text(),a=new Blob([t],{type:"text/csv"}),n=new File([a],"sample.csv",{type:"text/csv"});return new Promise((e,t)=>{let a=new FileReader;a.onload=async a=>{let n=a.target.result;r().parse(n,{header:!1,dynamicTyping:!0,complete:t=>{let a=t.data.map(e=>({callDate:l(e[0]),apptDate:l(e[1]),category:e[2]}));a.sort((e,t)=>{let a=e.apptDate-t.apptDate;return 0!==a?a:e.callDate-t.callDate}),e(a)},error:e=>{t(e.message)}})},a.readAsText(n)})},l=e=>{if(!e)return null;let[t,a]=e.split(" "),[n,r,c]=t.split("-"),[l,s]=a.split(":");return new Date(n,r-1,c,l,s)}},1585:function(e,t,a){"use strict";a.d(t,{w:function(){return r}});var n=a(9411);let r=async(e,t)=>{let a=[];try{let r=await (0,n.F)();t.setDate(t.getDate()+1),e.setDate(e.getDate()-1),r.forEach(n=>{let r=n.apptDate;r>=e&&r<t&&a.push(n)})}catch(e){console.error("Error fetching or parsing CSV file:",e)}return a}},7718:function(e,t,a){"use strict";a.r(t);var n=a(3827),r=a(1585),c=a(4090);let l=new Date("Wed Oct 05 2022 14:22:00 GMT-0400 (Eastern Daylight Time)"),s=new Date("Thu Oct 06 2022 09:30:00 GMT-0400 (Eastern Daylight Time)");t.default=()=>{let[e,t]=(0,c.useState)([]),a=async()=>{try{let e=await (0,r.w)(l,s);console.log(e),t(e)}catch(e){console.error("Error truncating data:",e)}};return(0,c.useEffect)(()=>{},[]),(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{children:"Date-truncated CSV Data"}),(0,n.jsx)("button",{onClick:a,children:"Load Truncated CSV Data"}),(0,n.jsx)("ul",{children:e.map((e,t)=>(0,n.jsx)("li",{children:"Requested Call Date/Time: ".concat(e.callDate,", Requested Appointment Date/Time: ").concat(e.apptDate,", Vehicle Type: ").concat(e.category)},t))})]})}}},function(e){e.O(0,[491,971,69,744],function(){return e(e.s=7872)}),_N_E=e.O()}]);