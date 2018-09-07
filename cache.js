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

module.exports = cache;
