# react-ts-next-marvelApp

To have the app running, a brief configuration must be done and some scripts must be run.

## Environment variables
A '.env.local' file must be created inside the root directory. It must contain values for your Marvel public key ('NEXT_PUBLIC_MARVEL_PUBLIC_KEY') and your Marvel private key (MARVEL_PRIVATE_KEY) as well. Therefore, your '.env.local' file should look like this:

`NEXT_PUBLIC_MARVEL_PUBLIC_KEY=yourPublicKeyHere`

`MARVEL_PRIVATE_KEY=yourPrivateKeyHere`


## Available Scripts

Inside the root directory, you can run:

### Development mode

### `npm install`

Installs all the necessary dependencies for the app to run correctly.

### `npm run dev`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### Production mode

### `npm install`

Installs all the necessary dependencies for the app to run correctly.

### `npm run build`

Compiles and prepares your project for production deployment, optimizing code and resources.


### `npm run start`

Runs the app in production mode. You must previously build your app.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Other scripts

### `npm run test`

Runs all the existing tests.

### `npm run lint`

Runs ESLint on the project.

## API Reference

#### Fetches Marvel characters

```http
  GET /v1/public/characters
```

#### Fetches a single Marvel character by their ID

```http
  GET /v1/public/characters/{characterId}
```

#### Fetches a Marvel character's comics by their ID

```http
  GET /v1/public/characters/{characterId}/comics
```

### Improvement possibilities

If this project was going to grow in time, some improvements could be made, for instance: 
- Give the user the chance to register and login.
- Use a database in order to save the users' favorite characters.
- As it is working with an external API, it might be a good idea to make use of the Mapper Pattern to map their data and create our own interface. In this way, if the Marvel developers decide to rename any of their data properties, only our own interface would need to be modified, instead of every single API call.
- Create more and better tests.
- Add i18n to support different languages.
- Maybe try to find a different API to improve the user experience, as the current API takes too long to provide the app with data.

### Technical decisions taken and reasons

- Since, due to the API loading times and the 50 characters required in the initial load, sometimes the API request is aborted, returns no data at all and the only solution seems to keep refreshing the browser. For this reason, even though running it in local mode it will try to fetch those 50 characters, in the deployed version, I have decided to adapt the app initial load and it only shows 20 characters in order to display characters in the main view. If you wish to change the initial amount also in local mode, you just have to replace "50" by your chosen number in the property "limit"'s value (src/api/getInitialCharacters.ts).
- I decided to make use of the Adapter Pattern to encapsulate the API calls. In this way, if I wanted to use an alternative to Axios for HTTP calls, that would not be a challenge or break the app, only the adapter would need to be modified. 
- Taking into account that, every time the app is launched, the same 50 characters must be shown, I decided to use Server Side Rendering in that case, to avoid unnecessary calls to the API if the user gets back to the main page.
- Due to the long time the API takes to deliver a response, I felt it was almost mandatory to include a spinner to let the user know that the website is loading, so I did it.
- I have tried to create as many components as it made sense in order to make the app scalable and make the views have as less logic inside as possible, being the latter just in charge of displaying components.
- I have used CSS var only in cases where it made sense, like the Marvel red color, as I was going to use it in different files.
- As I was running out of time, I decided to create tests only for the most critical files, such as the HTTP Adapter, the custom hooks, the utils file or some components as example.
- This was my first time using Figma and I tried to do my best, but I am aware mistakes could have been made on my end. In order to make the app responsive, since the devices models or measures were not provided -or I was not able to find them-, I have tried to make every view as similar as possible to the examples but, depending on the device used, the looks may be different. While developing, I have taken the following device models as examples: iPad Mini for tablet designs and iPhone 12 Pro for the smartphone ones.
- Last, but not least, as I previously mentioned, I decided to deploy the app in Netlify showing only 20 characters initially -explained in the first point-, you can find it here: https://react-ts-next-marvel.netlify.app/
