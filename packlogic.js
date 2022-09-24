let coins = 500
let packprice = 250
let autoOpen = false

let players = [{name: "thedriverbob", sellprice: 100, image: "https://i.imgur.com/tthryy5.png", fullname: "TheDriverBob"}, 
{name: "lebronjames", sellprice: 150, image: "https://i.imgur.com/e6UiXq5.png", fullname: "Lebron James"}, 
{name: "drake", sellprice: 185, image: "https://i.imgur.com/woGWnGs.png", fullname: "Drake"},
{name: "morgz", sellprice: 205, image: "https://i.imgur.com/plq9JWj.png", fullname: "Morgz"},
{name: "stormzy", sellprice: 215, image: "https://i.imgur.com/jYPeSr3.png", fullname: "Stormzy"}, 
{name: "aitch", sellprice: 220, image: "https://i.imgur.com/Ll8Z1Ly.png", fullname: "Aitch"},
{name: "willsmith", sellprice: 230, image: "https://i.imgur.com/utk13fa.png", fullname: "Will Smith"},
{name: "ksi", sellprice: 280, image: "https://i.imgur.com/LS8Xdlk.png", fullname: "KSI"},
{name: "barackobama", sellprice: 350, image: "https://i.imgur.com/Or0OSAM.png", fullname: "Barack Obama"},
{name: "osamabinladen", sellprice: 375, image: "https://i.imgur.com/1LnFQr6.png", fullname: "Osama Bin Laden"},
{name: "speed", sellprice: 375, image: "https://i.imgur.com/GbTpeub.png", fullname: "Speed"},
{name: "vladimirputin", sellprice: 400, image: "https://i.imgur.com/TgIv6TJ.png", fullname: "Vladimir Putin"},
{name: "queenelizabeth", sellprice: 450, image: "https://i.imgur.com/hx17Gcz.png", fullname: "Queen Elizabeth"},
{name: "chunkz", sellprice: 450, image: "https://i.imgur.com/y261uvj.png", fullname: "Chunkz"},
{name: "joshbalu", sellprice: 450, image: "https://i.imgur.com/z8ZZIcO.png", fullname: "Josh Balu"},
{name: "thirly", sellprice: 500, image: "https://i.imgur.com/Bdkr0CO.png", fullname: "Thirly"},
{name: "alex", sellprice: 500, image: "https://i.imgur.com/JHRdQ21.png", fullname: "Alex"},
{name: "therock", sellprice: 600, image: "https://i.imgur.com/3dTNhbQ.png", fullname: "The Rock"},
{name: "ascen", sellprice: 600, image: "https://i.imgur.com/pbAcoh1.png", fullname: "ascen"},
{name: "munal", sellprice: 700, image: "https://i.imgur.com/Gm26Hoq.png", fullname: "Munal"},
{name: "absq", sellprice: 800, image: "https://i.imgur.com/jFpwqnw.png", fullname: "absq"},
{name: "abdi", sellprice: 800, image: "https://i.imgur.com/SwqALsy.png", fullname: "Abdi"},
{name: "andrewtate", sellprice: 900, image: "https://i.imgur.com/HbR5QYC.png", fullname: "Andrew Tate"},
{name: "weiland", sellprice: 950, image: "https://i.imgur.com/hXo6sgL.png", fullname: "Weiland"},
{name: "bdr", sellprice: 1000, image: "https://i.imgur.com/4UeiGjX.png", fullname: "bdr"}]


let collectedplayers = []

function updatecoins(){
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

updatecoins()
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

async function editcoins(amount, speed , type, reopen){


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
  editcoins(players[indexFromName(collectedplayers[collectedplayers.length - 1].player)].sellprice, 10, "add", true)
  
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
    alert("Insufficient funds!")
  }
  else{
    let player;
    let random = Math.random()
    editcoins(packprice, 5, "remove", false)
 
 if(random < 0.0001){
     player = players[indexFromName("bdr")]
 }
 else if(random < 0.001){
   player = players[indexFromName("weiland")]
 }
 else if(random < 0.006){
     player = players[indexFromName("andrewtate")]
   }
   else if(random < 0.007){
    player = players[indexFromName("abdi")]
}
   else if(random < 0.008){
     player = players[indexFromName("absq")]
   }

 else if(random < 0.009){
   player = players[indexFromName("munal")]
 }
 else if(random < 0.01){
   player = players[indexFromName("ascen")]
 }
 else if(random < 0.015){
     player = players[indexFromName("therock")]
   }  
 else if(random < 0.02){
   player = players[indexFromName("alex")]
 }
 else if(random < 0.025){
   player = players[indexFromName("thirly")]
 }
 else if(random < 0.03){
     player = players[indexFromName("joshbalu")]
   }
 else if(random < 0.035){
     player = players[indexFromName("chunkz")]
   } 
 else if(random < 0.05){
     player = players[indexFromName("queenelizabeth")]
   } 
   else if(random < 0.09){
     player = players[indexFromName("vladimirputin")]
   }
 else if(random < 0.10){
   player = players[indexFromName("speed")]
 }
 else if(random < 0.15){
   player = players[indexFromName("osamabinladen")]
 }
 else if(random < 0.35){
     player = players[indexFromName("barackobama")]
   }
 else if(random < 0.50){
   player = players[indexFromName("ksi")]
 }
 else if(random < 0.70){
     player = players[indexFromName("willsmith")]
   }
 else if(random < 0.75){
   player = players[indexFromName("aitch")]
 }
 else if(random < 0.80){
     player = players[indexFromName("stormzy")]
   }
   else if(random < 0.94){
     player = players[indexFromName("morgz")]
   }
 else if(random < 0.95){
   player = players[indexFromName("drake")]
 }
 else if(random < 0.96){
   player = players[indexFromName("lebronjames")]
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
    alert("Insufficient funds!")
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


  editcoins(players[indexFromName(collectedplayers[index].player)].sellprice, 10, "add", false)
  collectedplayers.splice(id, 1);
  localStorage.setItem("falconSportPlayers", JSON.stringify(collectedplayers))

  document.getElementById("networth").innerText = numberWithCommas(getTotal())
  document.getElementById("list").removeChild(document.getElementById(id));
  document.getElementById("myModal").style.display = "none";
  


}

async function debug(){


  if(coins <= packprice - 1)
  {
    alert("Insufficient funds!")
  }
  else{
    document.getElementById("packImage").style.width = "90%"
  document.getElementById("openPack").disabled = true
  document.getElementById("openPack").style.cursor = "not-allowed"
  let player;
    let random = Math.random()
    editcoins(100, 5, "remove", false)
 

 if(random < 0.0001){
     player = players[indexFromName("bdr")]
 }
 else if(random < 0.001){
   player = players[indexFromName("weiland")]
 }
 else if(random < 0.006){
     player = players[indexFromName("andrewtate")]
   }
   else if(random < 0.007){
    player = players[indexFromName("abdi")]
}
   else if(random < 0.008){
     player = players[indexFromName("absq")]
   }

 else if(random < 0.009){
   player = players[indexFromName("munal")]
 }
 else if(random < 0.01){
   player = players[indexFromName("ascen")]
 }
 else if(random < 0.015){
     player = players[indexFromName("therock")]
   }  
 else if(random < 0.02){
   player = players[indexFromName("alex")]
 }
 else if(random < 0.025){
   player = players[indexFromName("thirly")]
 }
 else if(random < 0.03){
     player = players[indexFromName("joshbalu")]
   }
 else if(random < 0.035){
     player = players[indexFromName("chunkz")]
   } 
 else if(random < 0.05){
     player = players[indexFromName("queenelizabeth")]
   } 
   else if(random < 0.09){
     player = players[indexFromName("vladimirputin")]
   }
 else if(random < 0.10){
   player = players[indexFromName("speed")]
 }
 else if(random < 0.15){
   player = players[indexFromName("osamabinladen")]
 }
 else if(random < 0.35){
     player = players[indexFromName("barackobama")]
   }
 else if(random < 0.50){
   player = players[indexFromName("ksi")]
 }
 else if(random < 0.70){
     player = players[indexFromName("willsmith")]
   }
 else if(random < 0.75){
   player = players[indexFromName("aitch")]
 }
 else if(random < 0.80){
     player = players[indexFromName("stormzy")]
   }
   else if(random < 0.94){
     player = players[indexFromName("morgz")]
   }
 else if(random < 0.95){
   player = players[indexFromName("drake")]
 }
 else if(random < 0.96){
   player = players[indexFromName("lebronjames")]
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