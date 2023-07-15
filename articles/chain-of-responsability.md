---
title: "How to avoid if-else hell using desing patterns as a demi god"
subtitle: "Using chain of responsability design pattern to avoid if-else hell."
date: "2023-04-20"
tags: "#cleanCode #designPatterns #typescript"
---

As a developers we have to take many decisions while we are working in some feature, many of them are based on the story description or what the business is needing. There are many moments where the functionallity needs to get finished as soon as possible due some business requirement so that is the perfect scenario to not think what we are going to do and we start just writing the code giving as a result something called as [spaguetti code](https://en.wikipedia.org/wiki/Spaghetti_code). 

## The problem

Spaguetti code comes up with many problems related to maintain source code, being this one of the most important task in the software development cycle.

![maintain effor](https://i.imgur.com/ErKFYtA.jpeg)

We have to know that our code will be reviewed or edited by us and even other developers if we do not take the better decisions there must be a huge problem trying to understand what we did and how we did.

![just god](https://pbs.twimg.com/media/E58JteSWYAUs8mj?format=jpg&name=medium)

### The nested code problem
Using javascript as a programming language has many things to deal with, one of them appears trying to write complex logic in way to achieve what the requirements want us to do. A common known problem indentified by the community is callback hell or promise hell and this one looks like

![callback hell](https://res.cloudinary.com/practicaldev/image/fetch/s--c0aEZX7m--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b8euo2n7twvgh3dbuatd.jpeg)


### If - else hell
This is a common [anti pattern](https://en.wikipedia.org/wiki/Anti-pattern) often used because it is not detected as a bad practice due it has been accepted by the comunity as a "acceptable solution" and there is no another knwon better way to do it (this is going to change, trust me).

Let's take an accurated look on what this problem looks like and then we will be working on it.

### Practical example 1

We are working in an ecommerce and there is a functionality to create, this one has to validate if a product has certain attribute to show some information to the customers. These attributes have some relevance so that means the message to show has to be defined by its attribute's priority.

The previous description can be translated into typescript interfaces like this:

```ts
interface Attributes {
	imported?: boolean
	machineWash?: boolean
	multipleSizes?: boolean
}

interface Product {
	id: string
	attributes: Attributes
}
```

As you can see all the attributes can be undefined due there is the possibilty a product does not have any attribute, There is also possible the product might have all the attributes so the functionallity appears to validate which attribute has a major priority to assign the right message. The priority and messages are the next ones:

```ts
const settings = {
	imported: {
		priority: 3,
		message: "This product is imported and it can not be returned"
	},
	machineWash: {
		priority: 2,
		message: "This product can be washed in a machine"
	},
	multipleSizes: {
		priority: 1,
		message: "This product has multiple sizes"
	}
}
```

This json means the attribute **multipleSizes** has a highest priority and the attribute **imported** has the lowest one.

We can write a function like this one:

> **_NOTE:_**  You can find the whole example on [this codepen](https://codepen.io/calixfar/pen/vYVxmKZ?editors=1111)

```ts
function validate(product: Product) {
	let message = ''

	if (product.attributes.multipleSizes) {
		message = settings.multipleSizes.message
	} else if (product.attributes.machineWash) {
		message = settings.machineWash.message
	} else if (product.attributes.imported) {
		message = settings.imported.message
	} else {
		message = 'The product has a discount of 10%'
	}
}
```

 This function has multiple if statements to validate every product's attribute and defining the right message. This solution is acceptable and it does what the requirement needs.

### Using desing patterns to write better code

If we want to translate this into a design pattern we can use the [chain of responsability pattern](https://refactoring.guru/design-patterns/chain-of-responsibility). This one allows us to define a chain of steps where the algorithm will go through validiting which step evaluates true then the message is assigned and the chain is broken. In case the step evaluates false the chain passes to the next step and so on until there is no another next successor.

> **_NOTE:_**  You can find the whole example on [this codepen](https://codepen.io/calixfar/pen/bGmEagb)

Let's start making some changes to our interfaces:

```ts
type Attribute = 'imported' | 'machineWash' | 'multipleSizes'

type Attributes = Partial<Record<Attribute, boolean>>

interface Product {
	id: string
	attributes: Attributes
}
```

This is important because we have declared and attribute type with the possible product attributes and then we have used two typescript utility types [Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) and [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) to shape the interface. The **settings** object can be the same one like the previous code.

Now, we are going to make an [abstract class](https://www.tutorialsteacher.com/typescript/abstract-class) to define the core shape of the pattern.

```ts
abstract class Handler {
	successor?: Handler
	key: Attribute

	constructor(key: Attribute) {
		this.key = key
	}

	setSuccessor (successor: Handler) {
		this.successor = successor
	}

	process (product: Product) {
		if (this.validate(product)) {
			console.log(settings[this.key].message)
		} else if (this.successor) {
			this.successor.process(product)
		} else {
			console.log('The product has a discount of 10%')
		}
	}

	abstract validate (product: Product): boolean
}
```

You can find all the related information about abstract class in the attached link above. The important things are the methods right now:

- **process:** It has the core logic of our class. 
	- The **if statement** calls its internal validate method to check if the given product param is valid. 
	- The **else if statement** validates if there is a successor set, in case that's true the next successor is called. The magic happens here (the chain keeps its flow).
	- The **else statement** is the default case. It can be considered as the end of the chain.
- **validate:** This is a dynamic method and it has to be completed while we are implementing the classes.

First of all if we try to instance an abstract class that will not work.

```ts
const test = new Handler('imported')
//Error: Cannot create an instance of an abstract class.(2511)
```
An abstract class is some kind of predifined structure that any class should have and it needs to be extended by a class implementation.

Let's implement our class.

```ts
class ProductAttributeValidator extends Handler {
	constructor (key: Attribute) {
		super(key)
	}

	validate(product: Product) {
		let response = false

		if (product.attributes[this.key]) {
			return true
		}

		return response
	}
} 
```

As you can see we are defining our constructor and passing the key value through the **super** function, we are also defining the body of our validate function (We define the method's types in the abstract class definition).


Now, we have to instance our classes.

```ts
const productMultipleSizesAttributeValidator = new ProductAttributeValidator('multipleSizes')
const productmachineWashAttributeValidator = new ProductAttributeValidator('machineWash')
const productImportedAttributeValidator = new ProductAttributeValidator('imported')
```

We are instancing three objects with the same class but each one has different keys (product attribute). The next step is to assign the successors.

```ts
productMultipleSizesAttributeValidator.setSuccessor(productmachineWashAttributeValidator)
productmachineWashAttributeValidator.setSuccessor(productImportedAttributeValidator)
```

We are using the **setSuccessor method** to define the next step in the chain, if you take a look the multipleSizes instance goes first. Could you guess why? This is due its priority (look at the settings object). We are shaping our chain on this way.

Let's test our code :D.

```ts
const product: Product = {
	id: '1', 
	attributes: { 
		imported: true 
	}
}
productMultipleSizesAttributeValidator.process(product)
// log: This product is imported and it can not be returned
product.attributes.machineWash = true
productMultipleSizesAttributeValidator.process(product)
// log: This product can be washed in a machine
product.attributes.multipleSizes = true
productMultipleSizesAttributeValidator.process(product)
// log: This product has multiple sizes
```

As you can see the message changes every time a new attribute with major priority gets added.

Let's test our default case.

```ts
const product: Product = {
	id: '1', 
	attributes: { 
		test: true 
	}
} as Product
productMultipleSizesAttributeValidator.process(product)
// log: The product has a discount of 10%
```

We are passing for a while the typescript validation with the [keyword as](https://timmousk.com/blog/typescript-as/) to convert a product with a no valid attribute (test) as a valid product. The resulting message? The expected default defined in the **else statement**.

### Practical example 2

Let's extend  the same exercise to increase the difficulty. The management team gives us and update at the last moment. We do not have to just validate if the product has some attributes. We should have in consideration the next rules:

- The attribute multipleSizes will be an array with the available sizes.
- The attribute imported will have the country where the product was manufactured.
- The priority is the same but there are some conditions.
-	The message for the multipleSize changes by:
    - If the product has more than or equal to 5 sizes the messages will be: "5+ sizes"
    - If the product has between 2 and 4 sizes the message will be "2-4 sizes"
    - If it has one size the message will be: "Just 1 size"
    
- The message for the attribute imported changes by:
    - If the origin country is equal to USA the message should be: "The returning process might last between 3 or 7 available days"
    - If the origin country is different to USA but it is an european country the message will be: "The returning process might last between 2 and 4 weeks"
    - If the origin country is different to USA and it is not an european country the message will be: "The returning process might last between more than 4 weeks"

This is the new version of the interface:

```ts
type Attribute = 'imported' | 'machineWash' | 'multipleSizes'

interface Attributes {
  imported?: string
  machineWash?: boolean
  multipleSizes?: string[]
}

interface Product {
	id: string
	attributes: Attributes
}
```

This is our new settings object: 

```ts
const settings = {
	imported: {
		priority: 3,
		messages: {
      nationalOrigin: "The returning process might last between 3 or 7 available days",
      foreignEuropeanOrigin: "The returning process might last between 2 or 4 weeks",
      foreignOrigin: "The returning process might last more than 4 weeks"
    }
	},
	machineWash: {
		priority: 2,
		message: "This product can be washed in a machine"
	},
	multipleSizes: {
		priority: 1,
		messages: {
      moreThanOrEqualToFive: "5+ sizes",
      betweenTwoAndFour: "2-4 sizes",
      justOne: "Just 1 size"
    }
	}
}
```

Let's try first with **if-else statements**: 

> **_NOTE:_**  You can find the whole example on [this codepen](https://codepen.io/calixfar/pen/zYmZwLB?editors=1111)

 
```ts
function isEuropeanCountry (country: string) {
  return country === 'france' || country === 'germany' || country === 'england'
}


function validate (product: Product) {
  let message = 'The product has a discount of 10%'
	const { multipleSizes, machineWash, imported } = product.attributes

	if (multipleSizes) {
    if (multipleSizes.length >= 5) {
      message = settings.multipleSizes.messages.moreThanOrEqualToFive
    } else if (multipleSizes.length > 1 && multipleSizes.length < 5) {
      message = settings.multipleSizes.messages.betweenTwoAndFour
    } else {
      message = settings.multipleSizes.messages.justOne
    }

	} else if (machineWash) {
		message = settings.machineWash.message
	} else if (imported) {
      if (imported !== 'usa') {
        if (isEuropeanCountry(imported)) {
          message = settings.imported.messages.foreignEuropeanOrigin
        } else {
          message = settings.imported.messages.foreignOrigin
        }
      } else {
        message = settings.imported.messages.nationalOrigin
      }
	} else {
		message = 'The product has a discount of 10%'
	}  

  console.log(message)
}
```

If you run this code it will work as expected but multiple problems come up:

- It is more difficult to read the code.
- We have three levels of if-else statements.
- If we need to make a change for any reason it would be hard to do it

Let's try solving the requirement using chain of responsability pattern. The first thing we need to do is to add two new properties to our abstract class:

> **_NOTE:_**  You can find the whole example on [this codepen](https://codepen.io/calixfar/pen/qBJrmJm?editors=1112)

```ts
abstract class Handler {
	successor?: Handler
	successSuccessor?: Handler
	message?: string
	defaultMessage?: string

	constructor(message: string = '', defaultMessage: string = '') {
		this.defaultMessage = defaultMessage
		this.message = message
	}

	setSuccessor (successor: Handler) {
		this.successor = successor
	}

	setSuccessSuccessor (successor: Handler) {
		this.successSuccessor = successor
	}

	process (product: Product) {
		if (this.validate(product)) {
			if (this.successSuccessor) {
				this.successSuccessor.process(product)	

				return
			}

			console.log(this.message)
		} else if (this.successor) {
			this.successor.process(product)
		} else {
			console.log(this.defaultMessage)
		}
	}

	abstract validate (product: Product): boolean
}
```

The structure is the same but we have added two new properties:
- **successSuccessor:** If you take a look back at our previous example we pass to the next **successor** if the condition evaluates false, this new property is to define a chain in case the condition evaluates true (this change will have a similiar behavior like nested if-else statements).
- **defaultMessage**: This will be the message to display in the else statement.

The next thing to update is our **ProductAttributeValidator** class:

```ts
const defaultMessageValue = 'The product has a discount of 10%'

class ProductAttributeValidator extends Handler {
	key: Attribute

	constructor (key: Attribute, message: string = '') {
		super(message, defaultMessageValue)
		this.key = key
	}

	validate(product: Product) {
		let response = false

		if (product.attributes[this.key]) {
			return true
		}

		return response
	}
} 
```

As can be seen we are now passing the message and defaultMessage as props and getting them to **Handler** via super. The property key is now a local property of this implementation.

We can replicate the same class structure to map the new validations.

```ts
class SizesMoreThanOrEqualToFiveValidator extends Handler {
	constructor () {
		super(settings.multipleSizes.messages.moreThanOrEqualToFive)
	}

	validate(product: Product) {
		return product.attributes.multipleSizes!.length >= 5
	}
}

class SizesBetweenTwoAndFourValidator extends Handler {
	constructor () {
		super(settings.multipleSizes.messages.betweenTwoAndFour)
	}

	validate(product: Product) {
		return product.attributes.multipleSizes!.length < 5 && product.attributes.multipleSizes!.length > 1
	}
}

class SizesIsJustOneValidator extends Handler {
	constructor () {
		super(settings.multipleSizes.messages.justOne)
	}

	validate(product: Product) {
		return product.attributes.multipleSizes!.length === 1
	}
}
```
The **!** operator is to let typescript know the property is and it has a value (We are sure about it because this validation is supposed to get executed after the product attribute validation).

We have created one class to every rule of the **multipleSizes** attribute. Every class has its own message in the same way. This process can be known as an inmplementation of the [Decorator](https://refactoring.guru/design-patterns/decorator) design pattern (that is something we will see in another discussion).

Let's make the same thing with the **imported** attribute's rules.


```ts
class NationalCountryValidator extends Handler {
	constructor () {
		super(settings.imported.messages.nationalOrigin)
	}

	validate(product: Product) {
		return product.attributes.imported! === 'usa'
	}
}

class IsEuropeanCountryValidator extends Handler {
	constructor () {
		super(
			settings.imported.messages.foreignEuropeanOrigin,
			settings.imported.messages.foreignOrigin
		)
	}

	validate(product: Product) {
		return this.isEuropeanCountry(product.attributes.imported!)
	}

	isEuropeanCountry (country: string) {
		return country === 'france' || country === 'germany' || country === 'england'
	}
}
```

These classes keep the same structure but with one difference in the class **IsEuropeanCountryValidator** we are passing a second prop to the super method and this one is the defaultMessage, this will be the message to display in case the condition evaluates false that means the origin country is not from Europe. 

Something interesting to notice is that we have now the **isEuropeanCountry** function as a class method and this is not an external function anymore.

We can design the classes as we want there is just one thing to keep in mind extending from the abstract class is mandatory.

Said that we can create and link our chain. Let's instance all the classes.

```ts
//Validate if the attribute exists
const productMultipleSizesAttributeValidator = new ProductAttributeValidator('multipleSizes')
const productmachineWashAttributeValidator = new ProductAttributeValidator('machineWash', settings.machineWash.message)
const productImportedAttributeValidator = new ProductAttributeValidator('imported')

//MultipleSizes attribute validatiors
const productSizesMoreThanOrEqualToFiveValidator = new SizesMoreThanOrEqualToFiveValidator()
const productSizesBetweenTwoAndFourValidator = new SizesBetweenTwoAndFourValidator()
const productSizesJustOneValidator = new SizesIsJustOneValidator()

//Imported attribute validators classes
const productNationalCountryValidator = new NationalCountryValidator()
const productForeignAndEuropeanCountryValidator = new IsEuropeanCountryValidator()
```
The **productmachineWashAttributeValidator** has a message assigned because this validation just has one level in case the validation gets true the message should be displayed.

Let's link the chain

```ts
//this is the first validition has to get executed
//productmachineWashAttributeValidator is assigned as a successor 
productMultipleSizesAttributeValidator.setSuccessor(productmachineWashAttributeValidator)

//The successSuccessor will be executed if the validation evaluates true
productMultipleSizesAttributeValidator.setSuccessSuccessor(productSizesMoreThanOrEqualToFiveValidator)
productSizesMoreThanOrEqualToFiveValidator.setSuccessor(productSizesBetweenTwoAndFourValidator)
productSizesBetweenTwoAndFourValidator.setSuccessor(productSizesJustOneValidator)

productmachineWashAttributeValidator.setSuccessor(productImportedAttributeValidator)

productImportedAttributeValidator.setSuccessSuccessor(productNationalCountryValidator)
productNationalCountryValidator.setSuccessor(productForeignAndEuropeanCountryValidator)
```

It is time to execute our code :D. Let's do it from the attribute with the lowest priority to highest one so we will test every given rule.

```ts
const product: Product = {
	id: '1', 
	attributes: {
		imported: 'usa'
	}
}

productMultipleSizesAttributeValidator.process(product)
//log: The returning process might last between 3 or 7 available days
product.attributes.imported = 'england'
productMultipleSizesAttributeValidator.process(product)
//log: The returning process might last between 2 or 4 weeks
product.attributes.imported = 'colombia'
productMultipleSizesAttributeValidator.process(product)
//log: The returning process might last more than 4 weeks
```

That's nice, every possible imported value has its given message. Let's test the next scenarios.

```ts
const product: Product = {
	id: '1', 
	attributes: {
		imported: 'usa',
		machineWash: true
	}
}

productMultipleSizesAttributeValidator.process(product)
//log: This product can be washed in a machine
```

It does not matter that the imported attribute has a value because it has lower priority than the machineWash attribute.

```ts
const product: Product = {
	id: '1', 
	attributes: {
		imported: 'usa',
		machineWash: true,
		multipleSizes: ['1']
	}
}

productMultipleSizesAttributeValidator.process(product)
//log: Just 1 size
product.attributes.multipleSizes = ['1', '2']
productMultipleSizesAttributeValidator.process(product)
//log: 2-4 sizes
product.attributes.multipleSizes = ['1', '2', '3', '4']
productMultipleSizesAttributeValidator.process(product)
//log: 2-4 sizes
product.attributes.multipleSizes = ['1', '2', '3', '4', '5']
productMultipleSizesAttributeValidator.process(product)
//log: 5+ sizes
```

The code is working as expected. There is just one more thing to test the default case:

```ts
const product: Product = {
	id: '1', 
	attributes: {
		test: ['1']
	}
} as Product

productMultipleSizesAttributeValidator.process(product)
//log: The product has a discount of 10%
```

Nice, our chain is getting in every possible case and delivering the right message.


### Conclusions

- A design pattern is a way to solve complex problems keeping your code realiable, readable, testeable and reusable.
- Implementing a design pattern can increase the number of lines and efforts but using it has many benefits.
- Using desing patterns can be seen as a way to document your code becase it is itself a documentation.
- You should not worry about if you do not know the implemented design pattern because there are a lot of resources on internet explaining all you need.
- A design pattern is not an absolute truth, it has to be used in the right scenarios keeping in mind that you can build your own solution if it is necessary.
