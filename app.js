'use strict';
const dialog = document.querySelector('#detail-dialog');
const content = document.querySelector('#dialog-content');
const sampleItems = [
  {id:'CLR-1042', name:'Arc lounge chair', category:'Furniture', issue:'Missing dimensions'},
  {id:'CLR-1043', name:'Stoneware cup', category:'Kitchen', issue:'Duplicate title'},
  {id:'CLR-1044', name:'Linen tablecloth', category:'Textiles', issue:'Missing material'},
  {id:'CLR-1045', name:'Oak side table', category:'Furniture', issue:'Invalid image URL'},
  {id:'CLR-1046', name:'Reading lamp', category:'Lighting', issue:'Missing wattage'}
];
const resolved = new Set();
const saved = new Set();
let bagCount = 0;
const places = [
  {id:1, name:'The corner bookshop', type:'Culture', time:'45 min', area:'Old town', description:'A quiet shelf, a good recommendation, and nowhere else to be.'},
  {id:2, name:'Courtyard coffee', type:'Food', time:'30 min', area:'Arts quarter', description:'A small coffee stop tucked away from the main street.'},
  {id:3, name:'The riverside path', type:'Outdoors', time:'60 min', area:'Riverside', description:'Follow the water for a slower view of the city.'},
  {id:4, name:'The print room', type:'Culture', time:'40 min', area:'Arts quarter', description:'Posters, independent prints, and a little creative inspiration.'}
];
const cases = {
 clear:{title:'Clear — Catalog workspace', problem:'Catalog reviewers need to spot exceptions quickly without losing the context of the item they are reviewing.', audience:'Assumed audience: catalog operations specialists managing large product inventories. This is a hypothesis informed by the problem domain, not interview research.', decisions:['Summary → queue → item creates a predictable information hierarchy.','Search and status filtering work together to reduce the visible queue.','Explicit status labels and an undo action make review changes visible and reversible.'], tradeoff:'The prototype models review completion, not actual data correction. A production workflow needs field-level editing, audit history, permissions, and server validation.', test:'Ask five reviewers to find an item, mark it reviewed, then undo the change. Measure task completion, wrong-item actions, and time to locate the correct record. No user test results are claimed.', flow:'Search or filter → inspect issue → mark reviewed → undo if needed.'},
 still:{title:'Still — Everyday objects', problem:'Furniture shoppers need to understand the object, available finishes, and total cost before making a decision.', audience:'Assumed audience: shoppers comparing a small number of considered purchases. We would validate whether finish, dimensions, or delivery dominates their decision.', decisions:['An uncluttered composition makes the product the focal point.','Native radio controls let mouse and keyboard users select the same finishes.','Quantity updates the subtotal before an add-to-bag action, which returns explicit feedback.'], tradeoff:'The chair is an original CSS illustration, not a product photograph. The bag is a session-only simulation; there is no checkout, payment, inventory, or shipping integration.', test:'Ask shoppers to choose walnut, set quantity to two, and identify the subtotal before adding. Test whether delivery information is expected earlier in the flow.', flow:'Inspect product → choose finish → set quantity → review subtotal → add to demo bag.'},
 offgrid:{title:'Offgrid — Small discoveries', problem:'Travel inspiration often offers too many choices without helping someone decide what fits their available time.', audience:'Assumed audience: casual city explorers looking for a low-effort short stop. All places in the demo are fictional.', decisions:['Interest filters provide a small, understandable starting point.','Each place exposes area and duration before the user opens anything else.','Save controls and a saved-only view create a lightweight shortlist with clear empty states.'], tradeoff:'There is no map, real location data, itinerary optimization, or persistent account. A real guide would need verified opening hours and accessibility details.', test:'Ask someone with one free hour to find an outdoor stop, save it, and retrieve their shortlist. Observe filter comprehension and whether duration is enough to support a choice.', flow:'Choose interest → compare duration and area → save a stop → view saved places.'}
};
function show(title, markup, label='INTERACTIVE PROTOTYPE') {
 document.querySelector('#dialog-label').textContent=label;
 content.innerHTML=`<h2 id="dialog-title" class="dialog-title">${title}</h2>${markup}`;
 if(!dialog.open) dialog.showModal();
 dialog.scrollTop=0;
}
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;let count=0;
 document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;if(!card.hidden)count++;});
 document.querySelector('#filter-status').textContent=`${count} project${count===1?'':'s'} shown`;
}));
document.querySelectorAll('[data-case]').forEach(button=>button.addEventListener('click',()=>{
 const c=cases[button.dataset.case];
 show(c.title,`<p class="dialog-intro">Self-initiated concept · UX rationale · Validation plan</p><div class="notice">Concept work. No client engagement, usability study, or measured business impact is implied.</div><div class="case-grid"><section><h3>The problem</h3><p>${c.problem}</p></section><section><h3>Who it is for</h3><p>${c.audience}</p></section><section><h3>Design decisions</h3><ul>${c.decisions.map(d=>`<li>${d}</li>`).join('')}</ul></section><section><h3>The tradeoff</h3><p>${c.tradeoff}</p></section><section><h3>The core flow</h3><p>${c.flow}</p></section><section><h3>How to validate it</h3><p>${c.test}</p></section></div><button class="action" id="case-demo">Open working prototype ↗</button>`,'BEHIND THE DESIGN');
 document.querySelector('#case-demo').addEventListener('click',()=>demos[button.dataset.case]());
}));
function clearDemo(){
 show(cases.clear.title,`<p class="dialog-intro">A small, fictional review queue. Search items, filter status, and mark reviews complete.</p><div class="demo-toolbar"><label class="field">Search products<input id="search" type="search" placeholder="Try chair, furniture, or CLR-1042"></label><label class="field">Review status<select id="status"><option value="all">All items</option><option value="open">Needs review</option><option value="done">Reviewed</option></select></label><button class="action" id="reset">Reset demo</button></div><div class="notice" id="queue-summary" role="status"></div><div class="table-wrap"><table><caption class="sr-only">Demo catalog review queue</caption><thead><tr><th scope="col">Product</th><th scope="col">Issue</th><th scope="col">Status</th><th scope="col">Action</th></tr></thead><tbody id="queue"></tbody></table></div>`);
 const search=document.querySelector('#search'), status=document.querySelector('#status');
 function render(){
  const query=search.value.trim().toLowerCase();
  const items=sampleItems.filter(item=>(`${item.id} ${item.name} ${item.category} ${item.issue}`).toLowerCase().includes(query)&&(status.value==='all'||(status.value==='done')===resolved.has(item.id)));
  document.querySelector('#queue-summary').textContent=`${items.length} of ${sampleItems.length} items shown · ${resolved.size} reviewed · ${sampleItems.length-resolved.size} remaining`;
  document.querySelector('#queue').innerHTML=items.length?items.map(item=>`<tr><td><strong>${item.name}</strong><br><small>${item.id} · ${item.category}</small></td><td>${item.issue}</td><td><span class="badge ${resolved.has(item.id)?'done':''}">${resolved.has(item.id)?'Reviewed':'Needs review'}</span></td><td><button data-resolve="${item.id}" aria-label="${resolved.has(item.id)?'Undo review of':'Mark reviewed:'} ${item.name}">${resolved.has(item.id)?'Undo':'Mark reviewed'}</button></td></tr>`).join(''):'<tr><td colspan="4" class="empty">No matching items. Try a different search or status.</td></tr>';
  document.querySelectorAll('[data-resolve]').forEach(button=>button.addEventListener('click',()=>{
   const id=button.dataset.resolve;resolved.has(id)?resolved.delete(id):resolved.add(id);render();
   const next=Array.from(document.querySelectorAll('[data-resolve]')).find(b=>b.dataset.resolve===id);(next||status).focus();
  }));
 }
 search.addEventListener('input',render);status.addEventListener('change',render);document.querySelector('#reset').addEventListener('click',()=>{resolved.clear();search.value='';status.value='all';render();});render();
}
function stillDemo(){
 show(cases.still.title,`<p class="dialog-intro">A fictional product configurator. No orders or payments are processed.</p><div class="demo-product"><div class="product-art" id="chair-art" role="img" aria-label="Arc lounge chair in oak finish"><div class="chair" aria-hidden="true"><i class="chair-back"></i><i class="chair-seat"></i><i class="chair-leg left"></i><i class="chair-leg right"></i></div></div><div class="product-details"><span class="tiny">STILL. / THE EVERYDAY COLLECTION</span><h3>The Arc chair</h3><p>A gentle curve. A generous seat. A little invitation to slow down.</p><p>Concept dimensions: 74 × 78 × 80 cm.<br>Illustrative solid-wood finish.</p><p class="price">€249 <small>/ chair</small></p><fieldset class="options"><legend>Finish</legend><label><input type="radio" name="finish" value="Oak" checked>Oak</label><label><input type="radio" name="finish" value="Walnut">Walnut</label><label><input type="radio" name="finish" value="Ink">Ink</label></fieldset><label class="field">Quantity<select id="quantity"><option value="1">1 chair</option><option value="2">2 chairs</option><option value="3">3 chairs</option><option value="4">4 chairs</option></select></label><p id="subtotal" aria-live="polite">Subtotal: €249</p><small>Demo price only. Shipping and taxes are not calculated.</small><button class="action" id="add-bag">Add to demo bag ↗</button></div></div><p class="notice" id="bag-status" role="status">Demo bag: ${bagCount} item${bagCount===1?'':'s'}. Resets when the page reloads.</p><button class="action" id="clear-bag">Empty demo bag</button>`);
 const quantity=document.querySelector('#quantity');
 quantity.addEventListener('change',()=>document.querySelector('#subtotal').textContent=`Subtotal: €${249*Number(quantity.value)}`);
 document.querySelectorAll('[name="finish"]').forEach(radio=>radio.addEventListener('change',()=>{const art=document.querySelector('#chair-art');art.style.setProperty('--chair',{Oak:'#8a603f',Walnut:'#50392c',Ink:'#343c35'}[radio.value]);art.setAttribute('aria-label',`Arc lounge chair in ${radio.value.toLowerCase()} finish`);}));
 document.querySelector('#add-bag').addEventListener('click',()=>{const n=Number(quantity.value);bagCount+=n;document.querySelector('#bag-status').textContent=`Added ${n} ${document.querySelector('[name="finish"]:checked').value.toLowerCase()} chair${n===1?'':'s'}. Demo bag: ${bagCount} item${bagCount===1?'':'s'}. No order was placed.`;});
 document.querySelector('#clear-bag').addEventListener('click',()=>{bagCount=0;document.querySelector('#bag-status').textContent='Demo bag emptied. 0 items.';});
}
function offgridDemo(){
 show(cases.offgrid.title,`<p class="dialog-intro">A fictional neighborhood guide. Filter by interest and build a shortlist for this session.</p><div class="demo-toolbar"><label class="field">Your interest<select id="interest"><option>All interests</option><option>Culture</option><option>Food</option><option>Outdoors</option></select></label><label class="field">Show<select id="place-view"><option value="all">All places</option><option value="saved">Saved places</option></select></label><button class="action" id="clear-saved">Clear saved</button></div><p class="notice" id="place-status" role="status"></p><div class="route-grid" id="places"></div>`);
 const interest=document.querySelector('#interest'),view=document.querySelector('#place-view');
 function render(){
  const filtered=places.filter(p=>(interest.value==='All interests'||p.type===interest.value)&&(view.value==='all'||saved.has(p.id)));
  document.querySelector('#place-status').textContent=`${filtered.length} places shown · ${saved.size} saved. Fictional locations; not travel recommendations.`;
  document.querySelector('#places').innerHTML=filtered.length?filtered.map(p=>`<article class="place"><span class="tiny">${p.type.toUpperCase()} / ${p.time}</span><h3>${p.name}</h3><p>${p.area} · ${p.description}</p><button data-save="${p.id}" aria-pressed="${saved.has(p.id)}" aria-label="${saved.has(p.id)?'Unsave':'Save'} ${p.name}">${saved.has(p.id)?'Saved ✓':'Save place +'}</button></article>`).join(''):'<p class="empty">Nothing here yet. Change your interest filter or save a place from All places.</p>';
  document.querySelectorAll('[data-save]').forEach(button=>button.addEventListener('click',()=>{const id=Number(button.dataset.save);saved.has(id)?saved.delete(id):saved.add(id);render();const next=Array.from(document.querySelectorAll('[data-save]')).find(b=>Number(b.dataset.save)===id);(next||view).focus();}));
 }
 interest.addEventListener('change',render);view.addEventListener('change',render);document.querySelector('#clear-saved').addEventListener('click',()=>{saved.clear();render();});render();
}
const demos={clear:clearDemo,still:stillDemo,offgrid:offgridDemo};
document.querySelectorAll('[data-demo]').forEach(button=>button.addEventListener('click',()=>demos[button.dataset.demo]()));
