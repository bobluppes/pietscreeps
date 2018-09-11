var cache = {
	run: function() {
	//DELETE UNUSED MEMORY
	for (let i in Memory.creeps) {
		if(!Game.creeps[i]) {
			delete Memory.creeps[i];
			// console.log('Clearing non-existing creep memory:', name);
		}
	}
	}
};


Object.defineProperty(Structure.prototype, 'memory', {
  configurable: true,
  get: function() {
    if (_.isUndefined(Memory.myStructuresMemory)) {
      Memory.myStructuresMemory = {};
    }
    if (!_.isObject(Memory.myStructuresMemory)) {
      return undefined;
    }
    return Memory.myStructuresMemory[this.id] = Memory.myStructuresMemory[this.id] || {};
  },
  set: function(value) {
    if(_.isUndefined(Memory.myStructuresMemory)) {
      Memory.myStructuresMemory = {};
    }
    if(!_.isObject(Memory.myStructuresMemory)) {
      throw new Error('Could not set source memory');
    }
    Memory.myStructuresMemory[this.id] = value;
  }
});

module.exports = cache;