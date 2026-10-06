tagpro.events.register({
    gravity: {x: 0, y: 9.8 / 2},
    setPlayerPhysics : function(box2d, bodyDef, fixDef) {
        fixDef.friction = 0.0;
        fixDef.restitution = 0.3;
    },
    setWallPhysics: function(box2d, bodyDef, fixDef) {
        fixDef.friction = 0.0;
        fixDef.restitution = 0.3;
    },
});