/** @function
 @param {boolean} useStorage
 @param {boolean} useContainer
 @param {boolean} useSource */
Creep.prototype.getEnergy =
    function (useStorage, useContainer, useSource) {

        let storage = false;
        let container = false;
        let source = false;

        if (useStorage) {
            //console.log('YEET:::: ' + this.memory.storage);
            if (this.memory.storage) {
                if (this.withdraw(Game.getObjectById(this.memory.target), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    this.moveTo(Game.getObjectById(this.memory.target), {visualizePathStyle: {stroke: '#0bff00'}});
                } else if (this.withdraw(Game.getObjectById(this.memory.target), RESOURCE_ENERGY) === ERR_NOT_ENOUGH_RESOURCES) {
                    this.clearTargets();
                }
            } else {
                storage = this.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => ( s.structureType === STRUCTURE_STORAGE
                        && s.store[RESOURCE_ENERGY] > 0)
                });
                if (storage) {
                    this.memory.storage = this.memory.target = storage.id;
                }
            }
            // console.log('gE.' + this.memory.role + ':' + storage);
        }
        if (useContainer && !this.memory.storage) {
            if (this.memory.container) {
                if (this.withdraw(Game.getObjectById(this.memory.target), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    this.moveTo(Game.getObjectById(this.memory.target), {visualizePathStyle: {stroke: '#0bff00'}});
                } else if (this.withdraw(Game.getObjectById(this.memory.target), RESOURCE_ENERGY) === ERR_NOT_ENOUGH_RESOURCES) {
                    this.clearTargets();
                }
            } else {
                switch (this.memory.role) {
                    case 'hauler':
                        container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: s => (s.structureType === STRUCTURE_CONTAINER
                                && s.store[RESOURCE_ENERGY] > this.carryCapacity)
                        });
                        //this.say('hauler');
                        break;
                    default:
                        container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: s => (s.structureType === STRUCTURE_CONTAINER
                                && s.store[RESOURCE_ENERGY] > 0)
                        });
                        // this.say('def');
                        break;
                }
                if (container) {
                    this.memory.container = this.memory.target = container.id;
                }
            }
            // console.log('gE.' + this.memory.role + ':' + container);
        }
        //FINALLY SOURCES
        if (useSource && !this.memory.container && !this.memory.storage) {
            if (this.memory.source) {
                if (this.harvest(Game.getObjectById(this.memory.target)) === ERR_NOT_IN_RANGE) {
                    this.moveTo(Game.getObjectById(this.memory.target), {visualizePathStyle: {stroke: '#00ff23'}});
                } else if (this.harvest(Game.getObjectById(this.memory.target)) === ERR_NOT_ENOUGH_RESOURCES) {
                    this.clearTargets();
                }
            } else {
                source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
                if (source) {
                    this.memory.source = this.memory.target = source.id;
                }
            }
            // console.log('getEnergy source: ' + source);
        }
        //console.log(this.name + ' gets E from: ' + Game.getObjectById(this.memory.target));
        //console.log('source:' + this.memory.source + ' | container: ' + this.memory.container + ' | storage: ' + this.memory.storage);
    };

/** @function
 */
Creep.prototype.clearTargets =
    function () {
        this.memory.target = false;
        delete this.memory.storage;
        delete this.memory.container;
        delete this.memory.source;

        delete  this.memory.buildTarget;
        //delete  this.memory.harvestTarget;
        delete  this.memory.haulTarget;
        delete  this.memory.repairTarget;
        delete  this.memory.wallTarget;
    };

/** @function
 @param {string} structureType
 */
Creep.prototype.structureTypeAvgHits =
    function (structureType) {

        let hitsTot = 0;
        let structures = this.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType === structureType)
        });
        // console.log('found ' + structures);
        for(let structure in structures) {
            // console.log('la ' + structures[structure].hits);
            hitsTot += structures[structure].hits
        }
        return hitsTot/structures.length
    };

Creep.prototype.fullState =
    function () {
        if (this.memory.full && this.carry.energy === 0) {
            this.memory.full = false;
            this.clearTargets();
            this.say('🔄');
        }
        if (!this.memory.full && this.carry.energy === this.carryCapacity) {
            this.memory.full = true;
            this.clearTargets();
            this.say('💯');
        }
    };


Creep.prototype.identify =
    function () {
        if (Game.time % 5 === 0) {
            switch (this.memory.role) {
                case 'builder':
                    this.say('🔨');
                    break;
                case 'harvester':
                    this.say('🌾');
                    break;
                case 'hauler':
                    this.say('🚛');
                    break;
                case 'miner':
                    this.say('⛏');
                    break;
                case 'remoteHarvester':
                    this.say('🚛 🌾');
                    break;
                case 'repairer':
                    this.say('🔧️');
                    break;
                case 'upgrader':
                    this.say('⚡');
                    break;
                case 'waller':
                    this.say('🛡️');
                    break;
            }
        }
    };


// BOBSHITE

//Harvest the source with the source id saved in memory
//Creep -> memory -> source -> [#id]
//When full, drop all energy into nearby container
Creep.prototype.harvestOwnSource = function(creep) {
    //Find source object from id in creep memory
    let source = Game.getObjectById(creep.memory.source);

    //Harvest source or move to it if not in range
    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
    //Dump energy into nearby container (will not move)
    if(creep.carry.energy == creep.carryCapacity) {
        var container = creep.pos.findInRange(FIND_STRUCTURES, 2, {
          filter: { structureType: STRUCTURE_CONTAINER }
        });
        creep.transfer(container[0], RESOURCE_ENERGY, creep.carry.energy);
    }
}

//Pop a container next to the source to dump energy
//HEB HIER MET CAS EVEN AAN ZITTEN KLOOIEN MAAR BEETJE VAAG
Creep.prototype.popContainer = function(creep) {
  if (creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 2, {filter: {structureType: STRUCTURE_CONTAINER}}).length == 0) {
      if (creep.room.createConstructionSite(creep.pos, STRUCTURE_CONTAINER) === ERR_INVALID_TARGET) {
        let obstruction = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 1);
        if (obstruction.length == 0) {
          obstruction = creep.pos.findInRange(FIND_STRUCTURES, 1);
        }
        obstruction[0].destroy();
      }
  }
  let container = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 2, {filter: {structureType: STRUCTURE_CONTAINER}});
  if (creep.build(container[0]) == -7) {
      creep.move(LEFT);
  }
};

//Harvest any given source object
Creep.prototype.harvestSource = function(creep, source) {

}

Creep.prototype.transferTarget = function(creep) {
  if (creep.transfer(creep.memory.target) == ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.memory.target, {visualizePathStyle: {stroke: '#ffaa00'}});
  }
  creep.memory.target = NULL;
}

//----------
//TARGETING
//----------

Creep.prototype.targetTower = function(creep) {
  let towers = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
  towers.sort(function (a, b) {return a.energy - b.energy});
  creep.memory.target = towers[0];
}
