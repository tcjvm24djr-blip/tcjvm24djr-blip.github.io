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
    user=name; who.textContent=name;
    try{localStorage.setItem("steam-hand-user",name);}catch(e){}
    login.classList.add("hidden"); document.body.classList.remove("locked"); load();
  }
  function logOut(){
    user=null; try{localStorage.removeItem("steam-hand-user");}catch(e){}
    login.classList.remove("hidden"); document.body.classList.add("locked");
  }
  [].forEach.call(document.querySelectorAll("[data-user]"),function(btn){
    btn.addEventListener("click",function(){logIn(btn.dataset.user);});
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
