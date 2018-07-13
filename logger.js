var logger = {

    /** @param {Creep} creep **/
    run: function(miners) {

        //Retrieve amount of creeps per role
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

        console.log("Miners: " + miners.length);
        console.log("Energy: " + Game.spawns['Spawn1'].room.energyAvailable + "/" + Game.spawns['Spawn1'].room.energyCapacityAvailable);

    }
};

module.exports = logger;
