var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

      //Identification
      creep.say('B');

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
  	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {filter: {structureType: STRUCTURE_EXTENSION}});
            if (targets.length == 0) {
              targets = creep.room.find(FIND_CONSTRUCTION_SITES, {filter: {structureType: STRUCTURE_TOWER}});
            } else if (targets.length == 0) {
              targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            }
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
	    }
	    else {
            var containers = creep.room.find(FIND_STRUCTURES, {
              filter: { structureType: (STRUCTURE_CONTAINER || STRUCTURE_EXTENSION) }
            });
            if (containers.length == 0) {
              var sources = creep.room.find(FIND_SOURCES);
              sources[0] = sources[1];
              if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
              }
            } else {
              var sources = containers;
              if(creep.withdraw(sources[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
              }
            }

	    }
	}
};

module.exports = roleBuilder;
