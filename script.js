(function(){
  var KEY="steam-hand-checklist-v1";
  var boxes=[].slice.call(document.querySelectorAll('.steps input[type="checkbox"]'));
  var doneEl=document.getElementById("done"), fill=document.getElementById("bar-fill");
  var state={};
  try{state=JSON.parse(localStorage.getItem(KEY)||"{}")||{};}catch(e){state={};}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
  function update(){
    var n=boxes.filter(function(b){return b.checked;}).length;
    doneEl.textContent=n;
    fill.style.width=(n/boxes.length*100)+"%";
  }
  boxes.forEach(function(b){
    b.checked=!!state[b.dataset.step];
    b.addEventListener("change",function(){state[b.dataset.step]=b.checked;save();update();});
  });
  document.getElementById("reset").addEventListener("click",function(){
    boxes.forEach(function(b){b.checked=false;});state={};save();update();
  });
  update();
})();
