var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {

      //Identification
      creep.say('M');

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 mine');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity && creep.pos.findInRange(FIND_STRUCTURES, 2, {filter: {structureType: STRUCTURE_CONTAINER}}).length == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        creep.popContainer(creep);
	    }
	    else {
          creep.harvestOwnSource(creep);
	    }
	}
};

module.exports = roleMiner;
