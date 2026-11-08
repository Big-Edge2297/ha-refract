var as=Object.defineProperty;var cs=Object.getOwnPropertyDescriptor;var T=(i,t,e,s)=>{for(var n=s>1?void 0:s?cs(t,e):t,o=i.length-1,r;o>=0;o--)(r=i[o])&&(n=(s?r(t,e,n):r(n))||n);return s&&n&&as(t,e,n),n};var ve=globalThis,we=ve.ShadowRoot&&(ve.ShadyCSS===void 0||ve.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,He=Symbol(),gt=new WeakMap,ie=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==He)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(we&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=gt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&gt.set(e,t))}return t}toString(){return this.cssText}},_t=i=>new ie(typeof i=="string"?i:i+"",void 0,He),xe=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,n,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[o+1],i[0]);return new ie(e,i,He)},yt=(i,t)=>{if(we)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),n=ve.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},Fe=we?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return _t(e)})(i):i;var{is:ls,defineProperty:ds,getOwnPropertyDescriptor:ps,getOwnPropertyNames:hs,getOwnPropertySymbols:us,getPrototypeOf:ms}=Object,$e=globalThis,bt=$e.trustedTypes,fs=bt?bt.emptyScript:"",gs=$e.reactiveElementPolyfillSupport,oe=(i,t)=>i,re={toAttribute(i,t){switch(t){case Boolean:i=i?fs:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},ke=(i,t)=>!ls(i,t),vt={attribute:!0,type:String,converter:re,reflect:!1,useDefault:!1,hasChanged:ke};Symbol.metadata??=Symbol("metadata"),$e.litPropertyMetadata??=new WeakMap;var O=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=vt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&ds(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){let{get:n,set:o}=ps(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:n,set(r){let c=n?.call(this);o?.call(this,r),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??vt}static _$Ei(){if(this.hasOwnProperty(oe("elementProperties")))return;let t=ms(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(oe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oe("properties"))){let e=this.properties,s=[...hs(e),...us(e)];for(let n of s)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let n of s)e.unshift(Fe(n))}else t!==void 0&&e.push(Fe(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return yt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:re).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let o=s.getPropertyOptions(n),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:re;this._$Em=n;let c=r.fromAttribute(e,o.type);this[n]=c??this._$Ej?.get(n)??c,this._$Em=null}}requestUpdate(t,e,s,n=!1,o){if(t!==void 0){let r=this.constructor;if(n===!1&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??ke)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,o]of s){let{wrapped:r}=o,c=this[n];r!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,o,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[oe("elementProperties")]=new Map,O[oe("finalized")]=new Map,gs?.({ReactiveElement:O}),($e.reactiveElementVersions??=[]).push("2.1.2");var Ge=globalThis,wt=i=>i,Se=Ge.trustedTypes,xt=Se?Se.createPolicy("lit-html",{createHTML:i=>i}):void 0,Tt="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,Ct="?"+F,_s=`<${Ct}>`,B=document,ce=()=>B.createComment(""),le=i=>i===null||typeof i!="object"&&typeof i!="function",Ye=Array.isArray,ys=i=>Ye(i)||typeof i?.[Symbol.iterator]=="function",We=`[ 	
\f\r]`,ae=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$t=/-->/g,kt=/>/g,K=RegExp(`>|${We}(?:([^\\s"'>=/]+)(${We}*=${We}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),St=/'/g,At=/"/g,Rt=/^(?:script|style|textarea|title)$/i,Ze=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),d=Ze(1),Hs=Ze(2),Fs=Ze(3),N=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Et=new WeakMap,j=B.createTreeWalker(B,129);function Pt(i,t){if(!Ye(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return xt!==void 0?xt.createHTML(t):t}var bs=(i,t)=>{let e=i.length-1,s=[],n,o=t===2?"<svg>":t===3?"<math>":"",r=ae;for(let c=0;c<e;c++){let a=i[c],h,m,l=-1,f=0;for(;f<a.length&&(r.lastIndex=f,m=r.exec(a),m!==null);)f=r.lastIndex,r===ae?m[1]==="!--"?r=$t:m[1]!==void 0?r=kt:m[2]!==void 0?(Rt.test(m[2])&&(n=RegExp("</"+m[2],"g")),r=K):m[3]!==void 0&&(r=K):r===K?m[0]===">"?(r=n??ae,l=-1):m[1]===void 0?l=-2:(l=r.lastIndex-m[2].length,h=m[1],r=m[3]===void 0?K:m[3]==='"'?At:St):r===At||r===St?r=K:r===$t||r===kt?r=ae:(r=K,n=void 0);let g=r===K&&i[c+1].startsWith("/>")?" ":"";o+=r===ae?a+_s:l>=0?(s.push(h),a.slice(0,l)+Tt+a.slice(l)+F+g):a+F+(l===-2?c:g)}return[Pt(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},de=class i{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let o=0,r=0,c=t.length-1,a=this.parts,[h,m]=bs(t,e);if(this.el=i.createElement(h,s),j.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(n=j.nextNode())!==null&&a.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(let l of n.getAttributeNames())if(l.endsWith(Tt)){let f=m[r++],g=n.getAttribute(l).split(F),x=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:x[2],strings:g,ctor:x[1]==="."?je:x[1]==="?"?Be:x[1]==="@"?qe:Z}),n.removeAttribute(l)}else l.startsWith(F)&&(a.push({type:6,index:o}),n.removeAttribute(l));if(Rt.test(n.tagName)){let l=n.textContent.split(F),f=l.length-1;if(f>0){n.textContent=Se?Se.emptyScript:"";for(let g=0;g<f;g++)n.append(l[g],ce()),j.nextNode(),a.push({type:2,index:++o});n.append(l[f],ce())}}}else if(n.nodeType===8)if(n.data===Ct)a.push({type:2,index:o});else{let l=-1;for(;(l=n.data.indexOf(F,l+1))!==-1;)a.push({type:7,index:o}),l+=F.length-1}o++}}static createElement(t,e){let s=B.createElement("template");return s.innerHTML=t,s}};function Y(i,t,e=i,s){if(t===N)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl,o=le(t)?void 0:t._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),o===void 0?n=void 0:(n=new o(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=n:e._$Cl=n),n!==void 0&&(t=Y(i,n._$AS(i,t.values),n,s)),t}var Ke=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??B).importNode(e,!0);j.currentNode=n;let o=j.nextNode(),r=0,c=0,a=s[0];for(;a!==void 0;){if(r===a.index){let h;a.type===2?h=new pe(o,o.nextSibling,this,t):a.type===1?h=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(h=new Ve(o,this,t)),this._$AV.push(h),a=s[++c]}r!==a?.index&&(o=j.nextNode(),r++)}return j.currentNode=B,n}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},pe=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),le(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==N&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ys(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&le(this._$AH)?this._$AA.nextSibling.data=t:this.T(B.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=de.createElement(Pt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{let o=new Ke(n,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=Et.get(t.strings);return e===void 0&&Et.set(t.strings,e=new de(t)),e}k(t){Ye(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,n=0;for(let o of t)n===e.length?e.push(s=new i(this.O(ce()),this.O(ce()),this,this.options)):s=e[n],s._$AI(o),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=wt(t).nextSibling;wt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(t,e=this,s,n){let o=this.strings,r=!1;if(o===void 0)t=Y(this,t,e,0),r=!le(t)||t!==this._$AH&&t!==N,r&&(this._$AH=t);else{let c=t,a,h;for(t=o[0],a=0;a<o.length-1;a++)h=Y(this,c[s+a],e,a),h===N&&(h=this._$AH[a]),r||=!le(h)||h!==this._$AH[a],h===u?t=u:t!==u&&(t+=(h??"")+o[a+1]),this._$AH[a]=h}r&&!n&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},je=class extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},Be=class extends Z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},qe=class extends Z{constructor(t,e,s,n,o){super(t,e,s,n,o),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??u)===N)return;let s=this._$AH,n=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==u&&(s===u||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ve=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}};var vs=Ge.litHtmlPolyfillSupport;vs?.(de,pe),(Ge.litHtmlVersions??=[]).push("3.3.3");var Mt=(i,t,e)=>{let s=e?.renderBefore??t,n=s._$litPart$;if(n===void 0){let o=e?.renderBefore??null;s._$litPart$=n=new pe(t.insertBefore(ce(),o),o,void 0,e??{})}return n._$AI(i),n};var Je=globalThis,I=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return N}};I._$litElement$=!0,I.finalized=!0,Je.litElementHydrateSupport?.({LitElement:I});var ws=Je.litElementPolyfillSupport;ws?.({LitElement:I});(Je.litElementVersions??=[]).push("4.2.2");var xs={attribute:!0,type:String,converter:re,reflect:!1,hasChanged:ke},$s=(i=xs,t,e)=>{let{kind:s,metadata:n}=e,o=globalThis.litPropertyMetadata.get(n);if(o===void 0&&globalThis.litPropertyMetadata.set(n,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),s==="accessor"){let{name:r}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(r,a,i,!0,c)},init(c){return c!==void 0&&this.C(r,void 0,i,c),c}}}if(s==="setter"){let{name:r}=e;return function(c){let a=this[r];t.call(this,c),this.requestUpdate(r,a,i,!0,c)}}throw Error("Unsupported decorator location: "+s)};function J(i){return(t,e)=>typeof e=="object"?$s(i,t,e):((s,n,o)=>{let r=n.hasOwnProperty(o);return n.constructor.createProperty(o,s),r?Object.getOwnPropertyDescriptor(n,o):void 0})(i,t,e)}function W(i){return J({...i,state:!0,attribute:!1})}var Ee=i=>t=>{if(customElements.get(i)){console.warn(`[refract-stats-card] <${i}> is already registered, probably by the standalone HACS card. Remove that copy to use the card that ships with the Refract integration.`);return}customElements.define(i,t)};var It={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Dt=i=>(...t)=>({_$litDirective$:i,values:t}),Te=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Ot="important",ks=" !"+Ot,Nt=Dt(class extends Te{constructor(i){if(super(i),i.type!==It.ATTRIBUTE||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let n=t[s];if(n!=null){this.ft.add(s);let o=typeof n=="string"&&n.endsWith(ks);s.includes("-")||o?e.setProperty(s,o?n.slice(0,-11):n,o?Ot:""):e[s]=n}}return N}});var he="refract-stats-card",Ce="refract-stats-card-editor",U="refract",Ut="https://github.com/Big-Edge2297/ha-refract/blob/main/docs/dashboard-card.md",Lt="0.5.2",Re=["library_total","completed","in_progress","watchlist","up_to_date","movies","tv_shows","anime","last_watched","shows_waiting","next_up","username","catch_up","last_7_days","average_per_week","airing_this_week","top_picks","still_to_finish","stats_anime_episodes_watched","stats_anime_titles","stats_movies_watched","stats_shows_episodes_watched","stats_shows_titles","stats_streak_current_days","stats_streak_longest_days","stats_watch_time_anime_minutes","stats_watch_time_movies_minutes","stats_watch_time_shows_minutes","stats_watch_time_total_minutes"];var Ss=[...Re].sort((i,t)=>t.length-i.length),zt=new Set(Re),Pe={most_watched:"top_picks"},As=Object.keys(Pe).sort((i,t)=>t.length-i.length);function Ht(i){for(let t of Ss){if(i===t)return{key:t,prefix:""};if(i.endsWith(`_${t}`))return{key:t,prefix:i.slice(0,i.length-t.length)}}for(let t of As){if(i===t)return{key:Pe[t],prefix:""};if(i.endsWith(`_${t}`))return{key:Pe[t],prefix:i.slice(0,i.length-t.length)}}}var Ft=i=>i.slice(i.indexOf(".")+1);function Wt(i,t){let e={entities:{}},s=i.entities,n=t.entity;if(e.deviceId=t.device_id,n&&s?.[n]?.device_id&&(e.deviceId=s[n].device_id),e.deviceId&&s)for(let[o,r]of Object.entries(s)){if(r.device_id!==e.deviceId||!o.startsWith("sensor.")||r.platform&&r.platform!==U)continue;let c=r.translation_key&&zt.has(r.translation_key)?r.translation_key:void 0,a=c?{key:c,prefix:void 0}:Ht(Ft(o));a&&(e.entities[a.key]||(e.entities[a.key]=o),e.prefix===void 0&&a.prefix!==void 0&&(e.prefix=a.prefix))}if(n){let o=Ht(Ft(n));if(o){e.prefix??=o.prefix;for(let r of Re){let c=`sensor.${o.prefix}${r}`;!e.entities[r]&&i.states[c]&&(e.entities[r]=c)}for(let[r,c]of Object.entries(Pe)){let a=`sensor.${o.prefix}${r}`;!e.entities[c]&&i.states[a]&&(e.entities[c]=a)}}}for(let[o,r]of Object.entries(t.entities??{}))zt.has(o)&&typeof r=="string"&&(e.entities[o]=r);return e}function Kt(i){if(!i)return{main:"Refract"};let t=i.match(/^(.*?)\s*\(([^)]*)\)\s*$/);return t&&t[1]?{main:t[1],sub:t[2]||void 0}:{main:i}}function jt(i,t){let e=t.deviceId?i.devices?.[t.deviceId]:void 0,s=e?.name_by_user||e?.name;if(s)return s;for(let n of Object.values(t.entities)){let r=i.states[n]?.attributes?.friendly_name?.match(/^(.*?\([^)]*\))/);if(r)return r[1]}}var Qe={"card.name":"Refract stats","card.description":"Watch time, library, streak and what to watch next from your Refract account.","empty.no_entity":"Choose a Refract entity to get started.","empty.not_found":"Couldn't find any Refract entities for {entity}.","empty.nothing_up_next":"Nothing up next. Add a show or mark an episode watched.","hero.total":"Total watch time","hero.library":"Library","hero.movies_seen":"Movies seen","hero.episodes":"Episodes watched","unit.days":"days","unit.day":"day","unit.hours":"hours","unit.hour":"hour","unit.min":"min","unit.h":"h","header.last_watched":"Last watched","library.title":"Library","library.titles":"titles","library.movies":"Movies","library.shows":"TV shows","library.anime":"Anime","status.completed":"Watched","status.up_to_date":"Up to Date","status.watchlist":"Plan to Watch","status.in_progress":"Watching","status.on_hold":"On Hold","status.dropped":"Dropped","status.other":"Other","watch.title":"Watch time","finish.title":"Still to finish","finish.none":"Nothing left to finish","finish.movies":"{n} movies to finish","finish.movies_one":"1 movie to finish","finish.shows":"{n} TV shows to finish","finish.shows_one":"1 TV show to finish","finish.anime":"{n} anime to finish","finish.anime_one":"1 anime to finish","streak.title":"Streak","streak.longest":"Longest: {n} {unit}","streak.best":"Best {n}","streak.still_time":"still time today","streak.none":"No active streak","next.title":"Next up","next.progress":"{watched} of {aired} aired episodes","next.remaining":"{n} remaining","next.mark":"Mark watched","next.confirm":"Mark watched?","next.busy":"Marking\u2026","next.done":"Marked","next.error":"Couldn't mark watched","avg.title":"Average per week","avg.vs_previous":"vs previous 4 weeks","avg.estimated":"Estimated from your average runtime","avg.items_unit":"a week","avg.items_line":"{n} episodes and movies a week","avg.items_line_one":"1 episode or movie a week","days7.title":"Last 7 days","days7.busiest":"Busiest day \xB7 {day}","days7.episodes":"Episodes","days7.movies":"Movies","days7.none":"Nothing watched in the last 7 days","catchup.title":"Catch-up backlog","catchup.pick":"Show {title} in Next up","catchup.waiting":"aired episodes waiting","catchup.about":"about {time}","catchup.none":"You're all caught up","catchup.show_all":"Show all {n}","catchup.show_less":"Show less","airing.title":"Airing this week","airing.today":"Today","airing.none":"Nothing airing in the next 7 days","airing.show_all":"Show all {n}","airing.show_less":"Show less","badge.premiere":"Premiere","badge.finale":"Finale","badge.mid_finale":"Mid-season finale","badge.not_aired":"Not aired","badge.anime":"Anime","picks.title":"Most watched","picks.actor":"Actor","picks.director":"Director","picks.writer":"Writer","picks.decade":"Decade","picks.genre":"Genre","picks.country":"Country","picks.sub_one":"{n} title \xB7 {time}","picks.sub_other":"{n} titles \xB7 {time}","picks.based_on":"Based on {n} of {total} titles","picks.building":"Still building","picks.waiting":"Collecting details from TMDB. This fills in over the next few updates.","picks.none":"Nothing to show yet.","fun.months":"That's about {n} months of nonstop viewing","fun.years":"That's about {n} years of nonstop viewing","fun.days":"That's about {n} days of nonstop viewing","fun.workweeks":"That's about {n} full-time work weeks","fun.lotr":"Enough for the extended Lord of the Rings trilogy about {n} times","fun.flights":"Enough time to fly around the world about {n} times","fun.sleep_nights":"That's about {n} nights of sleep","fun.sleep_years":"That's about {n} years of sleep at 8 hours a night","fun.movies":"That's about {n} average movies back to back","fun.seasons":"That's about {n} full 22-episode TV seasons","fun.marathons":"Enough time to run about {n} marathons","fun.moon":"Enough for about {n} one-way trips to the Moon","fun.imdb":"Enough to watch the whole IMDb Top 250 about {n} times"},Es={en:Qe};function E(i){return i?.locale?.language||i?.language||"en"}function p(i,t,e={}){let s=E(i).split("-")[0],o=(Es[s]??Qe)[t]??Qe[t]??t;for(let[r,c]of Object.entries(e))o=o.replace(`{${r}}`,String(c));return o}var et=864e5;function Q(i){if(!i)return;let t=i.state;if(t==="unknown"||t==="unavailable"||t===""||t==null)return;let e=Number(t);return Number.isFinite(e)?e:void 0}function X(i){return!!i&&i.state!=="unavailable"&&i.state!=="unknown"}function v(i,t="en",e=0){try{return new Intl.NumberFormat(t,{maximumFractionDigits:e}).format(i)}catch{return String(Math.round(i))}}var R=(i,t,e)=>{let s=v(i,e);return t==="d"?{value:s,unit:i===1?"unit.day":"unit.days",short:"d"}:t==="h"?{value:s,unit:i===1?"unit.hour":"unit.hours",short:"h"}:{value:s,unit:"unit.min",short:"min"}};function Me(i,t="days_hours",e="en"){let s=Math.max(0,Math.round(i)),n=Math.floor(s/1440),o=Math.floor(s%1440/60),r=s%60;if(t==="hours"){let c=Math.floor(s/60);return c>0?[R(c,"h",e)]:[R(r,"min",e)]}return t==="auto"?n>=1?[R(n,"d",e),R(o,"h",e)]:o>=1?[R(o,"h",e),R(r,"min",e)]:[R(r,"min",e)]:n>=1?[R(n,"d",e),R(o,"h",e)]:o>=1?[R(o,"h",e)]:[R(r,"min",e)]}function ue(i,t="days_hours",e="en"){return Me(i,t,e).map(s=>`${s.value} ${s.short}`).join(" ")}function qt(i){let t=i.reduce((r,c)=>r+c,0);if(t<=0)return i.map(()=>0);let e=i.map(r=>r/t*100),s=e.map(Math.floor),n=100-s.reduce((r,c)=>r+c,0),o=e.map((r,c)=>({i:c,frac:r-Math.floor(r)})).sort((r,c)=>c.frac-r.frac);for(let{i:r}of o){if(n<=0)break;s[r]+=1,n-=1}return s}var Ts={workweeks:40*60,lotr:726,flights:2670,movies:100,seasons:22*42,marathons:270,moon:3*1440,imdb:250*130},Cs=["months","workweeks","lotr","flights","sleep","movies","seasons","marathons","moon","imdb"];function Xe(i,t,e){let s=E(i),n=e/1440;if(t==="months"){if(n<1)return;if(n<30)return p(i,"fun.days",{n:v(n,s)});let c=n/30.4375;return c<24?p(i,"fun.months",{n:v(c,s,1)}):p(i,"fun.years",{n:v(c/12,s,1)})}if(t==="sleep"){let c=e/480;return c<365?c>=2?p(i,"fun.sleep_nights",{n:v(c,s)}):void 0:p(i,"fun.sleep_years",{n:v(c/365.25,s,1)})}let o=Ts[t];if(!o)return;let r=e/o;return r>=2?p(i,`fun.${t}`,{n:v(r,s)}):void 0}function Vt(i,t,e="rotate",s=Date.now()){if(!(t>=1440))return;if(e!=="rotate")return Xe(i,e,t);let n=Cs.filter(r=>Xe(i,r,t));if(!n.length)return;let o=n[Math.floor(s/et)%n.length];return Xe(i,o,t)}function Bt(i,t){let e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(i),s=n=>Number(e.find(o=>o.type===n)?.value);return Math.round(Date.UTC(s("year"),s("month")-1,s("day"))/et)}function Gt(i){let{now:t,lastWatchedIso:e,current:s,timeZone:n,lang:o="en"}=i,r=Bt(t,n),c=e?new Date(e):void 0,a=c&&!isNaN(c.getTime())?Bt(c,n):void 0,h=new Intl.DateTimeFormat(o,{weekday:"narrow",timeZone:"UTC"}),m=[];for(let f=6;f>=0;f--){let g=r-f,x=a!==void 0&&s>0&&g<=a&&g>a-s;m.push({label:h.format(new Date(g*et)),filled:x,today:f===0})}let l=m[6].filled;return{days:m,todayFilled:l,stillTimeToday:!l&&s>0&&a===r-1}}function tt(i,t){let e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(i),s=n=>e.find(o=>o.type===n)?.value??"";return`${s("year")}-${s("month")}-${s("day")}`}function Ie(i,t,e){return new Intl.DateTimeFormat(t,{weekday:e,timeZone:"UTC"}).format(new Date(`${i}T00:00:00Z`))}function Yt(i,t,e,s){let n=new Date(i);if(!Number.isNaN(n.getTime()))try{return new Intl.DateTimeFormat(t,{hour:"numeric",minute:"2-digit",timeZone:e,hour12:s}).format(n)}catch{return}}var me=["actor","director","writer","decade","genre","country"],L=["hero","watch_time","library","still_to_finish","streak","average","last_7_days","top_picks","next_up","catchup","airing"];function De(i){let t=[];if(Array.isArray(i))for(let e of i)L.includes(e)&&!t.includes(e)&&t.push(e);for(let e of L)t.includes(e)||t.push(e);return t}var Rs=["hero","still_to_finish","next_up"];function st(i){let t=i??{};return t.section_order!==void 0&&t.section_order!==null||t.show_queue===!1?!0:L.some(e=>t[`show_${e}`]===!1)}function fe(i){let t=i?.layout;return t==="full"||t==="compact"||t==="custom"?t:st(i)?"custom":"full"}function nt(i,t){if(i==="full")return[...L];if(i==="compact")return L.filter(s=>Rs.includes(s));let e=s=>{let n=t[`show_${s}`];return n===void 0?ee[`show_${s}`]!==!1:n!==!1};return De(t.section_order).filter(e)}var ee={layout:"full",library_style:"list",watch_time_style:"list",duration_format:"days_hours",fun_stat:!0,fun_stat_mode:"rotate",queue_length:5,airing_length:5,show_hero:!0,show_watch_time:!0,show_library:!0,show_still_to_finish:!0,show_streak:!0,show_average:!0,show_last_7_days:!0,show_top_picks:!0,show_next_up:!0,show_catchup:!0,show_airing:!0,top_picks_items:[...me],show_posters:!0,show_actions:!1,confirm_actions:!0};function D(i){return i.tmdbId!==void 0?`tmdb:${i.tmdbId}`:i.refractId?`refract:${i.refractId}`:`title:${i.title.toLowerCase()}`}var y=i=>typeof i=="number"&&Number.isFinite(i)?i:void 0,Oe=i=>{let t=i.filter(e=>e!==void 0);return t.length?t.reduce((e,s)=>e+s,0):void 0};function it(i,t){let e=i?.show??{},s=e.title??t;if(!s)return;let n=i?.next_episode??{};return{title:s,year:y(e.year),isAnime:!!e.is_anime,status:typeof i?.status=="string"?i.status:void 0,season:y(n.season),number:y(n.number),episodeName:typeof n.name=="string"?n.name:void 0,aired:n.aired!==!1,premiere:!!n.is_season_premiere,finale:!!n.is_season_finale,midFinale:!!n.is_mid_season_finale,airedEpisodes:y(i?.aired_episodes),remaining:y(i?.remaining_episodes),refractId:typeof e.ids?.refract=="string"?e.ids.refract:void 0,tmdbId:y(e.ids?.tmdb),posterUrl:typeof i?.poster_url=="string"&&i.poster_url?i.poster_url:void 0}}var Zt=["completed","up_to_date","in_progress","planned","on_hold","dropped"],Ps={watchlist:"planned",paused:"on_hold",onhold:"on_hold",abandoned:"dropped"};function Ms(i){if(!i||typeof i!="object"||Array.isArray(i))return;let t=new Map;for(let[s,n]of Object.entries(i)){let o=y(n);if(o===void 0||o<=0)continue;let r=s.trim().toLowerCase().replace(/[\s-]+/g,"_"),c=Ps[r]??r;t.set(c,(t.get(c)??0)+o)}if(!t.size)return;let e=s=>{let n=Zt.indexOf(s);return n===-1?Zt.length:n};return[...t.entries()].map(([s,n])=>({key:s,count:n})).sort((s,n)=>e(s.key)-e(n.key)||s.key.localeCompare(n.key))}function Jt(i,t,e){let s=b=>{let _=t.entities[b];return _?i.states[_]:void 0},n=b=>Q(s(b)),o=Object.keys(t.entities).length>0,r=Kt(e.name??jt(i,t)),c=n("movies"),a=n("tv_shows"),h=n("anime"),m=n("library_total")??Oe([c,a,h]),l=n("completed"),f=n("in_progress"),g=n("up_to_date"),x=n("watchlist"),te=Oe([l,f,g,x]),es=m!==void 0&&te!==void 0?Math.max(0,m-te):void 0,ts=Ms(s("library_total")?.attributes?.by_status),rt=n("stats_watch_time_shows_minutes"),at=n("stats_watch_time_movies_minutes"),ct=n("stats_watch_time_anime_minutes"),ss=n("stats_watch_time_total_minutes")??Oe([rt,at,ct]),V=s("last_watched"),ns=X(V)?{iso:V.state,title:typeof V.attributes.title=="string"?V.attributes.title:void 0,season:y(V.attributes.season),episode:y(V.attributes.episode)}:void 0,_e=n("stats_streak_current_days"),is=n("stats_streak_longest_days"),se=s("next_up"),ye={kind:"hidden"};if(se&&se.state!=="unavailable"){let b=X(se)?it(se.attributes,se.state):void 0;ye=b?{kind:"item",item:b}:{kind:"empty"}}let os=ye.kind==="item"?ye.item:void 0,lt,be=s("last_7_days");if(X(be)&&Array.isArray(be.attributes.days)){let b=be.attributes.days.map(_=>({date:String(_?.date??""),episodes:y(_?.episodes)??0,movies:y(_?.movies)??0})).filter(_=>/^\d{4}-\d{2}-\d{2}$/.test(_.date));if(b.length){let _=be.attributes.busiest_day;lt={days:b,episodes:b.reduce((k,M)=>k+M.episodes,0),movies:b.reduce((k,M)=>k+M.movies,0),busiest:typeof _?.date=="string"&&y(_?.count)?{date:_.date,count:_.count}:void 0}}}let dt,Ne=s("top_picks");if(X(Ne)){let b=Ne.attributes,_={};for(let k of me){let M=(Array.isArray(b[k])?b[k]:[]).map(S=>typeof S?.name=="string"&&y(S?.hours)!==void 0?{name:S.name,hours:S.hours,titles:y(S.titles)??0,photoUrl:typeof S.photo=="string"&&S.photo?S.photo:void 0,code:typeof S.code=="string"&&S.code?S.code:void 0,decade:y(S.decade)}:void 0).filter(S=>!!S);M.length&&(_[k]=M)}dt={titles:Q(Ne)??0,total:y(b.total)??0,pending:y(b.pending)??0,picks:_}}let pt,G=s("average_per_week");if(G&&G.state!=="unavailable"){let b=Q(G),_=y(G.attributes.items_per_week);if(b!==void 0||_!==void 0){let k=G.attributes.change_percent;pt={hours:b,itemsPerWeek:_,changePct:typeof k=="number"?k:null,estimated:G.attributes.estimated!==!1}}}let Ue,z=s("catch_up");if(z&&z.state!=="unavailable"&&z.state!=="unknown"){let b=Q(z)??0,_=Array.isArray(z.attributes.shows)?z.attributes.shows:[],k=new Map,M=s("shows_waiting");if(M&&Array.isArray(M.attributes.items))for(let $ of M.attributes.items){let H=it($);H&&k.set(D(H),H)}let S=_.map($=>{let H=y($?.remaining);if(typeof $?.title!="string"||H===void 0)return;let ze=typeof $.poster_url=="string"&&$.poster_url?$.poster_url:void 0,mt=typeof $.refract_id=="string"&&$.refract_id?$.refract_id:void 0,ft={title:$.title,year:y($.year),remaining:H,isAnime:!!$.is_anime,tmdbId:y($.tmdb_id),refractId:mt,posterUrl:ze},A=it({show:{title:$.title,year:$.year,is_anime:$.is_anime,ids:{tmdb:$.tmdb_id,refract:mt}},next_episode:$.next_episode,aired_episodes:$.aired_episodes,remaining_episodes:H,poster_url:ze});return A&&(A.season===void 0||A.number===void 0)&&(A=void 0),A??=k.get(D(ft)),A&&(A.season===void 0||A.number===void 0)&&(A=void 0),A&&(A={...A,posterUrl:ze??A.posterUrl,remaining:A.remaining??H}),{...ft,next:A}}).filter($=>!!$);Ue={total:b,minutes:y(z.attributes.estimated_minutes),showCount:y(z.attributes.show_count)??S.length,shows:S}}let ht,Le=s("still_to_finish");if(X(Le)){let b=Le.attributes,_=k=>({count:Math.max(0,y(k?.count)??0),minutes:y(k?.minutes),episodes:y(k?.episodes),notStarted:y(k?.not_started),started:y(k?.started),unknown:y(k?.unknown_episodes)});ht={minutes:Q(Le),movies:_(b.movies),shows:_(b.shows),anime:_(b.anime),estimated:b.estimated!==!1,unknownShows:y(b.unknown_episode_shows)??0}}let ut,ne=s("airing_this_week");ne&&ne.state!=="unavailable"&&ne.state!=="unknown"&&(ut=(Array.isArray(ne.attributes.episodes)?ne.attributes.episodes:[]).map(_=>typeof _?.show=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(String(_?.date))?{date:_.date,show:_.show,season:y(_.season),number:y(_.number),title:typeof _.title=="string"?_.title:void 0,isAnime:!!_.is_anime,premiere:!!_.premiere,finale:!!_.finale,airAt:typeof _.air_at=="string"&&_.air_at?_.air_at:void 0}:void 0).filter(_=>!!_));let rs=!!os?.posterUrl||!!Ue?.shows.some(b=>b.posterUrl);return{found:o,accountMain:r.main,accountSub:r.sub,last:ns,minutes:{total:ss,shows:rt,movies:at,anime:ct},library:{total:m,movies:c,shows:a,anime:h,completed:l,inProgress:f,upToDate:g,watchlist:x,other:es,statuses:ts},moviesWatched:n("stats_movies_watched"),episodesWatched:Oe([n("stats_shows_episodes_watched"),n("stats_anime_episodes_watched")]),streak:_e!==void 0?{current:_e,longest:Math.max(is??_e,_e)}:void 0,next:ye,last7:lt,topPicks:dt,average:pt,catchup:Ue,finish:ht,airing:ut,hasPosters:rs}}var Qt=xe`
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px 14px;
  }
  .pick {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
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
`,Xt=xe`
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
`;var P=class extends I{constructor(){super(...arguments);this._catchupExpanded=!1;this._airingExpanded=!1;this._actionState="idle";this._actionError="";this._actionTarget=""}static async getConfigElement(){return document.createElement(Ce)}static getStubConfig(e){let s=e?.entities??{},n=Object.keys(s).filter(a=>a.startsWith("sensor.")&&s[a].platform===U),o=Object.keys(e?.states??{}).filter(a=>a.startsWith("sensor.refract_")),r=n.length?n:o;return{entity:r.find(a=>a.endsWith("_next_up"))??r[0]??""}}setConfig(e){if(!e||typeof e!="object")throw new Error("Invalid configuration");let s=Object.fromEntries(Object.entries(e).filter(([,n])=>n!=null));s.show_queue!==void 0&&s.show_catchup===void 0&&(s.show_catchup=s.show_queue),this._config=e,this._cfg={...ee,...s},this._disc=void 0}getCardSize(){if(!this._cfg)return 12;let e=this._cfg,s=nt(fe(this._config),e),n={hero:3,watch_time:2,library:2,still_to_finish:3,streak:3,average:0,last_7_days:3,top_picks:6,next_up:3,catchup:2+Math.min(e.queue_length,5),airing:2+Math.min(e.airing_length,5)};return 1+s.reduce((o,r)=>o+n[r],0)}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}shouldUpdate(e){if(!this._config||!this.hass)return!1;if([...e.keys()].some(o=>o!=="hass"))return!0;let n=e.get("hass");if(!n||n.locale!==this.hass.locale||n.entities!==this.hass.entities||n.devices!==this.hass.devices)return!0;for(let o of Object.values(this._discovery().entities))if(n.states[o]!==this.hass.states[o])return!0;return!1}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._actionTimer)}_discovery(){let e=this.hass,s=this._config;return(!this._disc||!this._discFor||this._discFor.config!==s||this._discFor.entities!==e.entities||this._discFor.devices!==e.devices||Object.keys(this._disc.entities).length===0)&&(this._disc=Wt(e,s),this._discFor={config:s,entities:e.entities,devices:e.devices}),this._disc}render(){if(!this._config||!this.hass)return u;let e=this._cfg;if(!e.entity&&!e.device_id&&!e.entities)return this._message(p(this.hass,"empty.no_entity"));let s=this._discovery(),n=Jt(this.hass,s,e);if(!n.found)return this._message(p(this.hass,"empty.not_found",{entity:e.entity??e.device_id??""}));let o=e.show_posters&&n.hasPosters,r={hero:()=>this._hero(n),watch_time:()=>this._watchTime(n),still_to_finish:()=>this._finish(n),library:()=>this._library(n),streak:()=>n.streak?this._streak(n):u,average:()=>this._average(n),last_7_days:()=>this._last7(n),top_picks:()=>this._topPicks(n),next_up:()=>this._next(n,o),catchup:()=>this._catchup(n,o),airing:()=>this._airing(n)},c=[],a=[],h=()=>{a.length&&c.push(d`<div class="grid">${a}</div>`),a=[]};for(let m of nt(fe(this._config),e)){let l=r[m]();l!==u&&(m==="streak"||m==="average"?a.push(l):(h(),c.push(l)))}return h(),d`<ha-card style=${Nt(this._colorVars())}> ${this._header(n)} ${c} </ha-card>`}_message(e){return d`<ha-card><div class="empty" style="padding:16px">${e}</div></ha-card>`}_colorVars(){let e=this._cfg,s={};return e.color_movies&&(s["--refract-color-movies"]=e.color_movies),e.color_shows&&(s["--refract-color-shows"]=e.color_shows),e.color_anime&&(s["--refract-color-anime"]=e.color_anime),e.color_accent&&(s["--refract-color-accent"]=e.color_accent),s}_header(e){let s=e.last,n=s?.season!==void 0&&s?.episode!==void 0?` S${s.season} E${s.episode}`:"";return d`<div class="header">
      <div class="brand">
        <ha-icon icon="mdi:chart-donut"></ha-icon>
        <span class="name">${e.accountMain}</span>
        ${e.accountSub?d`<span class="sub">${e.accountSub}</span>`:u}
      </div>
      ${s?d`<span class="last" title="${p(this.hass,"header.last_watched")}">
            ${s.title?d`${s.title}${n} · `:u}<ha-relative-time
              .hass=${this.hass}
              .datetime=${s.iso}
            ></ha-relative-time>
          </span>`:u}
    </div>`}_hero(e){let s=E(this.hass),n=this._cfg,o=e.minutes.total,c=[[p(this.hass,"hero.library"),e.library.total],[p(this.hass,"hero.movies_seen"),e.moviesWatched],[p(this.hass,"hero.episodes"),e.episodesWatched]].filter(([,h])=>h!==void 0);if(o===void 0&&c.length===0)return u;let a=n.fun_stat&&o!==void 0?Vt(this.hass,o,n.fun_stat_mode):void 0;return d`<div>
      <div class="hero">
        ${o!==void 0?d`<div class="hero-main">
              <div class="label">${p(this.hass,"hero.total")}</div>
              <div class="big">
                ${Me(o,n.duration_format,s).map((h,m)=>d`<span class="part"
                        ><span class="num ${m>0?"second":""}">${h.value}</span>
                        <span class="unit">${p(this.hass,h.unit)}</span></span
                      >
                    `)}
              </div>
              ${a?d`<div class="fun"><ha-icon icon="mdi:shimmer"></ha-icon><span>${a}</span></div>`:u}
            </div>`:u}
        ${c.length?d`<div class="tiles">
              ${c.map(([h,m])=>d`<div class="tile">
                    <div class="label">${h}</div>
                    <div class="value">${v(m,s)}</div>
                  </div>`)}
            </div>`:u}
      </div>
    </div>`}_library(e){let s=E(this.hass),n=e.library,o={completed:"var(--c-completed)",up_to_date:"var(--c-up-to-date)",in_progress:"var(--c-in-progress)",planned:"var(--c-watchlist)",on_hold:"var(--c-on-hold)",dropped:"var(--c-dropped)"},r={planned:"status.watchlist"},c=f=>{let g=r[f]??`status.${f}`,x=p(this.hass,g);if(x!==g)return x;let te=f.replace(/_/g," ");return te.charAt(0).toUpperCase()+te.slice(1)},a=n.statuses?n.statuses.map(f=>[c(f.key),f.count,o[f.key]??"var(--track)"]):[["status.completed",n.completed,"var(--c-completed)"],["status.up_to_date",n.upToDate,"var(--c-up-to-date)"],["status.in_progress",n.inProgress,"var(--c-in-progress)"],["status.watchlist",n.watchlist,"var(--c-watchlist)"],["status.other",n.other&&n.other>0?n.other:void 0,"var(--track)"]].filter(([,f])=>f!==void 0).map(([f,g,x])=>[p(this.hass,f),g,x]);if(!a.length)return u;let h=this._cfg.library_style==="list",m=a.reduce((f,[,g])=>f+g,0),l=d`<div
      class="status-bar ${h?"spaced":""}"
      role="img"
      aria-label=${a.map(([f,g])=>`${f} ${g}`).join(", ")}
    >
      ${a.map(([,f,g])=>d`<span style="flex:${f} 1 0; background:${g}"></span>`)}
    </div>`;return d`<div class="panel library">
      <div class="label" style="margin-bottom:${h?12:10}px">${p(this.hass,"library.title")}</div>
      ${l}
      ${h?d`<div class="stat-list">
            ${a.map(([f,g,x])=>d`<div class="stat-row">
                <span class="stat-dot" style="background:${x}"></span>
                <span class="stat-name">${f}</span>
                <b class="stat-count">${v(g,s)}</b>
                <span class="stat-pct">${m?Math.round(g/m*100):0}%</span>
              </div>`)}
          </div>`:d`<div class="status-legend">
            ${a.map(([f,g,x])=>d`<span><span class="swatch sm" style="background:${x}"></span>${f} · ${v(g,s)}</span>`)}
          </div>`}
    </div>`}_timeZone(){return this.hass.locale?.time_zone==="server"?this.hass.config?.time_zone:void 0}_hour12(){let e=this.hass.locale?.time_format;return e==="12"?!0:e==="24"?!1:void 0}_streak(e){let s=E(this.hass),n=e.streak,o=p(this.hass,n.current===1?"unit.day":"unit.days"),r=Gt({now:new Date,lastWatchedIso:e.last?.iso,current:n.current,timeZone:this._timeZone(),lang:s}),c=n.current===0?p(this.hass,"streak.none"):[p(this.hass,"streak.longest",{n:n.longest,unit:p(this.hass,n.longest===1?"unit.day":"unit.days")}),r.stillTimeToday?p(this.hass,"streak.still_time"):""].filter(Boolean).join(" \xB7 ");return d`<div class="panel streak">
      <div class="label">${p(this.hass,"streak.title")}</div>
      <div class="metric">${v(n.current,s)} <span class="unit">${o}</span></div>
      <div class="dots" role="img" aria-label="${n.current} ${o}">
        ${r.days.map(a=>d`<div class="dot-col ${a.today?"today":""}">
              <span class="dot ${a.filled?"filled":"open"} ${a.today?"today":""}"></span>${a.label}
            </div>`)}
      </div>
      <div class="streak-foot">${c}</div>
    </div>`}_average(e){let s=e.average;if(!s)return u;let n=E(this.hass),o;if(s.hours!==void 0)o=d`${v(s.hours,n,1)} <span class="unit">${p(this.hass,"unit.h")}</span>`;else if(s.itemsPerWeek!==void 0)o=d`${v(s.itemsPerWeek,n,1)} <span class="unit">${p(this.hass,"avg.items_unit")}</span>`;else return u;let r=s.changePct,c=r==null?u:d`<div class="trend ${r>0?"up":r<0?"down":""}">
            ${r>0?"\u25B2":r<0?"\u25BC":"\u2013"} ${Math.abs(r)}% ${p(this.hass,"avg.vs_previous")}
          </div>`;return d`<div class="panel average">
      <div class="label">${p(this.hass,"avg.title")}</div>
      <div class="metric" title=${s.estimated&&s.hours!==void 0?p(this.hass,"avg.estimated"):""}>
        ${s.hours!==void 0&&s.estimated?d`<span class="approx">~</span>`:u}${o}
      </div>
      <div class="avg-mid">
        ${s.hours!==void 0&&s.itemsPerWeek!==void 0?d`<div class="avg-items">
              ${s.itemsPerWeek===1?p(this.hass,"avg.items_line_one"):p(this.hass,"avg.items_line",{n:v(s.itemsPerWeek,n,1)})}
            </div>`:u}
      </div>
      ${c}
    </div>`}_last7(e){let s=e.last7;if(!s)return u;let n=E(this.hass),o=tt(new Date,this._timeZone()),r=s.days.map(l=>l.episodes+l.movies),c=Math.max(1,...r),a=84,h=s.busiest?Ie(s.busiest.date,n,"long"):void 0,m=`${p(this.hass,"days7.episodes")} ${s.episodes}, ${p(this.hass,"days7.movies")} ${s.movies}`;return d`<div class="panel last7">
      <div class="panel-head">
        <span class="label">${p(this.hass,"days7.title")}</span>
        ${h?d`<span class="badge accent">${p(this.hass,"days7.busiest",{day:h})}</span>`:u}
      </div>
      <div class="bars" role="img" aria-label=${m}>
        ${s.days.map((l,f)=>{let g=r[f],x=g===0?3:Math.max(8,Math.round(g/c*a));return d`<div class="day ${l.date===o?"today":""}">
            <div class="slot">
              ${l.episodes>0?d`<span class="day-count">${v(l.episodes,n)}</span>`:u}
              <div class="bar ${g===0?"empty":""}" style="height:${x}px">
                ${l.movies?d`<span class="seg movies" style="flex:${l.movies} 1 0"></span>`:u}
                ${l.episodes?d`<span class="seg shows" style="flex:${l.episodes} 1 0"></span>`:u}
              </div>
            </div>
            <span class="day-label">${Ie(l.date,n,"narrow")}</span>
          </div>`})}
      </div>
      <div class="legend-row">
        <span><span class="swatch" style="background:var(--c-shows)"></span>${p(this.hass,"days7.episodes")} <b>${v(s.episodes,n)}</b></span>
        <span><span class="swatch" style="background:var(--c-movies)"></span>${p(this.hass,"days7.movies")} <b>${v(s.movies,n)}</b></span>
      </div>
      ${s.episodes+s.movies===0?d`<div class="empty">${p(this.hass,"days7.none")}</div>`:u}
    </div>`}_watchTime(e){let s=E(this.hass),n=this._cfg.duration_format,o=[{key:"library.shows",minutes:e.minutes.shows,color:"var(--c-shows)"},{key:"library.movies",minutes:e.minutes.movies,color:"var(--c-movies)"},{key:"library.anime",minutes:e.minutes.anime,color:"var(--c-anime)"}].filter(a=>a.minutes!==void 0);if(!o.length)return u;let r=qt(o.map(a=>a.minutes)),c=this._cfg.watch_time_style==="list";return d`<div class="panel">
      <div class="label" style="margin-bottom:${c?12:8}px">${p(this.hass,"watch.title")}</div>
      <div
        class="stack ${c?"spaced":""}"
        role="img"
        aria-label=${o.map((a,h)=>`${p(this.hass,a.key)} ${r[h]}%`).join(", ")}
      >
        ${o.map(a=>d`<span style="flex:${Math.max(a.minutes,0)} 1 0; background:${a.color}"></span>`)}
      </div>
      ${c?d`<div class="stat-list">
            ${o.map((a,h)=>d`<div class="stat-row">
                <span class="stat-dot" style="background:${a.color}"></span>
                <span class="stat-name">${p(this.hass,a.key)}</span>
                <b class="stat-count">${ue(a.minutes,n,s)}</b>
                <span class="stat-pct">${r[h]}%</span>
              </div>`)}
          </div>`:d`<div class="watch-cols">
            ${o.map((a,h)=>d`<div class="watch-col">
                  <div class="row"><span class="swatch" style="background:${a.color}"></span>${p(this.hass,a.key)} · ${r[h]}%</div>
                  <div class="value">${ue(a.minutes,n,s)}</div>
                </div>`)}
          </div>`}
    </div>`}_finish(e){let s=e.finish;if(!s)return u;let n=E(this.hass),o=this._cfg.duration_format,r=(m,l)=>p(this.hass,l===1?`${m}_one`:m,{n:v(l,n)}),c=m=>m===void 0?"":ue(m,o,n),a=[{key:"finish.movies",group:s.movies,color:"var(--c-movies)"},{key:"finish.shows",group:s.shows,color:"var(--c-shows)"},{key:"finish.anime",group:s.anime,color:"var(--c-anime)"}].filter(m=>m.group.count>0),h=s.minutes;return d`<div class="panel finish">
      <div class="label">${p(this.hass,"finish.title")}</div>
      ${a.length?d`${h!==void 0&&h>0?d`<div class="big finish-big">
                    ${Me(h,o,n).map((m,l)=>d`<span class="part"
                            ><span class="num ${l>0?"second":""}">${m.value}</span>
                            <span class="unit">${p(this.hass,m.unit)}</span></span
                          >
                        `)}
                  </div>`:u}
            <div class="finish-rows">
              ${a.map(m=>{let l=m.group;return d`<div class="finish-row">
                  <div class="finish-name">${r(m.key,l.count)}</div>
                  ${l.minutes!==void 0&&l.minutes>0?d`<span class="finish-time" style="color:${m.color}">${c(l.minutes)}</span>`:u}
                </div>`})}
            </div>`:d`<div class="empty">${p(this.hass,"finish.none")}</div>`}
    </div>`}_poster(e,s,n){let o=(s.trim()[0]??"?").toUpperCase();return d`<div class="poster ${n}" aria-hidden="true">
      <span>${o}</span>
      ${e?d`<img
            src=${e}
            alt=""
            loading="lazy"
            referrerpolicy="no-referrer"
            @error=${r=>r.target.style.display="none"}
          />`:u}
    </div>`}_pickedShow(e){if(!this._selected)return;let s=e.catchup?.shows.find(o=>D(o)===this._selected&&o.next),n=e.next.kind==="item"?D(e.next.item):void 0;if(!s||!this._cfg.show_next_up||D(s)===n){this._selected=void 0;return}return s}_selectShow(e,s){if(!e.next)return;let n=D(e);this._selected=n===s||this._selected===n?void 0:n,this._clearAction(),this.requestUpdate(),this._selected&&this.updateComplete.then(()=>{this.renderRoot.querySelector(".panel.next")?.scrollIntoView?.({block:"nearest",behavior:"smooth"})})}_clearAction(){window.clearTimeout(this._actionTimer),this._actionState="idle",this._actionError="",this._actionTarget=""}_next(e,s){let n=this._pickedShow(e),o=n?{kind:"item",item:n.next}:e.next;if(o.kind==="hidden")return u;if(o.kind==="empty")return d`<div class="panel next">
        <div class="label">${p(this.hass,"next.title")}</div>
        <div class="empty">${p(this.hass,"empty.nothing_up_next")}</div>
      </div>`;let r=o.item,c=E(this.hass),h=[r.season!==void 0&&r.number!==void 0?`S${r.season} E${r.number}`:"",r.episodeName].filter(Boolean).join(" \xB7 "),m=r.airedEpisodes,l=m!==void 0&&r.remaining!==void 0?Math.max(0,m-r.remaining):void 0,f=m&&l!==void 0?Math.min(100,l/m*100):void 0;return d`<div class="panel next ${s?"with-poster":""}">
      ${s?this._poster(r.posterUrl,r.title,"lg"):u}
      <div class="next-body">
        <div class="next-head">
          <span class="label">${p(this.hass,"next.title")}</span>
          ${r.isAnime?d`<span class="badge">${p(this.hass,"badge.anime")}</span>`:u} ${this._badge(r)}
        </div>
        <div class="next-main">
          <div>
            <div class="next-title">
              <span>${r.title}</span>
              ${r.year?d`<span class="year">${r.year}</span>`:u}
            </div>
            ${h?d`<div class="next-ep">${h}</div>`:u}
          </div>
          ${this._actionButton(r)}
        </div>
        ${f!==void 0?d`<div class="progress" role="img" aria-label="${l} / ${m}"><span style="width:${f}%"></span></div>
              <div class="next-foot">
                <span>${p(this.hass,"next.progress",{watched:v(l,c),aired:v(m,c)})}</span>
                ${r.remaining!==void 0?d`<span>${p(this.hass,"next.remaining",{n:v(r.remaining,c)})}</span>`:u}
              </div>`:u}
      </div>
    </div>`}_badge(e){return e.aired?e.premiere?d`<span class="badge accent">${p(this.hass,"badge.premiere")}</span>`:e.finale?d`<span class="badge warn">${p(this.hass,"badge.finale")}</span>`:e.midFinale?d`<span class="badge warn">${p(this.hass,"badge.mid_finale")}</span>`:u:d`<span class="badge">${p(this.hass,"badge.not_aired")}</span>`}_canMarkWatched(e){return this._cfg.show_actions&&!!this.hass.services?.[U]?.mark_episode_watched&&e.aired&&e.season!==void 0&&e.number!==void 0&&(e.tmdbId!==void 0||!!e.refractId)}_actionButton(e){if(!this._canMarkWatched(e))return u;let s=this._actionState,n={idle:"mdi:check",confirm:"mdi:help-circle-outline",busy:"mdi:loading",done:"mdi:check-circle",error:"mdi:alert-circle-outline"}[s],o={idle:"next.mark",confirm:"next.confirm",busy:"next.busy",done:"next.done",error:"next.error"}[s];return d`<button class="action" data-state=${s} title=${this._actionError} @click=${()=>this._markWatched(e)}>
      <ha-icon icon=${n}></ha-icon>${p(this.hass,o)}
    </button>`}_resetActionLater(e){window.clearTimeout(this._actionTimer),this._actionTimer=window.setTimeout(()=>{this._actionState="idle",this._actionError=""},e)}async _configEntryId(){if(this._cfg.config_entry_id)return this._cfg.config_entry_id;let e=this._discovery().entities.next_up??this._cfg.entity;if(e)try{return(await this.hass.callWS({type:"config/entity_registry/get",entity_id:e}))?.config_entry_id}catch{return}}async _markWatched(e){if(this._actionState==="busy")return;let s=`${D(e)}:${e.season}:${e.number}`;if(this._cfg.confirm_actions&&(this._actionState!=="confirm"||this._actionTarget!==s)){this._actionTarget=s,this._actionState="confirm",this._resetActionLater(3e3);return}window.clearTimeout(this._actionTimer),this._actionState="busy";try{let n={season:e.season,number:e.number};e.tmdbId!==void 0?n.tmdb_id=e.tmdbId:n.refract_id=e.refractId;let o=await this._configEntryId();o&&(n.config_entry_id=o),await this.hass.callService(U,"mark_episode_watched",n),this._actionState="done",this._resetActionLater(2500),this._refreshSensors()}catch(n){this._actionError=n instanceof Error?n.message:String(n),this._actionState="error",this._resetActionLater(4e3)}}_refreshSensors(){let e=this._discovery().entities,s=[e.next_up,e.shows_waiting,e.catch_up,e.last_7_days,e.average_per_week,e.last_watched,e.stats_streak_current_days].filter(Boolean);s.length&&this.hass.callService("homeassistant","update_entity",{entity_id:s}).catch(()=>{})}_catchup(e,s){let n=e.catchup;if(!n)return u;let o=E(this.hass),r=this._cfg.queue_length,c=n.shows.length>r,a=this._catchupExpanded?n.shows:n.shows.slice(0,r),h=Math.max(1,...n.shows.map(f=>f.remaining)),m=e.next.kind==="item"?D(e.next.item):void 0,l=n.minutes!==void 0&&n.total>0?`, ${p(this.hass,"catchup.about",{time:ue(n.minutes,this._cfg.duration_format,o)})}`:"";return d`<div class="panel catchup">
      <div class="panel-head">
        <span class="label">${p(this.hass,"catchup.title")}</span>
      </div>
      ${n.total>0?d`<div class="catch-line">
            <span class="metric">${v(n.total,o)}</span>
            <span class="muted">${p(this.hass,"catchup.waiting")}${l}</span>
          </div>`:d`<div class="empty">${p(this.hass,"catchup.none")}</div>`}
      ${a.map(f=>this._catchupRow(f,h,s,o,m))}
      ${c?d`<button class="link" @click=${()=>this._catchupExpanded=!this._catchupExpanded}>
            ${this._catchupExpanded?p(this.hass,"catchup.show_less"):p(this.hass,"catchup.show_all",{n:v(n.shows.length,o)})}
          </button>`:u}
    </div>`}_catchupRow(e,s,n,o,r){let c=D(e),a=this._cfg.show_next_up&&!!e.next&&(c!==r||this._selected!==void 0),h=a&&this._selected===c,m=d`${n?this._poster(e.posterUrl,e.title,"sm"):u}
      <span class="c-name" title=${e.title}>${e.title}</span>
      <div class="progress" role="img" aria-label="${e.remaining}"><span style="width:${e.remaining/s*100}%"></span></div>
      <b class="c-count">${v(e.remaining,o)}</b>`;return a?d`<div
      class="c-row pickable ${h?"selected":""}"
      role="button"
      tabindex="0"
      aria-pressed=${h?"true":"false"}
      title=${p(this.hass,"catchup.pick",{title:e.title})}
      @click=${()=>this._selectShow(e,r)}
      @keydown=${l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),this._selectShow(e,r))}}
    >
      ${m}
    </div>`:d`<div class="c-row">${m}</div>`}_topPicks(e){let s=e.topPicks;if(!s)return u;let n=E(this.hass),o=this._cfg.top_picks_items.filter((l,f,g)=>me.includes(l)&&g.indexOf(l)===f).map(l=>({kind:l,pick:s.picks[l]?.[0]})).filter(l=>!!l.pick),r=l=>`${v(l,n,l<10?1:0)} h`,c=l=>l.split(/\s+/).map(f=>f[0]).filter(Boolean).slice(0,2).join("").toUpperCase(),a=l=>l&&/^[A-Za-z]{2}$/.test(l)?String.fromCodePoint(...[...l.toUpperCase()].map(f=>127462+f.charCodeAt(0)-65)):void 0,h=l=>{try{return l.code&&new Intl.DisplayNames([n],{type:"region"}).of(l.code.toUpperCase())||l.name}catch{return l.name}},m=(l,f)=>{if(l==="country"){let g=a(f.code);return g?d`<span class="flag">${g}</span>`:d`<ha-icon icon="mdi:earth"></ha-icon>`}return l==="decade"?d`<ha-icon icon="mdi:calendar-range"></ha-icon>`:l==="genre"?d`<ha-icon icon="mdi:drama-masks"></ha-icon>`:f.photoUrl?d`<img src=${f.photoUrl} alt="" loading="lazy" referrerpolicy="no-referrer" />`:d`<span class="initials">${c(f.name)}</span>`};return d`<div class="panel picks">
      <div class="panel-head">
        <span class="label">${p(this.hass,"picks.title")}</span>
        ${s.pending>0?d`<span class="badge">${p(this.hass,"picks.building")}</span>`:u}
      </div>
      ${o.length?d`<div class="picks-grid">
            ${o.map(({kind:l,pick:f})=>{let g=p(this.hass,f.titles===1?"picks.sub_one":"picks.sub_other",{n:v(f.titles,n),time:r(f.hours)}),x=l==="country"?h(f):f.name;return d`<div class="pick" title="${p(this.hass,`picks.${l}`)}: ${x} · ${g}">
                <span class="pick-avatar ${l}">${m(l,f)}</span>
                <span class="pick-text">
                  <span class="pick-label">${p(this.hass,`picks.${l}`)}</span>
                  <b class="pick-name">${x}</b>
                  <span class="pick-sub">${g}</span>
                </span>
              </div>`})}
          </div>`:d`<div class="empty">${p(this.hass,s.pending>0?"picks.waiting":"picks.none")}</div>`}
      ${s.total>0?d`<div class="picks-foot">
            ${p(this.hass,"picks.based_on",{n:v(s.titles,n),total:v(s.total,n)})} ·
            <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">TMDB</a>
          </div>`:u}
    </div>`}_airing(e){let s=e.airing;if(!s)return u;let n=E(this.hass),o=tt(new Date,this._timeZone()),r=this._cfg.airing_length,c=s.length>r,a=this._airingExpanded?s:s.slice(0,r);return d`<div class="panel airing">
      <div class="panel-head"><span class="label">${p(this.hass,"airing.title")}</span></div>
      ${a.length?a.map(h=>{let m=h.season!==void 0&&h.number!==void 0?`S${h.season} \xB7 E${h.number}`:"",l=h.airAt?Yt(h.airAt,n,this._timeZone(),this._hour12()):void 0;return d`<div class="a-row">
              <span class="a-day ${h.date===o?"today":""}">${h.date===o?p(this.hass,"airing.today"):Ie(h.date,n,"short")}</span>
              <span class="swatch" style="background:${h.isAnime?"var(--c-anime)":"var(--c-shows)"}"></span>
              <span class="a-name"><b>${h.show}</b>${m?d` <span class="muted">${m}</span>`:u}</span>
              ${h.premiere?d`<span class="badge accent">${p(this.hass,"badge.premiere")}</span>`:h.finale?d`<span class="badge warn">${p(this.hass,"badge.finale")}</span>`:u}
              ${l?d`<span class="a-time">${l}</span>`:u}
            </div>`}):d`<div class="empty">${p(this.hass,"airing.none")}</div>`}
      ${c?d`<button class="link" @click=${()=>this._airingExpanded=!this._airingExpanded}>
            ${this._airingExpanded?p(this.hass,"airing.show_less"):p(this.hass,"airing.show_all",{n:v(s.length,n)})}
          </button>`:u}
    </div>`}};P.styles=Qt,T([J({attribute:!1})],P.prototype,"hass",2),T([W()],P.prototype,"_config",2),T([W()],P.prototype,"_catchupExpanded",2),T([W()],P.prototype,"_airingExpanded",2),T([W()],P.prototype,"_actionState",2),T([W()],P.prototype,"_actionError",2),P=T([Ee(he)],P);var C={entity:"Refract entity",name:"Name (optional)",layout:"Layout",library_style:"Library style",watch_time_style:"Watch time style",duration_format:"Duration format",queue_length:"Catch-up rows",airing_length:"Airing rows",fun_stat:"Show fun stat",fun_stat_mode:"Fun stat",show_hero:"Watch time summary",show_watch_time:"Watch time split",show_library:"Library",show_still_to_finish:"Still to finish",show_streak:"Streak",show_average:"Average per week",show_last_7_days:"Last 7 days",show_top_picks:"Most watched",top_picks_items:"Most watched shows",show_next_up:"Next up",show_catchup:"Catch-up backlog",show_airing:"Airing this week",show_posters:"Posters",show_actions:"Show \u201CMark watched\u201D button",confirm_actions:"Ask before marking watched",color_movies:"Movies color",color_shows:"TV shows color",color_anime:"Anime color",color_accent:"Accent color"},ot={hero:C.show_hero,watch_time:C.show_watch_time,library:C.show_library,still_to_finish:C.show_still_to_finish,streak:C.show_streak,average:C.show_average,last_7_days:C.show_last_7_days,top_picks:C.show_top_picks,next_up:C.show_next_up,catchup:C.show_catchup,airing:C.show_airing},Is={entity:"Pick any entity of your Refract account. The card finds the rest.",show_actions:"Needs an API key that can mark episodes watched.",show_posters:"Needs a TMDB API key in the Refract integration options.",show_last_7_days:"Needs watch history turned on in the integration options.",show_top_picks:"Needs a TMDB API key in the Refract integration options.",top_picks_items:"The leader of each ranking you pick, in the order you pick them.",show_average:"Needs watch history turned on in the integration options.",color_movies:"Hex color such as #2a78d6. Leave empty for the default."},w=(i,t)=>({value:i,label:t}),ge=i=>({select:{mode:"dropdown",options:i}}),Ds=i=>[{name:"entity",required:!0,selector:{entity:{integration:U,domain:"sensor"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"layout",selector:ge([w("full","Full"),w("compact","Compact"),w("custom","Custom")])},{name:"duration_format",selector:ge([w("days_hours","Days and hours"),w("hours","Hours only"),w("auto","Automatic")])},{name:"watch_time_style",selector:ge([w("bar","Compact bar"),w("list","Breakdown list")])},{name:"library_style",selector:ge([w("bar","Compact bar"),w("list","Breakdown list")])},{name:"queue_length",selector:{number:{min:1,max:20,mode:"box"}}},{name:"airing_length",selector:{number:{min:1,max:20,mode:"box"}}}]},...i?[{type:"expandable",name:"",title:"Sections",icon:"mdi:view-dashboard-outline",schema:[{type:"grid",name:"",schema:[{name:"show_hero",selector:{boolean:{}}},{name:"show_watch_time",selector:{boolean:{}}},{name:"show_library",selector:{boolean:{}}},{name:"show_still_to_finish",selector:{boolean:{}}},{name:"show_streak",selector:{boolean:{}}},{name:"show_average",selector:{boolean:{}}},{name:"show_last_7_days",selector:{boolean:{}}},{name:"show_top_picks",selector:{boolean:{}}},{name:"show_next_up",selector:{boolean:{}}},{name:"show_catchup",selector:{boolean:{}}},{name:"show_airing",selector:{boolean:{}}}]}]}]:[],{name:"show_posters",selector:{boolean:{}}},{name:"top_picks_items",selector:{select:{multiple:!0,mode:"list",options:[w("actor","Actor"),w("director","Director"),w("writer","Writer"),w("decade","Decade"),w("genre","Genre"),w("country","Country")]}}},{type:"expandable",name:"",title:"Fun stat",icon:"mdi:shimmer",schema:[{name:"fun_stat",selector:{boolean:{}}},{name:"fun_stat_mode",selector:ge([w("rotate","Rotate daily"),w("months","Months of nonstop viewing"),w("workweeks","Full-time work weeks"),w("lotr","Lord of the Rings marathons"),w("flights","Flights around the world"),w("sleep","Nights of sleep"),w("movies","Average movies back to back"),w("seasons","Full TV seasons"),w("marathons","Marathons run"),w("moon","Trips to the Moon"),w("imdb","IMDb Top 250 runs")])}]},{type:"expandable",name:"",title:"Next up actions",icon:"mdi:gesture-tap-button",schema:[{name:"show_actions",selector:{boolean:{}}},{name:"confirm_actions",selector:{boolean:{}}}]},{type:"expandable",name:"",title:"Colors",icon:"mdi:palette-outline",schema:[{type:"grid",name:"",schema:[{name:"color_movies",selector:{text:{}}},{name:"color_shows",selector:{text:{}}},{name:"color_anime",selector:{text:{}}},{name:"color_accent",selector:{text:{}}}]}]}],q=class extends I{constructor(){super(...arguments);this._resetOrder=()=>this._setOrder([...L])}setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return u;let e=fe(this._config),s={...ee,...this._config,layout:e};this._config.show_queue!==void 0&&this._config.show_catchup===void 0&&(s.show_catchup=this._config.show_queue);let n=!!this._config.show_actions&&!this.hass.services?.[U]?.mark_episode_watched,o=Ds(e==="custom"),r=e==="custom"?o.findIndex(a=>a.title==="Sections")+1:o.length,c=a=>d`<ha-form
      .hass=${this.hass}
      .data=${s}
      .schema=${a}
      .computeLabel=${h=>C[h.name]??h.name}
      .computeHelper=${h=>Is[h.name]}
      @value-changed=${this._valueChanged}
    ></ha-form>`;return d`<div class="wrap">
      ${c(o.slice(0,r))} ${e==="custom"?this._orderPanel():u}
      ${r<o.length?c(o.slice(r)):u}
      ${n?d`<ha-alert alert-type="warning">
            The button stays hidden until the <code>refract.mark_episode_watched</code> action is available. Check
            that your Refract API key allows marking episodes and movies as watched.
          </ha-alert>`:u}
    </div>`}_orderPanel(){let e=De(this._config?.section_order),s=e.every((n,o)=>n===L[o]);return d`<ha-expansion-panel outlined header="Section order" .leftChevron=${!0}>
      <div class="order">
        <div class="hint">Use the arrows to move a section up or down. The header always stays on top.</div>
        ${e.map((n,o)=>d`<div class="order-row">
            <span class="order-name">${ot[n]}</span>
            <ha-icon-button
              label="Move up"
              aria-label="Move ${ot[n]} up"
              ?disabled=${o===0}
              @click=${()=>this._move(o,-1)}
              ><ha-icon icon="mdi:arrow-up"></ha-icon
            ></ha-icon-button>
            <ha-icon-button
              label="Move down"
              aria-label="Move ${ot[n]} down"
              ?disabled=${o===e.length-1}
              @click=${()=>this._move(o,1)}
              ><ha-icon icon="mdi:arrow-down"></ha-icon
            ></ha-icon-button>
          </div>`)}
        ${s?u:d`<button class="order-reset" @click=${this._resetOrder}>Reset to default order</button>`}
      </div>
    </ha-expansion-panel>`}_move(e,s){let n=De(this._config?.section_order),o=e+s;o<0||o>=n.length||([n[e],n[o]]=[n[o],n[e]],this._setOrder(n))}_setOrder(e){if(!this._config)return;let s={...this._config};e.every((n,o)=>n===L[o])?delete s.section_order:s.section_order=e,this._config=s,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}_valueChanged(e){if(e.stopPropagation(),!this._config)return;let s=e.detail.value,n=ee,o={type:this._config.type};for(let[c,a]of Object.entries(s))a===""||a===void 0||a===null||c in n&&(a===n[c]||Array.isArray(a)&&JSON.stringify(a)===JSON.stringify(n[c]))||(o[c]=a);delete o.streak_style,delete o.show_streak_toggle,delete o.show_queue;let r=this._config;for(let c of["device_id","config_entry_id","entities","section_order"])r[c]!==void 0&&o[c]===void 0&&(o[c]=r[c]);o.layout===void 0&&s.layout==="full"&&st(o)&&(o.layout="full"),this._config=o,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0}))}};q.styles=Xt,T([J({attribute:!1})],q.prototype,"hass",2),T([W()],q.prototype,"_config",2),q=T([Ee(Ce)],q);window.customCards=window.customCards||[];window.customCards.some(i=>i.type===he)||window.customCards.push({type:he,name:p(void 0,"card.name"),description:p(void 0,"card.description"),preview:!0,documentationURL:Ut});console.info(`%c REFRACT-STATS-CARD %c v${Lt} `,"color:white;background:#6250d6;font-weight:500;border-radius:3px 0 0 3px","color:#6250d6;background:#eee;font-weight:500;border-radius:0 3px 3px 0");
