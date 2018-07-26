var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

      //Identification
      creep.say('U');

      if(creep.memory.upgrading && creep.carry.energy == 0) {
          creep.memory.upgrading = false;
          creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	     if(creep.memory.upgrading) {
          if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
              Game.spawns['Spawn1'].room.createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
          }
        } else {
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
            if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
          }


        }
	}
};

module.exports = roleUpgrader;