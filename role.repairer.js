var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

      //Identification
      creep.say('R');

      if(creep.memory.upgrading && creep.carry.energy == 0) {
          creep.memory.upgrading = false;
          creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
          var targets = creep.room.find(FIND_STRUCTURES, {
             filter: object => object.hits < object.hitsMax
          });
          targets.sort((a,b) => a.hits - b.hits);

          if(targets.length > 0) {
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targets[0]);
            }
          }
        }
        else {
          var containers = creep.room.find(FIND_STRUCTURES, {
            filter: { structureType: (STRUCTURE_CONTAINER || STRUCTURE_EXTENSION) }
          });
          if (containers.length == 0) {
            var sources = creep.room.find(FIND_SOURCES);
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

module.exports = roleRepairer;
