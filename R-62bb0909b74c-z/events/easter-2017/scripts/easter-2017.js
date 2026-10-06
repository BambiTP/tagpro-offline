"use strict";

tagpro.ready(function() {
    tagpro.renderer.options.disableViewportScaling = false;

    var stage = tagpro.renderer.stage;
    var container = tagpro.renderer.gameContainer;
    var lastMousePos = { x: 0, y: 0 };
    var gameState = null;
    var eggHolder = null;

    stage.eventMode = "static";

    stage.on("click", function(e) {
        var clickPos = {
            x: (e.data.global.x * (1 / container.scale.x)) - (container.position.x * (1 / container.scale.x)),
            y: (e.data.global.y * (1 / container.scale.y)) - (container.position.y * (1 / container.scale.y)),
        };

        tagpro.socket.emit("click", clickPos);
    });

    stage.mousemove = function(e) {
        lastMousePos.x = e.data.global.x;
        lastMousePos.y = e.data.global.y;
    };

    tagpro.renderer.updateCameraPosition = function (player) {
        if (player.wholePlayerContainer.x !== -1000 && player.wholePlayerContainer.y !== -1000) {
            tagpro.renderer.centerContainerToPoint(player.wholePlayerContainer.x + 19, (10 * 40));
        }
    };

    tagpro.events.register({
        playerControls: function(player, body, velocity, setVelocities) {
            if (gameState !== "play") {
                return;
            }

            setVelocities();
        },
        modifyScoreUI: function($table) {
            $table.find("th, td")
                .hide()
                .filter("[data-column='player'], [data-column='captures'], [data-column='report']").show();
        },
        afterDrawPlayer: function(player) {
            if (!player.sprites.egg) {
                player.sprites.egg = PIXI.Sprite.from("events/easter-2016/images/egg.png");
                player.sprites.egg.width = 23;
                player.sprites.egg.height = 23;
                player.sprites.egg.x = 8;
                player.sprites.egg.y = 8;

                player.wholePlayerContainer.addChild(player.sprites.egg);
            }

            player.sprites.egg.visible = eggHolder === player;
        },
    });

    const eggTeam = PIXI.Sprite.from("events/easter-2016/images/egg.png");

    eggTeam.width = 23 * 1.25;
    eggTeam.height = 23 * 1.25 ;
    eggTeam.anchor.x = 0.5;
    eggTeam.anchor.y = 0.5;
    eggTeam.alpha = 0.75;

    eggTeam.visible = false;

    tagpro.renderer.layers.ui.addChild(eggTeam);

    tagpro.socket.on("eggBall", function(data) {
        gameState = data.state;
        eggHolder = tagpro.players[data.holder];
        updateTeamWithEgg();
    });

    function updateTeamWithEgg() {
        if (!tagpro.ui.sprites["yellowFlagTakenByRed"]) {
            return setTimeout(updateTeamWithEgg.bind(this), 50);
        }

        if (!eggHolder) {
            eggTeam.visible = false;
        }
        else {
            eggTeam.visible = true;

            if (eggHolder.team === 1) {
                const pos = tagpro.ui.sprites["yellowFlagTakenByRed"];
                eggTeam.x = pos.x;
                eggTeam.y = pos.y;
            }
            else {
                const pos = tagpro.ui.sprites["yellowFlagTakenByBlue"];
                eggTeam.x = pos.x;
                eggTeam.y = pos.y;
            }
        }
    }

    const raptorSprites = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(function(i) {
        var raptorSprite = PIXI.Sprite.from("events/easter-2017/images/raptor" + i + ".png");

        raptorSprite.visible = false;

        tagpro.renderer.layers.ui.addChild(raptorSprite);

        return raptorSprite;
    });

    tagpro.renderer.afterDrawBackground = function() {
        const fieldSprite = PIXI.Sprite.from("events/easter-2017/images/field.png");

        fieldSprite.x = 40;
        fieldSprite.y = 40;

        tagpro.renderer.layers.foreground.addChildAt(fieldSprite, 0);
    };

    tagpro.socket.on("boat", function(id) {
        if (tagproConfig.replay && tagpro.replayPaused) // Don't show raptors while seeking
            return;

        var raptorSprite = raptorSprites[id];

        if (raptorSprite.visible) {
            return;
        }

        tagpro.renderer.layers.ui.removeChild(raptorSprite);
        tagpro.renderer.layers.ui.addChild(raptorSprite);

        raptorSprite.x = tagpro.renderer.renderer.width;
        raptorSprite.y = tagpro.renderer.renderer.height - raptorSprite.height;
        raptorSprite.visible = true;

        function moveRaptor() {
            raptorSprite.x -= 5;

            if (raptorSprite.x < -raptorSprite.width) {
                raptorSprite.visible = false;
                return;
            }

            setTimeout(moveRaptor, 1000 / 60);
        }

        moveRaptor();
    });

    tagpro.world.objectCreators["egg"] = function(object, b2World) {
        if (object.rx == undefined || object.ry == undefined || object.lx == undefined || object.ly == undefined || object.a == undefined)
            return;

        var fixDef = new Box2D.Dynamics.b2FixtureDef();
        var bodyDef = new Box2D.Dynamics.b2BodyDef();
        var RADIUS = 0.23 / 2;

        fixDef.density = 2.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.6;
        fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(RADIUS);
        fixDef.filter.categoryBits = 1 << 4;
        fixDef.filter.maskBits = 1 << 3;

        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        bodyDef.linearDamping = 0.75;
        bodyDef.angularDamping = 0.5;

        if (object.sensor) {
            fixDef.isSensor = true;
        }

        var body = b2World.CreateBody(bodyDef);
        var _fixture = body.CreateFixture(fixDef);

        body.SetPosition(new Box2D.Common.Math.b2Vec2(object.rx, object.ry));

        object.x = object.rx * 100;
        object.y = object.ry * 100;

        body.object = object;

        return body;
    };

    tagpro.socket.on("remove-egg", function(id) {
        tagpro.renderer.removeObject(id);
    });

    var oldUpdateMarsball = tagpro.renderer.updateMarsBall.bind(tagpro.updateMarsBall);
    var oldDrawMarsball = tagpro.renderer.drawMarsball.bind(tagpro.renderer);
    var oldcreatePlayerSprite = tagpro.renderer.createPlayerSprite.bind(tagpro.renderer);

    tagpro.renderer.createPlayerSprite = function(player) {
        oldcreatePlayerSprite(player);

        player.wholePlayerContainer.click = function() { }; // Overwrite click for report dialogue
    };

    tagpro.renderer.updateMarsBall = function(object, position) {
        if (object.type == "egg") {
            position.x = position.x + 20;
            position.y = position.y + 20;
        }

        oldUpdateMarsball(object, position);
    };

    tagpro.renderer.drawMarsball = function (object, position) {
        if (object.type == "marsball") {
            return oldDrawMarsball(object, position);
        }

        if (object.type !== "egg") {
            return;
        }

        if (tagpro.spectator) {
            object.draw = true;
        }

        object.sprite = PIXI.Sprite.from("events/easter-2016/images/egg.png");
        object.sprite.position.x = position.x;
        object.sprite.position.y = position.y;
        object.sprite.width = 23;
        object.sprite.height = 23;
        object.sprite.pivot.set(-8, -8);

        tagpro.renderer.layers.foreground.addChild(object.sprite);

        object.sprite.keep = true;
        if (!object.draw) {
            object.sprite.visible = false;
        }
    };

    if (!tagproConfig.replay) {
        $("#chatHistory").css("pointer-events", "none");
        $("<style type='text/css'>canvas{cursor: crosshair !important;}</style>").appendTo("head");
    }

});

