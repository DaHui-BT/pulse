import{ae as r,k as m,d as C,o as p,b7 as y,c as O,a as i,W as P}from"./index-CorvJS88.js";import{c as R,B as x}from"./index-CMYvEKCm.js";const A=()=>{const n=r(!1);return m(()=>{n.value=!0}),n},D={type:{type:String},actionFn:Function,close:Function,autofocus:Boolean,prefixCls:String,buttonProps:P(),emitEvent:Boolean,quitOnNullishReturnValue:Boolean};function d(n){return!!(n&&n.then)}const T=C({compatConfig:{MODE:3},name:"ActionButton",props:D,setup(n,g){let{slots:B}=g;const a=r(!1),c=r(),l=r(!1);let f;const v=A();p(()=>{n.autofocus&&(f=setTimeout(()=>{var e,t;return(t=(e=y(c.value))===null||e===void 0?void 0:e.focus)===null||t===void 0?void 0:t.call(e)}))}),m(()=>{clearTimeout(f)});const u=function(){for(var e,t=arguments.length,o=new Array(t),s=0;s<t;s++)o[s]=arguments[s];(e=n.close)===null||e===void 0||e.call(n,...o)},b=e=>{d(e)&&(l.value=!0,e.then(function(){v.value||(l.value=!1),u(...arguments),a.value=!1},t=>(v.value||(l.value=!1),a.value=!1,Promise.reject(t))))},h=e=>{const{actionFn:t}=n;if(a.value)return;if(a.value=!0,!t){u();return}let o;if(n.emitEvent){if(o=t(e),n.quitOnNullishReturnValue&&!d(o)){a.value=!1,u(e);return}}else if(t.length)o=t(n.close),a.value=!1;else if(o=t(),!o){u();return}b(o)};return()=>{const{type:e,prefixCls:t,buttonProps:o}=n;return O(x,i(i(i({},R(e)),{},{onClick:h,loading:l.value,prefixCls:t},o),{},{ref:c}),B)}}});export{T as A,A as u};
