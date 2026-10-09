(function(){
  var boxes=[].slice.call(document.querySelectorAll('.steps input[type="checkbox"]'));
  var doneEl=document.getElementById("done"), fill=document.getElementById("bar-fill");
  var login=document.getElementById("login"), who=document.getElementById("who");
  var user=null, state={};
  function key(){return "steam-hand-checklist-v1:"+user;}
  function save(){try{localStorage.setItem(key(),JSON.stringify(state));}catch(e){}}
  function update(){
    var n=boxes.filter(function(b){return b.checked;}).length;
    doneEl.textContent=n; fill.style.width=(n/boxes.length*100)+"%";
  }
  function load(){
    try{state=JSON.parse(localStorage.getItem(key())||"{}")||{};}catch(e){state={};}
    boxes.forEach(function(b){b.checked=!!state[b.dataset.step];});
    update();
  }
  function logIn(name){
    user=name; who.textContent=name; document.getElementById("avatar").textContent=name[0]; document.getElementById("owner").textContent=name+"’s "; document.body.dataset.user=name;
    try{localStorage.setItem("steam-hand-user",name);}catch(e){}
    login.classList.add("hidden"); document.body.classList.remove("locked"); load();
  }
  function logOut(){
    user=null; try{localStorage.removeItem("steam-hand-user");}catch(e){}
    login.classList.remove("hidden"); document.body.classList.add("locked"); showPicker();
  }
  var H={"Josh": "c9d1f3632f422c6a1d8b2b15d6e6a2ac15760b7e2d0000056b50877394ed9c0d", "Quadri": "8de331547d4fdc371a289553d32945d01ccc50eae504a74d9f4b42666abb1746", "Nasser": "143169ab59bf1068255cb039956479498b7efa74bb205856b95d886e4587e622"};
  var btns=document.querySelector(".login-btns"), form=document.getElementById("pwform"),
      pwIn=document.getElementById("pw"), pwName=document.getElementById("pw-name"), err=document.getElementById("pw-err"), pick=null;
  function hex(buf){return [].map.call(new Uint8Array(buf),function(x){return ("0"+x.toString(16)).slice(-2);}).join("");}
  function showPicker(){pick=null;form.classList.add("hidden");btns.classList.remove("hidden");err.textContent="";pwIn.value="";}
  [].forEach.call(document.querySelectorAll("[data-user]"),function(btn){
    btn.addEventListener("click",function(){pick=btn.dataset.user;pwName.textContent=pick;btns.classList.add("hidden");form.classList.remove("hidden");err.textContent="";pwIn.value="";pwIn.focus();});
  });
  document.getElementById("pw-back").addEventListener("click",showPicker);
  form.addEventListener("submit",function(e){
    e.preventDefault(); if(!pick)return;
    crypto.subtle.digest("SHA-256",new TextEncoder().encode("steamhand:"+pick+":"+pwIn.value)).then(function(d){
      if(hex(d)===H[pick]){var u=pick;showPicker();logIn(u);} else {err.textContent="Wrong password";pwIn.value="";pwIn.focus();}
    });
  });
  document.getElementById("switch").addEventListener("click",logOut);
  boxes.forEach(function(b){
    b.addEventListener("change",function(){if(!user)return;state[b.dataset.step]=b.checked;save();update();});
  });
  document.getElementById("reset").addEventListener("click",function(){
    boxes.forEach(function(b){b.checked=false;});state={};save();update();
  });
  var saved=null; try{saved=localStorage.getItem("steam-hand-user");}catch(e){}
  if(["Josh","Nasser","Quadri"].indexOf(saved)>=0) logIn(saved); else logOut();
})();
