var autoBuilder = {

    run: function(){
      if (Game.spawns['Spawn1'].room.controller.level == 1) {

      } else if (Game.spawns['Spawn1'].room.controller.level == 2) {
        this.spawnExtensions('firstFive');
        this.spawnRoad();
      } else if (Game.spawns['Spawn1'].room.controller.level == 3) {
        this.spawnExtensions('secondFive');
      }
    },

    spawnExtensions: function(extensionSet) {
      switch (extensionSet) {
        case 'firstFive':
          var x = Game.spawns['Spawn1'].pos.x;
          var y = Game.spawns['Spawn1'].pos.y;
          Game.spawns['Spawn1'].room.createConstructionSite(x, y-2, STRUCTURE_EXTENSION);
          Game.spawns['Spawn1'].room.createConstructionSite(x+1, y-2, STRUCTURE_EXTENSION);
          Game.spawns['Spawn1'].room.createConstructionSite(x-1, y-2, STRUCTURE_EXTENSION);
          Game.spawns['Spawn1'].room.createConstructionSite(x+2, y-1, STRUCTURE_EXTENSION);
          Game.spawns['Spawn1'].room.createConstructionSite(x+-2, y-1, STRUCTURE_EXTENSION);
          break;
        case 'secondFive':
          var x = Game.spawns['Spawn1'].pos.x;
          var y = Game.spawns['Spawn1'].pos.y;
          Game.spawns['Spawn1'].room.createConstructionSite(x, y+2, STRUCTURE_EXTENSION);
          Game.spawns['Spawn1'].room.createConstructionSite(x+1, y+2, STRUCTURE_EXTENSION);
          Game.spawns['Spawn1'].room.createConstructionSite(x-1, y+2, STRUCTURE_EXTENSION);
          Game.spawns['Spawn1'].room.createConstructionSite(x+2, y+1, STRUCTURE_EXTENSION);
          Game.spawns['Spawn1'].room.createConstructionSite(x+-2, y+1, STRUCTURE_EXTENSION);
          break;
      }
    },

    spawnRoad: function() {
      var x = Game.spawns['Spawn1'].pos.x;
      var y = Game.spawns['Spawn1'].pos.y;
      Game.spawns['Spawn1'].room.createConstructionSite(x+1, y+1, STRUCTURE_ROAD);
    }
};

module.exports = autoBuilder;
