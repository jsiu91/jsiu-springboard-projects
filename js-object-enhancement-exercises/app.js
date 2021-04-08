// function createInstructor(firstName, lastName){
//     return {
//       firstName: firstName,
//       lastName: lastName
//     }
//   }

/* Write an ES2015 Version */
function createInstructor (firstName, lastName) {
	return {
		firstName,
		lastName,
	};
}

// var favoriteNumber = 42;

// var instructor = {
//   firstName: "Colt"
// }

// instructor[favoriteNumber] = "That is my favorite!"

/* Write an ES2015 Version */
let favoriteNumber = 42;

let instructor1 = {
	firstName: 'Colt',
	[favoriteNumber]: 'That is my favorite!',
};

// var instructor = {
//     firstName: "Colt",
//     sayHi: function(){
//       return "Hi!";
//     },
//     sayBye: function(){
//       return this.firstName + " says bye!";
//     }
//   }

/* Write an ES2015 Version */
let instructor = {
	firstName: 'Colt',
	sayHi () {
		return 'Hi!';
	},
	sayBye () {
		return this.firstName + 'says bye!';
	},
};

// Write a function which generates an animal object. The function should accepts 3 arguments:

// species: the species of animal (‘cat’, ‘dog’)
// verb: a string used to name a function (‘bark’, ‘bleet’)
// noise: a string to be printed when above function is called (‘woof’, ‘baaa’)
// Use one or more of the object enhancements we’ve covered.

// const d = createAnimal("dog", "bark", "Woooof!")
// // {species: "dog", bark: ƒ}
// d.bark()  //"Woooof!"

// const s = createAnimal("sheep", "bleet", "BAAAAaaaa")
// // {species: "sheep", bleet: ƒ}
// s.bleet() //"BAAAAaaaa"

function createAnimal (species, verb, noise) {
	return {
		species,
		[verb] () {
			console.log(noise);
		},
	};
}

const d = createAnimal('dog', 'bark', 'Woooof!');
d.bark();

const s = createAnimal('sheep', 'bleet', 'BAAAAaaaa');
s.bleet();
