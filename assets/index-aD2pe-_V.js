import{c,ac as N,b5 as U,$ as d,g as X,m as k,c8 as G,b3 as V,_ as T,r as q,d as x,u as B,G as y,au as z,a as h,ae as J,ah as Q,b4 as Y,c9 as Z,F as oo,aa as D,bc as eo,a1 as to}from"./index-CorvJS88.js";import{W as no}from"./index-CMYvEKCm.js";var ro={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"}}]},name:"down",theme:"outlined"};function P(o){for(var n=1;n<arguments.length;n++){var e=arguments[n]!=null?Object(arguments[n]):{},t=Object.keys(e);typeof Object.getOwnPropertySymbols=="function"&&(t=t.concat(Object.getOwnPropertySymbols(e).filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.forEach(function(r){ao(o,r,e[r])})}return o}function ao(o,n,e){return n in o?Object.defineProperty(o,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):o[n]=e,o}var F=function(n,e){var t=P({},n,e.attrs);return c(N,P({},t,{icon:ro}),null)};F.displayName="DownOutlined";F.inheritAttrs=!1;const lo=new d("antMoveDownIn",{"0%":{transform:"translate3d(0, 100%, 0)",transformOrigin:"0 0",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1}}),io=new d("antMoveDownOut",{"0%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1},"100%":{transform:"translate3d(0, 100%, 0)",transformOrigin:"0 0",opacity:0}}),so=new d("antMoveLeftIn",{"0%":{transform:"translate3d(-100%, 0, 0)",transformOrigin:"0 0",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1}}),co=new d("antMoveLeftOut",{"0%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1},"100%":{transform:"translate3d(-100%, 0, 0)",transformOrigin:"0 0",opacity:0}}),uo=new d("antMoveRightIn",{"0%":{transform:"translate3d(100%, 0, 0)",transformOrigin:"0 0",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1}}),go=new d("antMoveRightOut",{"0%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1},"100%":{transform:"translate3d(100%, 0, 0)",transformOrigin:"0 0",opacity:0}}),mo=new d("antMoveUpIn",{"0%":{transform:"translate3d(0, -100%, 0)",transformOrigin:"0 0",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1}}),fo=new d("antMoveUpOut",{"0%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1},"100%":{transform:"translate3d(0, -100%, 0)",transformOrigin:"0 0",opacity:0}}),vo={"move-up":{inKeyframes:mo,outKeyframes:fo},"move-down":{inKeyframes:lo,outKeyframes:io},"move-left":{inKeyframes:so,outKeyframes:co},"move-right":{inKeyframes:uo,outKeyframes:go}},$o=(o,n)=>{const{antCls:e}=o,t=`${e}-${n}`,{inKeyframes:r,outKeyframes:a}=vo[n];return[U(t,r,a,o.motionDurationMid),{[`
        ${t}-enter,
        ${t}-appear
      `]:{opacity:0,animationTimingFunction:o.motionEaseOutCirc},[`${t}-leave`]:{animationTimingFunction:o.motionEaseInOutCirc}}]},v=(o,n,e)=>{const t=G(e);return{[`${o.componentCls}-${n}`]:{color:o[`color${e}`],background:o[`color${t}Bg`],borderColor:o[`color${t}Border`],[`&${o.componentCls}-borderless`]:{borderColor:"transparent"}}}},po=o=>V(o,(n,e)=>{let{textColor:t,lightBorderColor:r,lightColor:a,darkColor:i}=e;return{[`${o.componentCls}-${n}`]:{color:t,background:a,borderColor:r,"&-inverse":{color:o.colorTextLightSolid,background:i,borderColor:i},[`&${o.componentCls}-borderless`]:{borderColor:"transparent"}}}}),ho=o=>{const{paddingXXS:n,lineWidth:e,tagPaddingHorizontal:t,componentCls:r}=o,a=t-e,i=n-e;return{[r]:T(T({},q(o)),{display:"inline-block",height:"auto",marginInlineEnd:o.marginXS,paddingInline:a,fontSize:o.tagFontSize,lineHeight:`${o.tagLineHeight}px`,whiteSpace:"nowrap",background:o.tagDefaultBg,border:`${o.lineWidth}px ${o.lineType} ${o.colorBorder}`,borderRadius:o.borderRadiusSM,opacity:1,transition:`all ${o.motionDurationMid}`,textAlign:"start",[`&${r}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:o.tagDefaultColor},[`${r}-close-icon`]:{marginInlineStart:i,color:o.colorTextDescription,fontSize:o.tagIconSize,cursor:"pointer",transition:`all ${o.motionDurationMid}`,"&:hover":{color:o.colorTextHeading}},[`&${r}-has-color`]:{borderColor:"transparent",[`&, a, a:hover, ${o.iconCls}-close, ${o.iconCls}-close:hover`]:{color:o.colorTextLightSolid}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${r}-checkable-checked):hover`]:{color:o.colorPrimary,backgroundColor:o.colorFillSecondary},"&:active, &-checked":{color:o.colorTextLightSolid},"&-checked":{backgroundColor:o.colorPrimary,"&:hover":{backgroundColor:o.colorPrimaryHover}},"&:active":{backgroundColor:o.colorPrimaryActive}},"&-hidden":{display:"none"},[`> ${o.iconCls} + span, > span + ${o.iconCls}`]:{marginInlineStart:a}}),[`${r}-borderless`]:{borderColor:"transparent",background:o.tagBorderlessBg}}},H=X("Tag",o=>{const{fontSize:n,lineHeight:e,lineWidth:t,fontSizeIcon:r}=o,a=Math.round(n*e),i=o.fontSizeSM,m=a-t*2,f=o.colorFillAlter,u=o.colorText,l=k(o,{tagFontSize:i,tagLineHeight:m,tagDefaultBg:f,tagDefaultColor:u,tagIconSize:r-2*t,tagPaddingHorizontal:8,tagBorderlessBg:o.colorFillTertiary});return[ho(l),po(l),v(l,"success","Success"),v(l,"processing","Info"),v(l,"error","Error"),v(l,"warning","Warning")]}),Co=()=>({prefixCls:String,checked:{type:Boolean,default:void 0},onChange:{type:Function},onClick:{type:Function},"onUpdate:checked":Function}),O=x({compatConfig:{MODE:3},name:"ACheckableTag",inheritAttrs:!1,props:Co(),setup(o,n){let{slots:e,emit:t,attrs:r}=n;const{prefixCls:a}=B("tag",o),[i,m]=H(a),f=l=>{const{checked:g}=o;t("update:checked",!g),t("change",!g),t("click",l)},u=y(()=>z(a.value,m.value,{[`${a.value}-checkable`]:!0,[`${a.value}-checkable-checked`]:o.checked}));return()=>{var l;return i(c("span",h(h({},r),{},{class:[u.value,r.class],onClick:f}),[(l=e.default)===null||l===void 0?void 0:l.call(e)]))}}}),bo=()=>({prefixCls:String,color:{type:String},closable:{type:Boolean,default:!1},closeIcon:D.any,visible:{type:Boolean,default:void 0},onClose:{type:Function},onClick:eo(),"onUpdate:visible":Function,icon:D.any,bordered:{type:Boolean,default:!0}}),p=x({compatConfig:{MODE:3},name:"ATag",inheritAttrs:!1,props:bo(),slots:Object,setup(o,n){let{slots:e,emit:t,attrs:r}=n;const{prefixCls:a,direction:i}=B("tag",o),[m,f]=H(a),u=J(!0);Q(()=>{o.visible!==void 0&&(u.value=o.visible)});const l=s=>{s.stopPropagation(),t("update:visible",!1),t("close",s),!s.defaultPrevented&&o.visible===void 0&&(u.value=!1)},g=y(()=>Y(o.color)||Z(o.color)),L=y(()=>z(a.value,f.value,{[`${a.value}-${o.color}`]:g.value,[`${a.value}-has-color`]:o.color&&!g.value,[`${a.value}-hidden`]:!u.value,[`${a.value}-rtl`]:i.value==="rtl",[`${a.value}-borderless`]:!o.bordered})),K=s=>{t("click",s)};return()=>{var s,C,b;const{icon:R=(s=e.icon)===null||s===void 0?void 0:s.call(e),color:$,closeIcon:S=(C=e.closeIcon)===null||C===void 0?void 0:C.call(e),closable:_=!1}=o,A=()=>_?S?c("span",{class:`${a.value}-close-icon`,onClick:l},[S]):c(to,{class:`${a.value}-close-icon`,onClick:l},null):null,E={backgroundColor:$&&!g.value?$:void 0},w=R||null,I=(b=e.default)===null||b===void 0?void 0:b.call(e),j=w?c(oo,null,[w,c("span",null,[I])]):I,W=o.onClick!==void 0,M=c("span",h(h({},r),{},{onClick:K,class:[L.value,r.class],style:[E,r.style]}),[j,A()]);return m(W?c(no,null,{default:()=>[M]}):M)}}});p.CheckableTag=O;p.install=function(o){return o.component(p.name,p),o.component(O.name,O),o};export{F as D,p as T,$o as i};
