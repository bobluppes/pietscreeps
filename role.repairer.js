const roleUpgrader = require('role.upgrader');

//SETTINGS: HP FALLS BELOW X FROM MAX TO START REPAIRS
let roadHP = 1000;
let containerHP = 1000;


const roleRepairer = {
    /** @param {Creep} creep **/
    run:function(creep) {
        creep.clearGetEnergyTargets();
        //IDENTIFICATION
        if (Game.time % 5 === 0) {
            creep.say('🔧️');
        }

        if (creep.memory.full && creep.carry.energy === 0) {
            creep.memory.full = false;
            creep.clearGetEnergyTargets();
            creep.say('🔄 get');
        }
        if (!creep.memory.full && creep.carry.energy === creep.carryCapacity) {
            creep.memory.full = true;
            creep.clearGetEnergyTargets();
            creep.say('💯');
        }

        if (creep.memory.target && creep.memory.full) {
            console.log('REP:::: ' + Game.getObjectById(creep.memory.target));
            if (creep.repair(creep.memory.target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else if (!creep.memory.target && creep.memory.full) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (
                        ((s.structureType === 'container' || s.structureType === 'storage') && s.hitsMax - s.hits > containerHP)
                        || (s.structureType === 'road' && s.hitsMax - s.hits > roadHP)
                        || (s.structureType === 'rampart' && creep.avgHits(STRUCTURE_RAMPART) - s.hits > 2000)
                        || (s.structureType === 'constructedWall' && s.hits < creep.avgHits(STRUCTURE_WALL))
                    )   // DIT FILTER MOET ONDERSCHEID MAKEN TUSSEN CONTAINERS, WALL en RAMPARTS VOOR HOEVEEL HITS HIJ GEREPT MOET WORDEN
                }
            });
            if (targets.length) {
                for (let i = 0; i < targets.length; i++) {
                    switch (targets[i].structureType) {
                        case 'container':
                            targets[i].priority = 1;
                            break;
                        case 'storage':
                            targets[i].priority = 2;
                            break;
                        case 'road':
                            targets[i].priority = 3;
                            break;
                        case 'rampart':
                            targets[i].priority = 4;
                            break;
                        case 'constructedWall':
                            targets[i].priority = 5;
                            break;
                        default:
                            targets[i].priority = 6;
                            break;
                    }
                    // console.log(creep.name + ' target: ' + targets[i] + ' | type: ' + targets[i].structureType + ' | priority: ' + targets[i].priority);
                }
                targets.sort(function (a, b) {
                    return a.priority - b.priority
                });
                // console.log('beep' + targets);

                //FIND CLOSEST INSTANCE OF HIGHEST PRIORITY STRUCTURETYPE (vaag als targets maar 1 object heeft)
                targets = _.filter(targets, (t) => t.structureType === targets[0].structureType);
                let target = creep.pos.findClosestByPath(targets);
                if (!target) {
                    target = targets[0];
                }
                //console.log('target: ' + target + ' | targets: ' + targets);
                creep.memory.target = target.id;
            } else {
                roleUpgrader.run(creep);
                // creep.say('upg.rol');
            }
        } else {
            // creep.say('+.gE');
            creep.getEnergy(true, true, true);
        }
    }
};

module.exports = roleRepairer;