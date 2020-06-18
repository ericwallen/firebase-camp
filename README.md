# Firebase Camp

## Use Firebase in your React app super easily

![logo](images/documentation-header.png)

### Setting up Firebase in React can be tricky. This pacakge is designed to make configuring Firebase in your app a cinch. It also has a robust UI for Firebase Authentication. 

### Screenshot
![Authentication Modal](images/auth-modal.png)

### Example
[Live Demo](https://fullstackcode.camp/)

Click on sign in once you get there. We use this exact same package on our site!


## Step 1. Install it through NPM 
```
npm i firebase-camp
```

## Step 2. Set up the Provider

In *index.js*
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import FirebaseProvider from 'firebase-camp'

ReactDOM.render(
<FirebaseProvider>
    <App />
</FirebaseProvider>

, document.getElementById('root'));
```

## Step 3. Use it and love it

In *App.js*

```
import React, { useEffect, useState, useContext } from 'react';
import { FirebaseConnection, FirebaseContext, FirebaseAuthModal } from 'firebase-camp'
import loading from '../node_modules/firebase-camp/src/loading.gif'
import closeIcon from '../node_modules/firebase-camp/src/close.svg'
import '../node_modules/firebase-camp/src/styles.css'
import './App.css';

function App() {

  const [lessons, setLessons] = useState([])
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showForm, setShowForm] = useState('')
  const [user, setUser] = useState({})
  const firebase = useContext(FirebaseContext)

  useEffect(() => {

    FirebaseConnection({
      apiKey: "apiKey",
      authDomain: "authDomain",
      databaseURL: "databaseURL",
      projectId: "projectId",
      storageBucket: "storageBucket",
      messagingSenderId: "messagingSenderId",
      appId: "appId"
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user){
        console.log(user);
        // do stuff here that you want to happen when user is signed in
        setUser(user)
      } else {
        console.log('not signed in');
        // do stuff here that you want to happen when user is signed out 
      }
    })

    // Accessing a collection. Change "lessons" to a collection that exists in your DB
    firebase.firestore().collection('lessons').onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
          let obj = doc.data()
          obj.id = doc.id
          return obj
      })
      console.log(data)
  })

  }, [])


  const handleShowAuthModal = (form) => {
    setShowForm(form)
    setShowAuthModal(true)
  }

  const changeForm = (form) => {
      setShowForm(form)
  }

  return (
    <div className="App">

          <FirebaseAuthModal 
            show={showAuthModal} 
            handleHideAuthModal={() => setShowAuthModal(false)}
            showForm={showForm}
            changeForm={changeForm}
            loading={loading}
            usersCollection='users'
            modal={true}
            closeIcon={closeIcon}
         />

        <button onClick={() => handleShowAuthModal('signIn')}>Sign in</button>
                        
        <button onClick={() => handleShowAuthModal('createUser')}>Create user</button>

        {lessons.map((each) => {
          return(
            <div key={each.id}>
                <h2>{each.title}</h2>
            </div>
          ) 
        })}
    </div>
  );
}

export default App;

```


## Step 4 Security Rules
Don't forget to all the user to be added to the database as well. This is where the first and last name get recorded.
```
service cloud.firestore {
  match /databases/{database}/documents {
      
      match /users/{document=**} {
      	allow create: if request.auth.uid != null;
    	}
  }
}
```

## Options

| Prop                                | Date Type / Event / Image   | What it does  |
| -----------------------------------:| ---------------------------:| --------------------------------------------------------------------------------------------------------------:|
| show                                | Boolean                     | Pass `true` to show the modal or `false` to hide it                                                            |
| handleHideAuthenticationInterface   | Event                       | Use this event to change the `show` props value to `false`                                                     |
| showForm                            | String                      | pass one of three Stings to this to show the form you want to see 1) `createUser`, `signIn` or `forgotPassword`|
| changeForm                          | Event                       | Use this event to change the `showForm` props value to which form you want to show. The value comes through the first parameter            |
| loading                             | Image                       | pass a loading giphy or other type of imported image file                                                      |
| modal                               | Boolean                     | If this is set to `true` the authentication interface is presented in a modal                                  |    
| hideCloseButton                     | Boolean                     | If this is set to `true` the authentication interfaces close button will be hidden                             | 
| usersCollection                     | String                      | Pass a String with the name of the colleciton you want user information to be stored to                        |   
| googleLogo                          | Image                       | pass a imported image file to enable OAuth for Google.                                                         |
| facebookLogo                        | Image                       | pass a imported image file to enable OAuth for Foogle.                                                         |    
| twitterLogo                         | Image                       | pass a imported image file to enable OAuth for Toogle.                                                         |    
| githubLogo                          | Image                       | pass a imported image file to enable OAuth for Github.                                                         |    
| closeIcon                           | Image                       | pass a imported image file to show and icon in the close button                                                |                          
## Add Additional Custom Form Inputs

Pass them into the `<FirebaseAuthenticationInterface>` as children

```
<FirebaseAuthenticationInterface
    show={showAuthenticationInterface}
    handleHideAuthenticationInterface={() => setShowAuthenticationInterface(false)}
    showForm={showForm}
    changeForm={changeForm}
    loading={loading}
    modal={true}
    usersCollection='users'
    googleLogo={googleLogo}
    facebookLogo={facebookLogo}
    twitterLogo={twitterLogo}
    githubLogo={githubLogo}
>
    <input type="text" name="test" placeholder="Job Title" />
    <input type="text" name="test"placeholder="Favorite Color" />

</FirebaseAuthenticationInterface>
```

### Showcase

Did you use this package on your site? Send me a message to *fullstackcodecamp@gmail.com* with link and I will feature you here!