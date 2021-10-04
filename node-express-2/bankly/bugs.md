BUG #1. routes/auth register(). No JSON Schema validation in  Add JSON API validation.
BUG #2. app.js. Repeated modules export.
BUG #3. models/user getAll(). Unnecessary username and password as parameters
BUG #4. routes/users router.delete() Missing await when User.delete() function.
BUG #5. routes/auth login() .Missing await when calling User.authenticate method. Setting always admin value to undefined and default=false
BUG #6. middleware/auth. AuthUser does not verify if token is valid.