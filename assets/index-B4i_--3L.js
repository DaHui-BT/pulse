import{g as re,m as oe,_ as s,r as _,bv as te,$ as le,ad as j,f as w,e as m,aa as ie,V as se,d as X,u as K,a6 as ce,aJ as de,G as y,ah as ue,k as be,o as ve,bl as he,h as S,av as fe,au as N,c as I,a as D,J as U,aI as me}from"./index-CorvJS88.js";import{V as pe}from"./Checkbox-lWoPrQ-Y.js";import{u as J,F as ge}from"./index-DrHQ6tjo.js";const xe=new le("antCheckboxEffect",{"0%":{transform:"scale(1)",opacity:.5},"100%":{transform:"scale(1.6)",opacity:0}}),Ce=e=>{const{checkboxCls:a}=e,n=`${a}-wrapper`;return[{[`${a}-group`]:s(s({},_(e)),{display:"inline-flex",flexWrap:"wrap",columnGap:e.marginXS,[`> ${e.antCls}-row`]:{flex:1}}),[n]:s(s({},_(e)),{display:"inline-flex",alignItems:"baseline",cursor:"pointer","&:after":{display:"inline-block",width:0,overflow:"hidden",content:"'\\a0'"},[`& + ${n}`]:{marginInlineStart:0},[`&${n}-in-form-item`]:{'input[type="checkbox"]':{width:14,height:14}}}),[a]:s(s({},_(e)),{position:"relative",whiteSpace:"nowrap",lineHeight:1,cursor:"pointer",alignSelf:"center",[`${a}-input`]:{position:"absolute",inset:0,zIndex:1,cursor:"pointer",opacity:0,margin:0,[`&:focus-visible + ${a}-inner`]:s({},te(e))},[`${a}-inner`]:{boxSizing:"border-box",position:"relative",top:0,insetInlineStart:0,display:"block",width:e.checkboxSize,height:e.checkboxSize,direction:"ltr",backgroundColor:e.colorBgContainer,border:`${e.lineWidth}px ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,borderCollapse:"separate",transition:`all ${e.motionDurationSlow}`,"&:after":{boxSizing:"border-box",position:"absolute",top:"50%",insetInlineStart:"21.5%",display:"table",width:e.checkboxSize/14*5,height:e.checkboxSize/14*8,border:`${e.lineWidthBold}px solid ${e.colorWhite}`,borderTop:0,borderInlineStart:0,transform:"rotate(45deg) scale(0) translate(-50%,-50%)",opacity:0,content:'""',transition:`all ${e.motionDurationFast} ${e.motionEaseInBack}, opacity ${e.motionDurationFast}`}},"& + span":{paddingInlineStart:e.paddingXS,paddingInlineEnd:e.paddingXS}})},{[a]:{"&-indeterminate":{[`${a}-inner`]:{"&:after":{top:"50%",insetInlineStart:"50%",width:e.fontSizeLG/2,height:e.fontSizeLG/2,backgroundColor:e.colorPrimary,border:0,transform:"translate(-50%, -50%) scale(1)",opacity:1,content:'""'}}}}},{[`${n}:hover ${a}:after`]:{visibility:"visible"},[`
        ${n}:not(${n}-disabled),
        ${a}:not(${a}-disabled)
      `]:{[`&:hover ${a}-inner`]:{borderColor:e.colorPrimary}},[`${n}:not(${n}-disabled)`]:{[`&:hover ${a}-checked:not(${a}-disabled) ${a}-inner`]:{backgroundColor:e.colorPrimaryHover,borderColor:"transparent"},[`&:hover ${a}-checked:not(${a}-disabled):after`]:{borderColor:e.colorPrimaryHover}}},{[`${a}-checked`]:{[`${a}-inner`]:{backgroundColor:e.colorPrimary,borderColor:e.colorPrimary,"&:after":{opacity:1,transform:"rotate(45deg) scale(1) translate(-50%,-50%)",transition:`all ${e.motionDurationMid} ${e.motionEaseOutBack} ${e.motionDurationFast}`}},"&:after":{position:"absolute",top:0,insetInlineStart:0,width:"100%",height:"100%",borderRadius:e.borderRadiusSM,visibility:"hidden",border:`${e.lineWidthBold}px solid ${e.colorPrimary}`,animationName:xe,animationDuration:e.motionDurationSlow,animationTimingFunction:"ease-in-out",animationFillMode:"backwards",content:'""',transition:`all ${e.motionDurationSlow}`}},[`
        ${n}-checked:not(${n}-disabled),
        ${a}-checked:not(${a}-disabled)
      `]:{[`&:hover ${a}-inner`]:{backgroundColor:e.colorPrimaryHover,borderColor:"transparent"},[`&:hover ${a}:after`]:{borderColor:e.colorPrimaryHover}}},{[`${n}-disabled`]:{cursor:"not-allowed"},[`${a}-disabled`]:{[`&, ${a}-input`]:{cursor:"not-allowed",pointerEvents:"none"},[`${a}-inner`]:{background:e.colorBgContainerDisabled,borderColor:e.colorBorder,"&:after":{borderColor:e.colorTextDisabled}},"&:after":{display:"none"},"& + span":{color:e.colorTextDisabled},[`&${a}-indeterminate ${a}-inner::after`]:{background:e.colorTextDisabled}}}]};function $e(e,a){const n=oe(a,{checkboxCls:`.${e}`,checkboxSize:a.controlInteractiveSize});return[Ce(n)]}const L=re("Checkbox",(e,a)=>{let{prefixCls:n}=a;return[$e(n,e)]}),ye=()=>({name:String,prefixCls:String,options:j([]),disabled:Boolean,id:String}),Se=()=>s(s({},ye()),{defaultValue:j(),value:j(),onChange:w(),"onUpdate:value":w()}),we=()=>({prefixCls:String,defaultChecked:m(),checked:m(),disabled:m(),isGroup:m(),value:ie.any,name:String,id:String,indeterminate:m(),type:se("checkbox"),autofocus:m(),onChange:w(),"onUpdate:checked":w(),onClick:w(),skipGroup:m(!1)}),Ie=()=>s(s({},we()),{indeterminate:m(!1)}),q=Symbol("CheckboxGroupContext");var W=function(e,a){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var d=0,t=Object.getOwnPropertySymbols(e);d<t.length;d++)a.indexOf(t[d])<0&&Object.prototype.propertyIsEnumerable.call(e,t[d])&&(n[t[d]]=e[t[d]]);return n};const k=X({compatConfig:{MODE:3},name:"ACheckbox",inheritAttrs:!1,__ANT_CHECKBOX:!0,props:Ie(),setup(e,a){let{emit:n,attrs:t,slots:d,expose:G}=a;const C=J(),P=ge.useInject(),{prefixCls:u,direction:p,disabled:V}=K("checkbox",e),T=ce(),[b,f]=L(u),l=de(q,void 0),g=Symbol("checkboxUniId"),O=y(()=>(l==null?void 0:l.disabled.value)||V.value);ue(()=>{!e.skipGroup&&l&&l.registerValue(g,e.value)}),be(()=>{l&&l.cancelValue(g)}),ve(()=>{he(!!(e.checked!==void 0||l||e.value===void 0))});const B=r=>{const c=r.target.checked;n("update:checked",c),n("change",r),C.onFieldChange()},x=S();return G({focus:()=>{var r;(r=x.value)===null||r===void 0||r.focus()},blur:()=>{var r;(r=x.value)===null||r===void 0||r.blur()}}),()=>{var r;const c=fe((r=d.default)===null||r===void 0?void 0:r.call(d)),{indeterminate:i,skipGroup:v,id:F=C.id.value}=e,z=W(e,["indeterminate","skipGroup","id"]),{onMouseenter:E,onMouseleave:$,onInput:ke,class:Y,style:Z}=t,ee=W(t,["onMouseenter","onMouseleave","onInput","class","style"]),h=s(s(s(s({},z),{id:F,prefixCls:u.value}),ee),{disabled:O.value});l&&!v?(h.onChange=function(){for(var H=arguments.length,R=new Array(H),M=0;M<H;M++)R[M]=arguments[M];n("change",...R),l.toggleOption({label:c,value:e.value})},h.name=l.name.value,h.checked=l.mergedValue.value.includes(e.value),h.disabled=O.value||T.value,h.indeterminate=i):h.onChange=B;const ae=N({[`${u.value}-wrapper`]:!0,[`${u.value}-rtl`]:p.value==="rtl",[`${u.value}-wrapper-checked`]:h.checked,[`${u.value}-wrapper-disabled`]:h.disabled,[`${u.value}-wrapper-in-form-item`]:P.isFormItemInput},Y,f.value),ne=N({[`${u.value}-indeterminate`]:i},f.value);return b(I("label",{class:ae,style:Z,onMouseenter:E,onMouseleave:$},[I(pe,D(D({"aria-checked":i?"mixed":void 0},h),{},{class:ne,ref:x}),null),c.length?I("span",null,[c]):null]))}}}),A=X({compatConfig:{MODE:3},name:"ACheckboxGroup",inheritAttrs:!1,props:Se(),setup(e,a){let{slots:n,attrs:t,emit:d,expose:G}=a;const C=J(),{prefixCls:P,direction:u}=K("checkbox",e),p=y(()=>`${P.value}-group`),[V,T]=L(p),b=S((e.value===void 0?e.defaultValue:e.value)||[]);U(()=>e.value,()=>{b.value=e.value||[]});const f=y(()=>e.options.map(o=>typeof o=="string"||typeof o=="number"?{label:o,value:o}:o)),l=S(Symbol()),g=S(new Map),O=o=>{g.value.delete(o),l.value=Symbol()},B=(o,r)=>{g.value.set(o,r),l.value=Symbol()},x=S(new Map);return U(l,()=>{const o=new Map;for(const r of g.value.values())o.set(r,!0);x.value=o}),me(q,{cancelValue:O,registerValue:B,toggleOption:o=>{const r=b.value.indexOf(o.value),c=[...b.value];r===-1?c.push(o.value):c.splice(r,1),e.value===void 0&&(b.value=c);const i=c.filter(v=>x.value.has(v)).sort((v,F)=>{const z=f.value.findIndex($=>$.value===v),E=f.value.findIndex($=>$.value===F);return z-E});d("update:value",i),d("change",i),C.onFieldChange()},mergedValue:b,name:y(()=>e.name),disabled:y(()=>e.disabled)}),G({mergedValue:b}),()=>{var o;const{id:r=C.id.value}=e;let c=null;return f.value&&f.value.length>0&&(c=f.value.map(i=>{var v;return I(k,{prefixCls:P.value,key:i.value.toString(),disabled:"disabled"in i?i.disabled:e.disabled,indeterminate:i.indeterminate,value:i.value,checked:b.value.indexOf(i.value)!==-1,onChange:i.onChange,class:`${p.value}-item`},{default:()=>[n.label!==void 0?(v=n.label)===null||v===void 0?void 0:v.call(n,i):i.label]})})),V(I("div",D(D({},t),{},{class:[p.value,{[`${p.value}-rtl`]:u.value==="rtl"},t.class,T.value],id:r}),[c||((o=n.default)===null||o===void 0?void 0:o.call(n))]))}}});k.Group=A;k.install=function(e){return e.component(k.name,k),e.component(A.name,A),e};export{k as C};
