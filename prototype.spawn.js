StructureSpawn.prototype.getPopulation = function(role) {
  switch (role) {
    case 'harvesters': return _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;break;
    case 'remoteHarvesters': return _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester').length;break;
    case 'miners': return _.filter(Game.creeps, (creep) => creep.memory.role == 'miner').length;break;
    case 'haulers': return _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler').length;break;
    case 'upgraders': return _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;break;
    case 'builders': return _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;break;
    case 'repairers': return _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer').length;break;
    case 'wallRepairers': return _.filter(Game.creeps, (creep) => creep.memory.role == 'wallRepairer').length;break;
    case 'protectors': return _.filter(Game.creeps, (creep) => creep.memory.role == 'protector').length;break;
  };
}

StructureSpawn.prototype.getStructures = function(structureType) {
  switch (structureType) {
    case STRUCTURE_SPAWN: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}}).length;break;
    case STRUCTURE_EXTENSION: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}}).length;break;
    case STRUCTURE_ROAD: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_ROAD}}).length;break;
    case STRUCTURE_WALL: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_WALL}}).length;break;
    case STRUCTURE_RAMPART: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_RAMPART}}).length;break;
    case STRUCTURE_KEEPER_LAIR: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_KEEPER_LAIR}}).length;break;
    case STRUCTURE_PORTAL: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_PORTAL}}).length;break;
    case STRUCTURE_CONTROLLER: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTROLLER}}).length;break;
    case STRUCTURE_LINK: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}}).length;break;
    case STRUCTURE_STORAGE: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_STORAGE}}).length;break;
    case STRUCTURE_TOWER: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}}).length;break;
    case STRUCTURE_OBSERVER: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_OBSERVER}}).length;break;
    case STRUCTURE_POWER_BANK: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_POWER_BANK}}).length;break;
    case STRUCTURE_POWER_SPAWN: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_POWER_SPAWN}}).length;break;
    case STRUCTURE_EXTRACTOR: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_EXTRACTOR}}).length;break;
    case STRUCTURE_LAB: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LAB}}).length;break;
    case STRUCTURE_TERMINAL: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TERMINAL}}).length;break;
    case STRUCTURE_CONTAINER: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}}).length;break;
    case STRUCTURE_NUKER: return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_NUKER}}).length;break;
  }
}

StructureSpawn.prototype.getRoomInfo = function(info) {
  switch (info) {
    case 'energyAvailable': return Game.spawns['Spawn1'].room.energyAvailable;break;
    case 'energyCap': return Game.spawns['Spawn1'].room.energyCapacityAvailable;break;
    case 'sources': return Game.spawns['Spawn1'].room.find(FIND_SOURCES).length;break;
    case 'droppedResources': return Game.spawns['Spawn1'].room.find(FIND_DROPPED_RESOURCES).length;break;
    case 'tombstones': return Game.spawns['Spawn1'].room.find(FIND_TOMBSTONES).length;break;
  }
}

StructureSpawn.prototype.calcBody = function(role) {
  let body = [];

  function addBaseParts() {
    body.push(WORK);
    body.push(WORK);
    body.push(CARRY);
    body.push(MOVE);
  }

  function addExtraParts() {
    body.push(WORK);
    body.push(CARRY);
    body.push(MOVE);
  }

  switch (role) {
    case 'upgrader':
    case 'builder':
    case 'repairer':
    case 'harvester':
      let extraParts = Math.floor((this.getRoomInfo('energyCap') - 300)/200);
      addBaseParts();
      for (let i = 0; i < extraParts; i++) {
        addExtraParts();
      }
      break;
    case 'remoteHarvester':
      break;
    case 'miner':
      break;
    case 'hauler':
      break;
    //case 'upgrader':
      //break;
    //case 'builder':
      //break;
    //case 'repairer':
      //break;
    case 'wallRepairer':
      break;
    case 'protector':
      break;
  }

  return body;
}

StructureSpawn.prototype.assignSource = function() {
  var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);

  if (_.filter(Game.creeps, (creep) => creep.memory.source == sources[0].id).length == 0) {
    return sources[0].id;
  } else if (_.filter(Game.creeps, (creep) => creep.memory.source == sources[1].id).length == 0) {
    return sources[1].id;
  }
}


//HARVESTERS
//Harvest energy from sources in begin game
//Pick up dropped resources
//Take energy from tomb stones
StructureSpawn.prototype.spawnHarvesterIfNeeded = function() {
  //Spawn conditions
  if (this.getPopulation('harvesters') < this.getRoomInfo('sources')){
    if ((this.getPopulation('miners') < this.getRoomInfo('sources')) || (this.getRoomInfo('droppedResources') != 0) || (this.getRoomInfo('tombstones') != 0)) {
      let body = this.calcBody('harvester');
      let newName = 'Harvester' + Game.time;
      this.spawnCreep(body, newName, {memory: {role:'harvester',building:false}});
      return 1;
    }
  }
  return 'NOT NEEDED';
}

StructureSpawn.prototype.spawnRemoteHarvesterIfNeeded = function() {
  //Spawn conditions
}

StructureSpawn.prototype.spawnMinerIfNeeded = function() {
  //Spawn conditions
}

StructureSpawn.prototype.spawnHaulerIfNeeded = function() {
  //Spawn conditions
}

StructureSpawn.prototype.spawnUpgraderIfNeeded = function() {
  //Spawn conditions
  if (true) {
    let body = this.calcBody('upgrader');
    let newName = 'Upgrader' + Game.time;
    this.spawnCreep(body, newName, {memory: {role:'upgrader',building:false}});
  }
}

StructureSpawn.prototype.spawnBuilderIfNeeded = function() {
  //Spawn conditions
  if (true) {
    let body = this.calcBody('builder');
    let newName = 'Builder' + Game.time;
    this.spawnCreep(body, newName, {memory: {role:'builder',building:false}});
  }
}

StructureSpawn.prototype.spawnRepairerIfNeeded = function() {
  //Spawn conditions
}

StructureSpawn.prototype.spawnWallRepairerIfNeeded = function() {
  //Spawn conditions
}

StructureSpawn.prototype.spawnProtectorIfNeeded = function() {
  //Spawn conditions
}
