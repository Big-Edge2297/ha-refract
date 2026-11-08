var ns=Object.defineProperty;var is=Object.getOwnPropertyDescriptor;var E=(i,t,e,s)=>{for(var n=s>1?void 0:s?is(t,e):t,o=i.length-1,r;o>=0;o--)(r=i[o])&&(n=(s?r(t,e,n):r(n))||n);return s&&n&&ns(t,e,n),n};var ye=globalThis,be=ye.ShadowRoot&&(ye.ShadyCSS===void 0||ye.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ne=Symbol(),ut=new WeakMap,te=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ne)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(be&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ut.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ut.set(e,t))}return t}toString(){return this.cssText}},pt=i=>new te(typeof i=="string"?i:i+"",void 0,Ne),ve=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,n,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[o+1],i[0]);return new te(e,i,Ne)},mt=(i,t)=>{if(be)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),n=ye.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},Ue=be?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return pt(e)})(i):i;var{is:os,defineProperty:rs,getOwnPropertyDescriptor:as,getOwnPropertyNames:cs,getOwnPropertySymbols:ls,getPrototypeOf:ds}=Object,we=globalThis,ft=we.trustedTypes,hs=ft?ft.emptyScript:"",us=we.reactiveElementPolyfillSupport,se=(i,t)=>i,ne={toAttribute(i,t){switch(t){case Boolean:i=i?hs:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},xe=(i,t)=>!os(i,t),gt={attribute:!0,type:String,converter:ne,reflect:!1,useDefault:!1,hasChanged:xe};Symbol.metadata??=Symbol("metadata"),we.litPropertyMetadata??=new WeakMap;var O=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=gt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&rs(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){let{get:n,set:o}=as(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:n,set(r){let c=n?.call(this);o?.call(this,r),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??gt}static _$Ei(){if(this.hasOwnProperty(se("elementProperties")))return;let t=ds(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(se("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(se("properties"))){let e=this.properties,s=[...cs(e),...ls(e)];for(let n of s)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let n of s)e.unshift(Ue(n))}else t!==void 0&&e.push(Ue(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return mt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:ne).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let o=s.getPropertyOptions(n),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:ne;this._$Em=n;let c=r.fromAttribute(e,o.type);this[n]=c??this._$Ej?.get(n)??c,this._$Em=null}}requestUpdate(t,e,s,n=!1,o){if(t!==void 0){let r=this.constructor;if(n===!1&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??xe)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,o]of s){let{wrapped:r}=o,c=this[n];r!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,o,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[se("elementProperties")]=new Map,O[se("finalized")]=new Map,us?.({ReactiveElement:O}),(we.reactiveElementVersions??=[]).push("2.1.2");var qe=globalThis,_t=i=>i,$e=qe.trustedTypes,yt=$e?$e.createPolicy("lit-html",{createHTML:i=>i}):void 0,kt="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,St="?"+z,ps=`<${St}>`,q=document,oe=()=>q.createComment(""),re=i=>i===null||typeof i!="object"&&typeof i!="function",Be=Array.isArray,ms=i=>Be(i)||typeof i?.[Symbol.iterator]=="function",Le=`[ 	
\f\r]`,ie=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,vt=/>/g,W=RegExp(`>|${Le}(?:([^\\s"'>=/]+)(${Le}*=${Le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),wt=/'/g,xt=/"/g,At=/^(?:script|style|textarea|title)$/i,Ke=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=Ke(1),Ps=Ke(2),Ns=Ke(3),D=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),$t=new WeakMap,j=q.createTreeWalker(q,129);function Et(i,t){if(!Be(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return yt!==void 0?yt.createHTML(t):t}var fs=(i,t)=>{let e=i.length-1,s=[],n,o=t===2?"<svg>":t===3?"<math>":"",r=ie;for(let c=0;c<e;c++){let a=i[c],d,m,u=-1,f=0;for(;f<a.length&&(r.lastIndex=f,m=r.exec(a),m!==null);)f=r.lastIndex,r===ie?m[1]==="!--"?r=bt:m[1]!==void 0?r=vt:m[2]!==void 0?(At.test(m[2])&&(n=RegExp("</"+m[2],"g")),r=W):m[3]!==void 0&&(r=W):r===W?m[0]===">"?(r=n??ie,u=-1):m[1]===void 0?u=-2:(u=r.lastIndex-m[2].length,d=m[1],r=m[3]===void 0?W:m[3]==='"'?xt:wt):r===xt||r===wt?r=W:r===bt||r===vt?r=ie:(r=W,n=void 0);let _=r===W&&i[c+1].startsWith("/>")?" ":"";o+=r===ie?a+ps:u>=0?(s.push(d),a.slice(0,u)+kt+a.slice(u)+z+_):a+z+(u===-2?c:_)}return[Et(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},ae=class i{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let o=0,r=0,c=t.length-1,a=this.parts,[d,m]=fs(t,e);if(this.el=i.createElement(d,s),j.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(n=j.nextNode())!==null&&a.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(let u of n.getAttributeNames())if(u.endsWith(kt)){let f=m[r++],_=n.getAttribute(u).split(z),$=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:$[2],strings:_,ctor:$[1]==="."?He:$[1]==="?"?Fe:$[1]==="@"?We:G}),n.removeAttribute(u)}else u.startsWith(z)&&(a.push({type:6,index:o}),n.removeAttribute(u));if(At.test(n.tagName)){let u=n.textContent.split(z),f=u.length-1;if(f>0){n.textContent=$e?$e.emptyScript:"";for(let _=0;_<f;_++)n.append(u[_],oe()),j.nextNode(),a.push({type:2,index:++o});n.append(u[f],oe())}}}else if(n.nodeType===8)if(n.data===St)a.push({type:2,index:o});else{let u=-1;for(;(u=n.data.indexOf(z,u+1))!==-1;)a.push({type:7,index:o}),u+=z.length-1}o++}}static createElement(t,e){let s=q.createElement("template");return s.innerHTML=t,s}};function Y(i,t,e=i,s){if(t===D)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl,o=re(t)?void 0:t._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),o===void 0?n=void 0:(n=new o(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=n:e._$Cl=n),n!==void 0&&(t=Y(i,n._$AS(i,t.values),n,s)),t}var ze=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??q).importNode(e,!0);j.currentNode=n;let o=j.nextNode(),r=0,c=0,a=s[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new ce(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new je(o,this,t)),this._$AV.push(d),a=s[++c]}r!==a?.index&&(o=j.nextNode(),r++)}return j.currentNode=q,n}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},ce=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),re(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==D&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ms(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&re(this._$AH)?this._$AA.nextSibling.data=t:this.T(q.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ae.createElement(Et(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{let o=new ze(n,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=$t.get(t.strings);return e===void 0&&$t.set(t.strings,e=new ae(t)),e}k(t){Be(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,n=0;for(let o of t)n===e.length?e.push(s=new i(this.O(oe()),this.O(oe()),this,this.options)):s=e[n],s._$AI(o),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=_t(t).nextSibling;_t(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},G=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,n){let o=this.strings,r=!1;if(o===void 0)t=Y(this,t,e,0),r=!re(t)||t!==this._$AH&&t!==D,r&&(this._$AH=t);else{let c=t,a,d;for(t=o[0],a=0;a<o.length-1;a++)d=Y(this,c[s+a],e,a),d===D&&(d=this._$AH[a]),r||=!re(d)||d!==this._$AH[a],d===p?t=p:t!==p&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}r&&!n&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},He=class extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},Fe=class extends G{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},We=class extends G{constructor(t,e,s,n,o){super(t,e,s,n,o),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??p)===D)return;let s=this._$AH,n=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==p&&(s===p||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},je=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}};var gs=qe.litHtmlPolyfillSupport;gs?.(ae,ce),(qe.litHtmlVersions??=[]).push("3.3.3");var Tt=(i,t,e)=>{let s=e?.renderBefore??t,n=s._$litPart$;if(n===void 0){let o=e?.renderBefore??null;s._$litPart$=n=new ce(t.insertBefore(oe(),o),o,void 0,e??{})}return n._$AI(i),n};var Ve=globalThis,M=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Tt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}};M._$litElement$=!0,M.finalized=!0,Ve.litElementHydrateSupport?.({LitElement:M});var _s=Ve.litElementPolyfillSupport;_s?.({LitElement:M});(Ve.litElementVersions??=[]).push("4.2.2");var ys={attribute:!0,type:String,converter:ne,reflect:!1,hasChanged:xe},bs=(i=ys,t,e)=>{let{kind:s,metadata:n}=e,o=globalThis.litPropertyMetadata.get(n);if(o===void 0&&globalThis.litPropertyMetadata.set(n,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),s==="accessor"){let{name:r}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(r,a,i,!0,c)},init(c){return c!==void 0&&this.C(r,void 0,i,c),c}}}if(s==="setter"){let{name:r}=e;return function(c){let a=this[r];t.call(this,c),this.requestUpdate(r,a,i,!0,c)}}throw Error("Unsupported decorator location: "+s)};function Z(i){return(t,e)=>typeof e=="object"?bs(i,t,e):((s,n,o)=>{let r=n.hasOwnProperty(o);return n.constructor.createProperty(o,s),r?Object.getOwnPropertyDescriptor(n,o):void 0})(i,t,e)}function H(i){return Z({...i,state:!0,attribute:!1})}var Se=i=>t=>{if(customElements.get(i)){console.warn(`[refract-stats-card] <${i}> is already registered, probably by the standalone HACS card. Remove that copy to use the card that ships with the Refract integration.`);return}customElements.define(i,t)};var Ct={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Rt=i=>(...t)=>({_$litDirective$:i,values:t}),Ae=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Mt="important",vs=" !"+Mt,It=Rt(class extends Ae{constructor(i){if(super(i),i.type!==Ct.ATTRIBUTE||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let n=t[s];if(n!=null){this.ft.add(s);let o=typeof n=="string"&&n.endsWith(vs);s.includes("-")||o?e.setProperty(s,o?n.slice(0,-11):n,o?Mt:""):e[s]=n}}return D}});var le="refract-stats-card",Ee="refract-stats-card-editor",P="refract",Ot="https://github.com/Big-Edge2297/ha-refract/blob/main/docs/dashboard-card.md",Dt="0.4.6",Te=["library_total","completed","in_progress","watchlist","up_to_date","movies","tv_shows","anime","last_watched","shows_waiting","next_up","username","catch_up","last_7_days","average_per_week","airing_this_week","still_to_finish","stats_anime_episodes_watched","stats_anime_titles","stats_movies_watched","stats_shows_episodes_watched","stats_shows_titles","stats_streak_current_days","stats_streak_longest_days","stats_watch_time_anime_minutes","stats_watch_time_movies_minutes","stats_watch_time_shows_minutes","stats_watch_time_total_minutes"];var ws=[...Te].sort((i,t)=>t.length-i.length),Pt=new Set(Te);function Nt(i){for(let t of ws){if(i===t)return{key:t,prefix:""};if(i.endsWith(`_${t}`))return{key:t,prefix:i.slice(0,i.length-t.length)}}}var Ut=i=>i.slice(i.indexOf(".")+1);function Lt(i,t){let e={entities:{}},s=i.entities,n=t.entity;if(e.deviceId=t.device_id,n&&s?.[n]?.device_id&&(e.deviceId=s[n].device_id),e.deviceId&&s)for(let[o,r]of Object.entries(s)){if(r.device_id!==e.deviceId||!o.startsWith("sensor.")||r.platform&&r.platform!==P)continue;let c=r.translation_key&&Pt.has(r.translation_key)?r.translation_key:void 0,a=c?{key:c,prefix:void 0}:Nt(Ut(o));a&&(e.entities[a.key]||(e.entities[a.key]=o),e.prefix===void 0&&a.prefix!==void 0&&(e.prefix=a.prefix))}if(n){let o=Nt(Ut(n));if(o){e.prefix??=o.prefix;for(let r of Te){let c=`sensor.${o.prefix}${r}`;!e.entities[r]&&i.states[c]&&(e.entities[r]=c)}}}for(let[o,r]of Object.entries(t.entities??{}))Pt.has(o)&&typeof r=="string"&&(e.entities[o]=r);return e}function zt(i){if(!i)return{main:"Refract"};let t=i.match(/^(.*?)\s*\(([^)]*)\)\s*$/);return t&&t[1]?{main:t[1],sub:t[2]||void 0}:{main:i}}function Ht(i,t){let e=t.deviceId?i.devices?.[t.deviceId]:void 0,s=e?.name_by_user||e?.name;if(s)return s;for(let n of Object.values(t.entities)){let r=i.states[n]?.attributes?.friendly_name?.match(/^(.*?\([^)]*\))/);if(r)return r[1]}}var Ye={"card.name":"Refract stats","card.description":"Watch time, library, streak and what to watch next from your Refract account.","empty.no_entity":"Choose a Refract entity to get started.","empty.not_found":"Couldn't find any Refract entities for {entity}.","empty.nothing_up_next":"Nothing up next. Add a show or mark an episode watched.","hero.total":"Total watch time","hero.library":"Library","hero.movies_seen":"Movies seen","hero.episodes":"Episodes watched","unit.days":"days","unit.day":"day","unit.hours":"hours","unit.hour":"hour","unit.min":"min","unit.h":"h","header.last_watched":"Last watched","library.title":"Library","library.titles":"titles","library.movies":"Movies","library.shows":"TV shows","library.anime":"Anime","status.completed":"Watched","status.up_to_date":"Up to Date","status.watchlist":"Plan to Watch","status.in_progress":"Watching","status.on_hold":"On Hold","status.dropped":"Dropped","status.other":"Other","watch.title":"Watch time","finish.title":"Still to finish","finish.none":"Nothing left to finish","finish.movies":"{n} movies to finish","finish.movies_one":"1 movie to finish","finish.shows":"{n} TV shows to finish","finish.shows_one":"1 TV show to finish","finish.anime":"{n} anime to finish","finish.anime_one":"1 anime to finish","streak.title":"Streak","streak.longest":"Longest: {n} {unit}","streak.best":"Best {n}","streak.still_time":"still time today","streak.none":"No active streak","next.title":"Next up","next.progress":"{watched} of {aired} aired episodes","next.remaining":"{n} remaining","next.mark":"Mark watched","next.confirm":"Mark watched?","next.busy":"Marking\u2026","next.done":"Marked","next.error":"Couldn't mark watched","avg.title":"Average per week","avg.vs_previous":"vs previous 4 weeks","avg.estimated":"Estimated from your average runtime","avg.items_unit":"a week","avg.items_line":"{n} episodes and movies a week","avg.items_line_one":"1 episode or movie a week","days7.title":"Last 7 days","days7.busiest":"Busiest day \xB7 {day}","days7.episodes":"Episodes","days7.movies":"Movies","days7.none":"Nothing watched in the last 7 days","catchup.title":"Catch-up backlog","catchup.pick":"Show {title} in Next up","catchup.waiting":"aired episodes waiting","catchup.about":"about {time}","catchup.none":"You're all caught up","catchup.show_all":"Show all {n}","catchup.show_less":"Show less","airing.title":"Airing this week","airing.today":"Today","airing.none":"Nothing airing in the next 7 days","airing.show_all":"Show all {n}","airing.show_less":"Show less","badge.premiere":"Premiere","badge.finale":"Finale","badge.mid_finale":"Mid-season finale","badge.not_aired":"Not aired","badge.anime":"Anime","fun.months":"That's about {n} months of nonstop viewing","fun.years":"That's about {n} years of nonstop viewing","fun.days":"That's about {n} days of nonstop viewing","fun.workweeks":"That's about {n} full-time work weeks","fun.lotr":"Enough for the extended Lord of the Rings trilogy about {n} times","fun.flights":"Enough time to fly around the world about {n} times","fun.sleep_nights":"That's about {n} nights of sleep","fun.sleep_years":"That's about {n} years of sleep at 8 hours a night","fun.movies":"That's about {n} average movies back to back","fun.seasons":"That's about {n} full 22-episode TV seasons","fun.marathons":"Enough time to run about {n} marathons","fun.moon":"Enough for about {n} one-way trips to the Moon","fun.imdb":"Enough to watch the whole IMDb Top 250 about {n} times"},xs={en:Ye};function A(i){return i?.locale?.language||i?.language||"en"}function h(i,t,e={}){let s=A(i).split("-")[0],o=(xs[s]??Ye)[t]??Ye[t]??t;for(let[r,c]of Object.entries(e))o=o.replace(`{${r}}`,String(c));return o}var Ze=864e5;function de(i){if(!i)return;let t=i.state;if(t==="unknown"||t==="unavailable"||t===""||t==null)return;let e=Number(t);return Number.isFinite(e)?e:void 0}function he(i){return!!i&&i.state!=="unavailable"&&i.state!=="unknown"}function b(i,t="en",e=0){try{return new Intl.NumberFormat(t,{maximumFractionDigits:e}).format(i)}catch{return String(Math.round(i))}}var T=(i,t,e)=>{let s=b(i,e);return t==="d"?{value:s,unit:i===1?"unit.day":"unit.days",short:"d"}:t==="h"?{value:s,unit:i===1?"unit.hour":"unit.hours",short:"h"}:{value:s,unit:"unit.min",short:"min"}};function Ce(i,t="days_hours",e="en"){let s=Math.max(0,Math.round(i)),n=Math.floor(s/1440),o=Math.floor(s%1440/60),r=s%60;if(t==="hours"){let c=Math.floor(s/60);return c>0?[T(c,"h",e)]:[T(r,"min",e)]}return t==="auto"?n>=1?[T(n,"d",e),T(o,"h",e)]:o>=1?[T(o,"h",e),T(r,"min",e)]:[T(r,"min",e)]:n>=1?[T(n,"d",e),T(o,"h",e)]:o>=1?[T(o,"h",e)]:[T(r,"min",e)]}function ue(i,t="days_hours",e="en"){return Ce(i,t,e).map(s=>`${s.value} ${s.short}`).join(" ")}function Wt(i){let t=i.reduce((r,c)=>r+c,0);if(t<=0)return i.map(()=>0);let e=i.map(r=>r/t*100),s=e.map(Math.floor),n=100-s.reduce((r,c)=>r+c,0),o=e.map((r,c)=>({i:c,frac:r-Math.floor(r)})).sort((r,c)=>c.frac-r.frac);for(let{i:r}of o){if(n<=0)break;s[r]+=1,n-=1}return s}var $s={workweeks:40*60,lotr:726,flights:2670,movies:100,seasons:22*42,marathons:270,moon:3*1440,imdb:250*130},ks=["months","workweeks","lotr","flights","sleep","movies","seasons","marathons","moon","imdb"];function Ge(i,t,e){let s=A(i),n=e/1440;if(t==="months"){if(n<1)return;if(n<30)return h(i,"fun.days",{n:b(n,s)});let c=n/30.4375;return c<24?h(i,"fun.months",{n:b(c,s,1)}):h(i,"fun.years",{n:b(c/12,s,1)})}if(t==="sleep"){let c=e/480;return c<365?c>=2?h(i,"fun.sleep_nights",{n:b(c,s)}):void 0:h(i,"fun.sleep_years",{n:b(c/365.25,s,1)})}let o=$s[t];if(!o)return;let r=e/o;return r>=2?h(i,`fun.${t}`,{n:b(r,s)}):void 0}function jt(i,t,e="rotate",s=Date.now()){if(!(t>=1440))return;if(e!=="rotate")return Ge(i,e,t);let n=ks.filter(r=>Ge(i,r,t));if(!n.length)return;let o=n[Math.floor(s/Ze)%n.length];return Ge(i,o,t)}function Ft(i,t){let e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(i),s=n=>Number(e.find(o=>o.type===n)?.value);return Math.round(Date.UTC(s("year"),s("month")-1,s("day"))/Ze)}function qt(i){let{now:t,lastWatchedIso:e,current:s,timeZone:n,lang:o="en"}=i,r=Ft(t,n),c=e?new Date(e):void 0,a=c&&!isNaN(c.getTime())?Ft(c,n):void 0,d=new Intl.DateTimeFormat(o,{weekday:"narrow",timeZone:"UTC"}),m=[];for(let f=6;f>=0;f--){let _=r-f,$=a!==void 0&&s>0&&_<=a&&_>a-s;m.push({label:d.format(new Date(_*Ze)),filled:$,today:f===0})}let u=m[6].filled;return{days:m,todayFilled:u,stillTimeToday:!u&&s>0&&a===r-1}}function Je(i,t){let e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(i),s=n=>e.find(o=>o.type===n)?.value??"";return`${s("year")}-${s("month")}-${s("day")}`}function Re(i,t,e){return new Intl.DateTimeFormat(t,{weekday:e,timeZone:"UTC"}).format(new Date(`${i}T00:00:00Z`))}function Bt(i,t,e,s){let n=new Date(i);if(!Number.isNaN(n.getTime()))try{return new Intl.DateTimeFormat(t,{hour:"numeric",minute:"2-digit",timeZone:e,hour12:s}).format(n)}catch{return}}function I(i){return i.tmdbId!==void 0?`tmdb:${i.tmdbId}`:i.refractId?`refract:${i.refractId}`:`title:${i.title.toLowerCase()}`}var y=i=>typeof i=="number"&&Number.isFinite(i)?i:void 0,Me=i=>{let t=i.filter(e=>e!==void 0);return t.length?t.reduce((e,s)=>e+s,0):void 0};function Qe(i,t){let e=i?.show??{},s=e.title??t;if(!s)return;let n=i?.next_episode??{};return{title:s,year:y(e.year),isAnime:!!e.is_anime,status:typeof i?.status=="string"?i.status:void 0,season:y(n.season),number:y(n.number),episodeName:typeof n.name=="string"?n.name:void 0,aired:n.aired!==!1,premiere:!!n.is_season_premiere,finale:!!n.is_season_finale,midFinale:!!n.is_mid_season_finale,airedEpisodes:y(i?.aired_episodes),remaining:y(i?.remaining_episodes),refractId:typeof e.ids?.refract=="string"?e.ids.refract:void 0,tmdbId:y(e.ids?.tmdb),posterUrl:typeof i?.poster_url=="string"&&i.poster_url?i.poster_url:void 0}}var Kt=["completed","up_to_date","in_progress","planned","on_hold","dropped"],Ss={watchlist:"planned",paused:"on_hold",onhold:"on_hold",abandoned:"dropped"};function As(i){if(!i||typeof i!="object"||Array.isArray(i))return;let t=new Map;for(let[s,n]of Object.entries(i)){let o=y(n);if(o===void 0||o<=0)continue;let r=s.trim().toLowerCase().replace(/[\s-]+/g,"_"),c=Ss[r]??r;t.set(c,(t.get(c)??0)+o)}if(!t.size)return;let e=s=>{let n=Kt.indexOf(s);return n===-1?Kt.length:n};return[...t.entries()].map(([s,n])=>({key:s,count:n})).sort((s,n)=>e(s.key)-e(n.key)||s.key.localeCompare(n.key))}function Vt(i,t,e){let s=v=>{let g=t.entities[v];return g?i.states[g]:void 0},n=v=>de(s(v)),o=Object.keys(t.entities).length>0,r=zt(e.name??Ht(i,t)),c=n("movies"),a=n("tv_shows"),d=n("anime"),m=n("library_total")??Me([c,a,d]),u=n("completed"),f=n("in_progress"),_=n("up_to_date"),$=n("watchlist"),Q=Me([u,f,_,$]),Zt=m!==void 0&&Q!==void 0?Math.max(0,m-Q):void 0,Jt=As(s("library_total")?.attributes?.by_status),st=n("stats_watch_time_shows_minutes"),nt=n("stats_watch_time_movies_minutes"),it=n("stats_watch_time_anime_minutes"),Qt=n("stats_watch_time_total_minutes")??Me([st,nt,it]),K=s("last_watched"),Xt=he(K)?{iso:K.state,title:typeof K.attributes.title=="string"?K.attributes.title:void 0,season:y(K.attributes.season),episode:y(K.attributes.episode)}:void 0,fe=n("stats_streak_current_days"),es=n("stats_streak_longest_days"),X=s("next_up"),ge={kind:"hidden"};if(X&&X.state!=="unavailable"){let v=he(X)?Qe(X.attributes,X.state):void 0;ge=v?{kind:"item",item:v}:{kind:"empty"}}let ts=ge.kind==="item"?ge.item:void 0,ot,_e=s("last_7_days");if(he(_e)&&Array.isArray(_e.attributes.days)){let v=_e.attributes.days.map(g=>({date:String(g?.date??""),episodes:y(g?.episodes)??0,movies:y(g?.movies)??0})).filter(g=>/^\d{4}-\d{2}-\d{2}$/.test(g.date));if(v.length){let g=_e.attributes.busiest_day;ot={days:v,episodes:v.reduce((k,F)=>k+F.episodes,0),movies:v.reduce((k,F)=>k+F.movies,0),busiest:typeof g?.date=="string"&&y(g?.count)?{date:g.date,count:g.count}:void 0}}}let rt,V=s("average_per_week");if(V&&V.state!=="unavailable"){let v=de(V),g=y(V.attributes.items_per_week);if(v!==void 0||g!==void 0){let k=V.attributes.change_percent;rt={hours:v,itemsPerWeek:g,changePct:typeof k=="number"?k:null,estimated:V.attributes.estimated!==!1}}}let Oe,U=s("catch_up");if(U&&U.state!=="unavailable"&&U.state!=="unknown"){let v=de(U)??0,g=Array.isArray(U.attributes.shows)?U.attributes.shows:[],k=new Map,F=s("shows_waiting");if(F&&Array.isArray(F.attributes.items))for(let w of F.attributes.items){let L=Qe(w);L&&k.set(I(L),L)}let lt=g.map(w=>{let L=y(w?.remaining);if(typeof w?.title!="string"||L===void 0)return;let Pe=typeof w.poster_url=="string"&&w.poster_url?w.poster_url:void 0,dt=typeof w.refract_id=="string"&&w.refract_id?w.refract_id:void 0,ht={title:w.title,year:y(w.year),remaining:L,isAnime:!!w.is_anime,tmdbId:y(w.tmdb_id),refractId:dt,posterUrl:Pe},S=Qe({show:{title:w.title,year:w.year,is_anime:w.is_anime,ids:{tmdb:w.tmdb_id,refract:dt}},next_episode:w.next_episode,aired_episodes:w.aired_episodes,remaining_episodes:L,poster_url:Pe});return S&&(S.season===void 0||S.number===void 0)&&(S=void 0),S??=k.get(I(ht)),S&&(S.season===void 0||S.number===void 0)&&(S=void 0),S&&(S={...S,posterUrl:Pe??S.posterUrl,remaining:S.remaining??L}),{...ht,next:S}}).filter(w=>!!w);Oe={total:v,minutes:y(U.attributes.estimated_minutes),showCount:y(U.attributes.show_count)??lt.length,shows:lt}}let at,De=s("still_to_finish");if(he(De)){let v=De.attributes,g=k=>({count:Math.max(0,y(k?.count)??0),minutes:y(k?.minutes),episodes:y(k?.episodes),notStarted:y(k?.not_started),started:y(k?.started),unknown:y(k?.unknown_episodes)});at={minutes:de(De),movies:g(v.movies),shows:g(v.shows),anime:g(v.anime),estimated:v.estimated!==!1,unknownShows:y(v.unknown_episode_shows)??0}}let ct,ee=s("airing_this_week");ee&&ee.state!=="unavailable"&&ee.state!=="unknown"&&(ct=(Array.isArray(ee.attributes.episodes)?ee.attributes.episodes:[]).map(g=>typeof g?.show=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(String(g?.date))?{date:g.date,show:g.show,season:y(g.season),number:y(g.number),title:typeof g.title=="string"?g.title:void 0,isAnime:!!g.is_anime,premiere:!!g.premiere,finale:!!g.finale,airAt:typeof g.air_at=="string"&&g.air_at?g.air_at:void 0}:void 0).filter(g=>!!g));let ss=!!ts?.posterUrl||!!Oe?.shows.some(v=>v.posterUrl);return{found:o,accountMain:r.main,accountSub:r.sub,last:Xt,minutes:{total:Qt,shows:st,movies:nt,anime:it},library:{total:m,movies:c,shows:a,anime:d,completed:u,inProgress:f,upToDate:_,watchlist:$,other:Zt,statuses:Jt},moviesWatched:n("stats_movies_watched"),episodesWatched:Me([n("stats_shows_episodes_watched"),n("stats_anime_episodes_watched")]),streak:fe!==void 0?{current:fe,longest:Math.max(es??fe,fe)}:void 0,next:ge,last7:ot,average:rt,catchup:Oe,finish:at,airing:ct,hasPosters:ss}}var Yt=ve`
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
`,Gt=ve`
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
`;var N=["hero","watch_time","library","still_to_finish","streak","average","last_7_days","next_up","catchup","airing"];function Ie(i){let t=[];if(Array.isArray(i))for(let e of i)N.includes(e)&&!t.includes(e)&&t.push(e);for(let e of N)t.includes(e)||t.push(e);return t}var Es=["hero","still_to_finish","next_up"];function Xe(i){let t=i??{};return t.section_order!==void 0&&t.section_order!==null||t.show_queue===!1?!0:N.some(e=>t[`show_${e}`]===!1)}function pe(i){let t=i?.layout;return t==="full"||t==="compact"||t==="custom"?t:Xe(i)?"custom":"full"}function et(i,t){if(i==="full")return[...N];if(i==="compact")return N.filter(s=>Es.includes(s));let e=s=>{let n=t[`show_${s}`];return n===void 0?J[`show_${s}`]!==!1:n!==!1};return Ie(t.section_order).filter(e)}var J={layout:"full",library_style:"list",watch_time_style:"list",duration_format:"days_hours",fun_stat:!0,fun_stat_mode:"rotate",queue_length:5,airing_length:5,show_hero:!0,show_watch_time:!0,show_library:!0,show_still_to_finish:!0,show_streak:!0,show_average:!0,show_last_7_days:!0,show_next_up:!0,show_catchup:!0,show_airing:!0,show_posters:!0,show_actions:!1,confirm_actions:!0};var C=class extends M{constructor(){super(...arguments);this._catchupExpanded=!1;this._airingExpanded=!1;this._actionState="idle";this._actionError="";this._actionTarget=""}static async getConfigElement(){return document.createElement(Ee)}static getStubConfig(e){let s=e?.entities??{},n=Object.keys(s).filter(a=>a.startsWith("sensor.")&&s[a].platform===P),o=Object.keys(e?.states??{}).filter(a=>a.startsWith("sensor.refract_")),r=n.length?n:o;return{entity:r.find(a=>a.endsWith("_next_up"))??r[0]??""}}setConfig(e){if(!e||typeof e!="object")throw new Error("Invalid configuration");let s=Object.fromEntries(Object.entries(e).filter(([,n])=>n!=null));s.show_queue!==void 0&&s.show_catchup===void 0&&(s.show_catchup=s.show_queue),this._config=e,this._cfg={...J,...s},this._disc=void 0}getCardSize(){if(!this._cfg)return 12;let e=this._cfg,s=et(pe(this._config),e),n={hero:3,watch_time:2,library:2,still_to_finish:3,streak:3,average:0,last_7_days:3,next_up:3,catchup:2+Math.min(e.queue_length,5),airing:2+Math.min(e.airing_length,5)};return 1+s.reduce((o,r)=>o+n[r],0)}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}shouldUpdate(e){if(!this._config||!this.hass)return!1;if([...e.keys()].some(o=>o!=="hass"))return!0;let n=e.get("hass");if(!n||n.locale!==this.hass.locale||n.entities!==this.hass.entities||n.devices!==this.hass.devices)return!0;for(let o of Object.values(this._discovery().entities))if(n.states[o]!==this.hass.states[o])return!0;return!1}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._actionTimer)}_discovery(){let e=this.hass,s=this._config;return(!this._disc||!this._discFor||this._discFor.config!==s||this._discFor.entities!==e.entities||this._discFor.devices!==e.devices||Object.keys(this._disc.entities).length===0)&&(this._disc=Lt(e,s),this._discFor={config:s,entities:e.entities,devices:e.devices}),this._disc}render(){if(!this._config||!this.hass)return p;let e=this._cfg;if(!e.entity&&!e.device_id&&!e.entities)return this._message(h(this.hass,"empty.no_entity"));let s=this._discovery(),n=Vt(this.hass,s,e);if(!n.found)return this._message(h(this.hass,"empty.not_found",{entity:e.entity??e.device_id??""}));let o=e.show_posters&&n.hasPosters,r={hero:()=>this._hero(n),watch_time:()=>this._watchTime(n),still_to_finish:()=>this._finish(n),library:()=>this._library(n),streak:()=>n.streak?this._streak(n):p,average:()=>this._average(n),last_7_days:()=>this._last7(n),next_up:()=>this._next(n,o),catchup:()=>this._catchup(n,o),airing:()=>this._airing(n)},c=[],a=[],d=()=>{a.length&&c.push(l`<div class="grid">${a}</div>`),a=[]};for(let m of et(pe(this._config),e)){let u=r[m]();u!==p&&(m==="streak"||m==="average"?a.push(u):(d(),c.push(u)))}return d(),l`<ha-card style=${It(this._colorVars())}> ${this._header(n)} ${c} </ha-card>`}_message(e){return l`<ha-card><div class="empty" style="padding:16px">${e}</div></ha-card>`}_colorVars(){let e=this._cfg,s={};return e.color_movies&&(s["--refract-color-movies"]=e.color_movies),e.color_shows&&(s["--refract-color-shows"]=e.color_shows),e.color_anime&&(s["--refract-color-anime"]=e.color_anime),e.color_accent&&(s["--refract-color-accent"]=e.color_accent),s}_header(e){let s=e.last,n=s?.season!==void 0&&s?.episode!==void 0?` S${s.season} E${s.episode}`:"";return l`<div class="header">
      <div class="brand">
        <ha-icon icon="mdi:chart-donut"></ha-icon>
        <span class="name">${e.accountMain}</span>
        ${e.accountSub?l`<span class="sub">${e.accountSub}</span>`:p}
      </div>
      ${s?l`<span class="last" title="${h(this.hass,"header.last_watched")}">
            ${s.title?l`${s.title}${n} · `:p}<ha-relative-time
              .hass=${this.hass}
              .datetime=${s.iso}
            ></ha-relative-time>
          </span>`:p}
    </div>`}_hero(e){let s=A(this.hass),n=this._cfg,o=e.minutes.total,c=[[h(this.hass,"hero.library"),e.library.total],[h(this.hass,"hero.movies_seen"),e.moviesWatched],[h(this.hass,"hero.episodes"),e.episodesWatched]].filter(([,d])=>d!==void 0);if(o===void 0&&c.length===0)return p;let a=n.fun_stat&&o!==void 0?jt(this.hass,o,n.fun_stat_mode):void 0;return l`<div>
      <div class="hero">
        ${o!==void 0?l`<div class="hero-main">
              <div class="label">${h(this.hass,"hero.total")}</div>
              <div class="big">
                ${Ce(o,n.duration_format,s).map((d,m)=>l`<span class="part"
                        ><span class="num ${m>0?"second":""}">${d.value}</span>
                        <span class="unit">${h(this.hass,d.unit)}</span></span
                      >
                    `)}
              </div>
              ${a?l`<div class="fun"><ha-icon icon="mdi:shimmer"></ha-icon><span>${a}</span></div>`:p}
            </div>`:p}
        ${c.length?l`<div class="tiles">
              ${c.map(([d,m])=>l`<div class="tile">
                    <div class="label">${d}</div>
                    <div class="value">${b(m,s)}</div>
                  </div>`)}
            </div>`:p}
      </div>
    </div>`}_library(e){let s=A(this.hass),n=e.library,o={completed:"var(--c-completed)",up_to_date:"var(--c-up-to-date)",in_progress:"var(--c-in-progress)",planned:"var(--c-watchlist)",on_hold:"var(--c-on-hold)",dropped:"var(--c-dropped)"},r={planned:"status.watchlist"},c=f=>{let _=r[f]??`status.${f}`,$=h(this.hass,_);if($!==_)return $;let Q=f.replace(/_/g," ");return Q.charAt(0).toUpperCase()+Q.slice(1)},a=n.statuses?n.statuses.map(f=>[c(f.key),f.count,o[f.key]??"var(--track)"]):[["status.completed",n.completed,"var(--c-completed)"],["status.up_to_date",n.upToDate,"var(--c-up-to-date)"],["status.in_progress",n.inProgress,"var(--c-in-progress)"],["status.watchlist",n.watchlist,"var(--c-watchlist)"],["status.other",n.other&&n.other>0?n.other:void 0,"var(--track)"]].filter(([,f])=>f!==void 0).map(([f,_,$])=>[h(this.hass,f),_,$]);if(!a.length)return p;let d=this._cfg.library_style==="list",m=a.reduce((f,[,_])=>f+_,0),u=l`<div
      class="status-bar ${d?"spaced":""}"
      role="img"
      aria-label=${a.map(([f,_])=>`${f} ${_}`).join(", ")}
    >
      ${a.map(([,f,_])=>l`<span style="flex:${f} 1 0; background:${_}"></span>`)}
    </div>`;return l`<div class="panel library">
      <div class="label" style="margin-bottom:${d?12:10}px">${h(this.hass,"library.title")}</div>
      ${u}
      ${d?l`<div class="stat-list">
            ${a.map(([f,_,$])=>l`<div class="stat-row">
                <span class="stat-dot" style="background:${$}"></span>
                <span class="stat-name">${f}</span>
                <b class="stat-count">${b(_,s)}</b>
                <span class="stat-pct">${m?Math.round(_/m*100):0}%</span>
              </div>`)}
          </div>`:l`<div class="status-legend">
            ${a.map(([f,_,$])=>l`<span><span class="swatch sm" style="background:${$}"></span>${f} · ${b(_,s)}</span>`)}
          </div>`}
    </div>`}_timeZone(){return this.hass.locale?.time_zone==="server"?this.hass.config?.time_zone:void 0}_hour12(){let e=this.hass.locale?.time_format;return e==="12"?!0:e==="24"?!1:void 0}_streak(e){let s=A(this.hass),n=e.streak,o=h(this.hass,n.current===1?"unit.day":"unit.days"),r=qt({now:new Date,lastWatchedIso:e.last?.iso,current:n.current,timeZone:this._timeZone(),lang:s}),c=n.current===0?h(this.hass,"streak.none"):[h(this.hass,"streak.longest",{n:n.longest,unit:h(this.hass,n.longest===1?"unit.day":"unit.days")}),r.stillTimeToday?h(this.hass,"streak.still_time"):""].filter(Boolean).join(" \xB7 ");return l`<div class="panel streak">
      <div class="label">${h(this.hass,"streak.title")}</div>
      <div class="metric">${b(n.current,s)} <span class="unit">${o}</span></div>
      <div class="dots" role="img" aria-label="${n.current} ${o}">
        ${r.days.map(a=>l`<div class="dot-col ${a.today?"today":""}">
              <span class="dot ${a.filled?"filled":"open"} ${a.today?"today":""}"></span>${a.label}
            </div>`)}
      </div>
      <div class="streak-foot">${c}</div>
    </div>`}_average(e){let s=e.average;if(!s)return p;let n=A(this.hass),o;if(s.hours!==void 0)o=l`${b(s.hours,n,1)} <span class="unit">${h(this.hass,"unit.h")}</span>`;else if(s.itemsPerWeek!==void 0)o=l`${b(s.itemsPerWeek,n,1)} <span class="unit">${h(this.hass,"avg.items_unit")}</span>`;else return p;let r=s.changePct,c=r==null?p:l`<div class="trend ${r>0?"up":r<0?"down":""}">
            ${r>0?"\u25B2":r<0?"\u25BC":"\u2013"} ${Math.abs(r)}% ${h(this.hass,"avg.vs_previous")}
          </div>`;return l`<div class="panel average">
      <div class="label">${h(this.hass,"avg.title")}</div>
      <div class="metric" title=${s.estimated&&s.hours!==void 0?h(this.hass,"avg.estimated"):""}>
        ${s.hours!==void 0&&s.estimated?l`<span class="approx">~</span>`:p}${o}
      </div>
      <div class="avg-mid">
        ${s.hours!==void 0&&s.itemsPerWeek!==void 0?l`<div class="avg-items">
              ${s.itemsPerWeek===1?h(this.hass,"avg.items_line_one"):h(this.hass,"avg.items_line",{n:b(s.itemsPerWeek,n,1)})}
            </div>`:p}
      </div>
      ${c}
    </div>`}_last7(e){let s=e.last7;if(!s)return p;let n=A(this.hass),o=Je(new Date,this._timeZone()),r=s.days.map(u=>u.episodes+u.movies),c=Math.max(1,...r),a=84,d=s.busiest?Re(s.busiest.date,n,"long"):void 0,m=`${h(this.hass,"days7.episodes")} ${s.episodes}, ${h(this.hass,"days7.movies")} ${s.movies}`;return l`<div class="panel last7">
      <div class="panel-head">
        <span class="label">${h(this.hass,"days7.title")}</span>
        ${d?l`<span class="badge accent">${h(this.hass,"days7.busiest",{day:d})}</span>`:p}
      </div>
      <div class="bars" role="img" aria-label=${m}>
        ${s.days.map((u,f)=>{let _=r[f],$=_===0?3:Math.max(8,Math.round(_/c*a));return l`<div class="day ${u.date===o?"today":""}">
            <div class="slot">
              ${u.episodes>0?l`<span class="day-count">${b(u.episodes,n)}</span>`:p}
              <div class="bar ${_===0?"empty":""}" style="height:${$}px">
                ${u.movies?l`<span class="seg movies" style="flex:${u.movies} 1 0"></span>`:p}
                ${u.episodes?l`<span class="seg shows" style="flex:${u.episodes} 1 0"></span>`:p}
              </div>
            </div>
            <span class="day-label">${Re(u.date,n,"narrow")}</span>
          </div>`})}
      </div>
      <div class="legend-row">
        <span><span class="swatch" style="background:var(--c-shows)"></span>${h(this.hass,"days7.episodes")} <b>${b(s.episodes,n)}</b></span>
        <span><span class="swatch" style="background:var(--c-movies)"></span>${h(this.hass,"days7.movies")} <b>${b(s.movies,n)}</b></span>
      </div>
      ${s.episodes+s.movies===0?l`<div class="empty">${h(this.hass,"days7.none")}</div>`:p}
    </div>`}_watchTime(e){let s=A(this.hass),n=this._cfg.duration_format,o=[{key:"library.shows",minutes:e.minutes.shows,color:"var(--c-shows)"},{key:"library.movies",minutes:e.minutes.movies,color:"var(--c-movies)"},{key:"library.anime",minutes:e.minutes.anime,color:"var(--c-anime)"}].filter(a=>a.minutes!==void 0);if(!o.length)return p;let r=Wt(o.map(a=>a.minutes)),c=this._cfg.watch_time_style==="list";return l`<div class="panel">
      <div class="label" style="margin-bottom:${c?12:8}px">${h(this.hass,"watch.title")}</div>
      <div
        class="stack ${c?"spaced":""}"
        role="img"
        aria-label=${o.map((a,d)=>`${h(this.hass,a.key)} ${r[d]}%`).join(", ")}
      >
        ${o.map(a=>l`<span style="flex:${Math.max(a.minutes,0)} 1 0; background:${a.color}"></span>`)}
      </div>
      ${c?l`<div class="stat-list">
            ${o.map((a,d)=>l`<div class="stat-row">
                <span class="stat-dot" style="background:${a.color}"></span>
                <span class="stat-name">${h(this.hass,a.key)}</span>
                <b class="stat-count">${ue(a.minutes,n,s)}</b>
                <span class="stat-pct">${r[d]}%</span>
              </div>`)}
          </div>`:l`<div class="watch-cols">
            ${o.map((a,d)=>l`<div class="watch-col">
                  <div class="row"><span class="swatch" style="background:${a.color}"></span>${h(this.hass,a.key)} · ${r[d]}%</div>
                  <div class="value">${ue(a.minutes,n,s)}</div>
                </div>`)}
          </div>`}
    </div>`}_finish(e){let s=e.finish;if(!s)return p;let n=A(this.hass),o=this._cfg.duration_format,r=(m,u)=>h(this.hass,u===1?`${m}_one`:m,{n:b(u,n)}),c=m=>m===void 0?"":ue(m,o,n),a=[{key:"finish.movies",group:s.movies,color:"var(--c-movies)"},{key:"finish.shows",group:s.shows,color:"var(--c-shows)"},{key:"finish.anime",group:s.anime,color:"var(--c-anime)"}].filter(m=>m.group.count>0),d=s.minutes;return l`<div class="panel finish">
      <div class="label">${h(this.hass,"finish.title")}</div>
      ${a.length?l`${d!==void 0&&d>0?l`<div class="big finish-big">
                    ${Ce(d,o,n).map((m,u)=>l`<span class="part"
                            ><span class="num ${u>0?"second":""}">${m.value}</span>
                            <span class="unit">${h(this.hass,m.unit)}</span></span
                          >
                        `)}
                  </div>`:p}
            <div class="finish-rows">
              ${a.map(m=>{let u=m.group;return l`<div class="finish-row">
                  <div class="finish-name">${r(m.key,u.count)}</div>
                  ${u.minutes!==void 0&&u.minutes>0?l`<span class="finish-time" style="color:${m.color}">${c(u.minutes)}</span>`:p}
                </div>`})}
            </div>`:l`<div class="empty">${h(this.hass,"finish.none")}</div>`}
    </div>`}_poster(e,s,n){let o=(s.trim()[0]??"?").toUpperCase();return l`<div class="poster ${n}" aria-hidden="true">
      <span>${o}</span>
      ${e?l`<img
            src=${e}
            alt=""
            loading="lazy"
            referrerpolicy="no-referrer"
            @error=${r=>r.target.style.display="none"}
          />`:p}
    </div>`}_pickedShow(e){if(!this._selected)return;let s=e.catchup?.shows.find(o=>I(o)===this._selected&&o.next),n=e.next.kind==="item"?I(e.next.item):void 0;if(!s||!this._cfg.show_next_up||I(s)===n){this._selected=void 0;return}return s}_selectShow(e,s){if(!e.next)return;let n=I(e);this._selected=n===s||this._selected===n?void 0:n,this._clearAction(),this.requestUpdate(),this._selected&&this.updateComplete.then(()=>{this.renderRoot.querySelector(".panel.next")?.scrollIntoView?.({block:"nearest",behavior:"smooth"})})}_clearAction(){window.clearTimeout(this._actionTimer),this._actionState="idle",this._actionError="",this._actionTarget=""}_next(e,s){let n=this._pickedShow(e),o=n?{kind:"item",item:n.next}:e.next;if(o.kind==="hidden")return p;if(o.kind==="empty")return l`<div class="panel next">
        <div class="label">${h(this.hass,"next.title")}</div>
        <div class="empty">${h(this.hass,"empty.nothing_up_next")}</div>
      </div>`;let r=o.item,c=A(this.hass),d=[r.season!==void 0&&r.number!==void 0?`S${r.season} E${r.number}`:"",r.episodeName].filter(Boolean).join(" \xB7 "),m=r.airedEpisodes,u=m!==void 0&&r.remaining!==void 0?Math.max(0,m-r.remaining):void 0,f=m&&u!==void 0?Math.min(100,u/m*100):void 0;return l`<div class="panel next ${s?"with-poster":""}">
      ${s?this._poster(r.posterUrl,r.title,"lg"):p}
      <div class="next-body">
        <div class="next-head">
          <span class="label">${h(this.hass,"next.title")}</span>
          ${r.isAnime?l`<span class="badge">${h(this.hass,"badge.anime")}</span>`:p} ${this._badge(r)}
        </div>
        <div class="next-main">
          <div>
            <div class="next-title">
              <span>${r.title}</span>
              ${r.year?l`<span class="year">${r.year}</span>`:p}
            </div>
            ${d?l`<div class="next-ep">${d}</div>`:p}
          </div>
          ${this._actionButton(r)}
        </div>
        ${f!==void 0?l`<div class="progress" role="img" aria-label="${u} / ${m}"><span style="width:${f}%"></span></div>
              <div class="next-foot">
                <span>${h(this.hass,"next.progress",{watched:b(u,c),aired:b(m,c)})}</span>
                ${r.remaining!==void 0?l`<span>${h(this.hass,"next.remaining",{n:b(r.remaining,c)})}</span>`:p}
              </div>`:p}
      </div>
    </div>`}_badge(e){return e.aired?e.premiere?l`<span class="badge accent">${h(this.hass,"badge.premiere")}</span>`:e.finale?l`<span class="badge warn">${h(this.hass,"badge.finale")}</span>`:e.midFinale?l`<span class="badge warn">${h(this.hass,"badge.mid_finale")}</span>`:p:l`<span class="badge">${h(this.hass,"badge.not_aired")}</span>`}_canMarkWatched(e){return this._cfg.show_actions&&!!this.hass.services?.[P]?.mark_episode_watched&&e.aired&&e.season!==void 0&&e.number!==void 0&&(e.tmdbId!==void 0||!!e.refractId)}_actionButton(e){if(!this._canMarkWatched(e))return p;let s=this._actionState,n={idle:"mdi:check",confirm:"mdi:help-circle-outline",busy:"mdi:loading",done:"mdi:check-circle",error:"mdi:alert-circle-outline"}[s],o={idle:"next.mark",confirm:"next.confirm",busy:"next.busy",done:"next.done",error:"next.error"}[s];return l`<button class="action" data-state=${s} title=${this._actionError} @click=${()=>this._markWatched(e)}>
      <ha-icon icon=${n}></ha-icon>${h(this.hass,o)}
    </button>`}_resetActionLater(e){window.clearTimeout(this._actionTimer),this._actionTimer=window.setTimeout(()=>{this._actionState="idle",this._actionError=""},e)}async _configEntryId(){if(this._cfg.config_entry_id)return this._cfg.config_entry_id;let e=this._discovery().entities.next_up??this._cfg.entity;if(e)try{return(await this.hass.callWS({type:"config/entity_registry/get",entity_id:e}))?.config_entry_id}catch{return}}async _markWatched(e){if(this._actionState==="busy")return;let s=`${I(e)}:${e.season}:${e.number}`;if(this._cfg.confirm_actions&&(this._actionState!=="confirm"||this._actionTarget!==s)){this._actionTarget=s,this._actionState="confirm",this._resetActionLater(3e3);return}window.clearTimeout(this._actionTimer),this._actionState="busy";try{let n={season:e.season,number:e.number};e.tmdbId!==void 0?n.tmdb_id=e.tmdbId:n.refract_id=e.refractId;let o=await this._configEntryId();o&&(n.config_entry_id=o),await this.hass.callService(P,"mark_episode_watched",n),this._actionState="done",this._resetActionLater(2500),this._refreshSensors()}catch(n){this._actionError=n instanceof Error?n.message:String(n),this._actionState="error",this._resetActionLater(4e3)}}_refreshSensors(){let e=this._discovery().entities,s=[e.next_up,e.shows_waiting,e.catch_up,e.last_7_days,e.average_per_week,e.last_watched,e.stats_streak_current_days].filter(Boolean);s.length&&this.hass.callService("homeassistant","update_entity",{entity_id:s}).catch(()=>{})}_catchup(e,s){let n=e.catchup;if(!n)return p;let o=A(this.hass),r=this._cfg.queue_length,c=n.shows.length>r,a=this._catchupExpanded?n.shows:n.shows.slice(0,r),d=Math.max(1,...n.shows.map(f=>f.remaining)),m=e.next.kind==="item"?I(e.next.item):void 0,u=n.minutes!==void 0&&n.total>0?`, ${h(this.hass,"catchup.about",{time:ue(n.minutes,this._cfg.duration_format,o)})}`:"";return l`<div class="panel catchup">
      <div class="panel-head">
        <span class="label">${h(this.hass,"catchup.title")}</span>
      </div>
      ${n.total>0?l`<div class="catch-line">
            <span class="metric">${b(n.total,o)}</span>
            <span class="muted">${h(this.hass,"catchup.waiting")}${u}</span>
          </div>`:l`<div class="empty">${h(this.hass,"catchup.none")}</div>`}
      ${a.map(f=>this._catchupRow(f,d,s,o,m))}
      ${c?l`<button class="link" @click=${()=>this._catchupExpanded=!this._catchupExpanded}>
            ${this._catchupExpanded?h(this.hass,"catchup.show_less"):h(this.hass,"catchup.show_all",{n:b(n.shows.length,o)})}
          </button>`:p}
    </div>`}_catchupRow(e,s,n,o,r){let c=I(e),a=this._cfg.show_next_up&&!!e.next&&(c!==r||this._selected!==void 0),d=a&&this._selected===c,m=l`${n?this._poster(e.posterUrl,e.title,"sm"):p}
      <span class="c-name" title=${e.title}>${e.title}</span>
      <div class="progress" role="img" aria-label="${e.remaining}"><span style="width:${e.remaining/s*100}%"></span></div>
      <b class="c-count">${b(e.remaining,o)}</b>`;return a?l`<div
      class="c-row pickable ${d?"selected":""}"
      role="button"
      tabindex="0"
      aria-pressed=${d?"true":"false"}
      title=${h(this.hass,"catchup.pick",{title:e.title})}
      @click=${()=>this._selectShow(e,r)}
      @keydown=${u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),this._selectShow(e,r))}}
    >
      ${m}
    </div>`:l`<div class="c-row">${m}</div>`}_airing(e){let s=e.airing;if(!s)return p;let n=A(this.hass),o=Je(new Date,this._timeZone()),r=this._cfg.airing_length,c=s.length>r,a=this._airingExpanded?s:s.slice(0,r);return l`<div class="panel airing">
      <div class="panel-head"><span class="label">${h(this.hass,"airing.title")}</span></div>
      ${a.length?a.map(d=>{let m=d.season!==void 0&&d.number!==void 0?`S${d.season} \xB7 E${d.number}`:"",u=d.airAt?Bt(d.airAt,n,this._timeZone(),this._hour12()):void 0;return l`<div class="a-row">
              <span class="a-day ${d.date===o?"today":""}">${d.date===o?h(this.hass,"airing.today"):Re(d.date,n,"short")}</span>
              <span class="swatch" style="background:${d.isAnime?"var(--c-anime)":"var(--c-shows)"}"></span>
              <span class="a-name"><b>${d.show}</b>${m?l` <span class="muted">${m}</span>`:p}</span>
              ${d.premiere?l`<span class="badge accent">${h(this.hass,"badge.premiere")}</span>`:d.finale?l`<span class="badge warn">${h(this.hass,"badge.finale")}</span>`:p}
              ${u?l`<span class="a-time">${u}</span>`:p}
            </div>`}):l`<div class="empty">${h(this.hass,"airing.none")}</div>`}
      ${c?l`<button class="link" @click=${()=>this._airingExpanded=!this._airingExpanded}>
            ${this._airingExpanded?h(this.hass,"airing.show_less"):h(this.hass,"airing.show_all",{n:b(s.length,n)})}
          </button>`:p}
    </div>`}};C.styles=Yt,E([Z({attribute:!1})],C.prototype,"hass",2),E([H()],C.prototype,"_config",2),E([H()],C.prototype,"_catchupExpanded",2),E([H()],C.prototype,"_airingExpanded",2),E([H()],C.prototype,"_actionState",2),E([H()],C.prototype,"_actionError",2),C=E([Se(le)],C);var R={entity:"Refract entity",name:"Name (optional)",layout:"Layout",library_style:"Library style",watch_time_style:"Watch time style",duration_format:"Duration format",queue_length:"Catch-up rows",airing_length:"Airing rows",fun_stat:"Show fun stat",fun_stat_mode:"Fun stat",show_hero:"Watch time summary",show_watch_time:"Watch time split",show_library:"Library",show_still_to_finish:"Still to finish",show_streak:"Streak",show_average:"Average per week",show_last_7_days:"Last 7 days",show_next_up:"Next up",show_catchup:"Catch-up backlog",show_airing:"Airing this week",show_posters:"Posters",show_actions:"Show \u201CMark watched\u201D button",confirm_actions:"Ask before marking watched",color_movies:"Movies color",color_shows:"TV shows color",color_anime:"Anime color",color_accent:"Accent color"},tt={hero:R.show_hero,watch_time:R.show_watch_time,library:R.show_library,still_to_finish:R.show_still_to_finish,streak:R.show_streak,average:R.show_average,last_7_days:R.show_last_7_days,next_up:R.show_next_up,catchup:R.show_catchup,airing:R.show_airing},Ts={entity:"Pick any entity of your Refract account. The card finds the rest.",show_actions:"Needs an API key that can mark episodes watched.",show_posters:"Needs a TMDB API key in the Refract integration options.",show_last_7_days:"Needs watch history turned on in the integration options.",show_average:"Needs watch history turned on in the integration options.",color_movies:"Hex color such as #2a78d6. Leave empty for the default."},x=(i,t)=>({value:i,label:t}),me=i=>({select:{mode:"dropdown",options:i}}),Cs=i=>[{name:"entity",required:!0,selector:{entity:{integration:P,domain:"sensor"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"layout",selector:me([x("full","Full"),x("compact","Compact"),x("custom","Custom")])},{name:"duration_format",selector:me([x("days_hours","Days and hours"),x("hours","Hours only"),x("auto","Automatic")])},{name:"watch_time_style",selector:me([x("bar","Compact bar"),x("list","Breakdown list")])},{name:"library_style",selector:me([x("bar","Compact bar"),x("list","Breakdown list")])},{name:"queue_length",selector:{number:{min:1,max:20,mode:"box"}}},{name:"airing_length",selector:{number:{min:1,max:20,mode:"box"}}}]},...i?[{type:"expandable",name:"",title:"Sections",icon:"mdi:view-dashboard-outline",schema:[{type:"grid",name:"",schema:[{name:"show_hero",selector:{boolean:{}}},{name:"show_watch_time",selector:{boolean:{}}},{name:"show_library",selector:{boolean:{}}},{name:"show_still_to_finish",selector:{boolean:{}}},{name:"show_streak",selector:{boolean:{}}},{name:"show_average",selector:{boolean:{}}},{name:"show_last_7_days",selector:{boolean:{}}},{name:"show_next_up",selector:{boolean:{}}},{name:"show_catchup",selector:{boolean:{}}},{name:"show_airing",selector:{boolean:{}}}]}]}]:[],{name:"show_posters",selector:{boolean:{}}},{type:"expandable",name:"",title:"Fun stat",icon:"mdi:shimmer",schema:[{name:"fun_stat",selector:{boolean:{}}},{name:"fun_stat_mode",selector:me([x("rotate","Rotate daily"),x("months","Months of nonstop viewing"),x("workweeks","Full-time work weeks"),x("lotr","Lord of the Rings marathons"),x("flights","Flights around the world"),x("sleep","Nights of sleep"),x("movies","Average movies back to back"),x("seasons","Full TV seasons"),x("marathons","Marathons run"),x("moon","Trips to the Moon"),x("imdb","IMDb Top 250 runs")])}]},{type:"expandable",name:"",title:"Next up actions",icon:"mdi:gesture-tap-button",schema:[{name:"show_actions",selector:{boolean:{}}},{name:"confirm_actions",selector:{boolean:{}}}]},{type:"expandable",name:"",title:"Colors",icon:"mdi:palette-outline",schema:[{type:"grid",name:"",schema:[{name:"color_movies",selector:{text:{}}},{name:"color_shows",selector:{text:{}}},{name:"color_anime",selector:{text:{}}},{name:"color_accent",selector:{text:{}}}]}]}],B=class extends M{constructor(){super(...arguments);this._resetOrder=()=>this._setOrder([...N])}setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return p;let e=pe(this._config),s={...J,...this._config,layout:e};this._config.show_queue!==void 0&&this._config.show_catchup===void 0&&(s.show_catchup=this._config.show_queue);let n=!!this._config.show_actions&&!this.hass.services?.[P]?.mark_episode_watched,o=Cs(e==="custom"),r=e==="custom"?o.findIndex(a=>a.title==="Sections")+1:o.length,c=a=>l`<ha-form
      .hass=${this.hass}
      .data=${s}
      .schema=${a}
      .computeLabel=${d=>R[d.name]??d.name}
      .computeHelper=${d=>Ts[d.name]}
      @value-changed=${this._valueChanged}
    ></ha-form>`;return l`<div class="wrap">
      ${c(o.slice(0,r))} ${e==="custom"?this._orderPanel():p}
      ${r<o.length?c(o.slice(r)):p}
      ${n?l`<ha-alert alert-type="warning">
            The button stays hidden until the <code>refract.mark_episode_watched</code> action is available. Check
            that your Refract API key allows marking episodes and movies as watched.
          </ha-alert>`:p}
    </div>`}_orderPanel(){let e=Ie(this._config?.section_order),s=e.every((n,o)=>n===N[o]);return l`<ha-expansion-panel outlined header="Section order" .leftChevron=${!0}>
      <div class="order">
        <div class="hint">Use the arrows to move a section up or down. The header always stays on top.</div>
        ${e.map((n,o)=>l`<div class="order-row">
            <span class="order-name">${tt[n]}</span>
            <ha-icon-button
              label="Move up"
              aria-label="Move ${tt[n]} up"
              ?disabled=${o===0}
              @click=${()=>this._move(o,-1)}
              ><ha-icon icon="mdi:arrow-up"></ha-icon
            ></ha-icon-button>
            <ha-icon-button
              label="Move down"
              aria-label="Move ${tt[n]} down"
              ?disabled=${o===e.length-1}
              @click=${()=>this._move(o,1)}
              ><ha-icon icon="mdi:arrow-down"></ha-icon
            ></ha-icon-button>
          </div>`)}
        ${s?p:l`<button class="order-reset" @click=${this._resetOrder}>Reset to default order</button>`}
      </div>
    </ha-expansion-panel>`}_move(e,s){let n=Ie(this._config?.section_order),o=e+s;o<0||o>=n.length||([n[e],n[o]]=[n[o],n[e]],this._setOrder(n))}_setOrder(e){if(!this._config)return;let s={...this._config};e.every((n,o)=>n===N[o])?delete s.section_order:s.section_order=e,this._config=s,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}_valueChanged(e){if(e.stopPropagation(),!this._config)return;let s=e.detail.value,n=J,o={type:this._config.type};for(let[c,a]of Object.entries(s))a===""||a===void 0||a===null||c in n&&a===n[c]||(o[c]=a);delete o.streak_style,delete o.show_streak_toggle,delete o.show_queue;let r=this._config;for(let c of["device_id","config_entry_id","entities","section_order"])r[c]!==void 0&&o[c]===void 0&&(o[c]=r[c]);o.layout===void 0&&s.layout==="full"&&Xe(o)&&(o.layout="full"),this._config=o,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0}))}};B.styles=Gt,E([Z({attribute:!1})],B.prototype,"hass",2),E([H()],B.prototype,"_config",2),B=E([Se(Ee)],B);window.customCards=window.customCards||[];window.customCards.some(i=>i.type===le)||window.customCards.push({type:le,name:h(void 0,"card.name"),description:h(void 0,"card.description"),preview:!0,documentationURL:Ot});console.info(`%c REFRACT-STATS-CARD %c v${Dt} `,"color:white;background:#6250d6;font-weight:500;border-radius:3px 0 0 3px","color:#6250d6;background:#eee;font-weight:500;border-radius:0 3px 3px 0");
