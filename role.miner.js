var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 mine');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity && creep.pos.findInRange(FIND_STRUCTURES, 2).length == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        if (creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 2).length == 0) {
	            creep.room.createConstructionSite(creep.pos, STRUCTURE_CONTAINER);
	        }
	        var container = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 2);
	        if (creep.build(container[0]) == -7) {
	            creep.move(LEFT);
	        }
	    }
	    else {
          var source = Game.getObjectById(creep.memory.source);
          if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
              creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
          }
          if(creep.carry.energy == creep.carryCapacity) {
              var container = creep.pos.findInRange(FIND_STRUCTURES, 2);
              creep.transfer(container[0], RESOURCE_ENERGY, creep.carry.energy);
          }
	    }
	}
};

module.exports = roleMiner;
