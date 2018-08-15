//Behaviour for different creep types
let roles = {
  //getEnergy                                           pink

  //Economy income
  harvester: require('role.harvester'),                //blue
  remoteHarvester: require('role.remoteHarvester'),
  miner: require('role.miner'),
  //Logistics
  hauler: require('role.hauler'),                       //red
  //Upkeep
  upgrader: require('role.upgrader'),                   //orange
  builder: require('role.builder'),                     //yellow
  repairer: require('role.repairer'),                   //white
  waller: require('role.waller'),                       //black
  //Defence
  roleTower: require('role.tower'),
  protector: require('role.protector')
};

//Load in prototypes
require('prototype.creep');
require('prototype.spawn');
require('prototype.tower');

//CUSTOM FUNCTIONS
require('functions.game');

//Creep factory to spawn the creeps and auto builder
let creepFactory = require('creepFactory');
let logger = require('logger');
let autoBuilder = require('autoBuilder');
let cache = require('cache');

module.exports.loop = function () {
    //Test
    //Game.spawns['Spawn1'].spawnHarvesterIfNeeded();

    //
    // let boop = global.draaiOm(['a', 'b', 'c', 'd']);
    // global.test(boop);

    // console.log(roles.harvester.balzak);

    //AutoBuilder
    autoBuilder.run();

    //Create the creeps and log game data
    creepFactory.run();
    logger.run();
    cache.run();

    //MAKING TOWERS WORK
    let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
    for (let tower of towers) {
        tower.defend();
    }

    //Creep behaviour
    for (let name in Game.creeps) {
      let creep = Game.creeps[name];
      roles[creep.memory.role].run(creep);
    }
}
