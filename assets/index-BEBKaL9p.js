import{d as k,U as K,cc as L,c as i,r as G,h as M,e as U,_ as m,aK as W,b as p,aa as q,n as I,cd as z,P as j,az as B,N as H}from"./index-C65JRPnL.js";import{d as J}from"./index-Dt6m71WR.js";const Q={small:8,middle:16,large:24},X=()=>({prefixCls:String,size:{type:[String,Number,Array]},direction:j.oneOf(B("horizontal","vertical")).def("horizontal"),align:j.oneOf(B("start","end","center","baseline")),wrap:H()});function Y(e){return typeof e=="string"?Q[e]:e||0}const d=k({compatConfig:{MODE:3},name:"ASpace",inheritAttrs:!1,props:X(),slots:Object,setup(e,F){let{slots:o,attrs:f}=F;const{prefixCls:l,space:g,direction:h}=K("space",e),[P,D]=L(l),x=J(),n=i(()=>{var a,t,s;return(s=(a=e.size)!==null&&a!==void 0?a:(t=g==null?void 0:g.value)===null||t===void 0?void 0:t.size)!==null&&s!==void 0?s:"small"}),y=G(),r=G();M(n,()=>{[y.value,r.value]=(Array.isArray(n.value)?n.value:[n.value,n.value]).map(a=>Y(a))},{immediate:!0});const b=i(()=>e.align===void 0&&e.direction==="horizontal"?"center":e.align),E=i(()=>U(l.value,D.value,`${l.value}-${e.direction}`,{[`${l.value}-rtl`]:h.value==="rtl",[`${l.value}-align-${b.value}`]:b.value})),R=i(()=>h.value==="rtl"?"marginLeft":"marginRight"),T=i(()=>{const a={};return x.value&&(a.columnGap=`${y.value}px`,a.rowGap=`${r.value}px`),m(m({},a),e.wrap&&{flexWrap:"wrap",marginBottom:`${-r.value}px`})});return()=>{var a,t;const{wrap:s,direction:V="horizontal"}=e,C=(a=o.default)===null||a===void 0?void 0:a.call(o),_=W(C),w=_.length;if(w===0)return null;const c=(t=o.split)===null||t===void 0?void 0:t.call(o),A=`${l.value}-item`,N=y.value,S=w-1;return p("div",I(I({},f),{},{class:[E.value,f.class],style:[T.value,f.style]}),[_.map((O,u)=>{let $=C.indexOf(O);$===-1&&($=`$$space-${u}`);let v={};return x.value||(V==="vertical"?u<S&&(v={marginBottom:`${N/(c?2:1)}px`}):v=m(m({},u<S&&{[R.value]:`${N/(c?2:1)}px`}),s&&{paddingBottom:`${r.value}px`})),P(p(q,{key:$},[p("div",{class:A,style:v},[O]),u<S&&c&&p("span",{class:`${A}-split`,style:v},[c])]))})])}}});d.Compact=z;d.install=function(e){return e.component(d.name,d),e.component(z.name,z),e};export{d as S};
