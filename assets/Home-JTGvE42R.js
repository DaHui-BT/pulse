import{d as b,r as _,a as x,o as i,c as n,b as s,w as a,e as t,t as r,f as l,F as p,g as h,B as y,_ as k,h as v}from"./index-N6LQE3m8.js";const B={class:"home"},w={class:"home-hero-title"},A={class:"home-hero-sub_title"},C={class:"home-feature"},S={class:"home-feature-article-item-title"},F={class:"home-feature-article-item-content"},V={class:"home-footer"},M={class:"home-footer-about"},j=b({__name:"Home",setup(I){const c=_({title:"Welcome to My Blog",sub_title:"A place where thoughts meet simplicity",button_text:"Explore the Blog"}),d=_([{id:1,title:"Understanding Vue 3 Composition API",excerpt:"A deep dive into Vue 3's composition API..."},{id:2,title:"10 Tips for Writing Better CSS",excerpt:"Level up your CSS game with these tips..."},{id:3,title:"The Future of JavaScript",excerpt:"What's next for the most popular programming language?"}]),f=_(["Github","Facebook","Outlook"]);return(N,e)=>{const g=y,u=k,m=x("router-link");return i(),n("div",B,[s(u,{class:"home-hero",justify:"center",align:"center",vertical:""},{default:a(()=>[t("h1",w,r(c.title),1),t("h2",A,r(c.sub_title),1),s(g,{class:"home-hero-button",type:"primary",size:"large"},{default:a(()=>[l(r(c.button_text),1)]),_:1})]),_:1}),t("section",C,[e[1]||(e[1]=t("h2",{class:"home-feature-title"},"Feature Articles",-1)),s(u,{class:"home-feature-aritlce-container",wrap:"wrap",justify:"center",gap:"20"},{default:a(()=>[(i(!0),n(p,null,h(d,o=>(i(),n("div",{class:"home-feature-article-item",key:o.id},[t("h3",S,r(o.title),1),t("p",F,r(o.excerpt),1),s(m,{to:"/article",class:"home-feature-article-item-read_more"},{default:a(()=>e[0]||(e[0]=[l("Read More")])),_:1})]))),128))]),_:1})]),t("section",V,[t("p",M,[e[3]||(e[3]=l("© 2024 My Blog | ")),s(m,{to:"/about"},{default:a(()=>e[2]||(e[2]=[l("About Me")])),_:1})]),s(u,{class:"home-footer-link",justify:"center",gap:"20"},{default:a(()=>[(i(!0),n(p,null,h(f,o=>(i(),n("a",{href:"#",class:"home-footer-link--item",key:o},r(o),1))),128))]),_:1})])])}}}),W=v(j,[["__scopeId","data-v-b0060d61"]]);export{W as default};