fetch("data/gallery.json")
.then(r=>r.json())
.then(data=>{

const box=document.getElementById("gallery");

box.innerHTML="";

data.forEach(i=>{

box.innerHTML+=`

<div class="photo">

<img src="${i.image}" onclick="window.open('${i.image}')">

<h3>${i.title}</h3>

</div>

`;

});

});