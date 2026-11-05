var Nt=Object.defineProperty;var It=Object.getOwnPropertyDescriptor;var y=(i,t,e,s)=>{for(var n=s>1?void 0:s?It(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&Nt(t,e,n),n};var X=globalThis,ee=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pe=Symbol(),Le=new WeakMap,z=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==pe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(ee&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Le.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Le.set(e,t))}return t}toString(){return this.cssText}},ze=i=>new z(typeof i=="string"?i:i+"",void 0,pe),te=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,n,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[r+1],i[0]);return new z(e,i,pe)},Fe=(i,t)=>{if(ee)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),n=X.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},fe=ee?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ze(e)})(i):i;var{is:qt,defineProperty:Ut,getOwnPropertyDescriptor:Ht,getOwnPropertyNames:Lt,getOwnPropertySymbols:zt,getPrototypeOf:Ft}=Object,se=globalThis,je=se.trustedTypes,jt=je?je.emptyScript:"",Wt=se.reactiveElementPolyfillSupport,F=(i,t)=>i,j={toAttribute(i,t){switch(t){case Boolean:i=i?jt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},ne=(i,t)=>!qt(i,t),We={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:ne};Symbol.metadata??=Symbol("metadata"),se.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=We){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&Ut(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){let{get:n,set:r}=Ht(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){let a=n?.call(this);r?.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??We}static _$Ei(){if(this.hasOwnProperty(F("elementProperties")))return;let t=Ft(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(F("properties"))){let e=this.properties,s=[...Lt(e),...zt(e)];for(let n of s)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let n of s)e.unshift(fe(n))}else t!==void 0&&e.push(fe(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Fe(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:j).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let r=s.getPropertyOptions(n),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:j;this._$Em=n;let a=o.fromAttribute(e,r.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(t,e,s,n=!1,r){if(t!==void 0){let o=this.constructor;if(n===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??ne)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,r]of s){let{wrapped:o}=r,a=this[n];o!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[F("elementProperties")]=new Map,S[F("finalized")]=new Map,Wt?.({ReactiveElement:S}),(se.reactiveElementVersions??=[]).push("2.1.2");var xe=globalThis,Be=i=>i,ie=xe.trustedTypes,Ke=ie?ie.createPolicy("lit-html",{createHTML:i=>i}):void 0,Qe="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,Xe="?"+R,Bt=`<${Xe}>`,D=document,B=()=>D.createComment(""),K=i=>i===null||typeof i!="object"&&typeof i!="function",we=Array.isArray,Kt=i=>we(i)||typeof i?.[Symbol.iterator]=="function",me=`[ 	
\f\r]`,W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ve=/-->/g,Ge=/>/g,P=RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ye=/'/g,Ze=/"/g,et=/^(?:script|style|textarea|title)$/i,$e=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),h=$e(1),ke=$e(2),fs=$e(3),A=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Je=new WeakMap,O=D.createTreeWalker(D,129);function tt(i,t){if(!we(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ke!==void 0?Ke.createHTML(t):t}var Vt=(i,t)=>{let e=i.length-1,s=[],n,r=t===2?"<svg>":t===3?"<math>":"",o=W;for(let a=0;a<e;a++){let c=i[a],l,p,f=-1,g=0;for(;g<c.length&&(o.lastIndex=g,p=o.exec(c),p!==null);)g=o.lastIndex,o===W?p[1]==="!--"?o=Ve:p[1]!==void 0?o=Ge:p[2]!==void 0?(et.test(p[2])&&(n=RegExp("</"+p[2],"g")),o=P):p[3]!==void 0&&(o=P):o===P?p[0]===">"?(o=n??W,f=-1):p[1]===void 0?f=-2:(f=o.lastIndex-p[2].length,l=p[1],o=p[3]===void 0?P:p[3]==='"'?Ze:Ye):o===Ze||o===Ye?o=P:o===Ve||o===Ge?o=W:(o=P,n=void 0);let m=o===P&&i[a+1].startsWith("/>")?" ":"";r+=o===W?c+Bt:f>=0?(s.push(l),c.slice(0,f)+Qe+c.slice(f)+R+m):c+R+(f===-2?a:m)}return[tt(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},V=class i{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let r=0,o=0,a=t.length-1,c=this.parts,[l,p]=Vt(t,e);if(this.el=i.createElement(l,s),O.currentNode=this.el.content,e===2||e===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(n=O.nextNode())!==null&&c.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(let f of n.getAttributeNames())if(f.endsWith(Qe)){let g=p[o++],m=n.getAttribute(f).split(R),k=/([.?@])?(.*)/.exec(g);c.push({type:1,index:r,name:k[2],strings:m,ctor:k[1]==="."?_e:k[1]==="?"?ye:k[1]==="@"?ve:U}),n.removeAttribute(f)}else f.startsWith(R)&&(c.push({type:6,index:r}),n.removeAttribute(f));if(et.test(n.tagName)){let f=n.textContent.split(R),g=f.length-1;if(g>0){n.textContent=ie?ie.emptyScript:"";for(let m=0;m<g;m++)n.append(f[m],B()),O.nextNode(),c.push({type:2,index:++r});n.append(f[g],B())}}}else if(n.nodeType===8)if(n.data===Xe)c.push({type:2,index:r});else{let f=-1;for(;(f=n.data.indexOf(R,f+1))!==-1;)c.push({type:7,index:r}),f+=R.length-1}r++}}static createElement(t,e){let s=D.createElement("template");return s.innerHTML=t,s}};function q(i,t,e=i,s){if(t===A)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl,r=K(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=n:e._$Cl=n),n!==void 0&&(t=q(i,n._$AS(i,t.values),n,s)),t}var ge=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??D).importNode(e,!0);O.currentNode=n;let r=O.nextNode(),o=0,a=0,c=s[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new G(r,r.nextSibling,this,t):c.type===1?l=new c.ctor(r,c.name,c.strings,this,t):c.type===6&&(l=new be(r,this,t)),this._$AV.push(l),c=s[++a]}o!==c?.index&&(r=O.nextNode(),o++)}return O.currentNode=D,n}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},G=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),K(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Kt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&K(this._$AH)?this._$AA.nextSibling.data=t:this.T(D.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=V.createElement(tt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{let r=new ge(n,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=Je.get(t.strings);return e===void 0&&Je.set(t.strings,e=new V(t)),e}k(t){we(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,n=0;for(let r of t)n===e.length?e.push(s=new i(this.O(B()),this.O(B()),this,this.options)):s=e[n],s._$AI(r),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=Be(t).nextSibling;Be(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},U=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(t,e=this,s,n){let r=this.strings,o=!1;if(r===void 0)t=q(this,t,e,0),o=!K(t)||t!==this._$AH&&t!==A,o&&(this._$AH=t);else{let a=t,c,l;for(t=r[0],c=0;c<r.length-1;c++)l=q(this,a[s+c],e,c),l===A&&(l=this._$AH[c]),o||=!K(l)||l!==this._$AH[c],l===u?t=u:t!==u&&(t+=(l??"")+r[c+1]),this._$AH[c]=l}o&&!n&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},_e=class extends U{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},ye=class extends U{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},ve=class extends U{constructor(t,e,s,n,r){super(t,e,s,n,r),this.type=5}_$AI(t,e=this){if((t=q(this,t,e,0)??u)===A)return;let s=this._$AH,n=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==u&&(s===u||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},be=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}};var Gt=xe.litHtmlPolyfillSupport;Gt?.(V,G),(xe.litHtmlVersions??=[]).push("3.3.3");var st=(i,t,e)=>{let s=e?.renderBefore??t,n=s._$litPart$;if(n===void 0){let r=e?.renderBefore??null;s._$litPart$=n=new G(t.insertBefore(B(),r),r,void 0,e??{})}return n._$AI(i),n};var Se=globalThis,w=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=st(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};w._$litElement$=!0,w.finalized=!0,Se.litElementHydrateSupport?.({LitElement:w});var Yt=Se.litElementPolyfillSupport;Yt?.({LitElement:w});(Se.litElementVersions??=[]).push("4.2.2");var Zt={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:ne},Jt=(i=Zt,t,e)=>{let{kind:s,metadata:n}=e,r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),r.set(e.name,i),s==="accessor"){let{name:o}=e;return{set(a){let c=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,c,i,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,i,a),a}}}if(s==="setter"){let{name:o}=e;return function(a){let c=this[o];t.call(this,a),this.requestUpdate(o,c,i,!0,a)}}throw Error("Unsupported decorator location: "+s)};function H(i){return(t,e)=>typeof e=="object"?Jt(i,t,e):((s,n,r)=>{let o=n.hasOwnProperty(r);return n.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(n,r):void 0})(i,t,e)}function C(i){return H({...i,state:!0,attribute:!1})}var oe=i=>t=>{if(customElements.get(i)){console.warn(`[refract-stats-card] <${i}> is already registered, probably by the standalone HACS card. Remove that copy to use the card that ships with the Refract integration.`);return}customElements.define(i,t)};var nt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},it=i=>(...t)=>({_$litDirective$:i,values:t}),ae=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var rt="important",Qt=" !"+rt,ot=it(class extends ae{constructor(i){if(super(i),i.type!==nt.ATTRIBUTE||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let n=t[s];if(n!=null){this.ft.add(s);let r=typeof n=="string"&&n.endsWith(Qt);s.includes("-")||r?e.setProperty(s,r?n.slice(0,-11):n,r?rt:""):e[s]=n}}return A}});var Ae=40,at=2*Math.PI*Ae,Xt=1.2,es=1.5;function lt(i,t,e,s){let n=i.filter(c=>c.value>0),r=n.reduce((c,l)=>c+l.value,0),o=0,a=n.map(c=>{let l=c.value/r*at,p=n.length>1?Math.max(l-Xt,es):l,f=ke`<circle cx="52" cy="52" r="${Ae}" fill="none" stroke-width="14"
      style="stroke:${c.color}" stroke-dasharray="${p} ${at}" stroke-dashoffset="${-o}"
      transform="rotate(-90 52 52)"></circle>`;return o+=l,f});return h`<svg class="donut" viewBox="0 0 104 104" role="img" aria-label=${s}>
    <circle cx="52" cy="52" r="${Ae}" fill="none" stroke-width="14" class="track"></circle>
    ${a}
    <text x="52" y="53" text-anchor="middle" class="donut-value">${t}</text>
    <text x="52" y="67" text-anchor="middle" class="donut-label">${e}</text>
  </svg>`}var ct=Math.PI*60;function dt(i,t,e,s,n){let o=(t>0?Math.min(Math.max(i/t,0),1):0)*ct;return h`<svg class="gauge" viewBox="0 0 160 96" role="img" aria-label=${n}>
    <path d="M20 84 A60 60 0 0 1 140 84" fill="none" stroke-width="12" stroke-linecap="round" class="track"></path>
    ${o>0?ke`<path d="M20 84 A60 60 0 0 1 140 84" fill="none" stroke-width="12" stroke-linecap="round"
          class="gauge-fill" stroke-dasharray="${o} ${ct+1}"></path>`:""}
    <text x="80" y="72" text-anchor="middle" class="gauge-value">${e}</text>
    <text x="80" y="90" text-anchor="middle" class="gauge-label">${s}</text>
  </svg>`}var Y="refract-stats-card",ce="refract-stats-card-editor",E="refract",ut="https://github.com/Big-Edge2297/ha-refract-card",ht="0.2.0",le=["library_total","completed","in_progress","watchlist","up_to_date","movies","tv_shows","anime","last_watched","shows_waiting","next_up","username","stats_anime_episodes_watched","stats_anime_titles","stats_movies_watched","stats_shows_episodes_watched","stats_shows_titles","stats_streak_current_days","stats_streak_longest_days","stats_watch_time_anime_minutes","stats_watch_time_movies_minutes","stats_watch_time_shows_minutes","stats_watch_time_total_minutes"];var ts=[...le].sort((i,t)=>t.length-i.length),pt=new Set(le);function ft(i){for(let t of ts){if(i===t)return{key:t,prefix:""};if(i.endsWith(`_${t}`))return{key:t,prefix:i.slice(0,i.length-t.length)}}}var mt=i=>i.slice(i.indexOf(".")+1);function gt(i,t){let e={entities:{}},s=i.entities,n=t.entity;if(e.deviceId=t.device_id,n&&s?.[n]?.device_id&&(e.deviceId=s[n].device_id),e.deviceId&&s)for(let[r,o]of Object.entries(s)){if(o.device_id!==e.deviceId||!r.startsWith("sensor.")||o.platform&&o.platform!==E)continue;let a=o.translation_key&&pt.has(o.translation_key)?o.translation_key:void 0,c=a?{key:a,prefix:void 0}:ft(mt(r));c&&(e.entities[c.key]||(e.entities[c.key]=r),e.prefix===void 0&&c.prefix!==void 0&&(e.prefix=c.prefix))}if(n){let r=ft(mt(n));if(r){e.prefix??=r.prefix;for(let o of le){let a=`sensor.${r.prefix}${o}`;!e.entities[o]&&i.states[a]&&(e.entities[o]=a)}}}for(let[r,o]of Object.entries(t.entities??{}))pt.has(r)&&typeof o=="string"&&(e.entities[r]=o);return e}function _t(i){if(!i)return{main:"Refract"};let t=i.match(/^(.*?)\s*\(([^)]*)\)\s*$/);return t&&t[1]?{main:t[1],sub:t[2]||void 0}:{main:i}}function yt(i,t){let e=t.deviceId?i.devices?.[t.deviceId]:void 0,s=e?.name_by_user||e?.name;if(s)return s;for(let n of Object.values(t.entities)){let o=i.states[n]?.attributes?.friendly_name?.match(/^(.*?\([^)]*\))/);if(o)return o[1]}}var Ee={"card.name":"Refract stats","card.description":"Watch time, library, streak and what to watch next from your Refract account.","empty.no_entity":"Choose a Refract entity to get started.","empty.not_found":"Couldn't find any Refract entities for {entity}.","empty.nothing_up_next":"Nothing up next. Add a show or mark an episode watched.","hero.total":"Total watch time","hero.library":"Library","hero.movies_seen":"Movies seen","hero.episodes":"Episodes","unit.days":"days","unit.day":"day","unit.hours":"hours","unit.hour":"hour","unit.min":"min","header.last_watched":"Last watched","library.title":"Library","library.titles":"titles","library.movies":"Movies","library.shows":"TV shows","library.anime":"Anime","status.completed":"Completed","status.up_to_date":"Up to date","status.watchlist":"Watchlist","status.in_progress":"In progress","status.other":"Other","watch.title":"Watch time","streak.title":"Streak","streak.gauge":"Gauge view","streak.dots":"Dots view","streak.longest":"Longest: {n} {unit}","streak.best":"Best {n}","streak.still_time":"still time today","streak.none":"No active streak","streak.record":"Your longest streak","next.title":"Next up","next.progress":"{watched} of {aired} aired episodes","next.remaining":"{n} remaining","next.mark":"Mark watched","next.confirm":"Mark watched?","next.busy":"Marking\u2026","next.done":"Marked","next.error":"Couldn't mark watched","queue.title":"Waiting","queue.shows":"{n} shows","queue.show_all":"Show all {n}","queue.show_less":"Show less","queue.left":"{n} left","badge.premiere":"Premiere","badge.finale":"Finale","badge.mid_finale":"Mid-season finale","badge.not_aired":"Not aired","badge.anime":"Anime","fun.months":"That's about {n} months of nonstop viewing","fun.years":"That's about {n} years of nonstop viewing","fun.days":"That's about {n} days of nonstop viewing","fun.workweeks":"That's about {n} full-time work weeks","fun.lotr":"Enough for the extended Lord of the Rings trilogy about {n} times"},ss={en:Ee};function $(i){return i?.locale?.language||i?.language||"en"}function d(i,t,e={}){let s=$(i).split("-")[0],r=(ss[s]??Ee)[t]??Ee[t]??t;for(let[o,a]of Object.entries(e))r=r.replace(`{${o}}`,String(a));return r}var Re=864e5;function Ce(i){if(!i)return;let t=i.state;if(t==="unknown"||t==="unavailable"||t===""||t==null)return;let e=Number(t);return Number.isFinite(e)?e:void 0}function Me(i){return!!i&&i.state!=="unavailable"&&i.state!=="unknown"}function _(i,t="en",e=0){try{return new Intl.NumberFormat(t,{maximumFractionDigits:e}).format(i)}catch{return String(Math.round(i))}}var T=(i,t,e)=>{let s=_(i,e);return t==="d"?{value:s,unit:i===1?"unit.day":"unit.days",short:"d"}:t==="h"?{value:s,unit:i===1?"unit.hour":"unit.hours",short:"h"}:{value:s,unit:"unit.min",short:"min"}};function Pe(i,t="days_hours",e="en"){let s=Math.max(0,Math.round(i)),n=Math.floor(s/1440),r=Math.floor(s%1440/60),o=s%60;if(t==="hours"){let a=Math.floor(s/60);return a>0?[T(a,"h",e)]:[T(o,"min",e)]}return t==="auto"?n>=1?[T(n,"d",e),T(r,"h",e)]:r>=1?[T(r,"h",e),T(o,"min",e)]:[T(o,"min",e)]:[T(n,"d",e),T(r,"h",e)]}function bt(i,t="days_hours",e="en"){return Pe(i,t,e).map(s=>`${s.value} ${s.short}`).join(" ")}function xt(i){let t=i.reduce((o,a)=>o+a,0);if(t<=0)return i.map(()=>0);let e=i.map(o=>o/t*100),s=e.map(Math.floor),n=100-s.reduce((o,a)=>o+a,0),r=e.map((o,a)=>({i:a,frac:o-Math.floor(o)})).sort((o,a)=>a.frac-o.frac);for(let{i:o}of r){if(n<=0)break;s[o]+=1,n-=1}return s}var ns=726;function Te(i,t,e){let s=$(i),n=e/1440;switch(t){case"months":{if(n<1)return;if(n<30)return d(i,"fun.days",{n:_(n,s)});let r=n/30.4375;return r<24?d(i,"fun.months",{n:_(r,s,1)}):d(i,"fun.years",{n:_(r/12,s,1)})}case"workweeks":{let r=e/60/40;return r>=2?d(i,"fun.workweeks",{n:_(r,s)}):void 0}case"lotr":{let r=e/ns;return r>=2?d(i,"fun.lotr",{n:_(r,s)}):void 0}}}function wt(i,t,e="rotate",s=Date.now()){if(!(t>=1440))return;if(e!=="rotate")return Te(i,e,t);let r=["months","workweeks","lotr"].filter(a=>Te(i,a,t));if(!r.length)return;let o=r[Math.floor(s/Re)%r.length];return Te(i,o,t)}function vt(i,t){let e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(i),s=n=>Number(e.find(r=>r.type===n)?.value);return Math.round(Date.UTC(s("year"),s("month")-1,s("day"))/Re)}function $t(i){let{now:t,lastWatchedIso:e,current:s,timeZone:n,lang:r="en"}=i,o=vt(t,n),a=e?new Date(e):void 0,c=a&&!isNaN(a.getTime())?vt(a,n):void 0,l=new Intl.DateTimeFormat(r,{weekday:"narrow",timeZone:"UTC"}),p=[];for(let g=6;g>=0;g--){let m=o-g,k=c!==void 0&&s>0&&m<=c&&m>c-s;p.push({label:l.format(new Date(m*Re)),filled:k,today:g===0})}let f=p[6].filled;return{days:p,todayFilled:f,stillTimeToday:!f&&s>0&&c===o-1}}var M=i=>typeof i=="number"&&Number.isFinite(i)?i:void 0,de=i=>{let t=i.filter(e=>e!==void 0);return t.length?t.reduce((e,s)=>e+s,0):void 0};function kt(i,t){let e=i?.show??{},s=e.title??t;if(!s)return;let n=i?.next_episode??{};return{title:s,year:M(e.year),isAnime:!!e.is_anime,status:typeof i?.status=="string"?i.status:void 0,season:M(n.season),number:M(n.number),episodeName:typeof n.name=="string"?n.name:void 0,aired:n.aired!==!1,premiere:!!n.is_season_premiere,finale:!!n.is_season_finale,midFinale:!!n.is_mid_season_finale,airedEpisodes:M(i?.aired_episodes),remaining:M(i?.remaining_episodes),refractId:typeof e.ids?.refract=="string"?e.ids.refract:void 0,tmdbId:M(e.ids?.tmdb)}}var is=(i,t)=>i.refractId&&t.refractId?i.refractId===t.refractId:i.title===t.title&&i.year===t.year;function St(i,t,e){let s=v=>{let He=t.entities[v];return He?i.states[He]:void 0},n=v=>Ce(s(v)),r=Object.keys(t.entities).length>0,o=_t(e.name??yt(i,t)),a=n("movies"),c=n("tv_shows"),l=n("anime"),p=n("library_total")??de([a,c,l]),f=n("completed"),g=n("in_progress"),m=n("up_to_date"),k=n("watchlist"),De=de([f,g,m,k]),Rt=p!==void 0&&De!==void 0?Math.max(0,p-De):void 0,Ne=n("stats_watch_time_shows_minutes"),Ie=n("stats_watch_time_movies_minutes"),qe=n("stats_watch_time_anime_minutes"),Ct=n("stats_watch_time_total_minutes")??de([Ne,Ie,qe]),I=s("last_watched"),Mt=Me(I)?{iso:I.state,title:typeof I.attributes.title=="string"?I.attributes.title:void 0,season:M(I.attributes.season),episode:M(I.attributes.episode)}:void 0,J=n("stats_streak_current_days"),Pt=n("stats_streak_longest_days"),L=s("next_up"),Q={kind:"hidden"};if(L&&L.state!=="unavailable"){let v=Me(L)?kt(L.attributes,L.state):void 0;Q=v?{kind:"item",item:v}:{kind:"empty"}}let he=s("shows_waiting"),Ot=Array.isArray(he?.attributes?.items)?he.attributes.items:[],Ue=Q.kind==="item"?Q.item:void 0,Dt=Ot.map(v=>kt(v)).filter(v=>!!v&&!(Ue&&is(v,Ue)));return{found:r,accountMain:o.main,accountSub:o.sub,last:Mt,minutes:{total:Ct,shows:Ne,movies:Ie,anime:qe},library:{total:p,movies:a,shows:c,anime:l,completed:f,inProgress:g,upToDate:m,watchlist:k,other:Rt},moviesWatched:n("stats_movies_watched"),episodesWatched:de([n("stats_shows_episodes_watched"),n("stats_anime_episodes_watched")]),streak:J!==void 0?{current:J,longest:Math.max(Pt??J,J)}:void 0,next:Q,queue:Dt,waiting:Ce(he)}}var At=te`
  :host {
    display: block;
  }
  ha-card {
    --c-movies: var(--refract-color-movies, #2a78d6);
    --c-shows: var(--refract-color-shows, #eb6834);
    --c-anime: var(--refract-color-anime, #1baf7a);
    --c-accent: var(--refract-color-accent, #6250d6);
    --c-completed: var(--refract-color-completed, #2f9e44);
    --c-up-to-date: var(--refract-color-up-to-date, var(--c-accent));
    --c-watchlist: var(--refract-color-watchlist, #eda100);
    --c-in-progress: var(--refract-color-in-progress, #e87ba4);
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
  .fun {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .fun ha-icon {
    --mdc-icon-size: 16px;
    flex: none;
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
  .panel.library {
    flex: 1.3 1 260px;
  }
  .panel.streak {
    flex: 1 1 210px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  .legend {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .legend span,
  .status-legend span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .donut-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  svg .track {
    stroke: var(--track);
  }
  .donut {
    width: 104px;
    height: 104px;
    flex: none;
  }
  .donut-value,
  .gauge-value {
    fill: var(--primary-text-color);
    font-weight: 500;
  }
  .donut-value {
    font-size: 18px;
  }
  .gauge-value {
    font-size: 28px;
  }
  .donut-label,
  .gauge-label {
    fill: var(--secondary-text-color);
    font-size: 11px;
  }
  .status-bar,
  .stack {
    display: flex;
    gap: 2px;
    border-radius: 4px;
    overflow: hidden;
  }
  .status-bar {
    height: 10px;
    margin-top: 14px;
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
    gap: 4px 12px;
    margin-top: 8px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  /* streak */
  .seg {
    display: flex;
    gap: 2px;
  }
  .seg button {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 2px 6px;
    border-radius: 6px;
    color: var(--secondary-text-color);
  }
  .seg button[aria-pressed="true"] {
    background: var(--tile-bg);
    color: var(--primary-text-color);
  }
  .seg button:focus-visible {
    outline: 2px solid var(--c-accent);
  }
  .seg ha-icon {
    --mdc-icon-size: 16px;
  }
  .gauge {
    width: 160px;
    height: 96px;
  }
  .gauge-fill {
    stroke: var(--c-accent);
  }
  .streak-foot {
    font-size: 12px;
    color: var(--secondary-text-color);
    text-align: center;
  }
  .dots-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding-top: 14px;
  }
  .dots {
    display: flex;
    gap: 8px;
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
  .dots-count {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
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

  /* queue */
  .panel.queue {
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .queue-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 4px;
  }
  .link {
    all: unset;
    cursor: pointer;
    font-size: 12px;
    color: var(--c-accent);
  }
  .link:focus-visible {
    outline: 2px solid var(--c-accent);
  }
  .q-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-top: 1px solid var(--divider-color);
  }
  .q-main {
    flex: 1;
    min-width: 0;
  }
  .q-title {
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .q-ep {
    font-size: 12px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .q-row .progress {
    width: 90px;
    flex: none;
  }
  .q-end {
    flex: none;
    min-width: 56px;
    text-align: right;
    font-size: 11px;
    color: var(--secondary-text-color);
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
    .q-row .progress {
      width: 56px;
    }
    .last {
      max-width: 55%;
    }
  }
`,Et=te`
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  ha-alert {
    display: block;
  }
`;var Z={layout:"full",streak_style:"gauge",show_streak_toggle:!0,duration_format:"days_hours",fun_stat:!0,fun_stat_mode:"rotate",queue_length:5,show_hero:!0,show_library:!0,show_watch_time:!0,show_streak:!0,show_next_up:!0,show_queue:!0,show_actions:!1,confirm_actions:!0};var Oe="refract-stats-card:streak-style",rs=()=>{try{let i=window.localStorage.getItem(Oe);return i==="gauge"||i==="dots"?i:void 0}catch{return}},Tt=i=>{try{i?window.localStorage.setItem(Oe,i):window.localStorage.removeItem(Oe)}catch{}},b=class extends w{constructor(){super(...arguments);this._queueExpanded=!1;this._actionState="idle";this._actionError=""}static async getConfigElement(){return document.createElement(ce)}static getStubConfig(e){let s=e?.entities??{},n=Object.keys(s).filter(c=>c.startsWith("sensor.")&&s[c].platform===E),r=Object.keys(e?.states??{}).filter(c=>c.startsWith("sensor.refract_")),o=n.length?n:r;return{entity:o.find(c=>c.endsWith("_next_up"))??o[0]??""}}setConfig(e){if(!e||typeof e!="object")throw new Error("Invalid configuration");let s=this._config,n=Object.fromEntries(Object.entries(e).filter(([,r])=>r!=null));this._config=e,this._cfg={...Z,...n},this._disc=void 0,s&&s.streak_style!==e.streak_style?(Tt(void 0),this._streakStyle=void 0):s||(this._streakStyle=rs())}getCardSize(){if(!this._cfg)return 8;let e=this._cfg,s=1;return e.show_hero&&(s+=3),e.show_library&&e.layout==="full"?s+=4:e.show_streak&&(s+=3),e.show_watch_time&&e.layout==="full"&&(s+=2),e.show_next_up&&(s+=2),e.show_queue&&e.layout==="full"&&(s+=1+Math.min(e.queue_length,5)),s}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}shouldUpdate(e){if(!this._config||!this.hass)return!1;if([...e.keys()].some(r=>r!=="hass"))return!0;let n=e.get("hass");if(!n||n.locale!==this.hass.locale||n.entities!==this.hass.entities||n.devices!==this.hass.devices)return!0;for(let r of Object.values(this._discovery().entities))if(n.states[r]!==this.hass.states[r])return!0;return!1}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._actionTimer)}_discovery(){let e=this.hass,s=this._config;return(!this._disc||!this._discFor||this._discFor.config!==s||this._discFor.entities!==e.entities||this._discFor.devices!==e.devices||Object.keys(this._disc.entities).length===0)&&(this._disc=gt(e,s),this._discFor={config:s,entities:e.entities,devices:e.devices}),this._disc}render(){if(!this._config||!this.hass)return u;let e=this._cfg;if(!e.entity&&!e.device_id&&!e.entities)return this._message(d(this.hass,"empty.no_entity"));let s=this._discovery(),n=St(this.hass,s,e);if(!n.found)return this._message(d(this.hass,"empty.not_found",{entity:e.entity??e.device_id??""}));let r=e.layout==="compact",o=!r&&e.show_library?this._library(n):u,a=e.show_streak&&n.streak?this._streak(n):u;return h`<ha-card style=${ot(this._colorVars())}>
      ${this._header(n)} ${e.show_hero?this._hero(n):u}
      ${o===u&&a===u?u:h`<div class="grid">${o}${a}</div>`}
      ${!r&&e.show_watch_time?this._watchTime(n):u} ${e.show_next_up?this._next(n):u}
      ${!r&&e.show_queue?this._queue(n):u}
    </ha-card>`}_message(e){return h`<ha-card><div class="empty" style="padding:16px">${e}</div></ha-card>`}_colorVars(){let e=this._cfg,s={};return e.color_movies&&(s["--refract-color-movies"]=e.color_movies),e.color_shows&&(s["--refract-color-shows"]=e.color_shows),e.color_anime&&(s["--refract-color-anime"]=e.color_anime),e.color_accent&&(s["--refract-color-accent"]=e.color_accent),s}_header(e){let s=e.last,n=s?.season!==void 0&&s?.episode!==void 0?` S${s.season} E${s.episode}`:"";return h`<div class="header">
      <div class="brand">
        <ha-icon icon="mdi:chart-donut"></ha-icon>
        <span class="name">${e.accountMain}</span>
        ${e.accountSub?h`<span class="sub">${e.accountSub}</span>`:u}
      </div>
      ${s?h`<span class="last" title="${d(this.hass,"header.last_watched")}">
            ${s.title?h`${s.title}${n} · `:u}<ha-relative-time
              .hass=${this.hass}
              .datetime=${s.iso}
            ></ha-relative-time>
          </span>`:u}
    </div>`}_hero(e){let s=$(this.hass),n=this._cfg,r=e.minutes.total,a=[[d(this.hass,"hero.library"),e.library.total],[d(this.hass,"hero.movies_seen"),e.moviesWatched],[d(this.hass,"hero.episodes"),e.episodesWatched]].filter(([,l])=>l!==void 0);if(r===void 0&&a.length===0)return u;let c=n.fun_stat&&r!==void 0?wt(this.hass,r,n.fun_stat_mode):void 0;return h`<div>
      <div class="hero">
        ${r!==void 0?h`<div class="hero-main">
              <div class="label">${d(this.hass,"hero.total")}</div>
              <div class="big">
                ${Pe(r,n.duration_format,s).map((l,p)=>h`<span class="part"
                        ><span class="num ${p>0?"second":""}">${l.value}</span>
                        <span class="unit">${d(this.hass,l.unit)}</span></span
                      >
                    `)}
              </div>
            </div>`:u}
        ${a.length?h`<div class="tiles">
              ${a.map(([l,p])=>h`<div class="tile">
                    <div class="label">${l}</div>
                    <div class="value">${_(p,s)}</div>
                  </div>`)}
            </div>`:u}
      </div>
      ${c?h`<div class="fun"><ha-icon icon="mdi:shimmer"></ha-icon><span>${c}</span></div>`:u}
    </div>`}_library(e){let s=$(this.hass),n=e.library,r=[{key:"library.movies",value:n.movies,color:"var(--c-movies)"},{key:"library.shows",value:n.shows,color:"var(--c-shows)"},{key:"library.anime",value:n.anime,color:"var(--c-anime)"}].filter(l=>l.value!==void 0),o=[["status.completed",n.completed,"var(--c-completed)"],["status.up_to_date",n.upToDate,"var(--c-up-to-date)"],["status.watchlist",n.watchlist,"var(--c-watchlist)"],["status.in_progress",n.inProgress,"var(--c-in-progress)"],["status.other",n.other&&n.other>0?n.other:void 0,"var(--track)"]].filter(([,l])=>l!==void 0);if(!r.length&&!o.length)return u;let a=n.total??r.reduce((l,p)=>l+p.value,0),c=r.map(l=>`${d(this.hass,l.key)} ${_(l.value,s)}`).join(", ");return h`<div class="panel library">
      <div class="label" style="margin-bottom:8px">${d(this.hass,"library.title")}</div>
      ${r.length?h`<div class="donut-row">
            ${lt(r.map(l=>({value:l.value,color:l.color})),_(a,s),d(this.hass,"library.titles"),c)}
            <div class="legend">
              ${r.map(l=>h`<span
                    ><span class="swatch" style="background:${l.color}"></span>${d(this.hass,l.key)}
                    ${_(l.value,s)}</span
                  >`)}
            </div>
          </div>`:u}
      ${o.length?h`<div class="status-bar" role="img" aria-label=${o.map(([l,p])=>`${d(this.hass,l)} ${p}`).join(", ")}>
              ${o.map(([,l,p])=>h`<span style="flex:${l} 1 0; background:${p}"></span>`)}
            </div>
            <div class="status-legend">
              ${o.map(([l,p,f])=>h`<span
                    ><span class="swatch sm" style="background:${f}"></span>${d(this.hass,l)}
                    ${_(p,s)}</span
                  >`)}
            </div>`:u}
    </div>`}_setStreakStyle(e){this._streakStyle=e,Tt(e)}_streak(e){let s=this._cfg,n=$(this.hass),r=e.streak,o=this._streakStyle??s.streak_style,a=d(this.hass,r.current===1?"unit.day":"unit.days"),c=s.show_streak_toggle?h`<div class="seg">
          <button
            aria-label=${d(this.hass,"streak.gauge")}
            aria-pressed=${o==="gauge"}
            @click=${()=>this._setStreakStyle("gauge")}
          >
            <ha-icon icon="mdi:gauge"></ha-icon>
          </button>
          <button
            aria-label=${d(this.hass,"streak.dots")}
            aria-pressed=${o==="dots"}
            @click=${()=>this._setStreakStyle("dots")}
          >
            <ha-icon icon="mdi:dots-horizontal"></ha-icon>
          </button>
        </div>`:u,l;if(o==="dots"){let p=this.hass.locale?.time_zone==="server"?this.hass.config?.time_zone:void 0,f=$t({now:new Date,lastWatchedIso:e.last?.iso,current:r.current,timeZone:p,lang:n}),g=r.current===0?d(this.hass,"streak.none"):[d(this.hass,"streak.best",{n:r.longest}),f.stillTimeToday?d(this.hass,"streak.still_time"):""].filter(Boolean).join(" \xB7 ");l=h`<div class="dots-wrap">
        <div class="dots" role="img" aria-label="${r.current} ${a}">
          ${f.days.map(m=>h`<div class="dot-col ${m.today?"today":""}">
                <span class="dot ${m.filled?"filled":"open"} ${m.today?"today":""}"></span>${m.label}
              </div>`)}
        </div>
        <div class="dots-count">${r.current} ${a}</div>
        <div class="streak-foot">${g}</div>
      </div>`}else{let p=r.current>0&&r.current>=r.longest;l=h`<div style="display:flex;flex-direction:column;align-items:center">
        ${dt(r.current,r.longest,String(r.current),a,`${r.current} / ${r.longest} ${a}`)}
        <div class="streak-foot">
          ${p?d(this.hass,"streak.record"):d(this.hass,"streak.longest",{n:r.longest,unit:d(this.hass,r.longest===1?"unit.day":"unit.days")})}
        </div>
      </div>`}return h`<div class="panel streak">
      <div class="panel-head" style="margin-bottom:0">
        <span class="label">${d(this.hass,"streak.title")}</span>${c}
      </div>
      ${l}
    </div>`}_watchTime(e){let s=$(this.hass),n=this._cfg.duration_format,r=[{key:"library.shows",minutes:e.minutes.shows,color:"var(--c-shows)"},{key:"library.movies",minutes:e.minutes.movies,color:"var(--c-movies)"},{key:"library.anime",minutes:e.minutes.anime,color:"var(--c-anime)"}].filter(a=>a.minutes!==void 0);if(!r.length)return u;let o=xt(r.map(a=>a.minutes));return h`<div class="panel">
      <div class="label" style="margin-bottom:8px">${d(this.hass,"watch.title")}</div>
      <div class="stack" role="img" aria-label=${r.map((a,c)=>`${d(this.hass,a.key)} ${o[c]}%`).join(", ")}>
        ${r.map(a=>h`<span style="flex:${Math.max(a.minutes,0)} 1 0; background:${a.color}"></span>`)}
      </div>
      <div class="watch-cols">
        ${r.map((a,c)=>h`<div class="watch-col">
              <div class="row"><span class="swatch" style="background:${a.color}"></span>${d(this.hass,a.key)}</div>
              <div class="value">${bt(a.minutes,n,s)}</div>
              <div class="label">${o[c]}%</div>
            </div>`)}
      </div>
    </div>`}_next(e){if(e.next.kind==="hidden")return u;if(e.next.kind==="empty")return h`<div class="panel next">
        <div class="label">${d(this.hass,"next.title")}</div>
        <div class="empty">${d(this.hass,"empty.nothing_up_next")}</div>
      </div>`;let s=e.next.item,n=$(this.hass),o=[s.season!==void 0&&s.number!==void 0?`S${s.season} E${s.number}`:"",s.episodeName].filter(Boolean).join(" \xB7 "),a=s.airedEpisodes,c=a!==void 0&&s.remaining!==void 0?Math.max(0,a-s.remaining):void 0,l=a&&c!==void 0?Math.min(100,c/a*100):void 0;return h`<div class="panel next">
      <div class="label">${d(this.hass,"next.title")}</div>
      <div class="next-main">
        <div>
          <div class="next-title">
            <span>${s.title}</span>
            ${s.year?h`<span class="year">${s.year}</span>`:u}
            ${s.isAnime?h`<span class="badge">${d(this.hass,"badge.anime")}</span>`:u}
            ${this._badge(s)}
          </div>
          ${o?h`<div class="next-ep">${o}</div>`:u}
        </div>
        ${this._actionButton(s)}
      </div>
      ${l!==void 0?h`<div class="progress" role="img" aria-label="${c} / ${a}"><span style="width:${l}%"></span></div>
            <div class="next-foot">
              <span>${d(this.hass,"next.progress",{watched:_(c,n),aired:_(a,n)})}</span>
              ${s.remaining!==void 0?h`<span>${d(this.hass,"next.remaining",{n:_(s.remaining,n)})}</span>`:u}
            </div>`:u}
    </div>`}_badge(e){return e.aired?e.premiere?h`<span class="badge accent">${d(this.hass,"badge.premiere")}</span>`:e.finale?h`<span class="badge warn">${d(this.hass,"badge.finale")}</span>`:e.midFinale?h`<span class="badge warn">${d(this.hass,"badge.mid_finale")}</span>`:u:h`<span class="badge">${d(this.hass,"badge.not_aired")}</span>`}_canMarkWatched(e){return this._cfg.show_actions&&!!this.hass.services?.[E]?.mark_episode_watched&&e.aired&&e.season!==void 0&&e.number!==void 0&&(e.tmdbId!==void 0||!!e.refractId)}_actionButton(e){if(!this._canMarkWatched(e))return u;let s=this._actionState,n={idle:"mdi:check",confirm:"mdi:help-circle-outline",busy:"mdi:loading",done:"mdi:check-circle",error:"mdi:alert-circle-outline"}[s],r={idle:"next.mark",confirm:"next.confirm",busy:"next.busy",done:"next.done",error:"next.error"}[s];return h`<button class="action" data-state=${s} title=${this._actionError} @click=${()=>this._markWatched(e)}>
      <ha-icon icon=${n}></ha-icon>${d(this.hass,r)}
    </button>`}_resetActionLater(e){window.clearTimeout(this._actionTimer),this._actionTimer=window.setTimeout(()=>{this._actionState="idle",this._actionError=""},e)}async _configEntryId(){if(this._cfg.config_entry_id)return this._cfg.config_entry_id;let e=this._discovery().entities.next_up??this._cfg.entity;if(e)try{return(await this.hass.callWS({type:"config/entity_registry/get",entity_id:e}))?.config_entry_id}catch{return}}async _markWatched(e){if(this._actionState!=="busy"){if(this._cfg.confirm_actions&&this._actionState!=="confirm"){this._actionState="confirm",this._resetActionLater(3e3);return}window.clearTimeout(this._actionTimer),this._actionState="busy";try{let s={season:e.season,number:e.number};e.tmdbId!==void 0?s.tmdb_id=e.tmdbId:s.refract_id=e.refractId;let n=await this._configEntryId();n&&(s.config_entry_id=n),await this.hass.callService(E,"mark_episode_watched",s),this._actionState="done",this._resetActionLater(2500),this._refreshSensors()}catch(s){this._actionError=s instanceof Error?s.message:String(s),this._actionState="error",this._resetActionLater(4e3)}}}_refreshSensors(){let e=this._discovery().entities,s=[e.next_up,e.shows_waiting,e.last_watched,e.stats_streak_current_days].filter(Boolean);s.length&&this.hass.callService("homeassistant","update_entity",{entity_id:s}).catch(()=>{})}_queue(e){if(!e.queue.length)return u;let s=$(this.hass),n=this._cfg.queue_length,r=e.queue.length>n,o=this._queueExpanded?e.queue:e.queue.slice(0,n),a=e.waiting??e.queue.length;return h`<div class="panel queue">
      <div class="queue-head">
        <span class="label"
          >${d(this.hass,"queue.title")} · ${d(this.hass,"queue.shows",{n:_(a,s)})}</span
        >
        ${r?h`<button class="link" @click=${()=>this._queueExpanded=!this._queueExpanded}>
              ${this._queueExpanded?d(this.hass,"queue.show_less"):d(this.hass,"queue.show_all",{n:_(e.queue.length,s)})}
            </button>`:u}
      </div>
      ${o.map(c=>this._queueRow(c,s))}
    </div>`}_queueRow(e,s){let r=[e.season!==void 0&&e.number!==void 0?`S${e.season} E${e.number}`:"",e.episodeName].filter(Boolean).join(" \xB7 "),o=e.airedEpisodes,a=o!==void 0&&e.remaining!==void 0?Math.max(0,o-e.remaining):void 0,c=o&&a!==void 0?Math.min(100,a/o*100):0,l="";return e.aired?e.premiere?l=h`<span class="badge accent">${d(this.hass,"badge.premiere")}</span>`:e.finale?l=h`<span class="badge warn">${d(this.hass,"badge.finale")}</span>`:e.midFinale?l=h`<span class="badge warn">${d(this.hass,"badge.mid_finale")}</span>`:e.remaining!==void 0&&(l=d(this.hass,"queue.left",{n:_(e.remaining,s)})):l=h`<span class="badge">${d(this.hass,"badge.not_aired")}</span>`,h`<div class="q-row">
      <div class="q-main">
        <div class="q-title">${e.title}</div>
        ${r?h`<div class="q-ep">${r}</div>`:u}
      </div>
      <div class="progress thin"><span style="width:${c}%"></span></div>
      <div class="q-end">${l}</div>
    </div>`}};b.styles=At,y([H({attribute:!1})],b.prototype,"hass",2),y([C()],b.prototype,"_config",2),y([C()],b.prototype,"_streakStyle",2),y([C()],b.prototype,"_queueExpanded",2),y([C()],b.prototype,"_actionState",2),y([C()],b.prototype,"_actionError",2),b=y([oe(Y)],b);var os={entity:"Refract entity",name:"Name (optional)",layout:"Layout",streak_style:"Streak style",show_streak_toggle:"Show streak style switch",duration_format:"Duration format",queue_length:"Queue rows",fun_stat:"Show fun stat",fun_stat_mode:"Fun stat",show_hero:"Watch time summary",show_library:"Library",show_watch_time:"Watch time split",show_streak:"Streak",show_next_up:"Next up",show_queue:"Queue",show_actions:"Show \u201CMark watched\u201D button",confirm_actions:"Ask before marking watched",color_movies:"Movies color",color_shows:"TV shows color",color_anime:"Anime color",color_accent:"Accent color"},as={entity:"Pick any entity of your Refract account. The card finds the rest.",show_actions:"Needs an API key that can mark episodes watched.",color_movies:"Hex color such as #2a78d6. Leave empty for the default."},x=(i,t)=>({value:i,label:t}),ue=i=>({select:{mode:"dropdown",options:i}}),cs=[{name:"entity",required:!0,selector:{entity:{integration:E,domain:"sensor"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"layout",selector:ue([x("full","Full"),x("compact","Compact")])},{name:"streak_style",selector:ue([x("gauge","Gauge"),x("dots","Dots")])},{name:"duration_format",selector:ue([x("days_hours","Days and hours"),x("hours","Hours only"),x("auto","Automatic")])},{name:"queue_length",selector:{number:{min:1,max:20,mode:"box"}}}]},{type:"expandable",name:"",title:"Sections",icon:"mdi:view-dashboard-outline",schema:[{type:"grid",name:"",schema:[{name:"show_hero",selector:{boolean:{}}},{name:"show_library",selector:{boolean:{}}},{name:"show_watch_time",selector:{boolean:{}}},{name:"show_streak",selector:{boolean:{}}},{name:"show_streak_toggle",selector:{boolean:{}}},{name:"show_next_up",selector:{boolean:{}}},{name:"show_queue",selector:{boolean:{}}}]}]},{type:"expandable",name:"",title:"Fun stat",icon:"mdi:shimmer",schema:[{name:"fun_stat",selector:{boolean:{}}},{name:"fun_stat_mode",selector:ue([x("rotate","Rotate daily"),x("months","Months of nonstop viewing"),x("workweeks","Full-time work weeks"),x("lotr","Lord of the Rings marathons")])}]},{type:"expandable",name:"",title:"Next up actions",icon:"mdi:gesture-tap-button",schema:[{name:"show_actions",selector:{boolean:{}}},{name:"confirm_actions",selector:{boolean:{}}}]},{type:"expandable",name:"",title:"Colors",icon:"mdi:palette-outline",schema:[{type:"grid",name:"",schema:[{name:"color_movies",selector:{text:{}}},{name:"color_shows",selector:{text:{}}},{name:"color_anime",selector:{text:{}}},{name:"color_accent",selector:{text:{}}}]}]}],N=class extends w{setConfig(t){this._config=t}render(){if(!this.hass||!this._config)return u;let t={...Z,...this._config},e=!!this._config.show_actions&&!this.hass.services?.[E]?.mark_episode_watched;return h`<div class="wrap">
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${cs}
        .computeLabel=${s=>os[s.name]??s.name}
        .computeHelper=${s=>as[s.name]}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${e?h`<ha-alert alert-type="warning">
            The button stays hidden until the <code>refract.mark_episode_watched</code> action is available. Check
            that your Refract API key allows marking episodes and movies as watched.
          </ha-alert>`:u}
    </div>`}_valueChanged(t){if(t.stopPropagation(),!this._config)return;let e=t.detail.value,s=Z,n={type:this._config.type};for(let[o,a]of Object.entries(e))a===""||a===void 0||a===null||o in s&&a===s[o]||(n[o]=a);let r=this._config;for(let o of["device_id","config_entry_id","entities"])r[o]!==void 0&&n[o]===void 0&&(n[o]=r[o]);this._config=n,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0}))}};N.styles=Et,y([H({attribute:!1})],N.prototype,"hass",2),y([C()],N.prototype,"_config",2),N=y([oe(ce)],N);window.customCards=window.customCards||[];window.customCards.some(i=>i.type===Y)||window.customCards.push({type:Y,name:d(void 0,"card.name"),description:d(void 0,"card.description"),preview:!0,documentationURL:ut});console.info(`%c REFRACT-STATS-CARD %c v${ht} `,"color:white;background:#6250d6;font-weight:500;border-radius:3px 0 0 3px","color:#6250d6;background:#eee;font-weight:500;border-radius:0 3px 3px 0");
