//noob code die ik online gevonden heb om onze remote unit op te basen

const roleRemoteHarvester = {

	/** @param {Creep} creep */
	run: function(creep) {
		creep.memory.home = Game.spawns['Spawn1'].room.name;

		let flag = Game.flags['remoteHarvest1'];
		if (flag && !creep.memory.targetFlag) {
			creep.memory.targetFlag = flag.name;
		}
		creep.identify();
		creep.fullState();

		if (creep.memory.full) {
			// Go back to home room & store energy
			if (creep.room.name === creep.memory.home) {
				let structure = creep.room.storage;
				if (structure && creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
					creep.moveTo(structure);
				}
			} else {
				// find exit to home room
				let exit = creep.room.findExitTo(creep.memory.home);
				creep.moveTo(creep.pos.findClosestByRange(exit));
			}
		} else {
			let targetFlag = Game.flags[creep.memory.targetFlag];
			if (targetFlag) {
				if (creep.room !== targetFlag.room) {
					creep.moveTo(targetFlag);
				} else {
					creep.getEnergy(false, false);
				}
			}
		}
	}
};
module.exports = roleRemoteHarvester;
