// Box2DWeb exactly as bundled in the official TagPro client (global-game.js), extracted by tools/.
(function () {
var Box2D = {};
! function(t, e) {
    function i() {}!Object.defineProperty && Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function && (Object.defineProperty = function(t, e, i) {
        i.get instanceof Function && t.__defineGetter__(e, i.get), i.set instanceof Function && t.__defineSetter__(e, i.set)
    }), t.inherit = function(t, e) {
        var r = t;
        i.prototype = e.prototype, t.prototype = new i, t.prototype.constructor = r
    }, t.generateCallback = function(t, e) {
        return function() {
            e.apply(t, arguments)
        }
    }, t.NVector = function(t) {
        t === e && (t = 0);
        for (var i = new Array(t || 0), r = 0; r < t; ++r) i[r] = 0;
        return i
    }, t.is = function(t, i) {
        return null !== t && (i instanceof Function && t instanceof i || !(t.constructor.__implements == e || !t.constructor.__implements[i]))
    }, t.parseUInt = function(t) {
        return Math.abs(parseInt(t))
    }
}(Box2D);
var Vector = Array,
    Vector_a2j_Number = Box2D.NVector,
    i;
for (void 0 === Box2D && (Box2D = {}), void 0 === Box2D.Collision && (Box2D.Collision = {}), void 0 === Box2D.Collision.Shapes && (Box2D.Collision.Shapes = {}), void 0 === Box2D.Common && (Box2D.Common = {}), void 0 === Box2D.Common.Math && (Box2D.Common.Math = {}), void 0 === Box2D.Dynamics && (Box2D.Dynamics = {}), void 0 === Box2D.Dynamics.Contacts && (Box2D.Dynamics.Contacts = {}), void 0 === Box2D.Dynamics.Controllers && (Box2D.Dynamics.Controllers = {}), void 0 === Box2D.Dynamics.Joints && (Box2D.Dynamics.Joints = {}), Box2D.Collision.IBroadPhase = "Box2D.Collision.IBroadPhase", Box2D.Collision.b2AABB = function t() {
        t.b2AABB.apply(this, arguments)
    }, Box2D.Collision.b2Bound = function t() {
        t.b2Bound.apply(this, arguments)
    }, Box2D.Collision.b2BoundValues = function t() {
        t.b2BoundValues.apply(this, arguments), this.constructor === t && this.b2BoundValues.apply(this, arguments)
    }, Box2D.Collision.b2Collision = function t() {
        t.b2Collision.apply(this, arguments)
    }, Box2D.Collision.b2ContactID = function t() {
        t.b2ContactID.apply(this, arguments), this.constructor === t && this.b2ContactID.apply(this, arguments)
    }, Box2D.Collision.b2ContactPoint = function t() {
        t.b2ContactPoint.apply(this, arguments)
    }, Box2D.Collision.b2Distance = function t() {
        t.b2Distance.apply(this, arguments)
    }, Box2D.Collision.b2DistanceInput = function t() {
        t.b2DistanceInput.apply(this, arguments)
    }, Box2D.Collision.b2DistanceOutput = function t() {
        t.b2DistanceOutput.apply(this, arguments)
    }, Box2D.Collision.b2DistanceProxy = function t() {
        t.b2DistanceProxy.apply(this, arguments)
    }, Box2D.Collision.b2DynamicTree = function t() {
        t.b2DynamicTree.apply(this, arguments), this.constructor === t && this.b2DynamicTree.apply(this, arguments)
    }, Box2D.Collision.b2DynamicTreeBroadPhase = function t() {
        t.b2DynamicTreeBroadPhase.apply(this, arguments)
    }, Box2D.Collision.b2DynamicTreeNode = function t() {
        t.b2DynamicTreeNode.apply(this, arguments)
    }, Box2D.Collision.b2DynamicTreePair = function t() {
        t.b2DynamicTreePair.apply(this, arguments)
    }, Box2D.Collision.b2Manifold = function t() {
        t.b2Manifold.apply(this, arguments), this.constructor === t && this.b2Manifold.apply(this, arguments)
    }, Box2D.Collision.b2ManifoldPoint = function t() {
        t.b2ManifoldPoint.apply(this, arguments), this.constructor === t && this.b2ManifoldPoint.apply(this, arguments)
    }, Box2D.Collision.b2Point = function t() {
        t.b2Point.apply(this, arguments)
    }, Box2D.Collision.b2RayCastInput = function t() {
        t.b2RayCastInput.apply(this, arguments), this.constructor === t && this.b2RayCastInput.apply(this, arguments)
    }, Box2D.Collision.b2RayCastOutput = function t() {
        t.b2RayCastOutput.apply(this, arguments)
    }, Box2D.Collision.b2Segment = function t() {
        t.b2Segment.apply(this, arguments)
    }, Box2D.Collision.b2SeparationFunction = function t() {
        t.b2SeparationFunction.apply(this, arguments)
    }, Box2D.Collision.b2Simplex = function t() {
        t.b2Simplex.apply(this, arguments), this.constructor === t && this.b2Simplex.apply(this, arguments)
    }, Box2D.Collision.b2SimplexCache = function t() {
        t.b2SimplexCache.apply(this, arguments)
    }, Box2D.Collision.b2SimplexVertex = function t() {
        t.b2SimplexVertex.apply(this, arguments)
    }, Box2D.Collision.b2TimeOfImpact = function t() {
        t.b2TimeOfImpact.apply(this, arguments)
    }, Box2D.Collision.b2TOIInput = function t() {
        t.b2TOIInput.apply(this, arguments)
    }, Box2D.Collision.b2WorldManifold = function t() {
        t.b2WorldManifold.apply(this, arguments), this.constructor === t && this.b2WorldManifold.apply(this, arguments)
    }, Box2D.Collision.ClipVertex = function t() {
        t.ClipVertex.apply(this, arguments)
    }, Box2D.Collision.Features = function t() {
        t.Features.apply(this, arguments)
    }, Box2D.Collision.Shapes.b2CircleShape = function t() {
        t.b2CircleShape.apply(this, arguments), this.constructor === t && this.b2CircleShape.apply(this, arguments)
    }, Box2D.Collision.Shapes.b2EdgeChainDef = function t() {
        t.b2EdgeChainDef.apply(this, arguments), this.constructor === t && this.b2EdgeChainDef.apply(this, arguments)
    }, Box2D.Collision.Shapes.b2EdgeShape = function t() {
        t.b2EdgeShape.apply(this, arguments), this.constructor === t && this.b2EdgeShape.apply(this, arguments)
    }, Box2D.Collision.Shapes.b2MassData = function t() {
        t.b2MassData.apply(this, arguments)
    }, Box2D.Collision.Shapes.b2PolygonShape = function t() {
        t.b2PolygonShape.apply(this, arguments), this.constructor === t && this.b2PolygonShape.apply(this, arguments)
    }, Box2D.Collision.Shapes.b2Shape = function t() {
        t.b2Shape.apply(this, arguments), this.constructor === t && this.b2Shape.apply(this, arguments)
    }, Box2D.Common.b2internal = "Box2D.Common.b2internal", Box2D.Common.b2Color = function t() {
        t.b2Color.apply(this, arguments), this.constructor === t && this.b2Color.apply(this, arguments)
    }, Box2D.Common.b2Settings = function t() {
        t.b2Settings.apply(this, arguments)
    }, Box2D.Common.Math.b2Mat22 = function t() {
        t.b2Mat22.apply(this, arguments), this.constructor === t && this.b2Mat22.apply(this, arguments)
    }, Box2D.Common.Math.b2Mat33 = function t() {
        t.b2Mat33.apply(this, arguments), this.constructor === t && this.b2Mat33.apply(this, arguments)
    }, Box2D.Common.Math.b2Math = function t() {
        t.b2Math.apply(this, arguments)
    }, Box2D.Common.Math.b2Sweep = function t() {
        t.b2Sweep.apply(this, arguments)
    }, Box2D.Common.Math.b2Transform = function t() {
        t.b2Transform.apply(this, arguments), this.constructor === t && this.b2Transform.apply(this, arguments)
    }, Box2D.Common.Math.b2Vec2 = function t() {
        t.b2Vec2.apply(this, arguments), this.constructor === t && this.b2Vec2.apply(this, arguments)
    }, Box2D.Common.Math.b2Vec3 = function t() {
        t.b2Vec3.apply(this, arguments), this.constructor === t && this.b2Vec3.apply(this, arguments)
    }, Box2D.Dynamics.b2Body = function t() {
        t.b2Body.apply(this, arguments), this.constructor === t && this.b2Body.apply(this, arguments)
    }, Box2D.Dynamics.b2BodyDef = function t() {
        t.b2BodyDef.apply(this, arguments), this.constructor === t && this.b2BodyDef.apply(this, arguments)
    }, Box2D.Dynamics.b2ContactFilter = function t() {
        t.b2ContactFilter.apply(this, arguments)
    }, Box2D.Dynamics.b2ContactImpulse = function t() {
        t.b2ContactImpulse.apply(this, arguments)
    }, Box2D.Dynamics.b2ContactListener = function t() {
        t.b2ContactListener.apply(this, arguments)
    }, Box2D.Dynamics.b2ContactManager = function t() {
        t.b2ContactManager.apply(this, arguments), this.constructor === t && this.b2ContactManager.apply(this, arguments)
    }, Box2D.Dynamics.b2DebugDraw = function t() {
        t.b2DebugDraw.apply(this, arguments), this.constructor === t && this.b2DebugDraw.apply(this, arguments)
    }, Box2D.Dynamics.b2DestructionListener = function t() {
        t.b2DestructionListener.apply(this, arguments)
    }, Box2D.Dynamics.b2FilterData = function t() {
        t.b2FilterData.apply(this, arguments)
    }, Box2D.Dynamics.b2Fixture = function t() {
        t.b2Fixture.apply(this, arguments), this.constructor === t && this.b2Fixture.apply(this, arguments)
    }, Box2D.Dynamics.b2FixtureDef = function t() {
        t.b2FixtureDef.apply(this, arguments), this.constructor === t && this.b2FixtureDef.apply(this, arguments)
    }, Box2D.Dynamics.b2Island = function t() {
        t.b2Island.apply(this, arguments), this.constructor === t && this.b2Island.apply(this, arguments)
    }, Box2D.Dynamics.b2TimeStep = function t() {
        t.b2TimeStep.apply(this, arguments)
    }, Box2D.Dynamics.b2World = function t() {
        t.b2World.apply(this, arguments), this.constructor === t && this.b2World.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2CircleContact = function t() {
        t.b2CircleContact.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2Contact = function t() {
        t.b2Contact.apply(this, arguments), this.constructor === t && this.b2Contact.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2ContactConstraint = function t() {
        t.b2ContactConstraint.apply(this, arguments), this.constructor === t && this.b2ContactConstraint.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2ContactConstraintPoint = function t() {
        t.b2ContactConstraintPoint.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2ContactEdge = function t() {
        t.b2ContactEdge.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2ContactFactory = function t() {
        t.b2ContactFactory.apply(this, arguments), this.constructor === t && this.b2ContactFactory.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2ContactRegister = function t() {
        t.b2ContactRegister.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2ContactResult = function t() {
        t.b2ContactResult.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2ContactSolver = function t() {
        t.b2ContactSolver.apply(this, arguments), this.constructor === t && this.b2ContactSolver.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2EdgeAndCircleContact = function t() {
        t.b2EdgeAndCircleContact.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2NullContact = function t() {
        t.b2NullContact.apply(this, arguments), this.constructor === t && this.b2NullContact.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2PolyAndCircleContact = function t() {
        t.b2PolyAndCircleContact.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = function t() {
        t.b2PolyAndEdgeContact.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2PolygonContact = function t() {
        t.b2PolygonContact.apply(this, arguments)
    }, Box2D.Dynamics.Contacts.b2PositionSolverManifold = function t() {
        t.b2PositionSolverManifold.apply(this, arguments), this.constructor === t && this.b2PositionSolverManifold.apply(this, arguments)
    }, Box2D.Dynamics.Controllers.b2BuoyancyController = function t() {
        t.b2BuoyancyController.apply(this, arguments)
    }, Box2D.Dynamics.Controllers.b2ConstantAccelController = function t() {
        t.b2ConstantAccelController.apply(this, arguments)
    }, Box2D.Dynamics.Controllers.b2ConstantForceController = function t() {
        t.b2ConstantForceController.apply(this, arguments)
    }, Box2D.Dynamics.Controllers.b2Controller = function t() {
        t.b2Controller.apply(this, arguments)
    }, Box2D.Dynamics.Controllers.b2ControllerEdge = function t() {
        t.b2ControllerEdge.apply(this, arguments)
    }, Box2D.Dynamics.Controllers.b2GravityController = function t() {
        t.b2GravityController.apply(this, arguments)
    }, Box2D.Dynamics.Controllers.b2TensorDampingController = function t() {
        t.b2TensorDampingController.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2DistanceJoint = function t() {
        t.b2DistanceJoint.apply(this, arguments), this.constructor === t && this.b2DistanceJoint.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2DistanceJointDef = function t() {
        t.b2DistanceJointDef.apply(this, arguments), this.constructor === t && this.b2DistanceJointDef.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2FrictionJoint = function t() {
        t.b2FrictionJoint.apply(this, arguments), this.constructor === t && this.b2FrictionJoint.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2FrictionJointDef = function t() {
        t.b2FrictionJointDef.apply(this, arguments), this.constructor === t && this.b2FrictionJointDef.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2GearJoint = function t() {
        t.b2GearJoint.apply(this, arguments), this.constructor === t && this.b2GearJoint.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2GearJointDef = function t() {
        t.b2GearJointDef.apply(this, arguments), this.constructor === t && this.b2GearJointDef.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2Jacobian = function t() {
        t.b2Jacobian.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2Joint = function t() {
        t.b2Joint.apply(this, arguments), this.constructor === t && this.b2Joint.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2JointDef = function t() {
        t.b2JointDef.apply(this, arguments), this.constructor === t && this.b2JointDef.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2JointEdge = function t() {
        t.b2JointEdge.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2LineJoint = function t() {
        t.b2LineJoint.apply(this, arguments), this.constructor === t && this.b2LineJoint.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2LineJointDef = function t() {
        t.b2LineJointDef.apply(this, arguments), this.constructor === t && this.b2LineJointDef.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2MouseJoint = function t() {
        t.b2MouseJoint.apply(this, arguments), this.constructor === t && this.b2MouseJoint.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2MouseJointDef = function t() {
        t.b2MouseJointDef.apply(this, arguments), this.constructor === t && this.b2MouseJointDef.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2PrismaticJoint = function t() {
        t.b2PrismaticJoint.apply(this, arguments), this.constructor === t && this.b2PrismaticJoint.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2PrismaticJointDef = function t() {
        t.b2PrismaticJointDef.apply(this, arguments), this.constructor === t && this.b2PrismaticJointDef.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2PulleyJoint = function t() {
        t.b2PulleyJoint.apply(this, arguments), this.constructor === t && this.b2PulleyJoint.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2PulleyJointDef = function t() {
        t.b2PulleyJointDef.apply(this, arguments), this.constructor === t && this.b2PulleyJointDef.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2RevoluteJoint = function t() {
        t.b2RevoluteJoint.apply(this, arguments), this.constructor === t && this.b2RevoluteJoint.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2RevoluteJointDef = function t() {
        t.b2RevoluteJointDef.apply(this, arguments), this.constructor === t && this.b2RevoluteJointDef.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2WeldJoint = function t() {
        t.b2WeldJoint.apply(this, arguments), this.constructor === t && this.b2WeldJoint.apply(this, arguments)
    }, Box2D.Dynamics.Joints.b2WeldJointDef = function t() {
        t.b2WeldJointDef.apply(this, arguments), this.constructor === t && this.b2WeldJointDef.apply(this, arguments)
    }, Box2D.postDefs = [], function() {
        var t = Box2D.Collision.Shapes.b2CircleShape,
            e = (Box2D.Collision.Shapes.b2EdgeChainDef, Box2D.Collision.Shapes.b2EdgeShape, Box2D.Collision.Shapes.b2MassData, Box2D.Collision.Shapes.b2PolygonShape),
            i = Box2D.Collision.Shapes.b2Shape,
            r = (Box2D.Common.b2Color, Box2D.Common.b2internal, Box2D.Common.b2Settings),
            n = (Box2D.Common.Math.b2Mat22, Box2D.Common.Math.b2Mat33, Box2D.Common.Math.b2Math),
            s = Box2D.Common.Math.b2Sweep,
            o = Box2D.Common.Math.b2Transform,
            a = Box2D.Common.Math.b2Vec2,
            l = (Box2D.Common.Math.b2Vec3, Box2D.Collision.b2AABB),
            h = Box2D.Collision.b2Bound,
            c = Box2D.Collision.b2BoundValues,
            u = Box2D.Collision.b2Collision,
            d = Box2D.Collision.b2ContactID,
            p = Box2D.Collision.b2ContactPoint,
            m = Box2D.Collision.b2Distance,
            f = Box2D.Collision.b2DistanceInput,
            y = Box2D.Collision.b2DistanceOutput,
            g = Box2D.Collision.b2DistanceProxy,
            _ = Box2D.Collision.b2DynamicTree,
            x = Box2D.Collision.b2DynamicTreeBroadPhase,
            v = Box2D.Collision.b2DynamicTreeNode,
            b = Box2D.Collision.b2DynamicTreePair,
            w = Box2D.Collision.b2Manifold,
            C = Box2D.Collision.b2ManifoldPoint,
            S = Box2D.Collision.b2Point,
            T = Box2D.Collision.b2RayCastInput,
            A = Box2D.Collision.b2RayCastOutput,
            D = Box2D.Collision.b2Segment,
            E = Box2D.Collision.b2SeparationFunction,
            B = Box2D.Collision.b2Simplex,
            M = Box2D.Collision.b2SimplexCache,
            I = Box2D.Collision.b2SimplexVertex,
            P = Box2D.Collision.b2TimeOfImpact,
            R = Box2D.Collision.b2TOIInput,
            k = Box2D.Collision.b2WorldManifold,
            F = Box2D.Collision.ClipVertex,
            L = Box2D.Collision.Features,
            O = Box2D.Collision.IBroadPhase;
        l.b2AABB = function() {
            this.lowerBound = new a, this.upperBound = new a
        }, l.prototype.IsValid = function() {
            var t = this.upperBound.x - this.lowerBound.x,
                e = this.upperBound.y - this.lowerBound.y,
                i = t >= 0 && e >= 0;
            return i = i && this.lowerBound.IsValid() && this.upperBound.IsValid()
        }, l.prototype.GetCenter = function() {
            return new a((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2)
        }, l.prototype.GetExtents = function() {
            return new a((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2)
        }, l.prototype.Contains = function(t) {
            var e = !0;
            return e = (e = (e = (e = e && this.lowerBound.x <= t.lowerBound.x) && this.lowerBound.y <= t.lowerBound.y) && t.upperBound.x <= this.upperBound.x) && t.upperBound.y <= this.upperBound.y
        }, l.prototype.RayCast = function(t, e) {
            var i = -Number.MAX_VALUE,
                r = Number.MAX_VALUE,
                n = e.p1.x,
                s = e.p1.y,
                o = e.p2.x - e.p1.x,
                a = e.p2.y - e.p1.y,
                l = Math.abs(o),
                h = Math.abs(a),
                c = t.normal,
                u = 0,
                d = 0,
                p = 0,
                m = 0,
                f = 0;
            if (l < Number.MIN_VALUE) {
                if (n < this.lowerBound.x || this.upperBound.x < n) return !1
            } else if (u = 1 / o, f = -1, (d = (this.lowerBound.x - n) * u) > (p = (this.upperBound.x - n) * u) && (m = d, d = p, p = m, f = 1), d > i && (c.x = f, c.y = 0, i = d), i > (r = Math.min(r, p))) return !1;
            if (h < Number.MIN_VALUE) {
                if (s < this.lowerBound.y || this.upperBound.y < s) return !1
            } else if (u = 1 / a, f = -1, (d = (this.lowerBound.y - s) * u) > (p = (this.upperBound.y - s) * u) && (m = d, d = p, p = m, f = 1), d > i && (c.y = f, c.x = 0, i = d), i > (r = Math.min(r, p))) return !1;
            return t.fraction = i, !0
        }, l.prototype.TestOverlap = function(t) {
            var e = t.lowerBound.x - this.upperBound.x,
                i = t.lowerBound.y - this.upperBound.y,
                r = this.lowerBound.x - t.upperBound.x,
                n = this.lowerBound.y - t.upperBound.y;
            return !(e > 0 || i > 0) && !(r > 0 || n > 0)
        }, l.Combine = function(t, e) {
            var i = new l;
            return i.Combine(t, e), i
        }, l.prototype.Combine = function(t, e) {
            this.lowerBound.x = Math.min(t.lowerBound.x, e.lowerBound.x), this.lowerBound.y = Math.min(t.lowerBound.y, e.lowerBound.y), this.upperBound.x = Math.max(t.upperBound.x, e.upperBound.x), this.upperBound.y = Math.max(t.upperBound.y, e.upperBound.y)
        }, h.b2Bound = function() {}, h.prototype.IsLower = function() {
            return 0 == (1 & this.value)
        }, h.prototype.IsUpper = function() {
            return 1 == (1 & this.value)
        }, h.prototype.Swap = function(t) {
            var e = this.value,
                i = this.proxy,
                r = this.stabbingCount;
            this.value = t.value, this.proxy = t.proxy, this.stabbingCount = t.stabbingCount, t.value = e, t.proxy = i, t.stabbingCount = r
        }, c.b2BoundValues = function() {}, c.prototype.b2BoundValues = function() {
            this.lowerValues = new Vector_a2j_Number, this.lowerValues[0] = 0, this.lowerValues[1] = 0, this.upperValues = new Vector_a2j_Number, this.upperValues[0] = 0, this.upperValues[1] = 0
        }, u.b2Collision = function() {}, u.ClipSegmentToLine = function(t, e, i, r) {
            var n;
            void 0 === r && (r = 0);
            var s = 0,
                o = (n = e[0]).v,
                a = (n = e[1]).v,
                l = i.x * o.x + i.y * o.y - r,
                h = i.x * a.x + i.y * a.y - r;
            if (l <= 0 && t[s++].Set(e[0]), h <= 0 && t[s++].Set(e[1]), l * h < 0) {
                var c, u = l / (l - h),
                    d = (n = t[s]).v;
                d.x = o.x + u * (a.x - o.x), d.y = o.y + u * (a.y - o.y), n = t[s], l > 0 ? (c = e[0], n.id = c.id) : (c = e[1], n.id = c.id), ++s
            }
            return s
        }, u.EdgeSeparation = function(t, e, i, r, n) {
            void 0 === i && (i = 0);
            parseInt(t.m_vertexCount);
            var s, o, a = t.m_vertices,
                l = t.m_normals,
                h = parseInt(r.m_vertexCount),
                c = r.m_vertices;
            s = e.R, o = l[i];
            for (var u = s.col1.x * o.x + s.col2.x * o.y, d = s.col1.y * o.x + s.col2.y * o.y, p = (s = n.R).col1.x * u + s.col1.y * d, m = s.col2.x * u + s.col2.y * d, f = 0, y = Number.MAX_VALUE, g = 0; g < h; ++g) {
                var _ = (o = c[g]).x * p + o.y * m;
                _ < y && (y = _, f = g)
            }
            o = a[i], s = e.R;
            var x = e.position.x + (s.col1.x * o.x + s.col2.x * o.y),
                v = e.position.y + (s.col1.y * o.x + s.col2.y * o.y);
            o = c[f], s = n.R;
            var b = n.position.x + (s.col1.x * o.x + s.col2.x * o.y),
                w = n.position.y + (s.col1.y * o.x + s.col2.y * o.y);
            return (b -= x) * u + (w -= v) * d
        }, u.FindMaxSeparation = function(t, e, i, r, n) {
            var s, o, a = parseInt(e.m_vertexCount),
                l = e.m_normals;
            o = n.R, s = r.m_centroid;
            var h = n.position.x + (o.col1.x * s.x + o.col2.x * s.y),
                c = n.position.y + (o.col1.y * s.x + o.col2.y * s.y);
            o = i.R, s = e.m_centroid, h -= i.position.x + (o.col1.x * s.x + o.col2.x * s.y), c -= i.position.y + (o.col1.y * s.x + o.col2.y * s.y);
            for (var d = h * i.R.col1.x + c * i.R.col1.y, p = h * i.R.col2.x + c * i.R.col2.y, m = 0, f = -Number.MAX_VALUE, y = 0; y < a; ++y) {
                var g = (s = l[y]).x * d + s.y * p;
                g > f && (f = g, m = y)
            }
            var _ = u.EdgeSeparation(e, i, m, r, n),
                x = parseInt(m - 1 >= 0 ? m - 1 : a - 1),
                v = u.EdgeSeparation(e, i, x, r, n),
                b = parseInt(m + 1 < a ? m + 1 : 0),
                w = u.EdgeSeparation(e, i, b, r, n),
                C = 0,
                S = 0,
                T = 0;
            if (v > _ && v > w) T = -1, C = x, S = v;
            else {
                if (!(w > _)) return t[0] = m, _;
                T = 1, C = b, S = w
            }
            for (; m = -1 == T ? C - 1 >= 0 ? C - 1 : a - 1 : C + 1 < a ? C + 1 : 0, (_ = u.EdgeSeparation(e, i, m, r, n)) > S;) C = m, S = _;
            return t[0] = C, S
        }, u.FindIncidentEdge = function(t, e, i, r, n, s) {
            void 0 === r && (r = 0);
            parseInt(e.m_vertexCount);
            var o, a, l = e.m_normals,
                h = parseInt(n.m_vertexCount),
                c = n.m_vertices,
                u = n.m_normals;
            o = i.R, a = l[r];
            var d = o.col1.x * a.x + o.col2.x * a.y,
                p = o.col1.y * a.x + o.col2.y * a.y,
                m = (o = s.R).col1.x * d + o.col1.y * p;
            p = o.col2.x * d + o.col2.y * p, d = m;
            for (var f, y = 0, g = Number.MAX_VALUE, _ = 0; _ < h; ++_) {
                var x = d * (a = u[_]).x + p * a.y;
                x < g && (g = x, y = _)
            }
            var v = parseInt(y),
                b = parseInt(v + 1 < h ? v + 1 : 0);
            f = t[0], a = c[v], o = s.R, f.v.x = s.position.x + (o.col1.x * a.x + o.col2.x * a.y), f.v.y = s.position.y + (o.col1.y * a.x + o.col2.y * a.y), f.id.features.referenceEdge = r, f.id.features.incidentEdge = v, f.id.features.incidentVertex = 0, f = t[1], a = c[b], o = s.R, f.v.x = s.position.x + (o.col1.x * a.x + o.col2.x * a.y), f.v.y = s.position.y + (o.col1.y * a.x + o.col2.y * a.y), f.id.features.referenceEdge = r, f.id.features.incidentEdge = b, f.id.features.incidentVertex = 1
        }, u.MakeClipPointVector = function() {
            var t = new Vector(2);
            return t[0] = new F, t[1] = new F, t
        }, u.CollidePolygons = function(t, e, i, n, s) {
            var o;
            t.m_pointCount = 0;
            var a = e.m_radius + n.m_radius,
                l = 0;
            u.s_edgeAO[0] = l;
            var h = u.FindMaxSeparation(u.s_edgeAO, e, i, n, s);
            if (l = u.s_edgeAO[0], !(h > a)) {
                var c = 0;
                u.s_edgeBO[0] = c;
                var d = u.FindMaxSeparation(u.s_edgeBO, n, s, e, i);
                if (c = u.s_edgeBO[0], !(d > a)) {
                    var p, m, f, y, g, _ = 0,
                        x = 0;
                    d > .98 * h + .001 ? (p = n, m = e, f = s, y = i, _ = c, t.m_type = w.e_faceB, x = 1) : (p = e, m = n, f = i, y = s, _ = l, t.m_type = w.e_faceA, x = 0);
                    var v = u.s_incidentEdge;
                    u.FindIncidentEdge(v, p, f, _, m, y);
                    var b, C = parseInt(p.m_vertexCount),
                        S = p.m_vertices,
                        T = S[_];
                    b = _ + 1 < C ? S[parseInt(_ + 1)] : S[0];
                    var A = u.s_localTangent;
                    A.Set(b.x - T.x, b.y - T.y), A.Normalize();
                    var D = u.s_localNormal;
                    D.x = A.y, D.y = -A.x;
                    var E = u.s_planePoint;
                    E.Set(.5 * (T.x + b.x), .5 * (T.y + b.y));
                    var B = u.s_tangent;
                    g = f.R, B.x = g.col1.x * A.x + g.col2.x * A.y, B.y = g.col1.y * A.x + g.col2.y * A.y;
                    var M = u.s_tangent2;
                    M.x = -B.x, M.y = -B.y;
                    var I = u.s_normal;
                    I.x = B.y, I.y = -B.x;
                    var P = u.s_v11,
                        R = u.s_v12;
                    P.x = f.position.x + (g.col1.x * T.x + g.col2.x * T.y), P.y = f.position.y + (g.col1.y * T.x + g.col2.y * T.y), R.x = f.position.x + (g.col1.x * b.x + g.col2.x * b.y), R.y = f.position.y + (g.col1.y * b.x + g.col2.y * b.y);
                    var k = I.x * P.x + I.y * P.y,
                        F = -B.x * P.x - B.y * P.y + a,
                        L = B.x * R.x + B.y * R.y + a,
                        O = u.s_clipPoints1,
                        N = u.s_clipPoints2;
                    if (!(u.ClipSegmentToLine(O, v, M, F) < 2 || u.ClipSegmentToLine(N, O, B, L) < 2)) {
                        t.m_localPlaneNormal.SetV(D), t.m_localPoint.SetV(E);
                        for (var G = 0, V = 0; V < r.b2_maxManifoldPoints; ++V) {
                            if (o = N[V], I.x * o.v.x + I.y * o.v.y - k <= a) {
                                var U = t.m_points[G];
                                g = y.R;
                                var j = o.v.x - y.position.x,
                                    z = o.v.y - y.position.y;
                                U.m_localPoint.x = j * g.col1.x + z * g.col1.y, U.m_localPoint.y = j * g.col2.x + z * g.col2.y, U.m_id.Set(o.id), U.m_id.features.flip = x, ++G
                            }
                        }
                        t.m_pointCount = G
                    }
                }
            }
        }, u.CollideCircles = function(t, e, i, r, n) {
            var s, o;
            t.m_pointCount = 0, s = i.R, o = e.m_p;
            var a = i.position.x + (s.col1.x * o.x + s.col2.x * o.y),
                l = i.position.y + (s.col1.y * o.x + s.col2.y * o.y);
            s = n.R, o = r.m_p;
            var h = n.position.x + (s.col1.x * o.x + s.col2.x * o.y) - a,
                c = n.position.y + (s.col1.y * o.x + s.col2.y * o.y) - l,
                u = h * h + c * c,
                d = e.m_radius + r.m_radius;
            u > d * d || (t.m_type = w.e_circles, t.m_localPoint.SetV(e.m_p), t.m_localPlaneNormal.SetZero(), t.m_pointCount = 1, t.m_points[0].m_localPoint.SetV(r.m_p), t.m_points[0].m_id.key = 0)
        }, u.CollidePolygonAndCircle = function(t, e, i, r, n) {
            t.m_pointCount = 0;
            var s, o, a = 0,
                l = 0;
            o = n.R, s = r.m_p;
            var h = n.position.x + (o.col1.x * s.x + o.col2.x * s.y),
                c = n.position.y + (o.col1.y * s.x + o.col2.y * s.y);
            a = h - i.position.x, l = c - i.position.y;
            for (var u = a * (o = i.R).col1.x + l * o.col1.y, d = a * o.col2.x + l * o.col2.y, p = 0, m = -Number.MAX_VALUE, f = e.m_radius + r.m_radius, y = parseInt(e.m_vertexCount), g = e.m_vertices, _ = e.m_normals, x = 0; x < y; ++x) {
                a = u - (s = g[x]).x, l = d - s.y;
                var v = (s = _[x]).x * a + s.y * l;
                if (v > f) return;
                v > m && (m = v, p = x)
            }
            var b = parseInt(p),
                C = parseInt(b + 1 < y ? b + 1 : 0),
                S = g[b],
                T = g[C];
            if (m < Number.MIN_VALUE) return t.m_pointCount = 1, t.m_type = w.e_faceA, t.m_localPlaneNormal.SetV(_[p]), t.m_localPoint.x = .5 * (S.x + T.x), t.m_localPoint.y = .5 * (S.y + T.y), t.m_points[0].m_localPoint.SetV(r.m_p), void(t.m_points[0].m_id.key = 0);
            var A = (u - S.x) * (T.x - S.x) + (d - S.y) * (T.y - S.y),
                D = (u - T.x) * (S.x - T.x) + (d - T.y) * (S.y - T.y);
            if (A <= 0) {
                if ((u - S.x) * (u - S.x) + (d - S.y) * (d - S.y) > f * f) return;
                t.m_pointCount = 1, t.m_type = w.e_faceA, t.m_localPlaneNormal.x = u - S.x, t.m_localPlaneNormal.y = d - S.y, t.m_localPlaneNormal.Normalize(), t.m_localPoint.SetV(S), t.m_points[0].m_localPoint.SetV(r.m_p), t.m_points[0].m_id.key = 0
            } else if (D <= 0) {
                if ((u - T.x) * (u - T.x) + (d - T.y) * (d - T.y) > f * f) return;
                t.m_pointCount = 1, t.m_type = w.e_faceA, t.m_localPlaneNormal.x = u - T.x, t.m_localPlaneNormal.y = d - T.y, t.m_localPlaneNormal.Normalize(), t.m_localPoint.SetV(T), t.m_points[0].m_localPoint.SetV(r.m_p), t.m_points[0].m_id.key = 0
            } else {
                var E = .5 * (S.x + T.x),
                    B = .5 * (S.y + T.y);
                if ((m = (u - E) * _[b].x + (d - B) * _[b].y) > f) return;
                t.m_pointCount = 1, t.m_type = w.e_faceA, t.m_localPlaneNormal.x = _[b].x, t.m_localPlaneNormal.y = _[b].y, t.m_localPlaneNormal.Normalize(), t.m_localPoint.Set(E, B), t.m_points[0].m_localPoint.SetV(r.m_p), t.m_points[0].m_id.key = 0
            }
        }, u.TestOverlap = function(t, e) {
            var i = e.lowerBound,
                r = t.upperBound,
                n = i.x - r.x,
                s = i.y - r.y;
            i = t.lowerBound, r = e.upperBound;
            var o = i.x - r.x,
                a = i.y - r.y;
            return !(n > 0 || s > 0) && !(o > 0 || a > 0)
        }, Box2D.postDefs.push((function() {
            Box2D.Collision.b2Collision.s_incidentEdge = u.MakeClipPointVector(), Box2D.Collision.b2Collision.s_clipPoints1 = u.MakeClipPointVector(), Box2D.Collision.b2Collision.s_clipPoints2 = u.MakeClipPointVector(), Box2D.Collision.b2Collision.s_edgeAO = new Vector_a2j_Number(1), Box2D.Collision.b2Collision.s_edgeBO = new Vector_a2j_Number(1), Box2D.Collision.b2Collision.s_localTangent = new a, Box2D.Collision.b2Collision.s_localNormal = new a, Box2D.Collision.b2Collision.s_planePoint = new a, Box2D.Collision.b2Collision.s_normal = new a, Box2D.Collision.b2Collision.s_tangent = new a, Box2D.Collision.b2Collision.s_tangent2 = new a, Box2D.Collision.b2Collision.s_v11 = new a, Box2D.Collision.b2Collision.s_v12 = new a, Box2D.Collision.b2Collision.b2CollidePolyTempVec = new a, Box2D.Collision.b2Collision.b2_nullFeature = 255
        })), d.b2ContactID = function() {
            this.features = new L
        }, d.prototype.b2ContactID = function() {
            this.features._m_id = this
        }, d.prototype.Set = function(t) {
            this.key = t._key
        }, d.prototype.Copy = function() {
            var t = new d;
            return t.key = this.key, t
        }, Object.defineProperty(d.prototype, "key", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return this._key
            }
        }), Object.defineProperty(d.prototype, "key", {
            enumerable: !1,
            configurable: !0,
            set: function(t) {
                void 0 === t && (t = 0), this._key = t, this.features._referenceEdge = 255 & this._key, this.features._incidentEdge = (65280 & this._key) >> 8 & 255, this.features._incidentVertex = (16711680 & this._key) >> 16 & 255, this.features._flip = (4278190080 & this._key) >> 24 & 255
            }
        }), p.b2ContactPoint = function() {
            this.position = new a, this.velocity = new a, this.normal = new a, this.id = new d
        }, m.b2Distance = function() {}, m.Distance = function(t, e, i) {
            ++m.b2_gjkCalls;
            var s = i.proxyA,
                o = i.proxyB,
                l = i.transformA,
                h = i.transformB,
                c = m.s_simplex;
            c.ReadCache(e, s, l, o, h);
            for (var u, d = c.m_vertices, p = m.s_saveA, f = m.s_saveB, y = 0, g = (c.GetClosestPoint().LengthSquared(), 0), _ = 0; _ < 20;) {
                for (y = c.m_count, g = 0; g < y; g++) p[g] = d[g].indexA, f[g] = d[g].indexB;
                switch (c.m_count) {
                    case 1:
                        break;
                    case 2:
                        c.Solve2();
                        break;
                    case 3:
                        c.Solve3();
                        break;
                    default:
                        r.b2Assert(!1)
                }
                if (3 == c.m_count) break;
                (u = c.GetClosestPoint()).LengthSquared();
                var x = c.GetSearchDirection();
                if (x.LengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) break;
                var v = d[c.m_count];
                v.indexA = s.GetSupport(n.MulTMV(l.R, x.GetNegative())), v.wA = n.MulX(l, s.GetVertex(v.indexA)), v.indexB = o.GetSupport(n.MulTMV(h.R, x)), v.wB = n.MulX(h, o.GetVertex(v.indexB)), v.w = n.SubtractVV(v.wB, v.wA), ++_, ++m.b2_gjkIters;
                var b = !1;
                for (g = 0; g < y; g++)
                    if (v.indexA == p[g] && v.indexB == f[g]) {
                        b = !0;
                        break
                    } if (b) break;
                ++c.m_count
            }
            if (m.b2_gjkMaxIters = n.Max(m.b2_gjkMaxIters, _), c.GetWitnessPoints(t.pointA, t.pointB), t.distance = n.SubtractVV(t.pointA, t.pointB).Length(), t.iterations = _, c.WriteCache(e), i.useRadii) {
                var w = s.m_radius,
                    C = o.m_radius;
                if (t.distance > w + C && t.distance > Number.MIN_VALUE) {
                    t.distance -= w + C;
                    var S = n.SubtractVV(t.pointB, t.pointA);
                    S.Normalize(), t.pointA.x += w * S.x, t.pointA.y += w * S.y, t.pointB.x -= C * S.x, t.pointB.y -= C * S.y
                } else(u = new a).x = .5 * (t.pointA.x + t.pointB.x), u.y = .5 * (t.pointA.y + t.pointB.y), t.pointA.x = t.pointB.x = u.x, t.pointA.y = t.pointB.y = u.y, t.distance = 0
            }
        }, Box2D.postDefs.push((function() {
            Box2D.Collision.b2Distance.s_simplex = new B, Box2D.Collision.b2Distance.s_saveA = new Vector_a2j_Number(3), Box2D.Collision.b2Distance.s_saveB = new Vector_a2j_Number(3)
        })), f.b2DistanceInput = function() {}, y.b2DistanceOutput = function() {
            this.pointA = new a, this.pointB = new a
        }, g.b2DistanceProxy = function() {}, g.prototype.Set = function(n) {
            switch (n.GetType()) {
                case i.e_circleShape:
                    var s = n instanceof t ? n : null;
                    this.m_vertices = new Vector(1, !0), this.m_vertices[0] = s.m_p, this.m_count = 1, this.m_radius = s.m_radius;
                    break;
                case i.e_polygonShape:
                    var o = n instanceof e ? n : null;
                    this.m_vertices = o.m_vertices, this.m_count = o.m_vertexCount, this.m_radius = o.m_radius;
                    break;
                default:
                    r.b2Assert(!1)
            }
        }, g.prototype.GetSupport = function(t) {
            for (var e = 0, i = this.m_vertices[0].x * t.x + this.m_vertices[0].y * t.y, r = 1; r < this.m_count; ++r) {
                var n = this.m_vertices[r].x * t.x + this.m_vertices[r].y * t.y;
                n > i && (e = r, i = n)
            }
            return e
        }, g.prototype.GetSupportVertex = function(t) {
            for (var e = 0, i = this.m_vertices[0].x * t.x + this.m_vertices[0].y * t.y, r = 1; r < this.m_count; ++r) {
                var n = this.m_vertices[r].x * t.x + this.m_vertices[r].y * t.y;
                n > i && (e = r, i = n)
            }
            return this.m_vertices[e]
        }, g.prototype.GetVertexCount = function() {
            return this.m_count
        }, g.prototype.GetVertex = function(t) {
            return void 0 === t && (t = 0), r.b2Assert(0 <= t && t < this.m_count), this.m_vertices[t]
        }, _.b2DynamicTree = function() {}, _.prototype.b2DynamicTree = function() {
            this.m_root = null, this.m_freeList = null, this.m_path = 0, this.m_insertionCount = 0
        }, _.prototype.CreateProxy = function(t, e) {
            var i = this.AllocateNode(),
                n = r.b2_aabbExtension,
                s = r.b2_aabbExtension;
            return i.aabb.lowerBound.x = t.lowerBound.x - n, i.aabb.lowerBound.y = t.lowerBound.y - s, i.aabb.upperBound.x = t.upperBound.x + n, i.aabb.upperBound.y = t.upperBound.y + s, i.userData = e, this.InsertLeaf(i), i
        }, _.prototype.DestroyProxy = function(t) {
            this.RemoveLeaf(t), this.FreeNode(t)
        }, _.prototype.MoveProxy = function(t, e, i) {
            if (r.b2Assert(t.IsLeaf()), t.aabb.Contains(e)) return !1;
            this.RemoveLeaf(t);
            var n = r.b2_aabbExtension + r.b2_aabbMultiplier * (i.x > 0 ? i.x : -i.x),
                s = r.b2_aabbExtension + r.b2_aabbMultiplier * (i.y > 0 ? i.y : -i.y);
            return t.aabb.lowerBound.x = e.lowerBound.x - n, t.aabb.lowerBound.y = e.lowerBound.y - s, t.aabb.upperBound.x = e.upperBound.x + n, t.aabb.upperBound.y = e.upperBound.y + s, this.InsertLeaf(t), !0
        }, _.prototype.Rebalance = function(t) {
            if (void 0 === t && (t = 0), null != this.m_root)
                for (var e = 0; e < t; e++) {
                    for (var i = this.m_root, r = 0; 0 == i.IsLeaf();) i = this.m_path >> r & 1 ? i.child2 : i.child1, r = r + 1 & 31;
                    ++this.m_path, this.RemoveLeaf(i), this.InsertLeaf(i)
                }
        }, _.prototype.GetFatAABB = function(t) {
            return t.aabb
        }, _.prototype.GetUserData = function(t) {
            return t.userData
        }, _.prototype.Query = function(t, e) {
            if (null != this.m_root) {
                var i = new Vector,
                    r = 0;
                for (i[r++] = this.m_root; r > 0;) {
                    var n = i[--r];
                    if (n.aabb.TestOverlap(e))
                        if (n.IsLeaf()) {
                            if (!t(n)) return
                        } else i[r++] = n.child1, i[r++] = n.child2
                }
            }
        }, _.prototype.RayCast = function(t, e) {
            if (null != this.m_root) {
                var i = e.p1,
                    r = e.p2,
                    s = n.SubtractVV(i, r);
                s.Normalize();
                var o = n.CrossFV(1, s),
                    a = n.AbsV(o),
                    h = e.maxFraction,
                    c = new l,
                    u = 0,
                    d = 0;
                u = i.x + h * (r.x - i.x), d = i.y + h * (r.y - i.y), c.lowerBound.x = Math.min(i.x, u), c.lowerBound.y = Math.min(i.y, d), c.upperBound.x = Math.max(i.x, u), c.upperBound.y = Math.max(i.y, d);
                var p = new Vector,
                    m = 0;
                for (p[m++] = this.m_root; m > 0;) {
                    var f = p[--m];
                    if (0 != f.aabb.TestOverlap(c)) {
                        var y = f.aabb.GetCenter(),
                            g = f.aabb.GetExtents();
                        if (!(Math.abs(o.x * (i.x - y.x) + o.y * (i.y - y.y)) - a.x * g.x - a.y * g.y > 0))
                            if (f.IsLeaf()) {
                                var _ = new T;
                                if (_.p1 = e.p1, _.p2 = e.p2, _.maxFraction = e.maxFraction, 0 == (h = t(_, f))) return;
                                h > 0 && (u = i.x + h * (r.x - i.x), d = i.y + h * (r.y - i.y), c.lowerBound.x = Math.min(i.x, u), c.lowerBound.y = Math.min(i.y, d), c.upperBound.x = Math.max(i.x, u), c.upperBound.y = Math.max(i.y, d))
                            } else p[m++] = f.child1, p[m++] = f.child2
                    }
                }
            }
        }, _.prototype.AllocateNode = function() {
            if (this.m_freeList) {
                var t = this.m_freeList;
                return this.m_freeList = t.parent, t.parent = null, t.child1 = null, t.child2 = null, t
            }
            return new v
        }, _.prototype.FreeNode = function(t) {
            t.parent = this.m_freeList, this.m_freeList = t
        }, _.prototype.InsertLeaf = function(t) {
            if (++this.m_insertionCount, null == this.m_root) return this.m_root = t, void(this.m_root.parent = null);
            var e = t.aabb.GetCenter(),
                i = this.m_root;
            if (0 == i.IsLeaf())
                do {
                    var r = i.child1,
                        n = i.child2;
                    i = Math.abs((r.aabb.lowerBound.x + r.aabb.upperBound.x) / 2 - e.x) + Math.abs((r.aabb.lowerBound.y + r.aabb.upperBound.y) / 2 - e.y) < Math.abs((n.aabb.lowerBound.x + n.aabb.upperBound.x) / 2 - e.x) + Math.abs((n.aabb.lowerBound.y + n.aabb.upperBound.y) / 2 - e.y) ? r : n
                } while (0 == i.IsLeaf());
            var s = i.parent,
                o = this.AllocateNode();
            if (o.parent = s, o.userData = null, o.aabb.Combine(t.aabb, i.aabb), s) {
                i.parent.child1 == i ? s.child1 = o : s.child2 = o, o.child1 = i, o.child2 = t, i.parent = o, t.parent = o;
                do {
                    if (s.aabb.Contains(o.aabb)) break;
                    s.aabb.Combine(s.child1.aabb, s.child2.aabb), o = s, s = s.parent
                } while (s)
            } else o.child1 = i, o.child2 = t, i.parent = o, t.parent = o, this.m_root = o
        }, _.prototype.RemoveLeaf = function(t) {
            if (t != this.m_root) {
                var e, i = t.parent,
                    r = i.parent;
                if (e = i.child1 == t ? i.child2 : i.child1, r)
                    for (r.child1 == i ? r.child1 = e : r.child2 = e, e.parent = r, this.FreeNode(i); r;) {
                        var n = r.aabb;
                        if (r.aabb = l.Combine(r.child1.aabb, r.child2.aabb), n.Contains(r.aabb)) break;
                        r = r.parent
                    } else this.m_root = e, e.parent = null, this.FreeNode(i)
            } else this.m_root = null
        }, x.b2DynamicTreeBroadPhase = function() {
            this.m_tree = new _, this.m_moveBuffer = new Vector, this.m_pairBuffer = new Vector, this.m_pairCount = 0
        }, x.prototype.CreateProxy = function(t, e) {
            var i = this.m_tree.CreateProxy(t, e);
            return ++this.m_proxyCount, this.BufferMove(i), i
        }, x.prototype.DestroyProxy = function(t) {
            this.UnBufferMove(t), --this.m_proxyCount, this.m_tree.DestroyProxy(t)
        }, x.prototype.MoveProxy = function(t, e, i) {
            this.m_tree.MoveProxy(t, e, i) && this.BufferMove(t)
        }, x.prototype.TestOverlap = function(t, e) {
            var i = this.m_tree.GetFatAABB(t),
                r = this.m_tree.GetFatAABB(e);
            return i.TestOverlap(r)
        }, x.prototype.GetUserData = function(t) {
            return this.m_tree.GetUserData(t)
        }, x.prototype.GetFatAABB = function(t) {
            return this.m_tree.GetFatAABB(t)
        }, x.prototype.GetProxyCount = function() {
            return this.m_proxyCount
        }, x.prototype.UpdatePairs = function(t) {
            var e = this;
            e.m_pairCount = 0;
            var i, r = 0;
            for (r = 0; r < e.m_moveBuffer.length; ++r) {
                function n(t) {
                    if (t == i) return !0;
                    e.m_pairCount == e.m_pairBuffer.length && (e.m_pairBuffer[e.m_pairCount] = new b);
                    var r = e.m_pairBuffer[e.m_pairCount];
                    return r.proxyA = t < i ? t : i, r.proxyB = t >= i ? t : i, ++e.m_pairCount, !0
                }
                i = e.m_moveBuffer[r];
                var s = e.m_tree.GetFatAABB(i);
                e.m_tree.Query(n, s)
            }
            e.m_moveBuffer.length = 0;
            for (r = 0; r < e.m_pairCount;) {
                var o = e.m_pairBuffer[r];
                for (t(e.m_tree.GetUserData(o.proxyA), e.m_tree.GetUserData(o.proxyB)), ++r; r < e.m_pairCount;) {
                    var a = e.m_pairBuffer[r];
                    if (a.proxyA != o.proxyA || a.proxyB != o.proxyB) break;
                    ++r
                }
            }
        }, x.prototype.Query = function(t, e) {
            this.m_tree.Query(t, e)
        }, x.prototype.RayCast = function(t, e) {
            this.m_tree.RayCast(t, e)
        }, x.prototype.Validate = function() {}, x.prototype.Rebalance = function(t) {
            void 0 === t && (t = 0), this.m_tree.Rebalance(t)
        }, x.prototype.BufferMove = function(t) {
            this.m_moveBuffer[this.m_moveBuffer.length] = t
        }, x.prototype.UnBufferMove = function(t) {
            var e = parseInt(this.m_moveBuffer.indexOf(t));
            this.m_moveBuffer.splice(e, 1)
        }, x.prototype.ComparePairs = function(t, e) {
            return 0
        }, x.__implements = {}, x.__implements[O] = !0, v.b2DynamicTreeNode = function() {
            this.aabb = new l
        }, v.prototype.IsLeaf = function() {
            return null == this.child1
        }, b.b2DynamicTreePair = function() {}, w.b2Manifold = function() {
            this.m_pointCount = 0
        }, w.prototype.b2Manifold = function() {
            this.m_points = new Vector(r.b2_maxManifoldPoints);
            for (var t = 0; t < r.b2_maxManifoldPoints; t++) this.m_points[t] = new C;
            this.m_localPlaneNormal = new a, this.m_localPoint = new a
        }, w.prototype.Reset = function() {
            for (var t = 0; t < r.b2_maxManifoldPoints; t++)(this.m_points[t] instanceof C ? this.m_points[t] : null).Reset();
            this.m_localPlaneNormal.SetZero(), this.m_localPoint.SetZero(), this.m_type = 0, this.m_pointCount = 0
        }, w.prototype.Set = function(t) {
            this.m_pointCount = t.m_pointCount;
            for (var e = 0; e < r.b2_maxManifoldPoints; e++)(this.m_points[e] instanceof C ? this.m_points[e] : null).Set(t.m_points[e]);
            this.m_localPlaneNormal.SetV(t.m_localPlaneNormal), this.m_localPoint.SetV(t.m_localPoint), this.m_type = t.m_type
        }, w.prototype.Copy = function() {
            var t = new w;
            return t.Set(this), t
        }, Box2D.postDefs.push((function() {
            Box2D.Collision.b2Manifold.e_circles = 1, Box2D.Collision.b2Manifold.e_faceA = 2, Box2D.Collision.b2Manifold.e_faceB = 4
        })), C.b2ManifoldPoint = function() {
            this.m_localPoint = new a, this.m_id = new d
        }, C.prototype.b2ManifoldPoint = function() {
            this.Reset()
        }, C.prototype.Reset = function() {
            this.m_localPoint.SetZero(), this.m_normalImpulse = 0, this.m_tangentImpulse = 0, this.m_id.key = 0
        }, C.prototype.Set = function(t) {
            this.m_localPoint.SetV(t.m_localPoint), this.m_normalImpulse = t.m_normalImpulse, this.m_tangentImpulse = t.m_tangentImpulse, this.m_id.Set(t.m_id)
        }, S.b2Point = function() {
            this.p = new a
        }, S.prototype.Support = function(t, e, i) {
            return void 0 === e && (e = 0), void 0 === i && (i = 0), this.p
        }, S.prototype.GetFirstVertex = function(t) {
            return this.p
        }, T.b2RayCastInput = function() {
            this.p1 = new a, this.p2 = new a
        }, T.prototype.b2RayCastInput = function(t, e, i) {
            void 0 === t && (t = null), void 0 === e && (e = null), void 0 === i && (i = 1), t && this.p1.SetV(t), e && this.p2.SetV(e), this.maxFraction = i
        }, A.b2RayCastOutput = function() {
            this.normal = new a
        }, D.b2Segment = function() {
            this.p1 = new a, this.p2 = new a
        }, D.prototype.TestSegment = function(t, e, i, r) {
            void 0 === r && (r = 0);
            var n = i.p1,
                s = i.p2.x - n.x,
                o = i.p2.y - n.y,
                a = this.p2.x - this.p1.x,
                l = this.p2.y - this.p1.y,
                h = -a,
                c = 100 * Number.MIN_VALUE,
                u = -(s * l + o * h);
            if (u > c) {
                var d = n.x - this.p1.x,
                    p = n.y - this.p1.y,
                    m = d * l + p * h;
                if (0 <= m && m <= r * u) {
                    var f = -s * p + o * d;
                    if (-c * u <= f && f <= u * (1 + c)) {
                        m /= u;
                        var y = Math.sqrt(l * l + h * h);
                        return l /= y, h /= y, t[0] = m, e.Set(l, h), !0
                    }
                }
            }
            return !1
        }, D.prototype.Extend = function(t) {
            this.ExtendForward(t), this.ExtendBackward(t)
        }, D.prototype.ExtendForward = function(t) {
            var e = this.p2.x - this.p1.x,
                i = this.p2.y - this.p1.y,
                r = Math.min(e > 0 ? (t.upperBound.x - this.p1.x) / e : e < 0 ? (t.lowerBound.x - this.p1.x) / e : Number.POSITIVE_INFINITY, i > 0 ? (t.upperBound.y - this.p1.y) / i : i < 0 ? (t.lowerBound.y - this.p1.y) / i : Number.POSITIVE_INFINITY);
            this.p2.x = this.p1.x + e * r, this.p2.y = this.p1.y + i * r
        }, D.prototype.ExtendBackward = function(t) {
            var e = -this.p2.x + this.p1.x,
                i = -this.p2.y + this.p1.y,
                r = Math.min(e > 0 ? (t.upperBound.x - this.p2.x) / e : e < 0 ? (t.lowerBound.x - this.p2.x) / e : Number.POSITIVE_INFINITY, i > 0 ? (t.upperBound.y - this.p2.y) / i : i < 0 ? (t.lowerBound.y - this.p2.y) / i : Number.POSITIVE_INFINITY);
            this.p1.x = this.p2.x + e * r, this.p1.y = this.p2.y + i * r
        }, E.b2SeparationFunction = function() {
            this.m_localPoint = new a, this.m_axis = new a
        }, E.prototype.Initialize = function(t, e, i, s, o) {
            this.m_proxyA = e, this.m_proxyB = s;
            var l, h, c, u, d, p, m = parseInt(t.count);
            r.b2Assert(0 < m && m < 3);
            var f, y, g = 0,
                _ = 0,
                x = 0,
                v = 0,
                b = 0,
                w = 0,
                C = 0;
            if (1 == m) this.m_type = E.e_points, l = this.m_proxyA.GetVertex(t.indexA[0]), u = this.m_proxyB.GetVertex(t.indexB[0]), y = l, f = i.R, g = i.position.x + (f.col1.x * y.x + f.col2.x * y.y), _ = i.position.y + (f.col1.y * y.x + f.col2.y * y.y), y = u, f = o.R, x = o.position.x + (f.col1.x * y.x + f.col2.x * y.y), v = o.position.y + (f.col1.y * y.x + f.col2.y * y.y), this.m_axis.x = x - g, this.m_axis.y = v - _, this.m_axis.Normalize();
            else if (t.indexB[0] == t.indexB[1]) this.m_type = E.e_faceA, h = this.m_proxyA.GetVertex(t.indexA[0]), c = this.m_proxyA.GetVertex(t.indexA[1]), u = this.m_proxyB.GetVertex(t.indexB[0]), this.m_localPoint.x = .5 * (h.x + c.x), this.m_localPoint.y = .5 * (h.y + c.y), this.m_axis = n.CrossVF(n.SubtractVV(c, h), 1), this.m_axis.Normalize(), y = this.m_axis, b = (f = i.R).col1.x * y.x + f.col2.x * y.y, w = f.col1.y * y.x + f.col2.y * y.y, y = this.m_localPoint, f = i.R, g = i.position.x + (f.col1.x * y.x + f.col2.x * y.y), _ = i.position.y + (f.col1.y * y.x + f.col2.y * y.y), y = u, f = o.R, (C = ((x = o.position.x + (f.col1.x * y.x + f.col2.x * y.y)) - g) * b + ((v = o.position.y + (f.col1.y * y.x + f.col2.y * y.y)) - _) * w) < 0 && this.m_axis.NegativeSelf();
            else if (t.indexA[0] == t.indexA[0]) this.m_type = E.e_faceB, d = this.m_proxyB.GetVertex(t.indexB[0]), p = this.m_proxyB.GetVertex(t.indexB[1]), l = this.m_proxyA.GetVertex(t.indexA[0]), this.m_localPoint.x = .5 * (d.x + p.x), this.m_localPoint.y = .5 * (d.y + p.y), this.m_axis = n.CrossVF(n.SubtractVV(p, d), 1), this.m_axis.Normalize(), y = this.m_axis, b = (f = o.R).col1.x * y.x + f.col2.x * y.y, w = f.col1.y * y.x + f.col2.y * y.y, y = this.m_localPoint, f = o.R, x = o.position.x + (f.col1.x * y.x + f.col2.x * y.y), v = o.position.y + (f.col1.y * y.x + f.col2.y * y.y), y = l, f = i.R, (C = ((g = i.position.x + (f.col1.x * y.x + f.col2.x * y.y)) - x) * b + ((_ = i.position.y + (f.col1.y * y.x + f.col2.y * y.y)) - v) * w) < 0 && this.m_axis.NegativeSelf();
            else {
                h = this.m_proxyA.GetVertex(t.indexA[0]), c = this.m_proxyA.GetVertex(t.indexA[1]), d = this.m_proxyB.GetVertex(t.indexB[0]), p = this.m_proxyB.GetVertex(t.indexB[1]);
                n.MulX(i, l);
                var S = n.MulMV(i.R, n.SubtractVV(c, h)),
                    T = (n.MulX(o, u), n.MulMV(o.R, n.SubtractVV(p, d))),
                    A = S.x * S.x + S.y * S.y,
                    D = T.x * T.x + T.y * T.y,
                    B = n.SubtractVV(T, S),
                    M = S.x * B.x + S.y * B.y,
                    I = T.x * B.x + T.y * B.y,
                    P = S.x * T.x + S.y * T.y,
                    R = A * D - P * P;
                C = 0, 0 != R && (C = n.Clamp((P * I - M * D) / R, 0, 1));
                var k = (P * C + I) / D;
                k < 0 && (k = 0, C = n.Clamp((P - M) / A, 0, 1)), (l = new a).x = h.x + C * (c.x - h.x), l.y = h.y + C * (c.y - h.y), (u = new a).x = d.x + C * (p.x - d.x), u.y = d.y + C * (p.y - d.y), 0 == C || 1 == C ? (this.m_type = E.e_faceB, this.m_axis = n.CrossVF(n.SubtractVV(p, d), 1), this.m_axis.Normalize(), this.m_localPoint = u, y = this.m_axis, b = (f = o.R).col1.x * y.x + f.col2.x * y.y, w = f.col1.y * y.x + f.col2.y * y.y, y = this.m_localPoint, f = o.R, x = o.position.x + (f.col1.x * y.x + f.col2.x * y.y), v = o.position.y + (f.col1.y * y.x + f.col2.y * y.y), y = l, f = i.R, ((g = i.position.x + (f.col1.x * y.x + f.col2.x * y.y)) - x) * b + ((_ = i.position.y + (f.col1.y * y.x + f.col2.y * y.y)) - v) * w, C < 0 && this.m_axis.NegativeSelf()) : (this.m_type = E.e_faceA, this.m_axis = n.CrossVF(n.SubtractVV(c, h), 1), this.m_localPoint = l, y = this.m_axis, b = (f = i.R).col1.x * y.x + f.col2.x * y.y, w = f.col1.y * y.x + f.col2.y * y.y, y = this.m_localPoint, f = i.R, g = i.position.x + (f.col1.x * y.x + f.col2.x * y.y), _ = i.position.y + (f.col1.y * y.x + f.col2.y * y.y), y = u, f = o.R, ((x = o.position.x + (f.col1.x * y.x + f.col2.x * y.y)) - g) * b + ((v = o.position.y + (f.col1.y * y.x + f.col2.y * y.y)) - _) * w, C < 0 && this.m_axis.NegativeSelf())
            }
        }, E.prototype.Evaluate = function(t, e) {
            var i, s, o, a, l, h, c;
            switch (this.m_type) {
                case E.e_points:
                    return i = n.MulTMV(t.R, this.m_axis), s = n.MulTMV(e.R, this.m_axis.GetNegative()), o = this.m_proxyA.GetSupportVertex(i), a = this.m_proxyB.GetSupportVertex(s), l = n.MulX(t, o), ((h = n.MulX(e, a)).x - l.x) * this.m_axis.x + (h.y - l.y) * this.m_axis.y;
                case E.e_faceA:
                    return c = n.MulMV(t.R, this.m_axis), l = n.MulX(t, this.m_localPoint), s = n.MulTMV(e.R, c.GetNegative()), a = this.m_proxyB.GetSupportVertex(s), ((h = n.MulX(e, a)).x - l.x) * c.x + (h.y - l.y) * c.y;
                case E.e_faceB:
                    return c = n.MulMV(e.R, this.m_axis), h = n.MulX(e, this.m_localPoint), i = n.MulTMV(t.R, c.GetNegative()), o = this.m_proxyA.GetSupportVertex(i), ((l = n.MulX(t, o)).x - h.x) * c.x + (l.y - h.y) * c.y;
                default:
                    return r.b2Assert(!1), 0
            }
        }, Box2D.postDefs.push((function() {
            Box2D.Collision.b2SeparationFunction.e_points = 1, Box2D.Collision.b2SeparationFunction.e_faceA = 2, Box2D.Collision.b2SeparationFunction.e_faceB = 4
        })), B.b2Simplex = function() {
            this.m_v1 = new I, this.m_v2 = new I, this.m_v3 = new I, this.m_vertices = new Vector(3)
        }, B.prototype.b2Simplex = function() {
            this.m_vertices[0] = this.m_v1, this.m_vertices[1] = this.m_v2, this.m_vertices[2] = this.m_v3
        }, B.prototype.ReadCache = function(t, e, i, s, o) {
            var a, l;
            r.b2Assert(0 <= t.count && t.count <= 3), this.m_count = t.count;
            for (var h = this.m_vertices, c = 0; c < this.m_count; c++) {
                var u = h[c];
                u.indexA = t.indexA[c], u.indexB = t.indexB[c], a = e.GetVertex(u.indexA), l = s.GetVertex(u.indexB), u.wA = n.MulX(i, a), u.wB = n.MulX(o, l), u.w = n.SubtractVV(u.wB, u.wA), u.a = 0
            }
            if (this.m_count > 1) {
                var d = t.metric,
                    p = this.GetMetric();
                (p < .5 * d || 2 * d < p || p < Number.MIN_VALUE) && (this.m_count = 0)
            }
            0 == this.m_count && ((u = h[0]).indexA = 0, u.indexB = 0, a = e.GetVertex(0), l = s.GetVertex(0), u.wA = n.MulX(i, a), u.wB = n.MulX(o, l), u.w = n.SubtractVV(u.wB, u.wA), this.m_count = 1)
        }, B.prototype.WriteCache = function(t) {
            t.metric = this.GetMetric(), t.count = Box2D.parseUInt(this.m_count);
            for (var e = this.m_vertices, i = 0; i < this.m_count; i++) t.indexA[i] = Box2D.parseUInt(e[i].indexA), t.indexB[i] = Box2D.parseUInt(e[i].indexB)
        }, B.prototype.GetSearchDirection = function() {
            switch (this.m_count) {
                case 1:
                    return this.m_v1.w.GetNegative();
                case 2:
                    var t = n.SubtractVV(this.m_v2.w, this.m_v1.w);
                    return n.CrossVV(t, this.m_v1.w.GetNegative()) > 0 ? n.CrossFV(1, t) : n.CrossVF(t, 1);
                default:
                    return r.b2Assert(!1), new a
            }
        }, B.prototype.GetClosestPoint = function() {
            switch (this.m_count) {
                case 0:
                default:
                    return r.b2Assert(!1), new a;
                case 1:
                    return this.m_v1.w;
                case 2:
                    return new a(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y)
            }
        }, B.prototype.GetWitnessPoints = function(t, e) {
            switch (this.m_count) {
                case 0:
                default:
                    r.b2Assert(!1);
                    break;
                case 1:
                    t.SetV(this.m_v1.wA), e.SetV(this.m_v1.wB);
                    break;
                case 2:
                    t.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x, t.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y, e.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x, e.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
                    break;
                case 3:
                    e.x = t.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x, e.y = t.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y
            }
        }, B.prototype.GetMetric = function() {
            switch (this.m_count) {
                case 0:
                default:
                    return r.b2Assert(!1), 0;
                case 1:
                    return 0;
                case 2:
                    return n.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
                case 3:
                    return n.CrossVV(n.SubtractVV(this.m_v2.w, this.m_v1.w), n.SubtractVV(this.m_v3.w, this.m_v1.w))
            }
        }, B.prototype.Solve2 = function() {
            var t = this.m_v1.w,
                e = this.m_v2.w,
                i = n.SubtractVV(e, t),
                r = -(t.x * i.x + t.y * i.y);
            if (r <= 0) return this.m_v1.a = 1, void(this.m_count = 1);
            var s = e.x * i.x + e.y * i.y;
            if (s <= 0) return this.m_v2.a = 1, this.m_count = 1, void this.m_v1.Set(this.m_v2);
            var o = 1 / (s + r);
            this.m_v1.a = s * o, this.m_v2.a = r * o, this.m_count = 2
        }, B.prototype.Solve3 = function() {
            var t = this.m_v1.w,
                e = this.m_v2.w,
                i = this.m_v3.w,
                r = n.SubtractVV(e, t),
                s = n.Dot(t, r),
                o = n.Dot(e, r),
                a = -s,
                l = n.SubtractVV(i, t),
                h = n.Dot(t, l),
                c = n.Dot(i, l),
                u = -h,
                d = n.SubtractVV(i, e),
                p = n.Dot(e, d),
                m = n.Dot(i, d),
                f = -p,
                y = n.CrossVV(r, l),
                g = y * n.CrossVV(e, i),
                _ = y * n.CrossVV(i, t),
                x = y * n.CrossVV(t, e);
            if (a <= 0 && u <= 0) return this.m_v1.a = 1, void(this.m_count = 1);
            if (o > 0 && a > 0 && x <= 0) {
                var v = 1 / (o + a);
                return this.m_v1.a = o * v, this.m_v2.a = a * v, void(this.m_count = 2)
            }
            if (c > 0 && u > 0 && _ <= 0) {
                var b = 1 / (c + u);
                return this.m_v1.a = c * b, this.m_v3.a = u * b, this.m_count = 2, void this.m_v2.Set(this.m_v3)
            }
            if (o <= 0 && f <= 0) return this.m_v2.a = 1, this.m_count = 1, void this.m_v1.Set(this.m_v2);
            if (c <= 0 && m <= 0) return this.m_v3.a = 1, this.m_count = 1, void this.m_v1.Set(this.m_v3);
            if (m > 0 && f > 0 && g <= 0) {
                var w = 1 / (m + f);
                return this.m_v2.a = m * w, this.m_v3.a = f * w, this.m_count = 2, void this.m_v1.Set(this.m_v3)
            }
            var C = 1 / (g + _ + x);
            this.m_v1.a = g * C, this.m_v2.a = _ * C, this.m_v3.a = x * C, this.m_count = 3
        }, M.b2SimplexCache = function() {
            this.indexA = new Vector_a2j_Number(3), this.indexB = new Vector_a2j_Number(3)
        }, I.b2SimplexVertex = function() {}, I.prototype.Set = function(t) {
            this.wA.SetV(t.wA), this.wB.SetV(t.wB), this.w.SetV(t.w), this.a = t.a, this.indexA = t.indexA, this.indexB = t.indexB
        }, P.b2TimeOfImpact = function() {}, P.TimeOfImpact = function(t) {
            ++P.b2_toiCalls;
            var e = t.proxyA,
                i = t.proxyB,
                s = t.sweepA,
                o = t.sweepB;
            r.b2Assert(s.t0 == o.t0), r.b2Assert(1 - s.t0 > Number.MIN_VALUE);
            var a = e.m_radius + i.m_radius,
                l = t.tolerance,
                h = 0,
                c = 0,
                u = 0;
            for (P.s_cache.count = 0, P.s_distanceInput.useRadii = !1;;) {
                if (s.GetTransform(P.s_xfA, h), o.GetTransform(P.s_xfB, h), P.s_distanceInput.proxyA = e, P.s_distanceInput.proxyB = i, P.s_distanceInput.transformA = P.s_xfA, P.s_distanceInput.transformB = P.s_xfB, m.Distance(P.s_distanceOutput, P.s_cache, P.s_distanceInput), P.s_distanceOutput.distance <= 0) {
                    h = 1;
                    break
                }
                P.s_fcn.Initialize(P.s_cache, e, P.s_xfA, i, P.s_xfB);
                var d = P.s_fcn.Evaluate(P.s_xfA, P.s_xfB);
                if (d <= 0) {
                    h = 1;
                    break
                }
                if (0 == c && (u = d > a ? n.Max(a - l, .75 * a) : n.Max(d - l, .02 * a)), d - u < .5 * l) {
                    if (0 == c) {
                        h = 1;
                        break
                    }
                    break
                }
                var p = h,
                    f = h,
                    y = 1,
                    g = d;
                s.GetTransform(P.s_xfA, y), o.GetTransform(P.s_xfB, y);
                var _ = P.s_fcn.Evaluate(P.s_xfA, P.s_xfB);
                if (_ >= u) {
                    h = 1;
                    break
                }
                for (var x = 0;;) {
                    var v = 0;
                    v = 1 & x ? f + (u - g) * (y - f) / (_ - g) : .5 * (f + y), s.GetTransform(P.s_xfA, v), o.GetTransform(P.s_xfB, v);
                    var b = P.s_fcn.Evaluate(P.s_xfA, P.s_xfB);
                    if (n.Abs(b - u) < .025 * l) {
                        p = v;
                        break
                    }
                    if (b > u ? (f = v, g = b) : (y = v, _ = b), ++x, ++P.b2_toiRootIters, 50 == x) break
                }
                if (P.b2_toiMaxRootIters = n.Max(P.b2_toiMaxRootIters, x), p < (1 + 100 * Number.MIN_VALUE) * h) break;
                if (h = p, c++, ++P.b2_toiIters, 1e3 == c) break
            }
            return P.b2_toiMaxIters = n.Max(P.b2_toiMaxIters, c), h
        }, Box2D.postDefs.push((function() {
            Box2D.Collision.b2TimeOfImpact.b2_toiCalls = 0, Box2D.Collision.b2TimeOfImpact.b2_toiIters = 0, Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0, Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0, Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0, Box2D.Collision.b2TimeOfImpact.s_cache = new M, Box2D.Collision.b2TimeOfImpact.s_distanceInput = new f, Box2D.Collision.b2TimeOfImpact.s_xfA = new o, Box2D.Collision.b2TimeOfImpact.s_xfB = new o, Box2D.Collision.b2TimeOfImpact.s_fcn = new E, Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new y
        })), R.b2TOIInput = function() {
            this.proxyA = new g, this.proxyB = new g, this.sweepA = new s, this.sweepB = new s
        }, k.b2WorldManifold = function() {
            this.m_normal = new a
        }, k.prototype.b2WorldManifold = function() {
            this.m_points = new Vector(r.b2_maxManifoldPoints);
            for (var t = 0; t < r.b2_maxManifoldPoints; t++) this.m_points[t] = new a
        }, k.prototype.Initialize = function(t, e, i, r, n) {
            if (void 0 === i && (i = 0), void 0 === n && (n = 0), 0 != t.m_pointCount) {
                var s, o, a = 0,
                    l = 0,
                    h = 0,
                    c = 0,
                    u = 0,
                    d = 0,
                    p = 0;
                switch (t.m_type) {
                    case w.e_circles:
                        o = e.R, s = t.m_localPoint;
                        var m = e.position.x + o.col1.x * s.x + o.col2.x * s.y,
                            f = e.position.y + o.col1.y * s.x + o.col2.y * s.y;
                        o = r.R, s = t.m_points[0].m_localPoint;
                        var y = r.position.x + o.col1.x * s.x + o.col2.x * s.y,
                            g = r.position.y + o.col1.y * s.x + o.col2.y * s.y,
                            _ = y - m,
                            x = g - f,
                            v = _ * _ + x * x;
                        if (v > Number.MIN_VALUE * Number.MIN_VALUE) {
                            var b = Math.sqrt(v);
                            this.m_normal.x = _ / b, this.m_normal.y = x / b
                        } else this.m_normal.x = 1, this.m_normal.y = 0;
                        var C = m + i * this.m_normal.x,
                            S = f + i * this.m_normal.y,
                            T = y - n * this.m_normal.x,
                            A = g - n * this.m_normal.y;
                        this.m_points[0].x = .5 * (C + T), this.m_points[0].y = .5 * (S + A);
                        break;
                    case w.e_faceA:
                        for (o = e.R, s = t.m_localPlaneNormal, l = o.col1.x * s.x + o.col2.x * s.y, h = o.col1.y * s.x + o.col2.y * s.y, o = e.R, s = t.m_localPoint, c = e.position.x + o.col1.x * s.x + o.col2.x * s.y, u = e.position.y + o.col1.y * s.x + o.col2.y * s.y, this.m_normal.x = l, this.m_normal.y = h, a = 0; a < t.m_pointCount; a++) o = r.R, s = t.m_points[a].m_localPoint, d = r.position.x + o.col1.x * s.x + o.col2.x * s.y, p = r.position.y + o.col1.y * s.x + o.col2.y * s.y, this.m_points[a].x = d + .5 * (i - (d - c) * l - (p - u) * h - n) * l, this.m_points[a].y = p + .5 * (i - (d - c) * l - (p - u) * h - n) * h;
                        break;
                    case w.e_faceB:
                        for (o = r.R, s = t.m_localPlaneNormal, l = o.col1.x * s.x + o.col2.x * s.y, h = o.col1.y * s.x + o.col2.y * s.y, o = r.R, s = t.m_localPoint, c = r.position.x + o.col1.x * s.x + o.col2.x * s.y, u = r.position.y + o.col1.y * s.x + o.col2.y * s.y, this.m_normal.x = -l, this.m_normal.y = -h, a = 0; a < t.m_pointCount; a++) o = e.R, s = t.m_points[a].m_localPoint, d = e.position.x + o.col1.x * s.x + o.col2.x * s.y, p = e.position.y + o.col1.y * s.x + o.col2.y * s.y, this.m_points[a].x = d + .5 * (n - (d - c) * l - (p - u) * h - i) * l, this.m_points[a].y = p + .5 * (n - (d - c) * l - (p - u) * h - i) * h
                }
            }
        }, F.ClipVertex = function() {
            this.v = new a, this.id = new d
        }, F.prototype.Set = function(t) {
            this.v.SetV(t.v), this.id.Set(t.id)
        }, L.Features = function() {}, Object.defineProperty(L.prototype, "referenceEdge", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return this._referenceEdge
            }
        }), Object.defineProperty(L.prototype, "referenceEdge", {
            enumerable: !1,
            configurable: !0,
            set: function(t) {
                void 0 === t && (t = 0), this._referenceEdge = t, this._m_id._key = 4294967040 & this._m_id._key | 255 & this._referenceEdge
            }
        }), Object.defineProperty(L.prototype, "incidentEdge", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return this._incidentEdge
            }
        }), Object.defineProperty(L.prototype, "incidentEdge", {
            enumerable: !1,
            configurable: !0,
            set: function(t) {
                void 0 === t && (t = 0), this._incidentEdge = t, this._m_id._key = 4294902015 & this._m_id._key | this._incidentEdge << 8 & 65280
            }
        }), Object.defineProperty(L.prototype, "incidentVertex", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return this._incidentVertex
            }
        }), Object.defineProperty(L.prototype, "incidentVertex", {
            enumerable: !1,
            configurable: !0,
            set: function(t) {
                void 0 === t && (t = 0), this._incidentVertex = t, this._m_id._key = 4278255615 & this._m_id._key | this._incidentVertex << 16 & 16711680
            }
        }), Object.defineProperty(L.prototype, "flip", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return this._flip
            }
        }), Object.defineProperty(L.prototype, "flip", {
            enumerable: !1,
            configurable: !0,
            set: function(t) {
                void 0 === t && (t = 0), this._flip = t, this._m_id._key = 16777215 & this._m_id._key | this._flip << 24 & 4278190080
            }
        })
    }(), function() {
        Box2D.Common.b2Color, Box2D.Common.b2internal;
        var t = Box2D.Common.b2Settings,
            e = Box2D.Collision.Shapes.b2CircleShape,
            i = Box2D.Collision.Shapes.b2EdgeChainDef,
            r = Box2D.Collision.Shapes.b2EdgeShape,
            n = Box2D.Collision.Shapes.b2MassData,
            s = Box2D.Collision.Shapes.b2PolygonShape,
            o = Box2D.Collision.Shapes.b2Shape,
            a = Box2D.Common.Math.b2Mat22,
            l = (Box2D.Common.Math.b2Mat33, Box2D.Common.Math.b2Math),
            h = (Box2D.Common.Math.b2Sweep, Box2D.Common.Math.b2Transform),
            c = Box2D.Common.Math.b2Vec2,
            u = (Box2D.Common.Math.b2Vec3, Box2D.Dynamics.b2Body, Box2D.Dynamics.b2BodyDef, Box2D.Dynamics.b2ContactFilter, Box2D.Dynamics.b2ContactImpulse, Box2D.Dynamics.b2ContactListener, Box2D.Dynamics.b2ContactManager, Box2D.Dynamics.b2DebugDraw, Box2D.Dynamics.b2DestructionListener, Box2D.Dynamics.b2FilterData, Box2D.Dynamics.b2Fixture, Box2D.Dynamics.b2FixtureDef, Box2D.Dynamics.b2Island, Box2D.Dynamics.b2TimeStep, Box2D.Dynamics.b2World, Box2D.Collision.b2AABB, Box2D.Collision.b2Bound, Box2D.Collision.b2BoundValues, Box2D.Collision.b2Collision, Box2D.Collision.b2ContactID, Box2D.Collision.b2ContactPoint, Box2D.Collision.b2Distance),
            d = Box2D.Collision.b2DistanceInput,
            p = Box2D.Collision.b2DistanceOutput,
            m = Box2D.Collision.b2DistanceProxy,
            f = (Box2D.Collision.b2DynamicTree, Box2D.Collision.b2DynamicTreeBroadPhase, Box2D.Collision.b2DynamicTreeNode, Box2D.Collision.b2DynamicTreePair, Box2D.Collision.b2Manifold, Box2D.Collision.b2ManifoldPoint, Box2D.Collision.b2Point, Box2D.Collision.b2RayCastInput, Box2D.Collision.b2RayCastOutput, Box2D.Collision.b2Segment, Box2D.Collision.b2SeparationFunction, Box2D.Collision.b2Simplex, Box2D.Collision.b2SimplexCache);
        Box2D.Collision.b2SimplexVertex, Box2D.Collision.b2TimeOfImpact, Box2D.Collision.b2TOIInput, Box2D.Collision.b2WorldManifold, Box2D.Collision.ClipVertex, Box2D.Collision.Features, Box2D.Collision.IBroadPhase;
        Box2D.inherit(e, Box2D.Collision.Shapes.b2Shape), e.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype, e.b2CircleShape = function() {
            Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments), this.m_p = new c
        }, e.prototype.Copy = function() {
            var t = new e;
            return t.Set(this), t
        }, e.prototype.Set = function(t) {
            if (this.__super.Set.call(this, t), Box2D.is(t, e)) {
                var i = t instanceof e ? t : null;
                this.m_p.SetV(i.m_p)
            }
        }, e.prototype.TestPoint = function(t, e) {
            var i = t.R,
                r = t.position.x + (i.col1.x * this.m_p.x + i.col2.x * this.m_p.y),
                n = t.position.y + (i.col1.y * this.m_p.x + i.col2.y * this.m_p.y);
            return (r = e.x - r) * r + (n = e.y - n) * n <= this.m_radius * this.m_radius
        }, e.prototype.RayCast = function(t, e, i) {
            var r = i.R,
                n = i.position.x + (r.col1.x * this.m_p.x + r.col2.x * this.m_p.y),
                s = i.position.y + (r.col1.y * this.m_p.x + r.col2.y * this.m_p.y),
                o = e.p1.x - n,
                a = e.p1.y - s,
                l = o * o + a * a - this.m_radius * this.m_radius,
                h = e.p2.x - e.p1.x,
                c = e.p2.y - e.p1.y,
                u = o * h + a * c,
                d = h * h + c * c,
                p = u * u - d * l;
            if (p < 0 || d < Number.MIN_VALUE) return !1;
            var m = -(u + Math.sqrt(p));
            return 0 <= m && m <= e.maxFraction * d && (m /= d, t.fraction = m, t.normal.x = o + m * h, t.normal.y = a + m * c, t.normal.Normalize(), !0)
        }, e.prototype.ComputeAABB = function(t, e) {
            var i = e.R,
                r = e.position.x + (i.col1.x * this.m_p.x + i.col2.x * this.m_p.y),
                n = e.position.y + (i.col1.y * this.m_p.x + i.col2.y * this.m_p.y);
            t.lowerBound.Set(r - this.m_radius, n - this.m_radius), t.upperBound.Set(r + this.m_radius, n + this.m_radius)
        }, e.prototype.ComputeMass = function(e, i) {
            void 0 === i && (i = 0), e.mass = i * t.b2_pi * this.m_radius * this.m_radius, e.center.SetV(this.m_p), e.I = e.mass * (.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y))
        }, e.prototype.ComputeSubmergedArea = function(t, e, i, r) {
            void 0 === e && (e = 0);
            var n = l.MulX(i, this.m_p),
                s = -(l.Dot(t, n) - e);
            if (s < -this.m_radius + Number.MIN_VALUE) return 0;
            if (s > this.m_radius) return r.SetV(n), Math.PI * this.m_radius * this.m_radius;
            var o = this.m_radius * this.m_radius,
                a = s * s,
                h = o * (Math.asin(s / this.m_radius) + Math.PI / 2) + s * Math.sqrt(o - a),
                c = -2 / 3 * Math.pow(o - a, 1.5) / h;
            return r.x = n.x + t.x * c, r.y = n.y + t.y * c, h
        }, e.prototype.GetLocalPosition = function() {
            return this.m_p
        }, e.prototype.SetLocalPosition = function(t) {
            this.m_p.SetV(t)
        }, e.prototype.GetRadius = function() {
            return this.m_radius
        }, e.prototype.SetRadius = function(t) {
            void 0 === t && (t = 0), this.m_radius = t
        }, e.prototype.b2CircleShape = function(t) {
            void 0 === t && (t = 0), this.__super.b2Shape.call(this), this.m_type = o.e_circleShape, this.m_radius = t
        }, i.b2EdgeChainDef = function() {}, i.prototype.b2EdgeChainDef = function() {
            this.vertexCount = 0, this.isALoop = !0, this.vertices = []
        }, Box2D.inherit(r, Box2D.Collision.Shapes.b2Shape), r.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype, r.b2EdgeShape = function() {
            Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments), this.s_supportVec = new c, this.m_v1 = new c, this.m_v2 = new c, this.m_coreV1 = new c, this.m_coreV2 = new c, this.m_normal = new c, this.m_direction = new c, this.m_cornerDir1 = new c, this.m_cornerDir2 = new c
        }, r.prototype.TestPoint = function(t, e) {
            return !1
        }, r.prototype.RayCast = function(t, e, i) {
            var r, n = e.p2.x - e.p1.x,
                s = e.p2.y - e.p1.y;
            r = i.R;
            var o = i.position.x + (r.col1.x * this.m_v1.x + r.col2.x * this.m_v1.y),
                a = i.position.y + (r.col1.y * this.m_v1.x + r.col2.y * this.m_v1.y),
                l = i.position.y + (r.col1.y * this.m_v2.x + r.col2.y * this.m_v2.y) - a,
                h = -(i.position.x + (r.col1.x * this.m_v2.x + r.col2.x * this.m_v2.y) - o),
                c = 100 * Number.MIN_VALUE,
                u = -(n * l + s * h);
            if (u > c) {
                var d = e.p1.x - o,
                    p = e.p1.y - a,
                    m = d * l + p * h;
                if (0 <= m && m <= e.maxFraction * u) {
                    var f = -n * p + s * d;
                    if (-c * u <= f && f <= u * (1 + c)) {
                        m /= u, t.fraction = m;
                        var y = Math.sqrt(l * l + h * h);
                        return t.normal.x = l / y, t.normal.y = h / y, !0
                    }
                }
            }
            return !1
        }, r.prototype.ComputeAABB = function(t, e) {
            var i = e.R,
                r = e.position.x + (i.col1.x * this.m_v1.x + i.col2.x * this.m_v1.y),
                n = e.position.y + (i.col1.y * this.m_v1.x + i.col2.y * this.m_v1.y),
                s = e.position.x + (i.col1.x * this.m_v2.x + i.col2.x * this.m_v2.y),
                o = e.position.y + (i.col1.y * this.m_v2.x + i.col2.y * this.m_v2.y);
            r < s ? (t.lowerBound.x = r, t.upperBound.x = s) : (t.lowerBound.x = s, t.upperBound.x = r), n < o ? (t.lowerBound.y = n, t.upperBound.y = o) : (t.lowerBound.y = o, t.upperBound.y = n)
        }, r.prototype.ComputeMass = function(t, e) {
            void 0 === e && (e = 0), t.mass = 0, t.center.SetV(this.m_v1), t.I = 0
        }, r.prototype.ComputeSubmergedArea = function(t, e, i, r) {
            void 0 === e && (e = 0);
            var n = new c(t.x * e, t.y * e),
                s = l.MulX(i, this.m_v1),
                o = l.MulX(i, this.m_v2),
                a = l.Dot(t, s) - e,
                h = l.Dot(t, o) - e;
            if (a > 0) {
                if (h > 0) return 0;
                s.x = -h / (a - h) * s.x + a / (a - h) * o.x, s.y = -h / (a - h) * s.y + a / (a - h) * o.y
            } else h > 0 && (o.x = -h / (a - h) * s.x + a / (a - h) * o.x, o.y = -h / (a - h) * s.y + a / (a - h) * o.y);
            return r.x = (n.x + s.x + o.x) / 3, r.y = (n.y + s.y + o.y) / 3, .5 * ((s.x - n.x) * (o.y - n.y) - (s.y - n.y) * (o.x - n.x))
        }, r.prototype.GetLength = function() {
            return this.m_length
        }, r.prototype.GetVertex1 = function() {
            return this.m_v1
        }, r.prototype.GetVertex2 = function() {
            return this.m_v2
        }, r.prototype.GetCoreVertex1 = function() {
            return this.m_coreV1
        }, r.prototype.GetCoreVertex2 = function() {
            return this.m_coreV2
        }, r.prototype.GetNormalVector = function() {
            return this.m_normal
        }, r.prototype.GetDirectionVector = function() {
            return this.m_direction
        }, r.prototype.GetCorner1Vector = function() {
            return this.m_cornerDir1
        }, r.prototype.GetCorner2Vector = function() {
            return this.m_cornerDir2
        }, r.prototype.Corner1IsConvex = function() {
            return this.m_cornerConvex1
        }, r.prototype.Corner2IsConvex = function() {
            return this.m_cornerConvex2
        }, r.prototype.GetFirstVertex = function(t) {
            var e = t.R;
            return new c(t.position.x + (e.col1.x * this.m_coreV1.x + e.col2.x * this.m_coreV1.y), t.position.y + (e.col1.y * this.m_coreV1.x + e.col2.y * this.m_coreV1.y))
        }, r.prototype.GetNextEdge = function() {
            return this.m_nextEdge
        }, r.prototype.GetPrevEdge = function() {
            return this.m_prevEdge
        }, r.prototype.Support = function(t, e, i) {
            void 0 === e && (e = 0), void 0 === i && (i = 0);
            var r = t.R,
                n = t.position.x + (r.col1.x * this.m_coreV1.x + r.col2.x * this.m_coreV1.y),
                s = t.position.y + (r.col1.y * this.m_coreV1.x + r.col2.y * this.m_coreV1.y),
                o = t.position.x + (r.col1.x * this.m_coreV2.x + r.col2.x * this.m_coreV2.y),
                a = t.position.y + (r.col1.y * this.m_coreV2.x + r.col2.y * this.m_coreV2.y);
            return n * e + s * i > o * e + a * i ? (this.s_supportVec.x = n, this.s_supportVec.y = s) : (this.s_supportVec.x = o, this.s_supportVec.y = a), this.s_supportVec
        }, r.prototype.b2EdgeShape = function(e, i) {
            this.__super.b2Shape.call(this), this.m_type = o.e_edgeShape, this.m_prevEdge = null, this.m_nextEdge = null, this.m_v1 = e, this.m_v2 = i, this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y), this.m_length = this.m_direction.Normalize(), this.m_normal.Set(this.m_direction.y, -this.m_direction.x), this.m_coreV1.Set(-t.b2_toiSlop * (this.m_normal.x - this.m_direction.x) + this.m_v1.x, -t.b2_toiSlop * (this.m_normal.y - this.m_direction.y) + this.m_v1.y), this.m_coreV2.Set(-t.b2_toiSlop * (this.m_normal.x + this.m_direction.x) + this.m_v2.x, -t.b2_toiSlop * (this.m_normal.y + this.m_direction.y) + this.m_v2.y), this.m_cornerDir1 = this.m_normal, this.m_cornerDir2.Set(-this.m_normal.x, -this.m_normal.y)
        }, r.prototype.SetPrevEdge = function(t, e, i, r) {
            this.m_prevEdge = t, this.m_coreV1 = e, this.m_cornerDir1 = i, this.m_cornerConvex1 = r
        }, r.prototype.SetNextEdge = function(t, e, i, r) {
            this.m_nextEdge = t, this.m_coreV2 = e, this.m_cornerDir2 = i, this.m_cornerConvex2 = r
        }, n.b2MassData = function() {
            this.mass = 0, this.center = new c(0, 0), this.I = 0
        }, Box2D.inherit(s, Box2D.Collision.Shapes.b2Shape), s.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype, s.b2PolygonShape = function() {
            Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments)
        }, s.prototype.Copy = function() {
            var t = new s;
            return t.Set(this), t
        }, s.prototype.Set = function(t) {
            if (this.__super.Set.call(this, t), Box2D.is(t, s)) {
                var e = t instanceof s ? t : null;
                this.m_centroid.SetV(e.m_centroid), this.m_vertexCount = e.m_vertexCount, this.Reserve(this.m_vertexCount);
                for (var i = 0; i < this.m_vertexCount; i++) this.m_vertices[i].SetV(e.m_vertices[i]), this.m_normals[i].SetV(e.m_normals[i])
            }
        }, s.prototype.SetAsArray = function(t, e) {
            void 0 === e && (e = 0);
            var i, r = new Vector,
                n = 0;
            for (n = 0; n < t.length; ++n) i = t[n], r.push(i);
            this.SetAsVector(r, e)
        }, s.AsArray = function(t, e) {
            void 0 === e && (e = 0);
            var i = new s;
            return i.SetAsArray(t, e), i
        }, s.prototype.SetAsVector = function(e, i) {
            void 0 === i && (i = 0), 0 == i && (i = e.length), t.b2Assert(2 <= i), this.m_vertexCount = i, this.Reserve(i);
            var r = 0;
            for (r = 0; r < this.m_vertexCount; r++) this.m_vertices[r].SetV(e[r]);
            for (r = 0; r < this.m_vertexCount; ++r) {
                var n = parseInt(r),
                    o = parseInt(r + 1 < this.m_vertexCount ? r + 1 : 0),
                    a = l.SubtractVV(this.m_vertices[o], this.m_vertices[n]);
                t.b2Assert(a.LengthSquared() > Number.MIN_VALUE), this.m_normals[r].SetV(l.CrossVF(a, 1)), this.m_normals[r].Normalize()
            }
            this.m_centroid = s.ComputeCentroid(this.m_vertices, this.m_vertexCount)
        }, s.AsVector = function(t, e) {
            void 0 === e && (e = 0);
            var i = new s;
            return i.SetAsVector(t, e), i
        }, s.prototype.SetAsBox = function(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this.m_vertexCount = 4, this.Reserve(4), this.m_vertices[0].Set(-t, -e), this.m_vertices[1].Set(t, -e), this.m_vertices[2].Set(t, e), this.m_vertices[3].Set(-t, e), this.m_normals[0].Set(0, -1), this.m_normals[1].Set(1, 0), this.m_normals[2].Set(0, 1), this.m_normals[3].Set(-1, 0), this.m_centroid.SetZero()
        }, s.AsBox = function(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0);
            var i = new s;
            return i.SetAsBox(t, e), i
        }, s.prototype.SetAsOrientedBox = function(t, e, i, r) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = null), void 0 === r && (r = 0), this.m_vertexCount = 4, this.Reserve(4), this.m_vertices[0].Set(-t, -e), this.m_vertices[1].Set(t, -e), this.m_vertices[2].Set(t, e), this.m_vertices[3].Set(-t, e), this.m_normals[0].Set(0, -1), this.m_normals[1].Set(1, 0), this.m_normals[2].Set(0, 1), this.m_normals[3].Set(-1, 0), this.m_centroid = i;
            var n = new h;
            n.position = i, n.R.Set(r);
            for (var s = 0; s < this.m_vertexCount; ++s) this.m_vertices[s] = l.MulX(n, this.m_vertices[s]), this.m_normals[s] = l.MulMV(n.R, this.m_normals[s])
        }, s.AsOrientedBox = function(t, e, i, r) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = null), void 0 === r && (r = 0);
            var n = new s;
            return n.SetAsOrientedBox(t, e, i, r), n
        }, s.prototype.SetAsEdge = function(t, e) {
            this.m_vertexCount = 2, this.Reserve(2), this.m_vertices[0].SetV(t), this.m_vertices[1].SetV(e), this.m_centroid.x = .5 * (t.x + e.x), this.m_centroid.y = .5 * (t.y + e.y), this.m_normals[0] = l.CrossVF(l.SubtractVV(e, t), 1), this.m_normals[0].Normalize(), this.m_normals[1].x = -this.m_normals[0].x, this.m_normals[1].y = -this.m_normals[0].y
        }, s.AsEdge = function(t, e) {
            var i = new s;
            return i.SetAsEdge(t, e), i
        }, s.prototype.TestPoint = function(t, e) {
            for (var i, r = t.R, n = e.x - t.position.x, s = e.y - t.position.y, o = n * r.col1.x + s * r.col1.y, a = n * r.col2.x + s * r.col2.y, l = 0; l < this.m_vertexCount; ++l) {
                if (n = o - (i = this.m_vertices[l]).x, s = a - i.y, (i = this.m_normals[l]).x * n + i.y * s > 0) return !1
            }
            return !0
        }, s.prototype.RayCast = function(t, e, i) {
            var r, n, s = 0,
                o = e.maxFraction,
                a = 0,
                l = 0;
            a = e.p1.x - i.position.x, l = e.p1.y - i.position.y;
            var h = a * (r = i.R).col1.x + l * r.col1.y,
                c = a * r.col2.x + l * r.col2.y;
            a = e.p2.x - i.position.x, l = e.p2.y - i.position.y;
            for (var u = a * (r = i.R).col1.x + l * r.col1.y - h, d = a * r.col2.x + l * r.col2.y - c, p = parseInt(-1), m = 0; m < this.m_vertexCount; ++m) {
                a = (n = this.m_vertices[m]).x - h, l = n.y - c;
                var f = (n = this.m_normals[m]).x * a + n.y * l,
                    y = n.x * u + n.y * d;
                if (0 == y) {
                    if (f < 0) return !1
                } else y < 0 && f < s * y ? (s = f / y, p = m) : y > 0 && f < o * y && (o = f / y);
                if (o < s - Number.MIN_VALUE) return !1
            }
            return p >= 0 && (t.fraction = s, r = i.R, n = this.m_normals[p], t.normal.x = r.col1.x * n.x + r.col2.x * n.y, t.normal.y = r.col1.y * n.x + r.col2.y * n.y, !0)
        }, s.prototype.ComputeAABB = function(t, e) {
            for (var i = e.R, r = this.m_vertices[0], n = e.position.x + (i.col1.x * r.x + i.col2.x * r.y), s = e.position.y + (i.col1.y * r.x + i.col2.y * r.y), o = n, a = s, l = 1; l < this.m_vertexCount; ++l) {
                r = this.m_vertices[l];
                var h = e.position.x + (i.col1.x * r.x + i.col2.x * r.y),
                    c = e.position.y + (i.col1.y * r.x + i.col2.y * r.y);
                n = n < h ? n : h, s = s < c ? s : c, o = o > h ? o : h, a = a > c ? a : c
            }
            t.lowerBound.x = n - this.m_radius, t.lowerBound.y = s - this.m_radius, t.upperBound.x = o + this.m_radius, t.upperBound.y = a + this.m_radius
        }, s.prototype.ComputeMass = function(t, e) {
            if (void 0 === e && (e = 0), 2 == this.m_vertexCount) return t.center.x = .5 * (this.m_vertices[0].x + this.m_vertices[1].x), t.center.y = .5 * (this.m_vertices[0].y + this.m_vertices[1].y), t.mass = 0, void(t.I = 0);
            for (var i = 0, r = 0, n = 0, s = 0, o = 1 / 3, a = 0; a < this.m_vertexCount; ++a) {
                var l = this.m_vertices[a],
                    h = a + 1 < this.m_vertexCount ? this.m_vertices[parseInt(a + 1)] : this.m_vertices[0],
                    c = l.x - 0,
                    u = l.y - 0,
                    d = h.x - 0,
                    p = h.y - 0,
                    m = c * p - u * d,
                    f = .5 * m;
                n += f, i += f * o * (0 + l.x + h.x), r += f * o * (0 + l.y + h.y);
                s += m * (o * (.25 * (c * c + d * c + d * d) + (0 * c + 0 * d)) + 0 + (o * (.25 * (u * u + p * u + p * p) + (0 * u + 0 * p)) + 0))
            }
            t.mass = e * n, i *= 1 / n, r *= 1 / n, t.center.Set(i, r), t.I = e * s
        }, s.prototype.ComputeSubmergedArea = function(t, e, i, r) {
            void 0 === e && (e = 0);
            var s = l.MulTMV(i.R, t),
                o = e - l.Dot(t, i.position),
                a = new Vector_a2j_Number,
                h = 0,
                u = parseInt(-1),
                d = parseInt(-1),
                p = !1,
                m = 0;
            for (m = 0; m < this.m_vertexCount; ++m) {
                a[m] = l.Dot(s, this.m_vertices[m]) - o;
                var f = a[m] < -Number.MIN_VALUE;
                m > 0 && (f ? p || (u = m - 1, h++) : p && (d = m - 1, h++)), p = f
            }
            switch (h) {
                case 0:
                    if (p) {
                        var y = new n;
                        return this.ComputeMass(y, 1), r.SetV(l.MulX(i, y.center)), y.mass
                    }
                    return 0;
                case 1:
                    -1 == u ? u = this.m_vertexCount - 1 : d = this.m_vertexCount - 1
            }
            var g, _ = parseInt((u + 1) % this.m_vertexCount),
                x = parseInt((d + 1) % this.m_vertexCount),
                v = (0 - a[u]) / (a[_] - a[u]),
                b = (0 - a[d]) / (a[x] - a[d]),
                w = new c(this.m_vertices[u].x * (1 - v) + this.m_vertices[_].x * v, this.m_vertices[u].y * (1 - v) + this.m_vertices[_].y * v),
                C = new c(this.m_vertices[d].x * (1 - b) + this.m_vertices[x].x * b, this.m_vertices[d].y * (1 - b) + this.m_vertices[x].y * b),
                S = 0,
                T = new c,
                A = this.m_vertices[_];
            for (m = _; m != x;) {
                g = (m = (m + 1) % this.m_vertexCount) == x ? C : this.m_vertices[m];
                var D = .5 * ((A.x - w.x) * (g.y - w.y) - (A.y - w.y) * (g.x - w.x));
                S += D, T.x += D * (w.x + A.x + g.x) / 3, T.y += D * (w.y + A.y + g.y) / 3, A = g
            }
            return T.Multiply(1 / S), r.SetV(l.MulX(i, T)), S
        }, s.prototype.GetVertexCount = function() {
            return this.m_vertexCount
        }, s.prototype.GetVertices = function() {
            return this.m_vertices
        }, s.prototype.GetNormals = function() {
            return this.m_normals
        }, s.prototype.GetSupport = function(t) {
            for (var e = 0, i = this.m_vertices[0].x * t.x + this.m_vertices[0].y * t.y, r = 1; r < this.m_vertexCount; ++r) {
                var n = this.m_vertices[r].x * t.x + this.m_vertices[r].y * t.y;
                n > i && (e = r, i = n)
            }
            return e
        }, s.prototype.GetSupportVertex = function(t) {
            for (var e = 0, i = this.m_vertices[0].x * t.x + this.m_vertices[0].y * t.y, r = 1; r < this.m_vertexCount; ++r) {
                var n = this.m_vertices[r].x * t.x + this.m_vertices[r].y * t.y;
                n > i && (e = r, i = n)
            }
            return this.m_vertices[e]
        }, s.prototype.Validate = function() {
            return !1
        }, s.prototype.b2PolygonShape = function() {
            this.__super.b2Shape.call(this), this.m_type = o.e_polygonShape, this.m_centroid = new c, this.m_vertices = new Vector, this.m_normals = new Vector
        }, s.prototype.Reserve = function(t) {
            void 0 === t && (t = 0);
            for (var e = parseInt(this.m_vertices.length); e < t; e++) this.m_vertices[e] = new c, this.m_normals[e] = new c
        }, s.ComputeCentroid = function(t, e) {
            void 0 === e && (e = 0);
            for (var i = new c, r = 0, n = 1 / 3, s = 0; s < e; ++s) {
                var o = t[s],
                    a = s + 1 < e ? t[parseInt(s + 1)] : t[0],
                    l = o.x - 0,
                    h = o.y - 0,
                    u = a.x - 0,
                    d = .5 * (l * (a.y - 0) - h * u);
                r += d, i.x += d * n * (0 + o.x + a.x), i.y += d * n * (0 + o.y + a.y)
            }
            return i.x *= 1 / r, i.y *= 1 / r, i
        }, s.ComputeOBB = function(t, e, i) {
            void 0 === i && (i = 0);
            var r = 0,
                n = new Vector(i + 1);
            for (r = 0; r < i; ++r) n[r] = e[r];
            n[i] = n[0];
            var s = Number.MAX_VALUE;
            for (r = 1; r <= i; ++r) {
                for (var o = n[parseInt(r - 1)], a = n[r].x - o.x, l = n[r].y - o.y, h = Math.sqrt(a * a + l * l), c = -(l /= h), u = a /= h, d = Number.MAX_VALUE, p = Number.MAX_VALUE, m = -Number.MAX_VALUE, f = -Number.MAX_VALUE, y = 0; y < i; ++y) {
                    var g = n[y].x - o.x,
                        _ = n[y].y - o.y,
                        x = a * g + l * _,
                        v = c * g + u * _;
                    x < d && (d = x), v < p && (p = v), x > m && (m = x), v > f && (f = v)
                }
                var b = (m - d) * (f - p);
                if (b < .95 * s) {
                    s = b, t.R.col1.x = a, t.R.col1.y = l, t.R.col2.x = c, t.R.col2.y = u;
                    var w = .5 * (d + m),
                        C = .5 * (p + f),
                        S = t.R;
                    t.center.x = o.x + (S.col1.x * w + S.col2.x * C), t.center.y = o.y + (S.col1.y * w + S.col2.y * C), t.extents.x = .5 * (m - d), t.extents.y = .5 * (f - p)
                }
            }
        }, Box2D.postDefs.push((function() {
            Box2D.Collision.Shapes.b2PolygonShape.s_mat = new a
        })), o.b2Shape = function() {}, o.prototype.Copy = function() {
            return null
        }, o.prototype.Set = function(t) {
            this.m_radius = t.m_radius
        }, o.prototype.GetType = function() {
            return this.m_type
        }, o.prototype.TestPoint = function(t, e) {
            return !1
        }, o.prototype.RayCast = function(t, e, i) {
            return !1
        }, o.prototype.ComputeAABB = function(t, e) {}, o.prototype.ComputeMass = function(t, e) {
            void 0 === e && (e = 0)
        }, o.prototype.ComputeSubmergedArea = function(t, e, i, r) {
            return void 0 === e && (e = 0), 0
        }, o.TestOverlap = function(t, e, i, r) {
            var n = new d;
            n.proxyA = new m, n.proxyA.Set(t), n.proxyB = new m, n.proxyB.Set(i), n.transformA = e, n.transformB = r, n.useRadii = !0;
            var s = new f;
            s.count = 0;
            var o = new p;
            return u.Distance(o, s, n), o.distance < 10 * Number.MIN_VALUE
        }, o.prototype.b2Shape = function() {
            this.m_type = o.e_unknownShape, this.m_radius = t.b2_linearSlop
        }, Box2D.postDefs.push((function() {
            Box2D.Collision.Shapes.b2Shape.e_unknownShape = parseInt(-1), Box2D.Collision.Shapes.b2Shape.e_circleShape = 0, Box2D.Collision.Shapes.b2Shape.e_polygonShape = 1, Box2D.Collision.Shapes.b2Shape.e_edgeShape = 2, Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount = 3, Box2D.Collision.Shapes.b2Shape.e_hitCollide = 1, Box2D.Collision.Shapes.b2Shape.e_missCollide = 0, Box2D.Collision.Shapes.b2Shape.e_startsInsideCollide = parseInt(-1)
        }))
    }(), function() {
        var t = Box2D.Common.b2Color,
            e = (Box2D.Common.b2internal, Box2D.Common.b2Settings),
            i = (Box2D.Common.Math.b2Mat22, Box2D.Common.Math.b2Mat33, Box2D.Common.Math.b2Math);
        Box2D.Common.Math.b2Sweep, Box2D.Common.Math.b2Transform, Box2D.Common.Math.b2Vec2, Box2D.Common.Math.b2Vec3;
        t.b2Color = function() {
            this._r = 0, this._g = 0, this._b = 0
        }, t.prototype.b2Color = function(t, e, r) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 0), this._r = Box2D.parseUInt(255 * i.Clamp(t, 0, 1)), this._g = Box2D.parseUInt(255 * i.Clamp(e, 0, 1)), this._b = Box2D.parseUInt(255 * i.Clamp(r, 0, 1))
        }, t.prototype.Set = function(t, e, r) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 0), this._r = Box2D.parseUInt(255 * i.Clamp(t, 0, 1)), this._g = Box2D.parseUInt(255 * i.Clamp(e, 0, 1)), this._b = Box2D.parseUInt(255 * i.Clamp(r, 0, 1))
        }, Object.defineProperty(t.prototype, "r", {
            enumerable: !1,
            configurable: !0,
            set: function(t) {
                void 0 === t && (t = 0), this._r = Box2D.parseUInt(255 * i.Clamp(t, 0, 1))
            }
        }), Object.defineProperty(t.prototype, "g", {
            enumerable: !1,
            configurable: !0,
            set: function(t) {
                void 0 === t && (t = 0), this._g = Box2D.parseUInt(255 * i.Clamp(t, 0, 1))
            }
        }), Object.defineProperty(t.prototype, "b", {
            enumerable: !1,
            configurable: !0,
            set: function(t) {
                void 0 === t && (t = 0), this._b = Box2D.parseUInt(255 * i.Clamp(t, 0, 1))
            }
        }), Object.defineProperty(t.prototype, "color", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return this._r << 16 | this._g << 8 | this._b
            }
        }), e.b2Settings = function() {}, e.b2MixFriction = function(t, e) {
            return void 0 === t && (t = 0), void 0 === e && (e = 0), Math.sqrt(t * e)
        }, e.b2MixRestitution = function(t, e) {
            return void 0 === t && (t = 0), void 0 === e && (e = 0), t > e ? t : e
        }, e.b2Assert = function(t) {
            if (!t) throw "Assertion Failed"
        }, Box2D.postDefs.push((function() {
            Box2D.Common.b2Settings.VERSION = "2.1alpha", Box2D.Common.b2Settings.USHRT_MAX = 65535, Box2D.Common.b2Settings.b2_pi = Math.PI, Box2D.Common.b2Settings.b2_maxManifoldPoints = 2, Box2D.Common.b2Settings.b2_aabbExtension = .1, Box2D.Common.b2Settings.b2_aabbMultiplier = 2, Box2D.Common.b2Settings.b2_polygonRadius = 2 * e.b2_linearSlop, Box2D.Common.b2Settings.b2_linearSlop = .005, Box2D.Common.b2Settings.b2_angularSlop = 2 / 180 * e.b2_pi, Box2D.Common.b2Settings.b2_toiSlop = 8 * e.b2_linearSlop, Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland = 32, Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland = 32, Box2D.Common.b2Settings.b2_velocityThreshold = 1, Box2D.Common.b2Settings.b2_maxLinearCorrection = .2, Box2D.Common.b2Settings.b2_maxAngularCorrection = 8 / 180 * e.b2_pi, Box2D.Common.b2Settings.b2_maxTranslation = 2, Box2D.Common.b2Settings.b2_maxTranslationSquared = e.b2_maxTranslation * e.b2_maxTranslation, Box2D.Common.b2Settings.b2_maxRotation = .5 * e.b2_pi, Box2D.Common.b2Settings.b2_maxRotationSquared = e.b2_maxRotation * e.b2_maxRotation, Box2D.Common.b2Settings.b2_contactBaumgarte = .2, Box2D.Common.b2Settings.b2_timeToSleep = .5, Box2D.Common.b2Settings.b2_linearSleepTolerance = .01, Box2D.Common.b2Settings.b2_angularSleepTolerance = 2 / 180 * e.b2_pi
        }))
    }(), function() {
        Box2D.Collision.b2AABB, Box2D.Common.b2Color, Box2D.Common.b2internal, Box2D.Common.b2Settings;
        var t = Box2D.Common.Math.b2Mat22,
            e = Box2D.Common.Math.b2Mat33,
            i = Box2D.Common.Math.b2Math,
            r = Box2D.Common.Math.b2Sweep,
            n = Box2D.Common.Math.b2Transform,
            s = Box2D.Common.Math.b2Vec2,
            o = Box2D.Common.Math.b2Vec3;
        t.b2Mat22 = function() {
            this.col1 = new s, this.col2 = new s
        }, t.prototype.b2Mat22 = function() {
            this.SetIdentity()
        }, t.FromAngle = function(e) {
            void 0 === e && (e = 0);
            var i = new t;
            return i.Set(e), i
        }, t.FromVV = function(e, i) {
            var r = new t;
            return r.SetVV(e, i), r
        }, t.prototype.Set = function(t) {
            void 0 === t && (t = 0);
            var e = Math.cos(t),
                i = Math.sin(t);
            this.col1.x = e, this.col2.x = -i, this.col1.y = i, this.col2.y = e
        }, t.prototype.SetVV = function(t, e) {
            this.col1.SetV(t), this.col2.SetV(e)
        }, t.prototype.Copy = function() {
            var e = new t;
            return e.SetM(this), e
        }, t.prototype.SetM = function(t) {
            this.col1.SetV(t.col1), this.col2.SetV(t.col2)
        }, t.prototype.AddM = function(t) {
            this.col1.x += t.col1.x, this.col1.y += t.col1.y, this.col2.x += t.col2.x, this.col2.y += t.col2.y
        }, t.prototype.SetIdentity = function() {
            this.col1.x = 1, this.col2.x = 0, this.col1.y = 0, this.col2.y = 1
        }, t.prototype.SetZero = function() {
            this.col1.x = 0, this.col2.x = 0, this.col1.y = 0, this.col2.y = 0
        }, t.prototype.GetAngle = function() {
            return Math.atan2(this.col1.y, this.col1.x)
        }, t.prototype.GetInverse = function(t) {
            var e = this.col1.x,
                i = this.col2.x,
                r = this.col1.y,
                n = this.col2.y,
                s = e * n - i * r;
            return 0 != s && (s = 1 / s), t.col1.x = s * n, t.col2.x = -s * i, t.col1.y = -s * r, t.col2.y = s * e, t
        }, t.prototype.Solve = function(t, e, i) {
            void 0 === e && (e = 0), void 0 === i && (i = 0);
            var r = this.col1.x,
                n = this.col2.x,
                s = this.col1.y,
                o = this.col2.y,
                a = r * o - n * s;
            return 0 != a && (a = 1 / a), t.x = a * (o * e - n * i), t.y = a * (r * i - s * e), t
        }, t.prototype.Abs = function() {
            this.col1.Abs(), this.col2.Abs()
        }, e.b2Mat33 = function() {
            this.col1 = new o, this.col2 = new o, this.col3 = new o
        }, e.prototype.b2Mat33 = function(t, e, i) {
            void 0 === t && (t = null), void 0 === e && (e = null), void 0 === i && (i = null), t || e || i ? (this.col1.SetV(t), this.col2.SetV(e), this.col3.SetV(i)) : (this.col1.SetZero(), this.col2.SetZero(), this.col3.SetZero())
        }, e.prototype.SetVVV = function(t, e, i) {
            this.col1.SetV(t), this.col2.SetV(e), this.col3.SetV(i)
        }, e.prototype.Copy = function() {
            return new e(this.col1, this.col2, this.col3)
        }, e.prototype.SetM = function(t) {
            this.col1.SetV(t.col1), this.col2.SetV(t.col2), this.col3.SetV(t.col3)
        }, e.prototype.AddM = function(t) {
            this.col1.x += t.col1.x, this.col1.y += t.col1.y, this.col1.z += t.col1.z, this.col2.x += t.col2.x, this.col2.y += t.col2.y, this.col2.z += t.col2.z, this.col3.x += t.col3.x, this.col3.y += t.col3.y, this.col3.z += t.col3.z
        }, e.prototype.SetIdentity = function() {
            this.col1.x = 1, this.col2.x = 0, this.col3.x = 0, this.col1.y = 0, this.col2.y = 1, this.col3.y = 0, this.col1.z = 0, this.col2.z = 0, this.col3.z = 1
        }, e.prototype.SetZero = function() {
            this.col1.x = 0, this.col2.x = 0, this.col3.x = 0, this.col1.y = 0, this.col2.y = 0, this.col3.y = 0, this.col1.z = 0, this.col2.z = 0, this.col3.z = 0
        }, e.prototype.Solve22 = function(t, e, i) {
            void 0 === e && (e = 0), void 0 === i && (i = 0);
            var r = this.col1.x,
                n = this.col2.x,
                s = this.col1.y,
                o = this.col2.y,
                a = r * o - n * s;
            return 0 != a && (a = 1 / a), t.x = a * (o * e - n * i), t.y = a * (r * i - s * e), t
        }, e.prototype.Solve33 = function(t, e, i, r) {
            void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === r && (r = 0);
            var n = this.col1.x,
                s = this.col1.y,
                o = this.col1.z,
                a = this.col2.x,
                l = this.col2.y,
                h = this.col2.z,
                c = this.col3.x,
                u = this.col3.y,
                d = this.col3.z,
                p = n * (l * d - h * u) + s * (h * c - a * d) + o * (a * u - l * c);
            return 0 != p && (p = 1 / p), t.x = p * (e * (l * d - h * u) + i * (h * c - a * d) + r * (a * u - l * c)), t.y = p * (n * (i * d - r * u) + s * (r * c - e * d) + o * (e * u - i * c)), t.z = p * (n * (l * r - h * i) + s * (h * e - a * r) + o * (a * i - l * e)), t
        }, i.b2Math = function() {}, i.IsValid = function(t) {
            return void 0 === t && (t = 0), isFinite(t)
        }, i.Dot = function(t, e) {
            return t.x * e.x + t.y * e.y
        }, i.CrossVV = function(t, e) {
            return t.x * e.y - t.y * e.x
        }, i.CrossVF = function(t, e) {
            return void 0 === e && (e = 0), new s(e * t.y, -e * t.x)
        }, i.CrossFV = function(t, e) {
            return void 0 === t && (t = 0), new s(-t * e.y, t * e.x)
        }, i.MulMV = function(t, e) {
            return new s(t.col1.x * e.x + t.col2.x * e.y, t.col1.y * e.x + t.col2.y * e.y)
        }, i.MulTMV = function(t, e) {
            return new s(i.Dot(e, t.col1), i.Dot(e, t.col2))
        }, i.MulX = function(t, e) {
            var r = i.MulMV(t.R, e);
            return r.x += t.position.x, r.y += t.position.y, r
        }, i.MulXT = function(t, e) {
            var r = i.SubtractVV(e, t.position),
                n = r.x * t.R.col1.x + r.y * t.R.col1.y;
            return r.y = r.x * t.R.col2.x + r.y * t.R.col2.y, r.x = n, r
        }, i.AddVV = function(t, e) {
            return new s(t.x + e.x, t.y + e.y)
        }, i.SubtractVV = function(t, e) {
            return new s(t.x - e.x, t.y - e.y)
        }, i.Distance = function(t, e) {
            var i = t.x - e.x,
                r = t.y - e.y;
            return Math.sqrt(i * i + r * r)
        }, i.DistanceSquared = function(t, e) {
            var i = t.x - e.x,
                r = t.y - e.y;
            return i * i + r * r
        }, i.MulFV = function(t, e) {
            return void 0 === t && (t = 0), new s(t * e.x, t * e.y)
        }, i.AddMM = function(e, r) {
            return t.FromVV(i.AddVV(e.col1, r.col1), i.AddVV(e.col2, r.col2))
        }, i.MulMM = function(e, r) {
            return t.FromVV(i.MulMV(e, r.col1), i.MulMV(e, r.col2))
        }, i.MulTMM = function(e, r) {
            var n = new s(i.Dot(e.col1, r.col1), i.Dot(e.col2, r.col1)),
                o = new s(i.Dot(e.col1, r.col2), i.Dot(e.col2, r.col2));
            return t.FromVV(n, o)
        }, i.Abs = function(t) {
            return void 0 === t && (t = 0), t > 0 ? t : -t
        }, i.AbsV = function(t) {
            return new s(i.Abs(t.x), i.Abs(t.y))
        }, i.AbsM = function(e) {
            return t.FromVV(i.AbsV(e.col1), i.AbsV(e.col2))
        }, i.Min = function(t, e) {
            return void 0 === t && (t = 0), void 0 === e && (e = 0), t < e ? t : e
        }, i.MinV = function(t, e) {
            return new s(i.Min(t.x, e.x), i.Min(t.y, e.y))
        }, i.Max = function(t, e) {
            return void 0 === t && (t = 0), void 0 === e && (e = 0), t > e ? t : e
        }, i.MaxV = function(t, e) {
            return new s(i.Max(t.x, e.x), i.Max(t.y, e.y))
        }, i.Clamp = function(t, e, i) {
            return void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), t < e ? e : t > i ? i : t
        }, i.ClampV = function(t, e, r) {
            return i.MaxV(e, i.MinV(t, r))
        }, i.Swap = function(t, e) {
            var i = t[0];
            t[0] = e[0], e[0] = i
        }, i.Random = function() {
            return 2 * Math.random() - 1
        }, i.RandomRange = function(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0);
            var i = Math.random();
            return i = (e - t) * i + t
        }, i.NextPowerOfTwo = function(t) {
            return void 0 === t && (t = 0), t |= t >> 1 & 2147483647, t |= t >> 2 & 1073741823, t |= t >> 4 & 268435455, t |= t >> 8 & 16777215, (t |= t >> 16 & 65535) + 1
        }, i.IsPowerOfTwo = function(t) {
            return void 0 === t && (t = 0), t > 0 && 0 == (t & t - 1)
        }, Box2D.postDefs.push((function() {
            Box2D.Common.Math.b2Math.b2Vec2_zero = new s(0, 0), Box2D.Common.Math.b2Math.b2Mat22_identity = t.FromVV(new s(1, 0), new s(0, 1)), Box2D.Common.Math.b2Math.b2Transform_identity = new n(i.b2Vec2_zero, i.b2Mat22_identity)
        })), r.b2Sweep = function() {
            this.localCenter = new s, this.c0 = new s, this.c = new s
        }, r.prototype.Set = function(t) {
            this.localCenter.SetV(t.localCenter), this.c0.SetV(t.c0), this.c.SetV(t.c), this.a0 = t.a0, this.a = t.a, this.t0 = t.t0
        }, r.prototype.Copy = function() {
            var t = new r;
            return t.localCenter.SetV(this.localCenter), t.c0.SetV(this.c0), t.c.SetV(this.c), t.a0 = this.a0, t.a = this.a, t.t0 = this.t0, t
        }, r.prototype.GetTransform = function(t, e) {
            void 0 === e && (e = 0), t.position.x = (1 - e) * this.c0.x + e * this.c.x, t.position.y = (1 - e) * this.c0.y + e * this.c.y;
            var i = (1 - e) * this.a0 + e * this.a;
            t.R.Set(i);
            var r = t.R;
            t.position.x -= r.col1.x * this.localCenter.x + r.col2.x * this.localCenter.y, t.position.y -= r.col1.y * this.localCenter.x + r.col2.y * this.localCenter.y
        }, r.prototype.Advance = function(t) {
            if (void 0 === t && (t = 0), this.t0 < t && 1 - this.t0 > Number.MIN_VALUE) {
                var e = (t - this.t0) / (1 - this.t0);
                this.c0.x = (1 - e) * this.c0.x + e * this.c.x, this.c0.y = (1 - e) * this.c0.y + e * this.c.y, this.a0 = (1 - e) * this.a0 + e * this.a, this.t0 = t
            }
        }, n.b2Transform = function() {
            this.position = new s, this.R = new t
        }, n.prototype.b2Transform = function(t, e) {
            void 0 === t && (t = null), void 0 === e && (e = null), t && (this.position.SetV(t), this.R.SetM(e))
        }, n.prototype.Initialize = function(t, e) {
            this.position.SetV(t), this.R.SetM(e)
        }, n.prototype.SetIdentity = function() {
            this.position.SetZero(), this.R.SetIdentity()
        }, n.prototype.Set = function(t) {
            this.position.SetV(t.position), this.R.SetM(t.R)
        }, n.prototype.GetAngle = function() {
            return Math.atan2(this.R.col1.y, this.R.col1.x)
        }, s.b2Vec2 = function() {}, s.prototype.b2Vec2 = function(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = t, this.y = e
        }, s.prototype.SetZero = function() {
            this.x = 0, this.y = 0
        }, s.prototype.Set = function(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = t, this.y = e
        }, s.prototype.SetV = function(t) {
            this.x = t.x, this.y = t.y
        }, s.prototype.GetNegative = function() {
            return new s(-this.x, -this.y)
        }, s.prototype.NegativeSelf = function() {
            this.x = -this.x, this.y = -this.y
        }, s.Make = function(t, e) {
            return void 0 === t && (t = 0), void 0 === e && (e = 0), new s(t, e)
        }, s.prototype.Copy = function() {
            return new s(this.x, this.y)
        }, s.prototype.Add = function(t) {
            this.x += t.x, this.y += t.y
        }, s.prototype.Subtract = function(t) {
            this.x -= t.x, this.y -= t.y
        }, s.prototype.Multiply = function(t) {
            void 0 === t && (t = 0), this.x *= t, this.y *= t
        }, s.prototype.MulM = function(t) {
            var e = this.x;
            this.x = t.col1.x * e + t.col2.x * this.y, this.y = t.col1.y * e + t.col2.y * this.y
        }, s.prototype.MulTM = function(t) {
            var e = i.Dot(this, t.col1);
            this.y = i.Dot(this, t.col2), this.x = e
        }, s.prototype.CrossVF = function(t) {
            void 0 === t && (t = 0);
            var e = this.x;
            this.x = t * this.y, this.y = -t * e
        }, s.prototype.CrossFV = function(t) {
            void 0 === t && (t = 0);
            var e = this.x;
            this.x = -t * this.y, this.y = t * e
        }, s.prototype.MinV = function(t) {
            this.x = this.x < t.x ? this.x : t.x, this.y = this.y < t.y ? this.y : t.y
        }, s.prototype.MaxV = function(t) {
            this.x = this.x > t.x ? this.x : t.x, this.y = this.y > t.y ? this.y : t.y
        }, s.prototype.Abs = function() {
            this.x < 0 && (this.x = -this.x), this.y < 0 && (this.y = -this.y)
        }, s.prototype.Length = function() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }, s.prototype.LengthSquared = function() {
            return this.x * this.x + this.y * this.y
        }, s.prototype.Normalize = function() {
            var t = Math.sqrt(this.x * this.x + this.y * this.y);
            if (t < Number.MIN_VALUE) return 0;
            var e = 1 / t;
            return this.x *= e, this.y *= e, t
        }, s.prototype.IsValid = function() {
            return i.IsValid(this.x) && i.IsValid(this.y)
        }, o.b2Vec3 = function() {}, o.prototype.b2Vec3 = function(t, e, i) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), this.x = t, this.y = e, this.z = i
        }, o.prototype.SetZero = function() {
            this.x = this.y = this.z = 0
        }, o.prototype.Set = function(t, e, i) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), this.x = t, this.y = e, this.z = i
        }, o.prototype.SetV = function(t) {
            this.x = t.x, this.y = t.y, this.z = t.z
        }, o.prototype.GetNegative = function() {
            return new o(-this.x, -this.y, -this.z)
        }, o.prototype.NegativeSelf = function() {
            this.x = -this.x, this.y = -this.y, this.z = -this.z
        }, o.prototype.Copy = function() {
            return new o(this.x, this.y, this.z)
        }, o.prototype.Add = function(t) {
            this.x += t.x, this.y += t.y, this.z += t.z
        }, o.prototype.Subtract = function(t) {
            this.x -= t.x, this.y -= t.y, this.z -= t.z
        }, o.prototype.Multiply = function(t) {
            void 0 === t && (t = 0), this.x *= t, this.y *= t, this.z *= t
        }
    }(), function() {
        Box2D.Dynamics.Controllers.b2ControllerEdge, Box2D.Common.Math.b2Mat22, Box2D.Common.Math.b2Mat33;
        var t = Box2D.Common.Math.b2Math,
            e = Box2D.Common.Math.b2Sweep,
            i = Box2D.Common.Math.b2Transform,
            r = Box2D.Common.Math.b2Vec2,
            n = (Box2D.Common.Math.b2Vec3, Box2D.Common.b2Color),
            s = (Box2D.Common.b2internal, Box2D.Common.b2Settings),
            o = Box2D.Collision.b2AABB,
            a = (Box2D.Collision.b2Bound, Box2D.Collision.b2BoundValues, Box2D.Collision.b2Collision, Box2D.Collision.b2ContactID, Box2D.Collision.b2ContactPoint),
            l = (Box2D.Collision.b2Distance, Box2D.Collision.b2DistanceInput, Box2D.Collision.b2DistanceOutput, Box2D.Collision.b2DistanceProxy, Box2D.Collision.b2DynamicTree, Box2D.Collision.b2DynamicTreeBroadPhase),
            h = (Box2D.Collision.b2DynamicTreeNode, Box2D.Collision.b2DynamicTreePair, Box2D.Collision.b2Manifold, Box2D.Collision.b2ManifoldPoint, Box2D.Collision.b2Point, Box2D.Collision.b2RayCastInput),
            c = Box2D.Collision.b2RayCastOutput,
            u = (Box2D.Collision.b2Segment, Box2D.Collision.b2SeparationFunction, Box2D.Collision.b2Simplex, Box2D.Collision.b2SimplexCache, Box2D.Collision.b2SimplexVertex, Box2D.Collision.b2TimeOfImpact, Box2D.Collision.b2TOIInput, Box2D.Collision.b2WorldManifold, Box2D.Collision.ClipVertex, Box2D.Collision.Features, Box2D.Collision.IBroadPhase, Box2D.Collision.Shapes.b2CircleShape),
            d = (Box2D.Collision.Shapes.b2EdgeChainDef, Box2D.Collision.Shapes.b2EdgeShape),
            p = Box2D.Collision.Shapes.b2MassData,
            m = Box2D.Collision.Shapes.b2PolygonShape,
            f = Box2D.Collision.Shapes.b2Shape,
            y = Box2D.Dynamics.b2Body,
            g = Box2D.Dynamics.b2BodyDef,
            _ = Box2D.Dynamics.b2ContactFilter,
            x = Box2D.Dynamics.b2ContactImpulse,
            v = Box2D.Dynamics.b2ContactListener,
            b = Box2D.Dynamics.b2ContactManager,
            w = Box2D.Dynamics.b2DebugDraw,
            C = Box2D.Dynamics.b2DestructionListener,
            S = Box2D.Dynamics.b2FilterData,
            T = Box2D.Dynamics.b2Fixture,
            A = Box2D.Dynamics.b2FixtureDef,
            D = Box2D.Dynamics.b2Island,
            E = Box2D.Dynamics.b2TimeStep,
            B = Box2D.Dynamics.b2World,
            M = (Box2D.Dynamics.Contacts.b2CircleContact, Box2D.Dynamics.Contacts.b2Contact),
            I = (Box2D.Dynamics.Contacts.b2ContactConstraint, Box2D.Dynamics.Contacts.b2ContactConstraintPoint, Box2D.Dynamics.Contacts.b2ContactEdge, Box2D.Dynamics.Contacts.b2ContactFactory),
            P = (Box2D.Dynamics.Contacts.b2ContactRegister, Box2D.Dynamics.Contacts.b2ContactResult, Box2D.Dynamics.Contacts.b2ContactSolver),
            R = (Box2D.Dynamics.Contacts.b2EdgeAndCircleContact, Box2D.Dynamics.Contacts.b2NullContact, Box2D.Dynamics.Contacts.b2PolyAndCircleContact, Box2D.Dynamics.Contacts.b2PolyAndEdgeContact, Box2D.Dynamics.Contacts.b2PolygonContact, Box2D.Dynamics.Contacts.b2PositionSolverManifold, Box2D.Dynamics.Controllers.b2Controller, Box2D.Dynamics.Joints.b2DistanceJoint, Box2D.Dynamics.Joints.b2DistanceJointDef, Box2D.Dynamics.Joints.b2FrictionJoint, Box2D.Dynamics.Joints.b2FrictionJointDef, Box2D.Dynamics.Joints.b2GearJoint, Box2D.Dynamics.Joints.b2GearJointDef, Box2D.Dynamics.Joints.b2Jacobian, Box2D.Dynamics.Joints.b2Joint),
            k = (Box2D.Dynamics.Joints.b2JointDef, Box2D.Dynamics.Joints.b2JointEdge, Box2D.Dynamics.Joints.b2LineJoint, Box2D.Dynamics.Joints.b2LineJointDef, Box2D.Dynamics.Joints.b2MouseJoint, Box2D.Dynamics.Joints.b2MouseJointDef, Box2D.Dynamics.Joints.b2PrismaticJoint, Box2D.Dynamics.Joints.b2PrismaticJointDef, Box2D.Dynamics.Joints.b2PulleyJoint);
        Box2D.Dynamics.Joints.b2PulleyJointDef, Box2D.Dynamics.Joints.b2RevoluteJoint, Box2D.Dynamics.Joints.b2RevoluteJointDef, Box2D.Dynamics.Joints.b2WeldJoint, Box2D.Dynamics.Joints.b2WeldJointDef;
        y.b2Body = function() {
            this.m_xf = new i, this.m_sweep = new e, this.m_linearVelocity = new r, this.m_force = new r
        }, y.prototype.connectEdges = function(e, i, r) {
            void 0 === r && (r = 0);
            var n = Math.atan2(i.GetDirectionVector().y, i.GetDirectionVector().x),
                o = Math.tan(.5 * (n - r)),
                a = t.MulFV(o, i.GetDirectionVector());
            a = t.SubtractVV(a, i.GetNormalVector()), a = t.MulFV(s.b2_toiSlop, a), a = t.AddVV(a, i.GetVertex1());
            var l = t.AddVV(e.GetDirectionVector(), i.GetDirectionVector());
            l.Normalize();
            var h = t.Dot(e.GetDirectionVector(), i.GetNormalVector()) > 0;
            return e.SetNextEdge(i, a, l, h), i.SetPrevEdge(e, a, l, h), n
        }, y.prototype.CreateFixture = function(t) {
            if (1 == this.m_world.IsLocked()) return null;
            var e = new T;
            if (e.Create(this, this.m_xf, t), this.m_flags & y.e_activeFlag) {
                var i = this.m_world.m_contactManager.m_broadPhase;
                e.CreateProxy(i, this.m_xf)
            }
            return e.m_next = this.m_fixtureList, this.m_fixtureList = e, ++this.m_fixtureCount, e.m_body = this, e.m_density > 0 && this.ResetMassData(), this.m_world.m_flags |= B.e_newFixture, e
        }, y.prototype.CreateFixture2 = function(t, e) {
            void 0 === e && (e = 0);
            var i = new A;
            return i.shape = t, i.density = e, this.CreateFixture(i)
        }, y.prototype.DestroyFixture = function(t) {
            if (1 != this.m_world.IsLocked()) {
                for (var e = this.m_fixtureList, i = null; null != e;) {
                    if (e == t) {
                        i ? i.m_next = t.m_next : this.m_fixtureList = t.m_next, !0;
                        break
                    }
                    i = e, e = e.m_next
                }
                for (var r = this.m_contactList; r;) {
                    var n = r.contact;
                    r = r.next;
                    var s = n.GetFixtureA(),
                        o = n.GetFixtureB();
                    t != s && t != o || this.m_world.m_contactManager.Destroy(n)
                }
                if (this.m_flags & y.e_activeFlag) {
                    var a = this.m_world.m_contactManager.m_broadPhase;
                    t.DestroyProxy(a)
                }
                t.Destroy(), t.m_body = null, t.m_next = null, --this.m_fixtureCount, this.ResetMassData()
            }
        }, y.prototype.SetPositionAndAngle = function(t, e) {
            var i;
            if (void 0 === e && (e = 0), 1 != this.m_world.IsLocked()) {
                this.m_xf.R.Set(e), this.m_xf.position.SetV(t);
                var r = this.m_xf.R,
                    n = this.m_sweep.localCenter;
                this.m_sweep.c.x = r.col1.x * n.x + r.col2.x * n.y, this.m_sweep.c.y = r.col1.y * n.x + r.col2.y * n.y, this.m_sweep.c.x += this.m_xf.position.x, this.m_sweep.c.y += this.m_xf.position.y, this.m_sweep.c0.SetV(this.m_sweep.c), this.m_sweep.a0 = this.m_sweep.a = e;
                var s = this.m_world.m_contactManager.m_broadPhase;
                for (i = this.m_fixtureList; i; i = i.m_next) i.Synchronize(s, this.m_xf, this.m_xf);
                this.m_world.m_contactManager.FindNewContacts()
            }
        }, y.prototype.SetTransform = function(t) {
            this.SetPositionAndAngle(t.position, t.GetAngle())
        }, y.prototype.GetTransform = function() {
            return this.m_xf
        }, y.prototype.GetPosition = function() {
            return this.m_xf.position
        }, y.prototype.SetPosition = function(t) {
            this.SetPositionAndAngle(t, this.GetAngle())
        }, y.prototype.GetAngle = function() {
            return this.m_sweep.a
        }, y.prototype.SetAngle = function(t) {
            void 0 === t && (t = 0), this.SetPositionAndAngle(this.GetPosition(), t)
        }, y.prototype.GetWorldCenter = function() {
            return this.m_sweep.c
        }, y.prototype.GetLocalCenter = function() {
            return this.m_sweep.localCenter
        }, y.prototype.SetLinearVelocity = function(t) {
            this.m_type != y.b2_staticBody && this.m_linearVelocity.SetV(t)
        }, y.prototype.GetLinearVelocity = function() {
            return this.m_linearVelocity
        }, y.prototype.SetAngularVelocity = function(t) {
            void 0 === t && (t = 0), this.m_type != y.b2_staticBody && (this.m_angularVelocity = t)
        }, y.prototype.GetAngularVelocity = function() {
            return this.m_angularVelocity
        }, y.prototype.GetDefinition = function() {
            var t = new g;
            return t.type = this.GetType(), t.allowSleep = (this.m_flags & y.e_allowSleepFlag) == y.e_allowSleepFlag, t.angle = this.GetAngle(), t.angularDamping = this.m_angularDamping, t.angularVelocity = this.m_angularVelocity, t.fixedRotation = (this.m_flags & y.e_fixedRotationFlag) == y.e_fixedRotationFlag, t.bullet = (this.m_flags & y.e_bulletFlag) == y.e_bulletFlag, t.awake = (this.m_flags & y.e_awakeFlag) == y.e_awakeFlag, t.linearDamping = this.m_linearDamping, t.linearVelocity.SetV(this.GetLinearVelocity()), t.position = this.GetPosition(), t.userData = this.GetUserData(), t
        }, y.prototype.ApplyForce = function(t, e) {
            this.m_type == y.b2_dynamicBody && (0 == this.IsAwake() && this.SetAwake(!0), this.m_force.x += t.x, this.m_force.y += t.y, this.m_torque += (e.x - this.m_sweep.c.x) * t.y - (e.y - this.m_sweep.c.y) * t.x)
        }, y.prototype.ApplyTorque = function(t) {
            void 0 === t && (t = 0), this.m_type == y.b2_dynamicBody && (0 == this.IsAwake() && this.SetAwake(!0), this.m_torque += t)
        }, y.prototype.ApplyImpulse = function(t, e) {
            this.m_type == y.b2_dynamicBody && (0 == this.IsAwake() && this.SetAwake(!0), this.m_linearVelocity.x += this.m_invMass * t.x, this.m_linearVelocity.y += this.m_invMass * t.y, this.m_angularVelocity += this.m_invI * ((e.x - this.m_sweep.c.x) * t.y - (e.y - this.m_sweep.c.y) * t.x))
        }, y.prototype.Split = function(e) {
            for (var i, r = this.GetLinearVelocity().Copy(), n = this.GetAngularVelocity(), s = this.GetWorldCenter(), o = this, a = this.m_world.CreateBody(this.GetDefinition()), l = o.m_fixtureList; l;)
                if (e(l)) {
                    var h = l.m_next;
                    i ? i.m_next = h : o.m_fixtureList = h, o.m_fixtureCount--, l.m_next = a.m_fixtureList, a.m_fixtureList = l, a.m_fixtureCount++, l.m_body = a, l = h
                } else i = l, l = l.m_next;
            o.ResetMassData(), a.ResetMassData();
            var c = o.GetWorldCenter(),
                u = a.GetWorldCenter(),
                d = t.AddVV(r, t.CrossFV(n, t.SubtractVV(c, s))),
                p = t.AddVV(r, t.CrossFV(n, t.SubtractVV(u, s)));
            return o.SetLinearVelocity(d), a.SetLinearVelocity(p), o.SetAngularVelocity(n), a.SetAngularVelocity(n), o.SynchronizeFixtures(), a.SynchronizeFixtures(), a
        }, y.prototype.Merge = function(t) {
            var e;
            for (e = t.m_fixtureList; e;) {
                var i = e.m_next;
                t.m_fixtureCount--, e.m_next = this.m_fixtureList, this.m_fixtureList = e, this.m_fixtureCount++, e.m_body = n, e = i
            }
            r.m_fixtureCount = 0;
            var r = this,
                n = t;
            r.GetWorldCenter(), n.GetWorldCenter(), r.GetLinearVelocity().Copy(), n.GetLinearVelocity().Copy(), r.GetAngularVelocity(), n.GetAngularVelocity();
            r.ResetMassData(), this.SynchronizeFixtures()
        }, y.prototype.GetMass = function() {
            return this.m_mass
        }, y.prototype.GetInertia = function() {
            return this.m_I
        }, y.prototype.GetMassData = function(t) {
            t.mass = this.m_mass, t.I = this.m_I, t.center.SetV(this.m_sweep.localCenter)
        }, y.prototype.SetMassData = function(e) {
            if (s.b2Assert(0 == this.m_world.IsLocked()), 1 != this.m_world.IsLocked() && this.m_type == y.b2_dynamicBody) {
                this.m_invMass = 0, this.m_I = 0, this.m_invI = 0, this.m_mass = e.mass, this.m_mass <= 0 && (this.m_mass = 1), this.m_invMass = 1 / this.m_mass, e.I > 0 && 0 == (this.m_flags & y.e_fixedRotationFlag) && (this.m_I = e.I - this.m_mass * (e.center.x * e.center.x + e.center.y * e.center.y), this.m_invI = 1 / this.m_I);
                var i = this.m_sweep.c.Copy();
                this.m_sweep.localCenter.SetV(e.center), this.m_sweep.c0.SetV(t.MulX(this.m_xf, this.m_sweep.localCenter)), this.m_sweep.c.SetV(this.m_sweep.c0), this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - i.y), this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - i.x)
            }
        }, y.prototype.ResetMassData = function() {
            if (this.m_mass = 0, this.m_invMass = 0, this.m_I = 0, this.m_invI = 0, this.m_sweep.localCenter.SetZero(), this.m_type != y.b2_staticBody && this.m_type != y.b2_kinematicBody) {
                for (var e = r.Make(0, 0), i = this.m_fixtureList; i; i = i.m_next)
                    if (0 != i.m_density) {
                        var n = i.GetMassData();
                        this.m_mass += n.mass, e.x += n.center.x * n.mass, e.y += n.center.y * n.mass, this.m_I += n.I
                    } this.m_mass > 0 ? (this.m_invMass = 1 / this.m_mass, e.x *= this.m_invMass, e.y *= this.m_invMass) : (this.m_mass = 1, this.m_invMass = 1), this.m_I > 0 && 0 == (this.m_flags & y.e_fixedRotationFlag) ? (this.m_I -= this.m_mass * (e.x * e.x + e.y * e.y), this.m_I *= this.m_inertiaScale, s.b2Assert(this.m_I > 0), this.m_invI = 1 / this.m_I) : (this.m_I = 0, this.m_invI = 0);
                var o = this.m_sweep.c.Copy();
                this.m_sweep.localCenter.SetV(e), this.m_sweep.c0.SetV(t.MulX(this.m_xf, this.m_sweep.localCenter)), this.m_sweep.c.SetV(this.m_sweep.c0), this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - o.y), this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - o.x)
            }
        }, y.prototype.GetWorldPoint = function(t) {
            var e = this.m_xf.R,
                i = new r(e.col1.x * t.x + e.col2.x * t.y, e.col1.y * t.x + e.col2.y * t.y);
            return i.x += this.m_xf.position.x, i.y += this.m_xf.position.y, i
        }, y.prototype.GetWorldVector = function(e) {
            return t.MulMV(this.m_xf.R, e)
        }, y.prototype.GetLocalPoint = function(e) {
            return t.MulXT(this.m_xf, e)
        }, y.prototype.GetLocalVector = function(e) {
            return t.MulTMV(this.m_xf.R, e)
        }, y.prototype.GetLinearVelocityFromWorldPoint = function(t) {
            return new r(this.m_linearVelocity.x - this.m_angularVelocity * (t.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (t.x - this.m_sweep.c.x))
        }, y.prototype.GetLinearVelocityFromLocalPoint = function(t) {
            var e = this.m_xf.R,
                i = new r(e.col1.x * t.x + e.col2.x * t.y, e.col1.y * t.x + e.col2.y * t.y);
            return i.x += this.m_xf.position.x, i.y += this.m_xf.position.y, new r(this.m_linearVelocity.x - this.m_angularVelocity * (i.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (i.x - this.m_sweep.c.x))
        }, y.prototype.GetLinearDamping = function() {
            return this.m_linearDamping
        }, y.prototype.SetLinearDamping = function(t) {
            void 0 === t && (t = 0), this.m_linearDamping = t
        }, y.prototype.GetAngularDamping = function() {
            return this.m_angularDamping
        }, y.prototype.SetAngularDamping = function(t) {
            void 0 === t && (t = 0), this.m_angularDamping = t
        }, y.prototype.SetType = function(t) {
            if (void 0 === t && (t = 0), this.m_type != t) {
                this.m_type = t, this.ResetMassData(), this.m_type == y.b2_staticBody && (this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0), this.SetAwake(!0), this.m_force.SetZero(), this.m_torque = 0;
                for (var e = this.m_contactList; e; e = e.next) e.contact.FlagForFiltering()
            }
        }, y.prototype.GetType = function() {
            return this.m_type
        }, y.prototype.SetBullet = function(t) {
            t ? this.m_flags |= y.e_bulletFlag : this.m_flags &= ~y.e_bulletFlag
        }, y.prototype.IsBullet = function() {
            return (this.m_flags & y.e_bulletFlag) == y.e_bulletFlag
        }, y.prototype.SetSleepingAllowed = function(t) {
            t ? this.m_flags |= y.e_allowSleepFlag : (this.m_flags &= ~y.e_allowSleepFlag, this.SetAwake(!0))
        }, y.prototype.SetAwake = function(t) {
            t ? (this.m_flags |= y.e_awakeFlag, this.m_sleepTime = 0) : (this.m_flags &= ~y.e_awakeFlag, this.m_sleepTime = 0, this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0, this.m_force.SetZero(), this.m_torque = 0)
        }, y.prototype.IsAwake = function() {
            return (this.m_flags & y.e_awakeFlag) == y.e_awakeFlag
        }, y.prototype.SetFixedRotation = function(t) {
            t ? this.m_flags |= y.e_fixedRotationFlag : this.m_flags &= ~y.e_fixedRotationFlag, this.ResetMassData()
        }, y.prototype.IsFixedRotation = function() {
            return (this.m_flags & y.e_fixedRotationFlag) == y.e_fixedRotationFlag
        }, y.prototype.SetActive = function(t) {
            var e, i;
            if (t != this.IsActive())
                if (t)
                    for (this.m_flags |= y.e_activeFlag, e = this.m_world.m_contactManager.m_broadPhase, i = this.m_fixtureList; i; i = i.m_next) i.CreateProxy(e, this.m_xf);
                else {
                    for (this.m_flags &= ~y.e_activeFlag, e = this.m_world.m_contactManager.m_broadPhase, i = this.m_fixtureList; i; i = i.m_next) i.DestroyProxy(e);
                    for (var r = this.m_contactList; r;) {
                        var n = r;
                        r = r.next, this.m_world.m_contactManager.Destroy(n.contact)
                    }
                    this.m_contactList = null
                }
        }, y.prototype.IsActive = function() {
            return (this.m_flags & y.e_activeFlag) == y.e_activeFlag
        }, y.prototype.IsSleepingAllowed = function() {
            return (this.m_flags & y.e_allowSleepFlag) == y.e_allowSleepFlag
        }, y.prototype.GetFixtureList = function() {
            return this.m_fixtureList
        }, y.prototype.GetJointList = function() {
            return this.m_jointList
        }, y.prototype.GetControllerList = function() {
            return this.m_controllerList
        }, y.prototype.GetContactList = function() {
            return this.m_contactList
        }, y.prototype.GetNext = function() {
            return this.m_next
        }, y.prototype.GetUserData = function() {
            return this.m_userData
        }, y.prototype.SetUserData = function(t) {
            this.m_userData = t
        }, y.prototype.GetWorld = function() {
            return this.m_world
        }, y.prototype.b2Body = function(t, e) {
            this.m_flags = 0, t.bullet && (this.m_flags |= y.e_bulletFlag), t.fixedRotation && (this.m_flags |= y.e_fixedRotationFlag), t.allowSleep && (this.m_flags |= y.e_allowSleepFlag), t.awake && (this.m_flags |= y.e_awakeFlag), t.active && (this.m_flags |= y.e_activeFlag), this.m_world = e, this.m_xf.position.SetV(t.position), this.m_xf.R.Set(t.angle), this.m_sweep.localCenter.SetZero(), this.m_sweep.t0 = 1, this.m_sweep.a0 = this.m_sweep.a = t.angle;
            var i = this.m_xf.R,
                r = this.m_sweep.localCenter;
            this.m_sweep.c.x = i.col1.x * r.x + i.col2.x * r.y, this.m_sweep.c.y = i.col1.y * r.x + i.col2.y * r.y, this.m_sweep.c.x += this.m_xf.position.x, this.m_sweep.c.y += this.m_xf.position.y, this.m_sweep.c0.SetV(this.m_sweep.c), this.m_jointList = null, this.m_controllerList = null, this.m_contactList = null, this.m_controllerCount = 0, this.m_prev = null, this.m_next = null, this.m_linearVelocity.SetV(t.linearVelocity), this.m_angularVelocity = t.angularVelocity, this.m_linearDamping = t.linearDamping, this.m_angularDamping = t.angularDamping, this.m_force.Set(0, 0), this.m_torque = 0, this.m_sleepTime = 0, this.m_type = t.type, this.m_type == y.b2_dynamicBody ? (this.m_mass = 1, this.m_invMass = 1) : (this.m_mass = 0, this.m_invMass = 0), this.m_I = 0, this.m_invI = 0, this.m_inertiaScale = t.inertiaScale, this.m_userData = t.userData, this.m_fixtureList = null, this.m_fixtureCount = 0
        }, y.prototype.SynchronizeFixtures = function() {
            var t = y.s_xf1;
            t.R.Set(this.m_sweep.a0);
            var e, i = t.R,
                r = this.m_sweep.localCenter;
            t.position.x = this.m_sweep.c0.x - (i.col1.x * r.x + i.col2.x * r.y), t.position.y = this.m_sweep.c0.y - (i.col1.y * r.x + i.col2.y * r.y);
            var n = this.m_world.m_contactManager.m_broadPhase;
            for (e = this.m_fixtureList; e; e = e.m_next) e.Synchronize(n, t, this.m_xf)
        }, y.prototype.SynchronizeTransform = function() {
            this.m_xf.R.Set(this.m_sweep.a);
            var t = this.m_xf.R,
                e = this.m_sweep.localCenter;
            this.m_xf.position.x = this.m_sweep.c.x - (t.col1.x * e.x + t.col2.x * e.y), this.m_xf.position.y = this.m_sweep.c.y - (t.col1.y * e.x + t.col2.y * e.y)
        }, y.prototype.ShouldCollide = function(t) {
            if (this.m_type != y.b2_dynamicBody && t.m_type != y.b2_dynamicBody) return !1;
            for (var e = this.m_jointList; e; e = e.next)
                if (e.other == t && 0 == e.joint.m_collideConnected) return !1;
            return !0
        }, y.prototype.Advance = function(t) {
            void 0 === t && (t = 0), this.m_sweep.Advance(t), this.m_sweep.c.SetV(this.m_sweep.c0), this.m_sweep.a = this.m_sweep.a0, this.SynchronizeTransform()
        }, Box2D.postDefs.push((function() {
            Box2D.Dynamics.b2Body.s_xf1 = new i, Box2D.Dynamics.b2Body.e_islandFlag = 1, Box2D.Dynamics.b2Body.e_awakeFlag = 2, Box2D.Dynamics.b2Body.e_allowSleepFlag = 4, Box2D.Dynamics.b2Body.e_bulletFlag = 8, Box2D.Dynamics.b2Body.e_fixedRotationFlag = 16, Box2D.Dynamics.b2Body.e_activeFlag = 32, Box2D.Dynamics.b2Body.b2_staticBody = 0, Box2D.Dynamics.b2Body.b2_kinematicBody = 1, Box2D.Dynamics.b2Body.b2_dynamicBody = 2
        })), g.b2BodyDef = function() {
            this.position = new r, this.linearVelocity = new r
        }, g.prototype.b2BodyDef = function() {
            this.userData = null, this.position.Set(0, 0), this.angle = 0, this.linearVelocity.Set(0, 0), this.angularVelocity = 0, this.linearDamping = 0, this.angularDamping = 0, this.allowSleep = !0, this.awake = !0, this.fixedRotation = !1, this.bullet = !1, this.type = y.b2_staticBody, this.active = !0, this.inertiaScale = 1
        }, _.b2ContactFilter = function() {}, _.prototype.ShouldCollide = function(t, e) {
            var i = t.GetFilterData(),
                r = e.GetFilterData();
            return i.groupIndex == r.groupIndex && 0 != i.groupIndex ? i.groupIndex > 0 : 0 != (i.maskBits & r.categoryBits) && 0 != (i.categoryBits & r.maskBits)
        }, _.prototype.RayCollide = function(t, e) {
            return !t || this.ShouldCollide(t instanceof T ? t : null, e)
        }, Box2D.postDefs.push((function() {
            Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new _
        })), x.b2ContactImpulse = function() {
            this.normalImpulses = new Vector_a2j_Number(s.b2_maxManifoldPoints), this.tangentImpulses = new Vector_a2j_Number(s.b2_maxManifoldPoints)
        }, v.b2ContactListener = function() {}, v.prototype.BeginContact = function(t) {}, v.prototype.EndContact = function(t) {}, v.prototype.PreSolve = function(t, e) {}, v.prototype.PostSolve = function(t, e) {}, Box2D.postDefs.push((function() {
            Box2D.Dynamics.b2ContactListener.b2_defaultListener = new v
        })), b.b2ContactManager = function() {}, b.prototype.b2ContactManager = function() {
            this.m_world = null, this.m_contactCount = 0, this.m_contactFilter = _.b2_defaultFilter, this.m_contactListener = v.b2_defaultListener, this.m_contactFactory = new I(this.m_allocator), this.m_broadPhase = new l
        }, b.prototype.AddPair = function(t, e) {
            var i = t instanceof T ? t : null,
                r = e instanceof T ? e : null,
                n = i.GetBody(),
                s = r.GetBody();
            if (n != s) {
                for (var o = s.GetContactList(); o;) {
                    if (o.other == n) {
                        var a = o.contact.GetFixtureA(),
                            l = o.contact.GetFixtureB();
                        if (a == i && l == r) return;
                        if (a == r && l == i) return
                    }
                    o = o.next
                }
                if (0 != s.ShouldCollide(n) && 0 != this.m_contactFilter.ShouldCollide(i, r)) {
                    var h = this.m_contactFactory.Create(i, r);
                    i = h.GetFixtureA(), r = h.GetFixtureB(), n = i.m_body, s = r.m_body, h.m_prev = null, h.m_next = this.m_world.m_contactList, null != this.m_world.m_contactList && (this.m_world.m_contactList.m_prev = h), this.m_world.m_contactList = h, h.m_nodeA.contact = h, h.m_nodeA.other = s, h.m_nodeA.prev = null, h.m_nodeA.next = n.m_contactList, null != n.m_contactList && (n.m_contactList.prev = h.m_nodeA), n.m_contactList = h.m_nodeA, h.m_nodeB.contact = h, h.m_nodeB.other = n, h.m_nodeB.prev = null, h.m_nodeB.next = s.m_contactList, null != s.m_contactList && (s.m_contactList.prev = h.m_nodeB), s.m_contactList = h.m_nodeB, ++this.m_world.m_contactCount
                }
            }
        }, b.prototype.FindNewContacts = function() {
            this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair))
        }, b.prototype.Destroy = function(t) {
            var e = t.GetFixtureA(),
                i = t.GetFixtureB(),
                r = e.GetBody(),
                n = i.GetBody();
            t.IsTouching() && this.m_contactListener.EndContact(t), t.m_prev && (t.m_prev.m_next = t.m_next), t.m_next && (t.m_next.m_prev = t.m_prev), t == this.m_world.m_contactList && (this.m_world.m_contactList = t.m_next), t.m_nodeA.prev && (t.m_nodeA.prev.next = t.m_nodeA.next), t.m_nodeA.next && (t.m_nodeA.next.prev = t.m_nodeA.prev), t.m_nodeA == r.m_contactList && (r.m_contactList = t.m_nodeA.next), t.m_nodeB.prev && (t.m_nodeB.prev.next = t.m_nodeB.next), t.m_nodeB.next && (t.m_nodeB.next.prev = t.m_nodeB.prev), t.m_nodeB == n.m_contactList && (n.m_contactList = t.m_nodeB.next), this.m_contactFactory.Destroy(t), --this.m_contactCount
        }, b.prototype.Collide = function() {
            for (var t = this.m_world.m_contactList; t;) {
                var e = t.GetFixtureA(),
                    i = t.GetFixtureB(),
                    r = e.GetBody(),
                    n = i.GetBody();
                if (0 != r.IsAwake() || 0 != n.IsAwake()) {
                    if (t.m_flags & M.e_filterFlag) {
                        if (0 == n.ShouldCollide(r)) {
                            var s = t;
                            t = s.GetNext(), this.Destroy(s);
                            continue
                        }
                        if (0 == this.m_contactFilter.ShouldCollide(e, i)) {
                            t = (s = t).GetNext(), this.Destroy(s);
                            continue
                        }
                        t.m_flags &= ~M.e_filterFlag
                    }
                    var o = e.m_proxy,
                        a = i.m_proxy;
                    0 != this.m_broadPhase.TestOverlap(o, a) ? (t.Update(this.m_contactListener), t = t.GetNext()) : (t = (s = t).GetNext(), this.Destroy(s))
                } else t = t.GetNext()
            }
        }, Box2D.postDefs.push((function() {
            Box2D.Dynamics.b2ContactManager.s_evalCP = new a
        })), w.b2DebugDraw = function() {}, w.prototype.b2DebugDraw = function() {}, w.prototype.SetFlags = function(t) {
            void 0 === t && (t = 0)
        }, w.prototype.GetFlags = function() {}, w.prototype.AppendFlags = function(t) {
            void 0 === t && (t = 0)
        }, w.prototype.ClearFlags = function(t) {
            void 0 === t && (t = 0)
        }, w.prototype.SetSprite = function(t) {}, w.prototype.GetSprite = function() {}, w.prototype.SetDrawScale = function(t) {
            void 0 === t && (t = 0)
        }, w.prototype.GetDrawScale = function() {}, w.prototype.SetLineThickness = function(t) {
            void 0 === t && (t = 0)
        }, w.prototype.GetLineThickness = function() {}, w.prototype.SetAlpha = function(t) {
            void 0 === t && (t = 0)
        }, w.prototype.GetAlpha = function() {}, w.prototype.SetFillAlpha = function(t) {
            void 0 === t && (t = 0)
        }, w.prototype.GetFillAlpha = function() {}, w.prototype.SetXFormScale = function(t) {
            void 0 === t && (t = 0)
        }, w.prototype.GetXFormScale = function() {}, w.prototype.DrawPolygon = function(t, e, i) {
            void 0 === e && (e = 0)
        }, w.prototype.DrawSolidPolygon = function(t, e, i) {
            void 0 === e && (e = 0)
        }, w.prototype.DrawCircle = function(t, e, i) {
            void 0 === e && (e = 0)
        }, w.prototype.DrawSolidCircle = function(t, e, i, r) {
            void 0 === e && (e = 0)
        }, w.prototype.DrawSegment = function(t, e, i) {}, w.prototype.DrawTransform = function(t) {}, Box2D.postDefs.push((function() {
            Box2D.Dynamics.b2DebugDraw.e_shapeBit = 1, Box2D.Dynamics.b2DebugDraw.e_jointBit = 2, Box2D.Dynamics.b2DebugDraw.e_aabbBit = 4, Box2D.Dynamics.b2DebugDraw.e_pairBit = 8, Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit = 16, Box2D.Dynamics.b2DebugDraw.e_controllerBit = 32
        })), C.b2DestructionListener = function() {}, C.prototype.SayGoodbyeJoint = function(t) {}, C.prototype.SayGoodbyeFixture = function(t) {}, S.b2FilterData = function() {
            this.categoryBits = 1, this.maskBits = 65535, this.groupIndex = 0
        }, S.prototype.Copy = function() {
            var t = new S;
            return t.categoryBits = this.categoryBits, t.maskBits = this.maskBits, t.groupIndex = this.groupIndex, t
        }, T.b2Fixture = function() {
            this.m_filter = new S
        }, T.prototype.GetType = function() {
            return this.m_shape.GetType()
        }, T.prototype.GetShape = function() {
            return this.m_shape
        }, T.prototype.SetSensor = function(t) {
            if (this.m_isSensor != t && (this.m_isSensor = t, null != this.m_body))
                for (var e = this.m_body.GetContactList(); e;) {
                    var i = e.contact,
                        r = i.GetFixtureA(),
                        n = i.GetFixtureB();
                    r != this && n != this || i.SetSensor(r.IsSensor() || n.IsSensor()), e = e.next
                }
        }, T.prototype.IsSensor = function() {
            return this.m_isSensor
        }, T.prototype.SetFilterData = function(t) {
            if (this.m_filter = t.Copy(), !this.m_body)
                for (var e = this.m_body.GetContactList(); e;) {
                    var i = e.contact,
                        r = i.GetFixtureA(),
                        n = i.GetFixtureB();
                    r != this && n != this || i.FlagForFiltering(), e = e.next
                }
        }, T.prototype.GetFilterData = function() {
            return this.m_filter.Copy()
        }, T.prototype.GetBody = function() {
            return this.m_body
        }, T.prototype.GetNext = function() {
            return this.m_next
        }, T.prototype.GetUserData = function() {
            return this.m_userData
        }, T.prototype.SetUserData = function(t) {
            this.m_userData = t
        }, T.prototype.TestPoint = function(t) {
            return this.m_shape.TestPoint(this.m_body.GetTransform(), t)
        }, T.prototype.RayCast = function(t, e) {
            return this.m_shape.RayCast(t, e, this.m_body.GetTransform())
        }, T.prototype.GetMassData = function(t) {
            return void 0 === t && (t = null), null == t && (t = new p), this.m_shape.ComputeMass(t, this.m_density), t
        }, T.prototype.SetDensity = function(t) {
            void 0 === t && (t = 0), this.m_density = t
        }, T.prototype.GetDensity = function() {
            return this.m_density
        }, T.prototype.GetFriction = function() {
            return this.m_friction
        }, T.prototype.SetFriction = function(t) {
            void 0 === t && (t = 0), this.m_friction = t
        }, T.prototype.GetRestitution = function() {
            return this.m_restitution
        }, T.prototype.SetRestitution = function(t) {
            void 0 === t && (t = 0), this.m_restitution = t
        }, T.prototype.GetAABB = function() {
            return this.m_aabb
        }, T.prototype.b2Fixture = function() {
            this.m_aabb = new o, this.m_userData = null, this.m_body = null, this.m_next = null, this.m_shape = null, this.m_density = 0, this.m_friction = 0, this.m_restitution = 0
        }, T.prototype.Create = function(t, e, i) {
            this.m_userData = i.userData, this.m_friction = i.friction, this.m_restitution = i.restitution, this.m_body = t, this.m_next = null, this.m_filter = i.filter.Copy(), this.m_isSensor = i.isSensor, this.m_shape = i.shape.Copy(), this.m_density = i.density
        }, T.prototype.Destroy = function() {
            this.m_shape = null
        }, T.prototype.CreateProxy = function(t, e) {
            this.m_shape.ComputeAABB(this.m_aabb, e), this.m_proxy = t.CreateProxy(this.m_aabb, this)
        }, T.prototype.DestroyProxy = function(t) {
            null != this.m_proxy && (t.DestroyProxy(this.m_proxy), this.m_proxy = null)
        }, T.prototype.Synchronize = function(e, i, r) {
            if (this.m_proxy) {
                var n = new o,
                    s = new o;
                this.m_shape.ComputeAABB(n, i), this.m_shape.ComputeAABB(s, r), this.m_aabb.Combine(n, s);
                var a = t.SubtractVV(r.position, i.position);
                e.MoveProxy(this.m_proxy, this.m_aabb, a)
            }
        }, A.b2FixtureDef = function() {
            this.filter = new S
        }, A.prototype.b2FixtureDef = function() {
            this.shape = null, this.userData = null, this.friction = .2, this.restitution = 0, this.density = 0, this.filter.categoryBits = 1, this.filter.maskBits = 65535, this.filter.groupIndex = 0, this.isSensor = !1
        }, D.b2Island = function() {}, D.prototype.b2Island = function() {
            this.m_bodies = new Vector, this.m_contacts = new Vector, this.m_joints = new Vector
        }, D.prototype.Initialize = function(t, e, i, r, n, s) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0);
            var o = 0;
            for (this.m_bodyCapacity = t, this.m_contactCapacity = e, this.m_jointCapacity = i, this.m_bodyCount = 0, this.m_contactCount = 0, this.m_jointCount = 0, this.m_allocator = r, this.m_listener = n, this.m_contactSolver = s, o = this.m_bodies.length; o < t; o++) this.m_bodies[o] = null;
            for (o = this.m_contacts.length; o < e; o++) this.m_contacts[o] = null;
            for (o = this.m_joints.length; o < i; o++) this.m_joints[o] = null
        }, D.prototype.Clear = function() {
            this.m_bodyCount = 0, this.m_contactCount = 0, this.m_jointCount = 0
        }, D.prototype.Solve = function(e, i, r) {
            var n, o = 0,
                a = 0;
            for (o = 0; o < this.m_bodyCount; ++o)(n = this.m_bodies[o]).GetType() == y.b2_dynamicBody && (n.m_linearVelocity.x += e.dt * (i.x + n.m_invMass * n.m_force.x), n.m_linearVelocity.y += e.dt * (i.y + n.m_invMass * n.m_force.y), n.m_angularVelocity += e.dt * n.m_invI * n.m_torque, n.m_linearVelocity.Multiply(t.Clamp(1 - e.dt * n.m_linearDamping, 0, 1)), n.m_angularVelocity *= t.Clamp(1 - e.dt * n.m_angularDamping, 0, 1));
            this.m_contactSolver.Initialize(e, this.m_contacts, this.m_contactCount, this.m_allocator);
            var l = this.m_contactSolver;
            for (l.InitVelocityConstraints(e), o = 0; o < this.m_jointCount; ++o) this.m_joints[o].InitVelocityConstraints(e);
            for (o = 0; o < e.velocityIterations; ++o) {
                for (a = 0; a < this.m_jointCount; ++a) this.m_joints[a].SolveVelocityConstraints(e);
                l.SolveVelocityConstraints()
            }
            for (o = 0; o < this.m_jointCount; ++o) this.m_joints[o].FinalizeVelocityConstraints();
            for (l.FinalizeVelocityConstraints(), o = 0; o < this.m_bodyCount; ++o)
                if ((n = this.m_bodies[o]).GetType() != y.b2_staticBody) {
                    var h = e.dt * n.m_linearVelocity.x,
                        c = e.dt * n.m_linearVelocity.y;
                    h * h + c * c > s.b2_maxTranslationSquared && (n.m_linearVelocity.Normalize(), n.m_linearVelocity.x *= s.b2_maxTranslation * e.inv_dt, n.m_linearVelocity.y *= s.b2_maxTranslation * e.inv_dt);
                    var u = e.dt * n.m_angularVelocity;
                    u * u > s.b2_maxRotationSquared && (n.m_angularVelocity < 0 ? n.m_angularVelocity = -s.b2_maxRotation * e.inv_dt : n.m_angularVelocity = s.b2_maxRotation * e.inv_dt), n.m_sweep.c0.SetV(n.m_sweep.c), n.m_sweep.a0 = n.m_sweep.a, n.m_sweep.c.x += e.dt * n.m_linearVelocity.x, n.m_sweep.c.y += e.dt * n.m_linearVelocity.y, n.m_sweep.a += e.dt * n.m_angularVelocity, n.SynchronizeTransform()
                } for (o = 0; o < e.positionIterations; ++o) {
                var d = l.SolvePositionConstraints(s.b2_contactBaumgarte),
                    p = !0;
                for (a = 0; a < this.m_jointCount; ++a) {
                    var m = this.m_joints[a].SolvePositionConstraints(s.b2_contactBaumgarte);
                    p = p && m
                }
                if (d && p) break
            }
            if (this.Report(l.m_constraints), r) {
                var f = Number.MAX_VALUE,
                    g = s.b2_linearSleepTolerance * s.b2_linearSleepTolerance,
                    _ = s.b2_angularSleepTolerance * s.b2_angularSleepTolerance;
                for (o = 0; o < this.m_bodyCount; ++o)(n = this.m_bodies[o]).GetType() != y.b2_staticBody && (0 == (n.m_flags & y.e_allowSleepFlag) && (n.m_sleepTime = 0, f = 0), 0 == (n.m_flags & y.e_allowSleepFlag) || n.m_angularVelocity * n.m_angularVelocity > _ || t.Dot(n.m_linearVelocity, n.m_linearVelocity) > g ? (n.m_sleepTime = 0, f = 0) : (n.m_sleepTime += e.dt, f = t.Min(f, n.m_sleepTime)));
                if (f >= s.b2_timeToSleep)
                    for (o = 0; o < this.m_bodyCount; ++o)(n = this.m_bodies[o]).SetAwake(!1)
            }
        }, D.prototype.SolveTOI = function(t) {
            var e = 0,
                i = 0;
            this.m_contactSolver.Initialize(t, this.m_contacts, this.m_contactCount, this.m_allocator);
            var r = this.m_contactSolver;
            for (e = 0; e < this.m_jointCount; ++e) this.m_joints[e].InitVelocityConstraints(t);
            for (e = 0; e < t.velocityIterations; ++e)
                for (r.SolveVelocityConstraints(), i = 0; i < this.m_jointCount; ++i) this.m_joints[i].SolveVelocityConstraints(t);
            for (e = 0; e < this.m_bodyCount; ++e) {
                var n = this.m_bodies[e];
                if (n.GetType() != y.b2_staticBody) {
                    var o = t.dt * n.m_linearVelocity.x,
                        a = t.dt * n.m_linearVelocity.y;
                    o * o + a * a > s.b2_maxTranslationSquared && (n.m_linearVelocity.Normalize(), n.m_linearVelocity.x *= s.b2_maxTranslation * t.inv_dt, n.m_linearVelocity.y *= s.b2_maxTranslation * t.inv_dt);
                    var l = t.dt * n.m_angularVelocity;
                    l * l > s.b2_maxRotationSquared && (n.m_angularVelocity < 0 ? n.m_angularVelocity = -s.b2_maxRotation * t.inv_dt : n.m_angularVelocity = s.b2_maxRotation * t.inv_dt), n.m_sweep.c0.SetV(n.m_sweep.c), n.m_sweep.a0 = n.m_sweep.a, n.m_sweep.c.x += t.dt * n.m_linearVelocity.x, n.m_sweep.c.y += t.dt * n.m_linearVelocity.y, n.m_sweep.a += t.dt * n.m_angularVelocity, n.SynchronizeTransform()
                }
            }
            for (e = 0; e < t.positionIterations; ++e) {
                var h = r.SolvePositionConstraints(.75),
                    c = !0;
                for (i = 0; i < this.m_jointCount; ++i) {
                    var u = this.m_joints[i].SolvePositionConstraints(s.b2_contactBaumgarte);
                    c = c && u
                }
                if (h && c) break
            }
            this.Report(r.m_constraints)
        }, D.prototype.Report = function(t) {
            if (null != this.m_listener)
                for (var e = 0; e < this.m_contactCount; ++e) {
                    for (var i = this.m_contacts[e], r = t[e], n = 0; n < r.pointCount; ++n) D.s_impulse.normalImpulses[n] = r.points[n].normalImpulse, D.s_impulse.tangentImpulses[n] = r.points[n].tangentImpulse;
                    this.m_listener.PostSolve(i, D.s_impulse)
                }
        }, D.prototype.AddBody = function(t) {
            t.m_islandIndex = this.m_bodyCount, this.m_bodies[this.m_bodyCount++] = t
        }, D.prototype.AddContact = function(t) {
            this.m_contacts[this.m_contactCount++] = t
        }, D.prototype.AddJoint = function(t) {
            this.m_joints[this.m_jointCount++] = t
        }, Box2D.postDefs.push((function() {
            Box2D.Dynamics.b2Island.s_impulse = new x
        })), E.b2TimeStep = function() {}, E.prototype.Set = function(t) {
            this.dt = t.dt, this.inv_dt = t.inv_dt, this.positionIterations = t.positionIterations, this.velocityIterations = t.velocityIterations, this.warmStarting = t.warmStarting
        }, B.b2World = function() {
            this.s_stack = new Vector, this.m_contactManager = new b, this.m_contactSolver = new P, this.m_island = new D
        }, B.prototype.b2World = function(t, e) {
            this.m_destructionListener = null, this.m_debugDraw = null, this.m_bodyList = null, this.m_contactList = null, this.m_jointList = null, this.m_controllerList = null, this.m_bodyCount = 0, this.m_contactCount = 0, this.m_jointCount = 0, this.m_controllerCount = 0, B.m_warmStarting = !0, B.m_continuousPhysics = !0, this.m_allowSleep = e, this.m_gravity = t, this.m_inv_dt0 = 0, this.m_contactManager.m_world = this;
            var i = new g;
            this.m_groundBody = this.CreateBody(i)
        }, B.prototype.SetDestructionListener = function(t) {
            this.m_destructionListener = t
        }, B.prototype.SetContactFilter = function(t) {
            this.m_contactManager.m_contactFilter = t
        }, B.prototype.SetContactListener = function(t) {
            this.m_contactManager.m_contactListener = t
        }, B.prototype.SetDebugDraw = function(t) {
            this.m_debugDraw = t
        }, B.prototype.SetBroadPhase = function(t) {
            var e = this.m_contactManager.m_broadPhase;
            this.m_contactManager.m_broadPhase = t;
            for (var i = this.m_bodyList; i; i = i.m_next)
                for (var r = i.m_fixtureList; r; r = r.m_next) r.m_proxy = t.CreateProxy(e.GetFatAABB(r.m_proxy), r)
        }, B.prototype.Validate = function() {
            this.m_contactManager.m_broadPhase.Validate()
        }, B.prototype.GetProxyCount = function() {
            return this.m_contactManager.m_broadPhase.GetProxyCount()
        }, B.prototype.CreateBody = function(t) {
            if (1 == this.IsLocked()) return null;
            var e = new y(t, this);
            return e.m_prev = null, e.m_next = this.m_bodyList, this.m_bodyList && (this.m_bodyList.m_prev = e), this.m_bodyList = e, ++this.m_bodyCount, e
        }, B.prototype.DestroyBody = function(t) {
            if (1 != this.IsLocked()) {
                for (var e = t.m_jointList; e;) {
                    var i = e;
                    e = e.next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeJoint(i.joint), this.DestroyJoint(i.joint)
                }
                for (var r = t.m_controllerList; r;) {
                    var n = r;
                    r = r.nextController, n.controller.RemoveBody(t)
                }
                for (var s = t.m_contactList; s;) {
                    var o = s;
                    s = s.next, this.m_contactManager.Destroy(o.contact)
                }
                t.m_contactList = null;
                for (var a = t.m_fixtureList; a;) {
                    var l = a;
                    a = a.m_next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeFixture(l), l.DestroyProxy(this.m_contactManager.m_broadPhase), l.Destroy()
                }
                t.m_fixtureList = null, t.m_fixtureCount = 0, t.m_prev && (t.m_prev.m_next = t.m_next), t.m_next && (t.m_next.m_prev = t.m_prev), t == this.m_bodyList && (this.m_bodyList = t.m_next), --this.m_bodyCount
            }
        }, B.prototype.CreateJoint = function(t) {
            var e = R.Create(t, null);
            e.m_prev = null, e.m_next = this.m_jointList, this.m_jointList && (this.m_jointList.m_prev = e), this.m_jointList = e, ++this.m_jointCount, e.m_edgeA.joint = e, e.m_edgeA.other = e.m_bodyB, e.m_edgeA.prev = null, e.m_edgeA.next = e.m_bodyA.m_jointList, e.m_bodyA.m_jointList && (e.m_bodyA.m_jointList.prev = e.m_edgeA), e.m_bodyA.m_jointList = e.m_edgeA, e.m_edgeB.joint = e, e.m_edgeB.other = e.m_bodyA, e.m_edgeB.prev = null, e.m_edgeB.next = e.m_bodyB.m_jointList, e.m_bodyB.m_jointList && (e.m_bodyB.m_jointList.prev = e.m_edgeB), e.m_bodyB.m_jointList = e.m_edgeB;
            var i = t.bodyA,
                r = t.bodyB;
            if (0 == t.collideConnected)
                for (var n = r.GetContactList(); n;) n.other == i && n.contact.FlagForFiltering(), n = n.next;
            return e
        }, B.prototype.DestroyJoint = function(t) {
            var e = t.m_collideConnected;
            t.m_prev && (t.m_prev.m_next = t.m_next), t.m_next && (t.m_next.m_prev = t.m_prev), t == this.m_jointList && (this.m_jointList = t.m_next);
            var i = t.m_bodyA,
                r = t.m_bodyB;
            if (i.SetAwake(!0), r.SetAwake(!0), t.m_edgeA.prev && (t.m_edgeA.prev.next = t.m_edgeA.next), t.m_edgeA.next && (t.m_edgeA.next.prev = t.m_edgeA.prev), t.m_edgeA == i.m_jointList && (i.m_jointList = t.m_edgeA.next), t.m_edgeA.prev = null, t.m_edgeA.next = null, t.m_edgeB.prev && (t.m_edgeB.prev.next = t.m_edgeB.next), t.m_edgeB.next && (t.m_edgeB.next.prev = t.m_edgeB.prev), t.m_edgeB == r.m_jointList && (r.m_jointList = t.m_edgeB.next), t.m_edgeB.prev = null, t.m_edgeB.next = null, R.Destroy(t, null), --this.m_jointCount, 0 == e)
                for (var n = r.GetContactList(); n;) n.other == i && n.contact.FlagForFiltering(), n = n.next
        }, B.prototype.AddController = function(t) {
            return t.m_next = this.m_controllerList, t.m_prev = null, this.m_controllerList = t, t.m_world = this, this.m_controllerCount++, t
        }, B.prototype.RemoveController = function(t) {
            t.m_prev && (t.m_prev.m_next = t.m_next), t.m_next && (t.m_next.m_prev = t.m_prev), this.m_controllerList == t && (this.m_controllerList = t.m_next), this.m_controllerCount--
        }, B.prototype.CreateController = function(t) {
            if (t.m_world != this) throw new Error("Controller can only be a member of one world");
            return t.m_next = this.m_controllerList, t.m_prev = null, this.m_controllerList && (this.m_controllerList.m_prev = t), this.m_controllerList = t, ++this.m_controllerCount, t.m_world = this, t
        }, B.prototype.DestroyController = function(t) {
            t.Clear(), t.m_next && (t.m_next.m_prev = t.m_prev), t.m_prev && (t.m_prev.m_next = t.m_next), t == this.m_controllerList && (this.m_controllerList = t.m_next), --this.m_controllerCount
        }, B.prototype.SetWarmStarting = function(t) {
            B.m_warmStarting = t
        }, B.prototype.SetContinuousPhysics = function(t) {
            B.m_continuousPhysics = t
        }, B.prototype.GetBodyCount = function() {
            return this.m_bodyCount
        }, B.prototype.GetJointCount = function() {
            return this.m_jointCount
        }, B.prototype.GetContactCount = function() {
            return this.m_contactCount
        }, B.prototype.SetGravity = function(t) {
            this.m_gravity = t
        }, B.prototype.GetGravity = function() {
            return this.m_gravity
        }, B.prototype.GetGroundBody = function() {
            return this.m_groundBody
        }, B.prototype.Step = function(t, e, i) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), this.m_flags & B.e_newFixture && (this.m_contactManager.FindNewContacts(), this.m_flags &= ~B.e_newFixture), this.m_flags |= B.e_locked;
            var r = B.s_timestep2;
            r.dt = t, r.velocityIterations = e, r.positionIterations = i, r.inv_dt = t > 0 ? 1 / t : 0, r.dtRatio = this.m_inv_dt0 * t, r.warmStarting = B.m_warmStarting, this.m_contactManager.Collide(), r.dt > 0 && this.Solve(r), B.m_continuousPhysics && r.dt > 0 && this.SolveTOI(r), r.dt > 0 && (this.m_inv_dt0 = r.inv_dt), this.m_flags &= ~B.e_locked
        }, B.prototype.ClearForces = function() {
            for (var t = this.m_bodyList; t; t = t.m_next) t.m_force.SetZero(), t.m_torque = 0
        }, B.prototype.DrawDebugData = function() {
            if (null != this.m_debugDraw) {
                this.m_debugDraw.m_sprite.graphics.clear();
                var t, e, i, s, a, l, h = this.m_debugDraw.GetFlags(),
                    c = (new r, new r, new r, new o, new o, [new r, new r, new r, new r]),
                    u = new n(0, 0, 0);
                if (h & w.e_shapeBit)
                    for (t = this.m_bodyList; t; t = t.m_next)
                        for (l = t.m_xf, e = t.GetFixtureList(); e; e = e.m_next) i = e.GetShape(), 0 == t.IsActive() ? (u.Set(.5, .5, .3), this.DrawShape(i, l, u)) : t.GetType() == y.b2_staticBody ? (u.Set(.5, .9, .5), this.DrawShape(i, l, u)) : t.GetType() == y.b2_kinematicBody ? (u.Set(.5, .5, .9), this.DrawShape(i, l, u)) : 0 == t.IsAwake() ? (u.Set(.6, .6, .6), this.DrawShape(i, l, u)) : (u.Set(.9, .7, .7), this.DrawShape(i, l, u));
                if (h & w.e_jointBit)
                    for (s = this.m_jointList; s; s = s.m_next) this.DrawJoint(s);
                if (h & w.e_controllerBit)
                    for (var d = this.m_controllerList; d; d = d.m_next) d.Draw(this.m_debugDraw);
                if (h & w.e_pairBit) {
                    u.Set(.3, .9, .9);
                    for (var p = this.m_contactManager.m_contactList; p; p = p.GetNext()) {
                        var m = p.GetFixtureA(),
                            f = p.GetFixtureB(),
                            g = m.GetAABB().GetCenter(),
                            _ = f.GetAABB().GetCenter();
                        this.m_debugDraw.DrawSegment(g, _, u)
                    }
                }
                if (h & w.e_aabbBit)
                    for (a = this.m_contactManager.m_broadPhase, c = [new r, new r, new r, new r], t = this.m_bodyList; t; t = t.GetNext())
                        if (0 != t.IsActive())
                            for (e = t.GetFixtureList(); e; e = e.GetNext()) {
                                var x = a.GetFatAABB(e.m_proxy);
                                c[0].Set(x.lowerBound.x, x.lowerBound.y), c[1].Set(x.upperBound.x, x.lowerBound.y), c[2].Set(x.upperBound.x, x.upperBound.y), c[3].Set(x.lowerBound.x, x.upperBound.y), this.m_debugDraw.DrawPolygon(c, 4, u)
                            }
                if (h & w.e_centerOfMassBit)
                    for (t = this.m_bodyList; t; t = t.m_next)(l = B.s_xf).R = t.m_xf.R, l.position = t.GetWorldCenter(), this.m_debugDraw.DrawTransform(l)
            }
        }, B.prototype.QueryAABB = function(t, e) {
            var i = this.m_contactManager.m_broadPhase;
            i.Query((function(e) {
                return t(i.GetUserData(e))
            }), e)
        }, B.prototype.QueryShape = function(t, e, r) {
            void 0 === r && (r = null), null == r && (r = new i).SetIdentity();
            var n = this.m_contactManager.m_broadPhase;
            var s = new o;
            e.ComputeAABB(s, r), n.Query((function(i) {
                var s = n.GetUserData(i) instanceof T ? n.GetUserData(i) : null;
                return !f.TestOverlap(e, r, s.GetShape(), s.GetBody().GetTransform()) || t(s)
            }), s)
        }, B.prototype.QueryPoint = function(t, e) {
            var i = this.m_contactManager.m_broadPhase;
            var r = new o;
            r.lowerBound.Set(e.x - s.b2_linearSlop, e.y - s.b2_linearSlop), r.upperBound.Set(e.x + s.b2_linearSlop, e.y + s.b2_linearSlop), i.Query((function(r) {
                var n = i.GetUserData(r) instanceof T ? i.GetUserData(r) : null;
                return !n.TestPoint(e) || t(n)
            }), r)
        }, B.prototype.RayCast = function(t, e, i) {
            var n = this.m_contactManager.m_broadPhase,
                s = new c;
            var o = new h(e, i);
            n.RayCast((function(o, a) {
                var l = n.GetUserData(a),
                    h = l instanceof T ? l : null;
                if (h.RayCast(s, o)) {
                    var c = s.fraction,
                        u = new r((1 - c) * e.x + c * i.x, (1 - c) * e.y + c * i.y);
                    return t(h, u, s.normal, c)
                }
                return o.maxFraction
            }), o)
        }, B.prototype.RayCastOne = function(t, e) {
            var i;
            return this.RayCast((function(t, e, r, n) {
                return void 0 === n && (n = 0), i = t, n
            }), t, e), i
        }, B.prototype.RayCastAll = function(t, e) {
            var i = new Vector;
            return this.RayCast((function(t, e, r, n) {
                return void 0 === n && (n = 0), i[i.length] = t, 1
            }), t, e), i
        }, B.prototype.GetBodyList = function() {
            return this.m_bodyList
        }, B.prototype.GetJointList = function() {
            return this.m_jointList
        }, B.prototype.GetContactList = function() {
            return this.m_contactList
        }, B.prototype.IsLocked = function() {
            return (this.m_flags & B.e_locked) > 0
        }, B.prototype.Solve = function(t) {
            for (var e, i = this.m_controllerList; i; i = i.m_next) i.Step(t);
            var r = this.m_island;
            for (r.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver), e = this.m_bodyList; e; e = e.m_next) e.m_flags &= ~y.e_islandFlag;
            for (var n = this.m_contactList; n; n = n.m_next) n.m_flags &= ~M.e_islandFlag;
            for (var s = this.m_jointList; s; s = s.m_next) s.m_islandFlag = !1;
            parseInt(this.m_bodyCount);
            for (var o = this.s_stack, a = this.m_bodyList; a; a = a.m_next)
                if (!(a.m_flags & y.e_islandFlag) && 0 != a.IsAwake() && 0 != a.IsActive() && a.GetType() != y.b2_staticBody) {
                    r.Clear();
                    var l = 0;
                    for (o[l++] = a, a.m_flags |= y.e_islandFlag; l > 0;)
                        if (e = o[--l], r.AddBody(e), 0 == e.IsAwake() && e.SetAwake(!0), e.GetType() != y.b2_staticBody) {
                            for (var h, c = e.m_contactList; c; c = c.next) c.contact.m_flags & M.e_islandFlag || 1 != c.contact.IsSensor() && 0 != c.contact.IsEnabled() && 0 != c.contact.IsTouching() && (r.AddContact(c.contact), c.contact.m_flags |= M.e_islandFlag, (h = c.other).m_flags & y.e_islandFlag || (o[l++] = h, h.m_flags |= y.e_islandFlag));
                            for (var u = e.m_jointList; u; u = u.next) 1 != u.joint.m_islandFlag && 0 != (h = u.other).IsActive() && (r.AddJoint(u.joint), u.joint.m_islandFlag = !0, h.m_flags & y.e_islandFlag || (o[l++] = h, h.m_flags |= y.e_islandFlag))
                        } r.Solve(t, this.m_gravity, this.m_allowSleep);
                    for (var d = 0; d < r.m_bodyCount; ++d)(e = r.m_bodies[d]).GetType() == y.b2_staticBody && (e.m_flags &= ~y.e_islandFlag)
                } for (d = 0; d < o.length && o[d]; ++d) o[d] = null;
            for (e = this.m_bodyList; e; e = e.m_next) 0 != e.IsAwake() && 0 != e.IsActive() && e.GetType() != y.b2_staticBody && e.SynchronizeFixtures();
            this.m_contactManager.FindNewContacts()
        }, B.prototype.SolveTOI = function(t) {
            var e, i, r, n, o, a, l, h = this.m_island;
            h.Initialize(this.m_bodyCount, s.b2_maxTOIContactsPerIsland, s.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
            var c, u = B.s_queue;
            for (e = this.m_bodyList; e; e = e.m_next) e.m_flags &= ~y.e_islandFlag, e.m_sweep.t0 = 0;
            for (c = this.m_contactList; c; c = c.m_next) c.m_flags &= ~(M.e_toiFlag | M.e_islandFlag);
            for (l = this.m_jointList; l; l = l.m_next) l.m_islandFlag = !1;
            for (var d = 0;;) {
                if (d++ >= 50) {
                    this.m_flags |= B.e_solveFailed;
                    break
                }
                var p = null,
                    m = 1;
                for (c = this.m_contactList; c; c = c.m_next)
                    if (1 != c.IsSensor() && 0 != c.IsEnabled() && 0 != c.IsContinuous()) {
                        var f = 1;
                        if (c.m_flags & M.e_toiFlag) f = c.m_toi;
                        else {
                            if (i = c.m_fixtureA, r = c.m_fixtureB, n = i.m_body, o = r.m_body, !(n.GetType() == y.b2_dynamicBody && 0 != n.IsAwake() || o.GetType() == y.b2_dynamicBody && 0 != o.IsAwake())) continue;
                            var g = n.m_sweep.t0;
                            n.m_sweep.t0 < o.m_sweep.t0 ? (g = o.m_sweep.t0, n.m_sweep.Advance(g)) : o.m_sweep.t0 < n.m_sweep.t0 && (g = n.m_sweep.t0, o.m_sweep.Advance(g)), f = c.ComputeTOI(n.m_sweep, o.m_sweep), s.b2Assert(0 <= f && f <= 1), f > 0 && f < 1 && (f = (1 - f) * g + f) > 1 && (f = 1), c.m_toi = f, c.m_flags |= M.e_toiFlag
                        }
                        Number.MIN_VALUE < f && f < m && (p = c, m = f)
                    } if (null == p || 1 - 100 * Number.MIN_VALUE < m) break;
                if (i = p.m_fixtureA, r = p.m_fixtureB, n = i.m_body, o = r.m_body, B.s_backupA.Set(n.m_sweep), B.s_backupB.Set(o.m_sweep), n.Advance(m), o.Advance(m), p.Update(this.m_contactManager.m_contactListener), p.m_flags &= ~M.e_toiFlag, 1 != p.IsSensor() && 0 != p.IsEnabled()) {
                    if (0 != p.IsTouching()) {
                        var _ = n;
                        _.GetType() != y.b2_dynamicBody && (_ = o), h.Clear();
                        var x = 0,
                            v = 0;
                        for (u[x + v++] = _, _.m_flags |= y.e_islandFlag; v > 0;)
                            if (e = u[x++], --v, h.AddBody(e), 0 == e.IsAwake() && e.SetAwake(!0), e.GetType() == y.b2_dynamicBody) {
                                for (a = e.m_contactList; a && h.m_contactCount != h.m_contactCapacity; a = a.next)
                                    if (!(a.contact.m_flags & M.e_islandFlag) && 1 != a.contact.IsSensor() && 0 != a.contact.IsEnabled() && 0 != a.contact.IsTouching()) {
                                        h.AddContact(a.contact), a.contact.m_flags |= M.e_islandFlag;
                                        var b = a.other;
                                        b.m_flags & y.e_islandFlag || (b.GetType() != y.b2_staticBody && (b.Advance(m), b.SetAwake(!0)), u[x + v] = b, ++v, b.m_flags |= y.e_islandFlag)
                                    } for (var w = e.m_jointList; w; w = w.next) h.m_jointCount != h.m_jointCapacity && 1 != w.joint.m_islandFlag && 0 != (b = w.other).IsActive() && (h.AddJoint(w.joint), w.joint.m_islandFlag = !0, b.m_flags & y.e_islandFlag || (b.GetType() != y.b2_staticBody && (b.Advance(m), b.SetAwake(!0)), u[x + v] = b, ++v, b.m_flags |= y.e_islandFlag))
                            } var C = B.s_timestep;
                        C.warmStarting = !1, C.dt = (1 - m) * t.dt, C.inv_dt = 1 / C.dt, C.dtRatio = 0, C.velocityIterations = t.velocityIterations, C.positionIterations = t.positionIterations, h.SolveTOI(C);
                        var S = 0;
                        for (S = 0; S < h.m_bodyCount; ++S)
                            if ((e = h.m_bodies[S]).m_flags &= ~y.e_islandFlag, 0 != e.IsAwake() && e.GetType() == y.b2_dynamicBody)
                                for (e.SynchronizeFixtures(), a = e.m_contactList; a; a = a.next) a.contact.m_flags &= ~M.e_toiFlag;
                        for (S = 0; S < h.m_contactCount; ++S)(c = h.m_contacts[S]).m_flags &= ~(M.e_toiFlag | M.e_islandFlag);
                        for (S = 0; S < h.m_jointCount; ++S)(l = h.m_joints[S]).m_islandFlag = !1;
                        this.m_contactManager.FindNewContacts()
                    }
                } else n.m_sweep.Set(B.s_backupA), o.m_sweep.Set(B.s_backupB), n.SynchronizeTransform(), o.SynchronizeTransform()
            }
        }, B.prototype.DrawJoint = function(t) {
            var e = t.GetBodyA(),
                i = t.GetBodyB(),
                r = e.m_xf,
                n = i.m_xf,
                s = r.position,
                o = n.position,
                a = t.GetAnchorA(),
                l = t.GetAnchorB(),
                h = B.s_jointColor;
            switch (t.m_type) {
                case R.e_distanceJoint:
                    this.m_debugDraw.DrawSegment(a, l, h);
                    break;
                case R.e_pulleyJoint:
                    var c = t instanceof k ? t : null,
                        u = c.GetGroundAnchorA(),
                        d = c.GetGroundAnchorB();
                    this.m_debugDraw.DrawSegment(u, a, h), this.m_debugDraw.DrawSegment(d, l, h), this.m_debugDraw.DrawSegment(u, d, h);
                    break;
                case R.e_mouseJoint:
                    this.m_debugDraw.DrawSegment(a, l, h);
                    break;
                default:
                    e != this.m_groundBody && this.m_debugDraw.DrawSegment(s, a, h), this.m_debugDraw.DrawSegment(a, l, h), i != this.m_groundBody && this.m_debugDraw.DrawSegment(o, l, h)
            }
        }, B.prototype.DrawShape = function(e, i, r) {
            switch (e.m_type) {
                case f.e_circleShape:
                    var n = e instanceof u ? e : null,
                        s = t.MulX(i, n.m_p),
                        o = n.m_radius,
                        a = i.R.col1;
                    this.m_debugDraw.DrawSolidCircle(s, o, a, r);
                    break;
                case f.e_polygonShape:
                    var l = 0,
                        h = e instanceof m ? e : null,
                        c = parseInt(h.GetVertexCount()),
                        p = h.GetVertices(),
                        y = new Vector(c);
                    for (l = 0; l < c; ++l) y[l] = t.MulX(i, p[l]);
                    this.m_debugDraw.DrawSolidPolygon(y, c, r);
                    break;
                case f.e_edgeShape:
                    var g = e instanceof d ? e : null;
                    this.m_debugDraw.DrawSegment(t.MulX(i, g.GetVertex1()), t.MulX(i, g.GetVertex2()), r)
            }
        }, Box2D.postDefs.push((function() {
            Box2D.Dynamics.b2World.s_timestep2 = new E, Box2D.Dynamics.b2World.s_xf = new i, Box2D.Dynamics.b2World.s_backupA = new e, Box2D.Dynamics.b2World.s_backupB = new e, Box2D.Dynamics.b2World.s_timestep = new E, Box2D.Dynamics.b2World.s_queue = new Vector, Box2D.Dynamics.b2World.s_jointColor = new n(.5, .8, .8), Box2D.Dynamics.b2World.e_newFixture = 1, Box2D.Dynamics.b2World.e_locked = 2, Box2D.Dynamics.b2World.e_solveFailed = 4
        }))
    }(), function() {
        var t = Box2D.Collision.Shapes.b2CircleShape,
            e = (Box2D.Collision.Shapes.b2EdgeChainDef, Box2D.Collision.Shapes.b2EdgeShape),
            i = (Box2D.Collision.Shapes.b2MassData, Box2D.Collision.Shapes.b2PolygonShape),
            r = Box2D.Collision.Shapes.b2Shape,
            n = Box2D.Dynamics.Contacts.b2CircleContact,
            s = Box2D.Dynamics.Contacts.b2Contact,
            o = Box2D.Dynamics.Contacts.b2ContactConstraint,
            a = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
            l = Box2D.Dynamics.Contacts.b2ContactEdge,
            h = Box2D.Dynamics.Contacts.b2ContactFactory,
            c = Box2D.Dynamics.Contacts.b2ContactRegister,
            u = Box2D.Dynamics.Contacts.b2ContactResult,
            d = Box2D.Dynamics.Contacts.b2ContactSolver,
            p = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
            m = Box2D.Dynamics.Contacts.b2NullContact,
            f = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
            y = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
            g = Box2D.Dynamics.Contacts.b2PolygonContact,
            _ = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
            x = Box2D.Dynamics.b2Body,
            v = (Box2D.Dynamics.b2BodyDef, Box2D.Dynamics.b2ContactFilter, Box2D.Dynamics.b2ContactImpulse, Box2D.Dynamics.b2ContactListener, Box2D.Dynamics.b2ContactManager, Box2D.Dynamics.b2DebugDraw, Box2D.Dynamics.b2DestructionListener, Box2D.Dynamics.b2FilterData, Box2D.Dynamics.b2Fixture, Box2D.Dynamics.b2FixtureDef, Box2D.Dynamics.b2Island, Box2D.Dynamics.b2TimeStep),
            b = (Box2D.Dynamics.b2World, Box2D.Common.b2Color, Box2D.Common.b2internal, Box2D.Common.b2Settings),
            w = Box2D.Common.Math.b2Mat22,
            C = (Box2D.Common.Math.b2Mat33, Box2D.Common.Math.b2Math),
            S = (Box2D.Common.Math.b2Sweep, Box2D.Common.Math.b2Transform, Box2D.Common.Math.b2Vec2),
            T = (Box2D.Common.Math.b2Vec3, Box2D.Collision.b2AABB, Box2D.Collision.b2Bound, Box2D.Collision.b2BoundValues, Box2D.Collision.b2Collision),
            A = Box2D.Collision.b2ContactID,
            D = (Box2D.Collision.b2ContactPoint, Box2D.Collision.b2Distance, Box2D.Collision.b2DistanceInput, Box2D.Collision.b2DistanceOutput, Box2D.Collision.b2DistanceProxy, Box2D.Collision.b2DynamicTree, Box2D.Collision.b2DynamicTreeBroadPhase, Box2D.Collision.b2DynamicTreeNode, Box2D.Collision.b2DynamicTreePair, Box2D.Collision.b2Manifold),
            E = (Box2D.Collision.b2ManifoldPoint, Box2D.Collision.b2Point, Box2D.Collision.b2RayCastInput, Box2D.Collision.b2RayCastOutput, Box2D.Collision.b2Segment, Box2D.Collision.b2SeparationFunction, Box2D.Collision.b2Simplex, Box2D.Collision.b2SimplexCache, Box2D.Collision.b2SimplexVertex, Box2D.Collision.b2TimeOfImpact),
            B = Box2D.Collision.b2TOIInput,
            M = Box2D.Collision.b2WorldManifold;
        Box2D.Collision.ClipVertex, Box2D.Collision.Features, Box2D.Collision.IBroadPhase;
        Box2D.inherit(n, Box2D.Dynamics.Contacts.b2Contact), n.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype, n.b2CircleContact = function() {
            Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
        }, n.Create = function(t) {
            return new n
        }, n.Destroy = function(t, e) {}, n.prototype.Reset = function(t, e) {
            this.__super.Reset.call(this, t, e)
        }, n.prototype.Evaluate = function() {
            var e = this.m_fixtureA.GetBody(),
                i = this.m_fixtureB.GetBody();
            T.CollideCircles(this.m_manifold, this.m_fixtureA.GetShape() instanceof t ? this.m_fixtureA.GetShape() : null, e.m_xf, this.m_fixtureB.GetShape() instanceof t ? this.m_fixtureB.GetShape() : null, i.m_xf)
        }, s.b2Contact = function() {
            this.m_nodeA = new l, this.m_nodeB = new l, this.m_manifold = new D, this.m_oldManifold = new D
        }, s.prototype.GetManifold = function() {
            return this.m_manifold
        }, s.prototype.GetWorldManifold = function(t) {
            var e = this.m_fixtureA.GetBody(),
                i = this.m_fixtureB.GetBody(),
                r = this.m_fixtureA.GetShape(),
                n = this.m_fixtureB.GetShape();
            t.Initialize(this.m_manifold, e.GetTransform(), r.m_radius, i.GetTransform(), n.m_radius)
        }, s.prototype.IsTouching = function() {
            return (this.m_flags & s.e_touchingFlag) == s.e_touchingFlag
        }, s.prototype.IsContinuous = function() {
            return (this.m_flags & s.e_continuousFlag) == s.e_continuousFlag
        }, s.prototype.SetSensor = function(t) {
            t ? this.m_flags |= s.e_sensorFlag : this.m_flags &= ~s.e_sensorFlag
        }, s.prototype.IsSensor = function() {
            return (this.m_flags & s.e_sensorFlag) == s.e_sensorFlag
        }, s.prototype.SetEnabled = function(t) {
            t ? this.m_flags |= s.e_enabledFlag : this.m_flags &= ~s.e_enabledFlag
        }, s.prototype.IsEnabled = function() {
            return (this.m_flags & s.e_enabledFlag) == s.e_enabledFlag
        }, s.prototype.GetNext = function() {
            return this.m_next
        }, s.prototype.GetFixtureA = function() {
            return this.m_fixtureA
        }, s.prototype.GetFixtureB = function() {
            return this.m_fixtureB
        }, s.prototype.FlagForFiltering = function() {
            this.m_flags |= s.e_filterFlag
        }, s.prototype.b2Contact = function() {}, s.prototype.Reset = function(t, e) {
            if (void 0 === t && (t = null), void 0 === e && (e = null), this.m_flags = s.e_enabledFlag, !t || !e) return this.m_fixtureA = null, void(this.m_fixtureB = null);
            (t.IsSensor() || e.IsSensor()) && (this.m_flags |= s.e_sensorFlag);
            var i = t.GetBody(),
                r = e.GetBody();
            (i.GetType() != x.b2_dynamicBody || i.IsBullet() || r.GetType() != x.b2_dynamicBody || r.IsBullet()) && (this.m_flags |= s.e_continuousFlag), this.m_fixtureA = t, this.m_fixtureB = e, this.m_manifold.m_pointCount = 0, this.m_prev = null, this.m_next = null, this.m_nodeA.contact = null, this.m_nodeA.prev = null, this.m_nodeA.next = null, this.m_nodeA.other = null, this.m_nodeB.contact = null, this.m_nodeB.prev = null, this.m_nodeB.next = null, this.m_nodeB.other = null
        }, s.prototype.Update = function(t) {
            var e = this.m_oldManifold;
            this.m_oldManifold = this.m_manifold, this.m_manifold = e, this.m_flags |= s.e_enabledFlag;
            var i = !1,
                n = (this.m_flags & s.e_touchingFlag) == s.e_touchingFlag,
                o = this.m_fixtureA.m_body,
                a = this.m_fixtureB.m_body,
                l = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
            if (this.m_flags & s.e_sensorFlag) {
                if (l) {
                    var h = this.m_fixtureA.GetShape(),
                        c = this.m_fixtureB.GetShape(),
                        u = o.GetTransform(),
                        d = a.GetTransform();
                    i = r.TestOverlap(h, u, c, d)
                }
                this.m_manifold.m_pointCount = 0
            } else {
                if (o.GetType() != x.b2_dynamicBody || o.IsBullet() || a.GetType() != x.b2_dynamicBody || a.IsBullet() ? this.m_flags |= s.e_continuousFlag : this.m_flags &= ~s.e_continuousFlag, l) {
                    this.Evaluate(), i = this.m_manifold.m_pointCount > 0;
                    for (var p = 0; p < this.m_manifold.m_pointCount; ++p) {
                        var m = this.m_manifold.m_points[p];
                        m.m_normalImpulse = 0, m.m_tangentImpulse = 0;
                        for (var f = m.m_id, y = 0; y < this.m_oldManifold.m_pointCount; ++y) {
                            var g = this.m_oldManifold.m_points[y];
                            if (g.m_id.key == f.key) {
                                m.m_normalImpulse = g.m_normalImpulse, m.m_tangentImpulse = g.m_tangentImpulse;
                                break
                            }
                        }
                    }
                } else this.m_manifold.m_pointCount = 0;
                i != n && (o.SetAwake(!0), a.SetAwake(!0))
            }
            i ? this.m_flags |= s.e_touchingFlag : this.m_flags &= ~s.e_touchingFlag, 0 == n && 1 == i && t.BeginContact(this), 1 == n && 0 == i && t.EndContact(this), 0 == (this.m_flags & s.e_sensorFlag) && t.PreSolve(this, this.m_oldManifold)
        }, s.prototype.Evaluate = function() {}, s.prototype.ComputeTOI = function(t, e) {
            return s.s_input.proxyA.Set(this.m_fixtureA.GetShape()), s.s_input.proxyB.Set(this.m_fixtureB.GetShape()), s.s_input.sweepA = t, s.s_input.sweepB = e, s.s_input.tolerance = b.b2_linearSlop, E.TimeOfImpact(s.s_input)
        }, Box2D.postDefs.push((function() {
            Box2D.Dynamics.Contacts.b2Contact.e_sensorFlag = 1, Box2D.Dynamics.Contacts.b2Contact.e_continuousFlag = 2, Box2D.Dynamics.Contacts.b2Contact.e_islandFlag = 4, Box2D.Dynamics.Contacts.b2Contact.e_toiFlag = 8, Box2D.Dynamics.Contacts.b2Contact.e_touchingFlag = 16, Box2D.Dynamics.Contacts.b2Contact.e_enabledFlag = 32, Box2D.Dynamics.Contacts.b2Contact.e_filterFlag = 64, Box2D.Dynamics.Contacts.b2Contact.s_input = new B
        })), o.b2ContactConstraint = function() {
            this.localPlaneNormal = new S, this.localPoint = new S, this.normal = new S, this.normalMass = new w, this.K = new w
        }, o.prototype.b2ContactConstraint = function() {
            this.points = new Vector(b.b2_maxManifoldPoints);
            for (var t = 0; t < b.b2_maxManifoldPoints; t++) this.points[t] = new a
        }, a.b2ContactConstraintPoint = function() {
            this.localPoint = new S, this.rA = new S, this.rB = new S
        }, l.b2ContactEdge = function() {}, h.b2ContactFactory = function() {}, h.prototype.b2ContactFactory = function(t) {
            this.m_allocator = t, this.InitializeRegisters()
        }, h.prototype.AddType = function(t, e, i, r) {
            void 0 === i && (i = 0), void 0 === r && (r = 0), this.m_registers[i][r].createFcn = t, this.m_registers[i][r].destroyFcn = e, this.m_registers[i][r].primary = !0, i != r && (this.m_registers[r][i].createFcn = t, this.m_registers[r][i].destroyFcn = e, this.m_registers[r][i].primary = !1)
        }, h.prototype.InitializeRegisters = function() {
            this.m_registers = new Vector(r.e_shapeTypeCount);
            for (var t = 0; t < r.e_shapeTypeCount; t++) {
                this.m_registers[t] = new Vector(r.e_shapeTypeCount);
                for (var e = 0; e < r.e_shapeTypeCount; e++) this.m_registers[t][e] = new c
            }
            this.AddType(n.Create, n.Destroy, r.e_circleShape, r.e_circleShape), this.AddType(f.Create, f.Destroy, r.e_polygonShape, r.e_circleShape), this.AddType(g.Create, g.Destroy, r.e_polygonShape, r.e_polygonShape), this.AddType(p.Create, p.Destroy, r.e_edgeShape, r.e_circleShape), this.AddType(y.Create, y.Destroy, r.e_polygonShape, r.e_edgeShape)
        }, h.prototype.Create = function(t, e) {
            var i, r = parseInt(t.GetType()),
                n = parseInt(e.GetType()),
                s = this.m_registers[r][n];
            if (s.pool) return i = s.pool, s.pool = i.m_next, s.poolCount--, i.Reset(t, e), i;
            var o = s.createFcn;
            return null != o ? s.primary ? ((i = o(this.m_allocator)).Reset(t, e), i) : ((i = o(this.m_allocator)).Reset(e, t), i) : null
        }, h.prototype.Destroy = function(t) {
            t.m_manifold.m_pointCount > 0 && (t.m_fixtureA.m_body.SetAwake(!0), t.m_fixtureB.m_body.SetAwake(!0));
            var e = parseInt(t.m_fixtureA.GetType()),
                i = parseInt(t.m_fixtureB.GetType()),
                r = this.m_registers[e][i];
            r.poolCount++, t.m_next = r.pool, r.pool = t, (0, r.destroyFcn)(t, this.m_allocator)
        }, c.b2ContactRegister = function() {}, u.b2ContactResult = function() {
            this.position = new S, this.normal = new S, this.id = new A
        }, d.b2ContactSolver = function() {
            this.m_step = new v, this.m_constraints = new Vector
        }, d.prototype.b2ContactSolver = function() {}, d.prototype.Initialize = function(t, e, i, r) {
            var n;
            void 0 === i && (i = 0), this.m_step.Set(t), this.m_allocator = r;
            var s = 0;
            for (this.m_constraintCount = i; this.m_constraints.length < this.m_constraintCount;) this.m_constraints[this.m_constraints.length] = new o;
            for (s = 0; s < i; ++s) {
                var a = (n = e[s]).m_fixtureA,
                    l = n.m_fixtureB,
                    h = a.m_shape,
                    c = l.m_shape,
                    u = h.m_radius,
                    p = c.m_radius,
                    m = a.m_body,
                    f = l.m_body,
                    y = n.GetManifold(),
                    g = b.b2MixFriction(a.GetFriction(), l.GetFriction()),
                    _ = b.b2MixRestitution(a.GetRestitution(), l.GetRestitution()),
                    x = m.m_linearVelocity.x,
                    v = m.m_linearVelocity.y,
                    w = f.m_linearVelocity.x,
                    C = f.m_linearVelocity.y,
                    S = m.m_angularVelocity,
                    T = f.m_angularVelocity;
                b.b2Assert(y.m_pointCount > 0), d.s_worldManifold.Initialize(y, m.m_xf, u, f.m_xf, p);
                var A = d.s_worldManifold.m_normal.x,
                    D = d.s_worldManifold.m_normal.y,
                    E = this.m_constraints[s];
                E.bodyA = m, E.bodyB = f, E.manifold = y, E.normal.x = A, E.normal.y = D, E.pointCount = y.m_pointCount, E.friction = g, E.restitution = _, E.localPlaneNormal.x = y.m_localPlaneNormal.x, E.localPlaneNormal.y = y.m_localPlaneNormal.y, E.localPoint.x = y.m_localPoint.x, E.localPoint.y = y.m_localPoint.y, E.radius = u + p, E.type = y.m_type;
                for (var B = 0; B < E.pointCount; ++B) {
                    var M = y.m_points[B],
                        I = E.points[B];
                    I.normalImpulse = M.m_normalImpulse, I.tangentImpulse = M.m_tangentImpulse, I.localPoint.SetV(M.m_localPoint);
                    var P = I.rA.x = d.s_worldManifold.m_points[B].x - m.m_sweep.c.x,
                        R = I.rA.y = d.s_worldManifold.m_points[B].y - m.m_sweep.c.y,
                        k = I.rB.x = d.s_worldManifold.m_points[B].x - f.m_sweep.c.x,
                        F = I.rB.y = d.s_worldManifold.m_points[B].y - f.m_sweep.c.y,
                        L = P * D - R * A,
                        O = k * D - F * A;
                    L *= L, O *= O;
                    var N = m.m_invMass + f.m_invMass + m.m_invI * L + f.m_invI * O;
                    I.normalMass = 1 / N;
                    var G = m.m_mass * m.m_invMass + f.m_mass * f.m_invMass;
                    G += m.m_mass * m.m_invI * L + f.m_mass * f.m_invI * O, I.equalizedMass = 1 / G;
                    var V = -A,
                        U = P * V - R * D,
                        j = k * V - F * D;
                    U *= U, j *= j;
                    var z = m.m_invMass + f.m_invMass + m.m_invI * U + f.m_invI * j;
                    I.tangentMass = 1 / z, I.velocityBias = 0;
                    var $ = w + -T * F - x - -S * R,
                        H = C + T * k - v - S * P,
                        W = E.normal.x * $ + E.normal.y * H;
                    W < -b.b2_velocityThreshold && (I.velocityBias += -E.restitution * W)
                }
                if (2 == E.pointCount) {
                    var X = E.points[0],
                        Y = E.points[1],
                        J = m.m_invMass,
                        q = m.m_invI,
                        K = f.m_invMass,
                        Z = f.m_invI,
                        Q = X.rA.x * D - X.rA.y * A,
                        tt = X.rB.x * D - X.rB.y * A,
                        et = Y.rA.x * D - Y.rA.y * A,
                        it = Y.rB.x * D - Y.rB.y * A,
                        rt = J + K + q * Q * Q + Z * tt * tt,
                        nt = J + K + q * et * et + Z * it * it,
                        st = J + K + q * Q * et + Z * tt * it;
                    rt * rt < 100 * (rt * nt - st * st) ? (E.K.col1.Set(rt, st), E.K.col2.Set(st, nt), E.K.GetInverse(E.normalMass)) : E.pointCount = 1
                }
            }
        }, d.prototype.InitVelocityConstraints = function(t) {
            for (var e = 0; e < this.m_constraintCount; ++e) {
                var i = this.m_constraints[e],
                    r = i.bodyA,
                    n = i.bodyB,
                    s = r.m_invMass,
                    o = r.m_invI,
                    a = n.m_invMass,
                    l = n.m_invI,
                    h = i.normal.x,
                    c = i.normal.y,
                    u = c,
                    d = -h,
                    p = 0,
                    m = 0;
                if (t.warmStarting)
                    for (m = i.pointCount, p = 0; p < m; ++p) {
                        var f = i.points[p];
                        f.normalImpulse *= t.dtRatio, f.tangentImpulse *= t.dtRatio;
                        var y = f.normalImpulse * h + f.tangentImpulse * u,
                            g = f.normalImpulse * c + f.tangentImpulse * d;
                        r.m_angularVelocity -= o * (f.rA.x * g - f.rA.y * y), r.m_linearVelocity.x -= s * y, r.m_linearVelocity.y -= s * g, n.m_angularVelocity += l * (f.rB.x * g - f.rB.y * y), n.m_linearVelocity.x += a * y, n.m_linearVelocity.y += a * g
                    } else
                        for (m = i.pointCount, p = 0; p < m; ++p) {
                            var _ = i.points[p];
                            _.normalImpulse = 0, _.tangentImpulse = 0
                        }
            }
        }, d.prototype.SolveVelocityConstraints = function() {
            for (var t, e, i = 0, r = 0, n = 0, s = 0, o = 0, a = 0, l = 0, h = 0, c = 0, u = 0, d = 0, p = 0, m = 0, f = 0, y = 0; y < this.m_constraintCount; ++y) {
                var g = this.m_constraints[y],
                    _ = g.bodyA,
                    x = g.bodyB,
                    v = _.m_angularVelocity,
                    b = x.m_angularVelocity,
                    w = _.m_linearVelocity,
                    S = x.m_linearVelocity,
                    T = _.m_invMass,
                    A = _.m_invI,
                    D = x.m_invMass,
                    E = x.m_invI,
                    B = g.normal.x,
                    M = g.normal.y,
                    I = M,
                    P = -B,
                    R = g.friction;
                for (i = 0; i < g.pointCount; i++) t = g.points[i], n = (S.x - b * t.rB.y - w.x + v * t.rA.y) * I + (S.y + b * t.rB.x - w.y - v * t.rA.x) * P, s = t.tangentMass * -n, o = R * t.normalImpulse, l = (s = (a = C.Clamp(t.tangentImpulse + s, -o, o)) - t.tangentImpulse) * I, h = s * P, w.x -= T * l, w.y -= T * h, v -= A * (t.rA.x * h - t.rA.y * l), S.x += D * l, S.y += D * h, b += E * (t.rB.x * h - t.rB.y * l), t.tangentImpulse = a;
                parseInt(g.pointCount);
                if (1 == g.pointCount) t = g.points[0], r = (S.x + -b * t.rB.y - w.x - -v * t.rA.y) * B + (S.y + b * t.rB.x - w.y - v * t.rA.x) * M, s = -t.normalMass * (r - t.velocityBias), l = (s = (a = (a = t.normalImpulse + s) > 0 ? a : 0) - t.normalImpulse) * B, h = s * M, w.x -= T * l, w.y -= T * h, v -= A * (t.rA.x * h - t.rA.y * l), S.x += D * l, S.y += D * h, b += E * (t.rB.x * h - t.rB.y * l), t.normalImpulse = a;
                else {
                    var k = g.points[0],
                        F = g.points[1],
                        L = k.normalImpulse,
                        O = F.normalImpulse,
                        N = (S.x - b * k.rB.y - w.x + v * k.rA.y) * B + (S.y + b * k.rB.x - w.y - v * k.rA.x) * M,
                        G = (S.x - b * F.rB.y - w.x + v * F.rA.y) * B + (S.y + b * F.rB.x - w.y - v * F.rA.x) * M,
                        V = N - k.velocityBias,
                        U = G - F.velocityBias;
                    V -= (e = g.K).col1.x * L + e.col2.x * O, U -= e.col1.y * L + e.col2.y * O;
                    for (;;) {
                        var j = -((e = g.normalMass).col1.x * V + e.col2.x * U),
                            z = -(e.col1.y * V + e.col2.y * U);
                        if (j >= 0 && z >= 0) {
                            d = (c = j - L) * B, p = c * M, m = (u = z - O) * B, f = u * M, w.x -= T * (d + m), w.y -= T * (p + f), v -= A * (k.rA.x * p - k.rA.y * d + F.rA.x * f - F.rA.y * m), S.x += D * (d + m), S.y += D * (p + f), b += E * (k.rB.x * p - k.rB.y * d + F.rB.x * f - F.rB.y * m), k.normalImpulse = j, F.normalImpulse = z;
                            break
                        }
                        if (j = -k.normalMass * V, z = 0, N = 0, G = g.K.col1.y * j + U, j >= 0 && G >= 0) {
                            d = (c = j - L) * B, p = c * M, m = (u = z - O) * B, f = u * M, w.x -= T * (d + m), w.y -= T * (p + f), v -= A * (k.rA.x * p - k.rA.y * d + F.rA.x * f - F.rA.y * m), S.x += D * (d + m), S.y += D * (p + f), b += E * (k.rB.x * p - k.rB.y * d + F.rB.x * f - F.rB.y * m), k.normalImpulse = j, F.normalImpulse = z;
                            break
                        }
                        if (j = 0, z = -F.normalMass * U, N = g.K.col2.x * z + V, G = 0, z >= 0 && N >= 0) {
                            d = (c = j - L) * B, p = c * M, m = (u = z - O) * B, f = u * M, w.x -= T * (d + m), w.y -= T * (p + f), v -= A * (k.rA.x * p - k.rA.y * d + F.rA.x * f - F.rA.y * m), S.x += D * (d + m), S.y += D * (p + f), b += E * (k.rB.x * p - k.rB.y * d + F.rB.x * f - F.rB.y * m), k.normalImpulse = j, F.normalImpulse = z;
                            break
                        }
                        if (j = 0, z = 0, G = U, (N = V) >= 0 && G >= 0) {
                            d = (c = j - L) * B, p = c * M, m = (u = z - O) * B, f = u * M, w.x -= T * (d + m), w.y -= T * (p + f), v -= A * (k.rA.x * p - k.rA.y * d + F.rA.x * f - F.rA.y * m), S.x += D * (d + m), S.y += D * (p + f), b += E * (k.rB.x * p - k.rB.y * d + F.rB.x * f - F.rB.y * m), k.normalImpulse = j, F.normalImpulse = z;
                            break
                        }
                        break
                    }
                }
                _.m_angularVelocity = v, x.m_angularVelocity = b
            }
        }, d.prototype.FinalizeVelocityConstraints = function() {
            for (var t = 0; t < this.m_constraintCount; ++t)
                for (var e = this.m_constraints[t], i = e.manifold, r = 0; r < e.pointCount; ++r) {
                    var n = i.m_points[r],
                        s = e.points[r];
                    n.m_normalImpulse = s.normalImpulse, n.m_tangentImpulse = s.tangentImpulse
                }
        }, d.prototype.SolvePositionConstraints = function(t) {
            void 0 === t && (t = 0);
            for (var e = 0, i = 0; i < this.m_constraintCount; i++) {
                var r = this.m_constraints[i],
                    n = r.bodyA,
                    s = r.bodyB,
                    o = n.m_mass * n.m_invMass,
                    a = n.m_mass * n.m_invI,
                    l = s.m_mass * s.m_invMass,
                    h = s.m_mass * s.m_invI;
                d.s_psm.Initialize(r);
                for (var c = d.s_psm.m_normal, u = 0; u < r.pointCount; u++) {
                    var p = r.points[u],
                        m = d.s_psm.m_points[u],
                        f = d.s_psm.m_separations[u],
                        y = m.x - n.m_sweep.c.x,
                        g = m.y - n.m_sweep.c.y,
                        _ = m.x - s.m_sweep.c.x,
                        x = m.y - s.m_sweep.c.y;
                    e = e < f ? e : f;
                    var v = C.Clamp(t * (f + b.b2_linearSlop), -b.b2_maxLinearCorrection, 0),
                        w = -p.equalizedMass * v,
                        S = w * c.x,
                        T = w * c.y;
                    n.m_sweep.c.x -= o * S, n.m_sweep.c.y -= o * T, n.m_sweep.a -= a * (y * T - g * S), n.SynchronizeTransform(), s.m_sweep.c.x += l * S, s.m_sweep.c.y += l * T, s.m_sweep.a += h * (_ * T - x * S), s.SynchronizeTransform()
                }
            }
            return e > -1.5 * b.b2_linearSlop
        }, Box2D.postDefs.push((function() {
            Box2D.Dynamics.Contacts.b2ContactSolver.s_worldManifold = new M, Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new _
        })), Box2D.inherit(p, Box2D.Dynamics.Contacts.b2Contact), p.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype, p.b2EdgeAndCircleContact = function() {
            Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
        }, p.Create = function(t) {
            return new p
        }, p.Destroy = function(t, e) {}, p.prototype.Reset = function(t, e) {
            this.__super.Reset.call(this, t, e)
        }, p.prototype.Evaluate = function() {
            var i = this.m_fixtureA.GetBody(),
                r = this.m_fixtureB.GetBody();
            this.b2CollideEdgeAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof e ? this.m_fixtureA.GetShape() : null, i.m_xf, this.m_fixtureB.GetShape() instanceof t ? this.m_fixtureB.GetShape() : null, r.m_xf)
        }, p.prototype.b2CollideEdgeAndCircle = function(t, e, i, r, n) {}, Box2D.inherit(m, Box2D.Dynamics.Contacts.b2Contact), m.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype, m.b2NullContact = function() {
            Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
        }, m.prototype.b2NullContact = function() {
            this.__super.b2Contact.call(this)
        }, m.prototype.Evaluate = function() {}, Box2D.inherit(f, Box2D.Dynamics.Contacts.b2Contact), f.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype, f.b2PolyAndCircleContact = function() {
            Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
        }, f.Create = function(t) {
            return new f
        }, f.Destroy = function(t, e) {}, f.prototype.Reset = function(t, e) {
            this.__super.Reset.call(this, t, e), b.b2Assert(t.GetType() == r.e_polygonShape), b.b2Assert(e.GetType() == r.e_circleShape)
        }, f.prototype.Evaluate = function() {
            var e = this.m_fixtureA.m_body,
                r = this.m_fixtureB.m_body;
            T.CollidePolygonAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof i ? this.m_fixtureA.GetShape() : null, e.m_xf, this.m_fixtureB.GetShape() instanceof t ? this.m_fixtureB.GetShape() : null, r.m_xf)
        }, Box2D.inherit(y, Box2D.Dynamics.Contacts.b2Contact), y.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype, y.b2PolyAndEdgeContact = function() {
            Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
        }, y.Create = function(t) {
            return new y
        }, y.Destroy = function(t, e) {}, y.prototype.Reset = function(t, e) {
            this.__super.Reset.call(this, t, e), b.b2Assert(t.GetType() == r.e_polygonShape), b.b2Assert(e.GetType() == r.e_edgeShape)
        }, y.prototype.Evaluate = function() {
            var t = this.m_fixtureA.GetBody(),
                r = this.m_fixtureB.GetBody();
            this.b2CollidePolyAndEdge(this.m_manifold, this.m_fixtureA.GetShape() instanceof i ? this.m_fixtureA.GetShape() : null, t.m_xf, this.m_fixtureB.GetShape() instanceof e ? this.m_fixtureB.GetShape() : null, r.m_xf)
        }, y.prototype.b2CollidePolyAndEdge = function(t, e, i, r, n) {}, Box2D.inherit(g, Box2D.Dynamics.Contacts.b2Contact), g.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype, g.b2PolygonContact = function() {
            Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
        }, g.Create = function(t) {
            return new g
        }, g.Destroy = function(t, e) {}, g.prototype.Reset = function(t, e) {
            this.__super.Reset.call(this, t, e)
        }, g.prototype.Evaluate = function() {
            var t = this.m_fixtureA.GetBody(),
                e = this.m_fixtureB.GetBody();
            T.CollidePolygons(this.m_manifold, this.m_fixtureA.GetShape() instanceof i ? this.m_fixtureA.GetShape() : null, t.m_xf, this.m_fixtureB.GetShape() instanceof i ? this.m_fixtureB.GetShape() : null, e.m_xf)
        }, _.b2PositionSolverManifold = function() {}, _.prototype.b2PositionSolverManifold = function() {
            this.m_normal = new S, this.m_separations = new Vector_a2j_Number(b.b2_maxManifoldPoints), this.m_points = new Vector(b.b2_maxManifoldPoints);
            for (var t = 0; t < b.b2_maxManifoldPoints; t++) this.m_points[t] = new S
        }, _.prototype.Initialize = function(t) {
            b.b2Assert(t.pointCount > 0);
            var e, i, r = 0,
                n = 0,
                s = 0,
                o = 0,
                a = 0;
            switch (t.type) {
                case D.e_circles:
                    e = t.bodyA.m_xf.R, i = t.localPoint;
                    var l = t.bodyA.m_xf.position.x + (e.col1.x * i.x + e.col2.x * i.y),
                        h = t.bodyA.m_xf.position.y + (e.col1.y * i.x + e.col2.y * i.y);
                    e = t.bodyB.m_xf.R, i = t.points[0].localPoint;
                    var c = t.bodyB.m_xf.position.x + (e.col1.x * i.x + e.col2.x * i.y),
                        u = t.bodyB.m_xf.position.y + (e.col1.y * i.x + e.col2.y * i.y),
                        d = c - l,
                        p = u - h,
                        m = d * d + p * p;
                    if (m > Number.MIN_VALUE * Number.MIN_VALUE) {
                        var f = Math.sqrt(m);
                        this.m_normal.x = d / f, this.m_normal.y = p / f
                    } else this.m_normal.x = 1, this.m_normal.y = 0;
                    this.m_points[0].x = .5 * (l + c), this.m_points[0].y = .5 * (h + u), this.m_separations[0] = d * this.m_normal.x + p * this.m_normal.y - t.radius;
                    break;
                case D.e_faceA:
                    for (e = t.bodyA.m_xf.R, i = t.localPlaneNormal, this.m_normal.x = e.col1.x * i.x + e.col2.x * i.y, this.m_normal.y = e.col1.y * i.x + e.col2.y * i.y, e = t.bodyA.m_xf.R, i = t.localPoint, o = t.bodyA.m_xf.position.x + (e.col1.x * i.x + e.col2.x * i.y), a = t.bodyA.m_xf.position.y + (e.col1.y * i.x + e.col2.y * i.y), e = t.bodyB.m_xf.R, r = 0; r < t.pointCount; ++r) i = t.points[r].localPoint, n = t.bodyB.m_xf.position.x + (e.col1.x * i.x + e.col2.x * i.y), s = t.bodyB.m_xf.position.y + (e.col1.y * i.x + e.col2.y * i.y), this.m_separations[r] = (n - o) * this.m_normal.x + (s - a) * this.m_normal.y - t.radius, this.m_points[r].x = n, this.m_points[r].y = s;
                    break;
                case D.e_faceB:
                    for (e = t.bodyB.m_xf.R, i = t.localPlaneNormal, this.m_normal.x = e.col1.x * i.x + e.col2.x * i.y, this.m_normal.y = e.col1.y * i.x + e.col2.y * i.y, e = t.bodyB.m_xf.R, i = t.localPoint, o = t.bodyB.m_xf.position.x + (e.col1.x * i.x + e.col2.x * i.y), a = t.bodyB.m_xf.position.y + (e.col1.y * i.x + e.col2.y * i.y), e = t.bodyA.m_xf.R, r = 0; r < t.pointCount; ++r) i = t.points[r].localPoint, n = t.bodyA.m_xf.position.x + (e.col1.x * i.x + e.col2.x * i.y), s = t.bodyA.m_xf.position.y + (e.col1.y * i.x + e.col2.y * i.y), this.m_separations[r] = (n - o) * this.m_normal.x + (s - a) * this.m_normal.y - t.radius, this.m_points[r].Set(n, s);
                    this.m_normal.x *= -1, this.m_normal.y *= -1
            }
        }, Box2D.postDefs.push((function() {
            Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new S, Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB = new S
        }))
    }(), function() {
        Box2D.Dynamics.b2Body, Box2D.Dynamics.b2BodyDef, Box2D.Dynamics.b2ContactFilter, Box2D.Dynamics.b2ContactImpulse, Box2D.Dynamics.b2ContactListener, Box2D.Dynamics.b2ContactManager, Box2D.Dynamics.b2DebugDraw, Box2D.Dynamics.b2DestructionListener, Box2D.Dynamics.b2FilterData, Box2D.Dynamics.b2Fixture, Box2D.Dynamics.b2FixtureDef, Box2D.Dynamics.b2Island, Box2D.Dynamics.b2TimeStep, Box2D.Dynamics.b2World;
        var t = Box2D.Common.Math.b2Mat22,
            e = (Box2D.Common.Math.b2Mat33, Box2D.Common.Math.b2Math),
            i = (Box2D.Common.Math.b2Sweep, Box2D.Common.Math.b2Transform, Box2D.Common.Math.b2Vec2),
            r = (Box2D.Common.Math.b2Vec3, Box2D.Common.b2Color),
            n = (Box2D.Common.b2internal, Box2D.Common.b2Settings, Box2D.Collision.Shapes.b2CircleShape, Box2D.Collision.Shapes.b2EdgeChainDef, Box2D.Collision.Shapes.b2EdgeShape, Box2D.Collision.Shapes.b2MassData, Box2D.Collision.Shapes.b2PolygonShape, Box2D.Collision.Shapes.b2Shape, Box2D.Dynamics.Controllers.b2BuoyancyController),
            s = Box2D.Dynamics.Controllers.b2ConstantAccelController,
            o = Box2D.Dynamics.Controllers.b2ConstantForceController,
            a = Box2D.Dynamics.Controllers.b2Controller,
            l = Box2D.Dynamics.Controllers.b2ControllerEdge,
            h = Box2D.Dynamics.Controllers.b2GravityController,
            c = Box2D.Dynamics.Controllers.b2TensorDampingController;
        Box2D.inherit(n, Box2D.Dynamics.Controllers.b2Controller), n.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype, n.b2BuoyancyController = function() {
            Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments), this.normal = new i(0, -1), this.offset = 0, this.density = 0, this.velocity = new i(0, 0), this.linearDrag = 2, this.angularDrag = 1, this.useDensity = !1, this.useWorldGravity = !0, this.gravity = null
        }, n.prototype.Step = function(t) {
            if (this.m_bodyList) {
                this.useWorldGravity && (this.gravity = this.GetWorld().GetGravity().Copy());
                for (var e = this.m_bodyList; e; e = e.nextBody) {
                    var r = e.body;
                    if (0 != r.IsAwake()) {
                        for (var n = new i, s = new i, o = 0, a = 0, l = r.GetFixtureList(); l; l = l.GetNext()) {
                            var h = new i,
                                c = l.GetShape().ComputeSubmergedArea(this.normal, this.offset, r.GetTransform(), h);
                            o += c, n.x += c * h.x, n.y += c * h.y;
                            var u = 0;
                            a += c * (u = (this.useDensity, 1)), s.x += c * h.x * u, s.y += c * h.y * u
                        }
                        if (n.x /= o, n.y /= o, s.x /= a, s.y /= a, !(o < Number.MIN_VALUE)) {
                            var d = this.gravity.GetNegative();
                            d.Multiply(this.density * o), r.ApplyForce(d, s);
                            var p = r.GetLinearVelocityFromWorldPoint(n);
                            p.Subtract(this.velocity), p.Multiply(-this.linearDrag * o), r.ApplyForce(p, n), r.ApplyTorque(-r.GetInertia() / r.GetMass() * o * r.GetAngularVelocity() * this.angularDrag)
                        }
                    }
                }
            }
        }, n.prototype.Draw = function(t) {
            var e = 1e3,
                n = new i,
                s = new i;
            n.x = this.normal.x * this.offset + this.normal.y * e, n.y = this.normal.y * this.offset - this.normal.x * e, s.x = this.normal.x * this.offset - this.normal.y * e, s.y = this.normal.y * this.offset + this.normal.x * e;
            var o = new r(0, 0, 1);
            t.DrawSegment(n, s, o)
        }, Box2D.inherit(s, Box2D.Dynamics.Controllers.b2Controller), s.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype, s.b2ConstantAccelController = function() {
            Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments), this.A = new i(0, 0)
        }, s.prototype.Step = function(t) {
            for (var e = new i(this.A.x * t.dt, this.A.y * t.dt), r = this.m_bodyList; r; r = r.nextBody) {
                var n = r.body;
                n.IsAwake() && n.SetLinearVelocity(new i(n.GetLinearVelocity().x + e.x, n.GetLinearVelocity().y + e.y))
            }
        }, Box2D.inherit(o, Box2D.Dynamics.Controllers.b2Controller), o.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype, o.b2ConstantForceController = function() {
            Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments), this.F = new i(0, 0)
        }, o.prototype.Step = function(t) {
            for (var e = this.m_bodyList; e; e = e.nextBody) {
                var i = e.body;
                i.IsAwake() && i.ApplyForce(this.F, i.GetWorldCenter())
            }
        }, a.b2Controller = function() {}, a.prototype.Step = function(t) {}, a.prototype.Draw = function(t) {}, a.prototype.AddBody = function(t) {
            var e = new l;
            e.controller = this, e.body = t, e.nextBody = this.m_bodyList, e.prevBody = null, this.m_bodyList = e, e.nextBody && (e.nextBody.prevBody = e), this.m_bodyCount++, e.nextController = t.m_controllerList, e.prevController = null, t.m_controllerList = e, e.nextController && (e.nextController.prevController = e), t.m_controllerCount++
        }, a.prototype.RemoveBody = function(t) {
            for (var e = t.m_controllerList; e && e.controller != this;) e = e.nextController;
            e.prevBody && (e.prevBody.nextBody = e.nextBody), e.nextBody && (e.nextBody.prevBody = e.prevBody), e.nextController && (e.nextController.prevController = e.prevController), e.prevController && (e.prevController.nextController = e.nextController), this.m_bodyList == e && (this.m_bodyList = e.nextBody), t.m_controllerList == e && (t.m_controllerList = e.nextController), t.m_controllerCount--, this.m_bodyCount--
        }, a.prototype.Clear = function() {
            for (; this.m_bodyList;) this.RemoveBody(this.m_bodyList.body)
        }, a.prototype.GetNext = function() {
            return this.m_next
        }, a.prototype.GetWorld = function() {
            return this.m_world
        }, a.prototype.GetBodyList = function() {
            return this.m_bodyList
        }, l.b2ControllerEdge = function() {}, Box2D.inherit(h, Box2D.Dynamics.Controllers.b2Controller), h.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype, h.b2GravityController = function() {
            Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments), this.G = 1, this.invSqr = !0
        }, h.prototype.Step = function(t) {
            var e = null,
                r = null,
                n = null,
                s = 0,
                o = null,
                a = null,
                l = null,
                h = 0,
                c = 0,
                u = 0,
                d = null;
            if (this.invSqr)
                for (e = this.m_bodyList; e; e = e.nextBody)
                    for (n = (r = e.body).GetWorldCenter(), s = r.GetMass(), o = this.m_bodyList; o != e; o = o.nextBody)(u = (h = (l = (a = o.body).GetWorldCenter()).x - n.x) * h + (c = l.y - n.y) * c) < Number.MIN_VALUE || ((d = new i(h, c)).Multiply(this.G / u / Math.sqrt(u) * s * a.GetMass()), r.IsAwake() && r.ApplyForce(d, n), d.Multiply(-1), a.IsAwake() && a.ApplyForce(d, l));
            else
                for (e = this.m_bodyList; e; e = e.nextBody)
                    for (n = (r = e.body).GetWorldCenter(), s = r.GetMass(), o = this.m_bodyList; o != e; o = o.nextBody)(u = (h = (l = (a = o.body).GetWorldCenter()).x - n.x) * h + (c = l.y - n.y) * c) < Number.MIN_VALUE || ((d = new i(h, c)).Multiply(this.G / u * s * a.GetMass()), r.IsAwake() && r.ApplyForce(d, n), d.Multiply(-1), a.IsAwake() && a.ApplyForce(d, l))
        }, Box2D.inherit(c, Box2D.Dynamics.Controllers.b2Controller), c.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype, c.b2TensorDampingController = function() {
            Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments), this.T = new t, this.maxTimestep = 0
        }, c.prototype.SetAxisAligned = function(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this.T.col1.x = -t, this.T.col1.y = 0, this.T.col2.x = 0, this.T.col2.y = -e, this.maxTimestep = t > 0 || e > 0 ? 1 / Math.max(t, e) : 0
        }, c.prototype.Step = function(t) {
            var r = t.dt;
            if (!(r <= Number.MIN_VALUE)) {
                r > this.maxTimestep && this.maxTimestep > 0 && (r = this.maxTimestep);
                for (var n = this.m_bodyList; n; n = n.nextBody) {
                    var s = n.body;
                    if (s.IsAwake()) {
                        var o = s.GetWorldVector(e.MulMV(this.T, s.GetLocalVector(s.GetLinearVelocity())));
                        s.SetLinearVelocity(new i(s.GetLinearVelocity().x + o.x * r, s.GetLinearVelocity().y + o.y * r))
                    }
                }
            }
        }
    }(), function() {
        Box2D.Common.b2Color, Box2D.Common.b2internal;
        var t = Box2D.Common.b2Settings,
            e = Box2D.Common.Math.b2Mat22,
            i = Box2D.Common.Math.b2Mat33,
            r = Box2D.Common.Math.b2Math,
            n = (Box2D.Common.Math.b2Sweep, Box2D.Common.Math.b2Transform, Box2D.Common.Math.b2Vec2),
            s = Box2D.Common.Math.b2Vec3,
            o = Box2D.Dynamics.Joints.b2DistanceJoint,
            a = Box2D.Dynamics.Joints.b2DistanceJointDef,
            l = Box2D.Dynamics.Joints.b2FrictionJoint,
            h = Box2D.Dynamics.Joints.b2FrictionJointDef,
            c = Box2D.Dynamics.Joints.b2GearJoint,
            u = Box2D.Dynamics.Joints.b2GearJointDef,
            d = Box2D.Dynamics.Joints.b2Jacobian,
            p = Box2D.Dynamics.Joints.b2Joint,
            m = Box2D.Dynamics.Joints.b2JointDef,
            f = Box2D.Dynamics.Joints.b2JointEdge,
            y = Box2D.Dynamics.Joints.b2LineJoint,
            g = Box2D.Dynamics.Joints.b2LineJointDef,
            _ = Box2D.Dynamics.Joints.b2MouseJoint,
            x = Box2D.Dynamics.Joints.b2MouseJointDef,
            v = Box2D.Dynamics.Joints.b2PrismaticJoint,
            b = Box2D.Dynamics.Joints.b2PrismaticJointDef,
            w = Box2D.Dynamics.Joints.b2PulleyJoint,
            C = Box2D.Dynamics.Joints.b2PulleyJointDef,
            S = Box2D.Dynamics.Joints.b2RevoluteJoint,
            T = Box2D.Dynamics.Joints.b2RevoluteJointDef,
            A = Box2D.Dynamics.Joints.b2WeldJoint,
            D = Box2D.Dynamics.Joints.b2WeldJointDef;
        Box2D.Dynamics.b2Body, Box2D.Dynamics.b2BodyDef, Box2D.Dynamics.b2ContactFilter, Box2D.Dynamics.b2ContactImpulse, Box2D.Dynamics.b2ContactListener, Box2D.Dynamics.b2ContactManager, Box2D.Dynamics.b2DebugDraw, Box2D.Dynamics.b2DestructionListener, Box2D.Dynamics.b2FilterData, Box2D.Dynamics.b2Fixture, Box2D.Dynamics.b2FixtureDef, Box2D.Dynamics.b2Island, Box2D.Dynamics.b2TimeStep, Box2D.Dynamics.b2World;
        Box2D.inherit(o, Box2D.Dynamics.Joints.b2Joint), o.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, o.b2DistanceJoint = function() {
            Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_localAnchor1 = new n, this.m_localAnchor2 = new n, this.m_u = new n
        }, o.prototype.GetAnchorA = function() {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
        }, o.prototype.GetAnchorB = function() {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
        }, o.prototype.GetReactionForce = function(t) {
            return void 0 === t && (t = 0), new n(t * this.m_impulse * this.m_u.x, t * this.m_impulse * this.m_u.y)
        }, o.prototype.GetReactionTorque = function(t) {
            return void 0 === t && (t = 0), 0
        }, o.prototype.GetLength = function() {
            return this.m_length
        }, o.prototype.SetLength = function(t) {
            void 0 === t && (t = 0), this.m_length = t
        }, o.prototype.GetFrequency = function() {
            return this.m_frequencyHz
        }, o.prototype.SetFrequency = function(t) {
            void 0 === t && (t = 0), this.m_frequencyHz = t
        }, o.prototype.GetDampingRatio = function() {
            return this.m_dampingRatio
        }, o.prototype.SetDampingRatio = function(t) {
            void 0 === t && (t = 0), this.m_dampingRatio = t
        }, o.prototype.b2DistanceJoint = function(t) {
            this.__super.b2Joint.call(this, t);
            this.m_localAnchor1.SetV(t.localAnchorA), this.m_localAnchor2.SetV(t.localAnchorB), this.m_length = t.length, this.m_frequencyHz = t.frequencyHz, this.m_dampingRatio = t.dampingRatio, this.m_impulse = 0, this.m_gamma = 0, this.m_bias = 0
        }, o.prototype.InitVelocityConstraints = function(e) {
            var i, r = 0,
                n = this.m_bodyA,
                s = this.m_bodyB;
            i = n.m_xf.R;
            var o = this.m_localAnchor1.x - n.m_sweep.localCenter.x,
                a = this.m_localAnchor1.y - n.m_sweep.localCenter.y;
            r = i.col1.x * o + i.col2.x * a, a = i.col1.y * o + i.col2.y * a, o = r, i = s.m_xf.R;
            var l = this.m_localAnchor2.x - s.m_sweep.localCenter.x,
                h = this.m_localAnchor2.y - s.m_sweep.localCenter.y;
            r = i.col1.x * l + i.col2.x * h, h = i.col1.y * l + i.col2.y * h, l = r, this.m_u.x = s.m_sweep.c.x + l - n.m_sweep.c.x - o, this.m_u.y = s.m_sweep.c.y + h - n.m_sweep.c.y - a;
            var c = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
            c > t.b2_linearSlop ? this.m_u.Multiply(1 / c) : this.m_u.SetZero();
            var u = o * this.m_u.y - a * this.m_u.x,
                d = l * this.m_u.y - h * this.m_u.x,
                p = n.m_invMass + n.m_invI * u * u + s.m_invMass + s.m_invI * d * d;
            if (this.m_mass = 0 != p ? 1 / p : 0, this.m_frequencyHz > 0) {
                var m = c - this.m_length,
                    f = 2 * Math.PI * this.m_frequencyHz,
                    y = 2 * this.m_mass * this.m_dampingRatio * f,
                    g = this.m_mass * f * f;
                this.m_gamma = e.dt * (y + e.dt * g), this.m_gamma = 0 != this.m_gamma ? 1 / this.m_gamma : 0, this.m_bias = m * e.dt * g * this.m_gamma, this.m_mass = p + this.m_gamma, this.m_mass = 0 != this.m_mass ? 1 / this.m_mass : 0
            }
            if (e.warmStarting) {
                this.m_impulse *= e.dtRatio;
                var _ = this.m_impulse * this.m_u.x,
                    x = this.m_impulse * this.m_u.y;
                n.m_linearVelocity.x -= n.m_invMass * _, n.m_linearVelocity.y -= n.m_invMass * x, n.m_angularVelocity -= n.m_invI * (o * x - a * _), s.m_linearVelocity.x += s.m_invMass * _, s.m_linearVelocity.y += s.m_invMass * x, s.m_angularVelocity += s.m_invI * (l * x - h * _)
            } else this.m_impulse = 0
        }, o.prototype.SolveVelocityConstraints = function(t) {
            var e, i = this.m_bodyA,
                r = this.m_bodyB;
            e = i.m_xf.R;
            var n = this.m_localAnchor1.x - i.m_sweep.localCenter.x,
                s = this.m_localAnchor1.y - i.m_sweep.localCenter.y,
                o = e.col1.x * n + e.col2.x * s;
            s = e.col1.y * n + e.col2.y * s, n = o, e = r.m_xf.R;
            var a = this.m_localAnchor2.x - r.m_sweep.localCenter.x,
                l = this.m_localAnchor2.y - r.m_sweep.localCenter.y;
            o = e.col1.x * a + e.col2.x * l, l = e.col1.y * a + e.col2.y * l, a = o;
            var h = i.m_linearVelocity.x + -i.m_angularVelocity * s,
                c = i.m_linearVelocity.y + i.m_angularVelocity * n,
                u = r.m_linearVelocity.x + -r.m_angularVelocity * l,
                d = r.m_linearVelocity.y + r.m_angularVelocity * a,
                p = this.m_u.x * (u - h) + this.m_u.y * (d - c),
                m = -this.m_mass * (p + this.m_bias + this.m_gamma * this.m_impulse);
            this.m_impulse += m;
            var f = m * this.m_u.x,
                y = m * this.m_u.y;
            i.m_linearVelocity.x -= i.m_invMass * f, i.m_linearVelocity.y -= i.m_invMass * y, i.m_angularVelocity -= i.m_invI * (n * y - s * f), r.m_linearVelocity.x += r.m_invMass * f, r.m_linearVelocity.y += r.m_invMass * y, r.m_angularVelocity += r.m_invI * (a * y - l * f)
        }, o.prototype.SolvePositionConstraints = function(e) {
            var i;
            if (void 0 === e && (e = 0), this.m_frequencyHz > 0) return !0;
            var n = this.m_bodyA,
                s = this.m_bodyB;
            i = n.m_xf.R;
            var o = this.m_localAnchor1.x - n.m_sweep.localCenter.x,
                a = this.m_localAnchor1.y - n.m_sweep.localCenter.y,
                l = i.col1.x * o + i.col2.x * a;
            a = i.col1.y * o + i.col2.y * a, o = l, i = s.m_xf.R;
            var h = this.m_localAnchor2.x - s.m_sweep.localCenter.x,
                c = this.m_localAnchor2.y - s.m_sweep.localCenter.y;
            l = i.col1.x * h + i.col2.x * c, c = i.col1.y * h + i.col2.y * c, h = l;
            var u = s.m_sweep.c.x + h - n.m_sweep.c.x - o,
                d = s.m_sweep.c.y + c - n.m_sweep.c.y - a,
                p = Math.sqrt(u * u + d * d);
            u /= p, d /= p;
            var m = p - this.m_length;
            m = r.Clamp(m, -t.b2_maxLinearCorrection, t.b2_maxLinearCorrection);
            var f = -this.m_mass * m;
            this.m_u.Set(u, d);
            var y = f * this.m_u.x,
                g = f * this.m_u.y;
            return n.m_sweep.c.x -= n.m_invMass * y, n.m_sweep.c.y -= n.m_invMass * g, n.m_sweep.a -= n.m_invI * (o * g - a * y), s.m_sweep.c.x += s.m_invMass * y, s.m_sweep.c.y += s.m_invMass * g, s.m_sweep.a += s.m_invI * (h * g - c * y), n.SynchronizeTransform(), s.SynchronizeTransform(), r.Abs(m) < t.b2_linearSlop
        }, Box2D.inherit(a, Box2D.Dynamics.Joints.b2JointDef), a.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, a.b2DistanceJointDef = function() {
            Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.localAnchorA = new n, this.localAnchorB = new n
        }, a.prototype.b2DistanceJointDef = function() {
            this.__super.b2JointDef.call(this), this.type = p.e_distanceJoint, this.length = 1, this.frequencyHz = 0, this.dampingRatio = 0
        }, a.prototype.Initialize = function(t, e, i, r) {
            this.bodyA = t, this.bodyB = e, this.localAnchorA.SetV(this.bodyA.GetLocalPoint(i)), this.localAnchorB.SetV(this.bodyB.GetLocalPoint(r));
            var n = r.x - i.x,
                s = r.y - i.y;
            this.length = Math.sqrt(n * n + s * s), this.frequencyHz = 0, this.dampingRatio = 0
        }, Box2D.inherit(l, Box2D.Dynamics.Joints.b2Joint), l.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, l.b2FrictionJoint = function() {
            Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_localAnchorA = new n, this.m_localAnchorB = new n, this.m_linearMass = new e, this.m_linearImpulse = new n
        }, l.prototype.GetAnchorA = function() {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
        }, l.prototype.GetAnchorB = function() {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
        }, l.prototype.GetReactionForce = function(t) {
            return void 0 === t && (t = 0), new n(t * this.m_linearImpulse.x, t * this.m_linearImpulse.y)
        }, l.prototype.GetReactionTorque = function(t) {
            return void 0 === t && (t = 0), t * this.m_angularImpulse
        }, l.prototype.SetMaxForce = function(t) {
            void 0 === t && (t = 0), this.m_maxForce = t
        }, l.prototype.GetMaxForce = function() {
            return this.m_maxForce
        }, l.prototype.SetMaxTorque = function(t) {
            void 0 === t && (t = 0), this.m_maxTorque = t
        }, l.prototype.GetMaxTorque = function() {
            return this.m_maxTorque
        }, l.prototype.b2FrictionJoint = function(t) {
            this.__super.b2Joint.call(this, t), this.m_localAnchorA.SetV(t.localAnchorA), this.m_localAnchorB.SetV(t.localAnchorB), this.m_linearMass.SetZero(), this.m_angularMass = 0, this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0, this.m_maxForce = t.maxForce, this.m_maxTorque = t.maxTorque
        }, l.prototype.InitVelocityConstraints = function(t) {
            var i, r = 0,
                n = this.m_bodyA,
                s = this.m_bodyB;
            i = n.m_xf.R;
            var o = this.m_localAnchorA.x - n.m_sweep.localCenter.x,
                a = this.m_localAnchorA.y - n.m_sweep.localCenter.y;
            r = i.col1.x * o + i.col2.x * a, a = i.col1.y * o + i.col2.y * a, o = r, i = s.m_xf.R;
            var l = this.m_localAnchorB.x - s.m_sweep.localCenter.x,
                h = this.m_localAnchorB.y - s.m_sweep.localCenter.y;
            r = i.col1.x * l + i.col2.x * h, h = i.col1.y * l + i.col2.y * h, l = r;
            var c = n.m_invMass,
                u = s.m_invMass,
                d = n.m_invI,
                p = s.m_invI,
                m = new e;
            if (m.col1.x = c + u, m.col2.x = 0, m.col1.y = 0, m.col2.y = c + u, m.col1.x += d * a * a, m.col2.x += -d * o * a, m.col1.y += -d * o * a, m.col2.y += d * o * o, m.col1.x += p * h * h, m.col2.x += -p * l * h, m.col1.y += -p * l * h, m.col2.y += p * l * l, m.GetInverse(this.m_linearMass), this.m_angularMass = d + p, this.m_angularMass > 0 && (this.m_angularMass = 1 / this.m_angularMass), t.warmStarting) {
                this.m_linearImpulse.x *= t.dtRatio, this.m_linearImpulse.y *= t.dtRatio, this.m_angularImpulse *= t.dtRatio;
                var f = this.m_linearImpulse;
                n.m_linearVelocity.x -= c * f.x, n.m_linearVelocity.y -= c * f.y, n.m_angularVelocity -= d * (o * f.y - a * f.x + this.m_angularImpulse), s.m_linearVelocity.x += u * f.x, s.m_linearVelocity.y += u * f.y, s.m_angularVelocity += p * (l * f.y - h * f.x + this.m_angularImpulse)
            } else this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0
        }, l.prototype.SolveVelocityConstraints = function(t) {
            var e, i = 0,
                s = this.m_bodyA,
                o = this.m_bodyB,
                a = s.m_linearVelocity,
                l = s.m_angularVelocity,
                h = o.m_linearVelocity,
                c = o.m_angularVelocity,
                u = s.m_invMass,
                d = o.m_invMass,
                p = s.m_invI,
                m = o.m_invI;
            e = s.m_xf.R;
            var f = this.m_localAnchorA.x - s.m_sweep.localCenter.x,
                y = this.m_localAnchorA.y - s.m_sweep.localCenter.y;
            i = e.col1.x * f + e.col2.x * y, y = e.col1.y * f + e.col2.y * y, f = i, e = o.m_xf.R;
            var g = this.m_localAnchorB.x - o.m_sweep.localCenter.x,
                _ = this.m_localAnchorB.y - o.m_sweep.localCenter.y;
            i = e.col1.x * g + e.col2.x * _, _ = e.col1.y * g + e.col2.y * _, g = i;
            var x = 0,
                v = c - l,
                b = -this.m_angularMass * v,
                w = this.m_angularImpulse;
            x = t.dt * this.m_maxTorque, this.m_angularImpulse = r.Clamp(this.m_angularImpulse + b, -x, x), l -= p * (b = this.m_angularImpulse - w), c += m * b;
            var C = h.x - c * _ - a.x + l * y,
                S = h.y + c * g - a.y - l * f,
                T = r.MulMV(this.m_linearMass, new n(-C, -S)),
                A = this.m_linearImpulse.Copy();
            this.m_linearImpulse.Add(T), x = t.dt * this.m_maxForce, this.m_linearImpulse.LengthSquared() > x * x && (this.m_linearImpulse.Normalize(), this.m_linearImpulse.Multiply(x)), T = r.SubtractVV(this.m_linearImpulse, A), a.x -= u * T.x, a.y -= u * T.y, l -= p * (f * T.y - y * T.x), h.x += d * T.x, h.y += d * T.y, c += m * (g * T.y - _ * T.x), s.m_angularVelocity = l, o.m_angularVelocity = c
        }, l.prototype.SolvePositionConstraints = function(t) {
            return void 0 === t && (t = 0), !0
        }, Box2D.inherit(h, Box2D.Dynamics.Joints.b2JointDef), h.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, h.b2FrictionJointDef = function() {
            Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.localAnchorA = new n, this.localAnchorB = new n
        }, h.prototype.b2FrictionJointDef = function() {
            this.__super.b2JointDef.call(this), this.type = p.e_frictionJoint, this.maxForce = 0, this.maxTorque = 0
        }, h.prototype.Initialize = function(t, e, i) {
            this.bodyA = t, this.bodyB = e, this.localAnchorA.SetV(this.bodyA.GetLocalPoint(i)), this.localAnchorB.SetV(this.bodyB.GetLocalPoint(i))
        }, Box2D.inherit(c, Box2D.Dynamics.Joints.b2Joint), c.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, c.b2GearJoint = function() {
            Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_groundAnchor1 = new n, this.m_groundAnchor2 = new n, this.m_localAnchor1 = new n, this.m_localAnchor2 = new n, this.m_J = new d
        }, c.prototype.GetAnchorA = function() {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
        }, c.prototype.GetAnchorB = function() {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
        }, c.prototype.GetReactionForce = function(t) {
            return void 0 === t && (t = 0), new n(t * this.m_impulse * this.m_J.linearB.x, t * this.m_impulse * this.m_J.linearB.y)
        }, c.prototype.GetReactionTorque = function(t) {
            void 0 === t && (t = 0);
            var e = this.m_bodyB.m_xf.R,
                i = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x,
                r = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y,
                n = e.col1.x * i + e.col2.x * r;
            r = e.col1.y * i + e.col2.y * r, i = n;
            var s = this.m_impulse * this.m_J.linearB.x,
                o = this.m_impulse * this.m_J.linearB.y;
            return t * (this.m_impulse * this.m_J.angularB - i * o + r * s)
        }, c.prototype.GetRatio = function() {
            return this.m_ratio
        }, c.prototype.SetRatio = function(t) {
            void 0 === t && (t = 0), this.m_ratio = t
        }, c.prototype.b2GearJoint = function(t) {
            this.__super.b2Joint.call(this, t);
            var e = parseInt(t.joint1.m_type),
                i = parseInt(t.joint2.m_type);
            this.m_revolute1 = null, this.m_prismatic1 = null, this.m_revolute2 = null, this.m_prismatic2 = null;
            var r = 0,
                n = 0;
            this.m_ground1 = t.joint1.GetBodyA(), this.m_bodyA = t.joint1.GetBodyB(), e == p.e_revoluteJoint ? (this.m_revolute1 = t.joint1 instanceof S ? t.joint1 : null, this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2), r = this.m_revolute1.GetJointAngle()) : (this.m_prismatic1 = t.joint1 instanceof v ? t.joint1 : null, this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2), r = this.m_prismatic1.GetJointTranslation()), this.m_ground2 = t.joint2.GetBodyA(), this.m_bodyB = t.joint2.GetBodyB(), i == p.e_revoluteJoint ? (this.m_revolute2 = t.joint2 instanceof S ? t.joint2 : null, this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2), n = this.m_revolute2.GetJointAngle()) : (this.m_prismatic2 = t.joint2 instanceof v ? t.joint2 : null, this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2), n = this.m_prismatic2.GetJointTranslation()), this.m_ratio = t.ratio, this.m_constant = r + this.m_ratio * n, this.m_impulse = 0
        }, c.prototype.InitVelocityConstraints = function(t) {
            var e, i, r = this.m_ground1,
                n = this.m_ground2,
                s = this.m_bodyA,
                o = this.m_bodyB,
                a = 0,
                l = 0,
                h = 0,
                c = 0,
                u = 0,
                d = 0,
                p = 0;
            this.m_J.SetZero(), this.m_revolute1 ? (this.m_J.angularA = -1, p += s.m_invI) : (e = r.m_xf.R, i = this.m_prismatic1.m_localXAxis1, a = e.col1.x * i.x + e.col2.x * i.y, l = e.col1.y * i.x + e.col2.y * i.y, e = s.m_xf.R, h = this.m_localAnchor1.x - s.m_sweep.localCenter.x, c = this.m_localAnchor1.y - s.m_sweep.localCenter.y, d = e.col1.x * h + e.col2.x * c, c = e.col1.y * h + e.col2.y * c, u = (h = d) * l - c * a, this.m_J.linearA.Set(-a, -l), this.m_J.angularA = -u, p += s.m_invMass + s.m_invI * u * u), this.m_revolute2 ? (this.m_J.angularB = -this.m_ratio, p += this.m_ratio * this.m_ratio * o.m_invI) : (e = n.m_xf.R, i = this.m_prismatic2.m_localXAxis1, a = e.col1.x * i.x + e.col2.x * i.y, l = e.col1.y * i.x + e.col2.y * i.y, e = o.m_xf.R, h = this.m_localAnchor2.x - o.m_sweep.localCenter.x, c = this.m_localAnchor2.y - o.m_sweep.localCenter.y, d = e.col1.x * h + e.col2.x * c, c = e.col1.y * h + e.col2.y * c, u = (h = d) * l - c * a, this.m_J.linearB.Set(-this.m_ratio * a, -this.m_ratio * l), this.m_J.angularB = -this.m_ratio * u, p += this.m_ratio * this.m_ratio * (o.m_invMass + o.m_invI * u * u)), this.m_mass = p > 0 ? 1 / p : 0, t.warmStarting ? (s.m_linearVelocity.x += s.m_invMass * this.m_impulse * this.m_J.linearA.x, s.m_linearVelocity.y += s.m_invMass * this.m_impulse * this.m_J.linearA.y, s.m_angularVelocity += s.m_invI * this.m_impulse * this.m_J.angularA, o.m_linearVelocity.x += o.m_invMass * this.m_impulse * this.m_J.linearB.x, o.m_linearVelocity.y += o.m_invMass * this.m_impulse * this.m_J.linearB.y, o.m_angularVelocity += o.m_invI * this.m_impulse * this.m_J.angularB) : this.m_impulse = 0
        }, c.prototype.SolveVelocityConstraints = function(t) {
            var e = this.m_bodyA,
                i = this.m_bodyB,
                r = this.m_J.Compute(e.m_linearVelocity, e.m_angularVelocity, i.m_linearVelocity, i.m_angularVelocity),
                n = -this.m_mass * r;
            this.m_impulse += n, e.m_linearVelocity.x += e.m_invMass * n * this.m_J.linearA.x, e.m_linearVelocity.y += e.m_invMass * n * this.m_J.linearA.y, e.m_angularVelocity += e.m_invI * n * this.m_J.angularA, i.m_linearVelocity.x += i.m_invMass * n * this.m_J.linearB.x, i.m_linearVelocity.y += i.m_invMass * n * this.m_J.linearB.y, i.m_angularVelocity += i.m_invI * n * this.m_J.angularB
        }, c.prototype.SolvePositionConstraints = function(e) {
            void 0 === e && (e = 0);
            var i = this.m_bodyA,
                r = this.m_bodyB,
                n = 0,
                s = 0;
            n = this.m_revolute1 ? this.m_revolute1.GetJointAngle() : this.m_prismatic1.GetJointTranslation(), s = this.m_revolute2 ? this.m_revolute2.GetJointAngle() : this.m_prismatic2.GetJointTranslation();
            var o = this.m_constant - (n + this.m_ratio * s),
                a = -this.m_mass * o;
            return i.m_sweep.c.x += i.m_invMass * a * this.m_J.linearA.x, i.m_sweep.c.y += i.m_invMass * a * this.m_J.linearA.y, i.m_sweep.a += i.m_invI * a * this.m_J.angularA, r.m_sweep.c.x += r.m_invMass * a * this.m_J.linearB.x, r.m_sweep.c.y += r.m_invMass * a * this.m_J.linearB.y, r.m_sweep.a += r.m_invI * a * this.m_J.angularB, i.SynchronizeTransform(), r.SynchronizeTransform(), 0 < t.b2_linearSlop
        }, Box2D.inherit(u, Box2D.Dynamics.Joints.b2JointDef), u.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, u.b2GearJointDef = function() {
            Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments)
        }, u.prototype.b2GearJointDef = function() {
            this.__super.b2JointDef.call(this), this.type = p.e_gearJoint, this.joint1 = null, this.joint2 = null, this.ratio = 1
        }, d.b2Jacobian = function() {
            this.linearA = new n, this.linearB = new n
        }, d.prototype.SetZero = function() {
            this.linearA.SetZero(), this.angularA = 0, this.linearB.SetZero(), this.angularB = 0
        }, d.prototype.Set = function(t, e, i, r) {
            void 0 === e && (e = 0), void 0 === r && (r = 0), this.linearA.SetV(t), this.angularA = e, this.linearB.SetV(i), this.angularB = r
        }, d.prototype.Compute = function(t, e, i, r) {
            return void 0 === e && (e = 0), void 0 === r && (r = 0), this.linearA.x * t.x + this.linearA.y * t.y + this.angularA * e + (this.linearB.x * i.x + this.linearB.y * i.y) + this.angularB * r
        }, p.b2Joint = function() {
            this.m_edgeA = new f, this.m_edgeB = new f, this.m_localCenterA = new n, this.m_localCenterB = new n
        }, p.prototype.GetType = function() {
            return this.m_type
        }, p.prototype.GetAnchorA = function() {
            return null
        }, p.prototype.GetAnchorB = function() {
            return null
        }, p.prototype.GetReactionForce = function(t) {
            return void 0 === t && (t = 0), null
        }, p.prototype.GetReactionTorque = function(t) {
            return void 0 === t && (t = 0), 0
        }, p.prototype.GetBodyA = function() {
            return this.m_bodyA
        }, p.prototype.GetBodyB = function() {
            return this.m_bodyB
        }, p.prototype.GetNext = function() {
            return this.m_next
        }, p.prototype.GetUserData = function() {
            return this.m_userData
        }, p.prototype.SetUserData = function(t) {
            this.m_userData = t
        }, p.prototype.IsActive = function() {
            return this.m_bodyA.IsActive() && this.m_bodyB.IsActive()
        }, p.Create = function(t, e) {
            var i = null;
            switch (t.type) {
                case p.e_distanceJoint:
                    i = new o(t instanceof a ? t : null);
                    break;
                case p.e_mouseJoint:
                    i = new _(t instanceof x ? t : null);
                    break;
                case p.e_prismaticJoint:
                    i = new v(t instanceof b ? t : null);
                    break;
                case p.e_revoluteJoint:
                    i = new S(t instanceof T ? t : null);
                    break;
                case p.e_pulleyJoint:
                    i = new w(t instanceof C ? t : null);
                    break;
                case p.e_gearJoint:
                    i = new c(t instanceof u ? t : null);
                    break;
                case p.e_lineJoint:
                    i = new y(t instanceof g ? t : null);
                    break;
                case p.e_weldJoint:
                    i = new A(t instanceof D ? t : null);
                    break;
                case p.e_frictionJoint:
                    i = new l(t instanceof h ? t : null)
            }
            return i
        }, p.Destroy = function(t, e) {}, p.prototype.b2Joint = function(e) {
            t.b2Assert(e.bodyA != e.bodyB), this.m_type = e.type, this.m_prev = null, this.m_next = null, this.m_bodyA = e.bodyA, this.m_bodyB = e.bodyB, this.m_collideConnected = e.collideConnected, this.m_islandFlag = !1, this.m_userData = e.userData
        }, p.prototype.InitVelocityConstraints = function(t) {}, p.prototype.SolveVelocityConstraints = function(t) {}, p.prototype.FinalizeVelocityConstraints = function() {}, p.prototype.SolvePositionConstraints = function(t) {
            return void 0 === t && (t = 0), !1
        }, Box2D.postDefs.push((function() {
            Box2D.Dynamics.Joints.b2Joint.e_unknownJoint = 0, Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint = 1, Box2D.Dynamics.Joints.b2Joint.e_prismaticJoint = 2, Box2D.Dynamics.Joints.b2Joint.e_distanceJoint = 3, Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint = 4, Box2D.Dynamics.Joints.b2Joint.e_mouseJoint = 5, Box2D.Dynamics.Joints.b2Joint.e_gearJoint = 6, Box2D.Dynamics.Joints.b2Joint.e_lineJoint = 7, Box2D.Dynamics.Joints.b2Joint.e_weldJoint = 8, Box2D.Dynamics.Joints.b2Joint.e_frictionJoint = 9, Box2D.Dynamics.Joints.b2Joint.e_inactiveLimit = 0, Box2D.Dynamics.Joints.b2Joint.e_atLowerLimit = 1, Box2D.Dynamics.Joints.b2Joint.e_atUpperLimit = 2, Box2D.Dynamics.Joints.b2Joint.e_equalLimits = 3
        })), m.b2JointDef = function() {}, m.prototype.b2JointDef = function() {
            this.type = p.e_unknownJoint, this.userData = null, this.bodyA = null, this.bodyB = null, this.collideConnected = !1
        }, f.b2JointEdge = function() {}, Box2D.inherit(y, Box2D.Dynamics.Joints.b2Joint), y.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, y.b2LineJoint = function() {
            Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_localAnchor1 = new n, this.m_localAnchor2 = new n, this.m_localXAxis1 = new n, this.m_localYAxis1 = new n, this.m_axis = new n, this.m_perp = new n, this.m_K = new e, this.m_impulse = new n
        }, y.prototype.GetAnchorA = function() {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
        }, y.prototype.GetAnchorB = function() {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
        }, y.prototype.GetReactionForce = function(t) {
            return void 0 === t && (t = 0), new n(t * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), t * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y))
        }, y.prototype.GetReactionTorque = function(t) {
            return void 0 === t && (t = 0), t * this.m_impulse.y
        }, y.prototype.GetJointTranslation = function() {
            var t = this.m_bodyA,
                e = this.m_bodyB,
                i = t.GetWorldPoint(this.m_localAnchor1),
                r = e.GetWorldPoint(this.m_localAnchor2),
                n = r.x - i.x,
                s = r.y - i.y,
                o = t.GetWorldVector(this.m_localXAxis1);
            return o.x * n + o.y * s
        }, y.prototype.GetJointSpeed = function() {
            var t, e = this.m_bodyA,
                i = this.m_bodyB;
            t = e.m_xf.R;
            var r = this.m_localAnchor1.x - e.m_sweep.localCenter.x,
                n = this.m_localAnchor1.y - e.m_sweep.localCenter.y,
                s = t.col1.x * r + t.col2.x * n;
            n = t.col1.y * r + t.col2.y * n, r = s, t = i.m_xf.R;
            var o = this.m_localAnchor2.x - i.m_sweep.localCenter.x,
                a = this.m_localAnchor2.y - i.m_sweep.localCenter.y;
            s = t.col1.x * o + t.col2.x * a, a = t.col1.y * o + t.col2.y * a, o = s;
            var l = e.m_sweep.c.x + r,
                h = e.m_sweep.c.y + n,
                c = i.m_sweep.c.x + o - l,
                u = i.m_sweep.c.y + a - h,
                d = e.GetWorldVector(this.m_localXAxis1),
                p = e.m_linearVelocity,
                m = i.m_linearVelocity,
                f = e.m_angularVelocity,
                y = i.m_angularVelocity;
            return c * (-f * d.y) + u * (f * d.x) + (d.x * (m.x + -y * a - p.x - -f * n) + d.y * (m.y + y * o - p.y - f * r))
        }, y.prototype.IsLimitEnabled = function() {
            return this.m_enableLimit
        }, y.prototype.EnableLimit = function(t) {
            this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableLimit = t
        }, y.prototype.GetLowerLimit = function() {
            return this.m_lowerTranslation
        }, y.prototype.GetUpperLimit = function() {
            return this.m_upperTranslation
        }, y.prototype.SetLimits = function(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_lowerTranslation = t, this.m_upperTranslation = e
        }, y.prototype.IsMotorEnabled = function() {
            return this.m_enableMotor
        }, y.prototype.EnableMotor = function(t) {
            this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableMotor = t
        }, y.prototype.SetMotorSpeed = function(t) {
            void 0 === t && (t = 0), this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_motorSpeed = t
        }, y.prototype.GetMotorSpeed = function() {
            return this.m_motorSpeed
        }, y.prototype.SetMaxMotorForce = function(t) {
            void 0 === t && (t = 0), this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_maxMotorForce = t
        }, y.prototype.GetMaxMotorForce = function() {
            return this.m_maxMotorForce
        }, y.prototype.GetMotorForce = function() {
            return this.m_motorImpulse
        }, y.prototype.b2LineJoint = function(t) {
            this.__super.b2Joint.call(this, t);
            this.m_localAnchor1.SetV(t.localAnchorA), this.m_localAnchor2.SetV(t.localAnchorB), this.m_localXAxis1.SetV(t.localAxisA), this.m_localYAxis1.x = -this.m_localXAxis1.y, this.m_localYAxis1.y = this.m_localXAxis1.x, this.m_impulse.SetZero(), this.m_motorMass = 0, this.m_motorImpulse = 0, this.m_lowerTranslation = t.lowerTranslation, this.m_upperTranslation = t.upperTranslation, this.m_maxMotorForce = t.maxMotorForce, this.m_motorSpeed = t.motorSpeed, this.m_enableLimit = t.enableLimit, this.m_enableMotor = t.enableMotor, this.m_limitState = p.e_inactiveLimit, this.m_axis.SetZero(), this.m_perp.SetZero()
        }, y.prototype.InitVelocityConstraints = function(e) {
            var i, n = this.m_bodyA,
                s = this.m_bodyB,
                o = 0;
            this.m_localCenterA.SetV(n.GetLocalCenter()), this.m_localCenterB.SetV(s.GetLocalCenter());
            var a = n.GetTransform();
            s.GetTransform();
            i = n.m_xf.R;
            var l = this.m_localAnchor1.x - this.m_localCenterA.x,
                h = this.m_localAnchor1.y - this.m_localCenterA.y;
            o = i.col1.x * l + i.col2.x * h, h = i.col1.y * l + i.col2.y * h, l = o, i = s.m_xf.R;
            var c = this.m_localAnchor2.x - this.m_localCenterB.x,
                u = this.m_localAnchor2.y - this.m_localCenterB.y;
            o = i.col1.x * c + i.col2.x * u, u = i.col1.y * c + i.col2.y * u, c = o;
            var d = s.m_sweep.c.x + c - n.m_sweep.c.x - l,
                m = s.m_sweep.c.y + u - n.m_sweep.c.y - h;
            this.m_invMassA = n.m_invMass, this.m_invMassB = s.m_invMass, this.m_invIA = n.m_invI, this.m_invIB = s.m_invI, this.m_axis.SetV(r.MulMV(a.R, this.m_localXAxis1)), this.m_a1 = (d + l) * this.m_axis.y - (m + h) * this.m_axis.x, this.m_a2 = c * this.m_axis.y - u * this.m_axis.x, this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2, this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1 / this.m_motorMass : 0, this.m_perp.SetV(r.MulMV(a.R, this.m_localYAxis1)), this.m_s1 = (d + l) * this.m_perp.y - (m + h) * this.m_perp.x, this.m_s2 = c * this.m_perp.y - u * this.m_perp.x;
            var f = this.m_invMassA,
                y = this.m_invMassB,
                g = this.m_invIA,
                _ = this.m_invIB;
            if (this.m_K.col1.x = f + y + g * this.m_s1 * this.m_s1 + _ * this.m_s2 * this.m_s2, this.m_K.col1.y = g * this.m_s1 * this.m_a1 + _ * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = f + y + g * this.m_a1 * this.m_a1 + _ * this.m_a2 * this.m_a2, this.m_enableLimit) {
                var x = this.m_axis.x * d + this.m_axis.y * m;
                r.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * t.b2_linearSlop ? this.m_limitState = p.e_equalLimits : x <= this.m_lowerTranslation ? this.m_limitState != p.e_atLowerLimit && (this.m_limitState = p.e_atLowerLimit, this.m_impulse.y = 0) : x >= this.m_upperTranslation ? this.m_limitState != p.e_atUpperLimit && (this.m_limitState = p.e_atUpperLimit, this.m_impulse.y = 0) : (this.m_limitState = p.e_inactiveLimit, this.m_impulse.y = 0)
            } else this.m_limitState = p.e_inactiveLimit;
            if (0 == this.m_enableMotor && (this.m_motorImpulse = 0), e.warmStarting) {
                this.m_impulse.x *= e.dtRatio, this.m_impulse.y *= e.dtRatio, this.m_motorImpulse *= e.dtRatio;
                var v = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x,
                    b = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y,
                    w = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1,
                    C = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2;
                n.m_linearVelocity.x -= this.m_invMassA * v, n.m_linearVelocity.y -= this.m_invMassA * b, n.m_angularVelocity -= this.m_invIA * w, s.m_linearVelocity.x += this.m_invMassB * v, s.m_linearVelocity.y += this.m_invMassB * b, s.m_angularVelocity += this.m_invIB * C
            } else this.m_impulse.SetZero(), this.m_motorImpulse = 0
        }, y.prototype.SolveVelocityConstraints = function(t) {
            var e = this.m_bodyA,
                i = this.m_bodyB,
                s = e.m_linearVelocity,
                o = e.m_angularVelocity,
                a = i.m_linearVelocity,
                l = i.m_angularVelocity,
                h = 0,
                c = 0,
                u = 0,
                d = 0;
            if (this.m_enableMotor && this.m_limitState != p.e_equalLimits) {
                var m = this.m_axis.x * (a.x - s.x) + this.m_axis.y * (a.y - s.y) + this.m_a2 * l - this.m_a1 * o,
                    f = this.m_motorMass * (this.m_motorSpeed - m),
                    y = this.m_motorImpulse,
                    g = t.dt * this.m_maxMotorForce;
                this.m_motorImpulse = r.Clamp(this.m_motorImpulse + f, -g, g), h = (f = this.m_motorImpulse - y) * this.m_axis.x, c = f * this.m_axis.y, u = f * this.m_a1, d = f * this.m_a2, s.x -= this.m_invMassA * h, s.y -= this.m_invMassA * c, o -= this.m_invIA * u, a.x += this.m_invMassB * h, a.y += this.m_invMassB * c, l += this.m_invIB * d
            }
            var _ = this.m_perp.x * (a.x - s.x) + this.m_perp.y * (a.y - s.y) + this.m_s2 * l - this.m_s1 * o;
            if (this.m_enableLimit && this.m_limitState != p.e_inactiveLimit) {
                var x = this.m_axis.x * (a.x - s.x) + this.m_axis.y * (a.y - s.y) + this.m_a2 * l - this.m_a1 * o,
                    v = this.m_impulse.Copy(),
                    b = this.m_K.Solve(new n, -_, -x);
                this.m_impulse.Add(b), this.m_limitState == p.e_atLowerLimit ? this.m_impulse.y = r.Max(this.m_impulse.y, 0) : this.m_limitState == p.e_atUpperLimit && (this.m_impulse.y = r.Min(this.m_impulse.y, 0));
                var w = -_ - (this.m_impulse.y - v.y) * this.m_K.col2.x,
                    C = 0;
                C = 0 != this.m_K.col1.x ? w / this.m_K.col1.x + v.x : v.x, this.m_impulse.x = C, b.x = this.m_impulse.x - v.x, b.y = this.m_impulse.y - v.y, h = b.x * this.m_perp.x + b.y * this.m_axis.x, c = b.x * this.m_perp.y + b.y * this.m_axis.y, u = b.x * this.m_s1 + b.y * this.m_a1, d = b.x * this.m_s2 + b.y * this.m_a2, s.x -= this.m_invMassA * h, s.y -= this.m_invMassA * c, o -= this.m_invIA * u, a.x += this.m_invMassB * h, a.y += this.m_invMassB * c, l += this.m_invIB * d
            } else {
                var S = 0;
                S = 0 != this.m_K.col1.x ? -_ / this.m_K.col1.x : 0, this.m_impulse.x += S, h = S * this.m_perp.x, c = S * this.m_perp.y, u = S * this.m_s1, d = S * this.m_s2, s.x -= this.m_invMassA * h, s.y -= this.m_invMassA * c, o -= this.m_invIA * u, a.x += this.m_invMassB * h, a.y += this.m_invMassB * c, l += this.m_invIB * d
            }
            e.m_linearVelocity.SetV(s), e.m_angularVelocity = o, i.m_linearVelocity.SetV(a), i.m_angularVelocity = l
        }, y.prototype.SolvePositionConstraints = function(i) {
            void 0 === i && (i = 0);
            var s, o = this.m_bodyA,
                a = this.m_bodyB,
                l = o.m_sweep.c,
                h = o.m_sweep.a,
                c = a.m_sweep.c,
                u = a.m_sweep.a,
                d = 0,
                p = 0,
                m = 0,
                f = 0,
                y = 0,
                g = 0,
                _ = !1,
                x = 0,
                v = e.FromAngle(h),
                b = e.FromAngle(u);
            s = v;
            var w = this.m_localAnchor1.x - this.m_localCenterA.x,
                C = this.m_localAnchor1.y - this.m_localCenterA.y;
            d = s.col1.x * w + s.col2.x * C, C = s.col1.y * w + s.col2.y * C, w = d, s = b;
            var S = this.m_localAnchor2.x - this.m_localCenterB.x,
                T = this.m_localAnchor2.y - this.m_localCenterB.y;
            d = s.col1.x * S + s.col2.x * T, T = s.col1.y * S + s.col2.y * T, S = d;
            var A = c.x + S - l.x - w,
                D = c.y + T - l.y - C;
            if (this.m_enableLimit) {
                this.m_axis = r.MulMV(v, this.m_localXAxis1), this.m_a1 = (A + w) * this.m_axis.y - (D + C) * this.m_axis.x, this.m_a2 = S * this.m_axis.y - T * this.m_axis.x;
                var E = this.m_axis.x * A + this.m_axis.y * D;
                r.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * t.b2_linearSlop ? (x = r.Clamp(E, -t.b2_maxLinearCorrection, t.b2_maxLinearCorrection), g = r.Abs(E), _ = !0) : E <= this.m_lowerTranslation ? (x = r.Clamp(E - this.m_lowerTranslation + t.b2_linearSlop, -t.b2_maxLinearCorrection, 0), g = this.m_lowerTranslation - E, _ = !0) : E >= this.m_upperTranslation && (x = r.Clamp(E - this.m_upperTranslation + t.b2_linearSlop, 0, t.b2_maxLinearCorrection), g = E - this.m_upperTranslation, _ = !0)
            }
            this.m_perp = r.MulMV(v, this.m_localYAxis1), this.m_s1 = (A + w) * this.m_perp.y - (D + C) * this.m_perp.x, this.m_s2 = S * this.m_perp.y - T * this.m_perp.x;
            var B = new n,
                M = this.m_perp.x * A + this.m_perp.y * D;
            if (g = r.Max(g, r.Abs(M)), 0, _) p = this.m_invMassA, m = this.m_invMassB, f = this.m_invIA, y = this.m_invIB, this.m_K.col1.x = p + m + f * this.m_s1 * this.m_s1 + y * this.m_s2 * this.m_s2, this.m_K.col1.y = f * this.m_s1 * this.m_a1 + y * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = p + m + f * this.m_a1 * this.m_a1 + y * this.m_a2 * this.m_a2, this.m_K.Solve(B, -M, -x);
            else {
                p = this.m_invMassA, m = this.m_invMassB, f = this.m_invIA, y = this.m_invIB;
                var I = p + m + f * this.m_s1 * this.m_s1 + y * this.m_s2 * this.m_s2,
                    P = 0;
                P = 0 != I ? -M / I : 0, B.x = P, B.y = 0
            }
            var R = B.x * this.m_perp.x + B.y * this.m_axis.x,
                k = B.x * this.m_perp.y + B.y * this.m_axis.y,
                F = B.x * this.m_s1 + B.y * this.m_a1,
                L = B.x * this.m_s2 + B.y * this.m_a2;
            return l.x -= this.m_invMassA * R, l.y -= this.m_invMassA * k, h -= this.m_invIA * F, c.x += this.m_invMassB * R, c.y += this.m_invMassB * k, u += this.m_invIB * L, o.m_sweep.a = h, a.m_sweep.a = u, o.SynchronizeTransform(), a.SynchronizeTransform(), g <= t.b2_linearSlop && 0 <= t.b2_angularSlop
        }, Box2D.inherit(g, Box2D.Dynamics.Joints.b2JointDef), g.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, g.b2LineJointDef = function() {
            Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.localAnchorA = new n, this.localAnchorB = new n, this.localAxisA = new n
        }, g.prototype.b2LineJointDef = function() {
            this.__super.b2JointDef.call(this), this.type = p.e_lineJoint, this.localAxisA.Set(1, 0), this.enableLimit = !1, this.lowerTranslation = 0, this.upperTranslation = 0, this.enableMotor = !1, this.maxMotorForce = 0, this.motorSpeed = 0
        }, g.prototype.Initialize = function(t, e, i, r) {
            this.bodyA = t, this.bodyB = e, this.localAnchorA = this.bodyA.GetLocalPoint(i), this.localAnchorB = this.bodyB.GetLocalPoint(i), this.localAxisA = this.bodyA.GetLocalVector(r)
        }, Box2D.inherit(_, Box2D.Dynamics.Joints.b2Joint), _.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, _.b2MouseJoint = function() {
            Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.K = new e, this.K1 = new e, this.K2 = new e, this.m_localAnchor = new n, this.m_target = new n, this.m_impulse = new n, this.m_mass = new e, this.m_C = new n
        }, _.prototype.GetAnchorA = function() {
            return this.m_target
        }, _.prototype.GetAnchorB = function() {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
        }, _.prototype.GetReactionForce = function(t) {
            return void 0 === t && (t = 0), new n(t * this.m_impulse.x, t * this.m_impulse.y)
        }, _.prototype.GetReactionTorque = function(t) {
            return void 0 === t && (t = 0), 0
        }, _.prototype.GetTarget = function() {
            return this.m_target
        }, _.prototype.SetTarget = function(t) {
            0 == this.m_bodyB.IsAwake() && this.m_bodyB.SetAwake(!0), this.m_target = t
        }, _.prototype.GetMaxForce = function() {
            return this.m_maxForce
        }, _.prototype.SetMaxForce = function(t) {
            void 0 === t && (t = 0), this.m_maxForce = t
        }, _.prototype.GetFrequency = function() {
            return this.m_frequencyHz
        }, _.prototype.SetFrequency = function(t) {
            void 0 === t && (t = 0), this.m_frequencyHz = t
        }, _.prototype.GetDampingRatio = function() {
            return this.m_dampingRatio
        }, _.prototype.SetDampingRatio = function(t) {
            void 0 === t && (t = 0), this.m_dampingRatio = t
        }, _.prototype.b2MouseJoint = function(t) {
            this.__super.b2Joint.call(this, t), this.m_target.SetV(t.target);
            var e = this.m_target.x - this.m_bodyB.m_xf.position.x,
                i = this.m_target.y - this.m_bodyB.m_xf.position.y,
                r = this.m_bodyB.m_xf.R;
            this.m_localAnchor.x = e * r.col1.x + i * r.col1.y, this.m_localAnchor.y = e * r.col2.x + i * r.col2.y, this.m_maxForce = t.maxForce, this.m_impulse.SetZero(), this.m_frequencyHz = t.frequencyHz, this.m_dampingRatio = t.dampingRatio, this.m_beta = 0, this.m_gamma = 0
        }, _.prototype.InitVelocityConstraints = function(t) {
            var e, i = this.m_bodyB,
                r = i.GetMass(),
                n = 2 * Math.PI * this.m_frequencyHz,
                s = 2 * r * this.m_dampingRatio * n,
                o = r * n * n;
            this.m_gamma = t.dt * (s + t.dt * o), this.m_gamma = 0 != this.m_gamma ? 1 / this.m_gamma : 0, this.m_beta = t.dt * o * this.m_gamma, e = i.m_xf.R;
            var a = this.m_localAnchor.x - i.m_sweep.localCenter.x,
                l = this.m_localAnchor.y - i.m_sweep.localCenter.y,
                h = e.col1.x * a + e.col2.x * l;
            l = e.col1.y * a + e.col2.y * l, a = h;
            var c = i.m_invMass,
                u = i.m_invI;
            this.K1.col1.x = c, this.K1.col2.x = 0, this.K1.col1.y = 0, this.K1.col2.y = c, this.K2.col1.x = u * l * l, this.K2.col2.x = -u * a * l, this.K2.col1.y = -u * a * l, this.K2.col2.y = u * a * a, this.K.SetM(this.K1), this.K.AddM(this.K2), this.K.col1.x += this.m_gamma, this.K.col2.y += this.m_gamma, this.K.GetInverse(this.m_mass), this.m_C.x = i.m_sweep.c.x + a - this.m_target.x, this.m_C.y = i.m_sweep.c.y + l - this.m_target.y, i.m_angularVelocity *= .98, this.m_impulse.x *= t.dtRatio, this.m_impulse.y *= t.dtRatio, i.m_linearVelocity.x += c * this.m_impulse.x, i.m_linearVelocity.y += c * this.m_impulse.y, i.m_angularVelocity += u * (a * this.m_impulse.y - l * this.m_impulse.x)
        }, _.prototype.SolveVelocityConstraints = function(t) {
            var e, i, r = this.m_bodyB,
                n = 0;
            e = r.m_xf.R;
            var s = this.m_localAnchor.x - r.m_sweep.localCenter.x,
                o = this.m_localAnchor.y - r.m_sweep.localCenter.y;
            n = e.col1.x * s + e.col2.x * o, o = e.col1.y * s + e.col2.y * o, s = n;
            var a = r.m_linearVelocity.x + -r.m_angularVelocity * o,
                l = r.m_linearVelocity.y + r.m_angularVelocity * s;
            e = this.m_mass, n = a + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x, i = l + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
            var h = -(e.col1.x * n + e.col2.x * i),
                c = -(e.col1.y * n + e.col2.y * i),
                u = this.m_impulse.x,
                d = this.m_impulse.y;
            this.m_impulse.x += h, this.m_impulse.y += c;
            var p = t.dt * this.m_maxForce;
            this.m_impulse.LengthSquared() > p * p && this.m_impulse.Multiply(p / this.m_impulse.Length()), h = this.m_impulse.x - u, c = this.m_impulse.y - d, r.m_linearVelocity.x += r.m_invMass * h, r.m_linearVelocity.y += r.m_invMass * c, r.m_angularVelocity += r.m_invI * (s * c - o * h)
        }, _.prototype.SolvePositionConstraints = function(t) {
            return void 0 === t && (t = 0), !0
        }, Box2D.inherit(x, Box2D.Dynamics.Joints.b2JointDef), x.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, x.b2MouseJointDef = function() {
            Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.target = new n
        }, x.prototype.b2MouseJointDef = function() {
            this.__super.b2JointDef.call(this), this.type = p.e_mouseJoint, this.maxForce = 0, this.frequencyHz = 5, this.dampingRatio = .7
        }, Box2D.inherit(v, Box2D.Dynamics.Joints.b2Joint), v.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, v.b2PrismaticJoint = function() {
            Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_localAnchor1 = new n, this.m_localAnchor2 = new n, this.m_localXAxis1 = new n, this.m_localYAxis1 = new n, this.m_axis = new n, this.m_perp = new n, this.m_K = new i, this.m_impulse = new s
        }, v.prototype.GetAnchorA = function() {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
        }, v.prototype.GetAnchorB = function() {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
        }, v.prototype.GetReactionForce = function(t) {
            return void 0 === t && (t = 0), new n(t * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), t * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y))
        }, v.prototype.GetReactionTorque = function(t) {
            return void 0 === t && (t = 0), t * this.m_impulse.y
        }, v.prototype.GetJointTranslation = function() {
            var t = this.m_bodyA,
                e = this.m_bodyB,
                i = t.GetWorldPoint(this.m_localAnchor1),
                r = e.GetWorldPoint(this.m_localAnchor2),
                n = r.x - i.x,
                s = r.y - i.y,
                o = t.GetWorldVector(this.m_localXAxis1);
            return o.x * n + o.y * s
        }, v.prototype.GetJointSpeed = function() {
            var t, e = this.m_bodyA,
                i = this.m_bodyB;
            t = e.m_xf.R;
            var r = this.m_localAnchor1.x - e.m_sweep.localCenter.x,
                n = this.m_localAnchor1.y - e.m_sweep.localCenter.y,
                s = t.col1.x * r + t.col2.x * n;
            n = t.col1.y * r + t.col2.y * n, r = s, t = i.m_xf.R;
            var o = this.m_localAnchor2.x - i.m_sweep.localCenter.x,
                a = this.m_localAnchor2.y - i.m_sweep.localCenter.y;
            s = t.col1.x * o + t.col2.x * a, a = t.col1.y * o + t.col2.y * a, o = s;
            var l = e.m_sweep.c.x + r,
                h = e.m_sweep.c.y + n,
                c = i.m_sweep.c.x + o - l,
                u = i.m_sweep.c.y + a - h,
                d = e.GetWorldVector(this.m_localXAxis1),
                p = e.m_linearVelocity,
                m = i.m_linearVelocity,
                f = e.m_angularVelocity,
                y = i.m_angularVelocity;
            return c * (-f * d.y) + u * (f * d.x) + (d.x * (m.x + -y * a - p.x - -f * n) + d.y * (m.y + y * o - p.y - f * r))
        }, v.prototype.IsLimitEnabled = function() {
            return this.m_enableLimit
        }, v.prototype.EnableLimit = function(t) {
            this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableLimit = t
        }, v.prototype.GetLowerLimit = function() {
            return this.m_lowerTranslation
        }, v.prototype.GetUpperLimit = function() {
            return this.m_upperTranslation
        }, v.prototype.SetLimits = function(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_lowerTranslation = t, this.m_upperTranslation = e
        }, v.prototype.IsMotorEnabled = function() {
            return this.m_enableMotor
        }, v.prototype.EnableMotor = function(t) {
            this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableMotor = t
        }, v.prototype.SetMotorSpeed = function(t) {
            void 0 === t && (t = 0), this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_motorSpeed = t
        }, v.prototype.GetMotorSpeed = function() {
            return this.m_motorSpeed
        }, v.prototype.SetMaxMotorForce = function(t) {
            void 0 === t && (t = 0), this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_maxMotorForce = t
        }, v.prototype.GetMotorForce = function() {
            return this.m_motorImpulse
        }, v.prototype.b2PrismaticJoint = function(t) {
            this.__super.b2Joint.call(this, t);
            this.m_localAnchor1.SetV(t.localAnchorA), this.m_localAnchor2.SetV(t.localAnchorB), this.m_localXAxis1.SetV(t.localAxisA), this.m_localYAxis1.x = -this.m_localXAxis1.y, this.m_localYAxis1.y = this.m_localXAxis1.x, this.m_refAngle = t.referenceAngle, this.m_impulse.SetZero(), this.m_motorMass = 0, this.m_motorImpulse = 0, this.m_lowerTranslation = t.lowerTranslation, this.m_upperTranslation = t.upperTranslation, this.m_maxMotorForce = t.maxMotorForce, this.m_motorSpeed = t.motorSpeed, this.m_enableLimit = t.enableLimit, this.m_enableMotor = t.enableMotor, this.m_limitState = p.e_inactiveLimit, this.m_axis.SetZero(), this.m_perp.SetZero()
        }, v.prototype.InitVelocityConstraints = function(e) {
            var i, n = this.m_bodyA,
                s = this.m_bodyB,
                o = 0;
            this.m_localCenterA.SetV(n.GetLocalCenter()), this.m_localCenterB.SetV(s.GetLocalCenter());
            var a = n.GetTransform();
            s.GetTransform();
            i = n.m_xf.R;
            var l = this.m_localAnchor1.x - this.m_localCenterA.x,
                h = this.m_localAnchor1.y - this.m_localCenterA.y;
            o = i.col1.x * l + i.col2.x * h, h = i.col1.y * l + i.col2.y * h, l = o, i = s.m_xf.R;
            var c = this.m_localAnchor2.x - this.m_localCenterB.x,
                u = this.m_localAnchor2.y - this.m_localCenterB.y;
            o = i.col1.x * c + i.col2.x * u, u = i.col1.y * c + i.col2.y * u, c = o;
            var d = s.m_sweep.c.x + c - n.m_sweep.c.x - l,
                m = s.m_sweep.c.y + u - n.m_sweep.c.y - h;
            this.m_invMassA = n.m_invMass, this.m_invMassB = s.m_invMass, this.m_invIA = n.m_invI, this.m_invIB = s.m_invI, this.m_axis.SetV(r.MulMV(a.R, this.m_localXAxis1)), this.m_a1 = (d + l) * this.m_axis.y - (m + h) * this.m_axis.x, this.m_a2 = c * this.m_axis.y - u * this.m_axis.x, this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2, this.m_motorMass > Number.MIN_VALUE && (this.m_motorMass = 1 / this.m_motorMass), this.m_perp.SetV(r.MulMV(a.R, this.m_localYAxis1)), this.m_s1 = (d + l) * this.m_perp.y - (m + h) * this.m_perp.x, this.m_s2 = c * this.m_perp.y - u * this.m_perp.x;
            var f = this.m_invMassA,
                y = this.m_invMassB,
                g = this.m_invIA,
                _ = this.m_invIB;
            if (this.m_K.col1.x = f + y + g * this.m_s1 * this.m_s1 + _ * this.m_s2 * this.m_s2, this.m_K.col1.y = g * this.m_s1 + _ * this.m_s2, this.m_K.col1.z = g * this.m_s1 * this.m_a1 + _ * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = g + _, this.m_K.col2.z = g * this.m_a1 + _ * this.m_a2, this.m_K.col3.x = this.m_K.col1.z, this.m_K.col3.y = this.m_K.col2.z, this.m_K.col3.z = f + y + g * this.m_a1 * this.m_a1 + _ * this.m_a2 * this.m_a2, this.m_enableLimit) {
                var x = this.m_axis.x * d + this.m_axis.y * m;
                r.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * t.b2_linearSlop ? this.m_limitState = p.e_equalLimits : x <= this.m_lowerTranslation ? this.m_limitState != p.e_atLowerLimit && (this.m_limitState = p.e_atLowerLimit, this.m_impulse.z = 0) : x >= this.m_upperTranslation ? this.m_limitState != p.e_atUpperLimit && (this.m_limitState = p.e_atUpperLimit, this.m_impulse.z = 0) : (this.m_limitState = p.e_inactiveLimit, this.m_impulse.z = 0)
            } else this.m_limitState = p.e_inactiveLimit;
            if (0 == this.m_enableMotor && (this.m_motorImpulse = 0), e.warmStarting) {
                this.m_impulse.x *= e.dtRatio, this.m_impulse.y *= e.dtRatio, this.m_motorImpulse *= e.dtRatio;
                var v = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x,
                    b = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y,
                    w = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1,
                    C = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
                n.m_linearVelocity.x -= this.m_invMassA * v, n.m_linearVelocity.y -= this.m_invMassA * b, n.m_angularVelocity -= this.m_invIA * w, s.m_linearVelocity.x += this.m_invMassB * v, s.m_linearVelocity.y += this.m_invMassB * b, s.m_angularVelocity += this.m_invIB * C
            } else this.m_impulse.SetZero(), this.m_motorImpulse = 0
        }, v.prototype.SolveVelocityConstraints = function(t) {
            var e = this.m_bodyA,
                i = this.m_bodyB,
                o = e.m_linearVelocity,
                a = e.m_angularVelocity,
                l = i.m_linearVelocity,
                h = i.m_angularVelocity,
                c = 0,
                u = 0,
                d = 0,
                m = 0;
            if (this.m_enableMotor && this.m_limitState != p.e_equalLimits) {
                var f = this.m_axis.x * (l.x - o.x) + this.m_axis.y * (l.y - o.y) + this.m_a2 * h - this.m_a1 * a,
                    y = this.m_motorMass * (this.m_motorSpeed - f),
                    g = this.m_motorImpulse,
                    _ = t.dt * this.m_maxMotorForce;
                this.m_motorImpulse = r.Clamp(this.m_motorImpulse + y, -_, _), c = (y = this.m_motorImpulse - g) * this.m_axis.x, u = y * this.m_axis.y, d = y * this.m_a1, m = y * this.m_a2, o.x -= this.m_invMassA * c, o.y -= this.m_invMassA * u, a -= this.m_invIA * d, l.x += this.m_invMassB * c, l.y += this.m_invMassB * u, h += this.m_invIB * m
            }
            var x = this.m_perp.x * (l.x - o.x) + this.m_perp.y * (l.y - o.y) + this.m_s2 * h - this.m_s1 * a,
                v = h - a;
            if (this.m_enableLimit && this.m_limitState != p.e_inactiveLimit) {
                var b = this.m_axis.x * (l.x - o.x) + this.m_axis.y * (l.y - o.y) + this.m_a2 * h - this.m_a1 * a,
                    w = this.m_impulse.Copy(),
                    C = this.m_K.Solve33(new s, -x, -v, -b);
                this.m_impulse.Add(C), this.m_limitState == p.e_atLowerLimit ? this.m_impulse.z = r.Max(this.m_impulse.z, 0) : this.m_limitState == p.e_atUpperLimit && (this.m_impulse.z = r.Min(this.m_impulse.z, 0));
                var S = -x - (this.m_impulse.z - w.z) * this.m_K.col3.x,
                    T = -v - (this.m_impulse.z - w.z) * this.m_K.col3.y,
                    A = this.m_K.Solve22(new n, S, T);
                A.x += w.x, A.y += w.y, this.m_impulse.x = A.x, this.m_impulse.y = A.y, C.x = this.m_impulse.x - w.x, C.y = this.m_impulse.y - w.y, C.z = this.m_impulse.z - w.z, c = C.x * this.m_perp.x + C.z * this.m_axis.x, u = C.x * this.m_perp.y + C.z * this.m_axis.y, d = C.x * this.m_s1 + C.y + C.z * this.m_a1, m = C.x * this.m_s2 + C.y + C.z * this.m_a2, o.x -= this.m_invMassA * c, o.y -= this.m_invMassA * u, a -= this.m_invIA * d, l.x += this.m_invMassB * c, l.y += this.m_invMassB * u, h += this.m_invIB * m
            } else {
                var D = this.m_K.Solve22(new n, -x, -v);
                this.m_impulse.x += D.x, this.m_impulse.y += D.y, c = D.x * this.m_perp.x, u = D.x * this.m_perp.y, d = D.x * this.m_s1 + D.y, m = D.x * this.m_s2 + D.y, o.x -= this.m_invMassA * c, o.y -= this.m_invMassA * u, a -= this.m_invIA * d, l.x += this.m_invMassB * c, l.y += this.m_invMassB * u, h += this.m_invIB * m
            }
            e.m_linearVelocity.SetV(o), e.m_angularVelocity = a, i.m_linearVelocity.SetV(l), i.m_angularVelocity = h
        }, v.prototype.SolvePositionConstraints = function(i) {
            void 0 === i && (i = 0);
            var o, a, l = this.m_bodyA,
                h = this.m_bodyB,
                c = l.m_sweep.c,
                u = l.m_sweep.a,
                d = h.m_sweep.c,
                p = h.m_sweep.a,
                m = 0,
                f = 0,
                y = 0,
                g = 0,
                _ = 0,
                x = 0,
                v = !1,
                b = 0,
                w = e.FromAngle(u),
                C = e.FromAngle(p);
            o = w;
            var S = this.m_localAnchor1.x - this.m_localCenterA.x,
                T = this.m_localAnchor1.y - this.m_localCenterA.y;
            m = o.col1.x * S + o.col2.x * T, T = o.col1.y * S + o.col2.y * T, S = m, o = C;
            var A = this.m_localAnchor2.x - this.m_localCenterB.x,
                D = this.m_localAnchor2.y - this.m_localCenterB.y;
            m = o.col1.x * A + o.col2.x * D, D = o.col1.y * A + o.col2.y * D, A = m;
            var E = d.x + A - c.x - S,
                B = d.y + D - c.y - T;
            if (this.m_enableLimit) {
                this.m_axis = r.MulMV(w, this.m_localXAxis1), this.m_a1 = (E + S) * this.m_axis.y - (B + T) * this.m_axis.x, this.m_a2 = A * this.m_axis.y - D * this.m_axis.x;
                var M = this.m_axis.x * E + this.m_axis.y * B;
                r.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * t.b2_linearSlop ? (b = r.Clamp(M, -t.b2_maxLinearCorrection, t.b2_maxLinearCorrection), x = r.Abs(M), v = !0) : M <= this.m_lowerTranslation ? (b = r.Clamp(M - this.m_lowerTranslation + t.b2_linearSlop, -t.b2_maxLinearCorrection, 0), x = this.m_lowerTranslation - M, v = !0) : M >= this.m_upperTranslation && (b = r.Clamp(M - this.m_upperTranslation + t.b2_linearSlop, 0, t.b2_maxLinearCorrection), x = M - this.m_upperTranslation, v = !0)
            }
            this.m_perp = r.MulMV(w, this.m_localYAxis1), this.m_s1 = (E + S) * this.m_perp.y - (B + T) * this.m_perp.x, this.m_s2 = A * this.m_perp.y - D * this.m_perp.x;
            var I = new s,
                P = this.m_perp.x * E + this.m_perp.y * B,
                R = p - u - this.m_refAngle;
            if (x = r.Max(x, r.Abs(P)), a = r.Abs(R), v) f = this.m_invMassA, y = this.m_invMassB, g = this.m_invIA, _ = this.m_invIB, this.m_K.col1.x = f + y + g * this.m_s1 * this.m_s1 + _ * this.m_s2 * this.m_s2, this.m_K.col1.y = g * this.m_s1 + _ * this.m_s2, this.m_K.col1.z = g * this.m_s1 * this.m_a1 + _ * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = g + _, this.m_K.col2.z = g * this.m_a1 + _ * this.m_a2, this.m_K.col3.x = this.m_K.col1.z, this.m_K.col3.y = this.m_K.col2.z, this.m_K.col3.z = f + y + g * this.m_a1 * this.m_a1 + _ * this.m_a2 * this.m_a2, this.m_K.Solve33(I, -P, -R, -b);
            else {
                f = this.m_invMassA, y = this.m_invMassB, g = this.m_invIA, _ = this.m_invIB;
                var k = f + y + g * this.m_s1 * this.m_s1 + _ * this.m_s2 * this.m_s2,
                    F = g * this.m_s1 + _ * this.m_s2,
                    L = g + _;
                this.m_K.col1.Set(k, F, 0), this.m_K.col2.Set(F, L, 0);
                var O = this.m_K.Solve22(new n, -P, -R);
                I.x = O.x, I.y = O.y, I.z = 0
            }
            var N = I.x * this.m_perp.x + I.z * this.m_axis.x,
                G = I.x * this.m_perp.y + I.z * this.m_axis.y,
                V = I.x * this.m_s1 + I.y + I.z * this.m_a1,
                U = I.x * this.m_s2 + I.y + I.z * this.m_a2;
            return c.x -= this.m_invMassA * N, c.y -= this.m_invMassA * G, u -= this.m_invIA * V, d.x += this.m_invMassB * N, d.y += this.m_invMassB * G, p += this.m_invIB * U, l.m_sweep.a = u, h.m_sweep.a = p, l.SynchronizeTransform(), h.SynchronizeTransform(), x <= t.b2_linearSlop && a <= t.b2_angularSlop
        }, Box2D.inherit(b, Box2D.Dynamics.Joints.b2JointDef), b.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, b.b2PrismaticJointDef = function() {
            Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.localAnchorA = new n, this.localAnchorB = new n, this.localAxisA = new n
        }, b.prototype.b2PrismaticJointDef = function() {
            this.__super.b2JointDef.call(this), this.type = p.e_prismaticJoint, this.localAxisA.Set(1, 0), this.referenceAngle = 0, this.enableLimit = !1, this.lowerTranslation = 0, this.upperTranslation = 0, this.enableMotor = !1, this.maxMotorForce = 0, this.motorSpeed = 0
        }, b.prototype.Initialize = function(t, e, i, r) {
            this.bodyA = t, this.bodyB = e, this.localAnchorA = this.bodyA.GetLocalPoint(i), this.localAnchorB = this.bodyB.GetLocalPoint(i), this.localAxisA = this.bodyA.GetLocalVector(r), this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
        }, Box2D.inherit(w, Box2D.Dynamics.Joints.b2Joint), w.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, w.b2PulleyJoint = function() {
            Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_groundAnchor1 = new n, this.m_groundAnchor2 = new n, this.m_localAnchor1 = new n, this.m_localAnchor2 = new n, this.m_u1 = new n, this.m_u2 = new n
        }, w.prototype.GetAnchorA = function() {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
        }, w.prototype.GetAnchorB = function() {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
        }, w.prototype.GetReactionForce = function(t) {
            return void 0 === t && (t = 0), new n(t * this.m_impulse * this.m_u2.x, t * this.m_impulse * this.m_u2.y)
        }, w.prototype.GetReactionTorque = function(t) {
            return void 0 === t && (t = 0), 0
        }, w.prototype.GetGroundAnchorA = function() {
            var t = this.m_ground.m_xf.position.Copy();
            return t.Add(this.m_groundAnchor1), t
        }, w.prototype.GetGroundAnchorB = function() {
            var t = this.m_ground.m_xf.position.Copy();
            return t.Add(this.m_groundAnchor2), t
        }, w.prototype.GetLength1 = function() {
            var t = this.m_bodyA.GetWorldPoint(this.m_localAnchor1),
                e = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x,
                i = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y,
                r = t.x - e,
                n = t.y - i;
            return Math.sqrt(r * r + n * n)
        }, w.prototype.GetLength2 = function() {
            var t = this.m_bodyB.GetWorldPoint(this.m_localAnchor2),
                e = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
                i = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y,
                r = t.x - e,
                n = t.y - i;
            return Math.sqrt(r * r + n * n)
        }, w.prototype.GetRatio = function() {
            return this.m_ratio
        }, w.prototype.b2PulleyJoint = function(t) {
            this.__super.b2Joint.call(this, t);
            this.m_ground = this.m_bodyA.m_world.m_groundBody, this.m_groundAnchor1.x = t.groundAnchorA.x - this.m_ground.m_xf.position.x, this.m_groundAnchor1.y = t.groundAnchorA.y - this.m_ground.m_xf.position.y, this.m_groundAnchor2.x = t.groundAnchorB.x - this.m_ground.m_xf.position.x, this.m_groundAnchor2.y = t.groundAnchorB.y - this.m_ground.m_xf.position.y, this.m_localAnchor1.SetV(t.localAnchorA), this.m_localAnchor2.SetV(t.localAnchorB), this.m_ratio = t.ratio, this.m_constant = t.lengthA + this.m_ratio * t.lengthB, this.m_maxLength1 = r.Min(t.maxLengthA, this.m_constant - this.m_ratio * w.b2_minPulleyLength), this.m_maxLength2 = r.Min(t.maxLengthB, (this.m_constant - w.b2_minPulleyLength) / this.m_ratio), this.m_impulse = 0, this.m_limitImpulse1 = 0, this.m_limitImpulse2 = 0
        }, w.prototype.InitVelocityConstraints = function(e) {
            var i, r = this.m_bodyA,
                n = this.m_bodyB;
            i = r.m_xf.R;
            var s = this.m_localAnchor1.x - r.m_sweep.localCenter.x,
                o = this.m_localAnchor1.y - r.m_sweep.localCenter.y,
                a = i.col1.x * s + i.col2.x * o;
            o = i.col1.y * s + i.col2.y * o, s = a, i = n.m_xf.R;
            var l = this.m_localAnchor2.x - n.m_sweep.localCenter.x,
                h = this.m_localAnchor2.y - n.m_sweep.localCenter.y;
            a = i.col1.x * l + i.col2.x * h, h = i.col1.y * l + i.col2.y * h, l = a;
            var c = r.m_sweep.c.x + s,
                u = r.m_sweep.c.y + o,
                d = n.m_sweep.c.x + l,
                m = n.m_sweep.c.y + h,
                f = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x,
                y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y,
                g = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
                _ = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
            this.m_u1.Set(c - f, u - y), this.m_u2.Set(d - g, m - _);
            var x = this.m_u1.Length(),
                v = this.m_u2.Length();
            x > t.b2_linearSlop ? this.m_u1.Multiply(1 / x) : this.m_u1.SetZero(), v > t.b2_linearSlop ? this.m_u2.Multiply(1 / v) : this.m_u2.SetZero(), this.m_constant - x - this.m_ratio * v > 0 ? (this.m_state = p.e_inactiveLimit, this.m_impulse = 0) : this.m_state = p.e_atUpperLimit, x < this.m_maxLength1 ? (this.m_limitState1 = p.e_inactiveLimit, this.m_limitImpulse1 = 0) : this.m_limitState1 = p.e_atUpperLimit, v < this.m_maxLength2 ? (this.m_limitState2 = p.e_inactiveLimit, this.m_limitImpulse2 = 0) : this.m_limitState2 = p.e_atUpperLimit;
            var b = s * this.m_u1.y - o * this.m_u1.x,
                w = l * this.m_u2.y - h * this.m_u2.x;
            if (this.m_limitMass1 = r.m_invMass + r.m_invI * b * b, this.m_limitMass2 = n.m_invMass + n.m_invI * w * w, this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2, this.m_limitMass1 = 1 / this.m_limitMass1, this.m_limitMass2 = 1 / this.m_limitMass2, this.m_pulleyMass = 1 / this.m_pulleyMass, e.warmStarting) {
                this.m_impulse *= e.dtRatio, this.m_limitImpulse1 *= e.dtRatio, this.m_limitImpulse2 *= e.dtRatio;
                var C = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x,
                    S = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y,
                    T = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x,
                    A = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y;
                r.m_linearVelocity.x += r.m_invMass * C, r.m_linearVelocity.y += r.m_invMass * S, r.m_angularVelocity += r.m_invI * (s * S - o * C), n.m_linearVelocity.x += n.m_invMass * T, n.m_linearVelocity.y += n.m_invMass * A, n.m_angularVelocity += n.m_invI * (l * A - h * T)
            } else this.m_impulse = 0, this.m_limitImpulse1 = 0, this.m_limitImpulse2 = 0
        }, w.prototype.SolveVelocityConstraints = function(t) {
            var e, i = this.m_bodyA,
                n = this.m_bodyB;
            e = i.m_xf.R;
            var s = this.m_localAnchor1.x - i.m_sweep.localCenter.x,
                o = this.m_localAnchor1.y - i.m_sweep.localCenter.y,
                a = e.col1.x * s + e.col2.x * o;
            o = e.col1.y * s + e.col2.y * o, s = a, e = n.m_xf.R;
            var l = this.m_localAnchor2.x - n.m_sweep.localCenter.x,
                h = this.m_localAnchor2.y - n.m_sweep.localCenter.y;
            a = e.col1.x * l + e.col2.x * h, h = e.col1.y * l + e.col2.y * h, l = a;
            var c = 0,
                u = 0,
                d = 0,
                m = 0,
                f = 0,
                y = 0,
                g = 0,
                _ = 0,
                x = 0,
                v = 0,
                b = 0;
            this.m_state == p.e_atUpperLimit && (c = i.m_linearVelocity.x + -i.m_angularVelocity * o, u = i.m_linearVelocity.y + i.m_angularVelocity * s, d = n.m_linearVelocity.x + -n.m_angularVelocity * h, m = n.m_linearVelocity.y + n.m_angularVelocity * l, x = -(this.m_u1.x * c + this.m_u1.y * u) - this.m_ratio * (this.m_u2.x * d + this.m_u2.y * m), v = this.m_pulleyMass * -x, b = this.m_impulse, this.m_impulse = r.Max(0, this.m_impulse + v), f = -(v = this.m_impulse - b) * this.m_u1.x, y = -v * this.m_u1.y, g = -this.m_ratio * v * this.m_u2.x, _ = -this.m_ratio * v * this.m_u2.y, i.m_linearVelocity.x += i.m_invMass * f, i.m_linearVelocity.y += i.m_invMass * y, i.m_angularVelocity += i.m_invI * (s * y - o * f), n.m_linearVelocity.x += n.m_invMass * g, n.m_linearVelocity.y += n.m_invMass * _, n.m_angularVelocity += n.m_invI * (l * _ - h * g)), this.m_limitState1 == p.e_atUpperLimit && (c = i.m_linearVelocity.x + -i.m_angularVelocity * o, u = i.m_linearVelocity.y + i.m_angularVelocity * s, x = -(this.m_u1.x * c + this.m_u1.y * u), v = -this.m_limitMass1 * x, b = this.m_limitImpulse1, this.m_limitImpulse1 = r.Max(0, this.m_limitImpulse1 + v), f = -(v = this.m_limitImpulse1 - b) * this.m_u1.x, y = -v * this.m_u1.y, i.m_linearVelocity.x += i.m_invMass * f, i.m_linearVelocity.y += i.m_invMass * y, i.m_angularVelocity += i.m_invI * (s * y - o * f)), this.m_limitState2 == p.e_atUpperLimit && (d = n.m_linearVelocity.x + -n.m_angularVelocity * h, m = n.m_linearVelocity.y + n.m_angularVelocity * l, x = -(this.m_u2.x * d + this.m_u2.y * m), v = -this.m_limitMass2 * x, b = this.m_limitImpulse2, this.m_limitImpulse2 = r.Max(0, this.m_limitImpulse2 + v), g = -(v = this.m_limitImpulse2 - b) * this.m_u2.x, _ = -v * this.m_u2.y, n.m_linearVelocity.x += n.m_invMass * g, n.m_linearVelocity.y += n.m_invMass * _, n.m_angularVelocity += n.m_invI * (l * _ - h * g))
        }, w.prototype.SolvePositionConstraints = function(e) {
            void 0 === e && (e = 0);
            var i, n = this.m_bodyA,
                s = this.m_bodyB,
                o = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x,
                a = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y,
                l = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
                h = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y,
                c = 0,
                u = 0,
                d = 0,
                m = 0,
                f = 0,
                y = 0,
                g = 0,
                _ = 0,
                x = 0,
                v = 0,
                b = 0,
                w = 0,
                C = 0,
                S = 0;
            return this.m_state == p.e_atUpperLimit && (i = n.m_xf.R, c = this.m_localAnchor1.x - n.m_sweep.localCenter.x, u = this.m_localAnchor1.y - n.m_sweep.localCenter.y, C = i.col1.x * c + i.col2.x * u, u = i.col1.y * c + i.col2.y * u, c = C, i = s.m_xf.R, d = this.m_localAnchor2.x - s.m_sweep.localCenter.x, m = this.m_localAnchor2.y - s.m_sweep.localCenter.y, C = i.col1.x * d + i.col2.x * m, m = i.col1.y * d + i.col2.y * m, d = C, f = n.m_sweep.c.x + c, y = n.m_sweep.c.y + u, g = s.m_sweep.c.x + d, _ = s.m_sweep.c.y + m, this.m_u1.Set(f - o, y - a), this.m_u2.Set(g - l, _ - h), x = this.m_u1.Length(), v = this.m_u2.Length(), x > t.b2_linearSlop ? this.m_u1.Multiply(1 / x) : this.m_u1.SetZero(), v > t.b2_linearSlop ? this.m_u2.Multiply(1 / v) : this.m_u2.SetZero(), b = this.m_constant - x - this.m_ratio * v, S = r.Max(S, -b), b = r.Clamp(b + t.b2_linearSlop, -t.b2_maxLinearCorrection, 0), f = -(w = -this.m_pulleyMass * b) * this.m_u1.x, y = -w * this.m_u1.y, g = -this.m_ratio * w * this.m_u2.x, _ = -this.m_ratio * w * this.m_u2.y, n.m_sweep.c.x += n.m_invMass * f, n.m_sweep.c.y += n.m_invMass * y, n.m_sweep.a += n.m_invI * (c * y - u * f), s.m_sweep.c.x += s.m_invMass * g, s.m_sweep.c.y += s.m_invMass * _, s.m_sweep.a += s.m_invI * (d * _ - m * g), n.SynchronizeTransform(), s.SynchronizeTransform()), this.m_limitState1 == p.e_atUpperLimit && (i = n.m_xf.R, c = this.m_localAnchor1.x - n.m_sweep.localCenter.x, u = this.m_localAnchor1.y - n.m_sweep.localCenter.y, C = i.col1.x * c + i.col2.x * u, u = i.col1.y * c + i.col2.y * u, c = C, f = n.m_sweep.c.x + c, y = n.m_sweep.c.y + u, this.m_u1.Set(f - o, y - a), (x = this.m_u1.Length()) > t.b2_linearSlop ? (this.m_u1.x *= 1 / x, this.m_u1.y *= 1 / x) : this.m_u1.SetZero(), b = this.m_maxLength1 - x, S = r.Max(S, -b), b = r.Clamp(b + t.b2_linearSlop, -t.b2_maxLinearCorrection, 0), f = -(w = -this.m_limitMass1 * b) * this.m_u1.x, y = -w * this.m_u1.y, n.m_sweep.c.x += n.m_invMass * f, n.m_sweep.c.y += n.m_invMass * y, n.m_sweep.a += n.m_invI * (c * y - u * f), n.SynchronizeTransform()), this.m_limitState2 == p.e_atUpperLimit && (i = s.m_xf.R, d = this.m_localAnchor2.x - s.m_sweep.localCenter.x, m = this.m_localAnchor2.y - s.m_sweep.localCenter.y, C = i.col1.x * d + i.col2.x * m, m = i.col1.y * d + i.col2.y * m, d = C, g = s.m_sweep.c.x + d, _ = s.m_sweep.c.y + m, this.m_u2.Set(g - l, _ - h), (v = this.m_u2.Length()) > t.b2_linearSlop ? (this.m_u2.x *= 1 / v, this.m_u2.y *= 1 / v) : this.m_u2.SetZero(), b = this.m_maxLength2 - v, S = r.Max(S, -b), b = r.Clamp(b + t.b2_linearSlop, -t.b2_maxLinearCorrection, 0), g = -(w = -this.m_limitMass2 * b) * this.m_u2.x, _ = -w * this.m_u2.y, s.m_sweep.c.x += s.m_invMass * g, s.m_sweep.c.y += s.m_invMass * _, s.m_sweep.a += s.m_invI * (d * _ - m * g), s.SynchronizeTransform()), S < t.b2_linearSlop
        }, Box2D.postDefs.push((function() {
            Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2
        })), Box2D.inherit(C, Box2D.Dynamics.Joints.b2JointDef), C.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, C.b2PulleyJointDef = function() {
            Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.groundAnchorA = new n, this.groundAnchorB = new n, this.localAnchorA = new n, this.localAnchorB = new n
        }, C.prototype.b2PulleyJointDef = function() {
            this.__super.b2JointDef.call(this), this.type = p.e_pulleyJoint, this.groundAnchorA.Set(-1, 1), this.groundAnchorB.Set(1, 1), this.localAnchorA.Set(-1, 0), this.localAnchorB.Set(1, 0), this.lengthA = 0, this.maxLengthA = 0, this.lengthB = 0, this.maxLengthB = 0, this.ratio = 1, this.collideConnected = !0
        }, C.prototype.Initialize = function(t, e, i, r, n, s, o) {
            void 0 === o && (o = 0), this.bodyA = t, this.bodyB = e, this.groundAnchorA.SetV(i), this.groundAnchorB.SetV(r), this.localAnchorA = this.bodyA.GetLocalPoint(n), this.localAnchorB = this.bodyB.GetLocalPoint(s);
            var a = n.x - i.x,
                l = n.y - i.y;
            this.lengthA = Math.sqrt(a * a + l * l);
            var h = s.x - r.x,
                c = s.y - r.y;
            this.lengthB = Math.sqrt(h * h + c * c), this.ratio = o;
            var u = this.lengthA + this.ratio * this.lengthB;
            this.maxLengthA = u - this.ratio * w.b2_minPulleyLength, this.maxLengthB = (u - w.b2_minPulleyLength) / this.ratio
        }, Box2D.inherit(S, Box2D.Dynamics.Joints.b2Joint), S.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, S.b2RevoluteJoint = function() {
            Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.K = new e, this.K1 = new e, this.K2 = new e, this.K3 = new e, this.impulse3 = new s, this.impulse2 = new n, this.reduced = new n, this.m_localAnchor1 = new n, this.m_localAnchor2 = new n, this.m_impulse = new s, this.m_mass = new i
        }, S.prototype.GetAnchorA = function() {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
        }, S.prototype.GetAnchorB = function() {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
        }, S.prototype.GetReactionForce = function(t) {
            return void 0 === t && (t = 0), new n(t * this.m_impulse.x, t * this.m_impulse.y)
        }, S.prototype.GetReactionTorque = function(t) {
            return void 0 === t && (t = 0), t * this.m_impulse.z
        }, S.prototype.GetJointAngle = function() {
            return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle
        }, S.prototype.GetJointSpeed = function() {
            return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity
        }, S.prototype.IsLimitEnabled = function() {
            return this.m_enableLimit
        }, S.prototype.EnableLimit = function(t) {
            this.m_enableLimit = t
        }, S.prototype.GetLowerLimit = function() {
            return this.m_lowerAngle
        }, S.prototype.GetUpperLimit = function() {
            return this.m_upperAngle
        }, S.prototype.SetLimits = function(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this.m_lowerAngle = t, this.m_upperAngle = e
        }, S.prototype.IsMotorEnabled = function() {
            return this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableMotor
        }, S.prototype.EnableMotor = function(t) {
            this.m_enableMotor = t
        }, S.prototype.SetMotorSpeed = function(t) {
            void 0 === t && (t = 0), this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_motorSpeed = t
        }, S.prototype.GetMotorSpeed = function() {
            return this.m_motorSpeed
        }, S.prototype.SetMaxMotorTorque = function(t) {
            void 0 === t && (t = 0), this.m_maxMotorTorque = t
        }, S.prototype.GetMotorTorque = function() {
            return this.m_maxMotorTorque
        }, S.prototype.b2RevoluteJoint = function(t) {
            this.__super.b2Joint.call(this, t), this.m_localAnchor1.SetV(t.localAnchorA), this.m_localAnchor2.SetV(t.localAnchorB), this.m_referenceAngle = t.referenceAngle, this.m_impulse.SetZero(), this.m_motorImpulse = 0, this.m_lowerAngle = t.lowerAngle, this.m_upperAngle = t.upperAngle, this.m_maxMotorTorque = t.maxMotorTorque, this.m_motorSpeed = t.motorSpeed, this.m_enableLimit = t.enableLimit, this.m_enableMotor = t.enableMotor, this.m_limitState = p.e_inactiveLimit
        }, S.prototype.InitVelocityConstraints = function(e) {
            var i, n = this.m_bodyA,
                s = this.m_bodyB,
                o = 0;
            this.m_enableMotor || this.m_enableLimit, i = n.m_xf.R;
            var a = this.m_localAnchor1.x - n.m_sweep.localCenter.x,
                l = this.m_localAnchor1.y - n.m_sweep.localCenter.y;
            o = i.col1.x * a + i.col2.x * l, l = i.col1.y * a + i.col2.y * l, a = o, i = s.m_xf.R;
            var h = this.m_localAnchor2.x - s.m_sweep.localCenter.x,
                c = this.m_localAnchor2.y - s.m_sweep.localCenter.y;
            o = i.col1.x * h + i.col2.x * c, c = i.col1.y * h + i.col2.y * c, h = o;
            var u = n.m_invMass,
                d = s.m_invMass,
                m = n.m_invI,
                f = s.m_invI;
            if (this.m_mass.col1.x = u + d + l * l * m + c * c * f, this.m_mass.col2.x = -l * a * m - c * h * f, this.m_mass.col3.x = -l * m - c * f, this.m_mass.col1.y = this.m_mass.col2.x, this.m_mass.col2.y = u + d + a * a * m + h * h * f, this.m_mass.col3.y = a * m + h * f, this.m_mass.col1.z = this.m_mass.col3.x, this.m_mass.col2.z = this.m_mass.col3.y, this.m_mass.col3.z = m + f, this.m_motorMass = 1 / (m + f), 0 == this.m_enableMotor && (this.m_motorImpulse = 0), this.m_enableLimit) {
                var y = s.m_sweep.a - n.m_sweep.a - this.m_referenceAngle;
                r.Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * t.b2_angularSlop ? this.m_limitState = p.e_equalLimits : y <= this.m_lowerAngle ? (this.m_limitState != p.e_atLowerLimit && (this.m_impulse.z = 0), this.m_limitState = p.e_atLowerLimit) : y >= this.m_upperAngle ? (this.m_limitState != p.e_atUpperLimit && (this.m_impulse.z = 0), this.m_limitState = p.e_atUpperLimit) : (this.m_limitState = p.e_inactiveLimit, this.m_impulse.z = 0)
            } else this.m_limitState = p.e_inactiveLimit;
            if (e.warmStarting) {
                this.m_impulse.x *= e.dtRatio, this.m_impulse.y *= e.dtRatio, this.m_motorImpulse *= e.dtRatio;
                var g = this.m_impulse.x,
                    _ = this.m_impulse.y;
                n.m_linearVelocity.x -= u * g, n.m_linearVelocity.y -= u * _, n.m_angularVelocity -= m * (a * _ - l * g + this.m_motorImpulse + this.m_impulse.z), s.m_linearVelocity.x += d * g, s.m_linearVelocity.y += d * _, s.m_angularVelocity += f * (h * _ - c * g + this.m_motorImpulse + this.m_impulse.z)
            } else this.m_impulse.SetZero(), this.m_motorImpulse = 0
        }, S.prototype.SolveVelocityConstraints = function(t) {
            var e, i = this.m_bodyA,
                n = this.m_bodyB,
                s = 0,
                o = 0,
                a = 0,
                l = 0,
                h = 0,
                c = i.m_linearVelocity,
                u = i.m_angularVelocity,
                d = n.m_linearVelocity,
                m = n.m_angularVelocity,
                f = i.m_invMass,
                y = n.m_invMass,
                g = i.m_invI,
                _ = n.m_invI;
            if (this.m_enableMotor && this.m_limitState != p.e_equalLimits) {
                var x = m - u - this.m_motorSpeed,
                    v = this.m_motorMass * -x,
                    b = this.m_motorImpulse,
                    w = t.dt * this.m_maxMotorTorque;
                this.m_motorImpulse = r.Clamp(this.m_motorImpulse + v, -w, w), u -= g * (v = this.m_motorImpulse - b), m += _ * v
            }
            if (this.m_enableLimit && this.m_limitState != p.e_inactiveLimit) {
                e = i.m_xf.R, o = this.m_localAnchor1.x - i.m_sweep.localCenter.x, a = this.m_localAnchor1.y - i.m_sweep.localCenter.y, s = e.col1.x * o + e.col2.x * a, a = e.col1.y * o + e.col2.y * a, o = s, e = n.m_xf.R, l = this.m_localAnchor2.x - n.m_sweep.localCenter.x, h = this.m_localAnchor2.y - n.m_sweep.localCenter.y, s = e.col1.x * l + e.col2.x * h, h = e.col1.y * l + e.col2.y * h, l = s;
                var C = d.x + -m * h - c.x - -u * a,
                    S = d.y + m * l - c.y - u * o,
                    T = m - u;
                this.m_mass.Solve33(this.impulse3, -C, -S, -T), this.m_limitState == p.e_equalLimits ? this.m_impulse.Add(this.impulse3) : this.m_limitState == p.e_atLowerLimit ? this.m_impulse.z + this.impulse3.z < 0 && (this.m_mass.Solve22(this.reduced, -C, -S), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0) : this.m_limitState == p.e_atUpperLimit && this.m_impulse.z + this.impulse3.z > 0 && (this.m_mass.Solve22(this.reduced, -C, -S), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0), c.x -= f * this.impulse3.x, c.y -= f * this.impulse3.y, u -= g * (o * this.impulse3.y - a * this.impulse3.x + this.impulse3.z), d.x += y * this.impulse3.x, d.y += y * this.impulse3.y, m += _ * (l * this.impulse3.y - h * this.impulse3.x + this.impulse3.z)
            } else {
                e = i.m_xf.R, o = this.m_localAnchor1.x - i.m_sweep.localCenter.x, a = this.m_localAnchor1.y - i.m_sweep.localCenter.y, s = e.col1.x * o + e.col2.x * a, a = e.col1.y * o + e.col2.y * a, o = s, e = n.m_xf.R, l = this.m_localAnchor2.x - n.m_sweep.localCenter.x, h = this.m_localAnchor2.y - n.m_sweep.localCenter.y, s = e.col1.x * l + e.col2.x * h, h = e.col1.y * l + e.col2.y * h, l = s;
                var A = d.x + -m * h - c.x - -u * a,
                    D = d.y + m * l - c.y - u * o;
                this.m_mass.Solve22(this.impulse2, -A, -D), this.m_impulse.x += this.impulse2.x, this.m_impulse.y += this.impulse2.y, c.x -= f * this.impulse2.x, c.y -= f * this.impulse2.y, u -= g * (o * this.impulse2.y - a * this.impulse2.x), d.x += y * this.impulse2.x, d.y += y * this.impulse2.y, m += _ * (l * this.impulse2.y - h * this.impulse2.x)
            }
            i.m_linearVelocity.SetV(c), i.m_angularVelocity = u, n.m_linearVelocity.SetV(d), n.m_angularVelocity = m
        }, S.prototype.SolvePositionConstraints = function(e) {
            void 0 === e && (e = 0);
            var i, n, s = 0,
                o = this.m_bodyA,
                a = this.m_bodyB,
                l = 0,
                h = 0,
                c = 0,
                u = 0;
            if (this.m_enableLimit && this.m_limitState != p.e_inactiveLimit) {
                var d = a.m_sweep.a - o.m_sweep.a - this.m_referenceAngle,
                    m = 0;
                this.m_limitState == p.e_equalLimits ? (s = r.Clamp(d - this.m_lowerAngle, -t.b2_maxAngularCorrection, t.b2_maxAngularCorrection), m = -this.m_motorMass * s, l = r.Abs(s)) : this.m_limitState == p.e_atLowerLimit ? (l = -(s = d - this.m_lowerAngle), s = r.Clamp(s + t.b2_angularSlop, -t.b2_maxAngularCorrection, 0), m = -this.m_motorMass * s) : this.m_limitState == p.e_atUpperLimit && (l = s = d - this.m_upperAngle, s = r.Clamp(s - t.b2_angularSlop, 0, t.b2_maxAngularCorrection), m = -this.m_motorMass * s), o.m_sweep.a -= o.m_invI * m, a.m_sweep.a += a.m_invI * m, o.SynchronizeTransform(), a.SynchronizeTransform()
            }
            i = o.m_xf.R;
            var f = this.m_localAnchor1.x - o.m_sweep.localCenter.x,
                y = this.m_localAnchor1.y - o.m_sweep.localCenter.y;
            h = i.col1.x * f + i.col2.x * y, y = i.col1.y * f + i.col2.y * y, f = h, i = a.m_xf.R;
            var g = this.m_localAnchor2.x - a.m_sweep.localCenter.x,
                _ = this.m_localAnchor2.y - a.m_sweep.localCenter.y;
            h = i.col1.x * g + i.col2.x * _, _ = i.col1.y * g + i.col2.y * _, g = h;
            var x = a.m_sweep.c.x + g - o.m_sweep.c.x - f,
                v = a.m_sweep.c.y + _ - o.m_sweep.c.y - y,
                b = x * x + v * v,
                w = Math.sqrt(b);
            n = w;
            var C = o.m_invMass,
                T = a.m_invMass,
                A = o.m_invI,
                D = a.m_invI,
                E = 10 * t.b2_linearSlop;
            if (b > E * E) {
                var B = 1 / (C + T);
                c = B * -x, u = B * -v;
                var M = .5;
                o.m_sweep.c.x -= M * C * c, o.m_sweep.c.y -= M * C * u, a.m_sweep.c.x += M * T * c, a.m_sweep.c.y += M * T * u, x = a.m_sweep.c.x + g - o.m_sweep.c.x - f, v = a.m_sweep.c.y + _ - o.m_sweep.c.y - y
            }
            return this.K1.col1.x = C + T, this.K1.col2.x = 0, this.K1.col1.y = 0, this.K1.col2.y = C + T, this.K2.col1.x = A * y * y, this.K2.col2.x = -A * f * y, this.K2.col1.y = -A * f * y, this.K2.col2.y = A * f * f, this.K3.col1.x = D * _ * _, this.K3.col2.x = -D * g * _, this.K3.col1.y = -D * g * _, this.K3.col2.y = D * g * g, this.K.SetM(this.K1), this.K.AddM(this.K2), this.K.AddM(this.K3), this.K.Solve(S.tImpulse, -x, -v), c = S.tImpulse.x, u = S.tImpulse.y, o.m_sweep.c.x -= o.m_invMass * c, o.m_sweep.c.y -= o.m_invMass * u, o.m_sweep.a -= o.m_invI * (f * u - y * c), a.m_sweep.c.x += a.m_invMass * c, a.m_sweep.c.y += a.m_invMass * u, a.m_sweep.a += a.m_invI * (g * u - _ * c), o.SynchronizeTransform(), a.SynchronizeTransform(), n <= t.b2_linearSlop && l <= t.b2_angularSlop
        }, Box2D.postDefs.push((function() {
            Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new n
        })), Box2D.inherit(T, Box2D.Dynamics.Joints.b2JointDef), T.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, T.b2RevoluteJointDef = function() {
            Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.localAnchorA = new n, this.localAnchorB = new n
        }, T.prototype.b2RevoluteJointDef = function() {
            this.__super.b2JointDef.call(this), this.type = p.e_revoluteJoint, this.localAnchorA.Set(0, 0), this.localAnchorB.Set(0, 0), this.referenceAngle = 0, this.lowerAngle = 0, this.upperAngle = 0, this.maxMotorTorque = 0, this.motorSpeed = 0, this.enableLimit = !1, this.enableMotor = !1
        }, T.prototype.Initialize = function(t, e, i) {
            this.bodyA = t, this.bodyB = e, this.localAnchorA = this.bodyA.GetLocalPoint(i), this.localAnchorB = this.bodyB.GetLocalPoint(i), this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
        }, Box2D.inherit(A, Box2D.Dynamics.Joints.b2Joint), A.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, A.b2WeldJoint = function() {
            Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_localAnchorA = new n, this.m_localAnchorB = new n, this.m_impulse = new s, this.m_mass = new i
        }, A.prototype.GetAnchorA = function() {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
        }, A.prototype.GetAnchorB = function() {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
        }, A.prototype.GetReactionForce = function(t) {
            return void 0 === t && (t = 0), new n(t * this.m_impulse.x, t * this.m_impulse.y)
        }, A.prototype.GetReactionTorque = function(t) {
            return void 0 === t && (t = 0), t * this.m_impulse.z
        }, A.prototype.b2WeldJoint = function(t) {
            this.__super.b2Joint.call(this, t), this.m_localAnchorA.SetV(t.localAnchorA), this.m_localAnchorB.SetV(t.localAnchorB), this.m_referenceAngle = t.referenceAngle, this.m_impulse.SetZero(), this.m_mass = new i
        }, A.prototype.InitVelocityConstraints = function(t) {
            var e, i = 0,
                r = this.m_bodyA,
                n = this.m_bodyB;
            e = r.m_xf.R;
            var s = this.m_localAnchorA.x - r.m_sweep.localCenter.x,
                o = this.m_localAnchorA.y - r.m_sweep.localCenter.y;
            i = e.col1.x * s + e.col2.x * o, o = e.col1.y * s + e.col2.y * o, s = i, e = n.m_xf.R;
            var a = this.m_localAnchorB.x - n.m_sweep.localCenter.x,
                l = this.m_localAnchorB.y - n.m_sweep.localCenter.y;
            i = e.col1.x * a + e.col2.x * l, l = e.col1.y * a + e.col2.y * l, a = i;
            var h = r.m_invMass,
                c = n.m_invMass,
                u = r.m_invI,
                d = n.m_invI;
            this.m_mass.col1.x = h + c + o * o * u + l * l * d, this.m_mass.col2.x = -o * s * u - l * a * d, this.m_mass.col3.x = -o * u - l * d, this.m_mass.col1.y = this.m_mass.col2.x, this.m_mass.col2.y = h + c + s * s * u + a * a * d, this.m_mass.col3.y = s * u + a * d, this.m_mass.col1.z = this.m_mass.col3.x, this.m_mass.col2.z = this.m_mass.col3.y, this.m_mass.col3.z = u + d, t.warmStarting ? (this.m_impulse.x *= t.dtRatio, this.m_impulse.y *= t.dtRatio, this.m_impulse.z *= t.dtRatio, r.m_linearVelocity.x -= h * this.m_impulse.x, r.m_linearVelocity.y -= h * this.m_impulse.y, r.m_angularVelocity -= u * (s * this.m_impulse.y - o * this.m_impulse.x + this.m_impulse.z), n.m_linearVelocity.x += c * this.m_impulse.x, n.m_linearVelocity.y += c * this.m_impulse.y, n.m_angularVelocity += d * (a * this.m_impulse.y - l * this.m_impulse.x + this.m_impulse.z)) : this.m_impulse.SetZero()
        }, A.prototype.SolveVelocityConstraints = function(t) {
            var e, i = 0,
                r = this.m_bodyA,
                n = this.m_bodyB,
                o = r.m_linearVelocity,
                a = r.m_angularVelocity,
                l = n.m_linearVelocity,
                h = n.m_angularVelocity,
                c = r.m_invMass,
                u = n.m_invMass,
                d = r.m_invI,
                p = n.m_invI;
            e = r.m_xf.R;
            var m = this.m_localAnchorA.x - r.m_sweep.localCenter.x,
                f = this.m_localAnchorA.y - r.m_sweep.localCenter.y;
            i = e.col1.x * m + e.col2.x * f, f = e.col1.y * m + e.col2.y * f, m = i, e = n.m_xf.R;
            var y = this.m_localAnchorB.x - n.m_sweep.localCenter.x,
                g = this.m_localAnchorB.y - n.m_sweep.localCenter.y;
            i = e.col1.x * y + e.col2.x * g, g = e.col1.y * y + e.col2.y * g, y = i;
            var _ = l.x - h * g - o.x + a * f,
                x = l.y + h * y - o.y - a * m,
                v = h - a,
                b = new s;
            this.m_mass.Solve33(b, -_, -x, -v), this.m_impulse.Add(b), o.x -= c * b.x, o.y -= c * b.y, a -= d * (m * b.y - f * b.x + b.z), l.x += u * b.x, l.y += u * b.y, h += p * (y * b.y - g * b.x + b.z), r.m_angularVelocity = a, n.m_angularVelocity = h
        }, A.prototype.SolvePositionConstraints = function(e) {
            var i;
            void 0 === e && (e = 0);
            var n = 0,
                o = this.m_bodyA,
                a = this.m_bodyB;
            i = o.m_xf.R;
            var l = this.m_localAnchorA.x - o.m_sweep.localCenter.x,
                h = this.m_localAnchorA.y - o.m_sweep.localCenter.y;
            n = i.col1.x * l + i.col2.x * h, h = i.col1.y * l + i.col2.y * h, l = n, i = a.m_xf.R;
            var c = this.m_localAnchorB.x - a.m_sweep.localCenter.x,
                u = this.m_localAnchorB.y - a.m_sweep.localCenter.y;
            n = i.col1.x * c + i.col2.x * u, u = i.col1.y * c + i.col2.y * u, c = n;
            var d = o.m_invMass,
                p = a.m_invMass,
                m = o.m_invI,
                f = a.m_invI,
                y = a.m_sweep.c.x + c - o.m_sweep.c.x - l,
                g = a.m_sweep.c.y + u - o.m_sweep.c.y - h,
                _ = a.m_sweep.a - o.m_sweep.a - this.m_referenceAngle,
                x = 10 * t.b2_linearSlop,
                v = Math.sqrt(y * y + g * g),
                b = r.Abs(_);
            v > x && (m *= 1, f *= 1), this.m_mass.col1.x = d + p + h * h * m + u * u * f, this.m_mass.col2.x = -h * l * m - u * c * f, this.m_mass.col3.x = -h * m - u * f, this.m_mass.col1.y = this.m_mass.col2.x, this.m_mass.col2.y = d + p + l * l * m + c * c * f, this.m_mass.col3.y = l * m + c * f, this.m_mass.col1.z = this.m_mass.col3.x, this.m_mass.col2.z = this.m_mass.col3.y, this.m_mass.col3.z = m + f;
            var w = new s;
            return this.m_mass.Solve33(w, -y, -g, -_), o.m_sweep.c.x -= d * w.x, o.m_sweep.c.y -= d * w.y, o.m_sweep.a -= m * (l * w.y - h * w.x + w.z), a.m_sweep.c.x += p * w.x, a.m_sweep.c.y += p * w.y, a.m_sweep.a += f * (c * w.y - u * w.x + w.z), o.SynchronizeTransform(), a.SynchronizeTransform(), v <= t.b2_linearSlop && b <= t.b2_angularSlop
        }, Box2D.inherit(D, Box2D.Dynamics.Joints.b2JointDef), D.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, D.b2WeldJointDef = function() {
            Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.localAnchorA = new n, this.localAnchorB = new n
        }, D.prototype.b2WeldJointDef = function() {
            this.__super.b2JointDef.call(this), this.type = p.e_weldJoint, this.referenceAngle = 0
        }, D.prototype.Initialize = function(t, e, i) {
            this.bodyA = t, this.bodyB = e, this.localAnchorA.SetV(this.bodyA.GetLocalPoint(i)), this.localAnchorB.SetV(this.bodyB.GetLocalPoint(i)), this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
        }
    }(), function() {
        var t = Box2D.Dynamics.b2DebugDraw;
        t.b2DebugDraw = function() {
            this.m_drawScale = 1, this.m_lineThickness = 1, this.m_alpha = 1, this.m_fillAlpha = 1, this.m_xformScale = 1;
            var t = this;
            this.m_sprite = {
                graphics: {
                    clear: function() {
                        t.m_ctx.clearRect(0, 0, t.m_ctx.canvas.width, t.m_ctx.canvas.height)
                    }
                }
            }
        }, t.prototype._color = function(t, e) {
            return "rgba(" + ((16711680 & t) >> 16) + "," + ((65280 & t) >> 8) + "," + (255 & t) + "," + e + ")"
        }, t.prototype.b2DebugDraw = function() {
            this.m_drawFlags = 0
        }, t.prototype.SetFlags = function(t) {
            void 0 === t && (t = 0), this.m_drawFlags = t
        }, t.prototype.GetFlags = function() {
            return this.m_drawFlags
        }, t.prototype.AppendFlags = function(t) {
            void 0 === t && (t = 0), this.m_drawFlags |= t
        }, t.prototype.ClearFlags = function(t) {
            void 0 === t && (t = 0), this.m_drawFlags &= ~t
        }, t.prototype.SetSprite = function(t) {
            this.m_ctx = t
        }, t.prototype.GetSprite = function() {
            return this.m_ctx
        }, t.prototype.SetDrawScale = function(t) {
            void 0 === t && (t = 0), this.m_drawScale = t
        }, t.prototype.GetDrawScale = function() {
            return this.m_drawScale
        }, t.prototype.SetLineThickness = function(t) {
            void 0 === t && (t = 0), this.m_lineThickness = t, this.m_ctx.strokeWidth = t
        }, t.prototype.GetLineThickness = function() {
            return this.m_lineThickness
        }, t.prototype.SetAlpha = function(t) {
            void 0 === t && (t = 0), this.m_alpha = t
        }, t.prototype.GetAlpha = function() {
            return this.m_alpha
        }, t.prototype.SetFillAlpha = function(t) {
            void 0 === t && (t = 0), this.m_fillAlpha = t
        }, t.prototype.GetFillAlpha = function() {
            return this.m_fillAlpha
        }, t.prototype.SetXFormScale = function(t) {
            void 0 === t && (t = 0), this.m_xformScale = t
        }, t.prototype.GetXFormScale = function() {
            return this.m_xformScale
        }, t.prototype.DrawPolygon = function(t, e, i) {
            if (e) {
                var r = this.m_ctx,
                    n = this.m_drawScale;
                r.beginPath(), r.strokeStyle = this._color(i.color, this.m_alpha), r.moveTo(t[0].x * n, t[0].y * n);
                for (var s = 1; s < e; s++) r.lineTo(t[s].x * n, t[s].y * n);
                r.lineTo(t[0].x * n, t[0].y * n), r.closePath(), r.stroke()
            }
        }, t.prototype.DrawSolidPolygon = function(t, e, i) {
            if (e) {
                var r = this.m_ctx,
                    n = this.m_drawScale;
                r.beginPath(), r.strokeStyle = this._color(i.color, this.m_alpha), r.fillStyle = this._color(i.color, this.m_fillAlpha), r.moveTo(t[0].x * n, t[0].y * n);
                for (var s = 1; s < e; s++) r.lineTo(t[s].x * n, t[s].y * n);
                r.lineTo(t[0].x * n, t[0].y * n), r.closePath(), r.fill(), r.stroke()
            }
        }, t.prototype.DrawCircle = function(t, e, i) {
            if (e) {
                var r = this.m_ctx,
                    n = this.m_drawScale;
                r.beginPath(), r.strokeStyle = this._color(i.color, this.m_alpha), r.arc(t.x * n, t.y * n, e * n, 0, 2 * Math.PI, !0), r.closePath(), r.stroke()
            }
        }, t.prototype.DrawSolidCircle = function(t, e, i, r) {
            if (e) {
                var n = this.m_ctx,
                    s = this.m_drawScale,
                    o = t.x * s,
                    a = t.y * s;
                n.moveTo(0, 0), n.beginPath(), n.strokeStyle = this._color(r.color, this.m_alpha), n.fillStyle = this._color(r.color, this.m_fillAlpha), n.arc(o, a, e * s, 0, 2 * Math.PI, !0), n.moveTo(o, a), n.lineTo((t.x + i.x * e) * s, (t.y + i.y * e) * s), n.closePath(), n.fill(), n.stroke()
            }
        }, t.prototype.DrawSegment = function(t, e, i) {
            var r = this.m_ctx,
                n = this.m_drawScale;
            r.strokeStyle = this._color(i.color, this.m_alpha), r.beginPath(), r.moveTo(t.x * n, t.y * n), r.lineTo(e.x * n, e.y * n), r.closePath(), r.stroke()
        }, t.prototype.DrawTransform = function(t) {
            var e = this.m_ctx,
                i = this.m_drawScale;
            e.beginPath(), e.strokeStyle = this._color(16711680, this.m_alpha), e.moveTo(t.position.x * i, t.position.y * i), e.lineTo((t.position.x + this.m_xformScale * t.R.col1.x) * i, (t.position.y + this.m_xformScale * t.R.col1.y) * i), e.strokeStyle = this._color(65280, this.m_alpha), e.moveTo(t.position.x * i, t.position.y * i), e.lineTo((t.position.x + this.m_xformScale * t.R.col2.x) * i, (t.position.y + this.m_xformScale * t.R.col2.y) * i), e.closePath(), e.stroke()
        }
    }(), i = 0; i < Box2D.postDefs.length; ++i) Box2D.postDefs[i]();
delete Box2D.postDefs;
if (typeof module !== "undefined" && module.exports) module.exports = Box2D; else globalThis.Box2D = Box2D;
})();
