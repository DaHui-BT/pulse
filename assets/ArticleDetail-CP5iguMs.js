var Ye=Object.defineProperty;var Je=(e,n,t)=>n in e?Ye(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var ce=(e,n,t)=>Je(e,typeof n!="symbol"?n+"":n,t);import{d as Z,J as re,$ as le,b as o,z as H,a1 as Y,p as de,aY as Ze,aZ as Ke,G as pe,H as Ce,y as P,I as Ee,P as Qe,aq as fe,a_ as je,a$ as et,aC as tt,O as Se,a3 as ke,ak as Ie,a6 as nt,x as ie,ap as Fe,aI as at,aR as Q,ah as rt,b0 as ot,b1 as lt,D as st,b2 as it,A as D,am as ct,an as ut,Y as dt,b3 as mt,b4 as pt,b5 as ft,n as ee,s as vt,ao as gt,b6 as bt,b7 as Re,B as Xe,a2 as ht,a as ne,o as L,aS as G,w as T,e as V,t as J,b8 as _t,c as se,F as be,g as he,b9 as yt,E as Ct,ar as St,r as ge,U as xt,as as N,ba as $t,f as ue,bb as De,aT as He,at as Tt,bc as Bt,_ as wt,av as Ot,aW as Pt,h as At}from"./index-DSrgw8bu.js";import{A as It,T as Rt}from"./ArticleService-CdD-cZG4.js";import{U as Dt,_ as Ht}from"./UserService-1fW45TQ6.js";import{u as zt,A as xe,S as Nt,P as Lt,a as Mt,I as Et,C as oe,O as te}from"./interaction-BA60TI_r.js";import{R as jt,S as kt}from"./request-D32JP-Lw.js";import{h as ze,T as Ft}from"./moment-HlsgAWXC.js";import{o as Xt,T as Ut,u as qt}from"./transButton-DuFpIIav.js";import{D as Vt}from"./DownOutlined-Dg_AiyhI.js";var Wt=function(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(t[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,a=Object.getOwnPropertySymbols(e);s<a.length;s++)n.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(e,a[s])&&(t[a[s]]=e[a[s]]);return t};const Gt=()=>({prefixCls:String,href:String,separator:Y.any,dropdownProps:de(),overlay:Y.any,onClick:Ze()}),me=Z({compatConfig:{MODE:3},name:"ABreadcrumbItem",inheritAttrs:!1,__ANT_BREADCRUMB_ITEM:!0,props:Gt(),slots:Object,setup(e,n){let{slots:t,attrs:a,emit:s}=n;const{prefixCls:d}=re("breadcrumb",e),g=(y,x)=>{const C=le(t,e,"overlay");return C?o(Ke,H(H({},e.dropdownProps),{},{overlay:C,placement:"bottom"}),{default:()=>[o("span",{class:`${x}-overlay-link`},[y,o(Vt,null,null)])]}):y},_=y=>{s("click",y)};return()=>{var y;const x=(y=le(t,e,"separator"))!==null&&y!==void 0?y:"/",C=le(t,e),{class:l,style:f}=a,v=Wt(a,["class","style"]);let $;return e.href!==void 0?$=o("a",H({class:`${d.value}-link`,onClick:_},v),[C]):$=o("span",H({class:`${d.value}-link`,onClick:_},v),[C]),$=g($,d.value),C!=null?o("li",{class:l,style:f},[$,x&&o("span",{class:`${d.value}-separator`},[x])]):null}}}),Yt=e=>{const{componentCls:n,iconCls:t}=e;return{[n]:P(P({},Ee(e)),{color:e.breadcrumbBaseColor,fontSize:e.breadcrumbFontSize,[t]:{fontSize:e.breadcrumbIconFontSize},ol:{display:"flex",flexWrap:"wrap",margin:0,padding:0,listStyle:"none"},a:P({color:e.breadcrumbLinkColor,transition:`color ${e.motionDurationMid}`,padding:`0 ${e.paddingXXS}px`,borderRadius:e.borderRadiusSM,height:e.lineHeight*e.fontSize,display:"inline-block",marginInline:-e.marginXXS,"&:hover":{color:e.breadcrumbLinkColorHover,backgroundColor:e.colorBgTextHover}},Qe(e)),"li:last-child":{color:e.breadcrumbLastItemColor,[`& > ${n}-separator`]:{display:"none"}},[`${n}-separator`]:{marginInline:e.breadcrumbSeparatorMargin,color:e.breadcrumbSeparatorColor},[`${n}-link`]:{[`
          > ${t} + span,
          > ${t} + a
        `]:{marginInlineStart:e.marginXXS}},[`${n}-overlay-link`]:{borderRadius:e.borderRadiusSM,height:e.lineHeight*e.fontSize,display:"inline-block",padding:`0 ${e.paddingXXS}px`,marginInline:-e.marginXXS,[`> ${t}`]:{marginInlineStart:e.marginXXS,fontSize:e.fontSizeIcon},"&:hover":{color:e.breadcrumbLinkColorHover,backgroundColor:e.colorBgTextHover,a:{color:e.breadcrumbLinkColorHover}},a:{"&:hover":{backgroundColor:"transparent"}}},[`&${e.componentCls}-rtl`]:{direction:"rtl"}})}},Jt=pe("Breadcrumb",e=>{const n=Ce(e,{breadcrumbBaseColor:e.colorTextDescription,breadcrumbFontSize:e.fontSize,breadcrumbIconFontSize:e.fontSize,breadcrumbLinkColor:e.colorTextDescription,breadcrumbLinkColorHover:e.colorText,breadcrumbLastItemColor:e.colorText,breadcrumbSeparatorMargin:e.marginXS,breadcrumbSeparatorColor:e.colorTextDescription});return[Yt(n)]}),Zt=()=>({prefixCls:String,routes:{type:Array},params:Y.any,separator:Y.any,itemRender:{type:Function}});function Kt(e,n){if(!e.breadcrumbName)return null;const t=Object.keys(n).join("|");return e.breadcrumbName.replace(new RegExp(`:(${t})`,"g"),(s,d)=>n[d]||s)}function Ne(e){const{route:n,params:t,routes:a,paths:s}=e,d=a.indexOf(n)===a.length-1,g=Kt(n,t);return d?o("span",null,[g]):o("a",{href:`#/${s.join("/")}`},[g])}const ae=Z({compatConfig:{MODE:3},name:"ABreadcrumb",inheritAttrs:!1,props:Zt(),slots:Object,setup(e,n){let{slots:t,attrs:a}=n;const{prefixCls:s,direction:d}=re("breadcrumb",e),[g,_]=Jt(s),y=(l,f)=>(l=(l||"").replace(/^\//,""),Object.keys(f).forEach(v=>{l=l.replace(`:${v}`,f[v])}),l),x=(l,f,v)=>{const $=[...l],S=y(f||"",v);return S&&$.push(S),$},C=l=>{let{routes:f=[],params:v={},separator:$,itemRender:S=Ne}=l;const A=[];return f.map(w=>{const O=y(w.path,v);O&&A.push(O);const B=[...A];let c=null;w.children&&w.children.length&&(c=o(tt,{items:w.children.map(r=>({key:r.path||r.breadcrumbName,label:S({route:r,params:v,routes:f,paths:x(B,r.path,v)})}))},null));const u={separator:$};return c&&(u.overlay=c),o(me,H(H({},u),{},{key:O||w.breadcrumbName}),{default:()=>[S({route:w,params:v,routes:f,paths:B})]})})};return()=>{var l;let f;const{routes:v,params:$={}}=e,S=fe(le(t,e)),A=(l=le(t,e,"separator"))!==null&&l!==void 0?l:"/",w=e.itemRender||t.itemRender||Ne;v&&v.length>0?f=C({routes:v,params:$,separator:A,itemRender:w}):S.length&&(f=S.map((B,c)=>(je(typeof B.type=="object"&&(B.type.__ANT_BREADCRUMB_ITEM||B.type.__ANT_BREADCRUMB_SEPARATOR)),et(B,{separator:A,key:c}))));const O={[s.value]:!0,[`${s.value}-rtl`]:d.value==="rtl",[`${a.class}`]:!!a.class,[_.value]:!0};return g(o("nav",H(H({},a),{},{class:O}),[o("ol",null,[f])]))}}});var Qt=function(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(t[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,a=Object.getOwnPropertySymbols(e);s<a.length;s++)n.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(e,a[s])&&(t[a[s]]=e[a[s]]);return t};const en=()=>({prefixCls:String}),_e=Z({compatConfig:{MODE:3},name:"ABreadcrumbSeparator",__ANT_BREADCRUMB_SEPARATOR:!0,inheritAttrs:!1,props:en(),setup(e,n){let{slots:t,attrs:a}=n;const{prefixCls:s}=re("breadcrumb",e);return()=>{var d;const{separator:g,class:_}=a,y=Qt(a,["separator","class"]),x=fe((d=t.default)===null||d===void 0?void 0:d.call(t));return o("span",H({class:[`${s.value}-separator`,_]},y),[x.length>0?x:"/"])}}});ae.Item=me;ae.Separator=_e;ae.install=function(e){return e.component(ae.name,ae),e.component(me.name,me),e.component(_e.name,_e),e};const tn=e=>{const{componentCls:n,commentBg:t,commentPaddingBase:a,commentNestIndent:s,commentFontSizeBase:d,commentFontSizeSm:g,commentAuthorNameColor:_,commentAuthorTimeColor:y,commentActionColor:x,commentActionHoverColor:C,commentActionsMarginBottom:l,commentActionsMarginTop:f,commentContentDetailPMarginBottom:v}=e;return{[n]:{position:"relative",backgroundColor:t,[`${n}-inner`]:{display:"flex",padding:a},[`${n}-avatar`]:{position:"relative",flexShrink:0,marginRight:e.marginSM,cursor:"pointer",img:{width:"32px",height:"32px",borderRadius:"50%"}},[`${n}-content`]:{position:"relative",flex:"1 1 auto",minWidth:"1px",fontSize:d,wordWrap:"break-word","&-author":{display:"flex",flexWrap:"wrap",justifyContent:"flex-start",marginBottom:e.marginXXS,fontSize:d,"& > a,& > span":{paddingRight:e.paddingXS,fontSize:g,lineHeight:"18px"},"&-name":{color:_,fontSize:d,transition:`color ${e.motionDurationSlow}`,"> *":{color:_,"&:hover":{color:_}}},"&-time":{color:y,whiteSpace:"nowrap",cursor:"auto"}},"&-detail p":{marginBottom:v,whiteSpace:"pre-wrap"}},[`${n}-actions`]:{marginTop:f,marginBottom:l,paddingLeft:0,"> li":{display:"inline-block",color:x,"> span":{marginRight:"10px",color:x,fontSize:g,cursor:"pointer",transition:`color ${e.motionDurationSlow}`,userSelect:"none","&:hover":{color:C}}}},[`${n}-nested`]:{marginLeft:s},"&-rtl":{direction:"rtl"}}}},nn=pe("Comment",e=>{const n=Ce(e,{commentBg:"inherit",commentPaddingBase:`${e.paddingMD}px 0`,commentNestIndent:"44px",commentFontSizeBase:e.fontSize,commentFontSizeSm:e.fontSizeSM,commentAuthorNameColor:e.colorTextTertiary,commentAuthorTimeColor:e.colorTextPlaceholder,commentActionColor:e.colorTextTertiary,commentActionHoverColor:e.colorTextSecondary,commentActionsMarginBottom:"inherit",commentActionsMarginTop:e.marginSM,commentContentDetailPMarginBottom:"inherit"});return[tn(n)]}),an=()=>({actions:Array,author:Y.any,avatar:Y.any,content:Y.any,prefixCls:String,datetime:Y.any}),rn=Z({compatConfig:{MODE:3},name:"AComment",inheritAttrs:!1,props:an(),slots:Object,setup(e,n){let{slots:t,attrs:a}=n;const{prefixCls:s,direction:d}=re("comment",e),[g,_]=nn(s),y=(C,l)=>o("div",{class:`${C}-nested`},[l]),x=C=>!C||!C.length?null:C.map((f,v)=>o("li",{key:`action-${v}`},[f]));return()=>{var C,l,f,v,$,S,A,w,O,B,c;const u=s.value,r=(C=e.actions)!==null&&C!==void 0?C:(l=t.actions)===null||l===void 0?void 0:l.call(t),p=(f=e.author)!==null&&f!==void 0?f:(v=t.author)===null||v===void 0?void 0:v.call(t),I=($=e.avatar)!==null&&$!==void 0?$:(S=t.avatar)===null||S===void 0?void 0:S.call(t),z=(A=e.content)!==null&&A!==void 0?A:(w=t.content)===null||w===void 0?void 0:w.call(t),R=(O=e.datetime)!==null&&O!==void 0?O:(B=t.datetime)===null||B===void 0?void 0:B.call(t),j=o("div",{class:`${u}-avatar`},[typeof I=="string"?o("img",{src:I,alt:"comment-avatar"},null):I]),F=r?o("ul",{class:`${u}-actions`},[x(Array.isArray(r)?r:[r])]):null,X=o("div",{class:`${u}-content-author`},[p&&o("span",{class:`${u}-content-author-name`},[p]),R&&o("span",{class:`${u}-content-author-time`},[R])]),E=o("div",{class:`${u}-content`},[X,o("div",{class:`${u}-content-detail`},[z]),F]),k=o("div",{class:`${u}-inner`},[j,E]),h=fe((c=t.default)===null||c===void 0?void 0:c.call(t));return g(o("div",H(H({},a),{},{class:[u,{[`${u}-rtl`]:d.value==="rtl"},a.class,_.value]}),[k,h&&h.length?y(u,h):null]))}}}),Ue=Se(rn);var on={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"arrow-left",theme:"outlined"};function Le(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?Object(arguments[n]):{},a=Object.keys(t);typeof Object.getOwnPropertySymbols=="function"&&(a=a.concat(Object.getOwnPropertySymbols(t).filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable}))),a.forEach(function(s){ln(e,s,t[s])})}return e}function ln(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var $e=function(n,t){var a=Le({},n,t.attrs);return o(ke,Le({},a,{icon:on}),null)};$e.displayName="ArrowLeftOutlined";$e.inheritAttrs=!1;var sn={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"};function Me(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?Object(arguments[n]):{},a=Object.keys(t);typeof Object.getOwnPropertySymbols=="function"&&(a=a.concat(Object.getOwnPropertySymbols(t).filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable}))),a.forEach(function(s){cn(e,s,t[s])})}return e}function cn(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var Te=function(n,t){var a=Me({},n,t.attrs);return o(ke,Me({},a,{icon:sn}),null)};Te.displayName="ArrowRightOutlined";Te.inheritAttrs=!1;const un=e=>{const{componentCls:n,antCls:t}=e;return{[n]:P(P({},Ee(e)),{position:"relative",padding:`${e.pageHeaderPaddingVertical}px ${e.pageHeaderPadding}px`,backgroundColor:e.colorBgContainer,[`&${n}-ghost`]:{backgroundColor:e.pageHeaderGhostBg},"&.has-footer":{paddingBottom:0},[`${n}-back`]:{marginRight:e.marginMD,fontSize:e.fontSizeLG,lineHeight:1,"&-button":P(P({},Xt(e)),{color:e.pageHeaderBackColor,cursor:"pointer"})},[`${t}-divider-vertical`]:{height:"14px",margin:`0 ${e.marginSM}`,verticalAlign:"middle"},[`${t}-breadcrumb + &-heading`]:{marginTop:e.marginXS},[`${n}-heading`]:{display:"flex",justifyContent:"space-between","&-left":{display:"flex",alignItems:"center",margin:`${e.marginXS/2}px 0`,overflow:"hidden"},"&-title":P({marginRight:e.marginSM,marginBottom:0,color:e.colorTextHeading,fontWeight:600,fontSize:e.pageHeaderHeadingTitle,lineHeight:`${e.controlHeight}px`},Ie),[`${t}-avatar`]:{marginRight:e.marginSM},"&-sub-title":P({marginRight:e.marginSM,color:e.colorTextDescription,fontSize:e.pageHeaderHeadingSubTitle,lineHeight:e.lineHeight},Ie),"&-extra":{margin:`${e.marginXS/2}px 0`,whiteSpace:"nowrap","> *":{marginLeft:e.marginSM,whiteSpace:"unset"},"> *:first-child":{marginLeft:0}}},[`${n}-content`]:{paddingTop:e.pageHeaderContentPaddingVertical},[`${n}-footer`]:{marginTop:e.marginMD,[`${t}-tabs`]:{[`> ${t}-tabs-nav`]:{margin:0,"&::before":{border:"none"}},[`${t}-tabs-tab`]:{paddingTop:e.paddingXS,paddingBottom:e.paddingXS,fontSize:e.pageHeaderTabFontSize}}},[`${n}-compact ${n}-heading`]:{flexWrap:"wrap"},[`&${e.componentCls}-rtl`]:{direction:"rtl"}})}},dn=pe("PageHeader",e=>{const n=Ce(e,{pageHeaderPadding:e.paddingLG,pageHeaderPaddingVertical:e.paddingMD,pageHeaderPaddingBreadcrumb:e.paddingSM,pageHeaderContentPaddingVertical:e.paddingSM,pageHeaderBackColor:e.colorTextBase,pageHeaderGhostBg:"transparent",pageHeaderHeadingTitle:e.fontSizeHeading4,pageHeaderHeadingSubTitle:e.fontSize,pageHeaderTabFontSize:e.fontSizeLG});return[un(n)]}),mn=()=>({backIcon:Q(),prefixCls:String,title:Q(),subTitle:Q(),breadcrumb:Y.object,tags:Q(),footer:Q(),extra:Q(),avatar:de(),ghost:{type:Boolean,default:void 0},onBack:Function}),pn=Z({compatConfig:{MODE:3},name:"APageHeader",inheritAttrs:!1,props:mn(),slots:Object,setup(e,n){let{emit:t,slots:a,attrs:s}=n;const{prefixCls:d,direction:g,pageHeader:_}=re("page-header",e),[y,x]=dn(d),C=nt(!1),l=zt(),f=c=>{let{width:u}=c;l.value||(C.value=u<768)},v=ie(()=>{var c,u,r;return(r=(c=e.ghost)!==null&&c!==void 0?c:(u=_==null?void 0:_.value)===null||u===void 0?void 0:u.ghost)!==null&&r!==void 0?r:!0}),$=()=>{var c,u,r;return(r=(c=e.backIcon)!==null&&c!==void 0?c:(u=a.backIcon)===null||u===void 0?void 0:u.call(a))!==null&&r!==void 0?r:g.value==="rtl"?o(Te,null,null):o($e,null,null)},S=c=>!c||!e.onBack?null:o(lt,{componentName:"PageHeader",children:u=>{let{back:r}=u;return o("div",{class:`${d.value}-back`},[o(Ut,{onClick:p=>{t("back",p)},class:`${d.value}-back-button`,"aria-label":r},{default:()=>[c]})])}},null),A=()=>{var c;return e.breadcrumb?o(ae,e.breadcrumb,null):(c=a.breadcrumb)===null||c===void 0?void 0:c.call(a)},w=()=>{var c,u,r,p,I,z,R,j,F;const{avatar:X}=e,E=(c=e.title)!==null&&c!==void 0?c:(u=a.title)===null||u===void 0?void 0:u.call(a),k=(r=e.subTitle)!==null&&r!==void 0?r:(p=a.subTitle)===null||p===void 0?void 0:p.call(a),h=(I=e.tags)!==null&&I!==void 0?I:(z=a.tags)===null||z===void 0?void 0:z.call(a),m=(R=e.extra)!==null&&R!==void 0?R:(j=a.extra)===null||j===void 0?void 0:j.call(a),i=`${d.value}-heading`,b=E||k||h||m;if(!b)return null;const U=$(),q=S(U);return o("div",{class:i},[(q||X||b)&&o("div",{class:`${i}-left`},[q,X?o(xe,X,null):(F=a.avatar)===null||F===void 0?void 0:F.call(a),E&&o("span",{class:`${i}-title`,title:typeof E=="string"?E:void 0},[E]),k&&o("span",{class:`${i}-sub-title`,title:typeof k=="string"?k:void 0},[k]),h&&o("span",{class:`${i}-tags`},[h])]),m&&o("span",{class:`${i}-extra`},[o(Nt,null,{default:()=>[m]})])])},O=()=>{var c,u;const r=(c=e.footer)!==null&&c!==void 0?c:rt((u=a.footer)===null||u===void 0?void 0:u.call(a));return ot(r)?null:o("div",{class:`${d.value}-footer`},[r])},B=c=>o("div",{class:`${d.value}-content`},[c]);return()=>{var c,u;const r=((c=e.breadcrumb)===null||c===void 0?void 0:c.routes)||a.breadcrumb,p=e.footer||a.footer,I=fe((u=a.default)===null||u===void 0?void 0:u.call(a)),z=Fe(d.value,{"has-breadcrumb":r,"has-footer":p,[`${d.value}-ghost`]:v.value,[`${d.value}-rtl`]:g.value==="rtl",[`${d.value}-compact`]:C.value},s.class,x.value);return y(o(at,{onResize:f},{default:()=>[o("div",H(H({},s),{},{class:z}),[A(),w(),I.length?B(I):null,O()])]}))}}}),fn=Se(pn),vn=e=>{const{componentCls:n,iconCls:t,zIndexPopup:a,colorText:s,colorWarning:d,marginXS:g,fontSize:_,fontWeightStrong:y,lineHeight:x}=e;return{[n]:{zIndex:a,[`${n}-inner-content`]:{color:s},[`${n}-message`]:{position:"relative",marginBottom:g,color:s,fontSize:_,display:"flex",flexWrap:"nowrap",alignItems:"start",[`> ${n}-message-icon ${t}`]:{color:d,fontSize:_,flex:"none",lineHeight:1,paddingTop:(Math.round(_*x)-_)/2},"&-title":{flex:"auto",marginInlineStart:g},"&-title-only":{fontWeight:y}},[`${n}-description`]:{position:"relative",marginInlineStart:_+g,marginBottom:g,color:s,fontSize:_},[`${n}-buttons`]:{textAlign:"end",button:{marginInlineStart:g}}}}},gn=pe("Popconfirm",e=>vn(e),e=>{const{zIndexPopupBase:n}=e;return{zIndexPopup:n+60}});var bn=function(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(t[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,a=Object.getOwnPropertySymbols(e);s<a.length;s++)n.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(e,a[s])&&(t[a[s]]=e[a[s]]);return t};const hn=()=>P(P({},ft()),{prefixCls:String,content:ee(),title:ee(),description:ee(),okType:vt("primary"),disabled:{type:Boolean,default:!1},okText:ee(),cancelText:ee(),icon:ee(),okButtonProps:de(),cancelButtonProps:de(),showCancel:{type:Boolean,default:!0},onConfirm:Function,onCancel:Function}),_n=Z({compatConfig:{MODE:3},name:"APopconfirm",inheritAttrs:!1,props:st(hn(),P(P({},it()),{trigger:"click",placement:"top",mouseEnterDelay:.1,mouseLeaveDelay:.1,arrowPointAtCenter:!1,autoAdjustOverflow:!0,okType:"primary",disabled:!1})),slots:Object,setup(e,n){let{slots:t,emit:a,expose:s,attrs:d}=n;const g=D();je(e.visible===void 0),s({getPopupDomNode:()=>{var r,p;return(p=(r=g.value)===null||r===void 0?void 0:r.getPopupDomNode)===null||p===void 0?void 0:p.call(r)}});const[_,y]=qt(!1,{value:ct(e,"open")}),x=(r,p)=>{e.open===void 0&&y(r),a("update:open",r),a("openChange",r,p)},C=r=>{x(!1,r)},l=r=>{var p;return(p=e.onConfirm)===null||p===void 0?void 0:p.call(e,r)},f=r=>{var p;x(!1,r),(p=e.onCancel)===null||p===void 0||p.call(e,r)},v=r=>{r.keyCode===ht.ESC&&_&&x(!1,r)},$=r=>{const{disabled:p}=e;p||x(r)},{prefixCls:S,getPrefixCls:A}=re("popconfirm",e),w=ie(()=>A()),O=ie(()=>A("btn")),[B]=gn(S),[c]=ut("Popconfirm",gt.Popconfirm),u=()=>{var r,p,I,z,R;const{okButtonProps:j,cancelButtonProps:F,title:X=(r=t.title)===null||r===void 0?void 0:r.call(t),description:E=(p=t.description)===null||p===void 0?void 0:p.call(t),cancelText:k=(I=t.cancel)===null||I===void 0?void 0:I.call(t),okText:h=(z=t.okText)===null||z===void 0?void 0:z.call(t),okType:m,icon:i=((R=t.icon)===null||R===void 0?void 0:R.call(t))||o(bt,null,null),showCancel:b=!0}=e,{cancelButton:U,okButton:q}=t,W=P({onClick:f,size:"small"},F),ve=P(P(P({onClick:l},Re(m)),{size:"small"}),j);return o("div",{class:`${S.value}-inner-content`},[o("div",{class:`${S.value}-message`},[i&&o("span",{class:`${S.value}-message-icon`},[i]),o("div",{class:[`${S.value}-message-title`,{[`${S.value}-message-title-only`]:!!E}]},[X])]),E&&o("div",{class:`${S.value}-description`},[E]),o("div",{class:`${S.value}-buttons`},[b?U?U(W):o(Xe,W,{default:()=>[k||c.value.cancelText]}):null,q?q(ve):o(Mt,{buttonProps:P(P({size:"small"},Re(m)),j),actionFn:l,close:C,prefixCls:O.value,quitOnNullishReturnValue:!0,emitEvent:!0},{default:()=>[h||c.value.okText]})])])};return()=>{var r;const{placement:p,overlayClassName:I,trigger:z="click"}=e,R=bn(e,["placement","overlayClassName","trigger"]),j=dt(R,["title","content","cancelText","okText","onUpdate:open","onConfirm","onCancel","prefixCls"]),F=Fe(S.value,I);return B(o(Lt,H(H(H({},j),d),{},{trigger:z,placement:p,onOpenChange:$,open:_.value,overlayClassName:F,transitionName:pt(w.value,"zoom-big",e.transitionName),ref:g,"data-popover-inject":!0}),{default:()=>[mt(((r=t.default)===null||r===void 0?void 0:r.call(t))||[],{onKeydown:X=>{v(X)}},!1)],content:u}))}}}),yn=Se(_n),K=class K{constructor(){ce(this,"collection","comment");ce(this,"request");this.request=new jt}static getInstance(){return K.instance||(K.instance=new K),K.instance}async findCommentById(n){try{const t=await this.request.get(`/comment/${n}`);return t.code==200?{success:!0,data:t.data}:{success:!1,error:t.message}}catch(t){return{success:!1,error:t.message}}}async findComments(n={},t={page:0,pageSize:10}){try{const a=await this.request.get("/comment",{params:n});return a.code==200?{success:!0,data:{comments:a.data,total:1}}:{success:!1,error:a.message}}catch(a){return{success:!1,error:a.message}}}async createComment(n){try{const t=await this.request.post("/comment",{data:n});return t.code==200?{success:!0,data:t.data}:{success:!1,error:t.message}}catch(t){return{success:!1,error:t.message}}}async updateComment(n,t){try{const a=await this.request.put(`/comment/${n}`,{data:t});return a.code==200?{success:!0,data:a.data}:{success:!1,error:a.message}}catch(a){return{success:!1,error:a.message}}}async deleteById(n){try{const t=await this.request.delete(`/comment/${n}`);return t.code==200?{success:!0,data:t.data}:{success:!1,error:t.message}}catch(t){return{success:!1,error:t.message}}}};ce(K,"instance");let ye=K;const Cn=["href"],Sn={key:"comment-basic-like"},xn={style:{"padding-left":"8px",cursor:"auto"}},$n={key:"comment-basic-dislike"},Tn={style:{"padding-left":"8px",cursor:"auto"}},Bn={key:0},wn=Z({__name:"Comment",props:{comment:{type:Object,default:{}}},emits:["replay"],setup(e,{emit:n}){const t=n,a=e,s=D(0),d=D(0),g=D(),_=()=>{s.value=1,d.value=0,g.value="liked"},y=()=>{s.value=0,d.value=1,g.value="disliked"};function x(f){console.log(f),t("replay",f)}const C=ie(()=>ze(a.comment.updatedAt).format("YYYY-MM-DD: HH-mm-ss")),l=ie(()=>ze(a.comment.createdAt).fromNow());return(f,v)=>{const $=xe,S=Ct,A=ne("LikeFilled"),w=ne("LikeOutlined"),O=ne("DislikeFilled"),B=ne("DislikeOutlined"),c=ne("Comment",!0),u=Ue;return L(),G(u,{class:"comment"},{author:T(()=>{var r,p;return[V("a",{href:`#/user-info?use_id=${e.comment.author.userId}`},J((p=(r=e.comment)==null?void 0:r.author)==null?void 0:p.username),9,Cn)]}),avatar:T(()=>{var r;return[o($,{src:(r=e.comment.author)==null?void 0:r.avatar,alt:e.comment.author.username},null,8,["src","alt"])]}),datetime:T(()=>[o(S,{title:C.value},{default:T(()=>[V("span",null,J(l.value),1)]),_:1},8,["title"])]),actions:T(()=>[V("span",Sn,[o(S,{title:"Like"},{default:T(()=>[g.value==="liked"?(L(),G(A,{key:0,onClick:_})):(L(),G(w,{key:1,onClick:_}))]),_:1}),V("span",xn,J(s.value),1)]),V("span",$n,[o(S,{title:"Dislike"},{default:T(()=>[g.value==="disliked"?(L(),G(O,{key:0,onClick:y})):(L(),G(B,{key:1,onClick:y}))]),_:1}),V("span",Tn,J(d.value),1)]),V("span",{key:"comment-nested-reply-to",onClick:v[0]||(v[0]=_t(r=>x(e.comment),["prevent"]))},"Reply to")]),content:T(()=>{var r;return[V("p",null,J((r=e.comment)==null?void 0:r.content),1)]}),default:T(()=>[e.comment.children&&e.comment.children.length?(L(),se("div",Bn,[(L(!0),se(be,null,he(e.comment.children,r=>(L(),G(c,{key:r._id,comment:r,onReplay:x},null,8,["comment"]))),128))])):yt("",!0)]),_:1})}}}),On={key:0,class:"article-detail"},Pn=Z({__name:"ArticleDetail",setup(e){var k;const n=Tt(),t=Bt(),a=St(),s=D(),d=Dt.getInstance(),g=It.getInstance(),_=ye.getInstance(),y=Et.getInstance(),x=Rt.getInstance(),C=ge([]),l=D(),f=D(),v=ge([]);let $=D(!0),S=D(!0),A=D(!0);const w=ge([{path:"/",breadcrumbName:"Home"},{path:"/article",breadcrumbName:"Article"},{path:"/article-info",breadcrumbName:((k=l.value)==null?void 0:k.title)||""}]),O=D(!1),B=D(""),c=D(),u=D(!1),r=D(!1),p=D("input your comment");xt(async()=>{var h,m;await g.findArticleById(n.query._id+"").then(i=>{var b;if(i.success&&(l.value=i.data||void 0,w[2].breadcrumbName=((b=l.value)==null?void 0:b.title)||""),$.value=!1,!i.success)throw N.error(i.error),new Error(i.error)}).catch(i=>{throw new Error(i.message)}),l.value&&x.findTagByIds(l.value.tags).then(i=>{i.success&&i.data&&(v.splice(0,v.length),v.push(...i.data))}),l.value&&d.findUserById((h=l.value)==null?void 0:h.createdBy).then(i=>{i.success?f.value=i.data:N.error(i.error)}),y.findInteractions({createdBy:a.user._id,documentId:(m=l.value)==null?void 0:m._id,collectionName:oe.ARTICLE}).then(i=>{var b;i.success?(b=i.data)==null||b.interactions.forEach(U=>{U.operation==te.STAR?u.value=!0:U.operation==te.COLLECT&&(r.value=!0)}):N.error(i.error),A.value=!1}),l.value&&_.findComments({article:l.value._id}).then(i=>{var b;console.log(i),i.success?(C.push(...I(((b=i.data)==null?void 0:b.comments)||[])),S.value=!1):N.error(i.error)})});function I(h){let m=[];h.forEach(b=>{(b.parentComment==null||b.parentComment.length==0)&&m.push({...b,children:[]})});function i(b,U){for(let q of b)if(q.parentComment+""!=null)for(let W of U)W._id+""==q.parentComment+""?W.children.push({...q,children:[]}):W.children.length>0&&i(b,W.children)}return i(h,m),m}const z=()=>{var m;if(!B.value)return;O.value=!0;let h={article:((m=l.value)==null?void 0:m._id)||"",content:B.value,parentComment:c.value||"",createdBy:a.user._id,like:0,dislike:0,updatedAt:new Date,createdAt:new Date,isDeleted:!1};O.value=!1,c.value=null,_.createComment(h).then(i=>{i.success?(B.value="",N.success("publish comment successfully!")):N.error(i.error)})};async function R(h){var m,i;if(!(l.value==null||l.value==null))switch(console.log(h),h){case 0:u.value?(l.value.statistics.stars-=1,u.value=!1,y.deleteInteractionByFilter({documentId:l.value._id,collectionName:oe.ARTICLE,createdBy:d.getCurrentUser()._id,operation:te.STAR}).then(b=>{b.success?N.success("unstar successfully!"):N.error(b.error)})):(l.value.statistics.stars+=1,u.value=!0,y.createInteraction({createdBy:d.getCurrentUser()._id,documentId:l.value._id||"",operation:te.STAR,collectionName:oe.ARTICLE,createdAt:new Date,isDeleted:!1}).then(b=>{b.success?N.success("star successfully!"):N.error(b.error)})),l.value._id&&g.updateArticle((m=l.value)==null?void 0:m._id,l.value);break;case 1:r.value?(l.value.statistics.collections-=1,r.value=!1,y.deleteInteractionByFilter({documentId:l.value._id,createdBy:d.getCurrentUser()._id,operation:te.COLLECT,collectionName:oe.ARTICLE}).then(b=>{b.success?N.success("uncollect successfully!"):N.error(b.error)})):(l.value.statistics.collections+=1,r.value=!0,y.createInteraction({createdBy:d.getCurrentUser()._id,documentId:l.value._id||"",operation:te.COLLECT,collectionName:oe.ARTICLE,createdAt:new Date,isDeleted:!1}).then(b=>{b.success?N.success("collect successfully!"):N.error(b.error)})),l.value._id&&g.updateArticle((i=l.value)==null?void 0:i._id,l.value);break;case 2:break;default:throw Error("system not contain this method: "+h)}}function j(h){var m;h._id&&(c.value=h._id),p.value="Replay to: "+h.author.username,(m=s.value)==null||m.focus()}function F(){var h;t.push({path:"/publish",query:{_id:((h=l.value)==null?void 0:h._id)+""}})}const X=()=>new Promise(h=>{var m,i;(m=l.value)!=null&&m._id&&g.deleteById((i=l.value)==null?void 0:i._id),h(!0)}),E=h=>{N.warning("Delete operation canceled")};return(h,m)=>{const i=Xe,b=yn,U=Ft,q=ne("v-md-preview"),W=fn,ve=wt,qe=xe,Ve=Ot,Be=Ht,We=Ue,we=kt,Ge=Pt;return L(),G(we,{spinning:He($)},{default:T(()=>{var Oe,Pe;return[l.value?(L(),se("div",On,[o(W,{title:l.value.title,class:"article-detail-container",avatar:{src:(Oe=f.value)==null?void 0:Oe.avatar},breadcrumb:{routes:w},onBack:m[0]||(m[0]=()=>h.$router.go(-1))},$t({tags:T(()=>[(L(!0),se(be,null,he(v,M=>(L(),G(U,{color:M.color,key:M._id},{default:T(()=>[ue(J(M.name),1)]),_:2},1032,["color"]))),128))]),default:T(()=>[o(q,{text:l.value.content},null,8,["text"])]),_:2},[l.value.createdBy+""==((Pe=f.value)==null?void 0:Pe._id)?{name:"extra",fn:T(()=>[o(i,{type:"primary",onClick:F},{default:T(()=>m[5]||(m[5]=[ue("Edit")])),_:1}),o(b,{title:"Title",onConfirm:X,onCancel:E},{default:T(()=>[o(i,{type:"primary",danger:""},{default:T(()=>m[6]||(m[6]=[ue("Delete")])),_:1})]),_:1})]),key:"0"}:void 0]),1032,["title","avatar","breadcrumb"]),o(ve,{class:"article-detail-function",gap:"20"},{default:T(()=>[V("i",{class:De(["iconfont","article-detail-function--item",{"article-detail-function--item-activate":u.value}]),onClick:m[1]||(m[1]=M=>R(0))}," "+J(l.value.statistics.stars),3),V("i",{class:De(["iconfont","article-detail-function--item",{"article-detail-function--item-activate":r.value}]),onClick:m[2]||(m[2]=M=>R(1))}," "+J(l.value.statistics.collections),3),V("i",{class:"iconfont article-detail-function--item",onClick:m[3]||(m[3]=M=>R(2))},"")]),_:1}),o(we,{spinning:He(S)},{default:T(()=>[(L(!0),se(be,null,he(C,M=>(L(),G(wn,{key:M._id+"",comment:M,onReplay:j},null,8,["comment"]))),128)),o(We,{class:"comment-input-container"},{avatar:T(()=>{var M,Ae;return[o(qe,{src:(M=f.value)==null?void 0:M.avatar,alt:(Ae=f.value)==null?void 0:Ae.username},null,8,["src","alt"])]}),content:T(()=>[o(Be,null,{default:T(()=>[o(Ve,{value:B.value,"onUpdate:value":m[4]||(m[4]=M=>B.value=M),rows:4,placeholder:p.value,ref_key:"comment_input",ref:s},null,8,["value","placeholder"])]),_:1}),o(Be,null,{default:T(()=>[o(i,{"html-type":"submit",loading:O.value,type:"primary",onClick:z},{default:T(()=>m[7]||(m[7]=[ue(" Add Comment ")])),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["spinning"])])):(L(),G(Ge,{key:1}))]}),_:1},8,["spinning"])}}}),En=At(Pn,[["__scopeId","data-v-a6abd40b"]]);export{En as default};
