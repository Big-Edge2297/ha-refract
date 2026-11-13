var Es=Object.defineProperty;var Rs=Object.getOwnPropertyDescriptor;var j=(n,t,e,i)=>{for(var s=i>1?void 0:i?Rs(t,e):t,a=n.length-1,o;a>=0;a--)(o=n[a])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&Es(t,e,s),s};var Ue=globalThis,Be=Ue.ShadowRoot&&(Ue.ShadyCSS===void 0||Ue.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,at=Symbol(),Rt=new WeakMap,Se=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==at)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Be&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Rt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Rt.set(e,t))}return t}toString(){return this.cssText}},Pt=n=>new Se(typeof n=="string"?n:n+"",void 0,at),Le=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((i,s,a)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[a+1],n[0]);return new Se(e,n,at)},Ct=(n,t)=>{if(Be)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=Ue.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},ot=Be?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Pt(e)})(n):n;var{is:Ps,defineProperty:Cs,getOwnPropertyDescriptor:Ns,getOwnPropertyNames:js,getOwnPropertySymbols:Is,getPrototypeOf:Os}=Object,He=globalThis,Nt=He.trustedTypes,Fs=Nt?Nt.emptyScript:"",Us=He.reactiveElementPolyfillSupport,Te=(n,t)=>n,ze={toAttribute(n,t){switch(t){case Boolean:n=n?Fs:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},We=(n,t)=>!Ps(n,t),jt={attribute:!0,type:String,converter:ze,reflect:!1,useDefault:!1,hasChanged:We};Symbol.metadata??=Symbol("metadata"),He.litPropertyMetadata??=new WeakMap;var X=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=jt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Cs(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:a}=Ns(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let d=s?.call(this);a?.call(this,o),this.requestUpdate(t,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??jt}static _$Ei(){if(this.hasOwnProperty(Te("elementProperties")))return;let t=Os(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Te("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Te("properties"))){let e=this.properties,i=[...js(e),...Is(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(ot(s))}else t!==void 0&&e.push(ot(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ct(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:ze).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let a=i.getPropertyOptions(s),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:ze;this._$Em=s;let d=o.fromAttribute(e,a.type);this[s]=d??this._$Ej?.get(s)??d,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(t!==void 0){let o=this.constructor;if(s===!1&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??We)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),a!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,a]of i){let{wrapped:o}=a,d=this[s];o!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,a,d)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};X.elementStyles=[],X.shadowRootOptions={mode:"open"},X[Te("elementProperties")]=new Map,X[Te("finalized")]=new Map,Us?.({ReactiveElement:X}),(He.reactiveElementVersions??=[]).push("2.1.2");var ht=globalThis,It=n=>n,qe=ht.trustedTypes,Ot=qe?qe.createPolicy("lit-html",{createHTML:n=>n}):void 0,Wt="$lit$",de=`lit$${Math.random().toFixed(9).slice(2)}$`,qt="?"+de,Bs=`<${qt}>`,ue=document,De=()=>ue.createComment(""),Ee=n=>n===null||typeof n!="object"&&typeof n!="function",mt=Array.isArray,Ls=n=>mt(n)||typeof n?.[Symbol.iterator]=="function",rt=`[ 	
\f\r]`,Me=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ft=/-->/g,Ut=/>/g,pe=RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bt=/'/g,Lt=/"/g,Gt=/^(?:script|style|textarea|title)$/i,gt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),c=gt(1),ui=gt(2),hi=gt(3),ee=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Ht=new WeakMap,le=ue.createTreeWalker(ue,129);function Zt(n,t){if(!mt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ot!==void 0?Ot.createHTML(t):t}var Hs=(n,t)=>{let e=n.length-1,i=[],s,a=t===2?"<svg>":t===3?"<math>":"",o=Me;for(let d=0;d<e;d++){let r=n[d],l,h,m=-1,f=0;for(;f<r.length&&(o.lastIndex=f,h=o.exec(r),h!==null);)f=o.lastIndex,o===Me?h[1]==="!--"?o=Ft:h[1]!==void 0?o=Ut:h[2]!==void 0?(Gt.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=pe):h[3]!==void 0&&(o=pe):o===pe?h[0]===">"?(o=s??Me,m=-1):h[1]===void 0?m=-2:(m=o.lastIndex-h[2].length,l=h[1],o=h[3]===void 0?pe:h[3]==='"'?Lt:Bt):o===Lt||o===Bt?o=pe:o===Ft||o===Ut?o=Me:(o=pe,s=void 0);let x=o===pe&&n[d+1].startsWith("/>")?" ":"";a+=o===Me?r+Bs:m>=0?(i.push(l),r.slice(0,m)+Wt+r.slice(m)+de+x):r+de+(m===-2?d:x)}return[Zt(n,a+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},Re=class n{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,o=0,d=t.length-1,r=this.parts,[l,h]=Hs(t,e);if(this.el=n.createElement(l,i),le.currentNode=this.el.content,e===2||e===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=le.nextNode())!==null&&r.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(Wt)){let f=h[o++],x=s.getAttribute(m).split(de),T=/([.?@])?(.*)/.exec(f);r.push({type:1,index:a,name:T[2],strings:x,ctor:T[1]==="."?dt:T[1]==="?"?pt:T[1]==="@"?lt:ve}),s.removeAttribute(m)}else m.startsWith(de)&&(r.push({type:6,index:a}),s.removeAttribute(m));if(Gt.test(s.tagName)){let m=s.textContent.split(de),f=m.length-1;if(f>0){s.textContent=qe?qe.emptyScript:"";for(let x=0;x<f;x++)s.append(m[x],De()),le.nextNode(),r.push({type:2,index:++a});s.append(m[f],De())}}}else if(s.nodeType===8)if(s.data===qt)r.push({type:2,index:a});else{let m=-1;for(;(m=s.data.indexOf(de,m+1))!==-1;)r.push({type:7,index:a}),m+=de.length-1}a++}}static createElement(t,e){let i=ue.createElement("template");return i.innerHTML=t,i}};function _e(n,t,e=n,i){if(t===ee)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,a=Ee(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),a===void 0?s=void 0:(s=new a(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=_e(n,s._$AS(n,t.values),s,i)),t}var ct=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??ue).importNode(e,!0);le.currentNode=s;let a=le.nextNode(),o=0,d=0,r=i[0];for(;r!==void 0;){if(o===r.index){let l;r.type===2?l=new Pe(a,a.nextSibling,this,t):r.type===1?l=new r.ctor(a,r.name,r.strings,this,t):r.type===6&&(l=new ut(a,this,t)),this._$AV.push(l),r=i[++d]}o!==r?.index&&(a=le.nextNode(),o++)}return le.currentNode=ue,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Pe=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=_e(this,t,e),Ee(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==ee&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ls(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&Ee(this._$AH)?this._$AA.nextSibling.data=t:this.T(ue.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Re.createElement(Zt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let a=new ct(s,this),o=a.u(this.options);a.p(e),this.T(o),this._$AH=a}}_$AC(t){let e=Ht.get(t.strings);return e===void 0&&Ht.set(t.strings,e=new Re(t)),e}k(t){mt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let a of t)s===e.length?e.push(i=new n(this.O(De()),this.O(De()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=It(t).nextSibling;It(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ve=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}_$AI(t,e=this,i,s){let a=this.strings,o=!1;if(a===void 0)t=_e(this,t,e,0),o=!Ee(t)||t!==this._$AH&&t!==ee,o&&(this._$AH=t);else{let d=t,r,l;for(t=a[0],r=0;r<a.length-1;r++)l=_e(this,d[i+r],e,r),l===ee&&(l=this._$AH[r]),o||=!Ee(l)||l!==this._$AH[r],l===u?t=u:t!==u&&(t+=(l??"")+a[r+1]),this._$AH[r]=l}o&&!s&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},dt=class extends ve{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},pt=class extends ve{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},lt=class extends ve{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=_e(this,t,e,0)??u)===ee)return;let i=this._$AH,s=t===u&&i!==u||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==u&&(i===u||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ut=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){_e(this,t)}};var Ws=ht.litHtmlPolyfillSupport;Ws?.(Re,Pe),(ht.litHtmlVersions??=[]).push("3.3.3");var Vt=(n,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let a=e?.renderBefore??null;i._$litPart$=s=new Pe(t.insertBefore(De(),a),a,void 0,e??{})}return s._$AI(n),s};var ft=globalThis,J=class extends X{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ee}};J._$litElement$=!0,J.finalized=!0,ft.litElementHydrateSupport?.({LitElement:J});var qs=ft.litElementPolyfillSupport;qs?.({LitElement:J});(ft.litElementVersions??=[]).push("4.2.2");var Gs={attribute:!0,type:String,converter:ze,reflect:!1,hasChanged:We},Zs=(n=Gs,t,e)=>{let{kind:i,metadata:s}=e,a=globalThis.litPropertyMetadata.get(s);if(a===void 0&&globalThis.litPropertyMetadata.set(s,a=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),a.set(e.name,n),i==="accessor"){let{name:o}=e;return{set(d){let r=t.get.call(this);t.set.call(this,d),this.requestUpdate(o,r,n,!0,d)},init(d){return d!==void 0&&this.C(o,void 0,n,d),d}}}if(i==="setter"){let{name:o}=e;return function(d){let r=this[o];t.call(this,d),this.requestUpdate(o,r,n,!0,d)}}throw Error("Unsupported decorator location: "+i)};function he(n){return(t,e)=>typeof e=="object"?Zs(n,t,e):((i,s,a)=>{let o=s.hasOwnProperty(a);return s.constructor.createProperty(a,i),o?Object.getOwnPropertyDescriptor(s,a):void 0})(n,t,e)}function G(n){return he({...n,state:!0,attribute:!1})}var me=n=>t=>{if(customElements.get(n)){console.warn(`[refract-stats-card] <${n}> is already registered, probably by the standalone HACS card. Remove that copy to use the card that ships with the Refract integration.`);return}customElements.define(n,t)};var Jt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Kt=n=>(...t)=>({_$litDirective$:n,values:t}),Ze=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Yt="important",Vs=" !"+Yt,te=Kt(class extends Ze{constructor(n){if(super(n),n.type!==Jt.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((t,e)=>{let i=n[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(n,[t]){let{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let s=t[i];if(s!=null){this.ft.add(i);let a=typeof s=="string"&&s.endsWith(Vs);i.includes("-")||a?e.setProperty(i,a?s.slice(0,-11):s,a?Yt:""):e[i]=s}}return ee}});var Ce="refract-stats-card",Ve="refract-section-card-editor",Je="refract-stats-card-editor",K="refract",wt="https://github.com/Big-Edge2297/ha-refract/blob/main/docs/dashboard-card.md",Qt="0.7.2",Ke=["library_total","completed","in_progress","watchlist","up_to_date","movies","tv_shows","anime","last_watched","shows_waiting","next_up","username","catch_up","last_7_days","average_per_week","airing_this_week","top_picks","monthly_wrap","still_to_finish","stats_anime_episodes_watched","stats_anime_titles","stats_movies_watched","stats_shows_episodes_watched","stats_shows_titles","stats_streak_current_days","stats_streak_longest_days","stats_watch_time_anime_minutes","stats_watch_time_movies_minutes","stats_watch_time_shows_minutes","stats_watch_time_total_minutes"];var Js=[...Ke].sort((n,t)=>t.length-n.length),Xt=new Set(Ke),Ye={most_watched:"top_picks"},Ks=Object.keys(Ye).sort((n,t)=>t.length-n.length);function es(n){for(let t of Js){if(n===t)return{key:t,prefix:""};if(n.endsWith(`_${t}`))return{key:t,prefix:n.slice(0,n.length-t.length)}}for(let t of Ks){if(n===t)return{key:Ye[t],prefix:""};if(n.endsWith(`_${t}`))return{key:Ye[t],prefix:n.slice(0,n.length-t.length)}}}var ts=n=>n.slice(n.indexOf(".")+1);function ss(n,t){let e={entities:{}},i=n.entities,s=t.entity;if(e.deviceId=t.device_id,s&&i?.[s]?.device_id&&(e.deviceId=i[s].device_id),e.deviceId&&i)for(let[a,o]of Object.entries(i)){if(o.device_id!==e.deviceId||!a.startsWith("sensor.")||o.platform&&o.platform!==K)continue;let d=o.translation_key&&Xt.has(o.translation_key)?o.translation_key:void 0,r=d?{key:d,prefix:void 0}:es(ts(a));r&&(e.entities[r.key]||(e.entities[r.key]=a),e.prefix===void 0&&r.prefix!==void 0&&(e.prefix=r.prefix))}if(s){let a=es(ts(s));if(a){e.prefix??=a.prefix;for(let o of Ke){let d=`sensor.${a.prefix}${o}`;!e.entities[o]&&n.states[d]&&(e.entities[o]=d)}for(let[o,d]of Object.entries(Ye)){let r=`sensor.${a.prefix}${o}`;!e.entities[d]&&n.states[r]&&(e.entities[d]=r)}}}for(let[a,o]of Object.entries(t.entities??{}))Xt.has(a)&&typeof o=="string"&&(e.entities[a]=o);return e}function is(n){if(!n)return{main:"Refract"};let t=n.match(/^(.*?)\s*\(([^)]*)\)\s*$/);return t&&t[1]?{main:t[1],sub:t[2]||void 0}:{main:n}}function ns(n,t){let e=t.deviceId?n.devices?.[t.deviceId]:void 0,i=e?.name_by_user||e?.name;if(i)return i;for(let s of Object.values(t.entities)){let o=n.states[s]?.attributes?.friendly_name?.match(/^(.*?\([^)]*\))/);if(o)return o[1]}}var as="data:font/woff2;base64,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";var Qs="Twemoji Country Flags",os="refract-flag-font";function yt(n=document){if(!n.head||n.getElementById(os))return;let t=n.createElement("style");t.id=os,t.textContent=`@font-face{font-family:"${Qs}";font-display:swap;unicode-range:U+1F1E6-1F1FF,U+1F3F4,U+E0062-E007F;src:url(${as}) format("woff2")}`,n.head.appendChild(t)}function Qe(n){return n&&/^[A-Za-z]{2}$/.test(n)?String.fromCodePoint(...[...n.toUpperCase()].map(t=>127462+t.charCodeAt(0)-65)):void 0}var rs={"card.name":"Refract-Statistiken","card.description":"Wiedergabezeit, Bibliothek, Streak und was du als N\xE4chstes ansehen kannst \u2013 aus deinem Refract-Konto.","empty.no_entity":"W\xE4hle eine Refract-Entit\xE4t, um zu starten.","empty.not_found":"F\xFCr {entity} wurden keine Refract-Entit\xE4ten gefunden.","empty.nothing_up_next":"Nichts als N\xE4chstes. F\xFCge eine Serie hinzu oder markiere eine Folge als gesehen.","hero.total":"Gesamte Wiedergabezeit","hero.library":"Bibliothek","hero.movies_seen":"Gesehene Filme","hero.episodes":"Gesehene Folgen","unit.day":"Tage","unit.day_one":"Tag","unit.hour":"Stunden","unit.hour_one":"Stunde","unit.min":"Min.","unit.h":"h","header.last_watched":"Zuletzt gesehen","library.title":"Bibliothek","library.titles":"Titel","library.movies":"Filme","library.shows":"Serien","library.anime":"Anime","status.completed":"Gesehen","status.up_to_date":"Auf dem neuesten Stand","status.watchlist":"Geplant","status.in_progress":"Wird geschaut","status.on_hold":"Pausiert","status.dropped":"Abgebrochen","status.other":"Sonstige","watch.title":"Wiedergabezeit","finish.title":"Noch zu schauen","finish.none":"Nichts mehr offen","finish.movies":"{n} Filme \xFCbrig","finish.movies_one":"1 Film \xFCbrig","finish.shows":"{n} Serien \xFCbrig","finish.shows_one":"1 Serie \xFCbrig","finish.anime":"{n} Anime \xFCbrig","finish.anime_one":"1 Anime \xFCbrig","streak.title":"Streak","streak.longest":"L\xE4ngste: {n} {unit}","streak.best":"Rekord {n}","streak.still_time":"heute noch Zeit","streak.none":"Keine aktive Streak","next.title":"Als N\xE4chstes","next.progress":"{watched} von {aired} ausgestrahlten Folgen","next.remaining":"{n} \xFCbrig","next.mark":"Als gesehen markieren","next.confirm":"Als gesehen markieren?","next.busy":"Wird markiert \u2026","next.done":"Markiert","next.error":"Markieren fehlgeschlagen","avg.title":"Durchschnitt pro Woche","avg.vs_previous":"gg\xFC. den letzten 4 Wochen","avg.estimated":"Gesch\xE4tzt anhand deiner durchschnittlichen Laufzeit","avg.items_unit":"pro Woche","avg.items_line":"{n} Folgen und Filme pro Woche","avg.items_line_one":"1 Folge oder Film pro Woche","days7.title":"Letzte 7 Tage","days7.busiest":"Aktivster Tag \xB7 {day}","days7.episodes":"Folgen","days7.movies":"Filme","days7.none":"In den letzten 7 Tagen nichts geschaut","catchup.title":"Nachholbedarf","catchup.pick":"{title} unter \u201EAls N\xE4chstes\u201C anzeigen","catchup.waiting":"ausgestrahlte Folgen warten","catchup.about":"etwa {time}","catchup.none":"Du bist auf dem neuesten Stand","catchup.show_all":"Alle {n} anzeigen","catchup.show_less":"Weniger anzeigen","airing.title":"Diese Woche im Programm","airing.today":"Heute","airing.none":"In den n\xE4chsten 7 Tagen l\xE4uft nichts","airing.show_all":"Alle {n} anzeigen","airing.show_less":"Weniger anzeigen","badge.premiere":"Premiere","badge.finale":"Finale","badge.mid_finale":"Midseason-Finale","badge.not_aired":"Nicht ausgestrahlt","badge.anime":"Anime","picks.title":"Am h\xE4ufigsten gesehen","picks.actor":"Schauspieler","picks.director":"Regie","picks.writer":"Drehbuch","picks.decade":"Jahrzehnt","picks.genre":"Genre","picks.country":"Land","picks.sub":"{n} Titel \xB7 {time}","picks.sub_one":"{n} Titel \xB7 {time}","picks.based_on":"Basierend auf {n} von {total} Titeln","picks.building":"Wird noch erstellt","picks.progress":"Details werden von TMDB gesammelt \xB7 {n} von {total} Titeln","picks.progress_label":"Von TMDB gesammelte Details","picks.more":"Pl\xE4tze 2 und 3 anzeigen","picks.less":"Pl\xE4tze 2 und 3 ausblenden","picks.waiting":"Details werden von TMDB gesammelt. Das f\xFCllt sich in den n\xE4chsten Aktualisierungen.","picks.none":"Noch nichts anzuzeigen.","wrap.title":"Monatsr\xFCckblick","wrap.older":"\xC4lterer Monat","wrap.newer":"Neuerer Monat","wrap.items":"{n} Folgen und Filme gesehen","wrap.items_one":"1 Folge oder Film gesehen","wrap.tab.overview":"\xDCberblick","wrap.tab.tastes":"Geschmack","wrap.tab.patterns":"Muster","wrap.tab.moments":"Momente","wrap.hours":"Stunden","wrap.episodes":"Folgen","wrap.movies":"Filme","wrap.shows":"Serien","wrap.anime":"Anime","wrap.vs":"{change} gg\xFC. {month}","wrap.estimated":"Stunden aus durchschnittlichen Laufzeiten gesch\xE4tzt","wrap.split":"Was du gesehen hast","wrap.genres":"Top-Genres","wrap.genres_none":"Genres erscheinen, sobald TMDB-Details vorliegen","wrap.discovery":"Entdeckungen","wrap.first_watch":"Erstmals gesehen","wrap.rewatch":"Erneut gesehen","wrap.new":"{n} neu","wrap.revisited":"{n} wiederholt","wrap.items_day":"Eintr\xE4ge / Tag","wrap.hours_day":"Stunden / Tag","wrap.daily":"T\xE4gliche Aktivit\xE4t","wrap.day":"{day}: {n}","wrap.busiest":"Aktivster Tag: {day} \xB7 {n} Eintr\xE4ge","wrap.busiest_one":"Aktivster Tag: {day} \xB7 1 Eintrag","wrap.weekend":"Am Wochenende","wrap.streak":"Beste Streak","wrap.active":"Aktive Tage","wrap.active_value":"{n} von {total}","wrap.most_watched":"Am h\xE4ufigsten gesehen","wrap.episodes_n":"{n} Folgen","wrap.episodes_n_one":"1 Folge","wrap.movie_once":"Film","wrap.plays":"{n}-mal gesehen","wrap.firsts":"Neu entdeckt","wrap.first_from":"Erster Titel aus {country}","wrap.firsts_none":"Keine neuen L\xE4nder in diesem Monat","wrap.firsts_waiting":"Details werden noch von TMDB gesammelt","wrap.none":"Noch kein abgeschlossener Monat mit Aktivit\xE4t","wrap.page.overview":"Dein Monat im R\xFCckblick","wrap.page.tastes":"Dein Geschmack","wrap.page.patterns":"Deine Muster","wrap.page.moments":"Deine Momente","wrap.prev_page":"Vorherige Seite","wrap.next_page":"N\xE4chste Seite","wrap.insight_new":"{pct} % deiner Wiedergaben waren neu","wrap.insight_weekday":"Dein aktivster Wochentag war {weekday}","wrap.insight_top":"{title} war dein meistgesehener Titel","empty.section":"Hier gibt es noch nichts anzuzeigen","fun.months":"Das sind etwa {n} Monate Dauerschauen","fun.months_one":"Das ist etwa {n} Monat Dauerschauen","fun.years":"Das sind etwa {n} Jahre Dauerschauen","fun.days":"Das sind etwa {n} Tage Dauerschauen","fun.days_one":"Das ist etwa {n} Tag Dauerschauen","fun.workweeks":"Das sind etwa {n} Vollzeit-Arbeitswochen","fun.lotr":"Genug f\xFCr die erweiterte Herr-der-Ringe-Trilogie etwa {n} Mal","fun.flights":"Genug Zeit, um etwa {n} Mal um die Welt zu fliegen","fun.sleep_nights":"Das sind etwa {n} N\xE4chte Schlaf","fun.sleep_years":"Das sind etwa {n} Jahre Schlaf bei 8 Stunden pro Nacht","fun.sleep_years_one":"Das ist etwa {n} Jahr Schlaf bei 8 Stunden pro Nacht","fun.movies":"Das sind etwa {n} Durchschnittsfilme am St\xFCck","fun.seasons":"Das sind etwa {n} komplette Staffeln mit 22 Folgen","fun.marathons":"Genug Zeit f\xFCr etwa {n} Marathonl\xE4ufe","fun.moon":"Genug f\xFCr etwa {n} einfache Fl\xFCge zum Mond","fun.imdb":"Genug, um die gesamte IMDb Top 250 etwa {n} Mal zu schauen"};var cs={"card.name":"Estad\xEDsticas de Refract","card.description":"Tiempo de visualizaci\xF3n, biblioteca, racha y qu\xE9 ver a continuaci\xF3n desde tu cuenta de Refract.","empty.no_entity":"Elige una entidad de Refract para empezar.","empty.not_found":"No se encontraron entidades de Refract para {entity}.","empty.nothing_up_next":"Nada a continuaci\xF3n. A\xF1ade una serie o marca un episodio como visto.","hero.total":"Tiempo total de visualizaci\xF3n","hero.library":"Biblioteca","hero.movies_seen":"Pel\xEDculas vistas","hero.episodes":"Episodios vistos","unit.day":"d\xEDas","unit.day_one":"d\xEDa","unit.hour":"horas","unit.hour_one":"hora","unit.min":"min","unit.h":"h","header.last_watched":"Visto por \xFAltima vez","library.title":"Biblioteca","library.titles":"t\xEDtulos","library.movies":"Pel\xEDculas","library.shows":"Series","library.anime":"Anime","status.completed":"Visto","status.up_to_date":"Al d\xEDa","status.watchlist":"Pendiente","status.in_progress":"Viendo","status.on_hold":"En pausa","status.dropped":"Abandonado","status.other":"Otro","watch.title":"Tiempo de visualizaci\xF3n","finish.title":"Por terminar","finish.none":"Nada por terminar","finish.movies":"{n} pel\xEDculas por terminar","finish.movies_one":"1 pel\xEDcula por terminar","finish.shows":"{n} series por terminar","finish.shows_one":"1 serie por terminar","finish.anime":"{n} anime por terminar","finish.anime_one":"1 anime por terminar","streak.title":"Racha","streak.longest":"M\xE1s larga: {n} {unit}","streak.best":"Mejor {n}","streak.still_time":"a\xFAn hay tiempo hoy","streak.none":"Sin racha activa","next.title":"A continuaci\xF3n","next.progress":"{watched} de {aired} episodios emitidos","next.remaining":"{n} restantes","next.mark":"Marcar como visto","next.confirm":"\xBFMarcar como visto?","next.busy":"Marcando\u2026","next.done":"Marcado","next.error":"No se pudo marcar como visto","avg.title":"Promedio semanal","avg.vs_previous":"frente a las 4 semanas anteriores","avg.estimated":"Estimado a partir de tu duraci\xF3n media","avg.items_unit":"a la semana","avg.items_line":"{n} episodios y pel\xEDculas a la semana","avg.items_line_one":"1 episodio o pel\xEDcula a la semana","days7.title":"\xDAltimos 7 d\xEDas","days7.busiest":"D\xEDa m\xE1s activo \xB7 {day}","days7.episodes":"Episodios","days7.movies":"Pel\xEDculas","days7.none":"Nada visto en los \xFAltimos 7 d\xEDas","catchup.title":"Episodios pendientes","catchup.pick":"Mostrar {title} en A continuaci\xF3n","catchup.waiting":"episodios emitidos en espera","catchup.about":"aprox. {time}","catchup.none":"Est\xE1s al d\xEDa","catchup.show_all":"Mostrar los {n}","catchup.show_less":"Mostrar menos","airing.title":"Se emite esta semana","airing.today":"Hoy","airing.none":"Nada se emite en los pr\xF3ximos 7 d\xEDas","airing.show_all":"Mostrar los {n}","airing.show_less":"Mostrar menos","badge.premiere":"Estreno","badge.finale":"Final","badge.mid_finale":"Final de media temporada","badge.not_aired":"Sin emitir","badge.anime":"Anime","picks.title":"Lo m\xE1s visto","picks.actor":"Actor","picks.director":"Director","picks.writer":"Guionista","picks.decade":"D\xE9cada","picks.genre":"G\xE9nero","picks.country":"Pa\xEDs","picks.sub":"{n} t\xEDtulos \xB7 {time}","picks.sub_one":"{n} t\xEDtulo \xB7 {time}","picks.based_on":"Basado en {n} de {total} t\xEDtulos","picks.building":"A\xFAn en construcci\xF3n","picks.progress":"Recopilando detalles de TMDB \xB7 {n} de {total} t\xEDtulos","picks.progress_label":"Detalles recopilados de TMDB","picks.more":"Mostrar los puestos 2 y 3","picks.less":"Ocultar los puestos 2 y 3","picks.waiting":"Recopilando detalles de TMDB. Se ir\xE1 completando en las pr\xF3ximas actualizaciones.","picks.none":"A\xFAn no hay nada que mostrar.","wrap.title":"Resumen mensual","wrap.older":"Mes anterior","wrap.newer":"Mes siguiente","wrap.items":"{n} elementos vistos","wrap.items_one":"1 elemento visto","wrap.tab.overview":"Resumen","wrap.tab.tastes":"Gustos","wrap.tab.patterns":"Patrones","wrap.tab.moments":"Momentos","wrap.hours":"Horas","wrap.episodes":"Episodios","wrap.movies":"Pel\xEDculas","wrap.shows":"Series","wrap.anime":"Anime","wrap.vs":"{change} frente a {month}","wrap.estimated":"Horas estimadas a partir de duraciones medias","wrap.split":"Lo que has visto","wrap.genres":"G\xE9neros principales","wrap.genres_none":"Los g\xE9neros aparecen cuando hay detalles de TMDB","wrap.discovery":"Descubrimiento","wrap.first_watch":"Primera vez","wrap.rewatch":"Repetici\xF3n","wrap.new":"{n} nuevos","wrap.revisited":"{n} repetidos","wrap.items_day":"Elementos / d\xEDa","wrap.hours_day":"Horas / d\xEDa","wrap.daily":"Actividad diaria","wrap.day":"{day}: {n}","wrap.busiest":"D\xEDa m\xE1s activo: {day} \xB7 {n} elementos","wrap.busiest_one":"D\xEDa m\xE1s activo: {day} \xB7 1 elemento","wrap.weekend":"En fin de semana","wrap.streak":"Mejor racha","wrap.active":"D\xEDas activos","wrap.active_value":"{n} de {total}","wrap.most_watched":"Lo m\xE1s visto","wrap.episodes_n":"{n} episodios","wrap.episodes_n_one":"1 episodio","wrap.movie_once":"Pel\xEDcula","wrap.plays":"{n} reproducciones","wrap.firsts":"Novedades","wrap.first_from":"Primer t\xEDtulo de {country}","wrap.firsts_none":"Ning\xFAn pa\xEDs nuevo este mes","wrap.firsts_waiting":"A\xFAn se est\xE1n recopilando detalles de TMDB","wrap.none":"Todav\xEDa no hay ning\xFAn mes completo con visualizaciones","wrap.page.overview":"Tu mes, resumido","wrap.page.tastes":"Tus gustos","wrap.page.patterns":"Tus patrones","wrap.page.moments":"Tus momentos","wrap.prev_page":"P\xE1gina anterior","wrap.next_page":"P\xE1gina siguiente","wrap.insight_new":"El {pct}% de lo que viste era nuevo para ti","wrap.insight_weekday":"Tu d\xEDa de la semana m\xE1s activo fue {weekday}","wrap.insight_top":"{title} fue tu t\xEDtulo m\xE1s visto","empty.section":"A\xFAn no hay nada que mostrar aqu\xED","fun.months":"Son unos {n} meses de visualizaci\xF3n continua","fun.months_one":"Es aproximadamente {n} mes de visualizaci\xF3n continua","fun.years":"Son unos {n} a\xF1os de visualizaci\xF3n continua","fun.days":"Son unos {n} d\xEDas de visualizaci\xF3n continua","fun.days_one":"Es aproximadamente {n} d\xEDa de visualizaci\xF3n continua","fun.workweeks":"Son unas {n} semanas laborales a jornada completa","fun.lotr":"Suficiente para ver la trilog\xEDa extendida de El Se\xF1or de los Anillos unas {n} veces","fun.flights":"Tiempo suficiente para dar la vuelta al mundo en avi\xF3n unas {n} veces","fun.sleep_nights":"Son unas {n} noches de sue\xF1o","fun.sleep_years":"Son unos {n} a\xF1os de sue\xF1o a raz\xF3n de 8 horas por noche","fun.sleep_years_one":"Es aproximadamente {n} a\xF1o de sue\xF1o a raz\xF3n de 8 horas por noche","fun.movies":"Son unas {n} pel\xEDculas de duraci\xF3n media seguidas","fun.seasons":"Son unas {n} temporadas completas de 22 episodios","fun.marathons":"Tiempo suficiente para correr unos {n} maratones","fun.moon":"Suficiente para unos {n} viajes de ida a la Luna","fun.imdb":"Suficiente para ver todo el Top 250 de IMDb unas {n} veces"};var ds={"card.name":"Statistiques Refract","card.description":"Temps de visionnage, biblioth\xE8que, s\xE9rie de jours et prochains \xE9pisodes de votre compte Refract.","empty.no_entity":"Choisissez une entit\xE9 Refract pour commencer.","empty.not_found":"Aucune entit\xE9 Refract trouv\xE9e pour {entity}.","empty.nothing_up_next":"Rien \xE0 voir ensuite. Ajoutez une s\xE9rie ou marquez un \xE9pisode comme vu.","hero.total":"Temps de visionnage total","hero.library":"Biblioth\xE8que","hero.movies_seen":"Films vus","hero.episodes":"\xC9pisodes vus","unit.day":"jours","unit.day_one":"jour","unit.hour":"heures","unit.hour_one":"heure","unit.min":"min","unit.h":"h","header.last_watched":"Dernier visionnage","library.title":"Biblioth\xE8que","library.titles":"titres","library.movies":"Films","library.shows":"S\xE9ries","library.anime":"Anim\xE9s","status.completed":"Vu","status.up_to_date":"\xC0 jour","status.watchlist":"\xC0 voir","status.in_progress":"En cours","status.on_hold":"En pause","status.dropped":"Abandonn\xE9","status.other":"Autre","watch.title":"Temps de visionnage","finish.title":"Reste \xE0 voir","finish.none":"Il ne reste rien \xE0 voir","finish.movies":"{n} films \xE0 terminer","finish.movies_one":"1 film \xE0 terminer","finish.shows":"{n} s\xE9ries \xE0 terminer","finish.shows_one":"1 s\xE9rie \xE0 terminer","finish.anime":"{n} anim\xE9s \xE0 terminer","finish.anime_one":"1 anim\xE9 \xE0 terminer","streak.title":"Jours cons\xE9cutifs","streak.longest":"Record : {n} {unit}","streak.best":"Meilleur : {n}","streak.still_time":"il reste du temps aujourd'hui","streak.none":"Aucune s\xE9rie de jours en cours","next.title":"\xC0 suivre","next.progress":"{watched} sur {aired} \xE9pisodes diffus\xE9s","next.remaining":"{n} restants","next.mark":"Marquer comme vu","next.confirm":"Marquer comme vu ?","next.busy":"Marquage\u2026","next.done":"Marqu\xE9","next.error":"Impossible de marquer comme vu","avg.title":"Moyenne par semaine","avg.vs_previous":"par rapport aux 4 semaines pr\xE9c\xE9dentes","avg.estimated":"Estim\xE9 \xE0 partir de votre dur\xE9e moyenne","avg.items_unit":"par semaine","avg.items_line":"{n} \xE9pisodes et films par semaine","avg.items_line_one":"1 \xE9pisode ou film par semaine","days7.title":"7 derniers jours","days7.busiest":"Jour le plus actif \xB7 {day}","days7.episodes":"\xC9pisodes","days7.movies":"Films","days7.none":"Rien regard\xE9 ces 7 derniers jours","catchup.title":"Retard \xE0 rattraper","catchup.pick":"Afficher {title} dans \xC0 suivre","catchup.waiting":"\xE9pisodes diffus\xE9s en attente","catchup.about":"environ {time}","catchup.none":"Vous \xEAtes \xE0 jour","catchup.show_all":"Tout afficher ({n})","catchup.show_less":"Afficher moins","airing.title":"Diffusions de la semaine","airing.today":"Aujourd'hui","airing.none":"Aucune diffusion dans les 7 prochains jours","airing.show_all":"Tout afficher ({n})","airing.show_less":"Afficher moins","badge.premiere":"Premi\xE8re","badge.finale":"Finale","badge.mid_finale":"Finale de mi-saison","badge.not_aired":"Non diffus\xE9","badge.anime":"Anim\xE9","picks.title":"Les plus regard\xE9s","picks.actor":"Acteur","picks.director":"R\xE9alisateur","picks.writer":"Sc\xE9nariste","picks.decade":"D\xE9cennie","picks.genre":"Genre","picks.country":"Pays","picks.sub":"{n} titres \xB7 {time}","picks.sub_one":"{n} titre \xB7 {time}","picks.based_on":"Bas\xE9 sur {n} titres sur {total}","picks.building":"En cours de cr\xE9ation","picks.progress":"R\xE9cup\xE9ration des d\xE9tails depuis TMDB \xB7 {n} titres sur {total}","picks.progress_label":"D\xE9tails r\xE9cup\xE9r\xE9s depuis TMDB","picks.more":"Afficher les places 2 et 3","picks.less":"Masquer les places 2 et 3","picks.waiting":"R\xE9cup\xE9ration des d\xE9tails depuis TMDB. Cela se compl\xE8te au fil des prochaines mises \xE0 jour.","picks.none":"Rien \xE0 afficher pour le moment.","wrap.title":"Bilan du mois","wrap.older":"Mois pr\xE9c\xE9dent","wrap.newer":"Mois suivant","wrap.items":"{n} \xE9l\xE9ments regard\xE9s","wrap.items_one":"1 \xE9l\xE9ment regard\xE9","wrap.tab.overview":"Aper\xE7u","wrap.tab.tastes":"Go\xFBts","wrap.tab.patterns":"Habitudes","wrap.tab.moments":"Moments","wrap.hours":"Heures","wrap.episodes":"\xC9pisodes","wrap.movies":"Films","wrap.shows":"S\xE9ries","wrap.anime":"Anim\xE9s","wrap.vs":"{change} par rapport \xE0 {month}","wrap.estimated":"Heures estim\xE9es d'apr\xE8s les dur\xE9es moyennes","wrap.split":"Ce que vous avez regard\xE9","wrap.genres":"Genres pr\xE9f\xE9r\xE9s","wrap.genres_none":"Les genres apparaissent d\xE8s que les d\xE9tails TMDB sont disponibles","wrap.discovery":"D\xE9couvertes","wrap.first_watch":"Premi\xE8re vision","wrap.rewatch":"Revisionnage","wrap.new":"{n} nouveaux","wrap.revisited":"{n} revus","wrap.items_day":"\xC9l\xE9ments / jour","wrap.hours_day":"Heures / jour","wrap.daily":"Activit\xE9 quotidienne","wrap.day":"{day} : {n}","wrap.busiest":"Jour le plus actif : {day} \xB7 {n} \xE9l\xE9ments","wrap.busiest_one":"Jour le plus actif : {day} \xB7 1 \xE9l\xE9ment","wrap.weekend":"Le week-end","wrap.streak":"Meilleure s\xE9rie","wrap.active":"Jours actifs","wrap.active_value":"{n} sur {total}","wrap.most_watched":"Les plus regard\xE9s","wrap.episodes_n":"{n} \xE9pisodes","wrap.episodes_n_one":"1 \xE9pisode","wrap.movie_once":"Film","wrap.plays":"{n} visionnages","wrap.firsts":"Nouveaut\xE9s","wrap.first_from":"Premier titre : {country}","wrap.firsts_none":"Aucun nouveau pays ce mois-ci","wrap.firsts_waiting":"R\xE9cup\xE9ration des d\xE9tails TMDB en cours","wrap.none":"Aucun mois termin\xE9 avec des visionnages pour l'instant","wrap.page.overview":"Votre mois en r\xE9sum\xE9","wrap.page.tastes":"Vos go\xFBts","wrap.page.patterns":"Vos habitudes","wrap.page.moments":"Vos moments","wrap.prev_page":"Page pr\xE9c\xE9dente","wrap.next_page":"Page suivante","wrap.insight_new":"{pct} % de vos visionnages \xE9taient in\xE9dits","wrap.insight_weekday":"Votre jour de la semaine le plus actif : {weekday}","wrap.insight_top":"{title} est votre titre le plus regard\xE9","empty.section":"Rien \xE0 afficher pour le moment","fun.months":"Soit environ {n} mois de visionnage non-stop","fun.months_one":"Soit environ {n} mois de visionnage non-stop","fun.years":"Soit environ {n} ans de visionnage non-stop","fun.days":"Soit environ {n} jours de visionnage non-stop","fun.days_one":"Soit environ {n} jour de visionnage non-stop","fun.workweeks":"Soit environ {n} semaines de travail \xE0 temps plein","fun.lotr":"De quoi regarder la trilogie \xE9tendue du Seigneur des anneaux environ {n} fois","fun.flights":"Assez de temps pour faire environ {n} fois le tour du monde en avion","fun.sleep_nights":"Soit environ {n} nuits de sommeil","fun.sleep_years":"Soit environ {n} ans de sommeil \xE0 raison de 8 heures par nuit","fun.sleep_years_one":"Soit environ {n} an de sommeil \xE0 raison de 8 heures par nuit","fun.movies":"Soit environ {n} films de dur\xE9e moyenne \xE0 la suite","fun.seasons":"Soit environ {n} saisons compl\xE8tes de 22 \xE9pisodes","fun.marathons":"Assez de temps pour courir environ {n} marathons","fun.moon":"De quoi faire environ {n} allers simples vers la Lune","fun.imdb":"De quoi regarder tout le Top 250 d'IMDb environ {n} fois"};var ps={"card.name":"Statistiche Refract","card.description":"Tempo di visione, libreria, serie di giorni e cosa guardare dopo dal tuo account Refract.","empty.no_entity":"Scegli un'entit\xE0 Refract per iniziare.","empty.not_found":"Nessuna entit\xE0 Refract trovata per {entity}.","empty.nothing_up_next":"Niente in arrivo. Aggiungi una serie o segna un episodio come visto.","hero.total":"Tempo di visione totale","hero.library":"Libreria","hero.movies_seen":"Film visti","hero.episodes":"Episodi visti","unit.day":"giorni","unit.day_one":"giorno","unit.hour":"ore","unit.hour_one":"ora","unit.min":"min","unit.h":"h","header.last_watched":"Ultima visione","library.title":"Libreria","library.titles":"titoli","library.movies":"Film","library.shows":"Serie TV","library.anime":"Anime","status.completed":"Visto","status.up_to_date":"Aggiornato","status.watchlist":"Da vedere","status.in_progress":"In corso","status.on_hold":"In pausa","status.dropped":"Abbandonato","status.other":"Altro","watch.title":"Tempo di visione","finish.title":"Ancora da finire","finish.none":"Niente da finire","finish.movies":"{n} film da finire","finish.movies_one":"1 film da finire","finish.shows":"{n} serie TV da finire","finish.shows_one":"1 serie TV da finire","finish.anime":"{n} anime da finire","finish.anime_one":"1 anime da finire","streak.title":"Serie di giorni","streak.longest":"Pi\xF9 lunga: {n} {unit}","streak.best":"Record {n}","streak.still_time":"c'\xE8 ancora tempo oggi","streak.none":"Nessuna serie attiva","next.title":"Prossimo da guardare","next.progress":"{watched} di {aired} episodi andati in onda","next.remaining":"{n} rimanenti","next.mark":"Segna come visto","next.confirm":"Segnare come visto?","next.busy":"Salvataggio\u2026","next.done":"Segnato","next.error":"Impossibile segnare come visto","avg.title":"Media settimanale","avg.vs_previous":"rispetto alle 4 settimane precedenti","avg.estimated":"Stimato dalla tua durata media","avg.items_unit":"a settimana","avg.items_line":"{n} episodi e film a settimana","avg.items_line_one":"1 episodio o film a settimana","days7.title":"Ultimi 7 giorni","days7.busiest":"Giorno pi\xF9 attivo \xB7 {day}","days7.episodes":"Episodi","days7.movies":"Film","days7.none":"Niente guardato negli ultimi 7 giorni","catchup.title":"Arretrati da recuperare","catchup.pick":"Mostra {title} in Prossimo da guardare","catchup.waiting":"episodi andati in onda in attesa","catchup.about":"circa {time}","catchup.none":"Sei in pari","catchup.show_all":"Mostra tutti ({n})","catchup.show_less":"Mostra meno","airing.title":"In onda questa settimana","airing.today":"Oggi","airing.none":"Niente in onda nei prossimi 7 giorni","airing.show_all":"Mostra tutti ({n})","airing.show_less":"Mostra meno","badge.premiere":"Premi\xE8re","badge.finale":"Finale","badge.mid_finale":"Finale di met\xE0 stagione","badge.not_aired":"Non ancora in onda","badge.anime":"Anime","picks.title":"Pi\xF9 guardati","picks.actor":"Attore","picks.director":"Regista","picks.writer":"Sceneggiatore","picks.decade":"Decennio","picks.genre":"Genere","picks.country":"Paese","picks.sub":"{n} titoli \xB7 {time}","picks.sub_one":"{n} titolo \xB7 {time}","picks.based_on":"Basato su {n} di {total} titoli","picks.building":"Ancora in costruzione","picks.progress":"Raccolta dei dettagli da TMDB \xB7 {n} di {total} titoli","picks.progress_label":"Dettagli raccolti da TMDB","picks.more":"Mostra i posti 2 e 3","picks.less":"Nascondi i posti 2 e 3","picks.waiting":"Raccolta dei dettagli da TMDB in corso. Si completer\xE0 nei prossimi aggiornamenti.","picks.none":"Ancora niente da mostrare.","wrap.title":"Riepilogo mensile","wrap.older":"Mese precedente","wrap.newer":"Mese successivo","wrap.items":"{n} elementi guardati","wrap.items_one":"1 elemento guardato","wrap.tab.overview":"Panoramica","wrap.tab.tastes":"Gusti","wrap.tab.patterns":"Abitudini","wrap.tab.moments":"Momenti","wrap.hours":"Ore","wrap.episodes":"Episodi","wrap.movies":"Film","wrap.shows":"Serie TV","wrap.anime":"Anime","wrap.vs":"{change} rispetto a {month}","wrap.estimated":"Ore stimate dalle durate medie","wrap.split":"Cosa hai guardato","wrap.genres":"Generi principali","wrap.genres_none":"I generi compaiono quando i dettagli TMDB sono disponibili","wrap.discovery":"Scoperte","wrap.first_watch":"Prima visione","wrap.rewatch":"Rivisione","wrap.new":"{n} nuovi","wrap.revisited":"{n} rivisti","wrap.items_day":"Elementi / giorno","wrap.hours_day":"Ore / giorno","wrap.daily":"Attivit\xE0 giornaliera","wrap.day":"{day}: {n}","wrap.busiest":"Giorno pi\xF9 attivo: {day} \xB7 {n} elementi","wrap.busiest_one":"Giorno pi\xF9 attivo: {day} \xB7 1 elemento","wrap.weekend":"Nel weekend","wrap.streak":"Serie migliore","wrap.active":"Giorni attivi","wrap.active_value":"{n} su {total}","wrap.most_watched":"Pi\xF9 guardati","wrap.episodes_n":"{n} episodi","wrap.episodes_n_one":"1 episodio","wrap.movie_once":"Film","wrap.plays":"{n} visioni","wrap.firsts":"Novit\xE0","wrap.first_from":"Primo titolo da {country}","wrap.firsts_none":"Nessun nuovo paese questo mese","wrap.firsts_waiting":"Raccolta dei dettagli TMDB ancora in corso","wrap.none":"Ancora nessun mese completo con visioni","wrap.page.overview":"Il tuo mese in sintesi","wrap.page.tastes":"I tuoi gusti","wrap.page.patterns":"Le tue abitudini","wrap.page.moments":"I tuoi momenti","wrap.prev_page":"Pagina precedente","wrap.next_page":"Pagina successiva","wrap.insight_new":"Il {pct}% delle tue visioni era nuovo","wrap.insight_weekday":"Il tuo giorno della settimana pi\xF9 attivo \xE8 stato {weekday}","wrap.insight_top":"{title} \xE8 stato il titolo pi\xF9 guardato","empty.section":"Ancora niente da mostrare qui","fun.months":"Sono circa {n} mesi di visione ininterrotta","fun.months_one":"\xC8 circa {n} mese di visione ininterrotta","fun.years":"Sono circa {n} anni di visione ininterrotta","fun.days":"Sono circa {n} giorni di visione ininterrotta","fun.days_one":"\xC8 circa {n} giorno di visione ininterrotta","fun.workweeks":"Sono circa {n} settimane lavorative a tempo pieno","fun.lotr":"Abbastanza per la trilogia estesa del Signore degli Anelli circa {n} volte","fun.flights":"Tempo sufficiente per fare il giro del mondo in aereo circa {n} volte","fun.sleep_nights":"Sono circa {n} notti di sonno","fun.sleep_years":"Sono circa {n} anni di sonno a 8 ore per notte","fun.sleep_years_one":"\xC8 circa {n} anno di sonno a 8 ore per notte","fun.movies":"Sono circa {n} film di durata media di fila","fun.seasons":"Sono circa {n} stagioni complete da 22 episodi","fun.marathons":"Tempo sufficiente per correre circa {n} maratone","fun.moon":"Abbastanza per circa {n} viaggi di sola andata sulla Luna","fun.imdb":"Abbastanza per guardare l'intera Top 250 di IMDb circa {n} volte"};var ls={"card.name":"Refract-statistieken","card.description":"Kijktijd, bibliotheek, streak en wat je hierna kunt kijken uit je Refract-account.","empty.no_entity":"Kies een Refract-entiteit om te beginnen.","empty.not_found":"Geen Refract-entiteiten gevonden voor {entity}.","empty.nothing_up_next":"Niets op de planning. Voeg een serie toe of markeer een aflevering als gezien.","hero.total":"Totale kijktijd","hero.library":"Bibliotheek","hero.movies_seen":"Bekeken films","hero.episodes":"Bekeken afleveringen","unit.day":"dagen","unit.day_one":"dag","unit.hour":"uur","unit.hour_one":"uur","unit.min":"min","unit.h":"u","header.last_watched":"Laatst bekeken","library.title":"Bibliotheek","library.titles":"titels","library.movies":"Films","library.shows":"Series","library.anime":"Anime","status.completed":"Bekeken","status.up_to_date":"Bij","status.watchlist":"Plan om te kijken","status.in_progress":"Bezig","status.on_hold":"On hold","status.dropped":"Gestopt","status.other":"Overig","watch.title":"Kijktijd","finish.title":"Nog af te kijken","finish.none":"Niets meer af te kijken","finish.movies":"{n} films af te kijken","finish.movies_one":"1 film af te kijken","finish.shows":"{n} series af te kijken","finish.shows_one":"1 serie af te kijken","finish.anime":"{n} anime af te kijken","finish.anime_one":"1 anime af te kijken","streak.title":"Streak","streak.longest":"Langste: {n} {unit}","streak.best":"Beste {n}","streak.still_time":"vandaag nog tijd","streak.none":"Geen actieve streak","next.title":"Hierna","next.progress":"{watched} van {aired} uitgezonden afleveringen","next.remaining":"{n} te gaan","next.mark":"Markeer als gezien","next.confirm":"Markeren als gezien?","next.busy":"Markeren\u2026","next.done":"Gemarkeerd","next.error":"Markeren als gezien mislukt","avg.title":"Gemiddeld per week","avg.vs_previous":"t.o.v. de vorige 4 weken","avg.estimated":"Geschat op basis van je gemiddelde speelduur","avg.items_unit":"per week","avg.items_line":"{n} afleveringen en films per week","avg.items_line_one":"1 aflevering of film per week","days7.title":"Afgelopen 7 dagen","days7.busiest":"Drukste dag \xB7 {day}","days7.episodes":"Afleveringen","days7.movies":"Films","days7.none":"Niets bekeken in de afgelopen 7 dagen","catchup.title":"Achterstand","catchup.pick":"Toon {title} bij Hierna","catchup.waiting":"uitgezonden afleveringen wachten","catchup.about":"ongeveer {time}","catchup.none":"Je bent helemaal bij","catchup.show_all":"Toon alle {n}","catchup.show_less":"Toon minder","airing.title":"Deze week te zien","airing.today":"Vandaag","airing.none":"Niets te zien in de komende 7 dagen","airing.show_all":"Toon alle {n}","airing.show_less":"Toon minder","badge.premiere":"Premi\xE8re","badge.finale":"Finale","badge.mid_finale":"Finale van het halve seizoen","badge.not_aired":"Niet uitgezonden","badge.anime":"Anime","picks.title":"Meest bekeken","picks.actor":"Acteur","picks.director":"Regisseur","picks.writer":"Schrijver","picks.decade":"Decennium","picks.genre":"Genre","picks.country":"Land","picks.sub":"{n} titels \xB7 {time}","picks.sub_one":"{n} titel \xB7 {time}","picks.based_on":"Gebaseerd op {n} van {total} titels","picks.building":"Wordt nog opgebouwd","picks.progress":"Details ophalen bij TMDB \xB7 {n} van {total} titels","picks.progress_label":"Details opgehaald bij TMDB","picks.more":"Toon plaats 2 en 3","picks.less":"Verberg plaats 2 en 3","picks.waiting":"Details worden opgehaald bij TMDB. Dit vult zich bij de komende updates.","picks.none":"Nog niets om te tonen.","wrap.title":"Maandoverzicht","wrap.older":"Oudere maand","wrap.newer":"Nieuwere maand","wrap.items":"{n} items bekeken","wrap.items_one":"1 item bekeken","wrap.tab.overview":"Overzicht","wrap.tab.tastes":"Smaak","wrap.tab.patterns":"Patronen","wrap.tab.moments":"Momenten","wrap.hours":"Uren","wrap.episodes":"Afleveringen","wrap.movies":"Films","wrap.shows":"Series","wrap.anime":"Anime","wrap.vs":"{change} t.o.v. {month}","wrap.estimated":"Uren geschat op basis van gemiddelde speelduur","wrap.split":"Wat je keek","wrap.genres":"Topgenres","wrap.genres_none":"Genres verschijnen zodra TMDB-details beschikbaar zijn","wrap.discovery":"Ontdekkingen","wrap.first_watch":"Eerste keer","wrap.rewatch":"Opnieuw gekeken","wrap.new":"{n} nieuw","wrap.revisited":"{n} herzien","wrap.items_day":"Items / dag","wrap.hours_day":"Uren / dag","wrap.daily":"Dagelijkse activiteit","wrap.day":"{day}: {n}","wrap.busiest":"Drukste dag: {day} \xB7 {n} items","wrap.busiest_one":"Drukste dag: {day} \xB7 1 item","wrap.weekend":"In het weekend","wrap.streak":"Beste streak","wrap.active":"Actieve dagen","wrap.active_value":"{n} van {total}","wrap.most_watched":"Meest bekeken","wrap.episodes_n":"{n} afleveringen","wrap.episodes_n_one":"1 aflevering","wrap.movie_once":"Film","wrap.plays":"{n} keer bekeken","wrap.firsts":"Primeurs","wrap.first_from":"Eerste titel uit {country}","wrap.firsts_none":"Geen nieuwe landen deze maand","wrap.firsts_waiting":"TMDB-details worden nog opgehaald","wrap.none":"Nog geen afgeronde maand met kijkactiviteit","wrap.page.overview":"Jouw maand, samengevat","wrap.page.tastes":"Jouw smaak","wrap.page.patterns":"Jouw patronen","wrap.page.moments":"Jouw momenten","wrap.prev_page":"Vorige pagina","wrap.next_page":"Volgende pagina","wrap.insight_new":"{pct}% van wat je keek was nieuw","wrap.insight_weekday":"Je drukste dag van de week was {weekday}","wrap.insight_top":"{title} was je meest bekeken titel","empty.section":"Hier valt nog niets te tonen","fun.months":"Dat is ongeveer {n} maanden non-stop kijken","fun.months_one":"Dat is ongeveer {n} maand non-stop kijken","fun.years":"Dat is ongeveer {n} jaar non-stop kijken","fun.days":"Dat is ongeveer {n} dagen non-stop kijken","fun.days_one":"Dat is ongeveer {n} dag non-stop kijken","fun.workweeks":"Dat zijn ongeveer {n} fulltime werkweken","fun.lotr":"Genoeg voor de uitgebreide Lord of the Rings-trilogie ongeveer {n} keer","fun.flights":"Genoeg tijd om ongeveer {n} keer de wereld rond te vliegen","fun.sleep_nights":"Dat zijn ongeveer {n} nachten slaap","fun.sleep_years":"Dat is ongeveer {n} jaar slaap bij 8 uur per nacht","fun.sleep_years_one":"Dat is ongeveer {n} jaar slaap bij 8 uur per nacht","fun.movies":"Dat zijn ongeveer {n} gemiddelde films achter elkaar","fun.seasons":"Dat zijn ongeveer {n} complete seizoenen van 22 afleveringen","fun.marathons":"Genoeg tijd om ongeveer {n} marathons te lopen","fun.moon":"Genoeg voor ongeveer {n} enkele reizen naar de maan","fun.imdb":"Genoeg om de hele IMDb Top 250 ongeveer {n} keer te kijken"};var us={"card.name":"Statystyki Refract","card.description":"Czas ogl\u0105dania, biblioteka, seria dni i co obejrze\u0107 dalej z Twojego konta Refract.","empty.no_entity":"Wybierz encj\u0119 Refract, aby zacz\u0105\u0107.","empty.not_found":"Nie znaleziono encji Refract dla {entity}.","empty.nothing_up_next":"Nic na li\u015Bcie. Dodaj serial lub oznacz odcinek jako obejrzany.","hero.total":"\u0141\u0105czny czas ogl\u0105dania","hero.library":"Biblioteka","hero.movies_seen":"Obejrzane filmy","hero.episodes":"Obejrzane odcinki","unit.day":"dnia","unit.day_few":"dni","unit.day_many":"dni","unit.day_one":"dzie\u0144","unit.hour":"godziny","unit.hour_few":"godziny","unit.hour_many":"godzin","unit.hour_one":"godzina","unit.min":"min","unit.h":"h","header.last_watched":"Ostatnio obejrzane","library.title":"Biblioteka","library.titles":"tytu\u0142\xF3w","library.movies":"Filmy","library.shows":"Seriale","library.anime":"Anime","status.completed":"Obejrzane","status.up_to_date":"Na bie\u017C\u0105co","status.watchlist":"Do obejrzenia","status.in_progress":"W trakcie","status.on_hold":"Wstrzymane","status.dropped":"Porzucone","status.other":"Inne","watch.title":"Czas ogl\u0105dania","finish.title":"Do doko\u0144czenia","finish.none":"Nic do doko\u0144czenia","finish.movies":"{n} filmu do doko\u0144czenia","finish.movies_few":"{n} filmy do doko\u0144czenia","finish.movies_many":"{n} film\xF3w do doko\u0144czenia","finish.movies_one":"1 film do doko\u0144czenia","finish.shows":"{n} serialu do doko\u0144czenia","finish.shows_few":"{n} seriale do doko\u0144czenia","finish.shows_many":"{n} seriali do doko\u0144czenia","finish.shows_one":"1 serial do doko\u0144czenia","finish.anime":"{n} anime do doko\u0144czenia","finish.anime_few":"{n} anime do doko\u0144czenia","finish.anime_many":"{n} anime do doko\u0144czenia","finish.anime_one":"1 anime do doko\u0144czenia","streak.title":"Seria","streak.longest":"Najd\u0142u\u017Csza: {n} {unit}","streak.best":"Rekord {n}","streak.still_time":"dzisiaj jeszcze jest czas","streak.none":"Brak aktywnej serii","next.title":"Nast\u0119pne","next.progress":"{watched} z {aired} wyemitowanych odcink\xF3w","next.remaining":"Pozosta\u0142o: {n}","next.mark":"Oznacz jako obejrzane","next.confirm":"Oznaczy\u0107 jako obejrzane?","next.busy":"Oznaczanie\u2026","next.done":"Oznaczono","next.error":"Nie uda\u0142o si\u0119 oznaczy\u0107 jako obejrzane","avg.title":"\u015Arednia tygodniowo","avg.vs_previous":"w por\xF3wnaniu z poprzednimi 4 tygodniami","avg.estimated":"Oszacowano na podstawie Twojej \u015Bredniej d\u0142ugo\u015Bci","avg.items_unit":"tygodniowo","avg.items_line":"{n} odcinka i filmu tygodniowo","avg.items_line_few":"{n} odcinki i filmy tygodniowo","avg.items_line_many":"{n} odcink\xF3w i film\xF3w tygodniowo","avg.items_line_one":"1 odcinek lub film tygodniowo","days7.title":"Ostatnie 7 dni","days7.busiest":"Najaktywniejszy dzie\u0144 \xB7 {day}","days7.episodes":"Odcinki","days7.movies":"Filmy","days7.none":"Nic nie obejrzano w ci\u0105gu ostatnich 7 dni","catchup.title":"Zaleg\u0142o\u015Bci","catchup.pick":"Poka\u017C {title} w Nast\u0119pne","catchup.waiting":"wyemitowane odcinki czekaj\u0105","catchup.about":"oko\u0142o {time}","catchup.none":"Jeste\u015B na bie\u017C\u0105co","catchup.show_all":"Poka\u017C wszystkie ({n})","catchup.show_less":"Poka\u017C mniej","airing.title":"Emisje w tym tygodniu","airing.today":"Dzisiaj","airing.none":"Nic nie jest emitowane w ci\u0105gu najbli\u017Cszych 7 dni","airing.show_all":"Poka\u017C wszystkie ({n})","airing.show_less":"Poka\u017C mniej","badge.premiere":"Premiera","badge.finale":"Fina\u0142","badge.mid_finale":"Fina\u0142 po\u0142owy sezonu","badge.not_aired":"Niewyemitowany","badge.anime":"Anime","picks.title":"Najcz\u0119\u015Bciej ogl\u0105dane","picks.actor":"Aktor","picks.director":"Re\u017Cyser","picks.writer":"Scenarzysta","picks.decade":"Dekada","picks.genre":"Gatunek","picks.country":"Kraj","picks.sub":"{n} tytu\u0142u \xB7 {time}","picks.sub_few":"{n} tytu\u0142y \xB7 {time}","picks.sub_many":"{n} tytu\u0142\xF3w \xB7 {time}","picks.sub_one":"{n} tytu\u0142 \xB7 {time}","picks.based_on":"Na podstawie {n} z {total} tytu\u0142\xF3w","picks.building":"Wci\u0105\u017C w budowie","picks.progress":"Pobieranie szczeg\xF3\u0142\xF3w z TMDB \xB7 {n} z {total} tytu\u0142\xF3w","picks.progress_label":"Szczeg\xF3\u0142y pobrane z TMDB","picks.more":"Poka\u017C miejsca 2 i 3","picks.less":"Ukryj miejsca 2 i 3","picks.waiting":"Pobieranie szczeg\xF3\u0142\xF3w z TMDB. Uzupe\u0142ni si\u0119 podczas kolejnych aktualizacji.","picks.none":"Na razie nie ma nic do pokazania.","wrap.title":"Podsumowanie miesi\u0105ca","wrap.older":"Starszy miesi\u0105c","wrap.newer":"Nowszy miesi\u0105c","wrap.items":"Obejrzano: {n}","wrap.items_one":"Obejrzano: 1","wrap.tab.overview":"Przegl\u0105d","wrap.tab.tastes":"Gusta","wrap.tab.patterns":"Wzorce","wrap.tab.moments":"Momenty","wrap.hours":"Godziny","wrap.episodes":"Odcinki","wrap.movies":"Filmy","wrap.shows":"Seriale","wrap.anime":"Anime","wrap.vs":"{change} vs {month}","wrap.estimated":"Godziny oszacowano na podstawie \u015Brednich czas\xF3w trwania","wrap.split":"Co ogl\u0105dasz","wrap.genres":"Najcz\u0119stsze gatunki","wrap.genres_none":"Gatunki pojawi\u0105 si\u0119, gdy b\u0119d\u0105 dost\u0119pne szczeg\xF3\u0142y z TMDB","wrap.discovery":"Odkrycia","wrap.first_watch":"Pierwsze obejrzenie","wrap.rewatch":"Ponowne obejrzenie","wrap.new":"{n} nowych","wrap.revisited":"{n} powt\xF3rzonych","wrap.items_day":"Pozycji / dzie\u0144","wrap.hours_day":"Godzin / dzie\u0144","wrap.daily":"Dzienna aktywno\u015B\u0107","wrap.day":"{day}: {n}","wrap.busiest":"Najaktywniejszy dzie\u0144: {day} ({n})","wrap.busiest_one":"Najaktywniejszy dzie\u0144: {day} (1)","wrap.weekend":"W weekendy","wrap.streak":"Najlepsza seria","wrap.active":"Aktywne dni","wrap.active_value":"{n} z {total}","wrap.most_watched":"Najcz\u0119\u015Bciej ogl\u0105dane","wrap.episodes_n":"{n} odcinka","wrap.episodes_n_few":"{n} odcinki","wrap.episodes_n_many":"{n} odcink\xF3w","wrap.episodes_n_one":"1 odcinek","wrap.movie_once":"Film","wrap.plays":"Obejrzano {n} razy","wrap.firsts":"Nowo\u015Bci","wrap.first_from":"Pierwszy tytu\u0142 z kraju: {country}","wrap.firsts_none":"Brak nowych kraj\xF3w w tym miesi\u0105cu","wrap.firsts_waiting":"Szczeg\xF3\u0142y z TMDB s\u0105 jeszcze pobierane","wrap.none":"Brak zako\u0144czonego miesi\u0105ca z ogl\u0105daniem","wrap.page.overview":"Tw\xF3j miesi\u0105c w skr\xF3cie","wrap.page.tastes":"Twoje gusta","wrap.page.patterns":"Twoje wzorce","wrap.page.moments":"Twoje momenty","wrap.prev_page":"Poprzednia strona","wrap.next_page":"Nast\u0119pna strona","wrap.insight_new":"{pct}% Twoich seans\xF3w by\u0142o nowych","wrap.insight_weekday":"Tw\xF3j najaktywniejszy dzie\u0144 tygodnia to {weekday}","wrap.insight_top":"{title} to Tw\xF3j najcz\u0119\u015Bciej ogl\u0105dany tytu\u0142","empty.section":"Na razie nie ma tu nic do pokazania","fun.months":"To oko\u0142o {n} miesi\u0105ca nieprzerwanego ogl\u0105dania","fun.months_few":"To oko\u0142o {n} miesi\u0105ce nieprzerwanego ogl\u0105dania","fun.months_many":"To oko\u0142o {n} miesi\u0119cy nieprzerwanego ogl\u0105dania","fun.months_one":"To oko\u0142o {n} miesi\u0105c nieprzerwanego ogl\u0105dania","fun.years":"To oko\u0142o {n} roku nieprzerwanego ogl\u0105dania","fun.years_few":"To oko\u0142o {n} lata nieprzerwanego ogl\u0105dania","fun.years_many":"To oko\u0142o {n} lat nieprzerwanego ogl\u0105dania","fun.days":"To oko\u0142o {n} dnia nieprzerwanego ogl\u0105dania","fun.days_few":"To oko\u0142o {n} dni nieprzerwanego ogl\u0105dania","fun.days_many":"To oko\u0142o {n} dni nieprzerwanego ogl\u0105dania","fun.days_one":"To oko\u0142o {n} dzie\u0144 nieprzerwanego ogl\u0105dania","fun.workweeks":"To oko\u0142o {n} tygodnia pracy w pe\u0142nym wymiarze","fun.workweeks_few":"To oko\u0142o {n} tygodnie pracy w pe\u0142nym wymiarze","fun.workweeks_many":"To oko\u0142o {n} tygodni pracy w pe\u0142nym wymiarze","fun.lotr":"Wystarczy na rozszerzon\u0105 trylogi\u0119 W\u0142adcy Pier\u015Bcieni oko\u0142o {n} razy","fun.flights":"Tyle czasu wystarczy, by oko\u0142o {n} razy oblecie\u0107 \u015Bwiat","fun.sleep_nights":"To oko\u0142o {n} nocy snu","fun.sleep_nights_few":"To oko\u0142o {n} noce snu","fun.sleep_nights_many":"To oko\u0142o {n} nocy snu","fun.sleep_years":"To oko\u0142o {n} roku snu przy 8 godzinach na dob\u0119","fun.sleep_years_few":"To oko\u0142o {n} lata snu przy 8 godzinach na dob\u0119","fun.sleep_years_many":"To oko\u0142o {n} lat snu przy 8 godzinach na dob\u0119","fun.sleep_years_one":"To oko\u0142o {n} rok snu przy 8 godzinach na dob\u0119","fun.movies":"To oko\u0142o {n} filmu o \u015Bredniej d\u0142ugo\u015Bci jeden po drugim","fun.movies_few":"To oko\u0142o {n} filmy o \u015Bredniej d\u0142ugo\u015Bci jeden po drugim","fun.movies_many":"To oko\u0142o {n} film\xF3w o \u015Bredniej d\u0142ugo\u015Bci jeden po drugim","fun.seasons":"To oko\u0142o {n} pe\u0142nego 22-odcinkowego sezonu","fun.seasons_few":"To oko\u0142o {n} pe\u0142ne 22-odcinkowe sezony","fun.seasons_many":"To oko\u0142o {n} pe\u0142nych 22-odcinkowych sezon\xF3w","fun.marathons":"Tyle czasu wystarczy na oko\u0142o {n} maratonu","fun.marathons_few":"Tyle czasu wystarczy na oko\u0142o {n} maratony","fun.marathons_many":"Tyle czasu wystarczy na oko\u0142o {n} maraton\xF3w","fun.moon":"Wystarczy na oko\u0142o {n} lotu w jedn\u0105 stron\u0119 na Ksi\u0119\u017Cyc","fun.moon_few":"Wystarczy na oko\u0142o {n} loty w jedn\u0105 stron\u0119 na Ksi\u0119\u017Cyc","fun.moon_many":"Wystarczy na oko\u0142o {n} lot\xF3w w jedn\u0105 stron\u0119 na Ksi\u0119\u017Cyc","fun.imdb":"Wystarczy, by obejrze\u0107 ca\u0142e IMDb Top 250 oko\u0142o {n} razy","fun.years_one":"To oko\u0142o {n} rok nieprzerwanego ogl\u0105dania","fun.workweeks_one":"To oko\u0142o {n} tydzie\u0144 pracy w pe\u0142nym wymiarze","fun.sleep_nights_one":"To oko\u0142o {n} noc snu","fun.movies_one":"To oko\u0142o {n} film o \u015Bredniej d\u0142ugo\u015Bci","fun.seasons_one":"To oko\u0142o {n} pe\u0142ny 22-odcinkowy sezon","fun.marathons_one":"Tyle czasu wystarczy na oko\u0142o {n} maraton","fun.moon_one":"Wystarczy na oko\u0142o {n} lot w jedn\u0105 stron\u0119 na Ksi\u0119\u017Cyc"};var hs={"card.name":"Estat\xEDsticas do Refract","card.description":"Tempo de visualiza\xE7\xE3o, biblioteca, sequ\xEAncia e o que ver a seguir na sua conta Refract.","empty.no_entity":"Escolha uma entidade Refract para come\xE7ar.","empty.not_found":"Nenhuma entidade Refract encontrada para {entity}.","empty.nothing_up_next":"Nada a seguir. Adicione uma s\xE9rie ou marque um epis\xF3dio como visto.","hero.total":"Tempo total de visualiza\xE7\xE3o","hero.library":"Biblioteca","hero.movies_seen":"Filmes vistos","hero.episodes":"Epis\xF3dios vistos","unit.day":"dias","unit.day_one":"dia","unit.hour":"horas","unit.hour_one":"hora","unit.min":"min","unit.h":"h","header.last_watched":"\xDAltimo visto","library.title":"Biblioteca","library.titles":"t\xEDtulos","library.movies":"Filmes","library.shows":"S\xE9ries","library.anime":"Anime","status.completed":"Visto","status.up_to_date":"Em dia","status.watchlist":"Para ver","status.in_progress":"Em andamento","status.on_hold":"Em pausa","status.dropped":"Abandonado","status.other":"Outro","watch.title":"Tempo de visualiza\xE7\xE3o","finish.title":"Ainda por terminar","finish.none":"Nada por terminar","finish.movies":"{n} filmes por terminar","finish.movies_one":"1 filme por terminar","finish.shows":"{n} s\xE9ries por terminar","finish.shows_one":"1 s\xE9rie por terminar","finish.anime":"{n} animes por terminar","finish.anime_one":"1 anime por terminar","streak.title":"Sequ\xEAncia","streak.longest":"Mais longa: {n} {unit}","streak.best":"Melhor {n}","streak.still_time":"ainda h\xE1 tempo hoje","streak.none":"Nenhuma sequ\xEAncia ativa","next.title":"A seguir","next.progress":"{watched} de {aired} epis\xF3dios exibidos","next.remaining":"{n} restantes","next.mark":"Marcar como visto","next.confirm":"Marcar como visto?","next.busy":"Marcando\u2026","next.done":"Marcado","next.error":"N\xE3o foi poss\xEDvel marcar como visto","avg.title":"M\xE9dia por semana","avg.vs_previous":"em rela\xE7\xE3o \xE0s 4 semanas anteriores","avg.estimated":"Estimado com base na sua dura\xE7\xE3o m\xE9dia","avg.items_unit":"por semana","avg.items_line":"{n} epis\xF3dios e filmes por semana","avg.items_line_one":"1 epis\xF3dio ou filme por semana","days7.title":"\xDAltimos 7 dias","days7.busiest":"Dia mais ativo \xB7 {day}","days7.episodes":"Epis\xF3dios","days7.movies":"Filmes","days7.none":"Nada visto nos \xFAltimos 7 dias","catchup.title":"Epis\xF3dios em atraso","catchup.pick":"Mostrar {title} em A seguir","catchup.waiting":"epis\xF3dios exibidos \xE0 espera","catchup.about":"cerca de {time}","catchup.none":"Est\xE1 tudo em dia","catchup.show_all":"Mostrar todos ({n})","catchup.show_less":"Mostrar menos","airing.title":"Exibi\xE7\xE3o esta semana","airing.today":"Hoje","airing.none":"Nada a ser exibido nos pr\xF3ximos 7 dias","airing.show_all":"Mostrar todos ({n})","airing.show_less":"Mostrar menos","badge.premiere":"Estreia","badge.finale":"Final","badge.mid_finale":"Final de meia temporada","badge.not_aired":"N\xE3o exibido","badge.anime":"Anime","picks.title":"Mais vistos","picks.actor":"Ator","picks.director":"Diretor","picks.writer":"Roteirista","picks.decade":"D\xE9cada","picks.genre":"G\xEAnero","picks.country":"Pa\xEDs","picks.sub":"{n} t\xEDtulos \xB7 {time}","picks.sub_one":"{n} t\xEDtulo \xB7 {time}","picks.based_on":"Baseado em {n} de {total} t\xEDtulos","picks.building":"Ainda em constru\xE7\xE3o","picks.progress":"Coletando detalhes do TMDB \xB7 {n} de {total} t\xEDtulos","picks.progress_label":"Detalhes coletados do TMDB","picks.more":"Mostrar as posi\xE7\xF5es 2 e 3","picks.less":"Ocultar as posi\xE7\xF5es 2 e 3","picks.waiting":"Coletando detalhes do TMDB. Isso ser\xE1 preenchido nas pr\xF3ximas atualiza\xE7\xF5es.","picks.none":"Ainda n\xE3o h\xE1 nada para mostrar.","wrap.title":"Resumo mensal","wrap.older":"M\xEAs anterior","wrap.newer":"M\xEAs seguinte","wrap.items":"{n} itens assistidos","wrap.items_one":"1 item assistido","wrap.tab.overview":"Vis\xE3o geral","wrap.tab.tastes":"Gostos","wrap.tab.patterns":"Padr\xF5es","wrap.tab.moments":"Momentos","wrap.hours":"Horas","wrap.episodes":"Epis\xF3dios","wrap.movies":"Filmes","wrap.shows":"S\xE9ries","wrap.anime":"Anime","wrap.vs":"{change} em rela\xE7\xE3o a {month}","wrap.estimated":"Horas estimadas com base em dura\xE7\xF5es m\xE9dias","wrap.split":"O que voc\xEA assistiu","wrap.genres":"Principais g\xEAneros","wrap.genres_none":"Os g\xEAneros aparecem quando os detalhes do TMDB estiverem dispon\xEDveis","wrap.discovery":"Descobertas","wrap.first_watch":"Primeira vez","wrap.rewatch":"Reassistido","wrap.new":"{n} novos","wrap.revisited":"{n} reassistidos","wrap.items_day":"Itens / dia","wrap.hours_day":"Horas / dia","wrap.daily":"Atividade di\xE1ria","wrap.day":"{day}: {n}","wrap.busiest":"Dia mais ativo: {day} \xB7 {n} itens","wrap.busiest_one":"Dia mais ativo: {day} \xB7 1 item","wrap.weekend":"Nos fins de semana","wrap.streak":"Melhor sequ\xEAncia","wrap.active":"Dias ativos","wrap.active_value":"{n} de {total}","wrap.most_watched":"Mais vistos","wrap.episodes_n":"{n} epis\xF3dios","wrap.episodes_n_one":"1 epis\xF3dio","wrap.movie_once":"Filme","wrap.plays":"{n} exibi\xE7\xF5es","wrap.firsts":"Novidades","wrap.first_from":"Primeiro t\xEDtulo de {country}","wrap.firsts_none":"Nenhum pa\xEDs novo neste m\xEAs","wrap.firsts_waiting":"Ainda coletando detalhes do TMDB","wrap.none":"Ainda n\xE3o h\xE1 nenhum m\xEAs completo com atividade","wrap.page.overview":"Seu m\xEAs, resumido","wrap.page.tastes":"Seus gostos","wrap.page.patterns":"Seus padr\xF5es","wrap.page.moments":"Seus momentos","wrap.prev_page":"P\xE1gina anterior","wrap.next_page":"Pr\xF3xima p\xE1gina","wrap.insight_new":"{pct}% do que voc\xEA assistiu era novo","wrap.insight_weekday":"Seu dia da semana mais ativo foi {weekday}","wrap.insight_top":"{title} foi o seu t\xEDtulo mais visto","empty.section":"Ainda n\xE3o h\xE1 nada para mostrar aqui","fun.months":"S\xE3o cerca de {n} meses de visualiza\xE7\xE3o cont\xEDnua","fun.months_one":"\xC9 cerca de {n} m\xEAs de visualiza\xE7\xE3o cont\xEDnua","fun.years":"S\xE3o cerca de {n} anos de visualiza\xE7\xE3o cont\xEDnua","fun.days":"S\xE3o cerca de {n} dias de visualiza\xE7\xE3o cont\xEDnua","fun.days_one":"\xC9 cerca de {n} dia de visualiza\xE7\xE3o cont\xEDnua","fun.workweeks":"S\xE3o cerca de {n} semanas de trabalho em tempo integral","fun.lotr":"D\xE1 para ver a trilogia estendida de O Senhor dos An\xE9is cerca de {n} vezes","fun.flights":"Tempo suficiente para dar a volta ao mundo de avi\xE3o cerca de {n} vezes","fun.sleep_nights":"S\xE3o cerca de {n} noites de sono","fun.sleep_years":"S\xE3o cerca de {n} anos de sono, \xE0 raz\xE3o de 8 horas por noite","fun.sleep_years_one":"\xC9 cerca de {n} ano de sono, \xE0 raz\xE3o de 8 horas por noite","fun.movies":"S\xE3o cerca de {n} filmes de dura\xE7\xE3o m\xE9dia em sequ\xEAncia","fun.seasons":"S\xE3o cerca de {n} temporadas completas de 22 epis\xF3dios","fun.marathons":"Tempo suficiente para correr cerca de {n} maratonas","fun.moon":"D\xE1 para fazer cerca de {n} viagens s\xF3 de ida \xE0 Lua","fun.imdb":"D\xE1 para ver todo o Top 250 do IMDb cerca de {n} vezes"};var Ne={"card.name":"Refract stats","card.description":"Watch time, library, streak and what to watch next from your Refract account.","empty.no_entity":"Choose a Refract entity to get started.","empty.not_found":"Couldn't find any Refract entities for {entity}.","empty.nothing_up_next":"Nothing up next. Add a show or mark an episode watched.","hero.total":"Total watch time","hero.library":"Library","hero.movies_seen":"Movies seen","hero.episodes":"Episodes watched","unit.day":"days","unit.day_one":"day","unit.hour":"hours","unit.hour_one":"hour","unit.min":"min","unit.h":"h","header.last_watched":"Last watched","library.title":"Library","library.titles":"titles","library.movies":"Movies","library.shows":"TV shows","library.anime":"Anime","status.completed":"Watched","status.up_to_date":"Up to Date","status.watchlist":"Plan to Watch","status.in_progress":"Watching","status.on_hold":"On Hold","status.dropped":"Dropped","status.other":"Other","watch.title":"Watch time","finish.title":"Still to finish","finish.none":"Nothing left to finish","finish.movies":"{n} movies to finish","finish.movies_one":"1 movie to finish","finish.shows":"{n} TV shows to finish","finish.shows_one":"1 TV show to finish","finish.anime":"{n} anime to finish","finish.anime_one":"1 anime to finish","streak.title":"Streak","streak.longest":"Longest: {n} {unit}","streak.best":"Best {n}","streak.still_time":"still time today","streak.none":"No active streak","next.title":"Next up","next.progress":"{watched} of {aired} aired episodes","next.remaining":"{n} remaining","next.mark":"Mark watched","next.confirm":"Mark watched?","next.busy":"Marking\u2026","next.done":"Marked","next.error":"Couldn't mark watched","avg.title":"Average per week","avg.vs_previous":"vs previous 4 weeks","avg.estimated":"Estimated from your average runtime","avg.items_unit":"a week","avg.items_line":"{n} episodes and movies a week","avg.items_line_one":"1 episode or movie a week","days7.title":"Last 7 days","days7.busiest":"Busiest day \xB7 {day}","days7.episodes":"Episodes","days7.movies":"Movies","days7.none":"Nothing watched in the last 7 days","catchup.title":"Catch-up backlog","catchup.pick":"Show {title} in Next up","catchup.waiting":"aired episodes waiting","catchup.about":"about {time}","catchup.none":"You're all caught up","catchup.show_all":"Show all {n}","catchup.show_less":"Show less","airing.title":"Airing this week","airing.today":"Today","airing.none":"Nothing airing in the next 7 days","airing.show_all":"Show all {n}","airing.show_less":"Show less","badge.premiere":"Premiere","badge.finale":"Finale","badge.mid_finale":"Mid-season finale","badge.not_aired":"Not aired","badge.anime":"Anime","picks.title":"Most watched","picks.actor":"Actor","picks.director":"Director","picks.writer":"Writer","picks.decade":"Decade","picks.genre":"Genre","picks.country":"Country","picks.sub":"{n} titles \xB7 {time}","picks.sub_one":"{n} title \xB7 {time}","picks.based_on":"Based on {n} of {total} titles","picks.building":"Still building","picks.progress":"Collecting details from TMDB \xB7 {n} of {total} titles","picks.progress_label":"Details collected from TMDB","picks.more":"Show places 2 and 3","picks.less":"Hide places 2 and 3","picks.waiting":"Collecting details from TMDB. This fills in over the next few updates.","picks.none":"Nothing to show yet.","wrap.title":"Monthly wrap","wrap.older":"Older month","wrap.newer":"Newer month","wrap.items":"{n} items watched","wrap.items_one":"1 item watched","wrap.tab.overview":"Overview","wrap.tab.tastes":"Tastes","wrap.tab.patterns":"Patterns","wrap.tab.moments":"Moments","wrap.hours":"Hours","wrap.episodes":"Episodes","wrap.movies":"Movies","wrap.shows":"Shows","wrap.anime":"Anime","wrap.vs":"{change} vs {month}","wrap.estimated":"Hours are estimated from average runtimes","wrap.split":"What you watched","wrap.genres":"Top genres","wrap.genres_none":"Genres appear once TMDB details are available","wrap.discovery":"Discovery","wrap.first_watch":"First watch","wrap.rewatch":"Rewatch","wrap.new":"{n} new","wrap.revisited":"{n} revisited","wrap.items_day":"Items / day","wrap.hours_day":"Hours / day","wrap.daily":"Daily activity","wrap.day":"{day}: {n}","wrap.busiest":"Busiest day: {day} \xB7 {n} items","wrap.busiest_one":"Busiest day: {day} \xB7 1 item","wrap.weekend":"On weekends","wrap.streak":"Best streak","wrap.active":"Active days","wrap.active_value":"{n} of {total}","wrap.most_watched":"Most watched","wrap.episodes_n":"{n} episodes","wrap.episodes_n_one":"1 episode","wrap.movie_once":"Movie","wrap.plays":"{n} plays","wrap.firsts":"Firsts","wrap.first_from":"First title from {country}","wrap.firsts_none":"No new countries this month","wrap.firsts_waiting":"Still collecting details from TMDB","wrap.none":"No completed month with watches yet","wrap.page.overview":"Your month, wrapped","wrap.page.tastes":"Your tastes","wrap.page.patterns":"Your patterns","wrap.page.moments":"Your moments","wrap.prev_page":"Previous page","wrap.next_page":"Next page","wrap.insight_new":"{pct}% of your watches were brand new","wrap.insight_weekday":"Your busiest day of the week was {weekday}","wrap.insight_top":"{title} was your most watched title","empty.section":"Nothing to show here yet","fun.months":"That's about {n} months of nonstop viewing","fun.months_one":"That's about {n} month of nonstop viewing","fun.years":"That's about {n} years of nonstop viewing","fun.days":"That's about {n} days of nonstop viewing","fun.days_one":"That's about {n} day of nonstop viewing","fun.workweeks":"That's about {n} full-time work weeks","fun.lotr":"Enough for the extended Lord of the Rings trilogy about {n} times","fun.flights":"Enough time to fly around the world about {n} times","fun.sleep_nights":"That's about {n} nights of sleep","fun.sleep_years":"That's about {n} years of sleep at 8 hours a night","fun.sleep_years_one":"That's about {n} year of sleep at 8 hours a night","fun.movies":"That's about {n} average movies back to back","fun.seasons":"That's about {n} full 22-episode TV seasons","fun.marathons":"Enough time to run about {n} marathons","fun.moon":"Enough for about {n} one-way trips to the Moon","fun.imdb":"Enough to watch the whole IMDb Top 250 about {n} times"},gs={en:Ne,de:rs,fr:ds,es:cs,it:ps,nl:ls,pt:hs,pl:us},zn=Object.keys(gs);function C(n){return n?.locale?.language||n?.language||"en"}function fs(n){return gs[C(n).split("-")[0]]??Ne}function ws(n,t){for(let[e,i]of Object.entries(t))n=n.split(`{${e}}`).join(String(i));return n}function p(n,t,e={}){return ws(fs(n)[t]??Ne[t]??t,e)}var ms=new Map;function Xs(n,t){try{let e=ms.get(n);return e||ms.set(n,e=new Intl.PluralRules(n)),e.select(t)}catch{return t===1?"one":"other"}}function I(n,t,e,i={}){let s=Xs(C(n).split("-")[0],e),a=fs(n),o=d=>s==="other"?d[t]:d[`${t}_${s}`]??d[t];return ws(o(a)??o(Ne)??Ne[t]??t,i)}var vt=864e5;function be(n){if(!n)return;let t=n.state;if(t==="unknown"||t==="unavailable"||t===""||t==null)return;let e=Number(t);return Number.isFinite(e)?e:void 0}function ge(n){return!!n&&n.state!=="unavailable"&&n.state!=="unknown"}function y(n,t="en",e=0){try{return new Intl.NumberFormat(t,{maximumFractionDigits:e}).format(n)}catch{return String(Math.round(n))}}var ei={fr:{d:"j"},it:{d:"g"},nl:{h:"u"}},Z=(n,t,e)=>{let i=y(n,e),s=ei[e.split("-")[0]]?.[t]??t;return t==="d"?{value:i,n,unit:"unit.day",short:s}:t==="h"?{value:i,n,unit:"unit.hour",short:s}:{value:i,n,unit:"unit.min",short:s}};function Xe(n,t="days_hours",e="en"){let i=Math.max(0,Math.round(n)),s=Math.floor(i/1440),a=Math.floor(i%1440/60),o=i%60;if(t==="hours"){let d=Math.floor(i/60);return d>0?[Z(d,"h",e)]:[Z(o,"min",e)]}return t==="auto"?s>=1?[Z(s,"d",e),Z(a,"h",e)]:a>=1?[Z(a,"h",e),Z(o,"min",e)]:[Z(o,"min",e)]:s>=1?[Z(s,"d",e),Z(a,"h",e)]:a>=1?[Z(a,"h",e)]:[Z(o,"min",e)]}function je(n,t="days_hours",e="en"){return Xe(n,t,e).map(i=>`${i.value} ${i.short}`).join(" ")}function _s(n){let t=n.reduce((o,d)=>o+d,0);if(t<=0)return n.map(()=>0);let e=n.map(o=>o/t*100),i=e.map(Math.floor),s=100-i.reduce((o,d)=>o+d,0),a=e.map((o,d)=>({i:d,frac:o-Math.floor(o)})).sort((o,d)=>d.frac-o.frac);for(let{i:o}of a){if(s<=0)break;i[o]+=1,s-=1}return i}var ti={workweeks:40*60,lotr:726,flights:2670,movies:100,seasons:22*42,marathons:270,moon:3*1440,imdb:250*130},si=["months","workweeks","lotr","flights","sleep","movies","seasons","marathons","moon","imdb"];function _t(n,t,e){let i=C(n),s=(r,l,h=0)=>{let m=h?Math.round(l*10**h)/10**h:Math.round(l);return I(n,r,m,{n:y(l,i,h)})},a=e/1440;if(t==="months"){if(a<1)return;if(a<30)return s("fun.days",a);let r=a/30.4375;return r<24?s("fun.months",r,1):s("fun.years",r/12,1)}if(t==="sleep"){let r=e/480;return r<365?r>=2?s("fun.sleep_nights",r):void 0:s("fun.sleep_years",r/365.25,1)}let o=ti[t];if(!o)return;let d=e/o;return d>=2?s(`fun.${t}`,d):void 0}function vs(n,t,e="rotate",i=Date.now()){if(!(t>=1440))return;if(e!=="rotate")return _t(n,e,t);let s=si.filter(o=>_t(n,o,t));if(!s.length)return;let a=s[Math.floor(i/vt)%s.length];return _t(n,a,t)}function ys(n,t){let e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(n),i=s=>Number(e.find(a=>a.type===s)?.value);return Math.round(Date.UTC(i("year"),i("month")-1,i("day"))/vt)}function bs(n){let{now:t,lastWatchedIso:e,current:i,timeZone:s,lang:a="en"}=n,o=ys(t,s),d=e?new Date(e):void 0,r=d&&!isNaN(d.getTime())?ys(d,s):void 0,l=new Intl.DateTimeFormat(a,{weekday:"narrow",timeZone:"UTC"}),h=[];for(let f=6;f>=0;f--){let x=o-f,T=r!==void 0&&i>0&&x<=r&&x>r-i;h.push({label:l.format(new Date(x*vt)),filled:T,today:f===0})}let m=h[6].filled;return{days:h,todayFilled:m,stillTimeToday:!m&&i>0&&r===o-1}}function bt(n,t){let e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(n),i=s=>e.find(a=>a.type===s)?.value??"";return`${i("year")}-${i("month")}-${i("day")}`}function et(n,t,e){return new Intl.DateTimeFormat(t,{weekday:e,timeZone:"UTC"}).format(new Date(`${n}T00:00:00Z`))}function ks(n,t,e,i){let s=new Date(n);if(!Number.isNaN(s.getTime()))try{return new Intl.DateTimeFormat(t,{hour:"numeric",minute:"2-digit",timeZone:e,hour12:i}).format(s)}catch{return}}var ke=["actor","director","writer","decade","genre","country"],se=["hero","watch_time","library","still_to_finish","streak","average","last_7_days","top_picks","monthly_wrap","next_up","catchup","airing"];function tt(n){let t=[];if(Array.isArray(n))for(let e of n)se.includes(e)&&!t.includes(e)&&t.push(e);for(let e of se)t.includes(e)||t.push(e);return t}var ii=["hero","still_to_finish","next_up"];function kt(n){let t=n??{};return t.section_order!==void 0&&t.section_order!==null||t.show_queue===!1||t.top_picks_items!==void 0&&t.top_picks_items!==null?!0:se.some(e=>t[`show_${e}`]===!1)}function xe(n){let t=n?.layout;return t==="full"||t==="compact"||t==="custom"?t:kt(n)?"custom":"full"}function xt(n,t){if(n==="full")return[...se];if(n==="compact")return se.filter(i=>ii.includes(i));let e=i=>{let s=t[`show_${i}`];return s===void 0?fe[`show_${i}`]!==!1:s!==!1};return tt(t.section_order).filter(e)}var fe={layout:"full",library_style:"list",watch_time_style:"list",duration_format:"days_hours",fun_stat:!0,fun_stat_mode:"rotate",queue_length:5,airing_length:5,show_hero:!0,show_watch_time:!0,show_library:!0,show_still_to_finish:!0,show_streak:!0,show_average:!0,show_last_7_days:!0,show_top_picks:!0,show_monthly_wrap:!0,wrap_style:"pages",show_next_up:!0,show_catchup:!0,show_airing:!0,top_picks_items:[...ke],show_posters:!0,show_actions:!1,confirm_actions:!0};function W(n){return n.tmdbId!==void 0?`tmdb:${n.tmdbId}`:n.refractId?`refract:${n.refractId}`:`title:${n.title.toLowerCase()}`}var _=n=>typeof n=="number"&&Number.isFinite(n)?n:void 0,st=n=>{let t=n.filter(e=>e!==void 0);return t.length?t.reduce((e,i)=>e+i,0):void 0};function $t(n,t){let e=n?.show??{},i=e.title??t;if(!i)return;let s=n?.next_episode??{};return{title:i,year:_(e.year),isAnime:!!e.is_anime,status:typeof n?.status=="string"?n.status:void 0,season:_(s.season),number:_(s.number),episodeName:typeof s.name=="string"?s.name:void 0,aired:s.aired!==!1,premiere:!!s.is_season_premiere,finale:!!s.is_season_finale,midFinale:!!s.is_mid_season_finale,airedEpisodes:_(n?.aired_episodes),remaining:_(n?.remaining_episodes),refractId:typeof e.ids?.refract=="string"?e.ids.refract:void 0,tmdbId:_(e.ids?.tmdb),posterUrl:typeof n?.poster_url=="string"&&n.poster_url?n.poster_url:void 0}}var xs=["completed","up_to_date","in_progress","planned","on_hold","dropped"],ni={watchlist:"planned",paused:"on_hold",onhold:"on_hold",abandoned:"dropped"};function ai(n){if(!n||typeof n!="object"||Array.isArray(n))return;let t=new Map;for(let[i,s]of Object.entries(n)){let a=_(s);if(a===void 0||a<=0)continue;let o=i.trim().toLowerCase().replace(/[\s-]+/g,"_"),d=ni[o]??o;t.set(d,(t.get(d)??0)+a)}if(!t.size)return;let e=i=>{let s=xs.indexOf(i);return s===-1?xs.length:s};return[...t.entries()].map(([i,s])=>({key:i,count:s})).sort((i,s)=>e(i.key)-e(s.key)||i.key.localeCompare(s.key))}function $s(n,t,e){let i=$=>{let k=t.entities[$];return k?n.states[k]:void 0},s=$=>be(i($)),a=Object.keys(t.entities).length>0,o=is(e.name??ns(n,t)),d=s("movies"),r=s("tv_shows"),l=s("anime"),h=s("library_total")??st([d,r,l]),m=s("completed"),f=s("in_progress"),x=s("up_to_date"),T=s("watchlist"),V=st([m,f,x,T]),v=h!==void 0&&V!==void 0?Math.max(0,h-V):void 0,E=ai(i("library_total")?.attributes?.by_status),R=s("stats_watch_time_shows_minutes"),Y=s("stats_watch_time_movies_minutes"),q=s("stats_watch_time_anime_minutes"),ne=s("stats_watch_time_total_minutes")??st([R,Y,q]),B=i("last_watched"),we=ge(B)?{iso:B.state,title:typeof B.attributes.title=="string"?B.attributes.title:void 0,season:_(B.attributes.season),episode:_(B.attributes.episode)}:void 0,F=s("stats_streak_current_days"),ae=s("stats_streak_longest_days"),b=i("next_up"),A={kind:"hidden"};if(b&&b.state!=="unavailable"){let $=ge(b)?$t(b.attributes,b.state):void 0;A=$?{kind:"item",item:$}:{kind:"empty"}}let g=A.kind==="item"?A.item:void 0,N,Q=i("last_7_days");if(ge(Q)&&Array.isArray(Q.attributes.days)){let $=Q.attributes.days.map(k=>({date:String(k?.date??""),episodes:_(k?.episodes)??0,movies:_(k?.movies)??0})).filter(k=>/^\d{4}-\d{2}-\d{2}$/.test(k.date));if($.length){let k=Q.attributes.busiest_day;N={days:$,episodes:$.reduce((w,S)=>w+S.episodes,0),movies:$.reduce((w,S)=>w+S.movies,0),busiest:typeof k?.date=="string"&&_(k?.count)?{date:k.date,count:k.count}:void 0}}}let M,H=i("top_picks");if(ge(H)){let $=H.attributes,k={};for(let w of ke){let S=(Array.isArray($[w])?$[w]:[]).map(P=>typeof P?.name=="string"&&_(P?.hours)!==void 0?{name:P.name,hours:P.hours,titles:_(P.titles)??0,photoUrl:typeof P.photo=="string"&&P.photo?P.photo:void 0,code:typeof P.code=="string"&&P.code?P.code:void 0,decade:_(P.decade)}:void 0).filter(P=>!!P);S.length&&(k[w]=S)}M={titles:be(H)??0,total:_($.total)??0,pending:_($.pending)??0,picks:k}}let oe,Ie=i("monthly_wrap");if(ge(Ie)){let $=Ie.attributes;oe={months:(Array.isArray($.months)?$.months:[]).map(w=>{if(!(typeof w?.month!="string"||!/^\d{4}-\d{2}$/.test(w.month)||!Array.isArray(w.days)))return{month:w.month,items:_(w.items)??0,episodes:_(w.episodes)??0,movies:_(w.movies)??0,titles:_(w.titles)??0,showTitles:_(w.show_titles)??0,animeTitles:_(w.anime_titles)??0,movieTitles:_(w.movie_titles)??0,minutes:_(w.minutes)??0,estimated:!!w.estimated,days:w.days.map(S=>_(S)??0),activeDays:_(w.active_days)??0,weekendShare:_(w.weekend_share)??0,bestStreak:_(w.best_streak)??0,busiest:{day:typeof w.busiest?.day=="string"?w.busiest.day:"",count:_(w.busiest?.count)??0},firstWatch:_(w.first_watch)??0,rewatch:_(w.rewatch)??0,top:(Array.isArray(w.top)?w.top:[]).filter(S=>typeof S?.title=="string").map(S=>({title:S.title,kind:S.kind==="movie"?"movie":"show",anime:!!S.anime,count:_(S.count)??0,poster:typeof S.poster=="string"&&S.poster?S.poster:void 0})),genres:(Array.isArray(w.genres)?w.genres:[]).filter(S=>typeof S?.name=="string").map(S=>({name:S.name,titles:_(S.titles)??0})),firsts:Array.isArray(w.firsts)?w.firsts.filter(S=>typeof S?.name=="string").map(S=>({code:String(S.code??""),name:S.name,title:String(S.title??"")})):void 0}}).filter(w=>!!w),pending:_($.pending)??0,firstsReady:!!$.firsts_ready}}let Oe,ye=i("average_per_week");if(ye&&ye.state!=="unavailable"){let $=be(ye),k=_(ye.attributes.items_per_week);if($!==void 0||k!==void 0){let w=ye.attributes.change_percent;Oe={hours:$,itemsPerWeek:k,changePct:typeof w=="number"?w:null,estimated:ye.attributes.estimated!==!1}}}let Fe,re=i("catch_up");if(re&&re.state!=="unavailable"&&re.state!=="unknown"){let $=be(re)??0,k=Array.isArray(re.attributes.shows)?re.attributes.shows:[],w=new Map,S=i("shows_waiting");if(S&&Array.isArray(S.attributes.items))for(let D of S.attributes.items){let ce=$t(D);ce&&w.set(W(ce),ce)}let P=k.map(D=>{let ce=_(D?.remaining);if(typeof D?.title!="string"||ce===void 0)return;let nt=typeof D.poster_url=="string"&&D.poster_url?D.poster_url:void 0,Dt=typeof D.refract_id=="string"&&D.refract_id?D.refract_id:void 0,Et={title:D.title,year:_(D.year),remaining:ce,aired:_(D.aired_episodes),isAnime:!!D.is_anime,tmdbId:_(D.tmdb_id),refractId:Dt,posterUrl:nt},U=$t({show:{title:D.title,year:D.year,is_anime:D.is_anime,ids:{tmdb:D.tmdb_id,refract:Dt}},next_episode:D.next_episode,aired_episodes:D.aired_episodes,remaining_episodes:ce,poster_url:nt});return U&&(U.season===void 0||U.number===void 0)&&(U=void 0),U??=w.get(W(Et)),U&&(U.season===void 0||U.number===void 0)&&(U=void 0),U&&(U={...U,posterUrl:nt??U.posterUrl,remaining:U.remaining??ce}),{...Et,next:U}}).filter(D=>!!D);Fe={total:$,minutes:_(re.attributes.estimated_minutes),showCount:_(re.attributes.show_count)??P.length,shows:P}}if(A.kind==="item"&&A.item.remaining===0){let $=W(A.item),k=Fe?.shows.find(w=>w.next&&W(w)!==$)?.next;A=k?{kind:"item",item:k}:{kind:"empty"},g=A.kind==="item"?A.item:void 0}let zt,it=i("still_to_finish");if(ge(it)){let $=it.attributes,k=w=>({count:Math.max(0,_(w?.count)??0),minutes:_(w?.minutes),episodes:_(w?.episodes),notStarted:_(w?.not_started),started:_(w?.started),unknown:_(w?.unknown_episodes)});zt={minutes:be(it),movies:k($.movies),shows:k($.shows),anime:k($.anime),estimated:$.estimated!==!1,unknownShows:_($.unknown_episode_shows)??0}}let Mt,Ae=i("airing_this_week");Ae&&Ae.state!=="unavailable"&&Ae.state!=="unknown"&&(Mt=(Array.isArray(Ae.attributes.episodes)?Ae.attributes.episodes:[]).map(k=>typeof k?.show=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(String(k?.date))?{date:k.date,show:k.show,season:_(k.season),number:_(k.number),title:typeof k.title=="string"?k.title:void 0,isAnime:!!k.is_anime,premiere:!!k.premiere,finale:!!k.finale,airAt:typeof k.air_at=="string"&&k.air_at?k.air_at:void 0}:void 0).filter(k=>!!k));let Ds=!!g?.posterUrl||!!Fe?.shows.some($=>$.posterUrl);return{found:a,accountMain:o.main,accountSub:o.sub,last:we,minutes:{total:ne,shows:R,movies:Y,anime:q},library:{total:h,movies:d,shows:r,anime:l,completed:m,inProgress:f,upToDate:x,watchlist:T,other:v,statuses:E},moviesWatched:s("stats_movies_watched"),episodesWatched:st([s("stats_shows_episodes_watched"),s("stats_anime_episodes_watched")]),streak:F!==void 0?{current:F,longest:Math.max(ae??F,F)}:void 0,next:A,last7:N,topPicks:M,wrap:oe,average:Oe,catchup:Fe,finish:zt,airing:Mt,hasPosters:Ds}}var As=Le`
  :host {
    display: block;
  }
  ha-card {
    --c-movies: var(--refract-color-movies, #2a78d6);
    --c-shows: var(--refract-color-shows, #eb6834);
    --c-anime: var(--refract-color-anime, #1baf7a);
    --c-accent: var(--refract-color-accent, #6250d6);
    --c-completed: var(--refract-color-completed, #6c5ce7);
    --c-up-to-date: var(--refract-color-up-to-date, #1dbf73);
    --c-watchlist: var(--refract-color-watchlist, #3b9ae1);
    --c-in-progress: var(--refract-color-in-progress, #f6c453);
    --c-on-hold: var(--refract-color-on-hold, #e57256);
    --c-dropped: var(--refract-color-dropped, #d9393a);
    --track: var(--divider-color, rgba(127, 127, 127, 0.3));
    --tile-bg: var(--refract-tile-background, var(--secondary-background-color, rgba(127, 127, 127, 0.12)));
    --hero-font: var(--refract-hero-font, "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    container-type: inline-size;
    overflow: hidden;
    color: var(--primary-text-color);
  }
  .muted {
    color: var(--secondary-text-color);
  }
  .label {
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  button {
    font: inherit;
    color: inherit;
  }

  /* header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  .brand ha-icon {
    --mdc-icon-size: 20px;
    color: var(--c-accent);
    flex: none;
  }
  .brand .name {
    font-size: 16px;
    font-weight: 500;
  }
  .brand .sub {
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .last {
    font-size: 12px;
    color: var(--secondary-text-color);
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  /* hero */
  .hero {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 20px;
    align-items: flex-end;
  }
  .hero-main {
    flex: 1 1 200px;
  }
  .big {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0 12px;
  }
  .big .part {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }
  .big .num {
    font-family: var(--hero-font);
    font-size: 52px;
    line-height: 1.1;
    font-variant-numeric: tabular-nums lining-nums;
  }
  .big .num.second {
    font-size: 30px;
  }
  .big .unit {
    font-size: 14px;
    color: var(--secondary-text-color);
  }
  .tiles {
    display: flex;
    gap: 8px;
    flex: 1 1 240px;
  }
  .tile {
    flex: 1;
    min-width: 0;
    background: var(--tile-bg);
    border-radius: 8px;
    padding: 10px;
  }
  .tile .value {
    font-size: 20px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  /* most watched */
  .picks-grid {
    display: grid;
    /* two columns when the card is wide enough for them, else one: long names and translations need room */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px 14px;
  }
  .picks-grid {
    align-items: start;
  }
  .pick-cell {
    min-width: 0;
  }
  .pick {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-align: start;
  }
  button.pick {
    cursor: pointer;
    border-radius: 12px;
  }
  button.pick:focus-visible {
    outline: 2px solid var(--c-accent);
    outline-offset: 2px;
  }
  .pick-chevron {
    flex: none;
    margin: -3px 0;
    color: var(--secondary-text-color);
    --mdc-icon-size: 18px;
  }
  .pick-runners {
    list-style: none;
    margin: 8px 0 0;
    padding: 0 0 0 4px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .pick-runners li {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  .pick-runners .pick-name {
    font-size: 13px;
  }
  .pick-rank {
    flex: none;
    width: 14px;
    text-align: center;
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .pick-avatar.small {
    width: 32px;
    height: 32px;
    --mdc-icon-size: 18px;
  }
  .pick-avatar.small .flag {
    font-size: 18px;
  }
  .pick-avatar.small .initials {
    font-size: 11px;
  }
  .picks-progress {
    margin-top: 12px;
    height: 6px;
    border-radius: 3px;
    background: color-mix(in srgb, var(--c-accent) 18%, transparent);
    overflow: hidden;
  }
  .picks-progress > span {
    display: block;
    height: 100%;
    border-radius: 3px;
    background: var(--c-accent);
    transition: width 0.4s ease;
  }
  .pick-avatar {
    flex: none;
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    background: color-mix(in srgb, var(--c-accent) 16%, transparent);
    color: var(--c-accent);
    --mdc-icon-size: 24px;
  }
  .pick-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .pick-avatar .flag {
    font-family: "Twemoji Country Flags", "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
    font-size: 26px;
    line-height: 1;
  }
  .pick-avatar .initials {
    font-size: 15px;
    font-weight: 600;
  }
  .pick-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    line-height: 1.3;
  }
  .pick-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .pick-name {
    font-size: 15px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pick-sub {
    font-size: 12px;
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
  }
  /* monthly wrap */
  .wrap-nav {
    display: inline-flex;
    gap: 4px;
  }
  .wrap-arrow {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: var(--tile-bg);
    color: var(--primary-text-color);
    cursor: pointer;
    --mdc-icon-size: 20px;
  }
  .wrap-arrow:disabled {
    opacity: 0.35;
    cursor: default;
  }
  .wrap-arrow:focus-visible,
  .wrap-tab:focus-visible {
    outline: 2px solid var(--c-accent);
    outline-offset: 2px;
  }
  .wrap-month {
    font-size: 22px;
    font-weight: 600;
    line-height: 1.2;
  }
  .wrap-tabs {
    display: flex;
    gap: 6px;
    margin: 12px 0;
    overflow-x: auto;
  }
  .wrap-tab {
    flex: none;
    padding: 5px 12px;
    border: 0;
    border-radius: 14px;
    background: var(--tile-bg);
    color: var(--secondary-text-color);
    font: inherit;
    font-size: 13px;
    cursor: pointer;
  }
  .wrap-tab.active {
    background: color-mix(in srgb, var(--c-accent) 18%, transparent);
    color: var(--c-accent);
    font-weight: 600;
  }
  .wrap-hero {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 6px 10px;
    margin-bottom: 10px;
  }
  .wrap-hours {
    font-size: 40px;
    font-weight: 500;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .wrap-unit {
    color: var(--secondary-text-color);
  }
  .wrap-tiles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
    gap: 8px;
    margin-top: 8px;
  }
  .wrap-tiles.two {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
  .wrap-section {
    margin: 14px 0 6px;
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }
  .wrap-split {
    display: flex;
    height: 14px;
    gap: 2px;
    border-radius: 7px;
    overflow: hidden;
  }
  .wrap-genres {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .wrap-genre {
    display: grid;
    grid-template-columns: minmax(90px, 36%) 1fr auto;
    align-items: center;
    gap: 10px;
  }
  .wrap-genre-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .wrap-genre-bar {
    height: 8px;
    border-radius: 4px;
    background: var(--tile-bg);
    overflow: hidden;
  }
  .wrap-genre-bar > span {
    display: block;
    height: 100%;
    border-radius: 4px;
    background: var(--c-accent);
  }
  .wrap-days {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 90px;
  }
  .wrap-day {
    flex: 1 1 0;
    min-width: 2px;
    border-radius: 2px;
    background: var(--c-shows);
  }
  .wrap-day.empty {
    background: var(--tile-bg);
  }
  .wrap-day.peak {
    background: var(--c-accent);
  }
  .wrap-axis {
    display: flex;
    justify-content: space-between;
    margin-top: 2px;
    font-size: 11px;
    color: var(--secondary-text-color);
  }
  .wrap-top {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .wrap-top-row {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .wrap-top-row img,
  .wrap-noposter {
    flex: none;
    width: 40px;
    height: 58px;
    border-radius: 6px;
    object-fit: cover;
    background: var(--tile-bg);
  }
  .wrap-noposter {
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
  }
  /* single-section cards */
  ha-card.single {
    padding: 14px;
  }
  ha-card.single > .panel,
  ha-card.single > .next {
    flex: none;
    border: 0;
    padding: 0;
    background: none;
  }
  .single-title {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 500;
  }
  ha-card.single-monthly_wrap:has(.wrap-pages) {
    padding: 0;
    overflow: hidden;
  }
  ha-card.single-monthly_wrap:has(.wrap-pages) > .single-title {
    padding: 14px 16px 0;
  }
  ha-card.single-monthly_wrap .wrap-pages {
    border-radius: 0;
  }

  /* monthly wrap as app-style pages */
  .wrap-pages {
    --p1: #7b68ee;
    --p2: #5b46dc;
    --p3: #231d52;
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 560px;
    padding: 14px 16px 18px;
    border: 0;
    border-radius: 20px;
    overflow: hidden;
    color: #fff;
    background: linear-gradient(180deg, var(--p1) 0%, var(--p2) 52%, var(--p3) 100%);
    touch-action: pan-y;
    user-select: none;
    outline: none;
  }
  .wrap-pages:focus-visible {
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.75);
  }
  .wrap-pages.page-tastes {
    --p1: #ec4899;
    --p2: #b8307a;
    --p3: #3a1730;
  }
  .wrap-pages.page-patterns {
    --p1: #22b8d8;
    --p2: #0f7f9c;
    --p3: #11333f;
  }
  .wrap-pages.page-moments {
    --p1: #f5a623;
    --p2: #b7761a;
    --p3: #35250f;
  }
  .wrap-pages .muted,
  .wrap-pages .pick-sub,
  .wrap-pages .pick-label,
  .wrap-pages .picks-foot,
  .wrap-pages .wrap-section,
  .wrap-pages .empty {
    color: rgba(255, 255, 255, 0.74);
  }
  .wrap-progress {
    display: flex;
    gap: 5px;
    margin-bottom: 14px;
    position: relative;
    z-index: 3;
  }
  .wrap-seg {
    flex: 1;
    height: 4px;
    padding: 0;
    border: 0;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }
  .wrap-seg.done {
    background: #fff;
  }
  .wrap-brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    font-weight: 600;
    position: relative;
    z-index: 3;
  }
  .wrap-brand-name {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    --mdc-icon-size: 22px;
  }
  .wrap-brand-user {
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
  }
  .wrap-kicker-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 3;
  }
  .wrap-kicker {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.82);
  }
  .wrap-pages .wrap-arrow {
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
  }
  .wrap-title {
    margin: 4px 0 12px;
    font-size: 30px;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.01em;
  }
  .wrap-insight {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    padding: 12px 14px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.14);
    font-size: 15px;
    --mdc-icon-size: 22px;
  }
  .wrap-insight ha-icon {
    flex: none;
    color: #ffd25e;
  }
  .wrap-body {
    position: relative;
    z-index: 1;
    flex: 1;
  }
  .wrap-pages .tile {
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  .wrap-pages .value {
    color: #fff;
  }
  .wrap-pages .badge,
  .wrap-pages .badge.accent {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  .wrap-pages .wrap-hours {
    font-size: 56px;
    font-weight: 700;
  }
  .wrap-pages .wrap-unit {
    font-size: 14px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.78);
  }
  .wrap-pages .wrap-genre-bar {
    background: rgba(255, 255, 255, 0.2);
  }
  .wrap-pages .wrap-genre-bar > span {
    background: #f4e9ee;
  }
  .wrap-pages .wrap-day {
    background: rgba(255, 255, 255, 0.88);
  }
  .wrap-pages .wrap-day.empty {
    background: rgba(255, 255, 255, 0.16);
  }
  .wrap-pages .wrap-day.peak {
    background: #ffc83d;
  }
  .wrap-pages .wrap-axis {
    color: rgba(255, 255, 255, 0.7);
  }
  .wrap-pages .swatch {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.35);
  }
  .wrap-pages .wrap-top-row {
    padding: 8px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.12);
  }
  .wrap-pages .wrap-noposter {
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
  }
  .wrap-pages .pick-avatar {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  .wrap-tap {
    position: absolute;
    top: 150px;
    bottom: 0;
    z-index: 2;
    width: 28%;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .wrap-tap[hidden] {
    display: none;
  }
  .wrap-tap.prev {
    left: 0;
  }
  .wrap-tap.next {
    right: 0;
  }
  .picks-foot {
    margin-top: 12px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .picks-foot a {
    color: inherit;
  }
  .fun {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    padding: 8px 12px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.35;
    background: color-mix(in srgb, var(--c-accent) 14%, transparent);
    color: var(--primary-text-color);
  }
  .fun ha-icon {
    --mdc-icon-size: 18px;
    flex: none;
    color: var(--c-accent);
  }

  /* panels */
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .panel {
    border: 1px solid var(--divider-color);
    border-radius: 12px;
    padding: 14px;
    min-width: 0;
  }
  .panel.streak,
  .panel.average {
    flex: 1 1 190px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .metric {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.15;
    font-variant-numeric: tabular-nums;
  }
  .metric .unit {
    font-size: 15px;
    font-weight: 400;
    color: var(--secondary-text-color);
  }
  .metric .approx {
    font-weight: 400;
    color: var(--secondary-text-color);
    margin-right: 2px;
  }
  .avg-mid {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .avg-items {
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  /* sits on the bottom row, level with the streak's "Longest: ..." line */
  .trend {
    font-size: 12px;
    line-height: 1.4;
    font-weight: 500;
    color: var(--secondary-text-color);
  }
  .trend.up {
    color: var(--success-color, #1b8a5a);
  }
  .trend.down {
    color: var(--error-color, #db4437);
  }
  .panel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
  }
  .swatch {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    flex: none;
  }
  .swatch.sm {
    width: 8px;
    height: 8px;
  }
  .legend-row span,
  .status-legend span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  svg .track {
    stroke: var(--track);
  }
  .status-bar,
  .stack {
    display: flex;
    gap: 2px;
    border-radius: 4px;
    overflow: hidden;
  }
  .status-bar {
    height: 12px;
    border-radius: 6px;
  }
  .stack {
    height: 14px;
  }
  .status-bar > span,
  .stack > span {
    min-width: 3px;
  }
  .status-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 14px;
    margin-top: 10px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  /* breakdown lists (library_style / watch_time_style: list) */
  .status-bar.spaced,
  .stack.spaced {
    margin-bottom: 6px;
  }
  .stat-row {
    display: grid;
    grid-template-columns: 10px 1fr auto 3.2em;
    align-items: center;
    column-gap: 12px;
    padding: 9px 0;
    font-size: 15px;
  }
  .stat-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .stat-count {
    font-variant-numeric: tabular-nums;
    text-align: right;
  }
  .stat-pct {
    text-align: right;
    font-size: 13px;
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
  }

  /* streak */
  .streak-foot {
    font-size: 12px;
    line-height: 1.4;
    color: var(--secondary-text-color);
  }
  .dots {
    display: flex;
    gap: 8px;
    margin: 6px 0 4px;
  }
  .dot-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: var(--secondary-text-color);
  }
  .dot-col.today {
    color: var(--primary-text-color);
    font-weight: 500;
  }
  .dot {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid var(--track);
  }
  .dot.filled {
    background: var(--c-accent);
    border-color: var(--c-accent);
  }
  .dot.open.today {
    border-style: dashed;
    border-color: var(--secondary-text-color);
  }

  /* still to finish */
  /* the total reuses the hero's .big numbers unchanged, so it looks exactly like Total watch time */
  .finish-big {
    margin-top: 4px;
  }
  .finish-rows {
    margin-top: 10px;
  }
  .finish-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 0;
  }
  .finish-row + .finish-row {
    border-top: 1px solid var(--divider-color);
  }
  .finish-name {
    font-size: 15px;
  }
  .finish-time {
    flex: none;
    font-size: 15px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  /* watch time */
  .watch-cols {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
  }
  .watch-col {
    flex: 1 1 110px;
    min-width: 0;
  }
  .watch-col .row {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .watch-col .value {
    font-size: 15px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  /* next up */
  .panel.next {
    border-color: var(--c-accent);
    display: flex;
    gap: 14px;
  }
  .next-body {
    flex: 1;
    min-width: 0;
  }
  .next-head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px 8px;
  }
  .next-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-top: 6px;
  }
  .next-title {
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px 8px;
  }
  .next-title .year {
    font-size: 13px;
    font-weight: 400;
    color: var(--secondary-text-color);
  }
  .next-ep {
    font-size: 14px;
    color: var(--secondary-text-color);
    margin-top: 2px;
  }
  .progress {
    height: 6px;
    border-radius: 3px;
    background: var(--track);
    overflow: hidden;
  }
  .progress.thin {
    height: 4px;
    border-radius: 2px;
  }
  .progress > span {
    display: block;
    height: 100%;
    background: var(--c-accent);
  }
  .next .progress {
    margin-top: 12px;
  }
  .poster {
    position: relative;
    flex: none;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tile-bg);
    color: var(--secondary-text-color);
    font-weight: 600;
  }
  .poster.lg {
    width: 84px;
    height: 126px;
    border-radius: 10px;
    font-size: 32px;
  }
  .poster.sm {
    width: 28px;
    height: 42px;
    border-radius: 5px;
    font-size: 13px;
  }
  .poster img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .next-foot {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    color: var(--secondary-text-color);
    margin-top: 6px;
  }
  .action {
    all: unset;
    cursor: pointer;
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    color: var(--primary-text-color);
  }
  .action:hover {
    background: var(--tile-bg);
  }
  .action:focus-visible {
    outline: 2px solid var(--c-accent);
  }
  .action[data-state="confirm"] {
    border-color: var(--c-accent);
    color: var(--c-accent);
  }
  .action[data-state="busy"] {
    opacity: 0.6;
    pointer-events: none;
  }
  .action[data-state="error"] {
    border-color: var(--error-color, #db4437);
    color: var(--error-color, #db4437);
  }
  .action ha-icon {
    --mdc-icon-size: 16px;
  }
  .badge {
    font-size: 11px;
    line-height: 1.4;
    padding: 1px 8px;
    border-radius: 8px;
    white-space: nowrap;
    background: var(--tile-bg);
    color: var(--secondary-text-color);
  }
  .badge.accent {
    background: color-mix(in srgb, var(--c-accent) 16%, transparent);
    color: var(--c-accent);
  }
  .badge.warn {
    background: color-mix(in srgb, var(--c-watchlist) 22%, transparent);
    color: var(--warning-color, #b37400);
  }

  /* last 7 days */
  .bars {
    display: flex;
    gap: 8px;
    margin-top: 4px;
  }
  .day {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .slot {
    height: 104px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
  }
  .day-count {
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .bar {
    align-self: stretch;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .bar.empty {
    border-radius: 2px;
    background: var(--track);
  }
  .seg {
    min-height: 5px;
    border-radius: 6px;
  }
  .seg.shows {
    background: var(--c-shows);
  }
  .seg.movies {
    background: var(--c-movies);
  }
  .day-label {
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .day.today .day-label {
    color: var(--primary-text-color);
    font-weight: 600;
  }
  .legend-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    margin-top: 12px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .legend-row span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .legend-row b {
    color: var(--primary-text-color);
  }

  /* catch-up backlog */
  .catch-line {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 2px 10px;
    margin: 4px 0 12px;
  }
  .c-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 5px 0;
  }
  .c-row.pickable {
    margin: 0 -8px;
    padding: 5px 8px;
    border-radius: 10px;
    cursor: pointer;
  }
  .c-row.pickable:hover {
    background: color-mix(in srgb, var(--c-accent) 8%, transparent);
  }
  .c-row.pickable.selected {
    background: color-mix(in srgb, var(--c-accent) 16%, transparent);
  }
  .c-row.pickable:focus-visible {
    outline: 2px solid var(--c-accent);
  }
  .c-name {
    flex: 0 0 38%;
    min-width: 0;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .c-row .progress {
    flex: 1;
    height: 8px;
    border-radius: 4px;
  }
  .c-count {
    flex: none;
    min-width: 28px;
    text-align: right;
    font-size: 14px;
    font-variant-numeric: tabular-nums;
  }
  .link {
    all: unset;
    cursor: pointer;
    display: inline-block;
    margin-top: 8px;
    font-size: 12px;
    color: var(--c-accent);
  }
  .link:focus-visible {
    outline: 2px solid var(--c-accent);
  }

  /* airing this week */
  .a-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 0;
    font-size: 14px;
  }
  .a-day {
    flex: none;
    min-width: 52px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    padding: 5px 0;
    border-radius: 8px;
    background: var(--tile-bg);
    color: var(--secondary-text-color);
  }
  .a-day.today {
    background: color-mix(in srgb, var(--c-accent) 16%, transparent);
    color: var(--c-accent);
  }
  .a-time {
    flex: none;
    font-size: 12px;
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
  }
  .a-row .badge {
    flex: none;
  }
  .a-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .empty {
    padding: 8px 0;
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  @container (max-width: 440px) {
    .big .num {
      font-size: 44px;
    }
    .c-name {
      flex-basis: 34%;
    }
    .poster.lg {
      width: 68px;
      height: 102px;
    }
    .last {
      max-width: 55%;
    }
  }
`,Ss=Le`
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  ha-alert {
    display: block;
  }
  .order {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 12px 12px;
  }
  .order .hint {
    color: var(--secondary-text-color);
    font-size: 12px;
    padding-bottom: 6px;
  }
  .order-row {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--divider-color);
  }
  .order-name {
    flex: 1;
    min-width: 0;
  }
  .order-reset {
    align-self: flex-start;
    margin-top: 8px;
    padding: 6px 12px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: none;
    color: var(--primary-color);
    font: inherit;
    cursor: pointer;
  }
`;var O=class extends J{constructor(){super(...arguments);this._catchupExpanded=!1;this._airingExpanded=!1;this._openPicks=[];this._wrapIndex=0;this._wrapTab="overview";this._actionState="idle";this._actionError="";this._swipedAt=0;this._actionTarget=""}static async getConfigElement(){return document.createElement(Je)}static getStubConfig(e){let i=e?.entities??{},s=Object.keys(i).filter(r=>r.startsWith("sensor.")&&i[r].platform===K),a=Object.keys(e?.states??{}).filter(r=>r.startsWith("sensor.refract_")),o=s.length?s:a;return{entity:o.find(r=>r.endsWith("_next_up"))??o[0]??""}}setConfig(e){if(!e||typeof e!="object")throw new Error("Invalid configuration");let i=Object.fromEntries(Object.entries(e).filter(([,s])=>s!=null));i.show_queue!==void 0&&i.show_catchup===void 0&&(i.show_catchup=i.show_queue),this._config=e,this._cfg={...fe,...i},this._disc=void 0}getCardSize(){if(!this._cfg)return 12;let e=this._cfg,i={hero:3,watch_time:2,library:2,still_to_finish:3,streak:3,average:0,last_7_days:3,top_picks:6,monthly_wrap:7,next_up:3,catchup:2+Math.min(e.queue_length,5),airing:2+Math.min(e.airing_length,5)};return this._only?Math.max(1,i[this._only]||i.streak):1+xt(xe(this._config),e).reduce((a,o)=>a+i[o],0)}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}shouldUpdate(e){if(!this._config||!this.hass)return!1;if([...e.keys()].some(a=>a!=="hass"))return!0;let s=e.get("hass");if(!s||s.locale!==this.hass.locale||s.entities!==this.hass.entities||s.devices!==this.hass.devices)return!0;for(let a of Object.values(this._discovery().entities))if(s.states[a]!==this.hass.states[a])return!0;return!1}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._actionTimer)}_discovery(){let e=this.hass,i=this._config;return(!this._disc||!this._discFor||this._discFor.config!==i||this._discFor.entities!==e.entities||this._discFor.devices!==e.devices||Object.keys(this._disc.entities).length===0)&&(this._disc=ss(e,i),this._discFor={config:i,entities:e.entities,devices:e.devices}),this._disc}render(){if(!this._config||!this.hass)return u;let e=this._cfg;if(!e.entity&&!e.device_id&&!e.entities)return this._message(p(this.hass,"empty.no_entity"));let i=this._discovery(),s=$s(this.hass,i,e);if(!s.found)return this._message(p(this.hass,"empty.not_found",{entity:e.entity??e.device_id??""}));let a=e.show_posters&&s.hasPosters,o={hero:()=>this._hero(s),watch_time:()=>this._watchTime(s),still_to_finish:()=>this._finish(s),library:()=>this._library(s),streak:()=>s.streak?this._streak(s):u,average:()=>this._average(s),last_7_days:()=>this._last7(s),top_picks:()=>this._topPicks(s),monthly_wrap:()=>this._monthlyWrap(s),next_up:()=>this._next(s,a),catchup:()=>this._catchup(s,a),airing:()=>this._airing(s)};if(this._only){let h=o[this._only]();return c`<ha-card class="single single-${this._only}" style=${te(this._colorVars())}>
        ${e.name?c`<div class="single-title">${e.name}</div>`:u}
        ${h===u?c`<div class="empty">${p(this.hass,"empty.section")}</div>`:h}
      </ha-card>`}let d=[],r=[],l=()=>{r.length&&d.push(c`<div class="grid">${r}</div>`),r=[]};for(let h of xt(xe(this._config),e)){let m=o[h]();m!==u&&(h==="streak"||h==="average"?r.push(m):(l(),d.push(m)))}return l(),c`<ha-card style=${te(this._colorVars())}> ${this._header(s)} ${d} </ha-card>`}_message(e){return c`<ha-card><div class="empty" style="padding:16px">${e}</div></ha-card>`}_colorVars(){let e=this._cfg,i={};return e.color_movies&&(i["--refract-color-movies"]=e.color_movies),e.color_shows&&(i["--refract-color-shows"]=e.color_shows),e.color_anime&&(i["--refract-color-anime"]=e.color_anime),e.color_accent&&(i["--refract-color-accent"]=e.color_accent),i}_header(e){let i=e.last,s=i?.season!==void 0&&i?.episode!==void 0?` S${i.season} E${i.episode}`:"";return c`<div class="header">
      <div class="brand">
        <ha-icon icon="mdi:chart-donut"></ha-icon>
        <span class="name">${e.accountMain}</span>
        ${e.accountSub?c`<span class="sub">${e.accountSub}</span>`:u}
      </div>
      ${i?c`<span class="last" title="${p(this.hass,"header.last_watched")}">
            ${i.title?c`${i.title}${s} · `:u}<ha-relative-time
              .hass=${this.hass}
              .datetime=${i.iso}
            ></ha-relative-time>
          </span>`:u}
    </div>`}_hero(e){let i=C(this.hass),s=this._cfg,a=e.minutes.total,d=[[p(this.hass,"hero.library"),e.library.total],[p(this.hass,"hero.movies_seen"),e.moviesWatched],[p(this.hass,"hero.episodes"),e.episodesWatched]].filter(([,l])=>l!==void 0);if(a===void 0&&d.length===0)return u;let r=s.fun_stat&&a!==void 0?vs(this.hass,a,s.fun_stat_mode):void 0;return c`<div>
      <div class="hero">
        ${a!==void 0?c`<div class="hero-main">
              <div class="label">${p(this.hass,"hero.total")}</div>
              <div class="big">
                ${Xe(a,s.duration_format,i).map((l,h)=>c`<span class="part"
                        ><span class="num ${h>0?"second":""}">${l.value}</span>
                        <span class="unit">${I(this.hass,l.unit,l.n)}</span></span
                      >
                    `)}
              </div>
              ${r?c`<div class="fun"><ha-icon icon="mdi:shimmer"></ha-icon><span>${r}</span></div>`:u}
            </div>`:u}
        ${d.length?c`<div class="tiles">
              ${d.map(([l,h])=>c`<div class="tile">
                    <div class="label">${l}</div>
                    <div class="value">${y(h,i)}</div>
                  </div>`)}
            </div>`:u}
      </div>
    </div>`}_library(e){let i=C(this.hass),s=e.library,a={completed:"var(--c-completed)",up_to_date:"var(--c-up-to-date)",in_progress:"var(--c-in-progress)",planned:"var(--c-watchlist)",on_hold:"var(--c-on-hold)",dropped:"var(--c-dropped)"},o={planned:"status.watchlist"},d=f=>{let x=o[f]??`status.${f}`,T=p(this.hass,x);if(T!==x)return T;let V=f.replace(/_/g," ");return V.charAt(0).toUpperCase()+V.slice(1)},r=s.statuses?s.statuses.map(f=>[d(f.key),f.count,a[f.key]??"var(--track)"]):[["status.completed",s.completed,"var(--c-completed)"],["status.up_to_date",s.upToDate,"var(--c-up-to-date)"],["status.in_progress",s.inProgress,"var(--c-in-progress)"],["status.watchlist",s.watchlist,"var(--c-watchlist)"],["status.other",s.other&&s.other>0?s.other:void 0,"var(--track)"]].filter(([,f])=>f!==void 0).map(([f,x,T])=>[p(this.hass,f),x,T]);if(!r.length)return u;let l=this._cfg.library_style==="list",h=r.reduce((f,[,x])=>f+x,0),m=c`<div
      class="status-bar ${l?"spaced":""}"
      role="img"
      aria-label=${r.map(([f,x])=>`${f} ${x}`).join(", ")}
    >
      ${r.map(([,f,x])=>c`<span style="flex:${f} 1 0; background:${x}"></span>`)}
    </div>`;return c`<div class="panel library">
      <div class="label" style="margin-bottom:${l?12:10}px">${p(this.hass,"library.title")}</div>
      ${m}
      ${l?c`<div class="stat-list">
            ${r.map(([f,x,T])=>c`<div class="stat-row">
                <span class="stat-dot" style="background:${T}"></span>
                <span class="stat-name">${f}</span>
                <b class="stat-count">${y(x,i)}</b>
                <span class="stat-pct">${h?Math.round(x/h*100):0}%</span>
              </div>`)}
          </div>`:c`<div class="status-legend">
            ${r.map(([f,x,T])=>c`<span><span class="swatch sm" style="background:${T}"></span>${f} · ${y(x,i)}</span>`)}
          </div>`}
    </div>`}_timeZone(){return this.hass.locale?.time_zone==="server"?this.hass.config?.time_zone:void 0}_hour12(){let e=this.hass.locale?.time_format;return e==="12"?!0:e==="24"?!1:void 0}_streak(e){let i=C(this.hass),s=e.streak,a=I(this.hass,"unit.day",s.current),o=bs({now:new Date,lastWatchedIso:e.last?.iso,current:s.current,timeZone:this._timeZone(),lang:i}),d=s.current===0?p(this.hass,"streak.none"):[p(this.hass,"streak.longest",{n:s.longest,unit:I(this.hass,"unit.day",s.longest)}),o.stillTimeToday?p(this.hass,"streak.still_time"):""].filter(Boolean).join(" \xB7 ");return c`<div class="panel streak">
      <div class="label">${p(this.hass,"streak.title")}</div>
      <div class="metric">${y(s.current,i)} <span class="unit">${a}</span></div>
      <div class="dots" role="img" aria-label="${s.current} ${a}">
        ${o.days.map(r=>c`<div class="dot-col ${r.today?"today":""}">
              <span class="dot ${r.filled?"filled":"open"} ${r.today?"today":""}"></span>${r.label}
            </div>`)}
      </div>
      <div class="streak-foot">${d}</div>
    </div>`}_average(e){let i=e.average;if(!i)return u;let s=C(this.hass),a;if(i.hours!==void 0)a=c`${y(i.hours,s,1)} <span class="unit">${p(this.hass,"unit.h")}</span>`;else if(i.itemsPerWeek!==void 0)a=c`${y(i.itemsPerWeek,s,1)} <span class="unit">${p(this.hass,"avg.items_unit")}</span>`;else return u;let o=i.changePct,d=o==null?u:c`<div class="trend ${o>0?"up":o<0?"down":""}">
            ${o>0?"\u25B2":o<0?"\u25BC":"\u2013"} ${Math.abs(o)}% ${p(this.hass,"avg.vs_previous")}
          </div>`;return c`<div class="panel average">
      <div class="label">${p(this.hass,"avg.title")}</div>
      <div class="metric" title=${i.estimated&&i.hours!==void 0?p(this.hass,"avg.estimated"):""}>
        ${i.hours!==void 0&&i.estimated?c`<span class="approx">~</span>`:u}${a}
      </div>
      <div class="avg-mid">
        ${i.hours!==void 0&&i.itemsPerWeek!==void 0?c`<div class="avg-items">
              ${I(this.hass,"avg.items_line",Math.round(i.itemsPerWeek*10)/10,{n:y(i.itemsPerWeek,s,1)})}
            </div>`:u}
      </div>
      ${d}
    </div>`}_last7(e){let i=e.last7;if(!i)return u;let s=C(this.hass),a=bt(new Date,this._timeZone()),o=i.days.map(m=>m.episodes+m.movies),d=Math.max(1,...o),r=84,l=i.busiest?et(i.busiest.date,s,"long"):void 0,h=`${p(this.hass,"days7.episodes")} ${i.episodes}, ${p(this.hass,"days7.movies")} ${i.movies}`;return c`<div class="panel last7">
      <div class="panel-head">
        <span class="label">${p(this.hass,"days7.title")}</span>
        ${l?c`<span class="badge accent">${p(this.hass,"days7.busiest",{day:l})}</span>`:u}
      </div>
      <div class="bars" role="img" aria-label=${h}>
        ${i.days.map((m,f)=>{let x=o[f],T=x===0?3:Math.max(8,Math.round(x/d*r));return c`<div class="day ${m.date===a?"today":""}">
            <div class="slot">
              ${m.episodes>0?c`<span class="day-count">${y(m.episodes,s)}</span>`:u}
              <div class="bar ${x===0?"empty":""}" style="height:${T}px">
                ${m.movies?c`<span class="seg movies" style="flex:${m.movies} 1 0"></span>`:u}
                ${m.episodes?c`<span class="seg shows" style="flex:${m.episodes} 1 0"></span>`:u}
              </div>
            </div>
            <span class="day-label">${et(m.date,s,"narrow")}</span>
          </div>`})}
      </div>
      <div class="legend-row">
        <span><span class="swatch" style="background:var(--c-shows)"></span>${p(this.hass,"days7.episodes")} <b>${y(i.episodes,s)}</b></span>
        <span><span class="swatch" style="background:var(--c-movies)"></span>${p(this.hass,"days7.movies")} <b>${y(i.movies,s)}</b></span>
      </div>
      ${i.episodes+i.movies===0?c`<div class="empty">${p(this.hass,"days7.none")}</div>`:u}
    </div>`}_watchTime(e){let i=C(this.hass),s=this._cfg.duration_format,a=[{key:"library.shows",minutes:e.minutes.shows,color:"var(--c-shows)"},{key:"library.movies",minutes:e.minutes.movies,color:"var(--c-movies)"},{key:"library.anime",minutes:e.minutes.anime,color:"var(--c-anime)"}].filter(r=>r.minutes!==void 0);if(!a.length)return u;let o=_s(a.map(r=>r.minutes)),d=this._cfg.watch_time_style==="list";return c`<div class="panel">
      <div class="label" style="margin-bottom:${d?12:8}px">${p(this.hass,"watch.title")}</div>
      <div
        class="stack ${d?"spaced":""}"
        role="img"
        aria-label=${a.map((r,l)=>`${p(this.hass,r.key)} ${o[l]}%`).join(", ")}
      >
        ${a.map(r=>c`<span style="flex:${Math.max(r.minutes,0)} 1 0; background:${r.color}"></span>`)}
      </div>
      ${d?c`<div class="stat-list">
            ${a.map((r,l)=>c`<div class="stat-row">
                <span class="stat-dot" style="background:${r.color}"></span>
                <span class="stat-name">${p(this.hass,r.key)}</span>
                <b class="stat-count">${je(r.minutes,s,i)}</b>
                <span class="stat-pct">${o[l]}%</span>
              </div>`)}
          </div>`:c`<div class="watch-cols">
            ${a.map((r,l)=>c`<div class="watch-col">
                  <div class="row"><span class="swatch" style="background:${r.color}"></span>${p(this.hass,r.key)} · ${o[l]}%</div>
                  <div class="value">${je(r.minutes,s,i)}</div>
                </div>`)}
          </div>`}
    </div>`}_finish(e){let i=e.finish;if(!i)return u;let s=C(this.hass),a=this._cfg.duration_format,o=(h,m)=>I(this.hass,h,m,{n:y(m,s)}),d=h=>h===void 0?"":je(h,a,s),r=[{key:"finish.movies",group:i.movies,color:"var(--c-movies)"},{key:"finish.shows",group:i.shows,color:"var(--c-shows)"},{key:"finish.anime",group:i.anime,color:"var(--c-anime)"}].filter(h=>h.group.count>0),l=i.minutes;return c`<div class="panel finish">
      <div class="label">${p(this.hass,"finish.title")}</div>
      ${r.length?c`${l!==void 0&&l>0?c`<div class="big finish-big">
                    ${Xe(l,a,s).map((h,m)=>c`<span class="part"
                            ><span class="num ${m>0?"second":""}">${h.value}</span>
                            <span class="unit">${I(this.hass,h.unit,h.n)}</span></span
                          >
                        `)}
                  </div>`:u}
            <div class="finish-rows">
              ${r.map(h=>{let m=h.group;return c`<div class="finish-row">
                  <div class="finish-name">${o(h.key,m.count)}</div>
                  ${m.minutes!==void 0&&m.minutes>0?c`<span class="finish-time" style="color:${h.color}">${d(m.minutes)}</span>`:u}
                </div>`})}
            </div>`:c`<div class="empty">${p(this.hass,"finish.none")}</div>`}
    </div>`}_poster(e,i,s){let a=(i.trim()[0]??"?").toUpperCase();return c`<div class="poster ${s}" aria-hidden="true">
      <span>${a}</span>
      ${e?c`<img
            src=${e}
            alt=""
            loading="lazy"
            referrerpolicy="no-referrer"
            @error=${o=>o.target.style.display="none"}
          />`:u}
    </div>`}_pickedShow(e){if(!this._selected)return;let i=e.catchup?.shows.find(a=>W(a)===this._selected&&a.next),s=e.next.kind==="item"?W(e.next.item):void 0;if(!i||!this._cfg.show_next_up||W(i)===s){this._selected=void 0;return}return i}_selectShow(e,i){if(!e.next)return;let s=W(e);this._selected=s===i||this._selected===s?void 0:s,this._clearAction(),this.requestUpdate(),this._selected&&this.updateComplete.then(()=>{this.renderRoot.querySelector(".panel.next")?.scrollIntoView?.({block:"nearest",behavior:"smooth"})})}_clearAction(){window.clearTimeout(this._actionTimer),this._actionState="idle",this._actionError="",this._actionTarget=""}_next(e,i){let s=this._pickedShow(e),a=s?{kind:"item",item:s.next}:e.next;if(a.kind==="hidden")return u;if(a.kind==="empty")return c`<div class="panel next">
        <div class="label">${p(this.hass,"next.title")}</div>
        <div class="empty">${p(this.hass,"empty.nothing_up_next")}</div>
      </div>`;let o=a.item,d=C(this.hass),l=[o.season!==void 0&&o.number!==void 0?`S${o.season} E${o.number}`:"",o.episodeName].filter(Boolean).join(" \xB7 "),h=o.airedEpisodes,m=h!==void 0&&o.remaining!==void 0?Math.max(0,h-o.remaining):void 0,f=h&&m!==void 0?Math.min(100,m/h*100):void 0;return c`<div class="panel next ${i?"with-poster":""}">
      ${i?this._poster(o.posterUrl,o.title,"lg"):u}
      <div class="next-body">
        <div class="next-head">
          <span class="label">${p(this.hass,"next.title")}</span>
          ${o.isAnime?c`<span class="badge">${p(this.hass,"badge.anime")}</span>`:u} ${this._badge(o)}
        </div>
        <div class="next-main">
          <div>
            <div class="next-title">
              <span>${o.title}</span>
              ${o.year?c`<span class="year">${o.year}</span>`:u}
            </div>
            ${l?c`<div class="next-ep">${l}</div>`:u}
          </div>
          ${this._actionButton(o)}
        </div>
        ${f!==void 0?c`<div class="progress" role="img" aria-label="${m} / ${h}"><span style="width:${f}%"></span></div>
              <div class="next-foot">
                <span>${p(this.hass,"next.progress",{watched:y(m,d),aired:y(h,d)})}</span>
                ${o.remaining!==void 0?c`<span>${p(this.hass,"next.remaining",{n:y(o.remaining,d)})}</span>`:u}
              </div>`:u}
      </div>
    </div>`}_badge(e){return e.aired?e.premiere?c`<span class="badge accent">${p(this.hass,"badge.premiere")}</span>`:e.finale?c`<span class="badge warn">${p(this.hass,"badge.finale")}</span>`:e.midFinale?c`<span class="badge warn">${p(this.hass,"badge.mid_finale")}</span>`:u:c`<span class="badge">${p(this.hass,"badge.not_aired")}</span>`}_canMarkWatched(e){return this._cfg.show_actions&&!!this.hass.services?.[K]?.mark_episode_watched&&e.aired&&e.season!==void 0&&e.number!==void 0&&(e.tmdbId!==void 0||!!e.refractId)}_actionButton(e){if(!this._canMarkWatched(e))return u;let i=this._actionState,s={idle:"mdi:check",confirm:"mdi:help-circle-outline",busy:"mdi:loading",done:"mdi:check-circle",error:"mdi:alert-circle-outline"}[i],a={idle:"next.mark",confirm:"next.confirm",busy:"next.busy",done:"next.done",error:"next.error"}[i];return c`<button class="action" data-state=${i} title=${this._actionError} @click=${()=>this._markWatched(e)}>
      <ha-icon icon=${s}></ha-icon>${p(this.hass,a)}
    </button>`}_resetActionLater(e){window.clearTimeout(this._actionTimer),this._actionTimer=window.setTimeout(()=>{this._actionState="idle",this._actionError=""},e)}async _configEntryId(){if(this._cfg.config_entry_id)return this._cfg.config_entry_id;let e=this._discovery().entities.next_up??this._cfg.entity;if(e)try{return(await this.hass.callWS({type:"config/entity_registry/get",entity_id:e}))?.config_entry_id}catch{return}}async _markWatched(e){if(this._actionState==="busy")return;let i=`${W(e)}:${e.season}:${e.number}`;if(this._cfg.confirm_actions&&(this._actionState!=="confirm"||this._actionTarget!==i)){this._actionTarget=i,this._actionState="confirm",this._resetActionLater(3e3);return}window.clearTimeout(this._actionTimer),this._actionState="busy";try{let s={season:e.season,number:e.number};e.tmdbId!==void 0?s.tmdb_id=e.tmdbId:s.refract_id=e.refractId;let a=await this._configEntryId();a&&(s.config_entry_id=a),await this.hass.callService(K,"mark_episode_watched",s),this._actionState="done",this._resetActionLater(2500),this._refreshSensors()}catch(s){this._actionError=s instanceof Error?s.message:String(s),this._actionState="error",this._resetActionLater(4e3)}}_refreshSensors(){let e=this._discovery().entities,i=[e.next_up,e.shows_waiting,e.catch_up,e.last_7_days,e.average_per_week,e.last_watched,e.stats_streak_current_days].filter(Boolean);i.length&&this.hass.callService("homeassistant","update_entity",{entity_id:i}).catch(()=>{})}_catchup(e,i){let s=e.catchup;if(!s)return u;let a=C(this.hass),o=this._cfg.queue_length,d=s.shows.length>o,r=this._catchupExpanded?s.shows:s.shows.slice(0,o),l=Math.max(1,...s.shows.map(f=>f.remaining)),h=e.next.kind==="item"?W(e.next.item):void 0,m=s.minutes!==void 0&&s.total>0?`, ${p(this.hass,"catchup.about",{time:je(s.minutes,this._cfg.duration_format,a)})}`:"";return c`<div class="panel catchup">
      <div class="panel-head">
        <span class="label">${p(this.hass,"catchup.title")}</span>
      </div>
      ${s.total>0?c`<div class="catch-line">
            <span class="metric">${y(s.total,a)}</span>
            <span class="muted">${p(this.hass,"catchup.waiting")}${m}</span>
          </div>`:c`<div class="empty">${p(this.hass,"catchup.none")}</div>`}
      ${r.map(f=>this._catchupRow(f,l,i,a,h))}
      ${d?c`<button class="link" @click=${()=>this._catchupExpanded=!this._catchupExpanded}>
            ${this._catchupExpanded?p(this.hass,"catchup.show_less"):p(this.hass,"catchup.show_all",{n:y(s.shows.length,a)})}
          </button>`:u}
    </div>`}_catchupRow(e,i,s,a,o){let d=W(e),r=e.aired!==void 0&&e.aired>0&&e.aired>=e.remaining,l=r?Math.round((e.aired-e.remaining)/e.aired*1e3)/10:Math.round(e.remaining/i*1e3)/10,h=r?p(this.hass,"next.progress",{watched:y(e.aired-e.remaining,a),aired:y(e.aired,a)}):String(e.remaining),m=this._cfg.show_next_up&&!!e.next&&(d!==o||this._selected!==void 0),f=m&&this._selected===d,x=c`${s?this._poster(e.posterUrl,e.title,"sm"):u}
      <span class="c-name" title=${e.title}>${e.title}</span>
      <div class="progress" role="img" aria-label=${h} title=${h}><span style=${te({width:`${l}%`})}></span></div>
      <b class="c-count">${y(e.remaining,a)}</b>`;return m?c`<div
      class="c-row pickable ${f?"selected":""}"
      role="button"
      tabindex="0"
      aria-pressed=${f?"true":"false"}
      title=${p(this.hass,"catchup.pick",{title:e.title})}
      @click=${()=>this._selectShow(e,o)}
      @keydown=${T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),this._selectShow(e,o))}}
    >
      ${x}
    </div>`:c`<div class="c-row">${x}</div>`}_togglePick(e){this._openPicks=this._openPicks.includes(e)?this._openPicks.filter(i=>i!==e):[...this._openPicks,e]}_topPicks(e){let i=e.topPicks;if(!i)return u;let s=C(this.hass),o=(this._only||xe(this._config)==="custom"?this._cfg.top_picks_items:[...ke]).filter((v,E,R)=>ke.includes(v)&&R.indexOf(v)===E).map(v=>({kind:v,picks:i.picks[v]??[]})).filter(v=>v.picks.length>0);o.some(v=>v.kind==="country")&&yt();let d=v=>`${y(v,s,v<10?1:0)}\xA0h`,r=v=>v.split(/\s+/).map(E=>E[0]).filter(Boolean).slice(0,2).join("").toUpperCase(),l=v=>{try{return v.code&&new Intl.DisplayNames([s],{type:"region"}).of(v.code.toUpperCase())||v.name}catch{return v.name}},h=(v,E)=>v==="country"?l(E):E.name,m=v=>I(this.hass,"picks.sub",v.titles,{n:y(v.titles,s),time:d(v.hours)}),f=(v,E)=>{if(v==="country"){let R=Qe(E.code);return R?c`<span class="flag">${R}</span>`:c`<ha-icon icon="mdi:earth"></ha-icon>`}return v==="decade"?c`<ha-icon icon="mdi:calendar-range"></ha-icon>`:v==="genre"?c`<ha-icon icon="mdi:drama-masks"></ha-icon>`:E.photoUrl?c`<img src=${E.photoUrl} alt="" loading="lazy" referrerpolicy="no-referrer" />`:c`<span class="initials">${r(E.name)}</span>`},x=(v,E)=>{let R=E[0],Y=E.slice(1,3),q=Y.length>0&&this._openPicks.includes(v),ne=p(this.hass,`picks.${v}`),B=Y.length?c`<ha-icon class="pick-chevron" icon=${q?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>`:u,we=c`<span class="pick-avatar ${v}">${f(v,R)}</span>
        <span class="pick-text">
          <span class="pick-label">${ne}${B}</span>
          <b class="pick-name">${h(v,R)}</b>
          <span class="pick-sub">${m(R)}</span>
        </span>`,F=`${ne}: ${h(v,R)} \xB7 ${m(R)}`;return c`<div class="pick-cell">
        ${Y.length?c`<button
              class="pick"
              type="button"
              title=${F}
              aria-expanded=${q?"true":"false"}
              aria-label="${F}. ${p(this.hass,q?"picks.less":"picks.more")}"
              @click=${()=>this._togglePick(v)}
            >
              ${we}
            </button>`:c`<div class="pick" title=${F}>${we}</div>`}
        ${q?c`<ol class="pick-runners">
              ${Y.map((ae,b)=>c`<li>
                  <span class="pick-rank">${b+2}</span>
                  <span class="pick-avatar small ${v}">${f(v,ae)}</span>
                  <span class="pick-text">
                    <b class="pick-name">${h(v,ae)}</b>
                    <span class="pick-sub">${m(ae)}</span>
                  </span>
                </li>`)}
            </ol>`:u}
      </div>`},T=Math.max(0,i.total-i.pending),V=i.total>0?Math.round(T/i.total*100):0;return c`<div class="panel picks">
      <div class="panel-head">
        <span class="label">${p(this.hass,"picks.title")}</span>
        ${i.pending>0?c`<span class="badge">${p(this.hass,"picks.building")}</span>`:u}
      </div>
      ${o.length?c`<div class="picks-grid">${o.map(({kind:v,picks:E})=>x(v,E))}</div>`:c`<div class="empty">${p(this.hass,i.pending>0?"picks.waiting":"picks.none")}</div>`}
      ${i.pending>0&&i.total>0?c`<div
            class="picks-progress"
            role="progressbar"
            aria-label=${p(this.hass,"picks.progress_label")}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${V}
          >
            <span style=${te({width:`${V}%`})}></span>
          </div>`:u}
      ${i.total>0?c`<div class="picks-foot">
            ${i.pending>0?p(this.hass,"picks.progress",{n:y(T,s),total:y(i.total,s)}):p(this.hass,"picks.based_on",{n:y(i.titles,s),total:y(i.total,s)})}
            ·
            <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">TMDB</a>
          </div>`:u}
    </div>`}_monthlyWrap(e){let i=e.wrap;if(!i)return u;let s=C(this.hass),a=i.months,o=b=>c`<div class="panel-head"><span class="label">${p(this.hass,"wrap.title")}</span>${b}</div>`;if(a.length===0)return c`<div class="panel wrap">${o(u)}<div class="empty">${p(this.hass,"wrap.none")}</div></div>`;let d=Math.min(this._wrapIndex,a.length-1),r=a[d],[l,h]=r.month.split("-").map(Number),m=(b,A,g=1)=>new Date(Date.UTC(b,A-1,g)),f=(b,A)=>{let g=new Intl.DateTimeFormat(s,{month:"long",year:"numeric",timeZone:"UTC"}).format(m(b,A));return g.charAt(0).toLocaleUpperCase(s)+g.slice(1)},x=b=>{let[A,g,N]=b.split("-").map(Number);return new Intl.DateTimeFormat(s,{day:"numeric",month:"short",timeZone:"UTC"}).format(m(A,g,N))},T=b=>b/60,V=b=>y(b,s,b<10?1:0),v=r.days.length,E=b=>{this._wrapIndex=Math.max(0,Math.min(a.length-1,b))},R=a[d+1],Y=h===1?`${l-1}-12`:`${l}-${String(h-1).padStart(2,"0")}`,q=R&&R.month===Y&&R.minutes>0?R:void 0,ne;if(q){let b=Math.round((r.minutes-q.minutes)/q.minutes*100);ne=`${b>0?"+":b<0?"\u2212":""}${y(Math.abs(b),s)}%`}let B=(b,A)=>A>0?Math.round(b/A*100):0,we=["overview","tastes","patterns","moments"].map(b=>c`<button
        type="button"
        role="tab"
        class="wrap-tab ${this._wrapTab===b?"active":""}"
        aria-selected=${this._wrapTab===b?"true":"false"}
        @click=${()=>this._wrapTab=b}
      >
        ${p(this.hass,`wrap.tab.${b}`)}
      </button>`),F;if(this._wrapTab==="overview"){let b=T(r.minutes);F=c`<div class="wrap-hero">
          <span class="wrap-hours">${r.estimated?"~":""}${V(b)}</span>
          <span class="wrap-unit">${p(this.hass,"wrap.hours")}</span>
          ${ne?c`<span class="badge accent">${p(this.hass,"wrap.vs",{change:ne,month:f(...R.month.split("-").map(Number))})}</span>`:u}
        </div>
        <div class="wrap-tiles">
          ${[["wrap.episodes",r.episodes],["wrap.movies",r.movieTitles],["wrap.shows",r.showTitles],["wrap.anime",r.animeTitles]].map(([A,g])=>c`<div class="tile"><div class="value">${y(g,s)}</div><div class="muted">${p(this.hass,A)}</div></div>`)}
        </div>
        ${this._cfg.wrap_style!=="tabs"?c`<div class="wrap-tiles">
              <div class="tile"><div class="value">${y(r.items/v,s,1)}</div><div class="muted">${p(this.hass,"wrap.items_day")}</div></div>
              <div class="tile"><div class="value">${y(r.weekendShare,s)}%</div><div class="muted">${p(this.hass,"wrap.weekend")}</div></div>
              <div class="tile"><div class="value">${y(r.bestStreak,s)} <span class="muted">${I(this.hass,"unit.day",r.bestStreak)}</span></div><div class="muted">${p(this.hass,"wrap.streak")}</div></div>
            </div>`:u}
        ${r.estimated?c`<div class="picks-foot">${p(this.hass,"wrap.estimated")}</div>`:u}`}else if(this._wrapTab==="tastes"){let b=[{key:"wrap.shows",n:r.showTitles,color:"var(--c-shows)"},{key:"wrap.anime",n:r.animeTitles,color:"var(--c-anime)"},{key:"wrap.movies",n:r.movieTitles,color:"var(--c-movies)"}].filter(g=>g.n>0),A=Math.max(1,...r.genres.map(g=>g.titles));F=c`<div class="wrap-section">${p(this.hass,"wrap.split")}</div>
        <div class="wrap-split" role="img" aria-label=${b.map(g=>`${p(this.hass,g.key)} ${B(g.n,r.titles)}%`).join(", ")}>
          ${b.map(g=>c`<span style=${te({flex:`${g.n} 1 0`,background:g.color})}></span>`)}
        </div>
        <div class="legend-row">
          ${b.map(g=>c`<span><span class="swatch" style=${te({background:g.color})}></span>${p(this.hass,g.key)} · ${y(B(g.n,r.titles),s)}%</span>`)}
        </div>
        <div class="wrap-section">${p(this.hass,"wrap.genres")}</div>
        ${r.genres.length?c`<div class="wrap-genres">
              ${r.genres.map(g=>c`<div class="wrap-genre">
                  <span class="wrap-genre-name">${g.name}</span>
                  <span class="wrap-genre-bar"><span style=${te({width:`${Math.round(g.titles/A*100)}%`})}></span></span>
                  <b>${y(g.titles,s)}</b>
                </div>`)}
            </div>`:c`<div class="empty">${p(this.hass,"wrap.genres_none")}</div>`}
        <div class="wrap-section">${p(this.hass,"wrap.discovery")}</div>
        <div class="wrap-tiles two">
          <div class="tile"><div class="value">${y(B(r.firstWatch,r.items),s)}%</div><div class="muted">${p(this.hass,"wrap.first_watch")} · ${p(this.hass,"wrap.new",{n:y(r.firstWatch,s)})}</div></div>
          <div class="tile"><div class="value">${y(B(r.rewatch,r.items),s)}%</div><div class="muted">${p(this.hass,"wrap.rewatch")} · ${p(this.hass,"wrap.revisited",{n:y(r.rewatch,s)})}</div></div>
        </div>`}else if(this._wrapTab==="patterns"){let b=Math.max(1,...r.days),A=g=>y(g/v,s,1);F=c`<div class="wrap-tiles two">
          <div class="tile"><div class="value">${A(r.items)}</div><div class="muted">${p(this.hass,"wrap.items_day")}</div></div>
          <div class="tile"><div class="value">${A(T(r.minutes))}</div><div class="muted">${p(this.hass,"wrap.hours_day")}</div></div>
        </div>
        <div class="wrap-section">${p(this.hass,"wrap.daily")}</div>
        <div class="wrap-days" role="img" aria-label=${p(this.hass,"wrap.daily")}>
          ${r.days.map((g,N)=>{let Q=`${r.month}-${String(N+1).padStart(2,"0")}`;return c`<span
              class="wrap-day ${g===0?"empty":""} ${Q===r.busiest.day&&g>0?"peak":""}"
              style=${te({height:g===0?"3px":`${Math.max(8,Math.round(g/b*100))}%`})}
              title=${p(this.hass,"wrap.day",{day:x(Q),n:y(g,s)})}
            ></span>`})}
        </div>
        <div class="wrap-axis"><span>1</span><span>${y(v,s)}</span></div>
        ${r.busiest.count>0?c`<div class="picks-foot">${I(this.hass,"wrap.busiest",r.busiest.count,{day:x(r.busiest.day),n:y(r.busiest.count,s)})}</div>`:u}
        <div class="wrap-tiles">
          <div class="tile"><div class="value">${y(r.weekendShare,s)}%</div><div class="muted">${p(this.hass,"wrap.weekend")}</div></div>
          <div class="tile"><div class="value">${y(r.bestStreak,s)} <span class="muted">${I(this.hass,"unit.day",r.bestStreak)}</span></div><div class="muted">${p(this.hass,"wrap.streak")}</div></div>
          <div class="tile"><div class="value">${p(this.hass,"wrap.active_value",{n:y(r.activeDays,s),total:y(v,s)})}</div><div class="muted">${p(this.hass,"wrap.active")}</div></div>
        </div>`}else{let b=g=>Qe(g)??"",A=(g,N)=>{try{return g&&new Intl.DisplayNames([s],{type:"region"}).of(g.toUpperCase())||N}catch{return N}};r.firsts?.some(g=>Qe(g.code))&&yt(),F=c`<div class="wrap-section">${p(this.hass,"wrap.most_watched")}</div>
        <div class="wrap-top">
          ${r.top.map(g=>c`<div class="wrap-top-row">
              ${g.poster?c`<img src=${g.poster} alt="" loading="lazy" referrerpolicy="no-referrer" />`:c`<span class="wrap-noposter"><ha-icon icon=${g.kind==="movie"?"mdi:movie-open":"mdi:television-play"}></ha-icon></span>`}
              <span class="pick-text">
                <b class="pick-name">${g.title}</b>
                <span class="pick-sub">${g.kind==="movie"?g.count>1?p(this.hass,"wrap.plays",{n:y(g.count,s)}):p(this.hass,"wrap.movie_once"):I(this.hass,"wrap.episodes_n",g.count,{n:y(g.count,s)})}</span>
              </span>
            </div>`)}
        </div>
        <div class="wrap-section">${p(this.hass,"wrap.firsts")}</div>
        ${r.firsts===void 0?c`<div class="empty">${p(this.hass,"wrap.firsts_waiting")}</div>`:r.firsts.length?c`<div class="wrap-top">
                ${r.firsts.map(g=>c`<div class="wrap-top-row">
                    <span class="pick-avatar small country"><span class="flag">${b(g.code)}</span></span>
                    <span class="pick-text">
                      <span class="pick-label">${p(this.hass,"wrap.first_from",{country:A(g.code,g.name)})}</span>
                      <b class="pick-name">${g.title}</b>
                    </span>
                  </div>`)}
              </div>`:c`<div class="empty">${p(this.hass,"wrap.firsts_none")}</div>`}`}let ae=c`<span class="wrap-nav">
      <button type="button" class="wrap-arrow" aria-label=${p(this.hass,"wrap.older")} ?disabled=${d>=a.length-1} @click=${()=>E(d+1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
      <button type="button" class="wrap-arrow" aria-label=${p(this.hass,"wrap.newer")} ?disabled=${d<=0} @click=${()=>E(d-1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
    </span>`;if(this._cfg.wrap_style!=="tabs"){let b=["overview","tastes","patterns","moments"],A=b.indexOf(this._wrapTab),g=M=>{this._wrapTab=b[Math.max(0,Math.min(b.length-1,A+M))]},N;if(this._wrapTab==="overview")N=I(this.hass,"wrap.items",r.items,{n:y(r.items,s)});else if(this._wrapTab==="tastes")N=r.items?p(this.hass,"wrap.insight_new",{pct:y(B(r.firstWatch,r.items),s)}):void 0;else if(this._wrapTab==="patterns"){let M=new Array(7).fill(0);r.days.forEach((Ie,Oe)=>M[new Date(Date.UTC(l,h-1,Oe+1)).getUTCDay()]+=Ie);let H=M.indexOf(Math.max(...M)),oe=new Intl.DateTimeFormat(s,{weekday:"long",timeZone:"UTC"}).format(new Date(Date.UTC(2024,0,7+H)));N=r.items?p(this.hass,"wrap.insight_weekday",{weekday:oe}):void 0}else r.top[0]&&(N=p(this.hass,"wrap.insight_top",{title:r.top[0].title}));let Q=M=>p(this.hass,`wrap.tab.${M}`);return c`<div
        class="panel wrap wrap-pages page-${this._wrapTab}"
        tabindex="0"
        role="group"
        aria-label=${p(this.hass,"wrap.title")}
        @keydown=${M=>{if(M.key==="ArrowRight")g(1);else if(M.key==="ArrowLeft")g(-1);else return;M.preventDefault()}}
        @pointerdown=${M=>this._swipe={x:M.clientX,y:M.clientY}}
        @pointercancel=${()=>this._swipe=void 0}
        @pointerup=${M=>{let H=this._swipe;if(this._swipe=void 0,!H)return;let oe=M.clientX-H.x;Math.abs(oe)>48&&Math.abs(oe)>Math.abs(M.clientY-H.y)*1.5&&(this._swipedAt=Date.now(),g(oe<0?1:-1))}}
      >
        <div class="wrap-progress">
          ${b.map((M,H)=>c`<button
              type="button"
              class="wrap-seg ${H<=A?"done":""}"
              aria-label=${Q(M)}
              aria-current=${H===A?"page":"false"}
              @click=${()=>this._wrapTab=M}
            ></button>`)}
        </div>
        <div class="wrap-brand">
          <span class="wrap-brand-name"><ha-icon icon="mdi:chart-donut"></ha-icon>${e.accountMain}</span>
          ${e.accountSub?c`<span class="wrap-brand-user">@${e.accountSub}</span>`:u}
        </div>
        <div class="wrap-kicker-row"><span class="wrap-kicker">${f(l,h)}</span>${ae}</div>
        <div class="wrap-title">${p(this.hass,`wrap.page.${this._wrapTab}`)}</div>
        ${N?c`<div class="wrap-insight"><ha-icon icon="mdi:shimmer"></ha-icon><span>${N}</span></div>`:u}
        <div class="wrap-body">${F}</div>
        <button type="button" class="wrap-tap prev" tabindex="-1" aria-label=${p(this.hass,"wrap.prev_page")} ?hidden=${A===0} @click=${()=>Date.now()-this._swipedAt>400&&g(-1)}></button>
        <button type="button" class="wrap-tap next" tabindex="-1" aria-label=${p(this.hass,"wrap.next_page")} ?hidden=${A===b.length-1} @click=${()=>Date.now()-this._swipedAt>400&&g(1)}></button>
      </div>`}return c`<div class="panel wrap">
      ${o(ae)}
      <div class="wrap-month">${f(l,h)}</div>
      <div class="muted">${I(this.hass,"wrap.items",r.items,{n:y(r.items,s)})}</div>
      <div class="wrap-tabs" role="tablist">${we}</div>
      ${F}
    </div>`}_airing(e){let i=e.airing;if(!i)return u;let s=C(this.hass),a=bt(new Date,this._timeZone()),o=this._cfg.airing_length,d=i.length>o,r=this._airingExpanded?i:i.slice(0,o);return c`<div class="panel airing">
      <div class="panel-head"><span class="label">${p(this.hass,"airing.title")}</span></div>
      ${r.length?r.map(l=>{let h=l.season!==void 0&&l.number!==void 0?`S${l.season} \xB7 E${l.number}`:"",m=l.airAt?ks(l.airAt,s,this._timeZone(),this._hour12()):void 0;return c`<div class="a-row">
              <span class="a-day ${l.date===a?"today":""}">${l.date===a?p(this.hass,"airing.today"):et(l.date,s,"short")}</span>
              <span class="swatch" style="background:${l.isAnime?"var(--c-anime)":"var(--c-shows)"}"></span>
              <span class="a-name"><b>${l.show}</b>${h?c` <span class="muted">${h}</span>`:u}</span>
              ${l.premiere?c`<span class="badge accent">${p(this.hass,"badge.premiere")}</span>`:l.finale?c`<span class="badge warn">${p(this.hass,"badge.finale")}</span>`:u}
              ${m?c`<span class="a-time">${m}</span>`:u}
            </div>`}):c`<div class="empty">${p(this.hass,"airing.none")}</div>`}
      ${d?c`<button class="link" @click=${()=>this._airingExpanded=!this._airingExpanded}>
            ${this._airingExpanded?p(this.hass,"airing.show_less"):p(this.hass,"airing.show_all",{n:y(i.length,s)})}
          </button>`:u}
    </div>`}};O.styles=As,j([he({attribute:!1})],O.prototype,"hass",2),j([G()],O.prototype,"_config",2),j([G()],O.prototype,"_catchupExpanded",2),j([G()],O.prototype,"_airingExpanded",2),j([G()],O.prototype,"_openPicks",2),j([G()],O.prototype,"_wrapIndex",2),j([G()],O.prototype,"_wrapTab",2),j([G()],O.prototype,"_actionState",2),j([G()],O.prototype,"_actionError",2),O=j([me(Ce)],O);var L={entity:"Refract entity",name:"Name (optional)",layout:"Layout",library_style:"Library style",watch_time_style:"Watch time style",duration_format:"Duration format",queue_length:"Catch-up rows",airing_length:"Airing rows",fun_stat:"Show fun stat",fun_stat_mode:"Fun stat",show_hero:"Watch time summary",show_watch_time:"Watch time split",show_library:"Library",show_still_to_finish:"Still to finish",show_streak:"Streak",show_average:"Average per week",show_last_7_days:"Last 7 days",show_top_picks:"Most watched",show_monthly_wrap:"Monthly wrap",wrap_style:"Monthly wrap style",top_picks_items:"Most watched shows",show_next_up:"Next up",show_catchup:"Catch-up backlog",show_airing:"Airing this week",show_posters:"Posters",show_actions:"Show \u201CMark watched\u201D button",confirm_actions:"Ask before marking watched",color_movies:"Movies color",color_shows:"TV shows color",color_anime:"Anime color",color_accent:"Accent color"},At={hero:L.show_hero,watch_time:L.show_watch_time,library:L.show_library,still_to_finish:L.show_still_to_finish,streak:L.show_streak,average:L.show_average,last_7_days:L.show_last_7_days,top_picks:L.show_top_picks,monthly_wrap:L.show_monthly_wrap,next_up:L.show_next_up,catchup:L.show_catchup,airing:L.show_airing},Ts={entity:"Pick any entity of your Refract account. The card finds the rest.",show_actions:"Needs an API key that can mark episodes watched.",show_posters:"Needs a TMDB API key in the Refract integration options.",show_last_7_days:"Needs watch history turned on in the integration options.",show_top_picks:"Needs a TMDB API key in the Refract integration options.",show_monthly_wrap:"Needs watch history turned on in the integration options. Genres and firsts need a TMDB API key.",wrap_style:"App-style pages to swipe through, or compact tabs.",top_picks_items:"Only for the Custom layout. Full shows all six, Compact hides this section.",show_average:"Needs watch history turned on in the integration options.",color_movies:"Hex color such as #2a78d6. Leave empty for the default."},z=(n,t)=>({value:n,label:t}),$e=n=>({select:{mode:"dropdown",options:n}}),zs=(n,t=!1)=>[{name:"entity",required:!0,selector:{entity:{integration:K,domain:"sensor"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"layout",selector:$e([z("full","Full"),z("compact","Compact"),z("custom","Custom")])},{name:"duration_format",selector:$e([z("days_hours","Days and hours"),z("hours","Hours only"),z("auto","Automatic")])},{name:"watch_time_style",selector:$e([z("bar","Compact bar"),z("list","Breakdown list")])},{name:"library_style",selector:$e([z("bar","Compact bar"),z("list","Breakdown list")])},{name:"queue_length",selector:{number:{min:1,max:20,mode:"box"}}},{name:"airing_length",selector:{number:{min:1,max:20,mode:"box"}}}]},...n?[{type:"expandable",name:"",title:"Sections",icon:"mdi:view-dashboard-outline",schema:[{type:"grid",name:"",schema:[{name:"show_hero",selector:{boolean:{}}},{name:"show_watch_time",selector:{boolean:{}}},{name:"show_library",selector:{boolean:{}}},{name:"show_still_to_finish",selector:{boolean:{}}},{name:"show_streak",selector:{boolean:{}}},{name:"show_average",selector:{boolean:{}}},{name:"show_last_7_days",selector:{boolean:{}}},{name:"show_top_picks",selector:{boolean:{}}},{name:"show_monthly_wrap",selector:{boolean:{}}},{name:"show_next_up",selector:{boolean:{}}},{name:"show_catchup",selector:{boolean:{}}},{name:"show_airing",selector:{boolean:{}}}]},{name:"top_picks_items",selector:{select:{multiple:!0,mode:"list",options:[z("actor","Actor"),z("director","Director"),z("writer","Writer"),z("decade","Decade"),z("genre","Genre"),z("country","Country")]}}}]}]:[],{name:"show_posters",selector:{boolean:{}}},...t?[]:[{name:"wrap_style",selector:$e([z("pages","App-style pages"),z("tabs","Tabs")])}],{type:"expandable",name:"",title:"Fun stat",icon:"mdi:shimmer",schema:[{name:"fun_stat",selector:{boolean:{}}},{name:"fun_stat_mode",selector:$e([z("rotate","Rotate daily"),z("months","Months of nonstop viewing"),z("workweeks","Full-time work weeks"),z("lotr","Lord of the Rings marathons"),z("flights","Flights around the world"),z("sleep","Nights of sleep"),z("movies","Average movies back to back"),z("seasons","Full TV seasons"),z("marathons","Marathons run"),z("moon","Trips to the Moon"),z("imdb","IMDb Top 250 runs")])}]},{type:"expandable",name:"",title:"Next up actions",icon:"mdi:gesture-tap-button",schema:[{name:"show_actions",selector:{boolean:{}}},{name:"confirm_actions",selector:{boolean:{}}}]},{type:"expandable",name:"",title:"Colors",icon:"mdi:palette-outline",schema:[{type:"grid",name:"",schema:[{name:"color_movies",selector:{text:{}}},{name:"color_shows",selector:{text:{}}},{name:"color_anime",selector:{text:{}}},{name:"color_accent",selector:{text:{}}}]}]}],Ms=n=>n.flatMap(t=>t.schema?Ms(t.schema):[t]),oi={hero:["duration_format","fun_stat","fun_stat_mode"],watch_time:["duration_format","watch_time_style"],library:["library_style"],still_to_finish:["duration_format"],streak:[],average:["duration_format"],last_7_days:[],top_picks:["top_picks_items"],monthly_wrap:["wrap_style"],next_up:["show_posters","show_actions","confirm_actions"],catchup:["queue_length","show_posters"],airing:["airing_length"]},ie=class extends J{constructor(){super(...arguments);this._resetOrder=()=>this._setOrder([...se])}setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return u;if(this.section)return this._sectionForm(this.section);let e=xe(this._config),i={...fe,...this._config,layout:e};this._config.show_queue!==void 0&&this._config.show_catchup===void 0&&(i.show_catchup=this._config.show_queue);let s=!!this._config.show_actions&&!this.hass.services?.[K]?.mark_episode_watched,a=zs(e==="custom",e==="compact"),o=e==="custom"?a.findIndex(r=>r.title==="Sections")+1:a.length,d=r=>c`<ha-form
      .hass=${this.hass}
      .data=${i}
      .schema=${r}
      .computeLabel=${l=>L[l.name]??l.name}
      .computeHelper=${l=>Ts[l.name]}
      @value-changed=${this._valueChanged}
    ></ha-form>`;return c`<div class="wrap">
      ${d(a.slice(0,o))} ${e==="custom"?this._orderPanel():u}
      ${o<a.length?d(a.slice(o)):u}
      ${s?c`<ha-alert alert-type="warning">
            The button stays hidden until the <code>refract.mark_episode_watched</code> action is available. Check
            that your Refract API key allows marking episodes and movies as watched.
          </ha-alert>`:u}
    </div>`}_orderPanel(){let e=tt(this._config?.section_order),i=e.every((s,a)=>s===se[a]);return c`<ha-expansion-panel outlined header="Section order" .leftChevron=${!0}>
      <div class="order">
        <div class="hint">Use the arrows to move a section up or down. The header always stays on top.</div>
        ${e.map((s,a)=>c`<div class="order-row">
            <span class="order-name">${At[s]}</span>
            <ha-icon-button
              label="Move up"
              aria-label="Move ${At[s]} up"
              ?disabled=${a===0}
              @click=${()=>this._move(a,-1)}
              ><ha-icon icon="mdi:arrow-up"></ha-icon
            ></ha-icon-button>
            <ha-icon-button
              label="Move down"
              aria-label="Move ${At[s]} down"
              ?disabled=${a===e.length-1}
              @click=${()=>this._move(a,1)}
              ><ha-icon icon="mdi:arrow-down"></ha-icon
            ></ha-icon-button>
          </div>`)}
        ${i?u:c`<button class="order-reset" @click=${this._resetOrder}>Reset to default order</button>`}
      </div>
    </ha-expansion-panel>`}_move(e,i){let s=tt(this._config?.section_order),a=e+i;a<0||a>=s.length||([s[e],s[a]]=[s[a],s[e]],this._setOrder(s))}_setOrder(e){if(!this._config)return;let i={...this._config};e.every((s,a)=>s===se[a])?delete i.section_order:i.section_order=e,this._config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}_sectionForm(e){let i={...fe,...this._config},s=new Map(Ms(zs(!0)).map(d=>[d.name,d])),a=["entity","name",...oi[e]].map(d=>s.get(d)).filter(Boolean),o=e==="next_up"&&!!this._config?.show_actions&&!this.hass.services?.[K]?.mark_episode_watched;return c`<div class="wrap">
      <ha-form
        .hass=${this.hass}
        .data=${i}
        .schema=${a}
        .computeLabel=${d=>L[d.name]??d.name}
        .computeHelper=${d=>Ts[d.name]}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${o?c`<ha-alert alert-type="warning">
            The button stays hidden until the <code>refract.mark_episode_watched</code> action is available. Check
            that your Refract API key allows marking episodes and movies as watched.
          </ha-alert>`:u}
    </div>`}_valueChanged(e){if(e.stopPropagation(),!this._config)return;let i=e.detail.value,s=fe,a={type:this._config.type};for(let[d,r]of Object.entries(i))r===""||r===void 0||r===null||d in s&&(r===s[d]||Array.isArray(r)&&JSON.stringify(r)===JSON.stringify(s[d]))||(a[d]=r);delete a.streak_style,delete a.show_streak_toggle,delete a.show_queue;let o=this._config;for(let d of["device_id","config_entry_id","entities","section_order"])o[d]!==void 0&&a[d]===void 0&&(a[d]=o[d]);!this.section&&a.layout===void 0&&i.layout==="full"&&kt(a)&&(a.layout="full"),this._config=a,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0}))}};ie.styles=Ss,j([he({attribute:!1})],ie.prototype,"hass",2),j([G()],ie.prototype,"_config",2),j([he({attribute:!1})],ie.prototype,"section",2),ie=j([me(Je)],ie);var St=class extends ie{};me(Ve)(St);var Tt=[{section:"hero",type:"refract-total-watch-time-card",name:"Refract: Total watch time",description:"Your total watch time, with the library, movie and episode counts and a fun comparison."},{section:"watch_time",type:"refract-watch-time-card",name:"Refract: Watch time",description:"Watch time split between TV shows, movies and anime."},{section:"library",type:"refract-library-card",name:"Refract: Library",description:"Your library by status."},{section:"still_to_finish",type:"refract-still-to-finish-card",name:"Refract: Still to finish",description:"Time left to finish the movies and shows you started."},{section:"streak",type:"refract-streak-card",name:"Refract: Streak",description:"Your current and longest streak of days."},{section:"average",type:"refract-average-card",name:"Refract: Average per week",description:"Your weekly average and how it compares with the weeks before."},{section:"last_7_days",type:"refract-last-7-days-card",name:"Refract: Last 7 days",description:"Episodes and movies of the last seven days."},{section:"top_picks",type:"refract-most-watched-card",name:"Refract: Most watched",description:"Your top actor, director, writer, decade, genre and country."},{section:"monthly_wrap",type:"refract-monthly-wrap-card",name:"Refract: Monthly wrap",description:"A wrap of every completed month, as app-style pages."},{section:"next_up",type:"refract-next-up-card",name:"Refract: Next up",description:"The next episode to watch, with progress and a button to mark it watched."},{section:"catchup",type:"refract-catch-up-card",name:"Refract: Catch-up backlog",description:"Aired episodes waiting for you, by show."},{section:"airing",type:"refract-airing-card",name:"Refract: Airing this week",description:"The shows airing in the next seven days."}];for(let n of Tt){let t=n.section;class e extends O{constructor(){super(),this._only=t}static async getConfigElement(){let s=document.createElement(Ve);return s.section=t,s}}me(n.type)(e)}window.customCards=window.customCards||[];window.customCards.some(n=>n.type===Ce)||window.customCards.push({type:Ce,name:p(void 0,"card.name"),description:p(void 0,"card.description"),preview:!0,documentationURL:wt});for(let n of Tt)window.customCards.some(t=>t.type===n.type)||window.customCards.push({type:n.type,name:n.name,description:n.description,preview:!0,documentationURL:wt});console.info(`%c REFRACT-STATS-CARD %c v${Qt} `,"color:white;background:#6250d6;font-weight:500;border-radius:3px 0 0 3px","color:#6250d6;background:#eee;font-weight:500;border-radius:0 3px 3px 0");
