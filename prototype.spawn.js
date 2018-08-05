StructureSpawn.prototype.createMinerCreep =
    function (energy) {

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
        console.log(assignedSource);

        let newName = 'Miner' + Game.time;
        console.log('Spawning new miner: ' + newName);
        // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName,{memory: {role: 'miner'}});
        // Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE],'jezus' ,{memory: {role: 'harvester'}});

        let numberOfParts = Math.min(Math.floor((energy - 50) / 100), 3);
        let body = [];

        //MAX WORK PARTS
        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }
        // 1 MOVE PART
        body.push(MOVE);

        // CREATE CREEP WITH THE CREATED BODY AND THE GIVEN ROLE
        return this.createCreep(body, newName, {role: 'miner', full: false, source: assignedSource});
    };

StructureSpawn.prototype.createHaulerCreep =
    function (energy) {
        let newName = 'Hauler' + Game.time;
        console.log('Spawning new hauler: ' + newName);

        let numberOfParts = Math.min(Math.floor(energy/100), 7);
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
        return this.createCreep(body, newName, {role: 'hauler', full: false});
    };

StructureSpawn.prototype.createBalancedCreep =
    function (energy, roleName) {

        // CREATE A BALANCED BODY AS BIG AS POSSIBLE WITH THE GIVEN ENERGY
        let newName = 'B' + roleName + Game.time;
        console.log('Spawning balanced: ' + newName);
        let numberOfParts = Math.min(Math.floor(energy / 200), 5);
        let body = [];
        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < 2 * numberOfParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < 2 * numberOfParts; i++) {
            body.push(MOVE);
        }
        // CREATE CREEP WITH THE CREATED BODY AND THE GIVEN ROLE
        return this.createCreep(body, newName, { role: roleName, full: false, home: this.room.name });
    };

//BOBSHITE

StructureSpawn.prototype.getPopulation = function(role) {
  switch (role) {
    case 'harvesters': return _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;break;
    case 'remoteHarvesters': return _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester').length;break;
    case 'miners': return _.filter(Game.creeps, (creep) => creep.memory.role == 'miner').length;break;
    case 'haulers': return _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler').length;break;
    case 'upgraders': return _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;break;
    case 'builders': return _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;break;
    case 'repairers': return _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer').length;break;
    case 'wallers': return _.filter(Game.creeps, (creep) => creep.memory.role == 'waller').length;break;
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
    body.push(WORK); // niet gewoon 1 van elke part in het begin? meer creeps meer beter
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
    case 'waller':
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
  if (this.getPopulation('upgraders') < 2) {
    let body = this.calcBody('upgrader');
    let newName = 'Upgrader' + Game.time;
    this.spawnCreep(body, newName, {memory: {role:'upgrader',building:false}});
    return 1;
  }
  return 'NOT NEEDED';
}

StructureSpawn.prototype.spawnBuilderIfNeeded = function() {
  //Spawn conditions
  if (this.getPopulation('builders') < 2) {
    let body = this.calcBody('builder');
    let newName = 'Builder' + Game.time;
    this.spawnCreep(body, newName, {memory: {role:'builder',building:false}});
    return 1;
  }
  return 'NOT NEEDED';
}

StructureSpawn.prototype.spawnRepairerIfNeeded = function() {
  //Spawn conditions
}

StructureSpawn.prototype.spawnWallerIfNeeded = function() {
  //Spawn conditions
}

StructureSpawn.prototype.spawnProtectorIfNeeded = function() {
  //Spawn conditions
}
