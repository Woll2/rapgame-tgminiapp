import{r as p,a as v,u as N,b,T as j,R,c as g}from"./vendor-DChpyMoD.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function a(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerPolicy&&(e.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?e.credentials="include":r.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function t(r){if(r.ep)return;r.ep=!0;const e=a(r);fetch(r.href,e)}})();var f={exports:{}},u={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var T=p,O=Symbol.for("react.element"),_=Symbol.for("react.fragment"),E=Object.prototype.hasOwnProperty,P=T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,A={key:!0,ref:!0,__self:!0,__source:!0};function h(c,n,a){var t,r={},e=null,s=null;a!==void 0&&(e=""+a),n.key!==void 0&&(e=""+n.key),n.ref!==void 0&&(s=n.ref);for(t in n)E.call(n,t)&&!A.hasOwnProperty(t)&&(r[t]=n[t]);if(c&&c.defaultProps)for(t in n=c.defaultProps,n)r[t]===void 0&&(r[t]=n[t]);return{$$typeof:O,type:c,key:e,ref:s,props:r,_owner:P.current}}u.Fragment=_;u.jsx=h;u.jsxs=h;f.exports=u;var o=f.exports,d={},m=v;d.createRoot=m.createRoot,d.hydrateRoot=m.hydrateRoot;function y(){const c=N(),n=b();return{connected:!!(n!=null&&n.account.address),wallet:n,connector:c}}function w(){const{connector:c}=y(),n="EQDBziMwzxZBqZ0nvyuLdR0-6DUqcNTVCJAMjqQ-Y5dbGLAO",a=e=>e>=.5&&e<=1e3,t=e=>e;return{buy:async e=>{if(!a(e))throw new Error("Invalid purchase amount");try{const s=e*1e9,l=await c.sendTransaction({validUntil:Math.floor(Date.now()/1e3)+600,messages:[{address:n,amount:s.toString()}]});return{tokenAmount:t(e),transaction:l}}catch(s){throw console.error("Error buying tokens:",s),s}},calculateTokenAmount:t,validatePurchaseAmount:a}}function S(){const{connected:c}=y(),{tonBalance:n,buyTokens:a}=w(),[t,r]=p.useState(""),e=x=>{const i=x.target.value;(i===""||Number(i)>=.5&&Number(i)<=1e3)&&r(i)},s=async()=>{t&&(await a(t),r(""))},l=t?Number(t):0;return o.jsxs("div",{className:"container",children:[o.jsx("img",{src:"/icon.png",alt:"RAP Token",className:"logo"}),o.jsxs("div",{className:"card",children:[o.jsxs("div",{className:"card-header",children:[o.jsx("h1",{children:"RAP Token Presale"}),o.jsxs("p",{className:"balance",children:["Balance: ",n," TON"]})]}),o.jsxs("div",{className:"input-group",children:[o.jsx("input",{type:"number",value:t,onChange:e,placeholder:"Enter amount (0.5 - 1000 TON)",min:"0.5",max:"1000",step:"0.1"}),o.jsx("span",{className:"currency",children:"TON"})]}),o.jsxs("div",{className:"info",children:[o.jsxs("p",{children:["You will receive: ",l," RAP"]}),o.jsx("p",{children:"Rate: 1 TON = 1 RAP"})]}),o.jsx("div",{className:"buttons",children:c?o.jsx("button",{className:"buy-button",onClick:s,disabled:!t||Number(t)<.5||Number(t)>1e3,children:"Buy RAP Tokens"}):o.jsx(j,{})})]})]})}const L="https://raw.githubusercontent.com/Woll2/rapgame-tgminiapp/main/tonconnect-manifest.json";d.createRoot(document.getElementById("root")).render(o.jsx(R.StrictMode,{children:o.jsx(g,{manifestUrl:L,children:o.jsx(S,{})})}));