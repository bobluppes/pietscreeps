const roleMiner = {
    /** @param {Creep} creep **/
    run: function (creep) {

        // GET SOURCE
        // let source = Game.getObjectById('59f1a6b082100e1594f40664');
        // console.log(creep.memory.source);
        let source = Game.getObjectById(creep.memory.source);
        // console.log(source);
        let container;
        // find container next to source
        let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType === STRUCTURE_CONTAINER
        });
        if (containers.length == 0) {
            container = source.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
                filter: s => s.structureType === STRUCTURE_CONTAINER
            })[0];
        } else {
            container = containers[0];
        }

        // if creep is on top of the container
        if (creep.pos.isEqualTo(container.pos)) { //gaat bad als er geen container is
            // harvest source
            creep.harvest(source);
        }
        // if creep is not on top of the container
        else {
            // move towards it
            creep.moveTo(container);
        }
    }
};


//Jouw miner methods gebruiken transfer terwijl onze miners geen carry parts hebben en dus niet kunnen transferren
//andere bug was dat ze op random plekken in de kamer containers gingen bouwen


// var roleMiner = {
//
//     /** @param {Creep} creep **/
//     run: function(creep) {
//
//       //Identification
//       creep.say('M');
//
// 	    if(creep.memory.building && creep.carry.energy === 0) {
//             creep.memory.building = false;
//             creep.say('🔄 mine');
// 	    }
// 	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity && creep.pos.findInRange(FIND_STRUCTURES, 2, {filter: {structureType: STRUCTURE_CONTAINER}}).length == 0) {
// 	        creep.memory.building = true;
// 	        creep.say('🚧 build');
// 	    }
//
// 	    if(creep.memory.building) {
// 	        creep.popContainer(creep);
// 	    }
// 	    else {
//           creep.harvestOwnSource(creep);
// 	    }
// 	}
// };

module.exports = roleMiner;
