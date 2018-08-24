/** @function
 @param {boolean} useStorage
 @param {boolean} useContainer
 @param {boolean} useSource */
Creep.prototype.getEnergy =
    function (useStorage, useContainer, useSource) {
        /** @type {StructureContainer} */
        let container;
        let storage;
        if (useStorage) {
            storage = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => ( s.structureType === STRUCTURE_STORAGE
                    && s.store[RESOURCE_ENERGY] > 0)
            });

            if (storage !== undefined) {
                if (this.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    this.moveTo(storage, {visualizePathStyle: {stroke: '#0bff00'}});
                }
            }
        }
        if (storage == undefined && useContainer) {
            switch (this.memory.role) {
                case 'hauler':
                    container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => (s.structureType === STRUCTURE_CONTAINER
                            && s.store[RESOURCE_ENERGY] > 600)
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
            // console.log('gE.' + this.memory.role + ':' + container);
            if (container !== undefined) {
                if (this.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    this.moveTo(container, {visualizePathStyle: {stroke: '#0bff00'}});
                }
            }
        }
        //FINALLY SOURCES
        if (container == undefined && useSource) {
            let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // console.log('getEnergy source: ' + source);
            if (this.harvest(source) === ERR_NOT_IN_RANGE) {
                this.moveTo(source, {visualizePathStyle: {stroke: '#00ff23'}});
            }
        }
    };

/** @function
 @param {string} structureType
 */
Creep.prototype.avgHits =
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


Creep.prototype.identify =
    function () {
        if (Game.time % 5 === 0) {
            creep.say(creep.memory.roleName);
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
