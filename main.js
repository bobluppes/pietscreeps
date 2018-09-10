//Behaviour for different creep types
let roles = {
	// CONTROL
	claimer: require('role.claimer'),
	//ECONOMY INCOME
	harvester: require('role.harvester'),       //blue
	remoteHarvester: require('role.remoteHarvester'),
	miner: require('role.miner'),
	//LOGISTICS
	hauler: require('role.hauler'),             //red
	//UPKEEP
	upgrader: require('role.upgrader'),           //orange
	builder: require('role.builder'),           //yellow
	repairer: require('role.repairer'),           //white
	waller: require('role.waller'),             //black
	//DEFENCE
	roleTower: require('role.tower'),
	//protector: require('role.protector')
};

//LOAD IN PROTOTYPES
require('prototype.creep');
require('prototype.spawn');
require('prototype.tower');

//CUSTOM FUNCTIONS
require('functions.game');

//UTILITIES
let logger = require('logger');
let cache = require('cache');
//Game.spawns['Spawn1'].containerLR();
//PROFILER
const profiler = require('screeps-profiler');
profiler.enable();

//Game.spawns['Spawn1'].containerLR();

module.exports.loop = function () {
	profiler.wrap(function() {
		//UTILITIES

    //Game.spawns['Spawn1'].containerLR();
		logger.run();
		cache.run();
		//TOWERS
		let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
		for (let tower of towers) {
			tower.defend();
		}

    //SPAWNING
    for (let spawnName in Game.spawns) {
      Game.spawns[spawnName].spawnLogic();
    }

    //CREEPS
		for (let name in Game.creeps) {
			let creep = Game.creeps[name];
			roles[creep.memory.role].run(creep);
		}
	});
};

