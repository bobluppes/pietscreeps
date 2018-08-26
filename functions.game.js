global.test = function (a) {
    console.log('test: ' + a)
};

global.draaiOm = function(lijst) {
    return lijst.reverse()
};

global.prioritize = function (targets) {
    targets.sort(function (a, b) {
        return a.priority - b.priority
    });
    targets = _.filter(targets, (t) => t.structureType === targets[0].structureType);
    return targets
};