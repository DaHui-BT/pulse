function M(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var w={exports:{}};(function(s,g){(function(y){s.exports=y()})(function(y){var b=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function o(i,f){var r=i[0],t=i[1],n=i[2],e=i[3];r+=(t&n|~t&e)+f[0]-680876936|0,r=(r<<7|r>>>25)+t|0,e+=(r&t|~r&n)+f[1]-389564586|0,e=(e<<12|e>>>20)+r|0,n+=(e&r|~e&t)+f[2]+606105819|0,n=(n<<17|n>>>15)+e|0,t+=(n&e|~n&r)+f[3]-1044525330|0,t=(t<<22|t>>>10)+n|0,r+=(t&n|~t&e)+f[4]-176418897|0,r=(r<<7|r>>>25)+t|0,e+=(r&t|~r&n)+f[5]+1200080426|0,e=(e<<12|e>>>20)+r|0,n+=(e&r|~e&t)+f[6]-1473231341|0,n=(n<<17|n>>>15)+e|0,t+=(n&e|~n&r)+f[7]-45705983|0,t=(t<<22|t>>>10)+n|0,r+=(t&n|~t&e)+f[8]+1770035416|0,r=(r<<7|r>>>25)+t|0,e+=(r&t|~r&n)+f[9]-1958414417|0,e=(e<<12|e>>>20)+r|0,n+=(e&r|~e&t)+f[10]-42063|0,n=(n<<17|n>>>15)+e|0,t+=(n&e|~n&r)+f[11]-1990404162|0,t=(t<<22|t>>>10)+n|0,r+=(t&n|~t&e)+f[12]+1804603682|0,r=(r<<7|r>>>25)+t|0,e+=(r&t|~r&n)+f[13]-40341101|0,e=(e<<12|e>>>20)+r|0,n+=(e&r|~e&t)+f[14]-1502002290|0,n=(n<<17|n>>>15)+e|0,t+=(n&e|~n&r)+f[15]+1236535329|0,t=(t<<22|t>>>10)+n|0,r+=(t&e|n&~e)+f[1]-165796510|0,r=(r<<5|r>>>27)+t|0,e+=(r&n|t&~n)+f[6]-1069501632|0,e=(e<<9|e>>>23)+r|0,n+=(e&t|r&~t)+f[11]+643717713|0,n=(n<<14|n>>>18)+e|0,t+=(n&r|e&~r)+f[0]-373897302|0,t=(t<<20|t>>>12)+n|0,r+=(t&e|n&~e)+f[5]-701558691|0,r=(r<<5|r>>>27)+t|0,e+=(r&n|t&~n)+f[10]+38016083|0,e=(e<<9|e>>>23)+r|0,n+=(e&t|r&~t)+f[15]-660478335|0,n=(n<<14|n>>>18)+e|0,t+=(n&r|e&~r)+f[4]-405537848|0,t=(t<<20|t>>>12)+n|0,r+=(t&e|n&~e)+f[9]+568446438|0,r=(r<<5|r>>>27)+t|0,e+=(r&n|t&~n)+f[14]-1019803690|0,e=(e<<9|e>>>23)+r|0,n+=(e&t|r&~t)+f[3]-187363961|0,n=(n<<14|n>>>18)+e|0,t+=(n&r|e&~r)+f[8]+1163531501|0,t=(t<<20|t>>>12)+n|0,r+=(t&e|n&~e)+f[13]-1444681467|0,r=(r<<5|r>>>27)+t|0,e+=(r&n|t&~n)+f[2]-51403784|0,e=(e<<9|e>>>23)+r|0,n+=(e&t|r&~t)+f[7]+1735328473|0,n=(n<<14|n>>>18)+e|0,t+=(n&r|e&~r)+f[12]-1926607734|0,t=(t<<20|t>>>12)+n|0,r+=(t^n^e)+f[5]-378558|0,r=(r<<4|r>>>28)+t|0,e+=(r^t^n)+f[8]-2022574463|0,e=(e<<11|e>>>21)+r|0,n+=(e^r^t)+f[11]+1839030562|0,n=(n<<16|n>>>16)+e|0,t+=(n^e^r)+f[14]-35309556|0,t=(t<<23|t>>>9)+n|0,r+=(t^n^e)+f[1]-1530992060|0,r=(r<<4|r>>>28)+t|0,e+=(r^t^n)+f[4]+1272893353|0,e=(e<<11|e>>>21)+r|0,n+=(e^r^t)+f[7]-155497632|0,n=(n<<16|n>>>16)+e|0,t+=(n^e^r)+f[10]-1094730640|0,t=(t<<23|t>>>9)+n|0,r+=(t^n^e)+f[13]+681279174|0,r=(r<<4|r>>>28)+t|0,e+=(r^t^n)+f[0]-358537222|0,e=(e<<11|e>>>21)+r|0,n+=(e^r^t)+f[3]-722521979|0,n=(n<<16|n>>>16)+e|0,t+=(n^e^r)+f[6]+76029189|0,t=(t<<23|t>>>9)+n|0,r+=(t^n^e)+f[9]-640364487|0,r=(r<<4|r>>>28)+t|0,e+=(r^t^n)+f[12]-421815835|0,e=(e<<11|e>>>21)+r|0,n+=(e^r^t)+f[15]+530742520|0,n=(n<<16|n>>>16)+e|0,t+=(n^e^r)+f[2]-995338651|0,t=(t<<23|t>>>9)+n|0,r+=(n^(t|~e))+f[0]-198630844|0,r=(r<<6|r>>>26)+t|0,e+=(t^(r|~n))+f[7]+1126891415|0,e=(e<<10|e>>>22)+r|0,n+=(r^(e|~t))+f[14]-1416354905|0,n=(n<<15|n>>>17)+e|0,t+=(e^(n|~r))+f[5]-57434055|0,t=(t<<21|t>>>11)+n|0,r+=(n^(t|~e))+f[12]+1700485571|0,r=(r<<6|r>>>26)+t|0,e+=(t^(r|~n))+f[3]-1894986606|0,e=(e<<10|e>>>22)+r|0,n+=(r^(e|~t))+f[10]-1051523|0,n=(n<<15|n>>>17)+e|0,t+=(e^(n|~r))+f[1]-2054922799|0,t=(t<<21|t>>>11)+n|0,r+=(n^(t|~e))+f[8]+1873313359|0,r=(r<<6|r>>>26)+t|0,e+=(t^(r|~n))+f[15]-30611744|0,e=(e<<10|e>>>22)+r|0,n+=(r^(e|~t))+f[6]-1560198380|0,n=(n<<15|n>>>17)+e|0,t+=(e^(n|~r))+f[13]+1309151649|0,t=(t<<21|t>>>11)+n|0,r+=(n^(t|~e))+f[4]-145523070|0,r=(r<<6|r>>>26)+t|0,e+=(t^(r|~n))+f[11]-1120210379|0,e=(e<<10|e>>>22)+r|0,n+=(r^(e|~t))+f[2]+718787259|0,n=(n<<15|n>>>17)+e|0,t+=(e^(n|~r))+f[9]-343485551|0,t=(t<<21|t>>>11)+n|0,i[0]=r+i[0]|0,i[1]=t+i[1]|0,i[2]=n+i[2]|0,i[3]=e+i[3]|0}function d(i){var f=[],r;for(r=0;r<64;r+=4)f[r>>2]=i.charCodeAt(r)+(i.charCodeAt(r+1)<<8)+(i.charCodeAt(r+2)<<16)+(i.charCodeAt(r+3)<<24);return f}function c(i){var f=[],r;for(r=0;r<64;r+=4)f[r>>2]=i[r]+(i[r+1]<<8)+(i[r+2]<<16)+(i[r+3]<<24);return f}function A(i){var f=i.length,r=[1732584193,-271733879,-1732584194,271733878],t,n,e,a,u,p;for(t=64;t<=f;t+=64)o(r,d(i.substring(t-64,t)));for(i=i.substring(t-64),n=i.length,e=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;t<n;t+=1)e[t>>2]|=i.charCodeAt(t)<<(t%4<<3);if(e[t>>2]|=128<<(t%4<<3),t>55)for(o(r,e),t=0;t<16;t+=1)e[t]=0;return a=f*8,a=a.toString(16).match(/(.*?)(.{0,8})$/),u=parseInt(a[2],16),p=parseInt(a[1],16)||0,e[14]=u,e[15]=p,o(r,e),r}function v(i){var f=i.length,r=[1732584193,-271733879,-1732584194,271733878],t,n,e,a,u,p;for(t=64;t<=f;t+=64)o(r,c(i.subarray(t-64,t)));for(i=t-64<f?i.subarray(t-64):new Uint8Array(0),n=i.length,e=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;t<n;t+=1)e[t>>2]|=i[t]<<(t%4<<3);if(e[t>>2]|=128<<(t%4<<3),t>55)for(o(r,e),t=0;t<16;t+=1)e[t]=0;return a=f*8,a=a.toString(16).match(/(.*?)(.{0,8})$/),u=parseInt(a[2],16),p=parseInt(a[1],16)||0,e[14]=u,e[15]=p,o(r,e),r}function S(i){var f="",r;for(r=0;r<4;r+=1)f+=b[i>>r*8+4&15]+b[i>>r*8&15];return f}function l(i){var f;for(f=0;f<i.length;f+=1)i[f]=S(i[f]);return i.join("")}l(A("hello")),typeof ArrayBuffer<"u"&&!ArrayBuffer.prototype.slice&&function(){function i(f,r){return f=f|0||0,f<0?Math.max(f+r,0):Math.min(f,r)}ArrayBuffer.prototype.slice=function(f,r){var t=this.byteLength,n=i(f,t),e=t,a,u,p,B;return r!==y&&(e=i(r,t)),n>e?new ArrayBuffer(0):(a=e-n,u=new ArrayBuffer(a),p=new Uint8Array(u),B=new Uint8Array(this,n,a),p.set(B),u)}}();function m(i){return/[\u0080-\uFFFF]/.test(i)&&(i=unescape(encodeURIComponent(i))),i}function U(i,f){var r=i.length,t=new ArrayBuffer(r),n=new Uint8Array(t),e;for(e=0;e<r;e+=1)n[e]=i.charCodeAt(e);return f?n:t}function C(i){return String.fromCharCode.apply(null,new Uint8Array(i))}function I(i,f,r){var t=new Uint8Array(i.byteLength+f.byteLength);return t.set(new Uint8Array(i)),t.set(new Uint8Array(f),i.byteLength),t}function _(i){var f=[],r=i.length,t;for(t=0;t<r-1;t+=2)f.push(parseInt(i.substr(t,2),16));return String.fromCharCode.apply(String,f)}function h(){this.reset()}return h.prototype.append=function(i){return this.appendBinary(m(i)),this},h.prototype.appendBinary=function(i){this._buff+=i,this._length+=i.length;var f=this._buff.length,r;for(r=64;r<=f;r+=64)o(this._hash,d(this._buff.substring(r-64,r)));return this._buff=this._buff.substring(r-64),this},h.prototype.end=function(i){var f=this._buff,r=f.length,t,n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],e;for(t=0;t<r;t+=1)n[t>>2]|=f.charCodeAt(t)<<(t%4<<3);return this._finish(n,r),e=l(this._hash),i&&(e=_(e)),this.reset(),e},h.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},h.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash.slice()}},h.prototype.setState=function(i){return this._buff=i.buff,this._length=i.length,this._hash=i.hash,this},h.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},h.prototype._finish=function(i,f){var r=f,t,n,e;if(i[r>>2]|=128<<(r%4<<3),r>55)for(o(this._hash,i),r=0;r<16;r+=1)i[r]=0;t=this._length*8,t=t.toString(16).match(/(.*?)(.{0,8})$/),n=parseInt(t[2],16),e=parseInt(t[1],16)||0,i[14]=n,i[15]=e,o(this._hash,i)},h.hash=function(i,f){return h.hashBinary(m(i),f)},h.hashBinary=function(i,f){var r=A(i),t=l(r);return f?_(t):t},h.ArrayBuffer=function(){this.reset()},h.ArrayBuffer.prototype.append=function(i){var f=I(this._buff.buffer,i),r=f.length,t;for(this._length+=i.byteLength,t=64;t<=r;t+=64)o(this._hash,c(f.subarray(t-64,t)));return this._buff=t-64<r?new Uint8Array(f.buffer.slice(t-64)):new Uint8Array(0),this},h.ArrayBuffer.prototype.end=function(i){var f=this._buff,r=f.length,t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n,e;for(n=0;n<r;n+=1)t[n>>2]|=f[n]<<(n%4<<3);return this._finish(t,r),e=l(this._hash),i&&(e=_(e)),this.reset(),e},h.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},h.ArrayBuffer.prototype.getState=function(){var i=h.prototype.getState.call(this);return i.buff=C(i.buff),i},h.ArrayBuffer.prototype.setState=function(i){return i.buff=U(i.buff,!0),h.prototype.setState.call(this,i)},h.ArrayBuffer.prototype.destroy=h.prototype.destroy,h.ArrayBuffer.prototype._finish=h.prototype._finish,h.ArrayBuffer.hash=function(i,f){var r=v(new Uint8Array(i)),t=l(r);return f?_(t):t},h})})(w);var F=w.exports,L=M(F);self.onmessage=async s=>{try{const g=await Promise.all(s.data.chunks.map(y=>new Promise(b=>{const o=new FileReader;o.onload=d=>{const c=new L.ArrayBuffer;c.append(d.target.result),b(c.end())},o.readAsArrayBuffer(y)})));self.postMessage({hashes:g})}catch(g){self.postMessage({error:g.message})}};
