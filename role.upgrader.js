const roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {

        // creep.memory.home = Game.spawns['Spawn1'].room.name;


        if (Game.time % 5 === 0) {
            creep.say('⚡');
        }

        if(creep.memory.full && creep.carry.energy === 0) {
            creep.memory.full = false;
            creep.say('🔄 get');
        }
        if(!creep.memory.full && creep.carry.energy === creep.carryCapacity) {
            creep.memory.full = true;
            creep.say('💯');
        }

        //UPGRADE CONTROLLER
        if(creep.memory.full) {
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