let creepFactory = {
	run: function() {

		//screep population checking
		let {claimers, harvesters, upgraders, builders, repairers, miners, haulers, wallers, remoteHarvesters} = unitCount();

		//SETTINGS DEPENDING ON GAME STAGE
		let room = Game.spawns['Spawn1'].room;
		let MinEnergyToSpawn = Math.min((room.energyCapacityAvailable - 300),800);

		// //ENERGY DATA
		// var energyAvailable = Game.spawns['Spawn1'].room.energyAvailable;
		// var energyCap = Game.spawns['Spawn1'].room.energyCapacityAvailable;
		// var containers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}})



		//SPAWNING
		//TODO: handle Multiroom

    // for each spawn
    // for (let spawnName in Game.spawns) {
    //   // run spawn logic
    //   Game.spawns[spawnName].spawnCreepsIfNecessary();
    // }


		for (let spawn in Game.spawns) {
			if (!Game.spawns[spawn].spawning) {
				var freeSpawn = Game.spawns[spawn]
			}
		}


		if (harvesters.length < 2 && room.energyAvailable > 299) {
			Game.spawns['Spawn1'].createBalancedCreep(room.energyAvailable, 'harvester');
		}
		else if (miners.length < 2 && room.energyAvailable > 550) {
			Game.spawns['Spawn1'].createMinerCreep();
		}
		else if (miners.length < 2 && room.energyAvailable > 700) {
			Game.spawns['Spawn1'].createHaulerCreep(room.energyAvailable);
		}
		else if (upgraders.length < 2 && room.energyAvailable > MinEnergyToSpawn) {
			Game.spawns['Spawn1'].createBalancedCreep(room.energyAvailable, 'upgrader');
		}
		else if (builders.length < 1 && room.energyAvailable > MinEnergyToSpawn) {
			Game.spawns['Spawn1'].createBalancedCreep(room.energyAvailable, 'builder');
		}
		else if (repairers.length < 1 && room.energyAvailable > MinEnergyToSpawn) {
			Game.spawns['Spawn1'].createBalancedCreep(room.energyAvailable, 'repairer');
		}
		else if (miners.length < 2 && room.energyAvailable > MinEnergyToSpawn) {
			Game.spawns['Spawn1'].createMinerCreep();
		}
		else if (haulers.length < 3 && room.energyAvailable > MinEnergyToSpawn) {
			Game.spawns['Spawn1'].createHaulerCreep(room.energyAvailable);
		}
		else if (wallers.length < 1 && room.energyAvailable > MinEnergyToSpawn) {
			Game.spawns['Spawn1'].createBalancedCreep(room.energyAvailable, 'waller');
		}
		else if (remoteHarvesters.length < 4 && room.energyAvailable > MinEnergyToSpawn) {
			Game.spawns['Spawn1'].createRemoteHarvesterCreep(room.energyAvailable);
		}

		//CLAIMER
		if (Game.rooms['E55N52'] === undefined && claimers.length < 1) {
			Game.spawns['Spawn2'].createClaimerCreep('claimFlag1');
		}

		if(Game.spawns['Spawn1'].spawning) {
			let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
			Game.spawns['Spawn1'].room.visual.text(
				'🛠️' + spawningCreep.memory.role,
				Game.spawns['Spawn1'].pos.x + 1,
				Game.spawns['Spawn1'].pos.y,
				{align: 'left', opacity: 0.8});
		}
	}
};

module.exports = creepFactory;
