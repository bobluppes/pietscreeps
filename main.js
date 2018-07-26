//Behaviour for different creep types
let roles = {
  //Economy income
  harvester: require('role.harvester'),
  remoteHarvester: require('role.remoteHarvester'),
  miner: require('role.miner'),
  //Logistics
  hauler: require('role.hauler'),
  //Upkeep
  upgrader: require('role.upgrader'),
  builder: require('role.builder'),
  repairer: require('role.repairer'),
  wallRepairer: require('role.wallRepairer'),
  //Defence
  roleTower: require('role.tower'),
  protector: require('role.protector')
};

//Load in prototypes
require('prototype.creep');
//require('prototype.spawn');
require('prototype.tower');

//Creep factory to spawn the creeps and auto builder
var creepFactory = require('creepFactory');
var logger = require('logger');
var autoBuilder = require('autoBuilder');
var cache = require('cache');

module.exports.loop = function () {
    //Test
    //Game.spawns['Spawn1'].spawnHarvesterIfNeeded();

    //AutoBuilder
    autoBuilder.run();

		//Create the crees and log game data
    creepFactory.run();
    logger.run();
    cache.run();

    //Tower behaviour
    var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    for (let tower in towers) {
      roles['tower'].run(tower);
    }

    //Creep behaviour
    for (let name in Game.creeps) {
      let creep = Game.creeps[name];
      roles[creep.memory.role].run(creep);
    }
}
