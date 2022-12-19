## Pipe n catch
This repository contains a short node application executing a log and reaching end of process.
The repository directory structure is based on modules organisation.
The code is running inside an error handling proposal that helps to keep separated "Happy path" and "Error path".

#### Usage
- clone repository
- run `npm i`
- duplicate `.env.example` file and rename it to `.env`
- run `npm run dev`

#### What you can do
- Make sure to understand the happy path
- Modify the variable of your `.env` and make sure to understand the error path.
- Trigger your own error anywhere under "startProcess" and make sure to understand the error path.
- Find a way to trigger the predifined exception "IsNotSomeData" and make sure to understand the exception path.
- Write your own "Exception" scenario and use it anywhere under "startProcess".
