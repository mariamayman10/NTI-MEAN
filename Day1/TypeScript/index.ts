/*  
    important commands:
        1. Convert TS to JS -> tsc
        2. Execute index.js -> node ./dist/index.js   
        3. Execute index.ts -> ts-node index.ts
        4. Watch file to identify errors -> tsc --watch  
*/

// Normal Function
function add1(n1: number, n2:number):number {
    return n1 + n2;
}
// Anonymous Function
const add2 = function (n1: number, n2:number): number {
    return n1 + n2;
}
// Arrow Function
const add3 = (n1: number, n2:number): number => n1+n2; 
// Default Values
const sum = (n1:number = 6,n2:number = 4) => {
    return (n1 + n2);
}
// Make use of functions
console.log("Add1:", add1(2,5) ,"\nAdd2:", add2(2,6),"\nAdd3:", add3(2,7), "\nSum test1:", sum(11), "\nSum test2:", sum(undefined, 11),'\n');


// Create Type
type Person = {
    name: string;
    age: number;
};
// type can extend type | interface
interface Address{
    address:string;
}
type PersonCopy = Address &{ //type extends interface 
    name: string;
    age: number;
}
type ExtendedPerson = PersonCopy &{ // type extends type
    NID: number,
}
const x: ExtendedPerson={name: "William", age:20, address:"Washington", NID:1111111};
// Make use of Type
const getNames = (h1: Person, h2:Person):string => `${h1.name} ${h2.name}`;
console.log("getNames:", getNames({name: "Jane", age:20}, {name: "John", age:24}), '\n');


// Create Type Alias
type Mix = number | string;
//Create Literal Type
type Gender = "female" | "male";

// Create interface
interface User extends Person{
    readonly id: Mix;
    gender: Gender;
    profileImage?: string; 
}
// interface can extend type | interface
const user1:User = {
    id: "1",
    name: "Lina",
    age: 23,
    gender: "female",
    // Not a must to pass profileImage
}
const user2:User = {
    id: 2,
    name: "Jake",
    age: 26,
    gender: "male",
    profileImage: "./image",
    username: "jakeWilliam"
}
// You can add new attribute to an interface
interface User{username?:string}


// Generic type
const ret = <T1 = number, T2 = number>(n1:T1,n2:T2): string => {
    return (`${n1} ${n2}`);
}
console.log("Generic types:", ret<number, string>(11,"10"));


// Classes
class Car1{
    protected color: string = '';
    constructor(color:string){
        console.log("Inside Car1");
        this.color = color;
        console.log(`Car color is ${this.color}`);
    }
    maxSpeed(speed:number):string {
        return `Car1 max speed is ${speed}`;
    }
}
class Car2{
    // accept and store in the same line
    constructor(private color:string){
        console.log("Inside Car2");
        console.log(`Car color is ${this.color}`);
    }
}
const car1 = new Car1('Black'); // will work
console.log(car1.maxSpeed(200));
const car2: Car2 = new Car2('Blue'); // better

// Decorators
function first(val:any){
    console.log(val);
    return function(target:any){
        console.log("first():called");
    }
}
@first('From ford class')
class Ford extends Car1{
    constructor(private name:string, protected color:string){
        super(color);
        console.log(`Car name is ${this.name}`);
        
    }
}
const ford1: Ford = new Ford('Ford Explore','Red');
