const P=[
{n:"Rich Chocolate Truffle Truffle Cake",p:500,c:"Classic",a:"#5a2e1d",b:"#3a1c10",t:"#8a4a2a"},
{n:"Choco Chip Truffle Cake Cake",p:599,c:"Gourmet",a:"#6a3a25",b:"#40200f",t:"#9a5a38"},
{n:"Tropical Fruit N Almond Cake Cake",p:599,c:"Gourmet",a:"#7a4630",b:"#4a2614",t:"#e3c58f"},
{n:"Rich Butterscotch Crunch Carrie Cake",p:399,c:"Classic",a:"#9a5a30",b:"#5a2f18",t:"#d9a45a"},
{n:"Fudgy Brownie Sundae",p:249,c:"Desserts",a:"#4a2416",b:"#2c140a",t:"#c9a27a"},
{n:"Red Velvet Pastry Jar",p:199,c:"Desserts",a:"#a8283a",b:"#6e1422",t:"#f6e6e0"},
{n:"Double Choc Chip Cookies",p:149,c:"Cookies",a:"#7a4a2a",b:"#4a2a14",t:"#3a1c10"},
{n:"Oatmeal Raisin Cookies Box",p:179,c:"Cookies",a:"#b08050",b:"#7a5430",t:"#d9b88a"}];
function cake(o,s){s=s||70;return `<svg width="${s}" height="${s}" viewBox="0 0 80 80" aria-hidden="true"><ellipse cx="40" cy="68" rx="30" ry="6" fill="rgba(0,0,0,.18)"/><path d="M14 36v28c0 5 12 8 26 8s26-3 26-8V36z" fill="${o.b}"/><path d="M14 50c10 4 42 4 52 0" fill="none" stroke="${o.t}" stroke-width="3" opacity=".6"/><ellipse cx="40" cy="36" rx="26" ry="9" fill="${o.a}"/><path d="M16 36c0 8 5 6 7 14s6 0 9 8 6-2 8 6 6-4 9 0 4-8 7-6 3-6 5-10 4-6 2-12z" fill="${o.a}" opacity=".0"/><path d="M20 36c0 10 3 12 5 6s4 8 7 0 4 6 8 0 4 8 8 0 4 6 6 0 3-4 4-6" fill="none" stroke="${o.t}" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="29" r="4" fill="${o.t}"/><circle cx="42" cy="27" r="4.5" fill="#c0344a"/><circle cx="50" cy="31" r="3.5" fill="#3a2a5a"/><circle cx="37" cy="31" r="3" fill="#d94a5a"/></svg>`}
function tiered(bg){return `<svg width="86%" viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="90" rx="38" ry="6" fill="rgba(255,255,255,.7)"/><rect x="22" y="62" width="56" height="26" rx="6" fill="#fff4ea"/><rect x="31" y="40" width="38" height="24" rx="6" fill="#fffaf2"/><rect x="39" y="22" width="22" height="20" rx="5" fill="#fff"/><path d="M22 70h56M31 50h38" stroke="#e8c27a" stroke-width="3"/><circle cx="50" cy="16" r="4" fill="#e8584a"/></svg>`}
const cart=[];let cat="all",showAll=false,query="";
const $=s=>document.querySelector(s),toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove("show"),2200)};
const liked=new Set();
function render(){
 let l=P.filter(x=>(cat==="all"||x.c===cat)&&x.n.toLowerCase().includes(query));
 if(!showAll&&cat==="all"&&!query)l=l.slice(0,4);
 $("#grid").innerHTML=l.length?l.map(x=>{const i=P.indexOf(x);return `<div class="card"><button class="heart" data-h="${i}" aria-label="Like">${liked.has(i)?"♥":"♡"}</button><div class="pic">${cake(x)}</div><h4>${x.n}</h4><div class="price">₹${x.p} <span class="stars">★★</span> <small>(5k+ reviews)</small></div><div class="stars">★★★★★ <small>500</small></div><button class="add" data-a="${i}" aria-label="Add to cart">⌄</button></div>`}).join(""):'<div class="empty">No cakes match your search. Try another name.</div>';
 $("#viewAll").textContent=showAll?"SHOW LESS":"VIEW ALL";
 document.querySelectorAll(".cat").forEach(b=>b.classList.toggle("on",b.dataset.f===cat));
}
$("#grid").onclick=e=>{const h=e.target.closest("[data-h]"),a=e.target.closest("[data-a]");
 if(h){const i=+h.dataset.h;liked.has(i)?liked.delete(i):liked.add(i);render()}
 if(a){const x=P[+a.dataset.a];cart.push(x);$("#cnt").textContent=cart.length;toast(x.n+" added to cart")}};
$("#cats").onclick=e=>{const b=e.target.closest(".cat");if(!b)return;cat=cat===b.dataset.f?"all":b.dataset.f;showAll=true;render();$("#best").scrollIntoView()};
$("#nav").onclick=e=>{const a=e.target.closest("a[data-f]");if(a){cat=a.dataset.f;showAll=cat!=="all";render()}};
$("#viewAll").onclick=()=>{showAll=!showAll;cat="all";render()};
$("#q").oninput=e=>{query=e.target.value.trim().toLowerCase();render();if(query)$("#best").scrollIntoView()};
$("#cartBtn").onclick=()=>{const t=cart.reduce((s,x)=>s+x.p,0);toast(cart.length?`${cart.length} item(s) in cart – total ₹${t}`:"Your cart is empty. Add a cake first.")};
$("#login").onclick=e=>{e.preventDefault();toast("Login coming soon")};
$("#saveBtn").onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText("SAVE20").catch(()=>{});toast("Use code SAVE20 for 20% off");};
$("#unlock").onclick=()=>toast("Add 3 reminders to unlock offers worth Rs. 750");
$("#follow").onclick=e=>{e.preventDefault();toast("Thanks for following Dakingo!")};
$("#help").onclick=()=>toast("Our team is here: support@dakingo.example");
$("#subBtn").onclick=()=>{const m=$("#mail").value.trim();if(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)){toast("Subscribed! Sweet offers are on the way.");$("#mail").value=""}else toast("Please enter a valid email address")};
document.querySelectorAll("footer a,.dots i").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();toast("Page coming soon")}));
$("#heroCake").innerHTML=cake({a:"#5a2e1d",b:"#3a1c10",t:"#8a4a2a"},170);
$("#m1").innerHTML=cake({a:"#5a2e1d",b:"#3a1c10",t:"#c9a27a"},70);
$("#m2").innerHTML=cake({a:"#6a3a25",b:"#40200f",t:"#9a5a38"},70);
const G=[["#8a3b5a","🎂"],["#e9c8b0","👩"],["#3a2a2a","🧑"],["#c9a27a","👨"],["#e7b9a0","🙋"],["#c9506a","🎉"]];
$("#gal").innerHTML=G.map(g=>`<div class="ph" style="background:${g[0]}">${tiered()}<em>${g[1]}</em></div>`).join("");
$("#gal").onclick=e=>{if(e.target.closest(".ph"))toast("Fresh from our bakery!")};
render();
