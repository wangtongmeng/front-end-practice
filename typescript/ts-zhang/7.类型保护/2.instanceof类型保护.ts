// instanceof类型保护

class Animal {
    name!: string;
}
class Bird extends Animal {
    swing!: number
}
function getName(animal: Animal) {
    if (animal instanceof Bird) {
        console.log(animal.swing);
    } else {
        console.log(animal.name);
    }
}
export {}