StructureSpawn.prototype.createBalancedCreep =
	function (energy, roleName) {
		// IF CREEP IS FIRST OF ITS KIND BUILD IT SIMPLE
		// ELSE: CREATE A BALANCED BODY AS BIG AS POSSIBLE BASED ON ENERGY CAPACITY
		let newName = 'B' + roleName + Game.time;
		console.log('Spawning balanced: ' + newName);
		let firstOfItsKind = (_.filter(Game.creeps, (creep) => creep.memory.role === roleName).length === 0);
		let body = [];

		if (firstOfItsKind && roleName !== 'waller') {
			body = [WORK, CARRY, MOVE];
			console.log('Queen of the first ' + roleName);
		} else {
			let numberOfParts = Math.min(Math.floor(energy / 200), 7);
			for (let i = 0; i < numberOfParts; i++) {
				body.push(WORK);
			}
			for (let i = 0; i < numberOfParts; i++) {
				body.push(CARRY);
			}
			for (let i = 0; i < numberOfParts; i++) {
				body.push(MOVE);
			}
		}

		// CREATE CREEP WITH THE CREATED BODY AND THE GIVEN ROLE
		return this.spawnCreep(body, newName, {memory: {role: roleName, full: false, home: this.room.name }});
	};


StructureSpawn.prototype.createMinerCreep =
	function () {
		//BUILD A MINER WITH 5 WORK AND 1 MOVE PART
		//THIS CONFIGURATION WILL DRAIN A SOURCE WITHIN THE RESPAWN TIME
		assignSource = function () {
			let sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
			console.log(sources);

			if (_.filter(Game.creeps, (creep) => creep.memory.source == sources[0].id).length == 0) {
				return sources[0].id;
			} else if (_.filter(Game.creeps, (creep) => creep.memory.source == sources[1].id).length == 0) {
				return sources[1].id;
			}
		};
		let assignedSource = assignSource();
		// console.log(assignedSource);

		let newName = 'Miner' + Game.time;
		console.log('Spawning new miner: ' + newName);
		let body = [WORK, WORK, WORK, WORK, WORK, MOVE];

		// CREATE CREEP WITH THE CREATED BODY AND THE GIVEN ROLE
		return this.spawnCreep(body, newName, {memory: {role: 'miner', full: false, source: assignedSource, energyOnContainer: true}});
	};

StructureSpawn.prototype.createHaulerCreep =
	function (energy) {
		let newName = 'Hauler' + Game.time;
		console.log('Spawning new hauler: ' + newName);

		let numberOfParts = Math.min(Math.floor(energy/100), 10);
		let body = [];

		//MAX WORK PARTS
		for (let i = 0; i < numberOfParts; i++) {
			body.push(MOVE);
		}
		// 1 MOVE PART
		for (let i = 0; i < numberOfParts; i++) {
			body.push(CARRY);
		}

		// CREATE CREEP WITH THE CREATED BODY AND THE GIVEN ROLE
		return this.spawnCreep(body, newName, {memory: {role: 'hauler', full: false, home: this.room.name}});
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
