"use strict";
/*
    important commands:
        1. Convert TS to JS -> tsc
        2. Execute index.js -> node ./dist/index.js
        3. Execute index.ts -> ts-node index.ts
        4. Watch file to identify errors -> tsc --watch
*/
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
// Normal Function
function add1(n1, n2) {
    return n1 + n2;
}
// Anonymous Function
const add2 = function (n1, n2) {
    return n1 + n2;
};
// Arrow Function
const add3 = (n1, n2) => n1 + n2;
// Default Values
const sum = (n1 = 6, n2 = 4) => {
    return (n1 + n2);
};
// Make use of functions
console.log("Add1:", add1(2, 5), "\nAdd2:", add2(2, 6), "\nAdd3:", add3(2, 7), "\nSum test1:", sum(11), "\nSum test2:", sum(undefined, 11), '\n');
const x = { name: "William", age: 20, address: "Washington", NID: 1111111 };
// Make use of Type
const getNames = (h1, h2) => `${h1.name} ${h2.name}`;
console.log("getNames:", getNames({ name: "Jane", age: 20 }, { name: "John", age: 24 }), '\n');
// interface can extend type | interface
const user1 = {
    id: "1",
    name: "Lina",
    age: 23,
    gender: "female",
    // Not a must to pass profileImage
};
const user2 = {
    id: 2,
    name: "Jake",
    age: 26,
    gender: "male",
    profileImage: "./image",
    username: "jakeWilliam"
};
// Generic type
const ret = (n1, n2) => {
    return (`${n1} ${n2}`);
};
console.log("Generic types:", ret(11, "10"));
// Classes
class Car1 {
    constructor(color) {
        this.color = '';
        console.log("Inside Car1");
        this.color = color;
        console.log(`Car color is ${this.color}`);
    }
    maxSpeed(speed) {
        return `Car1 max speed is ${speed}`;
    }
}
class Car2 {
    // accept and store in the same line
    constructor(color) {
        this.color = color;
        console.log("Inside Car2");
        console.log(`Car color is ${this.color}`);
    }
}
const car1 = new Car1('Black'); // will work
console.log(car1.maxSpeed(200));
const car2 = new Car2('Blue'); // better
// Decorators
function first(val) {
    console.log(val);
    return function (target) {
        console.log("first():called");
    };
}
let Ford = (() => {
    let _classDecorators = [first('From ford class')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Car1;
    var Ford = _classThis = class extends _classSuper {
        constructor(name, color) {
            super(color);
            this.name = name;
            this.color = color;
            console.log(`Car name is ${this.name}`);
        }
    };
    __setFunctionName(_classThis, "Ford");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ford = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ford = _classThis;
})();
const ford1 = new Ford('Ford Explore', 'Red');
