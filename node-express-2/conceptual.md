### Conceptual Exercise

Answer the following questions below:

- What is a JWT?

JWT is JSON Web Tokens

- What is the signature portion of the JWT?  What does it do?

The signature portion of the JWT is a version of the header and payload and it 
allows the check the integrity of the data to make sure it hasn't been tampered
with in the delivery.

- If a JWT is intercepted, can the attacker see what's inside the payload?

Yes the payload isn't encrypted

- How can you implement authentication with a JWT?  Describe how it works at a high level.

Verifying the token signature is matching with the SECRET_KEY in every request through middleware

- Compare and contrast unit, integration and end-to-end tests.

Unit - test smaller pieces of code and usually used for functions

Integration - bigger pieces of code and used for a combination of a couple of components in the application

End-end - tests the whole application workflow from beginning to end

- What is a mock? What are some things you would mock?

Mock is a used as a replace for other objects that simulate the behavior of a function.
it is commonly used for callbacks, functions, properties, return values, etc.

- What is continuous integration?

Continuous Integration (CI) is automating the process of code changes from multiple developers/contributors into a single software projects. i.e. Travis CI, Jenkins

- What is an environment variable and what are they used for?

Environment variable is a variable that can be used anywhere in the application and kept as a secret to the outside user.

- What is TDD? What are some benefits and drawbacks?

TDD is Test Driven Development. You write the testing part of the application first to prevent any futures difficulties in the app. Some of the benefits of TDD are to make sure the intended output is always been delivered keeping the app consistent and reliable throughout the whole development process.
Some of the drawbacks would be slower development of the app having a much larger time of delivery for the app and a lot of refactoring of the process just to have a green light to continue

- What is the value of using JSONSchema for validation?

JSONSchema is used to validate API data. This allow to have more control of which information is missing or improperly entered before being processed by the back-end of the application.

- What are some ways to decide which code to test?

Anything that can make the application stop working should be tested. such as returning values, state based, 

- What does `RETURNING` do in SQL? When would you use it?
 
RETURNING in SQL retrieve the column values specified in the query. It would be use in a modifying query like insert, delete, or update.

- What are some differences between Web Sockets and HTTP?



- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?
