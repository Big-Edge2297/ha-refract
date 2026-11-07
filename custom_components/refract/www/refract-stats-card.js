var zt=Object.defineProperty;var Ft=Object.getOwnPropertyDescriptor;var $=(i,t,e,s)=>{for(var n=s>1?void 0:s?Ft(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&zt(t,e,n),n};var oe=globalThis,ae=oe.ShadowRoot&&(oe.ShadyCSS===void 0||oe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xe=Symbol(),Ze=new WeakMap,V=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==xe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(ae&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Ze.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ze.set(e,t))}return t}toString(){return this.cssText}},Ge=i=>new V(typeof i=="string"?i:i+"",void 0,xe),ce=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,n,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[r+1],i[0]);return new V(e,i,xe)},Je=(i,t)=>{if(ae)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),n=oe.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},$e=ae?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Ge(e)})(i):i;var{is:Wt,defineProperty:jt,getOwnPropertyDescriptor:qt,getOwnPropertyNames:Bt,getOwnPropertySymbols:Kt,getPrototypeOf:Vt}=Object,de=globalThis,Xe=de.trustedTypes,Yt=Xe?Xe.emptyScript:"",Zt=de.reactiveElementPolyfillSupport,Y=(i,t)=>i,Z={toAttribute(i,t){switch(t){case Boolean:i=i?Yt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},le=(i,t)=>!Wt(i,t),Qe={attribute:!0,type:String,converter:Z,reflect:!1,useDefault:!1,hasChanged:le};Symbol.metadata??=Symbol("metadata"),de.litPropertyMetadata??=new WeakMap;var T=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Qe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&jt(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){let{get:n,set:r}=qt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){let a=n?.call(this);r?.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Qe}static _$Ei(){if(this.hasOwnProperty(Y("elementProperties")))return;let t=Vt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Y("properties"))){let e=this.properties,s=[...Bt(e),...Kt(e)];for(let n of s)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let n of s)e.unshift($e(n))}else t!==void 0&&e.push($e(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Je(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:Z).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let r=s.getPropertyOptions(n),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Z;this._$Em=n;let a=o.fromAttribute(e,r.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(t,e,s,n=!1,r){if(t!==void 0){let o=this.constructor;if(n===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??le)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,r]of s){let{wrapped:o}=r,a=this[n];o!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[Y("elementProperties")]=new Map,T[Y("finalized")]=new Map,Zt?.({ReactiveElement:T}),(de.reactiveElementVersions??=[]).push("2.1.2");var Re=globalThis,et=i=>i,he=Re.trustedTypes,tt=he?he.createPolicy("lit-html",{createHTML:i=>i}):void 0,at="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,ct="?"+O,Gt=`<${ct}>`,L=document,J=()=>L.createComment(""),X=i=>i===null||typeof i!="object"&&typeof i!="function",Me=Array.isArray,Jt=i=>Me(i)||typeof i?.[Symbol.iterator]=="function",ke=`[ 	
\f\r]`,G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,st=/-->/g,nt=/>/g,I=RegExp(`>|${ke}(?:([^\\s"'>=/]+)(${ke}*=${ke}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),it=/'/g,rt=/"/g,dt=/^(?:script|style|textarea|title)$/i,Pe=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),p=Pe(1),ys=Pe(2),vs=Pe(3),R=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),ot=new WeakMap,U=L.createTreeWalker(L,129);function lt(i,t){if(!Me(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return tt!==void 0?tt.createHTML(t):t}var Xt=(i,t)=>{let e=i.length-1,s=[],n,r=t===2?"<svg>":t===3?"<math>":"",o=G;for(let a=0;a<e;a++){let c=i[a],l,m,u=-1,g=0;for(;g<c.length&&(o.lastIndex=g,m=o.exec(c),m!==null);)g=o.lastIndex,o===G?m[1]==="!--"?o=st:m[1]!==void 0?o=nt:m[2]!==void 0?(dt.test(m[2])&&(n=RegExp("</"+m[2],"g")),o=I):m[3]!==void 0&&(o=I):o===I?m[0]===">"?(o=n??G,u=-1):m[1]===void 0?u=-2:(u=o.lastIndex-m[2].length,l=m[1],o=m[3]===void 0?I:m[3]==='"'?rt:it):o===rt||o===it?o=I:o===st||o===nt?o=G:(o=I,n=void 0);let v=o===I&&i[a+1].startsWith("/>")?" ":"";r+=o===G?c+Gt:u>=0?(s.push(l),c.slice(0,u)+at+c.slice(u)+O+v):c+O+(u===-2?a:v)}return[lt(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},Q=class i{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let r=0,o=0,a=t.length-1,c=this.parts,[l,m]=Xt(t,e);if(this.el=i.createElement(l,s),U.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(n=U.nextNode())!==null&&c.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(let u of n.getAttributeNames())if(u.endsWith(at)){let g=m[o++],v=n.getAttribute(u).split(O),k=/([.?@])?(.*)/.exec(g);c.push({type:1,index:r,name:k[2],strings:v,ctor:k[1]==="."?Se:k[1]==="?"?Ee:k[1]==="@"?Ce:j}),n.removeAttribute(u)}else u.startsWith(O)&&(c.push({type:6,index:r}),n.removeAttribute(u));if(dt.test(n.tagName)){let u=n.textContent.split(O),g=u.length-1;if(g>0){n.textContent=he?he.emptyScript:"";for(let v=0;v<g;v++)n.append(u[v],J()),U.nextNode(),c.push({type:2,index:++r});n.append(u[g],J())}}}else if(n.nodeType===8)if(n.data===ct)c.push({type:2,index:r});else{let u=-1;for(;(u=n.data.indexOf(O,u+1))!==-1;)c.push({type:7,index:r}),u+=O.length-1}r++}}static createElement(t,e){let s=L.createElement("template");return s.innerHTML=t,s}};function W(i,t,e=i,s){if(t===R)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl,r=X(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=n:e._$Cl=n),n!==void 0&&(t=W(i,n._$AS(i,t.values),n,s)),t}var Ae=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??L).importNode(e,!0);U.currentNode=n;let r=U.nextNode(),o=0,a=0,c=s[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new ee(r,r.nextSibling,this,t):c.type===1?l=new c.ctor(r,c.name,c.strings,this,t):c.type===6&&(l=new Te(r,this,t)),this._$AV.push(l),c=s[++a]}o!==c?.index&&(r=U.nextNode(),o++)}return U.currentNode=L,n}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},ee=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),X(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==R&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Jt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&X(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Q.createElement(lt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{let r=new Ae(n,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=ot.get(t.strings);return e===void 0&&ot.set(t.strings,e=new Q(t)),e}k(t){Me(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,n=0;for(let r of t)n===e.length?e.push(s=new i(this.O(J()),this.O(J()),this,this.options)):s=e[n],s._$AI(r),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=et(t).nextSibling;et(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,n){let r=this.strings,o=!1;if(r===void 0)t=W(this,t,e,0),o=!X(t)||t!==this._$AH&&t!==R,o&&(this._$AH=t);else{let a=t,c,l;for(t=r[0],c=0;c<r.length-1;c++)l=W(this,a[s+c],e,c),l===R&&(l=this._$AH[c]),o||=!X(l)||l!==this._$AH[c],l===d?t=d:t!==d&&(t+=(l??"")+r[c+1]),this._$AH[c]=l}o&&!n&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Se=class extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},Ee=class extends j{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},Ce=class extends j{constructor(t,e,s,n,r){super(t,e,s,n,r),this.type=5}_$AI(t,e=this){if((t=W(this,t,e,0)??d)===R)return;let s=this._$AH,n=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==d&&(s===d||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Te=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}};var Qt=Re.litHtmlPolyfillSupport;Qt?.(Q,ee),(Re.litHtmlVersions??=[]).push("3.3.3");var ht=(i,t,e)=>{let s=e?.renderBefore??t,n=s._$litPart$;if(n===void 0){let r=e?.renderBefore??null;s._$litPart$=n=new ee(t.insertBefore(J(),r),r,void 0,e??{})}return n._$AI(i),n};var De=globalThis,E=class extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ht(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}};E._$litElement$=!0,E.finalized=!0,De.litElementHydrateSupport?.({LitElement:E});var es=De.litElementPolyfillSupport;es?.({LitElement:E});(De.litElementVersions??=[]).push("4.2.2");var ts={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:le},ss=(i=ts,t,e)=>{let{kind:s,metadata:n}=e,r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),r.set(e.name,i),s==="accessor"){let{name:o}=e;return{set(a){let c=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,c,i,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,i,a),a}}}if(s==="setter"){let{name:o}=e;return function(a){let c=this[o];t.call(this,a),this.requestUpdate(o,c,i,!0,a)}}throw Error("Unsupported decorator location: "+s)};function q(i){return(t,e)=>typeof e=="object"?ss(i,t,e):((s,n,r)=>{let o=n.hasOwnProperty(r);return n.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(n,r):void 0})(i,t,e)}function N(i){return q({...i,state:!0,attribute:!1})}var ue=i=>t=>{if(customElements.get(i)){console.warn(`[refract-stats-card] <${i}> is already registered, probably by the standalone HACS card. Remove that copy to use the card that ships with the Refract integration.`);return}customElements.define(i,t)};var pt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ut=i=>(...t)=>({_$litDirective$:i,values:t}),me=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var mt="important",ns=" !"+mt,ft=ut(class extends me{constructor(i){if(super(i),i.type!==pt.ATTRIBUTE||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let n=t[s];if(n!=null){this.ft.add(s);let r=typeof n=="string"&&n.endsWith(ns);s.includes("-")||r?e.setProperty(s,r?n.slice(0,-11):n,r?mt:""):e[s]=n}}return R}});var te="refract-stats-card",fe="refract-stats-card-editor",M="refract",gt="https://github.com/Big-Edge2297/ha-refract/blob/main/docs/dashboard-card.md",_t="0.3.6",ge=["library_total","completed","in_progress","watchlist","up_to_date","movies","tv_shows","anime","last_watched","shows_waiting","next_up","username","catch_up","last_7_days","average_per_week","airing_this_week","stats_anime_episodes_watched","stats_anime_titles","stats_movies_watched","stats_shows_episodes_watched","stats_shows_titles","stats_streak_current_days","stats_streak_longest_days","stats_watch_time_anime_minutes","stats_watch_time_movies_minutes","stats_watch_time_shows_minutes","stats_watch_time_total_minutes"];var is=[...ge].sort((i,t)=>t.length-i.length),yt=new Set(ge);function vt(i){for(let t of is){if(i===t)return{key:t,prefix:""};if(i.endsWith(`_${t}`))return{key:t,prefix:i.slice(0,i.length-t.length)}}}var bt=i=>i.slice(i.indexOf(".")+1);function wt(i,t){let e={entities:{}},s=i.entities,n=t.entity;if(e.deviceId=t.device_id,n&&s?.[n]?.device_id&&(e.deviceId=s[n].device_id),e.deviceId&&s)for(let[r,o]of Object.entries(s)){if(o.device_id!==e.deviceId||!r.startsWith("sensor.")||o.platform&&o.platform!==M)continue;let a=o.translation_key&&yt.has(o.translation_key)?o.translation_key:void 0,c=a?{key:a,prefix:void 0}:vt(bt(r));c&&(e.entities[c.key]||(e.entities[c.key]=r),e.prefix===void 0&&c.prefix!==void 0&&(e.prefix=c.prefix))}if(n){let r=vt(bt(n));if(r){e.prefix??=r.prefix;for(let o of ge){let a=`sensor.${r.prefix}${o}`;!e.entities[o]&&i.states[a]&&(e.entities[o]=a)}}}for(let[r,o]of Object.entries(t.entities??{}))yt.has(r)&&typeof o=="string"&&(e.entities[r]=o);return e}function xt(i){if(!i)return{main:"Refract"};let t=i.match(/^(.*?)\s*\(([^)]*)\)\s*$/);return t&&t[1]?{main:t[1],sub:t[2]||void 0}:{main:i}}function $t(i,t){let e=t.deviceId?i.devices?.[t.deviceId]:void 0,s=e?.name_by_user||e?.name;if(s)return s;for(let n of Object.values(t.entities)){let o=i.states[n]?.attributes?.friendly_name?.match(/^(.*?\([^)]*\))/);if(o)return o[1]}}var Oe={"card.name":"Refract stats","card.description":"Watch time, library, streak and what to watch next from your Refract account.","empty.no_entity":"Choose a Refract entity to get started.","empty.not_found":"Couldn't find any Refract entities for {entity}.","empty.nothing_up_next":"Nothing up next. Add a show or mark an episode watched.","hero.total":"Total watch time","hero.library":"Library","hero.movies_seen":"Movies seen","hero.episodes":"Episodes watched","unit.days":"days","unit.day":"day","unit.hours":"hours","unit.hour":"hour","unit.min":"min","unit.h":"h","header.last_watched":"Last watched","library.title":"Library","library.titles":"titles","library.movies":"Movies","library.shows":"TV shows","library.anime":"Anime","status.completed":"Completed","status.up_to_date":"Up to date","status.watchlist":"Watchlist","status.in_progress":"In progress","status.on_hold":"On hold","status.dropped":"Dropped","status.other":"Other","watch.title":"Watch time","streak.title":"Streak","streak.longest":"Longest: {n} {unit}","streak.best":"Best {n}","streak.still_time":"still time today","streak.none":"No active streak","next.title":"Next up","next.progress":"{watched} of {aired} aired episodes","next.remaining":"{n} remaining","next.mark":"Mark watched","next.confirm":"Mark watched?","next.busy":"Marking\u2026","next.done":"Marked","next.error":"Couldn't mark watched","avg.title":"Average per week","avg.vs_previous":"vs previous 4 weeks","avg.estimated":"Estimated from your average runtime","avg.items_unit":"a week","avg.items_line":"{n} episodes and movies a week","avg.items_line_one":"1 episode or movie a week","days7.title":"Last 7 days","days7.busiest":"Busiest day \xB7 {day}","days7.episodes":"Episodes","days7.movies":"Movies","days7.none":"Nothing watched in the last 7 days","catchup.title":"Catch-up backlog","catchup.ready":"Ready now","catchup.waiting":"aired episodes waiting","catchup.about":"about {time}","catchup.none":"You're all caught up","catchup.show_all":"Show all {n}","catchup.show_less":"Show less","airing.title":"Airing this week","airing.today":"Today","airing.none":"Nothing airing in the next 7 days","airing.show_all":"Show all {n}","airing.show_less":"Show less","badge.premiere":"Premiere","badge.finale":"Finale","badge.mid_finale":"Mid-season finale","badge.not_aired":"Not aired","badge.anime":"Anime","fun.months":"That's about {n} months of nonstop viewing","fun.years":"That's about {n} years of nonstop viewing","fun.days":"That's about {n} days of nonstop viewing","fun.workweeks":"That's about {n} full-time work weeks","fun.lotr":"Enough for the extended Lord of the Rings trilogy about {n} times"},rs={en:Oe};function x(i){return i?.locale?.language||i?.language||"en"}function h(i,t,e={}){let s=x(i).split("-")[0],r=(rs[s]??Oe)[t]??Oe[t]??t;for(let[o,a]of Object.entries(e))r=r.replace(`{${o}}`,String(a));return r}var Ie=864e5;function _e(i){if(!i)return;let t=i.state;if(t==="unknown"||t==="unavailable"||t===""||t==null)return;let e=Number(t);return Number.isFinite(e)?e:void 0}function ye(i){return!!i&&i.state!=="unavailable"&&i.state!=="unknown"}function _(i,t="en",e=0){try{return new Intl.NumberFormat(t,{maximumFractionDigits:e}).format(i)}catch{return String(Math.round(i))}}var A=(i,t,e)=>{let s=_(i,e);return t==="d"?{value:s,unit:i===1?"unit.day":"unit.days",short:"d"}:t==="h"?{value:s,unit:i===1?"unit.hour":"unit.hours",short:"h"}:{value:s,unit:"unit.min",short:"min"}};function Ue(i,t="days_hours",e="en"){let s=Math.max(0,Math.round(i)),n=Math.floor(s/1440),r=Math.floor(s%1440/60),o=s%60;if(t==="hours"){let a=Math.floor(s/60);return a>0?[A(a,"h",e)]:[A(o,"min",e)]}return t==="auto"?n>=1?[A(n,"d",e),A(r,"h",e)]:r>=1?[A(r,"h",e),A(o,"min",e)]:[A(o,"min",e)]:n>=1?[A(n,"d",e),A(r,"h",e)]:r>=1?[A(r,"h",e)]:[A(o,"min",e)]}function Le(i,t="days_hours",e="en"){return Ue(i,t,e).map(s=>`${s.value} ${s.short}`).join(" ")}function At(i){let t=i.reduce((o,a)=>o+a,0);if(t<=0)return i.map(()=>0);let e=i.map(o=>o/t*100),s=e.map(Math.floor),n=100-s.reduce((o,a)=>o+a,0),r=e.map((o,a)=>({i:a,frac:o-Math.floor(o)})).sort((o,a)=>a.frac-o.frac);for(let{i:o}of r){if(n<=0)break;s[o]+=1,n-=1}return s}var os=726;function Ne(i,t,e){let s=x(i),n=e/1440;switch(t){case"months":{if(n<1)return;if(n<30)return h(i,"fun.days",{n:_(n,s)});let r=n/30.4375;return r<24?h(i,"fun.months",{n:_(r,s,1)}):h(i,"fun.years",{n:_(r/12,s,1)})}case"workweeks":{let r=e/60/40;return r>=2?h(i,"fun.workweeks",{n:_(r,s)}):void 0}case"lotr":{let r=e/os;return r>=2?h(i,"fun.lotr",{n:_(r,s)}):void 0}}}function St(i,t,e="rotate",s=Date.now()){if(!(t>=1440))return;if(e!=="rotate")return Ne(i,e,t);let r=["months","workweeks","lotr"].filter(a=>Ne(i,a,t));if(!r.length)return;let o=r[Math.floor(s/Ie)%r.length];return Ne(i,o,t)}function kt(i,t){let e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(i),s=n=>Number(e.find(r=>r.type===n)?.value);return Math.round(Date.UTC(s("year"),s("month")-1,s("day"))/Ie)}function Et(i){let{now:t,lastWatchedIso:e,current:s,timeZone:n,lang:r="en"}=i,o=kt(t,n),a=e?new Date(e):void 0,c=a&&!isNaN(a.getTime())?kt(a,n):void 0,l=new Intl.DateTimeFormat(r,{weekday:"narrow",timeZone:"UTC"}),m=[];for(let g=6;g>=0;g--){let v=o-g,k=c!==void 0&&s>0&&v<=c&&v>c-s;m.push({label:l.format(new Date(v*Ie)),filled:k,today:g===0})}let u=m[6].filled;return{days:m,todayFilled:u,stillTimeToday:!u&&s>0&&c===o-1}}function He(i,t){let e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(i),s=n=>e.find(r=>r.type===n)?.value??"";return`${s("year")}-${s("month")}-${s("day")}`}function ve(i,t,e){return new Intl.DateTimeFormat(t,{weekday:e,timeZone:"UTC"}).format(new Date(`${i}T00:00:00Z`))}function Ct(i,t,e,s){let n=new Date(i);if(!Number.isNaN(n.getTime()))try{return new Intl.DateTimeFormat(t,{hour:"numeric",minute:"2-digit",timeZone:e,hour12:s}).format(n)}catch{return}}var y=i=>typeof i=="number"&&Number.isFinite(i)?i:void 0,be=i=>{let t=i.filter(e=>e!==void 0);return t.length?t.reduce((e,s)=>e+s,0):void 0};function as(i,t){let e=i?.show??{},s=e.title??t;if(!s)return;let n=i?.next_episode??{};return{title:s,year:y(e.year),isAnime:!!e.is_anime,status:typeof i?.status=="string"?i.status:void 0,season:y(n.season),number:y(n.number),episodeName:typeof n.name=="string"?n.name:void 0,aired:n.aired!==!1,premiere:!!n.is_season_premiere,finale:!!n.is_season_finale,midFinale:!!n.is_mid_season_finale,airedEpisodes:y(i?.aired_episodes),remaining:y(i?.remaining_episodes),refractId:typeof e.ids?.refract=="string"?e.ids.refract:void 0,tmdbId:y(e.ids?.tmdb),posterUrl:typeof i?.poster_url=="string"&&i.poster_url?i.poster_url:void 0}}var Tt=["completed","up_to_date","in_progress","planned","on_hold","dropped"],cs={watchlist:"planned",paused:"on_hold",onhold:"on_hold",abandoned:"dropped"};function ds(i){if(!i||typeof i!="object"||Array.isArray(i))return;let t=new Map;for(let[s,n]of Object.entries(i)){let r=y(n);if(r===void 0||r<=0)continue;let o=s.trim().toLowerCase().replace(/[\s-]+/g,"_"),a=cs[o]??o;t.set(a,(t.get(a)??0)+r)}if(!t.size)return;let e=s=>{let n=Tt.indexOf(s);return n===-1?Tt.length:n};return[...t.entries()].map(([s,n])=>({key:s,count:n})).sort((s,n)=>e(s.key)-e(n.key)||s.key.localeCompare(n.key))}function Rt(i,t,e){let s=b=>{let f=t.entities[b];return f?i.states[f]:void 0},n=b=>_e(s(b)),r=Object.keys(t.entities).length>0,o=xt(e.name??$t(i,t)),a=n("movies"),c=n("tv_shows"),l=n("anime"),m=n("library_total")??be([a,c,l]),u=n("completed"),g=n("in_progress"),v=n("up_to_date"),k=n("watchlist"),Fe=be([u,g,v,k]),Dt=m!==void 0&&Fe!==void 0?Math.max(0,m-Fe):void 0,Ot=ds(s("library_total")?.attributes?.by_status),We=n("stats_watch_time_shows_minutes"),je=n("stats_watch_time_movies_minutes"),qe=n("stats_watch_time_anime_minutes"),Nt=n("stats_watch_time_total_minutes")??be([We,je,qe]),z=s("last_watched"),It=ye(z)?{iso:z.state,title:typeof z.attributes.title=="string"?z.attributes.title:void 0,season:y(z.attributes.season),episode:y(z.attributes.episode)}:void 0,ne=n("stats_streak_current_days"),Ut=n("stats_streak_longest_days"),B=s("next_up"),ie={kind:"hidden"};if(B&&B.state!=="unavailable"){let b=ye(B)?as(B.attributes,B.state):void 0;ie=b?{kind:"item",item:b}:{kind:"empty"}}let Lt=ie.kind==="item"?ie.item:void 0,Be,re=s("last_7_days");if(ye(re)&&Array.isArray(re.attributes.days)){let b=re.attributes.days.map(f=>({date:String(f?.date??""),episodes:y(f?.episodes)??0,movies:y(f?.movies)??0})).filter(f=>/^\d{4}-\d{2}-\d{2}$/.test(f.date));if(b.length){let f=re.attributes.busiest_day;Be={days:b,episodes:b.reduce((C,w)=>C+w.episodes,0),movies:b.reduce((C,w)=>C+w.movies,0),busiest:typeof f?.date=="string"&&y(f?.count)?{date:f.date,count:f.count}:void 0}}}let Ke,F=s("average_per_week");if(F&&F.state!=="unavailable"){let b=_e(F),f=y(F.attributes.items_per_week);if(b!==void 0||f!==void 0){let C=F.attributes.change_percent;Ke={hours:b,itemsPerWeek:f,changePct:typeof C=="number"?C:null,estimated:F.attributes.estimated!==!1}}}let we,D=s("catch_up");if(D&&D.state!=="unavailable"&&D.state!=="unknown"){let b=_e(D)??0,C=(Array.isArray(D.attributes.shows)?D.attributes.shows:[]).map(w=>{let Ye=y(w?.remaining);if(!(typeof w?.title!="string"||Ye===void 0))return{title:w.title,year:y(w.year),remaining:Ye,isAnime:!!w.is_anime,tmdbId:y(w.tmdb_id),posterUrl:typeof w.poster_url=="string"&&w.poster_url?w.poster_url:void 0}}).filter(w=>!!w);we={total:b,minutes:y(D.attributes.estimated_minutes),showCount:y(D.attributes.show_count)??C.length,shows:C}}let Ve,K=s("airing_this_week");K&&K.state!=="unavailable"&&K.state!=="unknown"&&(Ve=(Array.isArray(K.attributes.episodes)?K.attributes.episodes:[]).map(f=>typeof f?.show=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(String(f?.date))?{date:f.date,show:f.show,season:y(f.season),number:y(f.number),title:typeof f.title=="string"?f.title:void 0,isAnime:!!f.is_anime,premiere:!!f.premiere,finale:!!f.finale,airAt:typeof f.air_at=="string"&&f.air_at?f.air_at:void 0}:void 0).filter(f=>!!f));let Ht=!!Lt?.posterUrl||!!we?.shows.some(b=>b.posterUrl);return{found:r,accountMain:o.main,accountSub:o.sub,last:It,minutes:{total:Nt,shows:We,movies:je,anime:qe},library:{total:m,movies:a,shows:c,anime:l,completed:u,inProgress:g,upToDate:v,watchlist:k,other:Dt,statuses:Ot},moviesWatched:n("stats_movies_watched"),episodesWatched:be([n("stats_shows_episodes_watched"),n("stats_anime_episodes_watched")]),streak:ne!==void 0?{current:ne,longest:Math.max(Ut??ne,ne)}:void 0,next:ie,last7:Be,average:Ke,catchup:we,airing:Ve,hasPosters:Ht}}var Mt=ce`
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
    --c-on-hold: var(--refract-color-on-hold, #8a96a8);
    --c-dropped: var(--refract-color-dropped, #d9534f);
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
  .avg-items {
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .trend {
    font-size: 13px;
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

  /* streak */
  .streak-foot {
    font-size: 12px;
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
  .badge.ok {
    background: color-mix(in srgb, var(--c-completed) 16%, transparent);
    color: var(--c-completed);
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
    height: 84px;
    width: 100%;
    display: flex;
    align-items: flex-end;
  }
  .bar {
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
`,Pt=ce`
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  ha-alert {
    display: block;
  }
`;var se={layout:"full",duration_format:"days_hours",fun_stat:!0,fun_stat_mode:"rotate",queue_length:5,airing_length:5,show_hero:!0,show_watch_time:!0,show_library:!0,show_streak:!0,show_average:!0,show_last_7_days:!0,show_next_up:!0,show_catchup:!0,show_airing:!0,show_posters:!0,show_actions:!1,confirm_actions:!0};var S=class extends E{constructor(){super(...arguments);this._catchupExpanded=!1;this._airingExpanded=!1;this._actionState="idle";this._actionError=""}static async getConfigElement(){return document.createElement(fe)}static getStubConfig(e){let s=e?.entities??{},n=Object.keys(s).filter(c=>c.startsWith("sensor.")&&s[c].platform===M),r=Object.keys(e?.states??{}).filter(c=>c.startsWith("sensor.refract_")),o=n.length?n:r;return{entity:o.find(c=>c.endsWith("_next_up"))??o[0]??""}}setConfig(e){if(!e||typeof e!="object")throw new Error("Invalid configuration");let s=Object.fromEntries(Object.entries(e).filter(([,n])=>n!=null));s.show_queue!==void 0&&s.show_catchup===void 0&&(s.show_catchup=s.show_queue),this._config=e,this._cfg={...se,...s},this._disc=void 0}getCardSize(){if(!this._cfg)return 12;let e=this._cfg,s=e.layout==="full",n=1;return e.show_hero&&(n+=3),s&&e.show_watch_time&&(n+=2),s&&e.show_library&&(n+=2),e.show_streak&&(n+=3),s&&e.show_last_7_days&&(n+=3),e.show_next_up&&(n+=3),s&&e.show_catchup&&(n+=2+Math.min(e.queue_length,5)),s&&e.show_airing&&(n+=2+Math.min(e.airing_length,5)),n}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}shouldUpdate(e){if(!this._config||!this.hass)return!1;if([...e.keys()].some(r=>r!=="hass"))return!0;let n=e.get("hass");if(!n||n.locale!==this.hass.locale||n.entities!==this.hass.entities||n.devices!==this.hass.devices)return!0;for(let r of Object.values(this._discovery().entities))if(n.states[r]!==this.hass.states[r])return!0;return!1}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._actionTimer)}_discovery(){let e=this.hass,s=this._config;return(!this._disc||!this._discFor||this._discFor.config!==s||this._discFor.entities!==e.entities||this._discFor.devices!==e.devices||Object.keys(this._disc.entities).length===0)&&(this._disc=wt(e,s),this._discFor={config:s,entities:e.entities,devices:e.devices}),this._disc}render(){if(!this._config||!this.hass)return d;let e=this._cfg;if(!e.entity&&!e.device_id&&!e.entities)return this._message(h(this.hass,"empty.no_entity"));let s=this._discovery(),n=Rt(this.hass,s,e);if(!n.found)return this._message(h(this.hass,"empty.not_found",{entity:e.entity??e.device_id??""}));let r=e.layout==="compact",o=e.show_posters&&n.hasPosters,a=e.show_streak&&n.streak?this._streak(n):d,c=!r&&e.show_average?this._average(n):d;return p`<ha-card style=${ft(this._colorVars())}>
      ${this._header(n)} ${e.show_hero?this._hero(n):d}
      ${!r&&e.show_watch_time?this._watchTime(n):d} ${!r&&e.show_library?this._library(n):d}
      ${a===d&&c===d?d:p`<div class="grid">${a}${c}</div>`}
      ${!r&&e.show_last_7_days?this._last7(n):d} ${e.show_next_up?this._next(n,o):d}
      ${!r&&e.show_catchup?this._catchup(n,o):d} ${!r&&e.show_airing?this._airing(n):d}
    </ha-card>`}_message(e){return p`<ha-card><div class="empty" style="padding:16px">${e}</div></ha-card>`}_colorVars(){let e=this._cfg,s={};return e.color_movies&&(s["--refract-color-movies"]=e.color_movies),e.color_shows&&(s["--refract-color-shows"]=e.color_shows),e.color_anime&&(s["--refract-color-anime"]=e.color_anime),e.color_accent&&(s["--refract-color-accent"]=e.color_accent),s}_header(e){let s=e.last,n=s?.season!==void 0&&s?.episode!==void 0?` S${s.season} E${s.episode}`:"";return p`<div class="header">
      <div class="brand">
        <ha-icon icon="mdi:chart-donut"></ha-icon>
        <span class="name">${e.accountMain}</span>
        ${e.accountSub?p`<span class="sub">${e.accountSub}</span>`:d}
      </div>
      ${s?p`<span class="last" title="${h(this.hass,"header.last_watched")}">
            ${s.title?p`${s.title}${n} · `:d}<ha-relative-time
              .hass=${this.hass}
              .datetime=${s.iso}
            ></ha-relative-time>
          </span>`:d}
    </div>`}_hero(e){let s=x(this.hass),n=this._cfg,r=e.minutes.total,a=[[h(this.hass,"hero.library"),e.library.total],[h(this.hass,"hero.movies_seen"),e.moviesWatched],[h(this.hass,"hero.episodes"),e.episodesWatched]].filter(([,l])=>l!==void 0);if(r===void 0&&a.length===0)return d;let c=n.fun_stat&&r!==void 0?St(this.hass,r,n.fun_stat_mode):void 0;return p`<div>
      <div class="hero">
        ${r!==void 0?p`<div class="hero-main">
              <div class="label">${h(this.hass,"hero.total")}</div>
              <div class="big">
                ${Ue(r,n.duration_format,s).map((l,m)=>p`<span class="part"
                        ><span class="num ${m>0?"second":""}">${l.value}</span>
                        <span class="unit">${h(this.hass,l.unit)}</span></span
                      >
                    `)}
              </div>
              ${c?p`<div class="fun"><ha-icon icon="mdi:shimmer"></ha-icon><span>${c}</span></div>`:d}
            </div>`:d}
        ${a.length?p`<div class="tiles">
              ${a.map(([l,m])=>p`<div class="tile">
                    <div class="label">${l}</div>
                    <div class="value">${_(m,s)}</div>
                  </div>`)}
            </div>`:d}
      </div>
    </div>`}_library(e){let s=x(this.hass),n=e.library,r={completed:"var(--c-completed)",up_to_date:"var(--c-up-to-date)",in_progress:"var(--c-in-progress)",planned:"var(--c-watchlist)",on_hold:"var(--c-on-hold)",dropped:"var(--c-dropped)"},o={planned:"status.watchlist"},a=l=>{let m=o[l]??`status.${l}`,u=h(this.hass,m);if(u!==m)return u;let g=l.replace(/_/g," ");return g.charAt(0).toUpperCase()+g.slice(1)},c=n.statuses?n.statuses.map(l=>[a(l.key),l.count,r[l.key]??"var(--track)"]):[["status.completed",n.completed,"var(--c-completed)"],["status.up_to_date",n.upToDate,"var(--c-up-to-date)"],["status.in_progress",n.inProgress,"var(--c-in-progress)"],["status.watchlist",n.watchlist,"var(--c-watchlist)"],["status.other",n.other&&n.other>0?n.other:void 0,"var(--track)"]].filter(([,l])=>l!==void 0).map(([l,m,u])=>[h(this.hass,l),m,u]);return c.length?p`<div class="panel library">
      <div class="label" style="margin-bottom:10px">${h(this.hass,"library.title")}</div>
      <div class="status-bar" role="img" aria-label=${c.map(([l,m])=>`${l} ${m}`).join(", ")}>
        ${c.map(([,l,m])=>p`<span style="flex:${l} 1 0; background:${m}"></span>`)}
      </div>
      <div class="status-legend">
        ${c.map(([l,m,u])=>p`<span><span class="swatch sm" style="background:${u}"></span>${l} ${_(m,s)}</span>`)}
      </div>
    </div>`:d}_timeZone(){return this.hass.locale?.time_zone==="server"?this.hass.config?.time_zone:void 0}_hour12(){let e=this.hass.locale?.time_format;return e==="12"?!0:e==="24"?!1:void 0}_streak(e){let s=x(this.hass),n=e.streak,r=h(this.hass,n.current===1?"unit.day":"unit.days"),o=Et({now:new Date,lastWatchedIso:e.last?.iso,current:n.current,timeZone:this._timeZone(),lang:s}),a=n.current===0?h(this.hass,"streak.none"):[h(this.hass,"streak.longest",{n:n.longest,unit:h(this.hass,n.longest===1?"unit.day":"unit.days")}),o.stillTimeToday?h(this.hass,"streak.still_time"):""].filter(Boolean).join(" \xB7 ");return p`<div class="panel streak">
      <div class="label">${h(this.hass,"streak.title")}</div>
      <div class="metric">${_(n.current,s)} <span class="unit">${r}</span></div>
      <div class="dots" role="img" aria-label="${n.current} ${r}">
        ${o.days.map(c=>p`<div class="dot-col ${c.today?"today":""}">
              <span class="dot ${c.filled?"filled":"open"} ${c.today?"today":""}"></span>${c.label}
            </div>`)}
      </div>
      <div class="streak-foot">${a}</div>
    </div>`}_average(e){let s=e.average;if(!s)return d;let n=x(this.hass),r;if(s.hours!==void 0)r=p`${_(s.hours,n,1)} <span class="unit">${h(this.hass,"unit.h")}</span>`;else if(s.itemsPerWeek!==void 0)r=p`${_(s.itemsPerWeek,n,1)} <span class="unit">${h(this.hass,"avg.items_unit")}</span>`;else return d;let o=s.changePct,a=o==null?d:p`<div class="trend ${o>0?"up":o<0?"down":""}">
            ${o>0?"\u25B2":o<0?"\u25BC":"\u2013"} ${Math.abs(o)}% ${h(this.hass,"avg.vs_previous")}
          </div>`;return p`<div class="panel average">
      <div class="label">${h(this.hass,"avg.title")}</div>
      <div class="metric" title=${s.estimated&&s.hours!==void 0?h(this.hass,"avg.estimated"):""}>
        ${s.hours!==void 0&&s.estimated?p`<span class="approx">~</span>`:d}${r}
      </div>
      ${s.hours!==void 0&&s.itemsPerWeek!==void 0?p`<div class="avg-items">
            ${s.itemsPerWeek===1?h(this.hass,"avg.items_line_one"):h(this.hass,"avg.items_line",{n:_(s.itemsPerWeek,n,1)})}
          </div>`:d}
      ${a}
    </div>`}_last7(e){let s=e.last7;if(!s)return d;let n=x(this.hass),r=He(new Date,this._timeZone()),o=s.days.map(u=>u.episodes+u.movies),a=Math.max(1,...o),c=84,l=s.busiest?ve(s.busiest.date,n,"long"):void 0,m=`${h(this.hass,"days7.episodes")} ${s.episodes}, ${h(this.hass,"days7.movies")} ${s.movies}`;return p`<div class="panel last7">
      <div class="panel-head">
        <span class="label">${h(this.hass,"days7.title")}</span>
        ${l?p`<span class="badge accent">${h(this.hass,"days7.busiest",{day:l})}</span>`:d}
      </div>
      <div class="bars" role="img" aria-label=${m}>
        ${s.days.map((u,g)=>{let v=o[g],k=v===0?3:Math.max(8,Math.round(v/a*c));return p`<div class="day ${u.date===r?"today":""}">
            <div class="slot">
              <div class="bar ${v===0?"empty":""}" style="height:${k}px">
                ${u.movies?p`<span class="seg movies" style="flex:${u.movies} 1 0"></span>`:d}
                ${u.episodes?p`<span class="seg shows" style="flex:${u.episodes} 1 0"></span>`:d}
              </div>
            </div>
            <span class="day-label">${ve(u.date,n,"narrow")}</span>
          </div>`})}
      </div>
      <div class="legend-row">
        <span><span class="swatch" style="background:var(--c-shows)"></span>${h(this.hass,"days7.episodes")} <b>${_(s.episodes,n)}</b></span>
        <span><span class="swatch" style="background:var(--c-movies)"></span>${h(this.hass,"days7.movies")} <b>${_(s.movies,n)}</b></span>
      </div>
      ${s.episodes+s.movies===0?p`<div class="empty">${h(this.hass,"days7.none")}</div>`:d}
    </div>`}_watchTime(e){let s=x(this.hass),n=this._cfg.duration_format,r=[{key:"library.shows",minutes:e.minutes.shows,color:"var(--c-shows)"},{key:"library.movies",minutes:e.minutes.movies,color:"var(--c-movies)"},{key:"library.anime",minutes:e.minutes.anime,color:"var(--c-anime)"}].filter(a=>a.minutes!==void 0);if(!r.length)return d;let o=At(r.map(a=>a.minutes));return p`<div class="panel">
      <div class="label" style="margin-bottom:8px">${h(this.hass,"watch.title")}</div>
      <div class="stack" role="img" aria-label=${r.map((a,c)=>`${h(this.hass,a.key)} ${o[c]}%`).join(", ")}>
        ${r.map(a=>p`<span style="flex:${Math.max(a.minutes,0)} 1 0; background:${a.color}"></span>`)}
      </div>
      <div class="watch-cols">
        ${r.map((a,c)=>p`<div class="watch-col">
              <div class="row"><span class="swatch" style="background:${a.color}"></span>${h(this.hass,a.key)} (${o[c]}%)</div>
              <div class="value">${Le(a.minutes,n,s)}</div>
            </div>`)}
      </div>
    </div>`}_poster(e,s,n){let r=(s.trim()[0]??"?").toUpperCase();return p`<div class="poster ${n}" aria-hidden="true">
      <span>${r}</span>
      ${e?p`<img
            src=${e}
            alt=""
            loading="lazy"
            referrerpolicy="no-referrer"
            @error=${o=>o.target.style.display="none"}
          />`:d}
    </div>`}_next(e,s){if(e.next.kind==="hidden")return d;if(e.next.kind==="empty")return p`<div class="panel next">
        <div class="label">${h(this.hass,"next.title")}</div>
        <div class="empty">${h(this.hass,"empty.nothing_up_next")}</div>
      </div>`;let n=e.next.item,r=x(this.hass),a=[n.season!==void 0&&n.number!==void 0?`S${n.season} E${n.number}`:"",n.episodeName].filter(Boolean).join(" \xB7 "),c=n.airedEpisodes,l=c!==void 0&&n.remaining!==void 0?Math.max(0,c-n.remaining):void 0,m=c&&l!==void 0?Math.min(100,l/c*100):void 0;return p`<div class="panel next ${s?"with-poster":""}">
      ${s?this._poster(n.posterUrl,n.title,"lg"):d}
      <div class="next-body">
        <div class="next-head">
          <span class="label">${h(this.hass,"next.title")}</span>
          ${n.isAnime?p`<span class="badge">${h(this.hass,"badge.anime")}</span>`:d} ${this._badge(n)}
        </div>
        <div class="next-main">
          <div>
            <div class="next-title">
              <span>${n.title}</span>
              ${n.year?p`<span class="year">${n.year}</span>`:d}
            </div>
            ${a?p`<div class="next-ep">${a}</div>`:d}
          </div>
          ${this._actionButton(n)}
        </div>
        ${m!==void 0?p`<div class="progress" role="img" aria-label="${l} / ${c}"><span style="width:${m}%"></span></div>
              <div class="next-foot">
                <span>${h(this.hass,"next.progress",{watched:_(l,r),aired:_(c,r)})}</span>
                ${n.remaining!==void 0?p`<span>${h(this.hass,"next.remaining",{n:_(n.remaining,r)})}</span>`:d}
              </div>`:d}
      </div>
    </div>`}_badge(e){return e.aired?e.premiere?p`<span class="badge accent">${h(this.hass,"badge.premiere")}</span>`:e.finale?p`<span class="badge warn">${h(this.hass,"badge.finale")}</span>`:e.midFinale?p`<span class="badge warn">${h(this.hass,"badge.mid_finale")}</span>`:d:p`<span class="badge">${h(this.hass,"badge.not_aired")}</span>`}_canMarkWatched(e){return this._cfg.show_actions&&!!this.hass.services?.[M]?.mark_episode_watched&&e.aired&&e.season!==void 0&&e.number!==void 0&&(e.tmdbId!==void 0||!!e.refractId)}_actionButton(e){if(!this._canMarkWatched(e))return d;let s=this._actionState,n={idle:"mdi:check",confirm:"mdi:help-circle-outline",busy:"mdi:loading",done:"mdi:check-circle",error:"mdi:alert-circle-outline"}[s],r={idle:"next.mark",confirm:"next.confirm",busy:"next.busy",done:"next.done",error:"next.error"}[s];return p`<button class="action" data-state=${s} title=${this._actionError} @click=${()=>this._markWatched(e)}>
      <ha-icon icon=${n}></ha-icon>${h(this.hass,r)}
    </button>`}_resetActionLater(e){window.clearTimeout(this._actionTimer),this._actionTimer=window.setTimeout(()=>{this._actionState="idle",this._actionError=""},e)}async _configEntryId(){if(this._cfg.config_entry_id)return this._cfg.config_entry_id;let e=this._discovery().entities.next_up??this._cfg.entity;if(e)try{return(await this.hass.callWS({type:"config/entity_registry/get",entity_id:e}))?.config_entry_id}catch{return}}async _markWatched(e){if(this._actionState!=="busy"){if(this._cfg.confirm_actions&&this._actionState!=="confirm"){this._actionState="confirm",this._resetActionLater(3e3);return}window.clearTimeout(this._actionTimer),this._actionState="busy";try{let s={season:e.season,number:e.number};e.tmdbId!==void 0?s.tmdb_id=e.tmdbId:s.refract_id=e.refractId;let n=await this._configEntryId();n&&(s.config_entry_id=n),await this.hass.callService(M,"mark_episode_watched",s),this._actionState="done",this._resetActionLater(2500),this._refreshSensors()}catch(s){this._actionError=s instanceof Error?s.message:String(s),this._actionState="error",this._resetActionLater(4e3)}}}_refreshSensors(){let e=this._discovery().entities,s=[e.next_up,e.shows_waiting,e.catch_up,e.last_7_days,e.average_per_week,e.last_watched,e.stats_streak_current_days].filter(Boolean);s.length&&this.hass.callService("homeassistant","update_entity",{entity_id:s}).catch(()=>{})}_catchup(e,s){let n=e.catchup;if(!n)return d;let r=x(this.hass),o=this._cfg.queue_length,a=n.shows.length>o,c=this._catchupExpanded?n.shows:n.shows.slice(0,o),l=Math.max(1,...n.shows.map(u=>u.remaining)),m=n.minutes!==void 0&&n.total>0?`, ${h(this.hass,"catchup.about",{time:Le(n.minutes,this._cfg.duration_format,r)})}`:"";return p`<div class="panel catchup">
      <div class="panel-head">
        <span class="label">${h(this.hass,"catchup.title")}</span>
        ${n.total>0?p`<span class="badge ok">${h(this.hass,"catchup.ready")}</span>`:d}
      </div>
      ${n.total>0?p`<div class="catch-line">
            <span class="metric">${_(n.total,r)}</span>
            <span class="muted">${h(this.hass,"catchup.waiting")}${m}</span>
          </div>`:p`<div class="empty">${h(this.hass,"catchup.none")}</div>`}
      ${c.map(u=>this._catchupRow(u,l,s,r))}
      ${a?p`<button class="link" @click=${()=>this._catchupExpanded=!this._catchupExpanded}>
            ${this._catchupExpanded?h(this.hass,"catchup.show_less"):h(this.hass,"catchup.show_all",{n:_(n.shows.length,r)})}
          </button>`:d}
    </div>`}_catchupRow(e,s,n,r){return p`<div class="c-row">
      ${n?this._poster(e.posterUrl,e.title,"sm"):d}
      <span class="c-name" title=${e.title}>${e.title}</span>
      <div class="progress" role="img" aria-label="${e.remaining}"><span style="width:${e.remaining/s*100}%"></span></div>
      <b class="c-count">${_(e.remaining,r)}</b>
    </div>`}_airing(e){let s=e.airing;if(!s)return d;let n=x(this.hass),r=He(new Date,this._timeZone()),o=this._cfg.airing_length,a=s.length>o,c=this._airingExpanded?s:s.slice(0,o);return p`<div class="panel airing">
      <div class="panel-head"><span class="label">${h(this.hass,"airing.title")}</span></div>
      ${c.length?c.map(l=>{let m=l.season!==void 0&&l.number!==void 0?`S${l.season} \xB7 E${l.number}`:"",u=l.airAt?Ct(l.airAt,n,this._timeZone(),this._hour12()):void 0;return p`<div class="a-row">
              <span class="a-day ${l.date===r?"today":""}">${l.date===r?h(this.hass,"airing.today"):ve(l.date,n,"short")}</span>
              <span class="swatch" style="background:${l.isAnime?"var(--c-anime)":"var(--c-shows)"}"></span>
              <span class="a-name"><b>${l.show}</b>${m?p` <span class="muted">${m}</span>`:d}</span>
              ${l.premiere?p`<span class="badge accent">${h(this.hass,"badge.premiere")}</span>`:l.finale?p`<span class="badge warn">${h(this.hass,"badge.finale")}</span>`:d}
              ${u?p`<span class="a-time">${u}</span>`:d}
            </div>`}):p`<div class="empty">${h(this.hass,"airing.none")}</div>`}
      ${a?p`<button class="link" @click=${()=>this._airingExpanded=!this._airingExpanded}>
            ${this._airingExpanded?h(this.hass,"airing.show_less"):h(this.hass,"airing.show_all",{n:_(s.length,n)})}
          </button>`:d}
    </div>`}};S.styles=Mt,$([q({attribute:!1})],S.prototype,"hass",2),$([N()],S.prototype,"_config",2),$([N()],S.prototype,"_catchupExpanded",2),$([N()],S.prototype,"_airingExpanded",2),$([N()],S.prototype,"_actionState",2),$([N()],S.prototype,"_actionError",2),S=$([ue(te)],S);var ls={entity:"Refract entity",name:"Name (optional)",layout:"Layout",duration_format:"Duration format",queue_length:"Catch-up rows",airing_length:"Airing rows",fun_stat:"Show fun stat",fun_stat_mode:"Fun stat",show_hero:"Watch time summary",show_watch_time:"Watch time split",show_library:"Library",show_streak:"Streak",show_average:"Average per week",show_last_7_days:"Last 7 days",show_next_up:"Next up",show_catchup:"Catch-up backlog",show_airing:"Airing this week",show_posters:"Posters",show_actions:"Show \u201CMark watched\u201D button",confirm_actions:"Ask before marking watched",color_movies:"Movies color",color_shows:"TV shows color",color_anime:"Anime color",color_accent:"Accent color"},hs={entity:"Pick any entity of your Refract account. The card finds the rest.",show_actions:"Needs an API key that can mark episodes watched.",show_posters:"Needs a TMDB API key in the Refract integration options.",show_last_7_days:"Needs watch history turned on in the integration options.",show_average:"Needs watch history turned on in the integration options.",color_movies:"Hex color such as #2a78d6. Leave empty for the default."},P=(i,t)=>({value:i,label:t}),ze=i=>({select:{mode:"dropdown",options:i}}),ps=[{name:"entity",required:!0,selector:{entity:{integration:M,domain:"sensor"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"layout",selector:ze([P("full","Full"),P("compact","Compact")])},{name:"duration_format",selector:ze([P("days_hours","Days and hours"),P("hours","Hours only"),P("auto","Automatic")])},{name:"queue_length",selector:{number:{min:1,max:20,mode:"box"}}},{name:"airing_length",selector:{number:{min:1,max:20,mode:"box"}}}]},{type:"expandable",name:"",title:"Sections",icon:"mdi:view-dashboard-outline",schema:[{type:"grid",name:"",schema:[{name:"show_hero",selector:{boolean:{}}},{name:"show_watch_time",selector:{boolean:{}}},{name:"show_library",selector:{boolean:{}}},{name:"show_streak",selector:{boolean:{}}},{name:"show_average",selector:{boolean:{}}},{name:"show_last_7_days",selector:{boolean:{}}},{name:"show_next_up",selector:{boolean:{}}},{name:"show_catchup",selector:{boolean:{}}},{name:"show_airing",selector:{boolean:{}}},{name:"show_posters",selector:{boolean:{}}}]}]},{type:"expandable",name:"",title:"Fun stat",icon:"mdi:shimmer",schema:[{name:"fun_stat",selector:{boolean:{}}},{name:"fun_stat_mode",selector:ze([P("rotate","Rotate daily"),P("months","Months of nonstop viewing"),P("workweeks","Full-time work weeks"),P("lotr","Lord of the Rings marathons")])}]},{type:"expandable",name:"",title:"Next up actions",icon:"mdi:gesture-tap-button",schema:[{name:"show_actions",selector:{boolean:{}}},{name:"confirm_actions",selector:{boolean:{}}}]},{type:"expandable",name:"",title:"Colors",icon:"mdi:palette-outline",schema:[{type:"grid",name:"",schema:[{name:"color_movies",selector:{text:{}}},{name:"color_shows",selector:{text:{}}},{name:"color_anime",selector:{text:{}}},{name:"color_accent",selector:{text:{}}}]}]}],H=class extends E{setConfig(t){this._config=t}render(){if(!this.hass||!this._config)return d;let t={...se,...this._config};this._config.show_queue!==void 0&&this._config.show_catchup===void 0&&(t.show_catchup=this._config.show_queue);let e=!!this._config.show_actions&&!this.hass.services?.[M]?.mark_episode_watched;return p`<div class="wrap">
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${ps}
        .computeLabel=${s=>ls[s.name]??s.name}
        .computeHelper=${s=>hs[s.name]}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${e?p`<ha-alert alert-type="warning">
            The button stays hidden until the <code>refract.mark_episode_watched</code> action is available. Check
            that your Refract API key allows marking episodes and movies as watched.
          </ha-alert>`:d}
    </div>`}_valueChanged(t){if(t.stopPropagation(),!this._config)return;let e=t.detail.value,s=se,n={type:this._config.type};for(let[o,a]of Object.entries(e))a===""||a===void 0||a===null||o in s&&a===s[o]||(n[o]=a);delete n.streak_style,delete n.show_streak_toggle,delete n.show_queue;let r=this._config;for(let o of["device_id","config_entry_id","entities"])r[o]!==void 0&&n[o]===void 0&&(n[o]=r[o]);this._config=n,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0}))}};H.styles=Pt,$([q({attribute:!1})],H.prototype,"hass",2),$([N()],H.prototype,"_config",2),H=$([ue(fe)],H);window.customCards=window.customCards||[];window.customCards.some(i=>i.type===te)||window.customCards.push({type:te,name:h(void 0,"card.name"),description:h(void 0,"card.description"),preview:!0,documentationURL:gt});console.info(`%c REFRACT-STATS-CARD %c v${_t} `,"color:white;background:#6250d6;font-weight:500;border-radius:3px 0 0 3px","color:#6250d6;background:#eee;font-weight:500;border-radius:0 3px 3px 0");
