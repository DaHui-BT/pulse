import{cE as u,j as h,cF as d,cG as m}from"./index-DkCCnXu_.js";import{g as c,e as p}from"./index-Br9fc7u-.js";function v(n,e,t){switch(t.length){case 0:return n.call(e);case 1:return n.call(e,t[0]);case 2:return n.call(e,t[0],t[1]);case 3:return n.call(e,t[0],t[1],t[2])}return n.apply(e,t)}var b=800,g=16,y=Date.now;function S(n){var e=0,t=0;return function(){var a=y(),r=g-(a-t);if(t=a,r>0){if(++e>=b)return arguments[0]}else e=0;return n.apply(void 0,arguments)}}function w(n){return function(){return n}}var x=c?function(n,e){return c(n,"toString",{configurable:!0,enumerable:!1,value:w(e),writable:!0})}:p,T=S(x),f=Math.max;function O(n,e,t){return e=f(e===void 0?n.length-1:e,0),function(){for(var a=arguments,r=-1,l=f(a.length-e,0),o=Array(l);++r<l;)o[r]=a[e+r];r=-1;for(var i=Array(e+1);++r<e;)i[r]=a[r];return i[e]=t(o),v(n,this,i)}}var s=u?u.isConcatSpreadable:void 0;function C(n){return h(n)||d(n)||!!(s&&n&&n[s])}function F(n,e,t,a,r){var l=-1,o=n.length;for(t||(t=C),r||(r=[]);++l<o;){var i=n[l];t(i)?m(r,i):r[r.length]=i}return r}function N(n){var e=n==null?0:n.length;return e?F(n):[]}function H(n){return T(O(n,void 0,N),n+"")}export{H as f,O as o,T as s};
