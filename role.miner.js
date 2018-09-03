const roleMiner = {
    /** @param {Creep} creep **/
    run: function (creep) {

        creep.identify();
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

module.exports = roleMiner;
