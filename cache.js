var cache = {

  run: function() {
    //Delete unused memory
    for(var i in Memory.creeps) {
      if(!Game.creeps[i]) {
          delete Memory.creeps[i];
      }
    }
  }

};

module.exports = cache;
