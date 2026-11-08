var es=Object.defineProperty;var ts=Object.getOwnPropertyDescriptor;var E=(i,t,e,s)=>{for(var n=s>1?void 0:s?ts(t,e):t,o=i.length-1,r;o>=0;o--)(r=i[o])&&(n=(s?r(t,e,n):r(n))||n);return s&&n&&es(t,e,n),n};var ye=globalThis,ve=ye.ShadowRoot&&(ye.ShadyCSS===void 0||ye.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ie=Symbol(),dt=new WeakMap,ee=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(ve&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=dt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&dt.set(e,t))}return t}toString(){return this.cssText}},lt=i=>new ee(typeof i=="string"?i:i+"",void 0,Ie),be=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,n,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[o+1],i[0]);return new ee(e,i,Ie)},ht=(i,t)=>{if(ve)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),n=ye.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},Pe=ve?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return lt(e)})(i):i;var{is:ss,defineProperty:ns,getOwnPropertyDescriptor:is,getOwnPropertyNames:os,getOwnPropertySymbols:rs,getPrototypeOf:as}=Object,we=globalThis,pt=we.trustedTypes,cs=pt?pt.emptyScript:"",ds=we.reactiveElementPolyfillSupport,te=(i,t)=>i,se={toAttribute(i,t){switch(t){case Boolean:i=i?cs:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},xe=(i,t)=>!ss(i,t),ut={attribute:!0,type:String,converter:se,reflect:!1,useDefault:!1,hasChanged:xe};Symbol.metadata??=Symbol("metadata"),we.litPropertyMetadata??=new WeakMap;var D=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ut){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&ns(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){let{get:n,set:o}=is(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:n,set(r){let c=n?.call(this);o?.call(this,r),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ut}static _$Ei(){if(this.hasOwnProperty(te("elementProperties")))return;let t=as(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(te("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(te("properties"))){let e=this.properties,s=[...os(e),...rs(e)];for(let n of s)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let n of s)e.unshift(Pe(n))}else t!==void 0&&e.push(Pe(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ht(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:se).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let o=s.getPropertyOptions(n),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:se;this._$Em=n;let c=r.fromAttribute(e,o.type);this[n]=c??this._$Ej?.get(n)??c,this._$Em=null}}requestUpdate(t,e,s,n=!1,o){if(t!==void 0){let r=this.constructor;if(n===!1&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??xe)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,o]of s){let{wrapped:r}=o,c=this[n];r!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,o,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[te("elementProperties")]=new Map,D[te("finalized")]=new Map,ds?.({ReactiveElement:D}),(we.reactiveElementVersions??=[]).push("2.1.2");var We=globalThis,mt=i=>i,$e=We.trustedTypes,ft=$e?$e.createPolicy("lit-html",{createHTML:i=>i}):void 0,wt="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,xt="?"+L,ls=`<${xt}>`,j=document,ie=()=>j.createComment(""),oe=i=>i===null||typeof i!="object"&&typeof i!="function",je=Array.isArray,hs=i=>je(i)||typeof i?.[Symbol.iterator]=="function",Ne=`[ 	
\f\r]`,ne=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gt=/-->/g,_t=/>/g,F=RegExp(`>|${Ne}(?:([^\\s"'>=/]+)(${Ne}*=${Ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yt=/'/g,vt=/"/g,$t=/^(?:script|style|textarea|title)$/i,qe=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),d=qe(1),Rs=qe(2),Ms=qe(3),I=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),bt=new WeakMap,W=j.createTreeWalker(j,129);function kt(i,t){if(!je(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ft!==void 0?ft.createHTML(t):t}var ps=(i,t)=>{let e=i.length-1,s=[],n,o=t===2?"<svg>":t===3?"<math>":"",r=ne;for(let c=0;c<e;c++){let a=i[c],u,m,h=-1,f=0;for(;f<a.length&&(r.lastIndex=f,m=r.exec(a),m!==null);)f=r.lastIndex,r===ne?m[1]==="!--"?r=gt:m[1]!==void 0?r=_t:m[2]!==void 0?($t.test(m[2])&&(n=RegExp("</"+m[2],"g")),r=F):m[3]!==void 0&&(r=F):r===F?m[0]===">"?(r=n??ne,h=-1):m[1]===void 0?h=-2:(h=r.lastIndex-m[2].length,u=m[1],r=m[3]===void 0?F:m[3]==='"'?vt:yt):r===vt||r===yt?r=F:r===gt||r===_t?r=ne:(r=F,n=void 0);let _=r===F&&i[c+1].startsWith("/>")?" ":"";o+=r===ne?a+ls:h>=0?(s.push(u),a.slice(0,h)+wt+a.slice(h)+L+_):a+L+(h===-2?c:_)}return[kt(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},re=class i{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let o=0,r=0,c=t.length-1,a=this.parts,[u,m]=ps(t,e);if(this.el=i.createElement(u,s),W.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=W.nextNode())!==null&&a.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(wt)){let f=m[r++],_=n.getAttribute(h).split(L),x=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:x[2],strings:_,ctor:x[1]==="."?Le:x[1]==="?"?ze:x[1]==="@"?He:Y}),n.removeAttribute(h)}else h.startsWith(L)&&(a.push({type:6,index:o}),n.removeAttribute(h));if($t.test(n.tagName)){let h=n.textContent.split(L),f=h.length-1;if(f>0){n.textContent=$e?$e.emptyScript:"";for(let _=0;_<f;_++)n.append(h[_],ie()),W.nextNode(),a.push({type:2,index:++o});n.append(h[f],ie())}}}else if(n.nodeType===8)if(n.data===xt)a.push({type:2,index:o});else{let h=-1;for(;(h=n.data.indexOf(L,h+1))!==-1;)a.push({type:7,index:o}),h+=L.length-1}o++}}static createElement(t,e){let s=j.createElement("template");return s.innerHTML=t,s}};function V(i,t,e=i,s){if(t===I)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl,o=oe(t)?void 0:t._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),o===void 0?n=void 0:(n=new o(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=n:e._$Cl=n),n!==void 0&&(t=V(i,n._$AS(i,t.values),n,s)),t}var Ue=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??j).importNode(e,!0);W.currentNode=n;let o=W.nextNode(),r=0,c=0,a=s[0];for(;a!==void 0;){if(r===a.index){let u;a.type===2?u=new ae(o,o.nextSibling,this,t):a.type===1?u=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(u=new Fe(o,this,t)),this._$AV.push(u),a=s[++c]}r!==a?.index&&(o=W.nextNode(),r++)}return W.currentNode=j,n}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},ae=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=V(this,t,e),oe(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==I&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):hs(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&oe(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=re.createElement(kt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{let o=new Ue(n,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=bt.get(t.strings);return e===void 0&&bt.set(t.strings,e=new re(t)),e}k(t){je(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,n=0;for(let o of t)n===e.length?e.push(s=new i(this.O(ie()),this.O(ie()),this,this.options)):s=e[n],s._$AI(o),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=mt(t).nextSibling;mt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Y=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,o){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(t,e=this,s,n){let o=this.strings,r=!1;if(o===void 0)t=V(this,t,e,0),r=!oe(t)||t!==this._$AH&&t!==I,r&&(this._$AH=t);else{let c=t,a,u;for(t=o[0],a=0;a<o.length-1;a++)u=V(this,c[s+a],e,a),u===I&&(u=this._$AH[a]),r||=!oe(u)||u!==this._$AH[a],u===l?t=l:t!==l&&(t+=(u??"")+o[a+1]),this._$AH[a]=u}r&&!n&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Le=class extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},ze=class extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},He=class extends Y{constructor(t,e,s,n,o){super(t,e,s,n,o),this.type=5}_$AI(t,e=this){if((t=V(this,t,e,0)??l)===I)return;let s=this._$AH,n=t===l&&s!==l||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==l&&(s===l||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Fe=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}};var us=We.litHtmlPolyfillSupport;us?.(re,ae),(We.litHtmlVersions??=[]).push("3.3.3");var St=(i,t,e)=>{let s=e?.renderBefore??t,n=s._$litPart$;if(n===void 0){let o=e?.renderBefore??null;s._$litPart$=n=new ae(t.insertBefore(ie(),o),o,void 0,e??{})}return n._$AI(i),n};var Be=globalThis,M=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=St(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}};M._$litElement$=!0,M.finalized=!0,Be.litElementHydrateSupport?.({LitElement:M});var ms=Be.litElementPolyfillSupport;ms?.({LitElement:M});(Be.litElementVersions??=[]).push("4.2.2");var fs={attribute:!0,type:String,converter:se,reflect:!1,hasChanged:xe},gs=(i=fs,t,e)=>{let{kind:s,metadata:n}=e,o=globalThis.litPropertyMetadata.get(n);if(o===void 0&&globalThis.litPropertyMetadata.set(n,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),s==="accessor"){let{name:r}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(r,a,i,!0,c)},init(c){return c!==void 0&&this.C(r,void 0,i,c),c}}}if(s==="setter"){let{name:r}=e;return function(c){let a=this[r];t.call(this,c),this.requestUpdate(r,a,i,!0,c)}}throw Error("Unsupported decorator location: "+s)};function Z(i){return(t,e)=>typeof e=="object"?gs(i,t,e):((s,n,o)=>{let r=n.hasOwnProperty(o);return n.constructor.createProperty(o,s),r?Object.getOwnPropertyDescriptor(n,o):void 0})(i,t,e)}function z(i){return Z({...i,state:!0,attribute:!1})}var Se=i=>t=>{if(customElements.get(i)){console.warn(`[refract-stats-card] <${i}> is already registered, probably by the standalone HACS card. Remove that copy to use the card that ships with the Refract integration.`);return}customElements.define(i,t)};var At={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Et=i=>(...t)=>({_$litDirective$:i,values:t}),Ae=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Tt="important",_s=" !"+Tt,Ct=Et(class extends Ae{constructor(i){if(super(i),i.type!==At.ATTRIBUTE||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let n=t[s];if(n!=null){this.ft.add(s);let o=typeof n=="string"&&n.endsWith(_s);s.includes("-")||o?e.setProperty(s,o?n.slice(0,-11):n,o?Tt:""):e[s]=n}}return I}});var ce="refract-stats-card",Ee="refract-stats-card-editor",P="refract",Rt="https://github.com/Big-Edge2297/ha-refract/blob/main/docs/dashboard-card.md",Mt="0.4.0",Te=["library_total","completed","in_progress","watchlist","up_to_date","movies","tv_shows","anime","last_watched","shows_waiting","next_up","username","catch_up","last_7_days","average_per_week","airing_this_week","still_to_finish","stats_anime_episodes_watched","stats_anime_titles","stats_movies_watched","stats_shows_episodes_watched","stats_shows_titles","stats_streak_current_days","stats_streak_longest_days","stats_watch_time_anime_minutes","stats_watch_time_movies_minutes","stats_watch_time_shows_minutes","stats_watch_time_total_minutes"];var ys=[...Te].sort((i,t)=>t.length-i.length),Ot=new Set(Te);function Dt(i){for(let t of ys){if(i===t)return{key:t,prefix:""};if(i.endsWith(`_${t}`))return{key:t,prefix:i.slice(0,i.length-t.length)}}}var It=i=>i.slice(i.indexOf(".")+1);function Pt(i,t){let e={entities:{}},s=i.entities,n=t.entity;if(e.deviceId=t.device_id,n&&s?.[n]?.device_id&&(e.deviceId=s[n].device_id),e.deviceId&&s)for(let[o,r]of Object.entries(s)){if(r.device_id!==e.deviceId||!o.startsWith("sensor.")||r.platform&&r.platform!==P)continue;let c=r.translation_key&&Ot.has(r.translation_key)?r.translation_key:void 0,a=c?{key:c,prefix:void 0}:Dt(It(o));a&&(e.entities[a.key]||(e.entities[a.key]=o),e.prefix===void 0&&a.prefix!==void 0&&(e.prefix=a.prefix))}if(n){let o=Dt(It(n));if(o){e.prefix??=o.prefix;for(let r of Te){let c=`sensor.${o.prefix}${r}`;!e.entities[r]&&i.states[c]&&(e.entities[r]=c)}}}for(let[o,r]of Object.entries(t.entities??{}))Ot.has(o)&&typeof r=="string"&&(e.entities[o]=r);return e}function Nt(i){if(!i)return{main:"Refract"};let t=i.match(/^(.*?)\s*\(([^)]*)\)\s*$/);return t&&t[1]?{main:t[1],sub:t[2]||void 0}:{main:i}}function Ut(i,t){let e=t.deviceId?i.devices?.[t.deviceId]:void 0,s=e?.name_by_user||e?.name;if(s)return s;for(let n of Object.values(t.entities)){let r=i.states[n]?.attributes?.friendly_name?.match(/^(.*?\([^)]*\))/);if(r)return r[1]}}var Ke={"card.name":"Refract stats","card.description":"Watch time, library, streak and what to watch next from your Refract account.","empty.no_entity":"Choose a Refract entity to get started.","empty.not_found":"Couldn't find any Refract entities for {entity}.","empty.nothing_up_next":"Nothing up next. Add a show or mark an episode watched.","hero.total":"Total watch time","hero.library":"Library","hero.movies_seen":"Movies seen","hero.episodes":"Episodes watched","unit.days":"days","unit.day":"day","unit.hours":"hours","unit.hour":"hour","unit.min":"min","unit.h":"h","header.last_watched":"Last watched","library.title":"Library","library.titles":"titles","library.movies":"Movies","library.shows":"TV shows","library.anime":"Anime","status.completed":"Watched","status.up_to_date":"Up to Date","status.watchlist":"Plan to Watch","status.in_progress":"Watching","status.on_hold":"On Hold","status.dropped":"Dropped","status.other":"Other","watch.title":"Watch time","finish.title":"Still to finish","finish.hours":"{n} hours of non-stop watching","finish.hours_one":"1 hour of non-stop watching","finish.estimate":"Estimate: shifts as episodes air and runtime data improves.","finish.partial":"Not counting {n} shows without an episode count.","finish.partial_one":"Not counting 1 show without an episode count.","finish.none":"Nothing left to finish","finish.movies":"{n} movies to finish","finish.movies_one":"1 movie to finish","finish.shows":"{n} TV shows to finish","finish.shows_one":"1 TV show to finish","finish.anime":"{n} anime to finish","finish.anime_one":"1 anime to finish","finish.episodes":"{n} episodes","finish.episodes_one":"1 episode","finish.not_started":"{n} not started","finish.started":"{n} started","streak.title":"Streak","streak.longest":"Longest: {n} {unit}","streak.best":"Best {n}","streak.still_time":"still time today","streak.none":"No active streak","next.title":"Next up","next.progress":"{watched} of {aired} aired episodes","next.remaining":"{n} remaining","next.mark":"Mark watched","next.confirm":"Mark watched?","next.busy":"Marking\u2026","next.done":"Marked","next.error":"Couldn't mark watched","avg.title":"Average per week","avg.vs_previous":"vs previous 4 weeks","avg.estimated":"Estimated from your average runtime","avg.items_unit":"a week","avg.items_line":"{n} episodes and movies a week","avg.items_line_one":"1 episode or movie a week","days7.title":"Last 7 days","days7.busiest":"Busiest day \xB7 {day}","days7.episodes":"Episodes","days7.movies":"Movies","days7.none":"Nothing watched in the last 7 days","catchup.title":"Catch-up backlog","catchup.pick":"Show {title} in Next up","catchup.waiting":"aired episodes waiting","catchup.about":"about {time}","catchup.none":"You're all caught up","catchup.show_all":"Show all {n}","catchup.show_less":"Show less","airing.title":"Airing this week","airing.today":"Today","airing.none":"Nothing airing in the next 7 days","airing.show_all":"Show all {n}","airing.show_less":"Show less","badge.premiere":"Premiere","badge.finale":"Finale","badge.mid_finale":"Mid-season finale","badge.not_aired":"Not aired","badge.anime":"Anime","fun.months":"That's about {n} months of nonstop viewing","fun.years":"That's about {n} years of nonstop viewing","fun.days":"That's about {n} days of nonstop viewing","fun.workweeks":"That's about {n} full-time work weeks","fun.lotr":"Enough for the extended Lord of the Rings trilogy about {n} times"},vs={en:Ke};function S(i){return i?.locale?.language||i?.language||"en"}function p(i,t,e={}){let s=S(i).split("-")[0],o=(vs[s]??Ke)[t]??Ke[t]??t;for(let[r,c]of Object.entries(e))o=o.replace(`{${r}}`,String(c));return o}var Ye=864e5;function de(i){if(!i)return;let t=i.state;if(t==="unknown"||t==="unavailable"||t===""||t==null)return;let e=Number(t);return Number.isFinite(e)?e:void 0}function le(i){return!!i&&i.state!=="unavailable"&&i.state!=="unknown"}function y(i,t="en",e=0){try{return new Intl.NumberFormat(t,{maximumFractionDigits:e}).format(i)}catch{return String(Math.round(i))}}var T=(i,t,e)=>{let s=y(i,e);return t==="d"?{value:s,unit:i===1?"unit.day":"unit.days",short:"d"}:t==="h"?{value:s,unit:i===1?"unit.hour":"unit.hours",short:"h"}:{value:s,unit:"unit.min",short:"min"}};function Ze(i,t="days_hours",e="en"){let s=Math.max(0,Math.round(i)),n=Math.floor(s/1440),o=Math.floor(s%1440/60),r=s%60;if(t==="hours"){let c=Math.floor(s/60);return c>0?[T(c,"h",e)]:[T(r,"min",e)]}return t==="auto"?n>=1?[T(n,"d",e),T(o,"h",e)]:o>=1?[T(o,"h",e),T(r,"min",e)]:[T(r,"min",e)]:n>=1?[T(n,"d",e),T(o,"h",e)]:o>=1?[T(o,"h",e)]:[T(r,"min",e)]}function he(i,t="days_hours",e="en"){return Ze(i,t,e).map(s=>`${s.value} ${s.short}`).join(" ")}function zt(i){let t=i.reduce((r,c)=>r+c,0);if(t<=0)return i.map(()=>0);let e=i.map(r=>r/t*100),s=e.map(Math.floor),n=100-s.reduce((r,c)=>r+c,0),o=e.map((r,c)=>({i:c,frac:r-Math.floor(r)})).sort((r,c)=>c.frac-r.frac);for(let{i:r}of o){if(n<=0)break;s[r]+=1,n-=1}return s}var bs=726;function Ve(i,t,e){let s=S(i),n=e/1440;switch(t){case"months":{if(n<1)return;if(n<30)return p(i,"fun.days",{n:y(n,s)});let o=n/30.4375;return o<24?p(i,"fun.months",{n:y(o,s,1)}):p(i,"fun.years",{n:y(o/12,s,1)})}case"workweeks":{let o=e/60/40;return o>=2?p(i,"fun.workweeks",{n:y(o,s)}):void 0}case"lotr":{let o=e/bs;return o>=2?p(i,"fun.lotr",{n:y(o,s)}):void 0}}}function Ht(i,t,e="rotate",s=Date.now()){if(!(t>=1440))return;if(e!=="rotate")return Ve(i,e,t);let o=["months","workweeks","lotr"].filter(c=>Ve(i,c,t));if(!o.length)return;let r=o[Math.floor(s/Ye)%o.length];return Ve(i,r,t)}function Lt(i,t){let e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(i),s=n=>Number(e.find(o=>o.type===n)?.value);return Math.round(Date.UTC(s("year"),s("month")-1,s("day"))/Ye)}function Ft(i){let{now:t,lastWatchedIso:e,current:s,timeZone:n,lang:o="en"}=i,r=Lt(t,n),c=e?new Date(e):void 0,a=c&&!isNaN(c.getTime())?Lt(c,n):void 0,u=new Intl.DateTimeFormat(o,{weekday:"narrow",timeZone:"UTC"}),m=[];for(let f=6;f>=0;f--){let _=r-f,x=a!==void 0&&s>0&&_<=a&&_>a-s;m.push({label:u.format(new Date(_*Ye)),filled:x,today:f===0})}let h=m[6].filled;return{days:m,todayFilled:h,stillTimeToday:!h&&s>0&&a===r-1}}function Ge(i,t){let e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(i),s=n=>e.find(o=>o.type===n)?.value??"";return`${s("year")}-${s("month")}-${s("day")}`}function Ce(i,t,e){return new Intl.DateTimeFormat(t,{weekday:e,timeZone:"UTC"}).format(new Date(`${i}T00:00:00Z`))}function Wt(i,t,e,s){let n=new Date(i);if(!Number.isNaN(n.getTime()))try{return new Intl.DateTimeFormat(t,{hour:"numeric",minute:"2-digit",timeZone:e,hour12:s}).format(n)}catch{return}}function O(i){return i.tmdbId!==void 0?`tmdb:${i.tmdbId}`:i.refractId?`refract:${i.refractId}`:`title:${i.title.toLowerCase()}`}var v=i=>typeof i=="number"&&Number.isFinite(i)?i:void 0,Re=i=>{let t=i.filter(e=>e!==void 0);return t.length?t.reduce((e,s)=>e+s,0):void 0};function Je(i,t){let e=i?.show??{},s=e.title??t;if(!s)return;let n=i?.next_episode??{};return{title:s,year:v(e.year),isAnime:!!e.is_anime,status:typeof i?.status=="string"?i.status:void 0,season:v(n.season),number:v(n.number),episodeName:typeof n.name=="string"?n.name:void 0,aired:n.aired!==!1,premiere:!!n.is_season_premiere,finale:!!n.is_season_finale,midFinale:!!n.is_mid_season_finale,airedEpisodes:v(i?.aired_episodes),remaining:v(i?.remaining_episodes),refractId:typeof e.ids?.refract=="string"?e.ids.refract:void 0,tmdbId:v(e.ids?.tmdb),posterUrl:typeof i?.poster_url=="string"&&i.poster_url?i.poster_url:void 0}}var jt=["completed","up_to_date","in_progress","planned","on_hold","dropped"],ws={watchlist:"planned",paused:"on_hold",onhold:"on_hold",abandoned:"dropped"};function xs(i){if(!i||typeof i!="object"||Array.isArray(i))return;let t=new Map;for(let[s,n]of Object.entries(i)){let o=v(n);if(o===void 0||o<=0)continue;let r=s.trim().toLowerCase().replace(/[\s-]+/g,"_"),c=ws[r]??r;t.set(c,(t.get(c)??0)+o)}if(!t.size)return;let e=s=>{let n=jt.indexOf(s);return n===-1?jt.length:n};return[...t.entries()].map(([s,n])=>({key:s,count:n})).sort((s,n)=>e(s.key)-e(n.key)||s.key.localeCompare(n.key))}function qt(i,t,e){let s=b=>{let g=t.entities[b];return g?i.states[g]:void 0},n=b=>de(s(b)),o=Object.keys(t.entities).length>0,r=Nt(e.name??Ut(i,t)),c=n("movies"),a=n("tv_shows"),u=n("anime"),m=n("library_total")??Re([c,a,u]),h=n("completed"),f=n("in_progress"),_=n("up_to_date"),x=n("watchlist"),J=Re([h,f,_,x]),Vt=m!==void 0&&J!==void 0?Math.max(0,m-J):void 0,Yt=xs(s("library_total")?.attributes?.by_status),Qe=n("stats_watch_time_shows_minutes"),et=n("stats_watch_time_movies_minutes"),tt=n("stats_watch_time_anime_minutes"),Zt=n("stats_watch_time_total_minutes")??Re([Qe,et,tt]),B=s("last_watched"),Gt=le(B)?{iso:B.state,title:typeof B.attributes.title=="string"?B.attributes.title:void 0,season:v(B.attributes.season),episode:v(B.attributes.episode)}:void 0,fe=n("stats_streak_current_days"),Jt=n("stats_streak_longest_days"),X=s("next_up"),ge={kind:"hidden"};if(X&&X.state!=="unavailable"){let b=le(X)?Je(X.attributes,X.state):void 0;ge=b?{kind:"item",item:b}:{kind:"empty"}}let Xt=ge.kind==="item"?ge.item:void 0,st,_e=s("last_7_days");if(le(_e)&&Array.isArray(_e.attributes.days)){let b=_e.attributes.days.map(g=>({date:String(g?.date??""),episodes:v(g?.episodes)??0,movies:v(g?.movies)??0})).filter(g=>/^\d{4}-\d{2}-\d{2}$/.test(g.date));if(b.length){let g=_e.attributes.busiest_day;st={days:b,episodes:b.reduce(($,H)=>$+H.episodes,0),movies:b.reduce(($,H)=>$+H.movies,0),busiest:typeof g?.date=="string"&&v(g?.count)?{date:g.date,count:g.count}:void 0}}}let nt,K=s("average_per_week");if(K&&K.state!=="unavailable"){let b=de(K),g=v(K.attributes.items_per_week);if(b!==void 0||g!==void 0){let $=K.attributes.change_percent;nt={hours:b,itemsPerWeek:g,changePct:typeof $=="number"?$:null,estimated:K.attributes.estimated!==!1}}}let Me,N=s("catch_up");if(N&&N.state!=="unavailable"&&N.state!=="unknown"){let b=de(N)??0,g=Array.isArray(N.attributes.shows)?N.attributes.shows:[],$=new Map,H=s("shows_waiting");if(H&&Array.isArray(H.attributes.items))for(let w of H.attributes.items){let U=Je(w);U&&$.set(O(U),U)}let rt=g.map(w=>{let U=v(w?.remaining);if(typeof w?.title!="string"||U===void 0)return;let De=typeof w.poster_url=="string"&&w.poster_url?w.poster_url:void 0,at=typeof w.refract_id=="string"&&w.refract_id?w.refract_id:void 0,ct={title:w.title,year:v(w.year),remaining:U,isAnime:!!w.is_anime,tmdbId:v(w.tmdb_id),refractId:at,posterUrl:De},k=Je({show:{title:w.title,year:w.year,is_anime:w.is_anime,ids:{tmdb:w.tmdb_id,refract:at}},next_episode:w.next_episode,aired_episodes:w.aired_episodes,remaining_episodes:U,poster_url:De});return k&&(k.season===void 0||k.number===void 0)&&(k=void 0),k??=$.get(O(ct)),k&&(k.season===void 0||k.number===void 0)&&(k=void 0),k&&(k={...k,posterUrl:De??k.posterUrl,remaining:k.remaining??U}),{...ct,next:k}}).filter(w=>!!w);Me={total:b,minutes:v(N.attributes.estimated_minutes),showCount:v(N.attributes.show_count)??rt.length,shows:rt}}let it,Oe=s("still_to_finish");if(le(Oe)){let b=Oe.attributes,g=$=>({count:Math.max(0,v($?.count)??0),minutes:v($?.minutes),episodes:v($?.episodes),notStarted:v($?.not_started),started:v($?.started),unknown:v($?.unknown_episodes)});it={minutes:de(Oe),movies:g(b.movies),shows:g(b.shows),anime:g(b.anime),estimated:b.estimated!==!1,unknownShows:v(b.unknown_episode_shows)??0}}let ot,Q=s("airing_this_week");Q&&Q.state!=="unavailable"&&Q.state!=="unknown"&&(ot=(Array.isArray(Q.attributes.episodes)?Q.attributes.episodes:[]).map(g=>typeof g?.show=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(String(g?.date))?{date:g.date,show:g.show,season:v(g.season),number:v(g.number),title:typeof g.title=="string"?g.title:void 0,isAnime:!!g.is_anime,premiere:!!g.premiere,finale:!!g.finale,airAt:typeof g.air_at=="string"&&g.air_at?g.air_at:void 0}:void 0).filter(g=>!!g));let Qt=!!Xt?.posterUrl||!!Me?.shows.some(b=>b.posterUrl);return{found:o,accountMain:r.main,accountSub:r.sub,last:Gt,minutes:{total:Zt,shows:Qe,movies:et,anime:tt},library:{total:m,movies:c,shows:a,anime:u,completed:h,inProgress:f,upToDate:_,watchlist:x,other:Vt,statuses:Yt},moviesWatched:n("stats_movies_watched"),episodesWatched:Re([n("stats_shows_episodes_watched"),n("stats_anime_episodes_watched")]),streak:fe!==void 0?{current:fe,longest:Math.max(Jt??fe,fe)}:void 0,next:ge,last7:st,average:nt,catchup:Me,finish:it,airing:ot,hasPosters:Qt}}var Bt=be`
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
  .finish-total {
    margin-top: 4px;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.1;
    color: var(--c-accent);
    font-variant-numeric: tabular-nums;
  }
  .finish-hours {
    margin-top: 10px;
    font-size: 15px;
    color: var(--secondary-text-color);
  }
  .finish-note {
    margin-top: 8px;
    font-size: 12px;
    line-height: 1.4;
    color: var(--secondary-text-color);
    opacity: 0.85;
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
  .finish-sub {
    margin-top: 2px;
    font-size: 12px;
    color: var(--secondary-text-color);
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
`,Kt=be`
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
`;var G=["hero","watch_time","still_to_finish","library","streak","average","last_7_days","next_up","catchup","airing"];function pe(i){let t=[];if(Array.isArray(i))for(let e of i)G.includes(e)&&!t.includes(e)&&t.push(e);for(let e of G)t.includes(e)||t.push(e);return t}var ue={layout:"full",library_style:"bar",watch_time_style:"bar",duration_format:"days_hours",fun_stat:!0,fun_stat_mode:"rotate",queue_length:5,airing_length:5,show_hero:!0,show_watch_time:!0,show_library:!0,show_still_to_finish:!0,show_streak:!0,show_average:!0,show_last_7_days:!0,show_next_up:!0,show_catchup:!0,show_airing:!0,show_posters:!0,show_actions:!1,confirm_actions:!0};var C=class extends M{constructor(){super(...arguments);this._catchupExpanded=!1;this._airingExpanded=!1;this._actionState="idle";this._actionError="";this._actionTarget=""}static async getConfigElement(){return document.createElement(Ee)}static getStubConfig(e){let s=e?.entities??{},n=Object.keys(s).filter(a=>a.startsWith("sensor.")&&s[a].platform===P),o=Object.keys(e?.states??{}).filter(a=>a.startsWith("sensor.refract_")),r=n.length?n:o;return{entity:r.find(a=>a.endsWith("_next_up"))??r[0]??""}}setConfig(e){if(!e||typeof e!="object")throw new Error("Invalid configuration");let s=Object.fromEntries(Object.entries(e).filter(([,n])=>n!=null));s.show_queue!==void 0&&s.show_catchup===void 0&&(s.show_catchup=s.show_queue),this._config=e,this._cfg={...ue,...s},this._disc=void 0}getCardSize(){if(!this._cfg)return 12;let e=this._cfg,s=e.layout==="full",n=1;return e.show_hero&&(n+=3),s&&e.show_watch_time&&(n+=2),s&&e.show_library&&(n+=2),s&&e.show_still_to_finish&&(n+=3),e.show_streak&&(n+=3),s&&e.show_last_7_days&&(n+=3),e.show_next_up&&(n+=3),s&&e.show_catchup&&(n+=2+Math.min(e.queue_length,5)),s&&e.show_airing&&(n+=2+Math.min(e.airing_length,5)),n}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}shouldUpdate(e){if(!this._config||!this.hass)return!1;if([...e.keys()].some(o=>o!=="hass"))return!0;let n=e.get("hass");if(!n||n.locale!==this.hass.locale||n.entities!==this.hass.entities||n.devices!==this.hass.devices)return!0;for(let o of Object.values(this._discovery().entities))if(n.states[o]!==this.hass.states[o])return!0;return!1}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._actionTimer)}_discovery(){let e=this.hass,s=this._config;return(!this._disc||!this._discFor||this._discFor.config!==s||this._discFor.entities!==e.entities||this._discFor.devices!==e.devices||Object.keys(this._disc.entities).length===0)&&(this._disc=Pt(e,s),this._discFor={config:s,entities:e.entities,devices:e.devices}),this._disc}render(){if(!this._config||!this.hass)return l;let e=this._cfg;if(!e.entity&&!e.device_id&&!e.entities)return this._message(p(this.hass,"empty.no_entity"));let s=this._discovery(),n=qt(this.hass,s,e);if(!n.found)return this._message(p(this.hass,"empty.not_found",{entity:e.entity??e.device_id??""}));let o=e.layout==="compact",r=e.show_posters&&n.hasPosters,c={hero:e.show_hero?this._hero(n):l,watch_time:!o&&e.show_watch_time?this._watchTime(n):l,still_to_finish:!o&&e.show_still_to_finish?this._finish(n):l,library:!o&&e.show_library?this._library(n):l,streak:e.show_streak&&n.streak?this._streak(n):l,average:!o&&e.show_average?this._average(n):l,last_7_days:!o&&e.show_last_7_days?this._last7(n):l,next_up:e.show_next_up?this._next(n,r):l,catchup:!o&&e.show_catchup?this._catchup(n,r):l,airing:!o&&e.show_airing?this._airing(n):l},a=[],u=[],m=()=>{u.length&&a.push(d`<div class="grid">${u}</div>`),u=[]};for(let h of pe(e.section_order)){let f=c[h];f!==l&&(h==="streak"||h==="average"?u.push(f):(m(),a.push(f)))}return m(),d`<ha-card style=${Ct(this._colorVars())}> ${this._header(n)} ${a} </ha-card>`}_message(e){return d`<ha-card><div class="empty" style="padding:16px">${e}</div></ha-card>`}_colorVars(){let e=this._cfg,s={};return e.color_movies&&(s["--refract-color-movies"]=e.color_movies),e.color_shows&&(s["--refract-color-shows"]=e.color_shows),e.color_anime&&(s["--refract-color-anime"]=e.color_anime),e.color_accent&&(s["--refract-color-accent"]=e.color_accent),s}_header(e){let s=e.last,n=s?.season!==void 0&&s?.episode!==void 0?` S${s.season} E${s.episode}`:"";return d`<div class="header">
      <div class="brand">
        <ha-icon icon="mdi:chart-donut"></ha-icon>
        <span class="name">${e.accountMain}</span>
        ${e.accountSub?d`<span class="sub">${e.accountSub}</span>`:l}
      </div>
      ${s?d`<span class="last" title="${p(this.hass,"header.last_watched")}">
            ${s.title?d`${s.title}${n} · `:l}<ha-relative-time
              .hass=${this.hass}
              .datetime=${s.iso}
            ></ha-relative-time>
          </span>`:l}
    </div>`}_hero(e){let s=S(this.hass),n=this._cfg,o=e.minutes.total,c=[[p(this.hass,"hero.library"),e.library.total],[p(this.hass,"hero.movies_seen"),e.moviesWatched],[p(this.hass,"hero.episodes"),e.episodesWatched]].filter(([,u])=>u!==void 0);if(o===void 0&&c.length===0)return l;let a=n.fun_stat&&o!==void 0?Ht(this.hass,o,n.fun_stat_mode):void 0;return d`<div>
      <div class="hero">
        ${o!==void 0?d`<div class="hero-main">
              <div class="label">${p(this.hass,"hero.total")}</div>
              <div class="big">
                ${Ze(o,n.duration_format,s).map((u,m)=>d`<span class="part"
                        ><span class="num ${m>0?"second":""}">${u.value}</span>
                        <span class="unit">${p(this.hass,u.unit)}</span></span
                      >
                    `)}
              </div>
              ${a?d`<div class="fun"><ha-icon icon="mdi:shimmer"></ha-icon><span>${a}</span></div>`:l}
            </div>`:l}
        ${c.length?d`<div class="tiles">
              ${c.map(([u,m])=>d`<div class="tile">
                    <div class="label">${u}</div>
                    <div class="value">${y(m,s)}</div>
                  </div>`)}
            </div>`:l}
      </div>
    </div>`}_library(e){let s=S(this.hass),n=e.library,o={completed:"var(--c-completed)",up_to_date:"var(--c-up-to-date)",in_progress:"var(--c-in-progress)",planned:"var(--c-watchlist)",on_hold:"var(--c-on-hold)",dropped:"var(--c-dropped)"},r={planned:"status.watchlist"},c=f=>{let _=r[f]??`status.${f}`,x=p(this.hass,_);if(x!==_)return x;let J=f.replace(/_/g," ");return J.charAt(0).toUpperCase()+J.slice(1)},a=n.statuses?n.statuses.map(f=>[c(f.key),f.count,o[f.key]??"var(--track)"]):[["status.completed",n.completed,"var(--c-completed)"],["status.up_to_date",n.upToDate,"var(--c-up-to-date)"],["status.in_progress",n.inProgress,"var(--c-in-progress)"],["status.watchlist",n.watchlist,"var(--c-watchlist)"],["status.other",n.other&&n.other>0?n.other:void 0,"var(--track)"]].filter(([,f])=>f!==void 0).map(([f,_,x])=>[p(this.hass,f),_,x]);if(!a.length)return l;let u=this._cfg.library_style==="list",m=a.reduce((f,[,_])=>f+_,0),h=d`<div
      class="status-bar ${u?"spaced":""}"
      role="img"
      aria-label=${a.map(([f,_])=>`${f} ${_}`).join(", ")}
    >
      ${a.map(([,f,_])=>d`<span style="flex:${f} 1 0; background:${_}"></span>`)}
    </div>`;return d`<div class="panel library">
      <div class="label" style="margin-bottom:${u?12:10}px">${p(this.hass,"library.title")}</div>
      ${h}
      ${u?d`<div class="stat-list">
            ${a.map(([f,_,x])=>d`<div class="stat-row">
                <span class="stat-dot" style="background:${x}"></span>
                <span class="stat-name">${f}</span>
                <b class="stat-count">${y(_,s)}</b>
                <span class="stat-pct">${m?Math.round(_/m*100):0}%</span>
              </div>`)}
          </div>`:d`<div class="status-legend">
            ${a.map(([f,_,x])=>d`<span><span class="swatch sm" style="background:${x}"></span>${f} ${y(_,s)}</span>`)}
          </div>`}
    </div>`}_timeZone(){return this.hass.locale?.time_zone==="server"?this.hass.config?.time_zone:void 0}_hour12(){let e=this.hass.locale?.time_format;return e==="12"?!0:e==="24"?!1:void 0}_streak(e){let s=S(this.hass),n=e.streak,o=p(this.hass,n.current===1?"unit.day":"unit.days"),r=Ft({now:new Date,lastWatchedIso:e.last?.iso,current:n.current,timeZone:this._timeZone(),lang:s}),c=n.current===0?p(this.hass,"streak.none"):[p(this.hass,"streak.longest",{n:n.longest,unit:p(this.hass,n.longest===1?"unit.day":"unit.days")}),r.stillTimeToday?p(this.hass,"streak.still_time"):""].filter(Boolean).join(" \xB7 ");return d`<div class="panel streak">
      <div class="label">${p(this.hass,"streak.title")}</div>
      <div class="metric">${y(n.current,s)} <span class="unit">${o}</span></div>
      <div class="dots" role="img" aria-label="${n.current} ${o}">
        ${r.days.map(a=>d`<div class="dot-col ${a.today?"today":""}">
              <span class="dot ${a.filled?"filled":"open"} ${a.today?"today":""}"></span>${a.label}
            </div>`)}
      </div>
      <div class="streak-foot">${c}</div>
    </div>`}_average(e){let s=e.average;if(!s)return l;let n=S(this.hass),o;if(s.hours!==void 0)o=d`${y(s.hours,n,1)} <span class="unit">${p(this.hass,"unit.h")}</span>`;else if(s.itemsPerWeek!==void 0)o=d`${y(s.itemsPerWeek,n,1)} <span class="unit">${p(this.hass,"avg.items_unit")}</span>`;else return l;let r=s.changePct,c=r==null?l:d`<div class="trend ${r>0?"up":r<0?"down":""}">
            ${r>0?"\u25B2":r<0?"\u25BC":"\u2013"} ${Math.abs(r)}% ${p(this.hass,"avg.vs_previous")}
          </div>`;return d`<div class="panel average">
      <div class="label">${p(this.hass,"avg.title")}</div>
      <div class="metric" title=${s.estimated&&s.hours!==void 0?p(this.hass,"avg.estimated"):""}>
        ${s.hours!==void 0&&s.estimated?d`<span class="approx">~</span>`:l}${o}
      </div>
      <div class="avg-mid">
        ${s.hours!==void 0&&s.itemsPerWeek!==void 0?d`<div class="avg-items">
              ${s.itemsPerWeek===1?p(this.hass,"avg.items_line_one"):p(this.hass,"avg.items_line",{n:y(s.itemsPerWeek,n,1)})}
            </div>`:l}
      </div>
      ${c}
    </div>`}_last7(e){let s=e.last7;if(!s)return l;let n=S(this.hass),o=Ge(new Date,this._timeZone()),r=s.days.map(h=>h.episodes+h.movies),c=Math.max(1,...r),a=84,u=s.busiest?Ce(s.busiest.date,n,"long"):void 0,m=`${p(this.hass,"days7.episodes")} ${s.episodes}, ${p(this.hass,"days7.movies")} ${s.movies}`;return d`<div class="panel last7">
      <div class="panel-head">
        <span class="label">${p(this.hass,"days7.title")}</span>
        ${u?d`<span class="badge accent">${p(this.hass,"days7.busiest",{day:u})}</span>`:l}
      </div>
      <div class="bars" role="img" aria-label=${m}>
        ${s.days.map((h,f)=>{let _=r[f],x=_===0?3:Math.max(8,Math.round(_/c*a));return d`<div class="day ${h.date===o?"today":""}">
            <div class="slot">
              ${h.episodes>0?d`<span class="day-count">${y(h.episodes,n)}</span>`:l}
              <div class="bar ${_===0?"empty":""}" style="height:${x}px">
                ${h.movies?d`<span class="seg movies" style="flex:${h.movies} 1 0"></span>`:l}
                ${h.episodes?d`<span class="seg shows" style="flex:${h.episodes} 1 0"></span>`:l}
              </div>
            </div>
            <span class="day-label">${Ce(h.date,n,"narrow")}</span>
          </div>`})}
      </div>
      <div class="legend-row">
        <span><span class="swatch" style="background:var(--c-shows)"></span>${p(this.hass,"days7.episodes")} <b>${y(s.episodes,n)}</b></span>
        <span><span class="swatch" style="background:var(--c-movies)"></span>${p(this.hass,"days7.movies")} <b>${y(s.movies,n)}</b></span>
      </div>
      ${s.episodes+s.movies===0?d`<div class="empty">${p(this.hass,"days7.none")}</div>`:l}
    </div>`}_watchTime(e){let s=S(this.hass),n=this._cfg.duration_format,o=[{key:"library.shows",minutes:e.minutes.shows,color:"var(--c-shows)"},{key:"library.movies",minutes:e.minutes.movies,color:"var(--c-movies)"},{key:"library.anime",minutes:e.minutes.anime,color:"var(--c-anime)"}].filter(a=>a.minutes!==void 0);if(!o.length)return l;let r=zt(o.map(a=>a.minutes)),c=this._cfg.watch_time_style==="list";return d`<div class="panel">
      <div class="label" style="margin-bottom:${c?12:8}px">${p(this.hass,"watch.title")}</div>
      <div
        class="stack ${c?"spaced":""}"
        role="img"
        aria-label=${o.map((a,u)=>`${p(this.hass,a.key)} ${r[u]}%`).join(", ")}
      >
        ${o.map(a=>d`<span style="flex:${Math.max(a.minutes,0)} 1 0; background:${a.color}"></span>`)}
      </div>
      ${c?d`<div class="stat-list">
            ${o.map((a,u)=>d`<div class="stat-row">
                <span class="stat-dot" style="background:${a.color}"></span>
                <span class="stat-name">${p(this.hass,a.key)}</span>
                <b class="stat-count">${he(a.minutes,n,s)}</b>
                <span class="stat-pct">${r[u]}%</span>
              </div>`)}
          </div>`:d`<div class="watch-cols">
            ${o.map((a,u)=>d`<div class="watch-col">
                  <div class="row"><span class="swatch" style="background:${a.color}"></span>${p(this.hass,a.key)} (${r[u]}%)</div>
                  <div class="value">${he(a.minutes,n,s)}</div>
                </div>`)}
          </div>`}
    </div>`}_finish(e){let s=e.finish;if(!s)return l;let n=S(this.hass),o=this._cfg.duration_format,r=(m,h)=>p(this.hass,h===1?`${m}_one`:m,{n:y(h,n)}),c=m=>m===void 0?"":he(m,o,n),a=[{key:"finish.movies",group:s.movies,color:"var(--c-movies)",shows:!1},{key:"finish.shows",group:s.shows,color:"var(--c-shows)",shows:!0},{key:"finish.anime",group:s.anime,color:"var(--c-anime)",shows:!0}].filter(m=>m.group.count>0),u=s.minutes;return d`<div class="panel finish">
      <div class="label">${p(this.hass,"finish.title")}</div>
      ${a.length?d`${u!==void 0&&u>0?d`<div class="finish-total">${c(u)}</div>
                  <div class="finish-hours">${r("finish.hours",Math.round(u/60))}</div>`:l}
            ${s.estimated?d`<div class="finish-note">${p(this.hass,"finish.estimate")}</div>`:l}
            ${s.unknownShows>0?d`<div class="finish-note">${r("finish.partial",s.unknownShows)}</div>`:l}
            <div class="finish-rows">
              ${a.map(m=>{let h=m.group,f=m.shows?[h.episodes?r("finish.episodes",h.episodes):"",[h.notStarted?p(this.hass,"finish.not_started",{n:y(h.notStarted,n)}):"",h.started?p(this.hass,"finish.started",{n:y(h.started,n)}):""].filter(Boolean).join(", ")].filter(Boolean).join(" \xB7 "):"";return d`<div class="finish-row">
                  <div>
                    <div class="finish-name">${r(m.key,h.count)}</div>
                    ${f?d`<div class="finish-sub">${f}</div>`:l}
                  </div>
                  ${h.minutes!==void 0&&h.minutes>0?d`<span class="finish-time" style="color:${m.color}">${c(h.minutes)}</span>`:l}
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
          />`:l}
    </div>`}_pickedShow(e){if(!this._selected)return;let s=e.catchup?.shows.find(o=>O(o)===this._selected&&o.next),n=e.next.kind==="item"?O(e.next.item):void 0;if(!s||!this._cfg.show_next_up||O(s)===n){this._selected=void 0;return}return s}_selectShow(e,s){if(!e.next)return;let n=O(e);this._selected=n===s||this._selected===n?void 0:n,this._clearAction(),this.requestUpdate(),this._selected&&this.updateComplete.then(()=>{this.renderRoot.querySelector(".panel.next")?.scrollIntoView?.({block:"nearest",behavior:"smooth"})})}_clearAction(){window.clearTimeout(this._actionTimer),this._actionState="idle",this._actionError="",this._actionTarget=""}_next(e,s){let n=this._pickedShow(e),o=n?{kind:"item",item:n.next}:e.next;if(o.kind==="hidden")return l;if(o.kind==="empty")return d`<div class="panel next">
        <div class="label">${p(this.hass,"next.title")}</div>
        <div class="empty">${p(this.hass,"empty.nothing_up_next")}</div>
      </div>`;let r=o.item,c=S(this.hass),u=[r.season!==void 0&&r.number!==void 0?`S${r.season} E${r.number}`:"",r.episodeName].filter(Boolean).join(" \xB7 "),m=r.airedEpisodes,h=m!==void 0&&r.remaining!==void 0?Math.max(0,m-r.remaining):void 0,f=m&&h!==void 0?Math.min(100,h/m*100):void 0;return d`<div class="panel next ${s?"with-poster":""}">
      ${s?this._poster(r.posterUrl,r.title,"lg"):l}
      <div class="next-body">
        <div class="next-head">
          <span class="label">${p(this.hass,"next.title")}</span>
          ${r.isAnime?d`<span class="badge">${p(this.hass,"badge.anime")}</span>`:l} ${this._badge(r)}
        </div>
        <div class="next-main">
          <div>
            <div class="next-title">
              <span>${r.title}</span>
              ${r.year?d`<span class="year">${r.year}</span>`:l}
            </div>
            ${u?d`<div class="next-ep">${u}</div>`:l}
          </div>
          ${this._actionButton(r)}
        </div>
        ${f!==void 0?d`<div class="progress" role="img" aria-label="${h} / ${m}"><span style="width:${f}%"></span></div>
              <div class="next-foot">
                <span>${p(this.hass,"next.progress",{watched:y(h,c),aired:y(m,c)})}</span>
                ${r.remaining!==void 0?d`<span>${p(this.hass,"next.remaining",{n:y(r.remaining,c)})}</span>`:l}
              </div>`:l}
      </div>
    </div>`}_badge(e){return e.aired?e.premiere?d`<span class="badge accent">${p(this.hass,"badge.premiere")}</span>`:e.finale?d`<span class="badge warn">${p(this.hass,"badge.finale")}</span>`:e.midFinale?d`<span class="badge warn">${p(this.hass,"badge.mid_finale")}</span>`:l:d`<span class="badge">${p(this.hass,"badge.not_aired")}</span>`}_canMarkWatched(e){return this._cfg.show_actions&&!!this.hass.services?.[P]?.mark_episode_watched&&e.aired&&e.season!==void 0&&e.number!==void 0&&(e.tmdbId!==void 0||!!e.refractId)}_actionButton(e){if(!this._canMarkWatched(e))return l;let s=this._actionState,n={idle:"mdi:check",confirm:"mdi:help-circle-outline",busy:"mdi:loading",done:"mdi:check-circle",error:"mdi:alert-circle-outline"}[s],o={idle:"next.mark",confirm:"next.confirm",busy:"next.busy",done:"next.done",error:"next.error"}[s];return d`<button class="action" data-state=${s} title=${this._actionError} @click=${()=>this._markWatched(e)}>
      <ha-icon icon=${n}></ha-icon>${p(this.hass,o)}
    </button>`}_resetActionLater(e){window.clearTimeout(this._actionTimer),this._actionTimer=window.setTimeout(()=>{this._actionState="idle",this._actionError=""},e)}async _configEntryId(){if(this._cfg.config_entry_id)return this._cfg.config_entry_id;let e=this._discovery().entities.next_up??this._cfg.entity;if(e)try{return(await this.hass.callWS({type:"config/entity_registry/get",entity_id:e}))?.config_entry_id}catch{return}}async _markWatched(e){if(this._actionState==="busy")return;let s=`${O(e)}:${e.season}:${e.number}`;if(this._cfg.confirm_actions&&(this._actionState!=="confirm"||this._actionTarget!==s)){this._actionTarget=s,this._actionState="confirm",this._resetActionLater(3e3);return}window.clearTimeout(this._actionTimer),this._actionState="busy";try{let n={season:e.season,number:e.number};e.tmdbId!==void 0?n.tmdb_id=e.tmdbId:n.refract_id=e.refractId;let o=await this._configEntryId();o&&(n.config_entry_id=o),await this.hass.callService(P,"mark_episode_watched",n),this._actionState="done",this._resetActionLater(2500),this._refreshSensors()}catch(n){this._actionError=n instanceof Error?n.message:String(n),this._actionState="error",this._resetActionLater(4e3)}}_refreshSensors(){let e=this._discovery().entities,s=[e.next_up,e.shows_waiting,e.catch_up,e.last_7_days,e.average_per_week,e.last_watched,e.stats_streak_current_days].filter(Boolean);s.length&&this.hass.callService("homeassistant","update_entity",{entity_id:s}).catch(()=>{})}_catchup(e,s){let n=e.catchup;if(!n)return l;let o=S(this.hass),r=this._cfg.queue_length,c=n.shows.length>r,a=this._catchupExpanded?n.shows:n.shows.slice(0,r),u=Math.max(1,...n.shows.map(f=>f.remaining)),m=e.next.kind==="item"?O(e.next.item):void 0,h=n.minutes!==void 0&&n.total>0?`, ${p(this.hass,"catchup.about",{time:he(n.minutes,this._cfg.duration_format,o)})}`:"";return d`<div class="panel catchup">
      <div class="panel-head">
        <span class="label">${p(this.hass,"catchup.title")}</span>
      </div>
      ${n.total>0?d`<div class="catch-line">
            <span class="metric">${y(n.total,o)}</span>
            <span class="muted">${p(this.hass,"catchup.waiting")}${h}</span>
          </div>`:d`<div class="empty">${p(this.hass,"catchup.none")}</div>`}
      ${a.map(f=>this._catchupRow(f,u,s,o,m))}
      ${c?d`<button class="link" @click=${()=>this._catchupExpanded=!this._catchupExpanded}>
            ${this._catchupExpanded?p(this.hass,"catchup.show_less"):p(this.hass,"catchup.show_all",{n:y(n.shows.length,o)})}
          </button>`:l}
    </div>`}_catchupRow(e,s,n,o,r){let c=O(e),a=this._cfg.show_next_up&&!!e.next&&(c!==r||this._selected!==void 0),u=a&&this._selected===c,m=d`${n?this._poster(e.posterUrl,e.title,"sm"):l}
      <span class="c-name" title=${e.title}>${e.title}</span>
      <div class="progress" role="img" aria-label="${e.remaining}"><span style="width:${e.remaining/s*100}%"></span></div>
      <b class="c-count">${y(e.remaining,o)}</b>`;return a?d`<div
      class="c-row pickable ${u?"selected":""}"
      role="button"
      tabindex="0"
      aria-pressed=${u?"true":"false"}
      title=${p(this.hass,"catchup.pick",{title:e.title})}
      @click=${()=>this._selectShow(e,r)}
      @keydown=${h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),this._selectShow(e,r))}}
    >
      ${m}
    </div>`:d`<div class="c-row">${m}</div>`}_airing(e){let s=e.airing;if(!s)return l;let n=S(this.hass),o=Ge(new Date,this._timeZone()),r=this._cfg.airing_length,c=s.length>r,a=this._airingExpanded?s:s.slice(0,r);return d`<div class="panel airing">
      <div class="panel-head"><span class="label">${p(this.hass,"airing.title")}</span></div>
      ${a.length?a.map(u=>{let m=u.season!==void 0&&u.number!==void 0?`S${u.season} \xB7 E${u.number}`:"",h=u.airAt?Wt(u.airAt,n,this._timeZone(),this._hour12()):void 0;return d`<div class="a-row">
              <span class="a-day ${u.date===o?"today":""}">${u.date===o?p(this.hass,"airing.today"):Ce(u.date,n,"short")}</span>
              <span class="swatch" style="background:${u.isAnime?"var(--c-anime)":"var(--c-shows)"}"></span>
              <span class="a-name"><b>${u.show}</b>${m?d` <span class="muted">${m}</span>`:l}</span>
              ${u.premiere?d`<span class="badge accent">${p(this.hass,"badge.premiere")}</span>`:u.finale?d`<span class="badge warn">${p(this.hass,"badge.finale")}</span>`:l}
              ${h?d`<span class="a-time">${h}</span>`:l}
            </div>`}):d`<div class="empty">${p(this.hass,"airing.none")}</div>`}
      ${c?d`<button class="link" @click=${()=>this._airingExpanded=!this._airingExpanded}>
            ${this._airingExpanded?p(this.hass,"airing.show_less"):p(this.hass,"airing.show_all",{n:y(s.length,n)})}
          </button>`:l}
    </div>`}};C.styles=Bt,E([Z({attribute:!1})],C.prototype,"hass",2),E([z()],C.prototype,"_config",2),E([z()],C.prototype,"_catchupExpanded",2),E([z()],C.prototype,"_airingExpanded",2),E([z()],C.prototype,"_actionState",2),E([z()],C.prototype,"_actionError",2),C=E([Se(ce)],C);var R={entity:"Refract entity",name:"Name (optional)",layout:"Layout",library_style:"Library style",watch_time_style:"Watch time style",duration_format:"Duration format",queue_length:"Catch-up rows",airing_length:"Airing rows",fun_stat:"Show fun stat",fun_stat_mode:"Fun stat",show_hero:"Watch time summary",show_watch_time:"Watch time split",show_library:"Library",show_still_to_finish:"Still to finish",show_streak:"Streak",show_average:"Average per week",show_last_7_days:"Last 7 days",show_next_up:"Next up",show_catchup:"Catch-up backlog",show_airing:"Airing this week",show_posters:"Posters",show_actions:"Show \u201CMark watched\u201D button",confirm_actions:"Ask before marking watched",color_movies:"Movies color",color_shows:"TV shows color",color_anime:"Anime color",color_accent:"Accent color"},Xe={hero:R.show_hero,watch_time:R.show_watch_time,library:R.show_library,still_to_finish:R.show_still_to_finish,streak:R.show_streak,average:R.show_average,last_7_days:R.show_last_7_days,next_up:R.show_next_up,catchup:R.show_catchup,airing:R.show_airing},$s={entity:"Pick any entity of your Refract account. The card finds the rest.",show_actions:"Needs an API key that can mark episodes watched.",show_posters:"Needs a TMDB API key in the Refract integration options.",show_last_7_days:"Needs watch history turned on in the integration options.",show_average:"Needs watch history turned on in the integration options.",color_movies:"Hex color such as #2a78d6. Leave empty for the default."},A=(i,t)=>({value:i,label:t}),me=i=>({select:{mode:"dropdown",options:i}}),ks=[{name:"entity",required:!0,selector:{entity:{integration:P,domain:"sensor"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"layout",selector:me([A("full","Full"),A("compact","Compact")])},{name:"library_style",selector:me([A("bar","Compact bar"),A("list","Breakdown list")])},{name:"watch_time_style",selector:me([A("bar","Compact bar"),A("list","Breakdown list")])},{name:"duration_format",selector:me([A("days_hours","Days and hours"),A("hours","Hours only"),A("auto","Automatic")])},{name:"queue_length",selector:{number:{min:1,max:20,mode:"box"}}},{name:"airing_length",selector:{number:{min:1,max:20,mode:"box"}}}]},{type:"expandable",name:"",title:"Sections",icon:"mdi:view-dashboard-outline",schema:[{type:"grid",name:"",schema:[{name:"show_hero",selector:{boolean:{}}},{name:"show_watch_time",selector:{boolean:{}}},{name:"show_library",selector:{boolean:{}}},{name:"show_still_to_finish",selector:{boolean:{}}},{name:"show_streak",selector:{boolean:{}}},{name:"show_average",selector:{boolean:{}}},{name:"show_last_7_days",selector:{boolean:{}}},{name:"show_next_up",selector:{boolean:{}}},{name:"show_catchup",selector:{boolean:{}}},{name:"show_airing",selector:{boolean:{}}},{name:"show_posters",selector:{boolean:{}}}]}]},{type:"expandable",name:"",title:"Fun stat",icon:"mdi:shimmer",schema:[{name:"fun_stat",selector:{boolean:{}}},{name:"fun_stat_mode",selector:me([A("rotate","Rotate daily"),A("months","Months of nonstop viewing"),A("workweeks","Full-time work weeks"),A("lotr","Lord of the Rings marathons")])}]},{type:"expandable",name:"",title:"Next up actions",icon:"mdi:gesture-tap-button",schema:[{name:"show_actions",selector:{boolean:{}}},{name:"confirm_actions",selector:{boolean:{}}}]},{type:"expandable",name:"",title:"Colors",icon:"mdi:palette-outline",schema:[{type:"grid",name:"",schema:[{name:"color_movies",selector:{text:{}}},{name:"color_shows",selector:{text:{}}},{name:"color_anime",selector:{text:{}}},{name:"color_accent",selector:{text:{}}}]}]}],q=class extends M{constructor(){super(...arguments);this._resetOrder=()=>this._setOrder([...G])}setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return l;let e={...ue,...this._config};this._config.show_queue!==void 0&&this._config.show_catchup===void 0&&(e.show_catchup=this._config.show_queue);let s=!!this._config.show_actions&&!this.hass.services?.[P]?.mark_episode_watched;return d`<div class="wrap">
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${ks}
        .computeLabel=${n=>R[n.name]??n.name}
        .computeHelper=${n=>$s[n.name]}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${this._orderPanel()}
      ${s?d`<ha-alert alert-type="warning">
            The button stays hidden until the <code>refract.mark_episode_watched</code> action is available. Check
            that your Refract API key allows marking episodes and movies as watched.
          </ha-alert>`:l}
    </div>`}_orderPanel(){let e=pe(this._config?.section_order),s=e.every((n,o)=>n===G[o]);return d`<ha-expansion-panel outlined header="Section order" .leftChevron=${!0}>
      <div class="order">
        <div class="hint">Use the arrows to move a section up or down. The header always stays on top.</div>
        ${e.map((n,o)=>d`<div class="order-row">
            <span class="order-name">${Xe[n]}</span>
            <ha-icon-button
              label="Move up"
              aria-label="Move ${Xe[n]} up"
              ?disabled=${o===0}
              @click=${()=>this._move(o,-1)}
              ><ha-icon icon="mdi:arrow-up"></ha-icon
            ></ha-icon-button>
            <ha-icon-button
              label="Move down"
              aria-label="Move ${Xe[n]} down"
              ?disabled=${o===e.length-1}
              @click=${()=>this._move(o,1)}
              ><ha-icon icon="mdi:arrow-down"></ha-icon
            ></ha-icon-button>
          </div>`)}
        ${s?l:d`<button class="order-reset" @click=${this._resetOrder}>Reset to default order</button>`}
      </div>
    </ha-expansion-panel>`}_move(e,s){let n=pe(this._config?.section_order),o=e+s;o<0||o>=n.length||([n[e],n[o]]=[n[o],n[e]],this._setOrder(n))}_setOrder(e){if(!this._config)return;let s={...this._config};e.every((n,o)=>n===G[o])?delete s.section_order:s.section_order=e,this._config=s,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}_valueChanged(e){if(e.stopPropagation(),!this._config)return;let s=e.detail.value,n=ue,o={type:this._config.type};for(let[c,a]of Object.entries(s))a===""||a===void 0||a===null||c in n&&a===n[c]||(o[c]=a);delete o.streak_style,delete o.show_streak_toggle,delete o.show_queue;let r=this._config;for(let c of["device_id","config_entry_id","entities","section_order"])r[c]!==void 0&&o[c]===void 0&&(o[c]=r[c]);this._config=o,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0}))}};q.styles=Kt,E([Z({attribute:!1})],q.prototype,"hass",2),E([z()],q.prototype,"_config",2),q=E([Se(Ee)],q);window.customCards=window.customCards||[];window.customCards.some(i=>i.type===ce)||window.customCards.push({type:ce,name:p(void 0,"card.name"),description:p(void 0,"card.description"),preview:!0,documentationURL:Rt});console.info(`%c REFRACT-STATS-CARD %c v${Mt} `,"color:white;background:#6250d6;font-weight:500;border-radius:3px 0 0 3px","color:#6250d6;background:#eee;font-weight:500;border-radius:0 3px 3px 0");
