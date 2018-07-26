var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {

      //Identification
      creep.say('Haul');

	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});

            if (sources.length == 0) {
              creep.say('Idling');
              var flag = creep.room.find(FIND_FLAGS, {filter: {name: 'IdleLocation'}});
              creep.moveTo(flag[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }

            if (sources[0].store[RESOURCE_ENERGY] == 0) {
              sources[0] = sources[1];
            }

            if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                //Game.spawns['Spawn1'].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHauler;
