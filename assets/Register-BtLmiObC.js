import{d as F,r as P,x as k,o as L,c as h,b as s,w as r,e as l,f as m,bc as B,cn as C,as as u,au as E,co as A,B as R,_ as S,h as q}from"./index-DSrgw8bu.js";import{U as z,_ as I}from"./UserService-1fW45TQ6.js";import{G as N}from"./Glassmorphism-B2mzp_Zb.js";import{L as _,F as V}from"./loading-Bqiq6PQU.js";import{L as Z}from"./Link-CmOmZyo8.js";import"./request-D32JP-Lw.js";import"./_flatRest-Btdtf1cq.js";import"./transButton-DuFpIIav.js";const G={class:"register"},T=F({__name:"Register",setup(j){const f=B(),p=z.getInstance(),o=P({email:"",username:"",password:""}),g=t=>{_.show(),p.register(t.username,t.email,t.password).then(e=>{e.success?setTimeout(()=>{f.push({path:"/login"})},C):u.error(e.error),_.hide()})},c=t=>{for(let e of t.errorFields)for(let n of e.errors)u.error(n)},w=k(()=>!(o.email&&o.password));function v(){o.email.length==0?u.error("Please input your email first"):p.resendConfirmationEmail(o.email)}return(t,e)=>{const n=E,i=I,x=A,y=R,d=Z,b=S,U=V;return L(),h("div",G,[s(N,{opacity:.6,"border-radius":5},{default:r(()=>[s(U,{model:o,name:"normal_register",class:"register-form",onFinish:g,onFinishFailed:c},{default:r(()=>[e[9]||(e[9]=l("h2",{class:"register-form-title"},"Sign up",-1)),s(i,{name:"username",rules:[{required:!0,message:"Please input your username!"},{min:3,message:"Username length must large than 3"},{max:16,message:"Username length must less than 16"}]},{default:r(()=>[s(n,{value:o.username,"onUpdate:value":e[0]||(e[0]=a=>o.username=a),placeholder:"Username"},{prefix:r(()=>e[3]||(e[3]=[l("i",{class:"iconfont"},"",-1)])),_:1},8,["value"])]),_:1}),s(i,{name:"email",rules:[{required:!0,message:"Please input your email!"},{pattern:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,message:"Email address format not correct"}]},{default:r(()=>[s(n,{value:o.email,"onUpdate:value":e[1]||(e[1]=a=>o.email=a),placeholder:"Email"},{prefix:r(()=>e[4]||(e[4]=[l("i",{class:"iconfont"},"",-1)])),_:1},8,["value"])]),_:1}),s(i,{name:"password",rules:[{required:!0,message:"Please input your password!"},{min:8,max:32,message:"Password should in range of (8, 32)"}]},{default:r(()=>[s(x,{value:o.password,"onUpdate:value":e[2]||(e[2]=a=>o.password=a),placeholder:"Password"},{prefix:r(()=>e[5]||(e[5]=[l("i",{class:"iconfont"},"",-1)])),_:1},8,["value"])]),_:1}),s(i,null,{default:r(()=>[s(y,{disabled:w.value,type:"primary","html-type":"submit",class:"register-form-button"},{default:r(()=>e[6]||(e[6]=[m(" Sign up ")])),_:1},8,["disabled"]),s(b,{justify:"space-between"},{default:r(()=>[s(d,{href:"#/login"},{default:r(()=>e[7]||(e[7]=[m("Login now!")])),_:1}),s(d,{type:"link",onClick:v},{default:r(()=>e[8]||(e[8]=[m("Resend confirm email")])),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})])}}}),Q=q(T,[["__scopeId","data-v-00b15951"]]);export{Q as default};
