var creepFactory = {

    /** @param {Creep} creep **/
    run: function() {
      //For every spawn (ToDo)
      let spawn = Game.spawns['Spawn1'];

      //Check if we need to spawn
      if (spawn.spawnHarvesterIfNeeded() == 'NOT NEEDED') {
        spawn.spawnUpgraderIfNeeded();
        spawn.spawnBuilderIfNeeded();
      }
    }
};

module.exports = creepFactory;
