var townList = [];

var addTown = function(name,gym,image,shop,reqRoutes){

	var temp = {
		name: name,
		gym: gym,
		image: image,
		shop: shop,
		reqRoutes: reqRoutes
	}
	
	townList.push(temp);
}

var moveToTown = function(townName){
	var town = getTown(townName);
	canCatch = 0;
		if( accessToTown(town.reqRoutes)){
			$("#catchDisplay").html("");	
			inProgress = 0;
			resetDungeon();
			showTown(town);
		}
		else {
			log("You don't have access to "+ townName + " yet.");
		}

}

var accessToTown = function(routeList){

	if(routeList.length == 0){
		return true;
	}

	for( var i = 0; i<routeList.length; i++){
		if(player.routeKills[routeList[i]] >= player.routeKillsNeeded){
			return true;
		}
	}
	return false;
}

var showTown = function(town){
	
	var html = "";
	html += "<h3 class='townName strokeme'>"+town.name;
	if(town.gym != null){	
		if(town.gym.bossList != undefined){
			if(allPokemonCaughtInDungeon(town.gym.pokemons, town.gym.bossList)){
				html += " <img id=alreadyCaughtImage src=images/Pokeball.PNG>";
			}
			
		}
	}
	html += "</h3>";
	html += "<div class='row'>";
	if(town.gym != null){
		if(town.gym.bossList != undefined){
			oakExplainDungeons()
			if(player.gymBadges.length >= town.gym.badgeReq){
				html += "<button class='dungeon leftTownButton btn btn-primary col-sm-2' id='"+town.name+" Dungeon'>Dungeon<br>"+town.gym.tokenCost+" tokens</button>"
			} else {
				html += "<button class='wrongDungeon leftTownButton btn btn-primary disabled col-sm-2' id='"+town.name+" Dungeon'>Dungeon</button>"
			}

		}
		else if (Array.isArray(town.gym)){
			for(var i = 0; i<town.gym.length; i++){
				if(player.gymBadges.length >= town.gym[i].badgeReq){
					html += "<button class='gym leftTownButton btn btn-primary col-sm-2' id='"+town.gym[i].leaderName + " Gym'>"+town.gym[i].leaderName+"</button>"
					html += "</div><div class='row'>";
				}
				else {
					html += "<button class='leftTownButton btn btn-primary disabled col-sm-2' id='"+town.gym[i].leaderName + " Gym'>"+town.gym[i].leaderName+"</button>"
					html += "</div><div class='row'>";
				}
			}
		}
		else {
			if(player.gymBadges.length >= town.gym.badgeReq){
				html += "<button class='gym leftTownButton btn btn-primary col-sm-2' id='"+town.name+" Gym'>Gym</button>"
			} else {
				html += "<button class='wrongGym leftTownButton btn btn-primary disabled col-sm-2' id='"+town.name+" Gym'>Gym</button>"
			}
		}
	}
	html += "</div>"
	$("#townView").html(html);
	$("#townView").css("background-image", "url("+town.image+")");  
	$("#townView").css("background-repeat", "no-repeat");
	$("#townView").css("background-position", "center");    

	hideAllViews()
	$("#townView").show();	
}

var loadTowns = function(){
	addTown("Pewter City", PewterCityGym(), "images/gyms/pewtercity.png", null, [2]);
	addTown("Cerulean City", CeruleanCityGym(), "images/gyms/ceruleancity.png", null, [4]);
	addTown("Vermillion City",VermillionCityGym(), "images/gyms/vermillioncity.png", null, [6]);
	addTown("Celadon City", CeladonCityGym(), "images/gyms/celadoncity.png", null, [8]);
	addTown("Saffron City", SaffronCityGym(), "images/gyms/saffroncity.png", null, [5]);
	addTown("Fuchsia City", FuchsiaCityGym(), "images/gyms/fuchsiacity.png", null, [18,15]);
	addTown("Cinnabar Island", CinnabarIslandGym(), "images/gyms/cinnabarisland.png", null, [20]);
	addTown("Viridian City", ViridianCityGym(), "images/gyms/viridiancity.png", null, [1]);
	addTown("Pallet Town", null, "images/gyms/pallettown.png", null, []);
	addTown("Lavender Town", null, "images/gyms/lavendertown.png", null, [7,10]);
	addTown("Indigo Plateau", [EliteLorelei(), EliteBruno(), EliteAgatha(), EliteLance(), Champion()], "images/gyms/indigoplateau.png", null, [23]);
	addTown("Elite Lorelei", EliteLorelei(), null, null, null);
	addTown("Elite Bruno", EliteBruno(), null, null, null);
	addTown("Elite Agatha", EliteAgatha(), null, null, null);
	addTown("Elite Lance", EliteLance(), null, null, null);
	addTown("Champion", Champion(), null, null, null);

	addTown("Viridian Forest", ViridianForestDungeon(), "images/dungeons/viridianforest.png", null, [1]);
	addTown("Digletts Cave", DiglettsCaveDungeon(), "images/dungeons/diglettscave.png", null, [1]);
	addTown("Mt. Moon", MtMoonDungeon(), "images/dungeons/mtmoon.png", null, [3]);
	addTown("Rock Tunnel", RockTunnelDungeon(), "images/dungeons/rocktunnel.png", null, [9]);
	addTown("Power Plant", PowerPlantDungeon(), "images/dungeons/powerplant.png", null, [9]);
	addTown("Pokemon Tower", PokemonTowerDungeon(), "images/dungeons/pokemontower.png", null, [7,10]);
	addTown("Seafoam Islands", SeafoamIslandsDungeon(), "images/dungeons/seafoamislands.png", null, [19]);
	addTown("Victory Road", VictoryRoadDungeon(), "images/dungeons/victoryroad.png", null, [22]);
	addTown("Cerulean Cave", CeruleanCaveDungeon(), "images/dungeons/ceruleancave.png", null, [4]);
	addTown("Pokemon Mansion", PokemonMansionDungeon(), "images/dungeons/pokemonmansion.png", null, [20]);
}

var getTown = function(townName){
	for( var i = 0; i< townList.length; i++){
		if(townList[i].name == townName){
			return townList[i];
		}
	}
	return null;
}




