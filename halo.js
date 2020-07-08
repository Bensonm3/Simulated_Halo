const lib = require('lib');
const mcc = lib.halo.mcc['@0.0.11'];
let winner = "";
let loser = "";
let player1Name = "BENNYGOLDENBERG"
let player2Name = "DNYGLDNBRG"
let player1Score = 0;
let player2Score = 0;
let player1Stats;
let player2Stats;
let mapName;
let timer = 4
let maps = {
    Anchor9: ["Repair Control","Repair Wing","Weapons Wing","Observation Deck","Control Room","External Platform","Space","Hangar","Sabre","Repair Ledge","Repair Operations","Access_Tunnel"],
    Arena_Zealot: ["Red Platform","Red Curved Hall","Red Corner","Red Halls","Blue Platform","Blue Curved Hall","Blue Corner","Blue Halls","Center Platform","High Center","Ground Floor","Basement","Holograms"],
    // Asylum: {},
    Boardwalk: ["Cafe Hall","Cafe Square","Upper Courtyard","Skybridge","Courtyard","Service Tunnels","Visitor Center","Ocean View","Courtyard Balcony","Rest Stop 1st Floor","Rest Stop 2nd Floor","Rest Stop Balcony","Overlook","Make Out Point","Abyss"],
    Countdown: ["Tech Stairs","Tech Hall","Balcony","Pipe Stairs","Pipe Hall","Second Floor","Third Floor","Big Door","Launch Pad","Ventilation","Big Door"],
    // Pinnacle: {},
    Powerhouse: ["Boiler","Cement Path","Cliffside","Dirt Path","Dormitory","Lockers","Office","Powerhouse 1st Floor","Powerhouse 2nd Floor","Ridge","Rock Garden","Shed","Spillway","Water Tank","Yard","Vaya Con Dios!"],
    Reflection: ["Entrance","Zen Garden","Walkway","Water Ramp","Water Balcony","Grass Ramp","West View","Kai Rends","East View","High Balcony","Balcony Hall","Back Hall","Elevator Shaft","Law Hall","Koi Ponds"], 
    SwordBase: ["Meeting Room","Atrium","Processing","Lobby","Elbow","Low Bridge","Medium Bridge","High Bridge","Reception","Low Vent","Corner Vent","Break room","Attic","Control Center","Laboratory","Collider","F.S","High Hall","Operations","Operations Hall","Security"],
    // TheCage: {},
    Uplink: ["Stairwell", "Repair Bay", "Communications", "Comm Hallway", "Observation Deck", "Tram Station", "Generator", "Center Core", "Space"]   
}
function checkScore(){
    
        
    
    let narration =[
        winner+" found "+loser+" hiding in the "+maps[mapName][Math.floor(Math.random()*maps[mapName].length)]+" and promptly eliminated "+loser,
        winner+" killed "+loser+" with a headshot!",
        winner+" beat down "+loser,
        loser+" was assassinated by "+winner,
        loser+" was killed by "+winner,
        "After a lengthy battle, "+winner+" managed to slay "+loser,
        loser+" came around a corner and was promptly eliminated by "+winner,
        "A poorly timed jump led to "+loser+"'s death at the hands of "+winner,
        winner+" managed to sneak up and kill "+loser+" with a headshot from behind",
        "Though "+loser+" was able to get the drop on "+winner+", "+winner+" was able to land a quick 180° headshot ending "+loser+"'s life",
        winner+" crouched in a secluded location and was able to eliminate an unaware "+loser,
        "Hiding did "+loser+" no good as they were quickly discovered and killed by "+winner,
        winner+" killed "+loser+" at the "+maps[mapName][Math.floor(Math.random()*maps[mapName].length)]
    ]
    console.log(narration[Math.floor(Math.random()*narration.length)])
    console.log(player1Name+" "+ player1Score)
    console.log(player2Name+" "+ player2Score)
    if(player2Score >= 25){
        console.log("Post Game Report: SWAT on "+mapName);
        console.log(player2Name+" Wins " +player2Score+ " to "+player1Score)
    }
    else if(player1Score >= 25){
        console.log(player1Name+" Wins "+player1Score+" to "+player2Score)
    }
        else{ 
            setTimeout(battle, 3000) ;
        }
    }
    function battle(){
        
       
        
        let player1Roll = (Math.random(player1Stats));
        let player2Roll = (Math.random(player2Stats));
        // console.log("player 1 roll: "+player1Roll+" player 2 roll: "+player2Roll)
        if (player1Roll < player2Roll){
        winner = player2Name
        loser = player1Name
        player2Score++
        }
        else{
            winner = player1Name
            loser = player2Name
            player1Score++
        }
        
        checkScore();
    }

async function getresults() {
    let player1 = await mcc.games.history({
    gamertag: player1Name // (required)
    });
    let player2 = await mcc.games.history({
        gamertag: player2Name // (required)
        });
        let player1Stats = player1.summary.killDeathRatio;
        let player2Stats = player2.summary.killDeathRatio;
    console.log(player1.results)
    console.log(player1Stats)
    console.log(player2Stats)
battle();
}

function time(){
    timer--
    if(timer ===0){
    var maplist =Object.keys(maps)
    mapName = maplist[Math.floor(Math.random()*maplist.length)]
    timer = "Loading SWAT on "+mapName;
    console.log(timer);
    getresults();
    }
    else {
        console.log(timer+"..")
        countdown();
    }
    
}
    
function countdown() {
    setTimeout(time, 1000)
}

countdown();

