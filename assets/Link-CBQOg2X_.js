import{j as p,Q as q,_ as f,cp as Ue,br as Ve,t as Xe,g as ie,c4 as Ke,ah as Oe,H as ne,r as oe,I as we,ae as Ee,as as qe,l as F,O as G,cq as Je,cr as Qe,w as Te,h as K,R as Ge,av as Y,J as fe,a0 as Ye,a_ as ge,cg as Z,L as $e,F as me,c7 as Ze,aF as et,q as ee,b1 as tt}from"./index-YXsaEbfY.js";import{o as _e,u as nt,T as ye}from"./transButton-15gD8E64.js";import{i as Pe}from"./index-BFSLzwoB.js";var ot={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"}}]},name:"check",theme:"outlined"};function be(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?Object(arguments[t]):{},o=Object.keys(n);typeof Object.getOwnPropertySymbols=="function"&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(i){return Object.getOwnPropertyDescriptor(n,i).enumerable}))),o.forEach(function(i){it(e,i,n[i])})}return e}function it(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var re=function(t,n){var o=be({},t,n.attrs);return p(q,be({},o,{icon:ot}),null)};re.displayName="CheckOutlined";re.inheritAttrs=!1;var rt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 000 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"}}]},name:"enter",theme:"outlined"};function he(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?Object(arguments[t]):{},o=Object.keys(n);typeof Object.getOwnPropertySymbols=="function"&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(i){return Object.getOwnPropertyDescriptor(n,i).enumerable}))),o.forEach(function(i){lt(e,i,n[i])})}return e}function lt(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var le=function(t,n){var o=he({},t,n.attrs);return p(q,he({},o,{icon:rt}),null)};le.displayName="EnterOutlined";le.inheritAttrs=!1;const at=(e,t,n,o)=>{const{sizeMarginHeadingVerticalEnd:i,fontWeightStrong:s}=o;return{marginBottom:i,color:n,fontWeight:s,fontSize:e,lineHeight:t}},ct=e=>{const t=[1,2,3,4,5],n={};return t.forEach(o=>{n[`
      h${o}&,
      div&-h${o},
      div&-h${o} > textarea,
      h${o}
    `]=at(e[`fontSizeHeading${o}`],e[`lineHeightHeading${o}`],e.colorTextHeading,e)}),n},st=e=>{const{componentCls:t}=e;return{"a&, a":f(f({},_e(e)),{textDecoration:e.linkDecoration,"&:active, &:hover":{textDecoration:e.linkHoverDecoration},[`&[disabled], &${t}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed","&:active, &:hover":{color:e.colorTextDisabled},"&:active":{pointerEvents:"none"}}})}},dt=()=>({code:{margin:"0 0.2em",paddingInline:"0.4em",paddingBlock:"0.2em 0.1em",fontSize:"85%",background:"rgba(150, 150, 150, 0.1)",border:"1px solid rgba(100, 100, 100, 0.2)",borderRadius:3},kbd:{margin:"0 0.2em",paddingInline:"0.4em",paddingBlock:"0.15em 0.1em",fontSize:"90%",background:"rgba(150, 150, 150, 0.06)",border:"1px solid rgba(100, 100, 100, 0.2)",borderBottomWidth:2,borderRadius:3},mark:{padding:0,backgroundColor:Ue[2]},"u, ins":{textDecoration:"underline",textDecorationSkipInk:"auto"},"s, del":{textDecoration:"line-through"},strong:{fontWeight:600},"ul, ol":{marginInline:0,marginBlock:"0 1em",padding:0,li:{marginInline:"20px 0",marginBlock:0,paddingInline:"4px 0",paddingBlock:0}},ul:{listStyleType:"circle",ul:{listStyleType:"disc"}},ol:{listStyleType:"decimal"},"pre, blockquote":{margin:"1em 0"},pre:{padding:"0.4em 0.6em",whiteSpace:"pre-wrap",wordWrap:"break-word",background:"rgba(150, 150, 150, 0.1)",border:"1px solid rgba(100, 100, 100, 0.2)",borderRadius:3,code:{display:"inline",margin:0,padding:0,fontSize:"inherit",fontFamily:"inherit",background:"transparent",border:0}},blockquote:{paddingInline:"0.6em 0",paddingBlock:0,borderInlineStart:"4px solid rgba(100, 100, 100, 0.2)",opacity:.85}}),ut=e=>{const{componentCls:t}=e,o=Ve(e).inputPaddingVertical+1;return{"&-edit-content":{position:"relative","div&":{insetInlineStart:-e.paddingSM,marginTop:-o,marginBottom:`calc(1em - ${o}px)`},[`${t}-edit-content-confirm`]:{position:"absolute",insetInlineEnd:e.marginXS+2,insetBlockEnd:e.marginXS,color:e.colorTextDescription,fontWeight:"normal",fontSize:e.fontSize,fontStyle:"normal",pointerEvents:"none"},textarea:{margin:"0!important",MozTransition:"none",height:"1em"}}}},pt=e=>({"&-copy-success":{"\n    &,\n    &:hover,\n    &:focus":{color:e.colorSuccess}}}),ft=()=>({"\n  a&-ellipsis,\n  span&-ellipsis\n  ":{display:"inline-block",maxWidth:"100%"},"&-single-line":{whiteSpace:"nowrap"},"&-ellipsis-single-line":{overflow:"hidden",textOverflow:"ellipsis","a&, span&":{verticalAlign:"bottom"}},"&-ellipsis-multiple-line":{display:"-webkit-box",overflow:"hidden",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}),gt=e=>{const{componentCls:t,sizeMarginHeadingVerticalStart:n}=e;return{[t]:f(f(f(f(f(f(f(f(f({color:e.colorText,wordBreak:"break-word",lineHeight:e.lineHeight,[`&${t}-secondary`]:{color:e.colorTextDescription},[`&${t}-success`]:{color:e.colorSuccess},[`&${t}-warning`]:{color:e.colorWarning},[`&${t}-danger`]:{color:e.colorError,"a&:active, a&:focus":{color:e.colorErrorActive},"a&:hover":{color:e.colorErrorHover}},[`&${t}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed",userSelect:"none"},"\n        div&,\n        p\n      ":{marginBottom:"1em"}},ct(e)),{[`
      & + h1${t},
      & + h2${t},
      & + h3${t},
      & + h4${t},
      & + h5${t}
      `]:{marginTop:n},"\n      div,\n      ul,\n      li,\n      p,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5":{"\n        + h1,\n        + h2,\n        + h3,\n        + h4,\n        + h5\n        ":{marginTop:n}}}),dt()),st(e)),{[`
        ${t}-expand,
        ${t}-edit,
        ${t}-copy
      `]:f(f({},_e(e)),{marginInlineStart:e.marginXXS})}),ut(e)),pt(e)),ft()),{"&-rtl":{direction:"rtl"}})}},De=Xe("Typography",e=>[gt(e)],{sizeMarginHeadingVerticalStart:"1.2em",sizeMarginHeadingVerticalEnd:"0.5em"}),mt=()=>({prefixCls:String,value:String,maxlength:Number,autoSize:{type:[Boolean,Object]},onSave:Function,onCancel:Function,onEnd:Function,onChange:Function,originContent:String,direction:String,component:String}),yt=ie({compatConfig:{MODE:3},name:"Editable",inheritAttrs:!1,props:mt(),setup(e,t){let{emit:n,slots:o,attrs:i}=t;const{prefixCls:s}=Ke(e),c=Oe({current:e.value||"",lastKeyCode:void 0,inComposition:!1,cancelFlag:!1});ne(()=>e.value,g=>{c.current=g});const l=oe();we(()=>{var g;if(l.value){const d=(g=l.value)===null||g===void 0?void 0:g.resizableTextArea,h=d==null?void 0:d.textArea;h.focus();const{length:b}=h.value;h.setSelectionRange(b,b)}});function y(g){l.value=g}function x(g){let{target:{value:d}}=g;c.current=d.replace(/[\r\n]/g,""),n("change",c.current)}function m(){c.inComposition=!0}function T(){c.inComposition=!1}function D(g){const{keyCode:d}=g;d===G.ENTER&&g.preventDefault(),!c.inComposition&&(c.lastKeyCode=d)}function E(g){const{keyCode:d,ctrlKey:h,altKey:b,metaKey:O,shiftKey:H}=g;c.lastKeyCode===d&&!c.inComposition&&!h&&!b&&!O&&!H&&(d===G.ENTER?($(),n("end")):d===G.ESC&&(c.current=e.originContent,n("cancel")))}function I(){$()}function $(){n("save",c.current.trim())}const[M,B]=De(s);return()=>{const g=Ee({[`${s.value}`]:!0,[`${s.value}-edit-content`]:!0,[`${s.value}-rtl`]:e.direction==="rtl",[e.component?`${s.value}-${e.component}`:""]:!0},i.class,B.value);return M(p("div",F(F({},i),{},{class:g}),[p(qe,{ref:y,maxlength:e.maxlength,value:c.current,onChange:x,onKeydown:D,onKeyup:E,onCompositionstart:m,onCompositionend:T,onBlur:I,rows:1,autoSize:e.autoSize===void 0||e.autoSize},null),o.enterIcon?o.enterIcon({className:`${e.prefixCls}-edit-content-confirm`}):p(le,{class:`${e.prefixCls}-edit-content-confirm`},null)]))}}}),bt=3,ht=8;let S;const te={padding:0,margin:0,display:"inline",lineHeight:"inherit"};function Ie(e,t){e.setAttribute("aria-hidden","true");const n=window.getComputedStyle(t),o=Qe(n);e.setAttribute("style",o),e.style.position="fixed",e.style.left="0",e.style.height="auto",e.style.minHeight="auto",e.style.maxHeight="auto",e.style.paddingTop="0",e.style.paddingBottom="0",e.style.borderTopWidth="0",e.style.borderBottomWidth="0",e.style.top="-999999px",e.style.zIndex="-1000",e.style.textOverflow="clip",e.style.whiteSpace="normal",e.style.webkitLineClamp="none"}function vt(e){const t=document.createElement("div");Ie(t,e),t.appendChild(document.createTextNode("text")),document.body.appendChild(t);const n=t.getBoundingClientRect().height;return document.body.removeChild(t),n}const Ct=(e,t,n,o,i)=>{S||(S=document.createElement("div"),S.setAttribute("aria-hidden","true"),document.body.appendChild(S));const{rows:s,suffix:c=""}=t,l=vt(e),y=Math.round(l*s*100)/100;Ie(S,e);const x=Je({render(){return p("div",{style:te},[p("span",{style:te},[n,c]),p("span",{style:te},[o])])}});x.mount(S);function m(){return Math.round(S.getBoundingClientRect().height*100)/100-.1<=y}if(m())return x.unmount(),{content:n,text:S.innerHTML,ellipsis:!1};const T=Array.prototype.slice.apply(S.childNodes[0].childNodes[0].cloneNode(!0).childNodes).filter(d=>{let{nodeType:h,data:b}=d;return h!==ht&&b!==""}),D=Array.prototype.slice.apply(S.childNodes[0].childNodes[1].cloneNode(!0).childNodes);x.unmount();const E=[];S.innerHTML="";const I=document.createElement("span");S.appendChild(I);const $=document.createTextNode(i+c);I.appendChild($),D.forEach(d=>{S.appendChild(d)});function M(d){I.insertBefore(d,$)}function B(d,h){let b=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,O=arguments.length>3&&arguments[3]!==void 0?arguments[3]:h.length,H=arguments.length>4&&arguments[4]!==void 0?arguments[4]:0;const N=Math.floor((b+O)/2),J=h.slice(0,N);if(d.textContent=J,b>=O-1)for(let k=O;k>=b;k-=1){const L=h.slice(0,k);if(d.textContent=L,m()||!L)return k===h.length?{finished:!1,vNode:h}:{finished:!0,vNode:L}}return m()?B(d,h,N,O,N):B(d,h,b,N,H)}function g(d){if(d.nodeType===bt){const b=d.textContent||"",O=document.createTextNode(b);return M(O),B(O,b)}return{finished:!1,vNode:null}}return T.some(d=>{const{finished:h,vNode:b}=g(d);return b&&E.push(b),h}),{content:E,text:S.innerHTML,ellipsis:!0}};var xt=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]]);return n};const St=()=>({prefixCls:String,direction:String,component:String}),Ot=ie({name:"ATypography",inheritAttrs:!1,props:St(),setup(e,t){let{slots:n,attrs:o}=t;const{prefixCls:i,direction:s}=Te("typography",e),[c,l]=De(i);return()=>{var y;const x=f(f({},e),o),{prefixCls:m,direction:T,component:D="article"}=x,E=xt(x,["prefixCls","direction","component"]);return c(p(D,F(F({},E),{},{class:Ee(i.value,{[`${i.value}-rtl`]:s.value==="rtl"},o.class,l.value)}),{default:()=>[(y=n.default)===null||y===void 0?void 0:y.call(n)]}))}}}),wt=()=>{const e=document.getSelection();if(!e.rangeCount)return function(){};let t=document.activeElement;const n=[];for(let o=0;o<e.rangeCount;o++)n.push(e.getRangeAt(o));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||n.forEach(function(o){e.addRange(o)}),t&&t.focus()}},ve={"text/plain":"Text","text/html":"Url",default:"Text"},Et="Copy to clipboard: #{key}, Enter";function Tt(e){const t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}function $t(e,t){let n,o,i,s,c,l=!1;t||(t={});const y=t.debug||!1;try{if(o=wt(),i=document.createRange(),s=document.getSelection(),c=document.createElement("span"),c.textContent=e,c.style.all="unset",c.style.position="fixed",c.style.top=0,c.style.clip="rect(0, 0, 0, 0)",c.style.whiteSpace="pre",c.style.webkitUserSelect="text",c.style.MozUserSelect="text",c.style.msUserSelect="text",c.style.userSelect="text",c.addEventListener("copy",function(m){if(m.stopPropagation(),t.format)if(m.preventDefault(),typeof m.clipboardData>"u"){y&&console.warn("unable to use e.clipboardData"),y&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();const T=ve[t.format]||ve.default;window.clipboardData.setData(T,e)}else m.clipboardData.clearData(),m.clipboardData.setData(t.format,e);t.onCopy&&(m.preventDefault(),t.onCopy(m.clipboardData))}),document.body.appendChild(c),i.selectNodeContents(c),s.addRange(i),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");l=!0}catch(x){y&&console.error("unable to copy using execCommand: ",x),y&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),l=!0}catch(m){y&&console.error("unable to copy using clipboardData: ",m),y&&console.error("falling back to prompt"),n=Tt("message"in t?t.message:Et),window.prompt(n,e)}}finally{s&&(typeof s.removeRange=="function"?s.removeRange(i):s.removeAllRanges()),c&&document.body.removeChild(c),o()}return l}var _t={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"}}]},name:"copy",theme:"outlined"};function Ce(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?Object(arguments[t]):{},o=Object.keys(n);typeof Object.getOwnPropertySymbols=="function"&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(i){return Object.getOwnPropertyDescriptor(n,i).enumerable}))),o.forEach(function(i){Pt(e,i,n[i])})}return e}function Pt(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ae=function(t,n){var o=Ce({},t,n.attrs);return p(q,Ce({},o,{icon:_t}),null)};ae.displayName="CopyOutlined";ae.inheritAttrs=!1;var Dt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"};function xe(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?Object(arguments[t]):{},o=Object.keys(n);typeof Object.getOwnPropertySymbols=="function"&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(i){return Object.getOwnPropertyDescriptor(n,i).enumerable}))),o.forEach(function(i){It(e,i,n[i])})}return e}function It(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ce=function(t,n){var o=xe({},t,n.attrs);return p(q,xe({},o,{icon:Dt}),null)};ce.displayName="EditOutlined";ce.inheritAttrs=!1;var Bt=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]]);return n};const Nt=Pe("webkitLineClamp"),jt=Pe("textOverflow"),Se="...",Be=()=>({editable:{type:[Boolean,Object],default:void 0},copyable:{type:[Boolean,Object],default:void 0},prefixCls:String,component:String,type:String,disabled:{type:Boolean,default:void 0},ellipsis:{type:[Boolean,Object],default:void 0},code:{type:Boolean,default:void 0},mark:{type:Boolean,default:void 0},underline:{type:Boolean,default:void 0},delete:{type:Boolean,default:void 0},strong:{type:Boolean,default:void 0},keyboard:{type:Boolean,default:void 0},content:String,"onUpdate:content":Function}),Ht=ie({compatConfig:{MODE:3},name:"TypographyBase",inheritAttrs:!1,props:Be(),setup(e,t){let{slots:n,attrs:o,emit:i}=t;const{prefixCls:s,direction:c}=Te("typography",e),l=Oe({copied:!1,ellipsisText:"",ellipsisContent:null,isEllipsis:!1,expanded:!1,clientRendered:!1,expandStr:"",copyStr:"",copiedStr:"",editStr:"",copyId:void 0,rafId:void 0,prevProps:void 0,originContent:""}),y=oe(),x=oe(),m=K(()=>{const r=e.ellipsis;return r?f({rows:1,expandable:!1},typeof r=="object"?r:null):{}});we(()=>{l.clientRendered=!0,N()}),Ge(()=>{clearTimeout(l.copyId),Y.cancel(l.rafId)}),ne([()=>m.value.rows,()=>e.content],()=>{fe(()=>{O()})},{flush:"post",deep:!0}),Ye(()=>{e.content===void 0&&(ge(!e.editable),ge(!e.ellipsis))});function T(){var r;return e.ellipsis||e.editable?e.content:(r=Z(y.value))===null||r===void 0?void 0:r.innerText}function D(r){const{onExpand:a}=m.value;l.expanded=!0,a==null||a(r)}function E(r){r.preventDefault(),l.originContent=e.content,b(!0)}function I(r){$(r),b(!1)}function $(r){const{onChange:a}=g.value;r!==e.content&&(i("update:content",r),a==null||a(r))}function M(){var r,a;(a=(r=g.value).onCancel)===null||a===void 0||a.call(r),b(!1)}function B(r){r.preventDefault(),r.stopPropagation();const{copyable:a}=e,u=f({},typeof a=="object"?a:null);u.text===void 0&&(u.text=T()),$t(u.text||""),l.copied=!0,fe(()=>{u.onCopy&&u.onCopy(r),l.copyId=setTimeout(()=>{l.copied=!1},3e3)})}const g=K(()=>{const r=e.editable;return r?f({},typeof r=="object"?r:null):{editing:!1}}),[d,h]=nt(!1,{value:K(()=>g.value.editing)});function b(r){const{onStart:a}=g.value;r&&a&&a(),h(r)}ne(d,r=>{var a;r||(a=x.value)===null||a===void 0||a.focus()},{flush:"post"});function O(r){if(r){const{width:a,height:u}=r;if(!a||!u)return}Y.cancel(l.rafId),l.rafId=Y(()=>{N()})}const H=K(()=>{const{rows:r,expandable:a,suffix:u,onEllipsis:v,tooltip:C}=m.value;return u||C||e.editable||e.copyable||a||v?!1:r===1?jt:Nt}),N=()=>{const{ellipsisText:r,isEllipsis:a}=l,{rows:u,suffix:v,onEllipsis:C}=m.value;if(!u||u<0||!Z(y.value)||l.expanded||e.content===void 0||H.value)return;const{content:_,text:R,ellipsis:j}=Ct(Z(y.value),{rows:u,suffix:v},e.content,de(!0),Se);(r!==R||l.isEllipsis!==j)&&(l.ellipsisText=R,l.ellipsisContent=_,l.isEllipsis=j,a!==j&&C&&C(j))};function J(r,a){let{mark:u,code:v,underline:C,delete:_,strong:R,keyboard:j}=r,W=a;function P(U,w){if(!U)return;const V=function(){return W}();W=p(w,null,{default:()=>[V]})}return P(R,"strong"),P(C,"u"),P(_,"del"),P(v,"code"),P(u,"mark"),P(j,"kbd"),W}function k(r){const{expandable:a,symbol:u}=m.value;if(!a||!r&&(l.expanded||!l.isEllipsis))return null;const v=(n.ellipsisSymbol?n.ellipsisSymbol():u)||l.expandStr;return p("a",{key:"expand",class:`${s.value}-expand`,onClick:D,"aria-label":l.expandStr},[v])}function L(){if(!e.editable)return;const{tooltip:r,triggerType:a=["icon"]}=e.editable,u=n.editableIcon?n.editableIcon():p(ce,{role:"button"},null),v=n.editableTooltip?n.editableTooltip():l.editStr,C=typeof v=="string"?v:"";return a.indexOf("icon")!==-1?p(ee,{key:"edit",title:r===!1?"":v},{default:()=>[p(ye,{ref:x,class:`${s.value}-edit`,onClick:E,"aria-label":C},{default:()=>[u]})]}):null}function Ne(){if(!e.copyable)return;const{tooltip:r}=e.copyable,a=l.copied?l.copiedStr:l.copyStr,u=n.copyableTooltip?n.copyableTooltip({copied:l.copied}):a,v=typeof u=="string"?u:"",C=l.copied?p(re,null,null):p(ae,null,null),_=n.copyableIcon?n.copyableIcon({copied:!!l.copied}):C;return p(ee,{key:"copy",title:r===!1?"":u},{default:()=>[p(ye,{class:[`${s.value}-copy`,{[`${s.value}-copy-success`]:l.copied}],onClick:B,"aria-label":v},{default:()=>[_]})]})}function je(){const{class:r,style:a}=o,{maxlength:u,autoSize:v,onEnd:C}=g.value;return p(yt,{class:r,style:a,prefixCls:s.value,value:e.content,originContent:l.originContent,maxlength:u,autoSize:v,onSave:I,onChange:$,onCancel:M,onEnd:C,direction:c.value,component:e.component},{enterIcon:n.editableEnterIcon})}function de(r){return[k(r),L(),Ne()].filter(a=>a)}return()=>{var r;const{triggerType:a=["icon"]}=g.value,u=e.ellipsis||e.editable?e.content!==void 0?e.content:(r=n.default)===null||r===void 0?void 0:r.call(n):n.default?n.default():e.content;return d.value?je():p(tt,{componentName:"Text",children:v=>{const C=f(f({},e),o),{type:_,disabled:R,content:j,class:W,style:P}=C,U=Bt(C,["type","disabled","content","class","style"]),{rows:w,suffix:V,tooltip:Q}=m.value,{edit:He,copy:ke,copied:Re,expand:ze}=v;l.editStr=He,l.copyStr=ke,l.copiedStr=Re,l.expandStr=ze;const Ae=$e(U,["prefixCls","editable","copyable","ellipsis","mark","code","delete","underline","strong","keyboard","onUpdate:content"]),X=H.value,Me=w===1&&X,ue=w&&w>1&&X;let z=u,Le;if(w&&l.isEllipsis&&!l.expanded&&!X){const{title:pe}=U;let A=pe||"";!pe&&(typeof u=="string"||typeof u=="number")&&(A=String(u)),A=A==null?void 0:A.slice(String(l.ellipsisContent||"").length),z=p(me,null,[Ze(l.ellipsisContent),p("span",{title:A,"aria-hidden":"true"},[Se]),V])}else z=p(me,null,[u,V]);z=J(e,z);const We=Q&&w&&l.isEllipsis&&!l.expanded&&!X,Fe=n.ellipsisTooltip?n.ellipsisTooltip():Q;return p(et,{onResize:O,disabled:!w},{default:()=>[p(Ot,F({ref:y,class:[{[`${s.value}-${_}`]:_,[`${s.value}-disabled`]:R,[`${s.value}-ellipsis`]:w,[`${s.value}-single-line`]:w===1&&!l.isEllipsis,[`${s.value}-ellipsis-single-line`]:Me,[`${s.value}-ellipsis-multiple-line`]:ue},W],style:f(f({},P),{WebkitLineClamp:ue?w:void 0}),"aria-label":Le,direction:c.value,onClick:a.indexOf("text")!==-1?E:()=>{}},Ae),{default:()=>[We?p(ee,{title:Q===!0?u:Fe},{default:()=>[p("span",null,[z])]}):z,de()]})]})}},null)}}});var kt=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]]);return n};const Rt=()=>$e(f(f({},Be()),{ellipsis:{type:Boolean,default:void 0}}),["component"]),se=(e,t)=>{let{slots:n,attrs:o}=t;const i=f(f({},e),o),{ellipsis:s,rel:c}=i,l=kt(i,["ellipsis","rel"]),y=f(f({},l),{rel:c===void 0&&l.target==="_blank"?"noopener noreferrer":c,ellipsis:!!s,component:"a"});return delete y.navigate,p(Ht,y,n)};se.displayName="ATypographyLink";se.inheritAttrs=!1;se.props=Rt();export{Ht as B,re as C,se as L,Ot as T,Be as b};
