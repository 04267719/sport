let coins = 500
let packprice = 100
let autoOpen = false

let players = [{name: "thedriverbob", sellprice: 100, image: "https://i.imgur.com/bUWFGqR.png", fullname: "TheDriverBob"}, 
{name: "joshbalu", sellprice: 700, image: "https://i.imgur.com/kwgEYvi.png", fullname: "Josh Balu"}, 
{name: "bdr", sellprice: 1000000, image: "https://i.imgur.com/vVpukH6.png", fullname: "bdr"},
{name: "weiland", sellprice: 100000, image: "https://i.imgur.com/1M8CbwP.png", fullname: "Weiland"},
{name: "bradleyjames", sellprice: 200, image: "https://i.imgur.com/AC1x8OW.png", fullname: "Bardley"}, 
{name: "queen", sellprice: 5000, image: "https://i.imgur.com/m8G3AGS.png", fullname: "Queen Elizabeth"},
{name: "mrbeast", sellprice: 400, image: "https://i.imgur.com/PWhyCVk.png", fullname: "Mr Beast"},
{name: "ascen", sellprice: 3750, image: "https://i.imgur.com/nHtJ5lh.png", fullname: "Ascen"},
{name: "centralcee", sellprice: 800, image: "https://i.imgur.com/1QENiZS.png", fullname: "Central Cee"},
{name: "chunkz", sellprice: 700, image: "https://i.imgur.com/1tjHn20.png", fullname: "Chunkz"},
{name: "munal", sellprice: 1000, image: "https://i.imgur.com/W8vs0b9.png", fullname: "Munal"},
{name: "kingcharles", sellprice: 200, image: "https://i.imgur.com/DKBqImk.png", fullname: "King Charles III"},
{name: "andrewtate", sellprice: 7000, image: "https://i.imgur.com/UCT8qLp.png", fullname: "Andrew Tate"},
{name: "drake", sellprice: 300, image: "https://i.imgur.com/3BhQfrd.png", fullname: "Drake"},
{name: "messi", sellprice: 1, image: "https://i.imgur.com/vUJ3v5I.png", fullname: "Messi"},
{name: "ronaldo", sellprice: 2, image: "https://i.imgur.com/RNxa9Qc.png", fullname: "Ronaldo"},
{name: "jakepaul", sellprice: 400, image: "https://i.imgur.com/6Rj6MQG.png", fullname: "Jake Paul"},
{name: "rock", sellprice: 3000, image: "https://i.imgur.com/nl3tRqJ.png", fullname: "The Rock"},
{name: "aitch", sellprice: 500, image: "https://i.imgur.com/lZlPzZh.png", fullname: "Aitch"},
{name: "thirly", sellprice: 850, image: "https://i.imgur.com/zeF4QJy.png", fullname: "Thirly"},
{name: "morgz", sellprice: 450, image: "https://i.imgur.com/61iuw12.png", fullname: "Morgz"},
{name: "thomas", sellprice: 400, image: "https://i.imgur.com/tuntj94.png", fullname: "Thomas Tuchel"},
{name: "fabrizio", sellprice: 1200, image: "https://i.imgur.com/LLyVAEL.png", fullname: "Fabrizio Romano"},
{name: "niko", sellprice: 800, image: "https://i.imgur.com/kgIOMSR.pngR", fullname: "Niko"},
{name: "absq", sellprice: 2000, image: "https://i.imgur.com/3aqdaPQ.png", fullname: "absq"}]


let collectedplayers = []

function updateCoins(){
  document.getElementById("coins").innerText = numberWithCommas(coins)
}




window.onload = function (){

  if(localStorage.getItem("falconSportMoney") == null)
{
        localStorage.setItem("falconSportMoney", coins)
}
else{
    coins = parseInt(localStorage.getItem("falconSportMoney"))
}

if(localStorage.getItem("falconSportPlayers") == null)
{
        localStorage.setItem("falconSportPlayers", JSON.stringify(collectedplayers))
}
else{
    collectedplayers =  JSON.parse(localStorage.getItem("falconSportPlayers"))
}

updateCoins()
loadPlayers()
document.getElementById("networth").innerText = numberWithCommas(getTotal())

document.getElementById("cost").innerText = packprice

document.getElementById("openPack").onclick = function(){
  if(autoOpen == true)
  {
    openPack()
  }
  else{
    debug()
  }
    
    
}


function loadPlayers(){

  for (let i = 0; i < collectedplayers.length; i++) {
  let div = document.createElement("div")
div.id = collectedplayers[i].id
div.className = "playerDiv"
div.innerHTML = `<div onclick="viewPlayer('` + collectedplayers[i].id + `')" style="padding:10px; padding-left:"20px"><label style="cursor: pointer;">` + players[indexFromName(collectedplayers[i].player)].fullname + `</label></div>`
document.getElementById("list").prepend(div)
  }


}



document.getElementById("sellAll").onclick = function(){

  sellAll()
  document.getElementById("list").innerHTML = ""
  collectedplayers = []
  localStorage.setItem("falconSportPlayers", JSON.stringify(collectedplayers))
  
}

window.onclick = function(event) {
  if (event.target == document.getElementById("myModal")) {
    document.getElementById("myModal").style.display = "none";
  }
}
    
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function indexFromName(name){
    let index = players.findIndex(function(item, z) {
        return item.name === name
      });
    return index
}

async function editCoins(amount, speed , type, reopen){


  currentcoins = coins

  if(type == "add")
  {
    coins += amount
    localStorage.setItem("falconSportMoney", coins)
    for (let i = 0; i < Math.floor(amount / speed); i++) {
      currentcoins += speed
      document.getElementById("coins").innerText = numberWithCommas(currentcoins)
      await sleep(0.001)
      
    }

    if(reopen == true){
      openPack()
    }

  }
  else if(type == "remove")
  {
    coins -= amount
    localStorage.setItem("falconSportMoney", coins)
    for (let i = 0; i < Math.floor(amount / speed); i++) {
      currentcoins -= speed
      document.getElementById("coins").innerText = numberWithCommas(currentcoins)
      await sleep(0.001)
      
    }
    if(reopen == true){
      openPack()
    }

  }

  document.getElementById("coins").innerText = numberWithCommas(coins)
 
}

function sleep(time) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve();
      }, time);
  });
}


function sellRecentPack(){
  editCoins(players[indexFromName(collectedplayers[collectedplayers.length - 1].player)].sellprice, 10, "add", true)
  
}

function sellAll(){
  let money = 0


  for (let i = 0; i < collectedplayers.length; i++) {
    money += players[indexFromName(collectedplayers[i].player)].sellprice
    
}

coins += money
console.log(money)
localStorage.setItem("falconSportMoney", coins)
document.getElementById("coins").innerText = numberWithCommas(coins)
document.getElementById("networth").innerText = 0
}


function openPack(){


  if(coins <= packprice - 1)
  {
    alert("too poor!")
  }
  else{
    let player;
    let random = Math.random()
    editCoins(packprice, 5, "remove", false)
 
    if(random < 0.000000031){
 
 
     const rndInt = Math.floor(Math.random() * 2) + 1
     if(rndInt == 1){
         player = players[indexFromName("messi")]
     }
     else{
         player = players[indexFromName("ronaldo")]
     }
 
 }
 else if(random < 0.0004){
     player = players[indexFromName("bdr")]
 }
 else if(random < 0.0009){
   player = players[indexFromName("weiland")]
 }
 else if(random < 0.01){
     player = players[indexFromName("andrewtate")]
   }
   else if(random < 0.015){
    player = players[indexFromName("absq")]
}
   else if(random < 0.025){
     player = players[indexFromName("rock")]
   }

 else if(random < 0.05){
   player = players[indexFromName("queen")]
 }
 else if(random < 0.07){
   player = players[indexFromName("ascen")]
 }
 else if(random < 0.08){
     player = players[indexFromName("thirly")]
   }  
 else if(random < 0.09){
   player = players[indexFromName("chunkz")]
 }
 else if(random < 0.15){
   player = players[indexFromName("munal")]
 }
 else if(random < 0.17){
     player = players[indexFromName("centralcee")]
   }
 else if(random < 0.18){
     player = players[indexFromName("niko")]
   } 
 else if(random < 0.20){
     player = players[indexFromName("fabrizio")]
   } 
   else if(random < 0.25){
     player = players[indexFromName("aitch")]
   }
 else if(random < 0.30){
   player = players[indexFromName("joshbalu")]
 }
 else if(random < 0.35){
     const rndInt = Math.floor(Math.random() * 2) + 1
     if(rndInt == 1){
         player = players[indexFromName("morgz")]
     }
     else{
         player = players[indexFromName("thomas")]
     }
   } 
 else if(random < 0.40){
   player = players[indexFromName("bradleyjames")]
 }
 else if(random < 0.44){
     player = players[indexFromName("drake")]
   }
 else if(random < 0.45){
   player = players[indexFromName("mrbeast")]
 }
 else if(random < 0.70){
     player = players[indexFromName("kingcharles")]
   }
   else if(random < 0.73){
     player = players[indexFromName("jakepaul")]
   }
 else if(random < 1){
   player = players[indexFromName("thedriverbob")]
 }
 
 
     let date = new Date();
     let id = makeid(10)
     document.getElementById("packDiv").style.display = "block"
     document.getElementById("packImage").src = player.image
     collectedplayers.push({player: player.name, packed_date: date.toLocaleString(), id: id})
     localStorage.setItem("falconSportPlayers", JSON.stringify(collectedplayers))
     addToList(player.fullname, id)
     document.getElementById("networth").innerText = numberWithCommas(getTotal())

     if(coins <= packprice - 1)
  {
    alert("too poor!")
  }


  }
   

}

function getTotal(){
    let total = 0
    for (let i = 0; i < collectedplayers.length; i++) {
        total += players[indexFromName(collectedplayers[i].player)].sellprice
    }
    return total
}

function addToList(name, id){
let div = document.createElement("div")
div.id = id
div.className = "playerDiv"
div.innerHTML = `<div onclick="viewPlayer('` + id + `')" style="padding:10px; padding-left:"20px"><label style="cursor: pointer;">` + name + `</label></div>`
document.getElementById("list").prepend(div)
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

function viewPlayer(id){

  let index = collectedplayers.findIndex(function(item, z) {
    return item.id === id
  });


  document.getElementById("playerName").innerText = players[indexFromName(collectedplayers[index].player)].fullname
  document.getElementById("packedDate").innerText = collectedplayers[index].packed_date
  document.getElementById("test").innerHTML = `<button onclick="sellById('` + collectedplayers[index].id + `')" id="sellPack2">Sell For <img class="coins" src="https://i.imgur.com/ka5DlfC.png"> <label style="cursor: pointer;" id="sellCount2">` + players[indexFromName(collectedplayers[index].player)].sellprice + `</label></button>`
  document.getElementById("dupesOwned").innerText = amountOwned(collectedplayers[index].player)
  document.getElementById("packedImage").src = players[indexFromName(collectedplayers[index].player)].image
  document.getElementById("myModal").style.display = "block"
}

function amountOwned(name){
  let amount = 0
  for ( var i = 0; i < collectedplayers.length; i++ ) {
    if(collectedplayers[i].player == name)
    {
      amount +=1
    }
  }
  return amount
}

function sellById(id)
{
  let index = collectedplayers.findIndex(function(item, z) {
    return item.id === id
  });


  editCoins(players[indexFromName(collectedplayers[index].player)].sellprice, 10, "add", false)
  collectedplayers.splice(id, 1);
  localStorage.setItem("falconSportPlayers", JSON.stringify(collectedplayers))

  document.getElementById("networth").innerText = numberWithCommas(getTotal())
  document.getElementById("list").removeChild(document.getElementById(id));
  document.getElementById("myModal").style.display = "none";
  


}

async function debug(){


  if(coins <= packprice - 1)
  {
    alert("too poor!")
  }
  else{
    document.getElementById("packImage").style.width = "90%"
  document.getElementById("openPack").disabled = true
  document.getElementById("openPack").style.cursor = "not-allowed"
  let player;
    let random = Math.random()
    editCoins(300, 5, "remove", false)
 
    if(random < 0.000000031){
 
 
     const rndInt = Math.floor(Math.random() * 2) + 1
     if(rndInt == 1){
         player = players[indexFromName("messi")]
     }
     else{
         player = players[indexFromName("ronaldo")]
     }
 
 }
 else if(random < 0.0004){
     player = players[indexFromName("bdr")]
 }
 else if(random < 0.0009){
   player = players[indexFromName("weiland")]
 }
 else if(random < 0.01){
     player = players[indexFromName("andrewtate")]
   }
   else if(random < 0.015){
    player = players[indexFromName("absq")]
}
   else if(random < 0.025){
     player = players[indexFromName("rock")]
   }

 else if(random < 0.05){
   player = players[indexFromName("queen")]
 }
 else if(random < 0.07){
   player = players[indexFromName("ascen")]
 }
 else if(random < 0.08){
     player = players[indexFromName("thirly")]
   }  
 else if(random < 0.09){
   player = players[indexFromName("chunkz")]
 }
 else if(random < 0.15){
   player = players[indexFromName("munal")]
 }
 else if(random < 0.17){
     player = players[indexFromName("centralcee")]
   }
 else if(random < 0.18){
     player = players[indexFromName("niko")]
   } 
 else if(random < 0.20){
     player = players[indexFromName("fabrizio")]
   } 
   else if(random < 0.25){
     player = players[indexFromName("aitch")]
   }
 else if(random < 0.30){
   player = players[indexFromName("joshbalu")]
 }
 else if(random < 0.35){
     const rndInt = Math.floor(Math.random() * 2) + 1
     if(rndInt == 1){
         player = players[indexFromName("morgz")]
     }
     else{
         player = players[indexFromName("thomas")]
     }
   } 
 else if(random < 0.40){
   player = players[indexFromName("bradleyjames")]
 }
 else if(random < 0.44){
     player = players[indexFromName("drake")]
   }
 else if(random < 0.45){
   player = players[indexFromName("mrbeast")]
 }
 else if(random < 0.70){
     player = players[indexFromName("kingcharles")]
   }
   else if(random < 0.73){
     player = players[indexFromName("jakepaul")]
   }
 else if(random < 1){
   player = players[indexFromName("thedriverbob")]
 }
 

 document.getElementById("packDiv").style.display = "block"


let max = Math.floor(Math.random() * 23) + 1

 for ( var i = 0; i < 25; i++ ) {
  if(max >= players.length - 1)
  {
    max = Math.floor(Math.random() * 23) + 1
  }
  

  let randomPlayer = players[max];
  document.getElementById("packImage").src = randomPlayer.image
  max += Math.floor(Math.random() * 3) + 1
  await sleep(50)
 }

 max = Math.floor(Math.random() * 23) + 1

 for ( var i = 0; i < 7; i++ ) {

  if(max >= players.length - 1)
  {
    max = Math.floor(Math.random() * 23) + 1
  }

  let randomPlayer = players[max];
  document.getElementById("packImage").src = randomPlayer.image
  max += Math.floor(Math.random() * 3) + 1
  await sleep(100)
 }


 max = Math.floor(Math.random() * 23) + 1

 for ( var i = 0; i < 5; i++ ) {

  if(max >= players.length - 1)
  {
    max = Math.floor(Math.random() * 23) + 1
  }

  let randomPlayer = players[max];
  document.getElementById("packImage").src = randomPlayer.image
  max += Math.floor(Math.random() * 3) + 1
  await sleep(300)
 }

 max = Math.floor(Math.random() * 23) + 1

 for ( var i = 0; i < 3; i++ ) {

  if(max >= players.length - 1)
  {
    max = Math.floor(Math.random() * 23) + 1
  }

  let randomPlayer = players[max];
  document.getElementById("packImage").src = randomPlayer.image
  max += Math.floor(Math.random() * 3) + 1
  await sleep(500)
 }


     let date = new Date();
     let id = makeid(10)

     document.getElementById("packImage").style.width = "100%"
     document.getElementById("packImage").src = player.image
     collectedplayers.push({player: player.name, packed_date: date.toLocaleString(), id: id})
     localStorage.setItem("falconSportPlayers", JSON.stringify(collectedplayers))
     addToList(player.fullname, id)
     document.getElementById("networth").innerText = numberWithCommas(getTotal())

     document.getElementById("openPack").disabled = false
     document.getElementById("openPack").style.cursor = "pointer"
}
  }


