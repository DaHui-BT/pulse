import{cG as u,g as h,cH as d,cI as m}from"./index-Cw1nvzea.js";import{g as c,e as p}from"./index-B0Q6PG73.js";function v(n,e,t){switch(t.length){case 0:return n.call(e);case 1:return n.call(e,t[0]);case 2:return n.call(e,t[0],t[1]);case 3:return n.call(e,t[0],t[1],t[2])}return n.apply(e,t)}var g=800,b=16,y=Date.now;function S(n){var e=0,t=0;return function(){var a=y(),r=b-(a-t);if(t=a,r>0){if(++e>=g)return arguments[0]}else e=0;return n.apply(void 0,arguments)}}function w(n){return function(){return n}}var x=c?function(n,e){return c(n,"toString",{configurable:!0,enumerable:!1,value:w(e),writable:!0})}:p,T=S(x),f=Math.max;function O(n,e,t){return e=f(e===void 0?n.length-1:e,0),function(){for(var a=arguments,r=-1,l=f(a.length-e,0),o=Array(l);++r<l;)o[r]=a[e+r];r=-1;for(var i=Array(e+1);++r<e;)i[r]=a[r];return i[e]=t(o),v(n,this,i)}}var s=u?u.isConcatSpreadable:void 0;function C(n){return h(n)||d(n)||!!(s&&n&&n[s])}function H(n,e,t,a,r){var l=-1,o=n.length;for(t||(t=C),r||(r=[]);++l<o;){var i=n[l];t(i)?m(r,i):r[r.length]=i}return r}function N(n){var e=n==null?0:n.length;return e?H(n):[]}function F(n){return T(O(n,void 0,N),n+"")}export{F as f,O as o,T as s};