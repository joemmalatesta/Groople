var d="@vercel/analytics",s="1.0.1",l=()=>{window.va||(window.va=function(...n){(window.vaq=window.vaq||[]).push(n)})};function a(){return typeof window<"u"}function f(){try{const e="production"}catch{}return"production"}function v(e="auto"){if(e==="auto"){window.vam=f();return}window.vam=e}function u(){return window.vam||"production"}function w(){return u()==="production"}function i(){return u()==="development"}function p(e,{[e]:n,...r}){return r}function b(e,n){let r=e;const t=[];for(const[o,c]of Object.entries(e))typeof c=="object"&&c!==null&&(n.strip?r=p(o,r):t.push(o));if(t.length>0&&!n.strip)throw Error(`The following properties are not valid: ${t.join(", ")}. Only strings, numbers, booleans, and null are allowed.`);return r}function m(e={debug:!0}){var n;if(!a())return;v(e.mode),l(),e.beforeSend&&((n=window.va)==null||n.call(window,"beforeSend",e.beforeSend));const r=i()?"https://va.vercel-scripts.com/v1/script.debug.js":"/_vercel/insights/script.js";if(document.head.querySelector(`script[src*="${r}"]`))return;const t=document.createElement("script");t.src=r,t.defer=!0,t.setAttribute("data-sdkn",d),t.setAttribute("data-sdkv",s),i()&&e.debug===!1&&t.setAttribute("data-debug","false"),document.head.appendChild(t)}function h(e,n){var r,t;if(!a()){console.warn("[Vercel Web Analytics] Server-side execution of `track()` is currently not supported.");return}if(!n){(r=window.va)==null||r.call(window,"event",{name:e});return}try{const o=b(n,{strip:w()});(t=window.va)==null||t.call(window,"event",{name:e,data:o})}catch(o){o instanceof Error&&i()&&console.error(o)}}var g={inject:m,track:h};export{g,m as i};
