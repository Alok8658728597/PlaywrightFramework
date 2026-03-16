//To Install typescript: npm install --save-dev typescript, why --save-dev beacuse we want to add dependency into package.json
//To Compile typescript: npx tsc demo1.ts
//To Run compiled javascript: node demo1.js
let message1:string="Hello World";
message1="Alok";
let age1:number=37;
let isActive:boolean=true;
let numberArray1:number[]=[5,7,8,8]; //Its number array-1
let stringArray1:string[]=["Alok","John","Smith"]; //Its string array

let data:any="hello"; //Its recommended when u are not sure about data types
data=56;
console.log(age1);
console.log(message1);

//Declare functions with types
function add(num1:number,num2:number):number{
    return num1+num2;
}
add(5,45);

//Declare objects with types
let person:{name:string,age:number,location:string}={name:"Alok",
    age:34,
    location:"",
};
person.location="India"; //Error: Property 'location' does not exist on type '{ name: string; age: number; }'.

//Declare classes with types
