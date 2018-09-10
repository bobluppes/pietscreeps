StructureSpawn.prototype.spawnLogic =
	//TODO: spawn selector for multiple spawns/ spawnQue
	function () {

    let RCL = this.room.controller.level;
    let maxPartsByRCL = {1: 2, 2: 4, 3:5, 4: 6, 5:7, 6: 8, 7: 10, 8: 12};
    Memory.maxParts = maxPartsByRCL[RCL.toString()];
    lg(Memory.maxParts);

    let {claimers, harvesters, upgraders, builders, repairers, miners, haulers, wallers, remoteHarvesters} = roomPopulation(this.room);

    let MinEnergyToSpawn = Math.min((this.room.energyCapacityAvailable-200),800);

    if (harvesters < 2 && this.room.energyAvailable > 299) {
      this.buildCreep('harvester');
    } else if (miners < 2 && this.room.energyAvailable > 550) {
      this.buildCreep('miner');
    } else if (haulers < 2 && this.room.energyAvailable > 700) {
      this.buildCreep('hauler');
    } else if (upgraders < 1 && this.room.energyAvailable > MinEnergyToSpawn) {
      this.buildCreep('upgrader');
    } else if (builders < 3 && this.room.energyAvailable > MinEnergyToSpawn) {
      this.buildCreep('builder');
    } else if (repairers < 1 && this.room.energyAvailable > MinEnergyToSpawn) {
      this.buildCreep('repairer');
    } else if (miners < 2 && this.room.energyAvailable > MinEnergyToSpawn) {
      this.buildCreep('miner');
    } else if (haulers < 2 && this.room.energyAvailable > MinEnergyToSpawn) {
      this.buildCreep('hauler');
    } else if (wallers < 1 && this.room.energyAvailable > MinEnergyToSpawn) {
      this.buildCreep('waller');
    } else if (remoteHarvesters < 0 && this.room.energyAvailable > MinEnergyToSpawn) {
      this.createRemoteHarvesterCreep(this.room.energyAvailable);
    }

    //CLAIMER
    // if (Game.rooms['E55N52'] === undefined && claimers.length < 1) {
    // 	Game.spawns['Spawn2'].createClaimerCreep('claimFlag1');
    // }

		if (this.spawning) {
			let spawningCreep = Game.creeps[this.spawning.name];
			this.room.visual.text(
				'🛠️' + spawningCreep.memory.role,
				this.pos.x + 1,
				this.pos.y,
				{align: 'left', opacity: 0.8});
		}
	};

StructureSpawn.prototype.buildCreep =
	function (roleName) {


		let newName;
    let body = [];
    let numberOfParts = {work: 0, carry: 0, move:0};
    let target = false;

    switch (roleName) {
      case 'hauler':
        newName = 'Hauler' + Game.time;
        numberOfParts.work = 0;
        numberOfParts.carry = Math.min(Math.floor(this.room.energyAvailable/100), Memory.maxParts);
        numberOfParts.move =Math.min(Math.floor(this.room.energyAvailable/100), Memory.maxParts);
        break;
      case 'miner':
        newName = 'Miner' + Game.time;
        numberOfParts.work = Math.min(Math.floor((this.room.energyAvailable -50)/100), Memory.maxParts);
        numberOfParts.carry = 0;
        numberOfParts.move = 1;
        break;
      // case 'remoteHarvester':
      //   newName = 'RemoteHarvester' + Game.time;
      //   numberOfParts = Math.min(Math.floor(this.room.energyAvailable/200), 6);
			// 	target =
      //   break;
      default:
      	newName = roleName + Game.time;
        numberOfParts.work = Math.min(Math.floor(this.room.energyAvailable/200), Memory.maxParts);
        numberOfParts.carry = Math.min(Math.floor(this.room.energyAvailable/200), Memory.maxParts);
        numberOfParts.move = Math.min(Math.floor(this.room.energyAvailable/200), Memory.maxParts);
    }
    console.log('Spawning new ' + roleName + ': ' + newName);

    for (let i = 0; i < numberOfParts.work; i++) {
      body.push(WORK);
    }
    for (let i = 0; i < numberOfParts.carry; i++) {
      body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts.move; i++) {
      body.push(MOVE);
    }
    return this.spawnCreep(body, newName, {memory: {
    	role: roleName,
			full: false,
			target: target,
			home: this.room.name }});
	};

StructureSpawn.prototype.createRemoteHarvesterCreep =
	function (energy) {
		let newName = 'RemoteHarvester' + Game.time;
		console.log('Spawning new RemoteHarvester: ' + newName);

		let numberOfParts = Math.min(Math.floor(energy/200), 9);
		let body = [];

		//WORK PARTS
		for (let i = 0; i < Math.floor(numberOfParts); i++) {
			body.push(WORK);
		}
		// CARRY PARTS
		for (let i = 0; i < numberOfParts*2; i++) {
			body.push(CARRY);
		}
		// MOVE PARTS
		for (let i = 0; i < numberOfParts*2; i++) {
			body.push(MOVE);
		}
		//console.log(body);
		// CREATE CREEP WITH THE CREATED BODY AND THE GIVEN ROLE
		return this.spawnCreep(body, newName, {memory: {role: 'remoteHarvester', full: false, home: this.room.name}});
	};

StructureSpawn.prototype.createClaimerCreep =
	//costs 700 energy
	function (targetFlag) {
		let newName = 'Claimer' + Game.time;
		console.log('Spawning new claimer: ' + newName);

		let body = [CLAIM, MOVE, MOVE];

		// CREATE CREEP WITH THE CREATED BODY AND THE GIVEN ROLE
		return this.spawnCreep(body, newName, {memory: {role: 'claimer',targetFlag: targetFlag, full: false, home: this.room.name}});
	};

StructureSpawn.prototype.containerLR = function () {

	let containers = this.room.find(FIND_STRUCTURES, {
		filter: (s) => {
			return (
				s.structureType === 'container'
			)
		}
	});

	lg(containers);
	containers.sort(function (a, b) {
		return a.pos.x - b.pos.x
	});
	lg(containers);
	containers[0].memory.name = "Links";
  containers[1].memory.name = "Rechts";
};

//BOBSHITE

StructureSpawn.prototype.getStructures = function(structureType) {
	switch (structureType) {
	case STRUCTURE_SPAWN: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}}).length;
	case STRUCTURE_EXTENSION: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}}).length;
	case STRUCTURE_ROAD: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_ROAD}}).length;
	case STRUCTURE_WALL: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_WALL}}).length;
	case STRUCTURE_RAMPART: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_RAMPART}}).length;
	case STRUCTURE_KEEPER_LAIR: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_KEEPER_LAIR}}).length;
	case STRUCTURE_PORTAL: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_PORTAL}}).length;
	case STRUCTURE_CONTROLLER: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTROLLER}}).length;
	case STRUCTURE_LINK: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}}).length;
	case STRUCTURE_STORAGE: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_STORAGE}}).length;
	case STRUCTURE_TOWER: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}}).length;
	case STRUCTURE_OBSERVER: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_OBSERVER}}).length;
	case STRUCTURE_POWER_BANK: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_POWER_BANK}}).length;
	case STRUCTURE_POWER_SPAWN: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_POWER_SPAWN}}).length;
	case STRUCTURE_EXTRACTOR: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_EXTRACTOR}}).length;
	case STRUCTURE_LAB: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LAB}}).length;
	case STRUCTURE_TERMINAL: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TERMINAL}}).length;
	case STRUCTURE_CONTAINER: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}}).length;
	case STRUCTURE_NUKER: return this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_NUKER}}).length;
	}
};

StructureSpawn.prototype.getRoomInfo = function(info) {
	switch (info) {
	case 'energyAvailable': return this.room.energyAvailable;
	case 'energyCap': return this.room.energyCapacityAvailable;
	case 'sources': return this.room.find(FIND_SOURCES).length;
	case 'droppedResources': return this.room.find(FIND_DROPPED_RESOURCES).length;
	case 'tombstones': return this.room.find(FIND_TOMBSTONES).length;
	}
};
