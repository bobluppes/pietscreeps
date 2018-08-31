const roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {

        // creep.memory.home = Game.spawns['Spawn1'].room.name;


        creep.identify();
        creep.fullState();


        //UPGRADE CONTROLLER
        if (creep.memory.full) {
            if(creep.upgradeController(Game.rooms[creep.memory.home].controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms[creep.memory.home].controller, {visualizePathStyle: {stroke: '#ff5400'}});
            }
            // if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            //     creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff5400'}});
            // }
        }
        else {
            // creep.say('u.gE');
            creep.getEnergy(true, false, false);
        }
    }
};

module.exports = roleUpgrader;