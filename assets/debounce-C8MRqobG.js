import{i as v,ce as L}from"./index-Bkva_4QA.js";import{i as M}from"./isSymbol-LHpKateK.js";var N=/\s/;function B(e){for(var r=e.length;r--&&N.test(e.charAt(r)););return r}var R=/^\s+/;function $(e){return e&&e.slice(0,B(e)+1).replace(R,"")}var k=NaN,F=/^[-+]0x[0-9a-f]+$/i,_=/^0b[01]+$/i,j=/^0o[0-7]+$/i,D=parseInt;function S(e){if(typeof e=="number")return e;if(M(e))return k;if(v(e)){var r=typeof e.valueOf=="function"?e.valueOf():e;e=v(r)?r+"":r}if(typeof e!="string")return e===0?e:+e;e=$(e);var t=_.test(e);return t||j.test(e)?D(e.slice(2),t?2:8):F.test(e)?k:+e}var h=function(){return L.Date.now()},H="Expected a function",P=Math.max,U=Math.min;function z(e,r,t){var u,c,l,s,i,f,o=0,p=!1,d=!1,T=!0;if(typeof e!="function")throw new TypeError(H);r=S(r)||0,v(t)&&(p=!!t.leading,d="maxWait"in t,l=d?P(S(t.maxWait)||0,r):l,T="trailing"in t?!!t.trailing:T);function x(n){var a=u,m=c;return u=c=void 0,o=n,s=e.apply(m,a),s}function W(n){return o=n,i=setTimeout(g,r),p?x(n):s}function O(n){var a=n-f,m=n-o,E=r-a;return d?U(E,l-m):E}function y(n){var a=n-f,m=n-o;return f===void 0||a>=r||a<0||d&&m>=l}function g(){var n=h();if(y(n))return b(n);i=setTimeout(g,O(n))}function b(n){return i=void 0,T&&u?x(n):(u=c=void 0,s)}function A(){i!==void 0&&clearTimeout(i),o=0,u=f=c=i=void 0}function C(){return i===void 0?s:b(h())}function I(){var n=h(),a=y(n);if(u=arguments,c=this,f=n,a){if(i===void 0)return W(f);if(d)return clearTimeout(i),i=setTimeout(g,r),x(f)}return i===void 0&&(i=setTimeout(g,r)),s}return I.cancel=A,I.flush=C,I}export{z as d,S as t};
