"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[16251],{720687:(e,t,n)=>{n.d(t,{default:()=>r});var a=n(934980);let i=`pulsing {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}`,r={css:(0,a.Ll)([i]),animation:"pulsing 2s infinite"}},934980:(e,t,n)=>{n.d(t,{CC:()=>i,Ll:()=>o,XF:()=>r});let a=(e,t,n)=>({x:Math.floor(e*Math.cos(n)),y:Math.floor(t*Math.sin(n))}),i=(e,t)=>a(t/2,e/2,2*Math.random()*Math.PI),r=(e,t)=>Math.floor(Math.random()*(t-e+1))+e,o=e=>["@-webkit-keyframes","@keyframes"].map(t=>e.map(e=>t+" "+e).join("\n")).join("\n")},31723:(e,t,n)=>{n.r(t),n.d(t,{default:()=>j});var a=n(667294),i=n(883119),r=n(573706),o=n(986782);function l(e,t,n){var a;return(t="symbol"==typeof(a=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!=typeof a)return a;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?a:a+"")in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let s={},m=e=>{let t=e.__id||e.id;return"string"==typeof t&&t||null};class u{constructor(){l(this,"idMap",new Map),l(this,"objMap",new WeakMap)}get(e){let t=m(e);return this.objMap.get(e)??(t?this.idMap.get(t):void 0)}has(e){let t=m(e);return this.objMap.has(e)??(!!t&&this.idMap.has(t))}set(e,t){let n=m(e);n&&this.idMap.set(n,t),this.objMap.set(e,t)}reset(){this.idMap=new Map,this.objMap=new WeakMap}}function p(e,t){return"number"==typeof e?e:"_lg1"===t?e[t]??e.lg??1:e[t]??1}var d=n(587435),c=n(39260),h=n(876594),g=n(720687),y=n(512541),f=n(785893);let{css:_,animation:x}=g.default,b={backgroundColor:h._VP,animation:x,borderRadius:h.Ev2};function w({data:e}){let{height:t}=e;return(0,f.jsxs)(a.Fragment,{children:[(0,f.jsx)(y.Z,{unsafeCSS:_}),(0,f.jsx)(i.xu,{dangerouslySetInlineStyle:{__style:b},"data-test-id":"skeleton-pin",children:(0,f.jsx)(i.xu,{height:t})})]})}var v=n(679482),M=n(297728),C=n(730212),k=n(410150),$=n(415787),S=n(855746);function j(e){let t;let{align:n,cacheKey:l,id:m,isFetching:h,isGridCentered:g=!0,items:_,layout:x,loadItems:b,masonryRef:j,optOutFluidGridExperiment:E=!1,renderItem:R,scrollContainerRef:I,virtualize:W=!0,_getColumnSpanConfig:A,_getResponsiveModuleConfigForSecondItem:B,_dynamicHeights:G,useLoadingState:F,initialLoadingStatePinCount:P,isLoadingAccessibilityLabel:O,isLoadedAccessibilityLabel:N}=e,z=(0,k.ZP)(),{isAuthenticated:T,isRTL:L}=(0,C.B)(),{logContextEvent:X}=(0,r.v)(),D=(0,M.F)(),H="desktop"===z,Z=(0,S.MM)(),Q=((0,a.useRef)(_.map(()=>({fetchTimestamp:Date.now(),measureTimestamp:Date.now(),hasRendered:!1,pageCount:0}))),H&&!E),{experimentalColumnWidth:V,experimentalGutter:q}=(0,d.Z)(Q),K=e.serverRender??!!H,U="flexible"===x||"uniformRowFlexible"===x||"desktop"!==z||Q,J=(U&&x?.startsWith("uniformRow")?"uniformRowFlexible":void 0)??(K?"serverRenderedFlexible":"flexible"),Y=e.columnWidth??V??v.yF;U&&(Y=Math.floor(Y));let ee=e.gutterWidth??q??(H?v.oX:1),et=e.minCols??v.yc,en=((0,a.useRef)(0),Y+ee),ea=function(e){if(null==e)return;let t=function(e){let t=s[e];return t&&t.screenWidth===window.innerWidth||(s[e]={screenWidth:window.innerWidth}),s[e]}(e);return t.measurementCache||(t.measurementCache=new u),t.measurementCache}(l),ei=(0,a.useCallback)(()=>I?.current||window,[I]),er=(0,a.useRef)(!0),{anyEnabled:eo}=G?D.checkExperiment("dynamic_heights_v2"):{anyEnabled:!1},{anyEnabled:el}=D.checkExperiment("web_masonry_enable_dynamic_heights_for_all"),{anyEnabled:es}=D.checkExperiment("web_masonry_pin_overlap_calculation_and_logging"),{anyEnabled:em,group:eu}=D.checkExperiment("web_masonry_dynamic_batches");em&&(t=(e,t)=>{let n={itemsBatchSize:0,whitespaceThreshold:0,iterationsLimit:15e3};return t>3&&(n.whitespaceThreshold=ee*t),("enabled_small_batch"===eu||"employees"===eu)&&(e>=7?n.itemsBatchSize=7:n.itemsBatchSize=5),"enabled_large_batch"===eu&&(e>=7?n.itemsBatchSize=9:n.itemsBatchSize=5),n});let ep=g&&er.current?"centered":"",{className:ed,styles:ec}=function(e){let t=`m_${Object.keys(e).sort().reduce((t,n)=>{let a=e[n];return null==a||"object"==typeof a||"function"==typeof a?t:"boolean"==typeof a?t+(a?"t":"f"):t+a},"").replace(/\:/g,"\\:")}`,{flexible:n,gutterWidth:a,isRTL:i,itemWidth:r,maxColumns:o,minColumns:l,items:s,_getColumnSpanConfig:m,_getResponsiveModuleConfigForSecondItem:u}=e,d=m?s.map((e,t)=>({index:t,columnSpanConfig:m(e)??1})).filter(e=>1!==e.columnSpanConfig):[],c=r+a,h=Array.from({length:o+1-l},(e,t)=>t+l).map(e=>{let h,g;let y=e===l?0:e*c,f=e===o?null:(e+1)*c-.01;m&&u&&s.length>1&&(h=m(s[0]),g=u(s[1]));let{styles:_,numberOfVisibleItems:x}=d.reduce((i,o)=>{let{columnSpanConfig:l}=o,m=Math.min(function({columnCount:e,columnSpanConfig:t,firstItemColumnSpanConfig:n,isFlexibleWidthItem:a,secondItemResponsiveModuleConfig:i}){let r=e<=2?"sm":e<=4?"md":e<=6?"_lg1":e<=8?"lg":"xl",o=p(t,r);if(a){let t=p(n,r);o="number"==typeof i?i:i?Math.max(i.min,Math.min(i.max,e-t)):1}return o}({columnCount:e,columnSpanConfig:l,isFlexibleWidthItem:!!g&&o===s[1],firstItemColumnSpanConfig:h??1,secondItemResponsiveModuleConfig:g??1}),e),u=null!=o.index&&i.numberOfVisibleItems>=m+o.index,d=n?100/e*m:r*m+a*(m-1),{numberOfVisibleItems:c}=i;return u?c-=m-1:o.index<c&&(c+=1),{styles:i.styles.concat(function({className:e,index:t,columnSpanConfig:n,visible:a,width:i,flexible:r}){let o="number"==typeof n?n:btoa(JSON.stringify(n));return r?`
      .${e} .static[data-column-span="${o}"]:nth-child(${t+1}) {
        visibility: ${a?"visible":"hidden"} !important;
        position: ${a?"inherit":"absolute"} !important;
        width: ${i}% !important;
      }`:`
      .${e} .static[data-column-span="${o}"]:nth-child(${t+1}) {
        visibility: ${a?"visible":"hidden"} !important;
        position: ${a?"inherit":"absolute"} !important;
        width: ${i}px !important;
      }`}({className:t,index:o.index,columnSpanConfig:l,visible:u,width:d,flexible:n})),numberOfVisibleItems:c}},{styles:"",numberOfVisibleItems:e}),b=n?`
      .${t} .static {
        box-sizing: border-box;
        width: calc(100% / ${e}) !important;
      }
    `:`
      .${t} {
        max-width: ${e*c}px;
      }

      .${t} .static {
        width: ${r}px !important;
      }
    `;return{minWidth:y,maxWidth:f,styles:`
      .${t} .static:nth-child(-n+${x}) {
        position: static !important;
        visibility: visible !important;
        float: ${i?"right":"left"};
        display: block;
      }

      .${t} .static {
        padding: 0 ${a/2}px;
      }

      ${b}

      ${_}
    `}}),g=h.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @container (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),y=h.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @media (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),f=`
    ${g.join("")}
    @supports not (container-type: inline-size) {
      ${y.join("")}
    }
  `;return{className:t,styles:`
    .masonryContainer:has(.${t}) {
      container-type: inline-size;
    }

    .masonryContainer > .centered {
      margin-left: auto;
      margin-right: auto;
    }

    .${t} .static {
      position: absolute !important;
      visibility: hidden !important;
    }

    ${f}
  `}}({gutterWidth:ee,flexible:U,items:_,isRTL:L,itemWidth:Y,maxColumns:e.maxColumns??Math.max(_.length,v.g5),minColumns:et,_getColumnSpanConfig:A,_getResponsiveModuleConfigForSecondItem:B}),eh=`${ep} ${ed}`.trim(),{anyEnabled:eg,expName:ey,group:ef,isMeasureAllEnabled:e_}=(0,c.Z)(),ex=((0,a.useRef)(),(0,a.useRef)(_.length)),eb=(0,a.useRef)(0),ew=(0,a.useRef)(null);(0,a.useEffect)(()=>{ex.current=_.length,eb.current+=1},[_]),(0,a.useEffect)(()=>{er.current&&(er.current=!1)},[]),(0,a.useEffect)(()=>()=>{},[]);let ev=(0,a.useCallback)((e,t,n)=>{let a=e.reduce((e,t)=>e+t),i=a/e.length;(0,$.S0)("webapp.masonry.multiColumnWhitespace.average",i,{sampleRate:1,tags:{experimentalMasonryGroup:ef||"unknown",dynamicBatchesExperimentGroup:eu||"unknown",handlerId:Z,isAuthenticated:T,multiColumnItemSpan:e.length}}),(0,$.S0)("webapp.masonry.twoColWhitespace",i,{sampleRate:1,tags:{columnWidth:Y,minCols:et}}),eu&&(0,$.S0)("webapp.masonry.graphIterations",t,{sampleRate:1,tags:{columnSpan:n,experimentGroup:eu}}),X({event_type:15878,component:14468,aux_data:{total_whitespace_px:a}}),X({event_type:16062,component:14468,aux_data:{average_whitespace_px:i}}),X({event_type:16063,component:14468,aux_data:{max_whitespace_px:Math.max(...e)}}),e.forEach(t=>{t>=50&&((0,$.nP)("webapp.masonry.multiColumnWhitespace.over50",{sampleRate:1,tags:{experimentalMasonryGroup:ef||"unknown",dynamicBatchesExperimentGroup:eu||"unknown",handlerId:Z,isAuthenticated:T,multiColumnItemSpan:e.length}}),X({event_type:16261,component:14468})),t>=100&&((0,$.nP)("webapp.masonry.multiColumnWhitespace.over100",{sampleRate:1,tags:{experimentalMasonryGroup:ef||"unknown",dynamicBatchesExperimentGroup:eu||"unknown",handlerId:Z,isAuthenticated:T,multiColumnItemSpan:e.length}}),X({event_type:16262,component:14468}))}),(0,$.nP)("webapp.masonry.multiColumnWhitespace.count",{sampleRate:1,tags:{experimentalMasonryGroup:ef||"unknown",dynamicBatchesExperimentGroup:eu||"unknown",handlerId:Z,isAuthenticated:T,multiColumnItemSpan:e.length}})},[Y,X,et,T,Z,ef,eu]),{_items:eM,_renderItem:eC}=function({initialLoadingStatePinCount:e=50,infiniteScrollPinCount:t=10,isFetching:n,items:i=[],renderItem:r,useLoadingState:o}){let l=i.filter(e=>"object"==typeof e&&null!==e&&"type"in e&&"closeup_module"===e.type).length>0,s=o&&n&&0===i.length,m=o&&n&&l&&1===i.length,u=o&&n&&i.length>(l?1:0),p=(0,a.useMemo)(()=>Array.from({length:u?t:e}).reduce((e,t,n)=>[...e,{height:n%2==0?356:236,key:`skeleton-pin-${n}`,isSkeleton:!0}],[]),[e,t,u]);return{_items:(0,a.useMemo)(()=>m||u?[...i,...p]:s?p:i,[s,u,m,i,p]),_renderItem:(0,a.useMemo)(()=>o?e=>{let{itemIdx:t,data:n}=e;return t>=i.length&&n&&"object"==typeof n&&"key"in n&&"height"in n?(0,f.jsx)(w,{data:n},n.key):r(e)}:r,[o,r,i.length])}}({useLoadingState:F,items:_,renderItem:(0,a.useCallback)(e=>(0,f.jsx)(o.Z,{name:"MasonryItem",children:R(e)}),[R]),isFetching:h,initialLoadingStatePinCount:P}),ek=F&&h,e$=(0,a.useRef)(new Set);return(0,a.useEffect)(()=>{if(!es)return;let e=setTimeout(()=>{requestAnimationFrame(()=>{let e=Array.from(ew.current?.querySelectorAll("[data-grid-item-idx]")??[]);if(0===e.length)return;let t=e.map(e=>{let t=e.getAttribute("data-grid-item-idx");return{rect:e.getBoundingClientRect(),itemIdx:t}}),n=0,a=0,i=0,r=0,o=0,l=0;for(let e=0;e<t.length;e+=1){let s=t[e]?.rect,m=t[e]?.itemIdx;for(let u=e+1;u<t.length;u+=1){let e=t[u]?.rect,p=t[u]?.itemIdx;if(s&&e&&m&&p){let t=[m,p].sort().join("|");if(!e$.current.has(t)&&s.right>=e.left&&s.left<=e.right&&s.bottom>=e.top&&s.top<=e.bottom&&s.height>0&&e.height>0){e$.current.add(t),n+=1;let m=Math.max(0,Math.min(s.right,e.right)-Math.max(s.left,e.left))*Math.max(0,Math.min(s.bottom,e.bottom)-Math.max(s.top,e.top));m>8e4?l+=1:m>4e4?o+=1:m>1e4?r+=1:m>5e3?i+=1:m>2500&&(a+=1)}}}}n>0&&(0,$.QX)("webapp.masonry.pinOverlapHits",n,{tags:{isAuthenticated:T,isDesktop:H,experimentalMasonryGroup:ef||"unknown"}}),a>0&&(0,$.QX)("webapp.masonry.pinOverlap.AreaPx.over2500",a,{tags:{isAuthenticated:T,isDesktop:H,experimentalMasonryGroup:ef||"unknown"}}),i>0&&(0,$.QX)("webapp.masonry.pinOverlap.AreaPx.over5000",i,{tags:{isAuthenticated:T,isDesktop:H,experimentalMasonryGroup:ef||"unknown"}}),r>0&&(0,$.QX)("webapp.masonry.pinOverlap.AreaPx.over10000",r,{tags:{isAuthenticated:T,isDesktop:H,experimentalMasonryGroup:ef||"unknown"}}),o>0&&(0,$.QX)("webapp.masonry.pinOverlap.AreaPx.over40000",o,{tags:{isAuthenticated:T,isDesktop:H,experimentalMasonryGroup:ef||"unknown"}}),l>0&&(0,$.QX)("webapp.masonry.pinOverlap.AreaPx.over80000",l,{tags:{isAuthenticated:T,isDesktop:H,experimentalMasonryGroup:ef||"unknown"}})})},1e3);return()=>{clearTimeout(e)}},[Y,ef,T,H,es,_]),(0,f.jsxs)(a.Fragment,{children:[F&&!er.current&&(0,f.jsx)(i.xu,{"aria-live":"polite",display:"visuallyHidden",children:ek?O:N}),(0,f.jsx)("div",{ref:ew,"aria-busy":F?!!ek:void 0,className:"masonryContainer","data-test-id":"masonry-container",id:m,style:Q?{padding:`0 ${ee/2}px`}:void 0,children:(0,f.jsxs)("div",{className:eh,children:[K&&er.current?(0,f.jsx)(y.Z,{"data-test-id":"masonry-ssr-styles",unsafeCSS:ec}):null,(0,f.jsx)(i.xu,{"data-test-id":"max-width-container",marginBottom:0,marginEnd:"auto",marginStart:"auto",marginTop:0,maxWidth:e.maxColumns?en*e.maxColumns:void 0,children:eg?(0,f.jsx)(i.GX,{ref:e=>{j&&(j.current=e)},_dynamicHeights:el||G,_dynamicHeightsV2Experiment:eo,_getColumnSpanConfig:A,_getModulePositioningConfig:t,_getResponsiveModuleConfigForSecondItem:B,_logTwoColWhitespace:ev,_measureAll:e_,align:n,columnWidth:Y,gutterWidth:ee,items:eM,layout:U?J:x??"basic",loadItems:b,measurementStore:ea,minCols:et,renderItem:eC,scrollContainer:ei,virtualBufferFactor:.3,virtualize:W}):(0,f.jsx)(i.Rk,{ref:e=>{j&&(j.current=e)},_dynamicHeights:el||G,_dynamicHeightsV2Experiment:eo,_getColumnSpanConfig:A,_getModulePositioningConfig:t,_getResponsiveModuleConfigForSecondItem:B,_logTwoColWhitespace:ev,align:n,columnWidth:Y,gutterWidth:ee,items:eM,layout:U?J:x??"basic",loadItems:b,measurementStore:ea,minCols:et,renderItem:eC,scrollContainer:ei,virtualBufferFactor:.3,virtualize:W})})]})})]})}},587435:(e,t,n)=>{n.d(t,{Z:()=>a});function a(e=!0){let t=e?16:void 0,n=t?Math.floor(t/4):void 0;return{experimentalColumnWidth:e?221:void 0,experimentalGutter:t,experimentalGutterBoints:n}}},39260:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(297728),i=n(730212),r=n(855746);function o(e){let{isAuthenticated:t}=(0,i.B)(),{expName:n,anyEnabled:o,group:l}=function({experimentsClient:e,handlerId:t,isAuthenticated:n,skipActivation:a}){let{checkExperiment:i}=e,r=i(n?"web_masonry_v2_auth":"web_masonry_v2_unauth",{dangerouslySkipActivation:a});return r.group?{expName:n?"web_masonry_v2_auth":"web_masonry_v2_unauth",...r}:"www/[username]/[slug].js"!==t||n?"www/pin/[id].js"!==t||n?{expName:"",anyEnabled:!1,group:""}:{expName:"web_masonry_v2_unauth_pin",...i("web_masonry_v2_unauth_pin",{dangerouslySkipActivation:a})}:{expName:"web_masonry_v2_unauth_board",...i("web_masonry_v2_unauth_board",{dangerouslySkipActivation:a})}}({experimentsClient:(0,a.F)(),handlerId:(0,r.MM)(),isAuthenticated:t,skipActivation:e?.skipActivation??!1});return{expName:n,anyEnabled:o,group:l,isMeasureAllEnabled:"enabled_measure_all"===l||"enabled_measure_all_impression_fix"===l,isImpressionFixEnabled:"control_impression_fix"===l||"enabled_impression_fix"===l||"enabled_measure_all_impression_fix"===l}}}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/16251-acaac64474df3fad.mjs.map