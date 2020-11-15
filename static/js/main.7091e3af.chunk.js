(this["webpackJsonpform-wizard"]=this["webpackJsonpform-wizard"]||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(1),i=n.n(c),s=n(9),r=n.n(s),l=(n(15),n(2)),o=n(6),u=n(3),d=function(){var e={first:"",last:"",email:"",password:"",confirmPass:""},t=Object(c.useState)(e),n=Object(l.a)(t,2),a=n[0],i=n[1],s=Object(c.useState)({email:!1,password:!1}),r=Object(l.a)(s,2),d=r[0],j=r[1];Object(c.useEffect)((function(){b()}),[a]);var b=function(){j({email:!f(),password:!m()})},m=function(){var e=!1;return a.password===a.confirmPass&&(e=!0),e},f=function(){return/\w{1,}@\w{1,}\.\w{1,}/.test(a.email)||""===a.email};return{contactInfo:a,updateContactInfo:function(e){var t=e.target.name,n=e.target.value;i(Object(u.a)(Object(u.a)({},a),{},Object(o.a)({},t,n)))},formErrors:d,checkForValidForm:function(){var e=!0;return!Object.values(a).some((function(e){return""===e}))&&m()&&f()||(e=!1),e},clearForm:function(){i(e)}}},j=(n(16),function(e){var t=e.onChange,n=e.contactInfo,c=e.formErrors;return Object(a.jsxs)("div",{children:[Object(a.jsx)("p",{className:"user-instructions",children:"Please fill out all fields below"}),Object(a.jsxs)("form",{"data-testid":"contact-form",className:"contact-form",children:[Object(a.jsx)("label",{htmlFor:"first",children:"First"}),Object(a.jsx)("input",{type:"text",id:"first",name:"first",value:n.first,onChange:t}),Object(a.jsx)("label",{htmlFor:"last",children:"Last"}),Object(a.jsx)("input",{type:"text",id:"last",name:"last",value:n.last,onChange:t}),Object(a.jsx)("label",{htmlFor:"email",children:"Email"}),Object(a.jsx)("input",{type:"text",id:"email",name:"email",value:n.email,onChange:t,className:c.email?"input-error":null}),Object(a.jsx)("label",{htmlFor:"password",children:"Password"}),Object(a.jsx)("input",{type:"password",id:"password",name:"password",value:n.password,onChange:t,className:c.password?"input-error":null}),Object(a.jsx)("label",{htmlFor:"confirmPass",children:"Confirm Password"}),Object(a.jsx)("input",{type:"password",id:"confirmPass",name:"confirmPass",value:n.confirmPass,onChange:t,className:c.password?"input-error":null})]}),function(){var e,t=Object.keys(c).find((function(e){return!0===c[e]}));return"email"===t?e="Invalid email":"password"===t&&(e="Password mismatch"),Object(a.jsx)("div",{className:"error-messages",children:e?Object(a.jsx)("p",{children:e}):null})}()]})}),b=n(7),m=(n(17),function(e){var t=e.id,n=e.isActive,c=e.readOnly,i=e.onClick;return Object(a.jsx)("div",{"data-testid":t,onClick:function(){return i(t)},className:"time-block ".concat(n?"is-active":""," ").concat(c?"read-only":"")})}),f=(n(18),function(e){var t=e.availability,n=void 0===t?[]:t,c=e.readOnly,i=void 0!==c&&c,s=e.title,r=e.onChange,l=function(){for(var e,t,a=n.map((function(e){return"".concat(e.avail_day).concat(e.avail_time)})),c=[],i=0;i<3;i++)for(var s=0;s<7;s++)t="".concat(s).concat(i),e=a.includes(t),c=[].concat(Object(b.a)(c),[{id:"".concat(s).concat(i),isActive:e}]);return c}(),o=function(e){i||(l=l.map((function(t){return t.id===e?Object(u.a)(Object(u.a)({},t),{},{isActive:!t.isActive}):t})),r(function(){var e=[];return l.forEach((function(t){t.isActive&&(e=[].concat(Object(b.a)(e),[{avail_day:Number(t.id[0]),avail_time:Number(t.id[1])}]))})),e}()))};return Object(a.jsxs)("div",{className:"user-availability",children:[s?Object(a.jsx)("h4",{children:s}):null,Object(a.jsxs)("div",{className:"availability-table",children:[Object(a.jsx)("div",{}),Object(a.jsx)("div",{children:"Mon"}),Object(a.jsx)("div",{children:"Tue"}),Object(a.jsx)("div",{children:"Wed"}),Object(a.jsx)("div",{children:"Thu"}),Object(a.jsx)("div",{children:"Fri"}),Object(a.jsx)("div",{children:"Sat"}),Object(a.jsx)("div",{children:"Sun"}),function(){var e=Object(b.a)(l);return e.splice(0,0,"Morning"),e.splice(8,0,"Afternoon"),e.splice(16,0,"Evening"),e}().map((function(e){return"string"===typeof e?Object(a.jsx)("div",{className:"time-of-day",children:e},e):Object(a.jsx)(m,{readOnly:i,id:e.id,isActive:e.isActive,onClick:o},e.id)}))]})]})}),h=(n(19),function(e){var t=e.children,n=e.className;return Object(a.jsx)("div",{className:"styled-container ".concat(n||""),children:t})}),O=(n(20),function(e){var t=e.stepLabels,n=e.currentStep;return Object(a.jsx)("div",{"data-testid":"breadcrumbs",className:"breadcrumbs",children:t.map((function(e,c){return Object(a.jsxs)(i.a.Fragment,{children:[Object(a.jsx)("h3",{className:c===n?"active-step":null,children:e}),c<t.length-1?Object(a.jsx)("h3",{className:"breadcrumb-slash",children:" / "}):null]},"".concat(e,"-").concat(c))}))})}),v=(n(21),function(e){var t=e.onStepChange,n=e.canProgress,s=void 0===n||n,r=e.children,o=e.onSubmit,u=e.onCancel,d=e.stepLabels,j=e.title,b=e.submitName,m=void 0===b?"Submit":b,f=Object(c.useState)(0),h=Object(l.a)(f,2),v=h[0],x=h[1],p=i.a.Children.count(r),g=p>0,w=v>=p-1&&g;Object(c.useEffect)((function(){t&&t(v)}),[v]);var y=function(e){x(e)};return g?Object(a.jsxs)("div",{className:"wizard",children:[Object(a.jsx)("div",{className:"wizard-header",children:Object(a.jsx)("h1",{children:j})}),Object(a.jsx)("hr",{}),Object(a.jsxs)("div",{className:"wizard-body",children:[Array.isArray(d)&&d[0]?Object(a.jsx)(i.a.Fragment,{children:Object(a.jsx)(O,{onClick:y,stepLabels:d,currentStep:v})}):null,Object(a.jsx)("div",{children:i.a.Children.map(r,(function(e,t){return t===v?e:null}))})]}),Object(a.jsx)("hr",{}),Object(a.jsxs)("div",{className:"wizard-buttons",children:[Object(a.jsx)("button",{className:"cancel-button secondary",onClick:u,children:"Cancel"}),v>0?Object(a.jsx)("button",{className:"back-button secondary",onClick:function(){v>0&&x(v-1)},children:"Back"}):null,w?null:Object(a.jsx)("button",{disabled:!s,className:"next-button primary",onClick:function(){w||x(v+1)},children:"Next"}),w?Object(a.jsx)("button",{disabled:!s,className:"submit-button primary",onClick:o,children:m}):null]})]}):null}),x=(n(22),function(e){var t=e.text,n=e.onSubmit;return Object(a.jsxs)(h,{className:"message-container",children:[Object(a.jsx)("h2",{className:"message-text",children:t}),Object(a.jsx)("button",{className:"primary",onClick:n,children:"Return to form"})]})}),p=(n(23),function(){var e=Object(c.useState)([]),t=Object(l.a)(e,2),n=t[0],a=t[1];return{availability:n,updateAvailability:function(e){a(e)},clearAvailability:function(){a([])}}});var g=function(){var e=d(),t=e.contactInfo,n=e.updateContactInfo,i=e.formErrors,s=e.checkForValidForm,r=e.clearForm,o=p(),u=o.availability,b=o.updateAvailability,m=o.clearAvailability,O=Object(c.useState)(!0),g=Object(l.a)(O,2),w=g[0],y=g[1],N=Object(c.useState)(0),C=Object(l.a)(N,2),S=C[0],F=C[1],k=Object(c.useState)({shouldShow:!1,message:""}),A=Object(l.a)(k,2),P=A[0],E=A[1];Object(c.useEffect)((function(){I()}),[t,u,S]);var I=function(){switch(S){case 0:var e=s();y(e);break;case 1:y(u.length>0)}};return Object(a.jsx)("div",{className:"form-wizard-app",children:P.shouldShow?Object(a.jsx)(x,{text:P.message,onSubmit:function(){r(),m(),E({shouldShow:!1,message:""})}}):Object(a.jsx)(h,{className:"wizard-container",children:Object(a.jsxs)(v,{canProgress:w,onCancel:function(){return E({shouldShow:!0,message:"You exited the demo!"})},onSubmit:function(){return E({shouldShow:!0,message:"You completed the demo!"})},onStepChange:function(e){return F(e)},title:"Signup",stepLabels:["Contact info","Availability"],children:[Object(a.jsx)(j,{onChange:n,contactInfo:t,formErrors:i}),Object(a.jsxs)("div",{children:[Object(a.jsx)("p",{className:"user-instructions",children:"Please provide your availability below"}),Object(a.jsx)(f,{availability:u,onChange:b})]})]})})})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,25)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),i(e),s(e)}))};r.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(g,{})}),document.getElementById("root")),w()}],[[24,1,2]]]);
//# sourceMappingURL=main.7091e3af.chunk.js.map