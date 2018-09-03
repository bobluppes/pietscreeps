const roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        creep.identify();
        creep.fullState();
        if (creep.memory.full) {
            if (creep.upgradeController(Game.rooms[creep.memory.home].controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms[creep.memory.home].controller, {visualizePathStyle: {stroke: '#ff5400'}});
            }
        }
        else {
            creep.getEnergy(true, false, false);
        }
    }
};

module.exports = roleUpgrader;

//storage = 317,670
//01/09/2018