(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{3809:function(e,t,a){Promise.resolve().then(a.bind(a,3504))},3504:function(e,t,a){"use strict";a.r(t);var n=a(3827),r=a(4090),s=a(3441),l=a.n(s);a(2413),a(7015),a(1585),a(8792),t.default=function(){var e,t,a,s;let i,o;let c=new Date("2022-10-01T07:30:00-04:00"),d=new Date("2022-11-30T07:30:00-04:00"),[m,u]=(0,r.useState)(c),[p,f]=(0,r.useState)(d),[h,w]=(0,r.useState)({x:0,y:0}),[y,v]=(0,r.useState)(!1),[D,g]=(0,r.useState)(!1);(0,r.useEffect)(()=>{g(!0);{v(!1);let e=e=>{let{clientX:t,clientY:a}=e;w({x:t,y:a})};return window.addEventListener("mousemove",e),()=>{window.removeEventListener("mousemove",e)}}},[]),i=y?{transform:"translate(-175rem, -80rem) rotate(30deg)",transition:"transform 1s ease, opacity 1s ease"}:{transform:"rotate(20deg) translateX(".concat(h.x/((null===(e=window)||void 0===e?void 0:e.innerWidth)||document.documentElement.clientWidth)*3-25,"rem) translateY(").concat(h.y/((null===(t=window)||void 0===t?void 0:t.innerHeight)||document.documentElement.clientHeight)*3-50,"rem)"),opacity:.4},o=D,o={transform:D?"translateX(0)":"translateX(-100%)"},o=y?{transform:"translate(-175rem, -80rem) rotate(30deg)",transition:"transform 1s ease, opacity 1s ease"}:{transform:"rotate(20deg) translateX(".concat(h.x/((null===(a=window)||void 0===a?void 0:a.innerWidth)||document.documentElement.clientWidth)*3-10,"rem) translateY(").concat(h.y/((null===(s=window)||void 0===s?void 0:s.innerHeight)||document.documentElement.clientHeight)*3-15,"rem)"),opacity:.4};let x=e=>{let t=new Date("2022-10-01"),a=new Date("2022-11-30");return e>=t&&e<=a};return(0,n.jsxs)("div",{className:"App",children:[(0,n.jsx)("p",{className:"welcome",children:"welcome"}),(0,n.jsx)("div",{className:"wallpaper",style:i}),(0,n.jsx)("div",{className:"car",style:o}),!y&&(0,n.jsxs)("form",{className:"calendar",onSubmit:e=>{e.preventDefault(),console.log("hi");let t={startDate:m.toISOString().split("T")[0],endDate:p.toISOString().split("T")[0]};v(!0);let a=new URLSearchParams({startDate:t.startDate,endDate:t.endDate});setTimeout(()=>{window.location.href="/report?".concat(a.toString())},1e3)},children:[(0,n.jsx)("p",{children:"Please select a date range:"}),(0,n.jsxs)("div",{className:"date-picker-container",children:[(0,n.jsxs)("div",{className:"date-picker",children:[(0,n.jsx)("label",{className:"date-label",children:"Start Date:"}),(0,n.jsx)(l(),{className:"cal-input",selected:m,onChange:e=>u(e),dateFormat:"MM/dd/yyyy",filterDate:x,style:{fontSize:"1.5rem",outline:"none"}})]}),(0,n.jsxs)("div",{className:"date-picker",children:[(0,n.jsx)("label",{className:"date-label",children:"End Date:"}),(0,n.jsx)(l(),{className:"cal-input",selected:p,onChange:e=>f(e),dateFormat:"MM/dd/yyyy",filterDate:x,style:{fontSize:"1.5rem",outline:"none"}})]})]}),(0,n.jsx)("button",{className:"submit-btn",type:"submit",children:"Generate Report!"})]})]})}},9411:function(e,t,a){"use strict";a.d(t,{F:function(){return s}});var n=a(6491),r=a.n(n);let s=async()=>{let e=await fetch("../database/datafile.csv"),t=await e.text(),a=new Blob([t],{type:"text/csv"}),n=new File([a],"sample.csv",{type:"text/csv"});return new Promise((e,t)=>{let a=new FileReader;a.onload=async a=>{let n=a.target.result;r().parse(n,{header:!1,dynamicTyping:!0,complete:t=>{let a=t.data.map(e=>({callDate:l(e[0]),apptDate:l(e[1]),category:e[2]}));a.sort((e,t)=>{let a=e.apptDate-t.apptDate;return 0!==a?a:e.callDate-t.callDate}),e(a)},error:e=>{t(e.message)}})},a.readAsText(n)})},l=e=>{if(!e)return null;let[t,a]=e.split(" "),[n,r,s]=t.split("-"),[l,i]=a.split(":");return new Date(n,r-1,s,l,i)}},1585:function(e,t,a){"use strict";a.d(t,{w:function(){return r}});var n=a(9411);let r=async(e,t)=>{let a=[];try{let r=await (0,n.F)();t.setDate(t.getDate()+1),r.forEach(n=>{let r=n.apptDate;r>=e&&r<t&&a.push(n)})}catch(e){console.error("Error fetching or parsing CSV file:",e)}return a}},7015:function(){}},function(e){e.O(0,[778,491,559,168,971,69,744],function(){return e(e.s=3809)}),_N_E=e.O()}]);