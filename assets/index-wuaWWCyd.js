import{d as A,I as D,h as d,n as g,o as $,M as y,p as u,q as z,c as a,K as l,P as S,t as j,C as x,F as k,y as E,x as K,Q as O}from"./index-CorvJS88.js";import{F as Q}from"./file.service-BzdYX6aG.js";import{a as G,S as H}from"./index-DbMgr4Ic.js";import{_ as J,F as R}from"./index-BoY7cWxL.js";import{T as W}from"./index-aD2pe-_V.js";import{P as X}from"./Paragraph-D8tPocoY.js";import{_ as Y,a as Z,L as tt,b as et}from"./index-Bev_jMqz.js";import{_ as at}from"./Search-BAR6-Shv.js";import"./request-DbUJaofx.js";import"./index-DrHQ6tjo.js";import"./index-CMYvEKCm.js";import"./Base-C89d3xn4.js";import"./SearchOutlined-BRAEeoNf.js";import"./Col-BpkG6ykq.js";import"./RightOutlined-Cu8YZTQd.js";const nt=["href"],zt=A({__name:"index",setup(ot){const f=D(),_=d(!0),F=Q.getInstance(),i=g([]),r=d(""),c=d(),P=g(f.tags.map(t=>({value:t._id,label:t.name}))),e=g({current:1,size:10,total:0,pages:1});$(p);async function p(t={}){var n;_.value=!0,console.log(t),(!t.title||((n=t.title)==null?void 0:n.length)===0)&&delete t.title,i.splice(0,i.length),i.push(...Array(e.size).fill({})),F.findFiles(t,{current:e.current,size:e.size}).then(o=>{o.success&&o.data?(i.splice(0,i.length),i.push(...o.data.files||[]),e.total=o.data.pagination.total,e.current=o.data.pagination.current,e.size=o.data.pagination.size,e.pages=o.data.pagination.pages):y.error(o.error)}).catch(o=>y.error(o.message)).finally(()=>{_.value=!1})}function w(){e.current=1;let t={};c.value&&c.value.length>0&&(t.tags=[c.value+""]),r.value.length>0&&(t.title=r.value),p(t)}function T(t){e.current=t,p({title:r.value})}const B=t=>{for(let n of f.tags)if(t==n._id)return n.name};return(t,n)=>{const o=G,v=J,C=at,m=O,L=R,N=W,V=X,b=Y,I=H,M=Z,U=tt,q=et;return u(),z(k,null,[a(L,null,{default:l(()=>[a(m,{gap:"10"},{default:l(()=>[a(v,null,{default:l(()=>[a(o,{value:c.value,"onUpdate:value":n[0]||(n[0]=s=>c.value=s),mode:"tags",style:{"min-width":"150px"},placeholder:"仓库标签",options:P},null,8,["value","options"])]),_:1}),a(v,null,{default:l(()=>[a(C,{value:r.value,"onUpdate:value":n[1]||(n[1]=s=>r.value=s),valueModifiers:{trim:!0},placeholder:"请输入搜索文本",onSearch:w},null,8,["value"])]),_:1})]),_:1})]),_:1}),a(U,{"item-layout":"vertical",size:"large","data-source":i},{renderItem:l(({item:s})=>[(u(),S(M,{key:s.title,class:"content-item"},{default:l(()=>[a(I,{loading:_.value,active:""},{default:l(()=>[a(b,null,{title:l(()=>[a(m,{justify:"space-between",gap:"10",class:"title-container"},{default:l(()=>[j("a",{href:`#/repository-detail?_id=${s._id}`},x(s.title),9,nt),a(m,{gap:20},{default:l(()=>[(u(!0),z(k,null,E(s.tags,h=>(u(),S(N,{color:"cyan",key:h},{default:l(()=>[K(x(B(h)),1)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024)]),description:l(()=>[a(V,{ellipsis:{rows:3},content:s.description},null,8,["content"])]),_:2},1024)]),_:2},1032,["loading"])]),_:2},1024))]),_:1},8,["data-source"]),a(q,{class:"article-pagination",current:e.current,"onUpdate:current":n[2]||(n[2]=s=>e.current=s),defaultPageSize:e.size,total:e.total,"show-less-items":"",onChange:T},null,8,["current","defaultPageSize","total"])],64)}}});export{zt as default};
