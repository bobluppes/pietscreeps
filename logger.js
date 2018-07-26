var logger = {

    /** @param {Creep} creep **/
    run: function(miners) {

      //Retrieve amount of creeps per role
      var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
      var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
      var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
      var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
      var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
      var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

      //Energy data
      var energyAvailable = Game.spawns['Spawn1'].room.energyAvailable;
      var energyCap = Game.spawns['Spawn1'].room.energyCapacityAvailable;


      console.log("Har: " + harvesters.length + " | Min: " + miners.length + " | Hau: " + haulers.length);
      console.log("Upg: " + upgraders.length + " | Bui: " + builders.length + " | Rep: " + repairers.length);
      console.log("Energy: " + energyAvailable + "/" + energyCap);

      //Test


    }
};

module.exports = logger;
