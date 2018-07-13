var autoBuilder = {

    run: function(){
      if (Game.spawns['Spawn1'].room.controller.level == 2) {
        this.spawnExtensions();
      }
    },

    spawnExtensions: function() {
      var x = Game.spawns['Spawn1'].pos.x;
      var y = Game.spawns['Spawn1'].pos.y;
      Game.spawns['Spawn1'].room.createConstructionSite(x, y-2, STRUCTURE_EXTENSION);
      Game.spawns['Spawn1'].room.createConstructionSite(x+1, y-2, STRUCTURE_EXTENSION);
      Game.spawns['Spawn1'].room.createConstructionSite(x-1, y-2, STRUCTURE_EXTENSION);
      Game.spawns['Spawn1'].room.createConstructionSite(x+2, y-1, STRUCTURE_EXTENSION);
      Game.spawns['Spawn1'].room.createConstructionSite(x+-2, y-1, STRUCTURE_EXTENSION);
    }
};

module.exports = autoBuilder;
