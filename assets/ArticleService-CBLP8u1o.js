var l=Object.defineProperty;var o=(c,e,t)=>e in c?l(c,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):c[e]=t;var r=(c,e,t)=>o(c,typeof e!="symbol"?e+"":e,t);import{ag as d}from"./index-YXsaEbfY.js";const s=class s{constructor(){r(this,"collection","article");r(this,"db");this.db=d.getInstance({appId:"pulse-application-tpfmdtx",cluster:"mongodb-atlas",database:"pulse-database",collection:"article"})}static getInstance(){return s.instance||(s.instance=new s),s.instance}async findArticleById(e){try{return{success:!0,data:await this.db.findOne(this.collection,{_id:e})}}catch(t){return{success:!1,error:t.message}}}async findArticles(e={},t={page:0,pageSize:10}){try{const[a,n]=await Promise.all([this.db.find(this.collection,e,t),this.db.count(this.collection,e)]);return{success:!0,data:{articles:a,total:Math.ceil(n/t.pageSize)}}}catch(a){return{success:!1,error:a.message}}}async createArticle(e){try{return{success:!0,data:await this.db.insertOne(this.collection,{...e,isDeleted:!1})}}catch(t){return{success:!1,error:t.message}}}async updateArticle(e,t){try{return{success:!0,data:await this.db.updateOne(this.collection,{_id:e},t)}}catch(a){return{success:!1,error:a.message}}}async deleteById(e){try{return{success:!0,data:this.db.updateOne(this.collection,{_id:e},{isDeleted:!0})}}catch(t){return{success:!1,error:t.message}}}};r(s,"instance");let i=s;export{i as A};