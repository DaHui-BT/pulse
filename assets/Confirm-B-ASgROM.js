import{d as p,r,g as _,aP as t,aT as d,a6 as C,an as g,ak as n,b as x,a9 as R,ao as c,aR as v,aS as y,am as h,ah as k}from"./index-C65JRPnL.js";import{U}from"./UserService-bRrJcCXg.js";import{R as B}from"./index-DAl2Yy7N.js";import"./request-CV5hgAz3.js";const S=p({__name:"Confirm",setup(T){const u=v(),i=y(),l=U.getInstance();let s=r("Waiting for confirm ..."),o=r("info");return _(()=>{l.confirmUser(u.query.token+"").then(e=>{e.success?(s.value="Confirm successfully, will jump to login page...",o.value="success",t.success("Confirm email successfully!"),setTimeout(()=>{i.push("/login")},d)):t.error(e.error)}).catch(e=>{t.error(e)})}),(e,a)=>{const m=h,f=B;return C(),g(f,{class:"confirm-result",title:c(s),status:c(o)},{extra:n(()=>[x(m,{type:"primary"},{default:n(()=>a[0]||(a[0]=[R("Resend Confirm")])),_:1})]),_:1},8,["title","status"])}}}),N=k(S,[["__scopeId","data-v-252e4caa"]]);export{N as default};
