# Firebase Camp

## Use Firebase in your React app super easily

![Data Structure](images/documentation-header.svg)

### Setting up Firebase in React can be tricky. This pacakge is designed to make configuring Firebase in your app a cinch. It also has robust UI for Firebase Authenticaiton. 

## What you can do with it

1. Initialize using your **Firebase Config**

2. Use Firebase **Authentication** with a modern pop up modal UI

3. Run **Cloud Firestore** queries

## Implementation using React hooks

### Step 1. Install it through NPM 
```
npm i firebase-camp
```

### Step 2. Import it into your app
Note: I always use *create-react-app* to initialize React apps. My examples will be based on this configuration.

```
import Firebase, { FirebaseConnection, FirebaseAuthModal } from 'firebase-camp'
```

### Step 3. Import React hook *useEffect*
```
import React, {useEffect} from 'react';
```

### Step 4. Use FirebaseConnection inside useEffect
Pass your firebase details to FirebaseConnection() as an object inside the useEffect() React hoo. The object below is for example purposes only and will not work.
```
  useEffect(() => {
    FirebaseConnection({
      apiKey: "AIzaSyDsd32fdsJSuhM5-SwPciefJh4noeuOoIo",
      authDomain: "fullstackcode-camp.firebaseapp.com",
      databaseURL: "https://fullstackcode-camp.firebaseio.com",
      projectId: "fullstackcode-camp",
      storageBucket: "fullstackcode-camp.appspot.com",
      messagingSenderId: "3971746234287",
      appId: "1:397174694587:web:3dd5b6bcffdd23df7"
    })
  }, [])
  ```
### Pulling it all together
Your app might look something like this right now.
```
import React, { useEffect } from 'react';
import Firebase, { FirebaseConnection, FirebaseAuthModal } from 'firebase-camp'
import '../node_modules/firebase-camp/src/styles.css'
import './App.css';

function App() {
  useEffect(() => {
    FirebaseConnection({
      apiKey: "AIzaSyDtA6DdXoJSuhM5-SwPciefJh4noeuOoIo",
      authDomain: "fullstackcode-camp.firebaseapp.com",
      databaseURL: "https://fullstackcode-camp.firebaseio.com",
      projectId: "fullstackcode-camp",
      storageBucket: "fullstackcode-camp.appspot.com",
      messagingSenderId: "397174694587",
      appId: "1:397174694587:web:3dd5b6bcff4579f7"
    })
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
```


## Using Cloud Firestore
Making Firesore queries is pretty easy. If you are viewing Firebase documentation you will see that all queries start like this `firebase.collection('lessons')`. With this package you call it like this `Firebase.collection('lessons')`. The only difference is the capital *F*.

### Step 1. Make the query
```
Firebase.firestore().collection('lessons').onSnapshot(querySnapshot => {
    const data = querySnapshot.docs.map(doc => {
        let obj = doc.data()
        obj.id = doc.id
        return obj
    })
    console.log(data)
})
```

### Step 2. Put your data into React state
import React hook `useState`
```
import React, {useEffect, useState} from 'react';
```
initalize state for your collection. My collection example is *lessons*. Yours will likely be something completely different
```
const [lessons, setLessons] = useState([])
```
Put it into state with what you named your useSate generated function for updating state. In my example it is `setLessons`.
```
Firebase.firestore().collection('lessons').onSnapshot(querySnapshot => {
    const data = querySnapshot.docs.map(doc => {
        let obj = doc.data()
        obj.id = doc.id
        return obj
    })
    setLessons(data)
})
```

### Step 3. Loop (map) through your data inside your function return
```
{lessons.map((each) => {
    return(
    <div key={each.id}>
        <h2>{each.title}</h2>
    </div>
    ) 
})}
```

### Pulling it all together
Your app might look something like this right now.
```
import React, { useEffect, useState } from 'react';
import Firebase, { FirebaseConnection, FirebaseAuthModal } from 'firebase-camp'
import '../node_modules/firebase-camp/src/styles.css'
import './App.css';

function App() {

  const [lessons, setLessons] = useState([])

  useEffect(() => {

    FirebaseConnection({
      apiKey: "AIzaSyDsd32fdsJSuhM5-SwPciefJh4noeuOoIo",
      authDomain: "fullstackcode-camp.firebaseapp.com",
      databaseURL: "https://fullstackcode-camp.firebaseio.com",
      projectId: "fullstackcode-camp",
      storageBucket: "fullstackcode-camp.appspot.com",
      messagingSenderId: "3971746234287",
      appId: "1:397174694587:web:3dd5b6bcffdd23df7"
    })

    Firebase.firestore().collection('lessons').onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        let obj = doc.data()
        obj.id = doc.id
        return obj
      })
      setLessons(data)
    })
    
  }, [])

  return (
    <div className="App">
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

### Some additional Cloud Firestore notes
Don't forget that your collection must be readable at this point with no authentication.

Your rules might look like something like this:
```
service cloud.firestore {
  match /databases/{database}/documents {
      
      match /lessons/{document=**} {
      	allow read;
    	}
  }
}
```

I can't stand it when something simple goes unexplained so I am going to show you what my data looks like in the Firebase console for good measure. Notice that **title** is part of my data. Thats what I showed you in the above .map().

![Data Structure](images/data-structure.png)


## Using the Authenticaton Modal
Modal preview
![Authentication Modal](images/auth-modal.png)

### Step 1. Import or copy CSS into your existing CSS file
```
import '../node_modules/firebase-camp/src/styles.css'
```
or copy this CSS into your App.css file. To be fair this is a better choice becuase you have the ablility to teak the UI to your liking

```
#auth-modal{
	display:none;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0,0,0,0.4)
}
#auth-modal-content{
	background-color: #fefefe;
	margin: 4% auto;
	border: 1px solid #888888;
	width: 400px;
}
#auth-modal-close{
	float: right;
	margin-right: -15px;
	margin-top: -15px;
	font-size: 18px;
	padding: 8px 14px 9px 15px;
	border-radius: 100px;
	z-index: '1';
    position: relative;
    text-align: center;
}
#auth-modal-close:hover, #auth-modal-close:focus{
	text-decoration: none;
	cursor: pointer;
}
#authentication{
	padding: 40px 20px 20px 20px;
}
#sign-in-link, #create-user-link{
	color: #32a1d7;
	margin-left: 5px;
	
}
#create-user-inputs, #sign-in-inputs{
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 20px;
	margin-bottom: 30px;
}
#forgot-password-inputs{
	margin-bottom: 20px;
}
#forgot-password-link{
	text-align: right;
	font-size: 10px;
	margin-top: -17px;
	cursor: pointer;
}
#six-character-min{
	text-align: left;
	font-size: 10px;
	margin-top: -17px;
	font-style: italic;
}
#create-user-display-name{
	grid-column-end: span 2;
}
#have-or-need-account-dialog{
	padding-top: 10px;
}
#oauth-providers-grid{
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 45px;
	padding-bottom: 40px;
}
#or{
	border-top: 2px solid #EFEFEF;
	position: relative;
	margin-bottom: 40px;
}
#or > p {
	position: absolute;
	top: -13px;
	left: 45%;
	width: 10%;
	text-align: center;
	margin: 0px;
	background-color: white;
}
#error-message{
	border: 1px solid red;
	color: red;
	position: relative;
	margin: 40px 20px 20px 20px;
	padding: 10px;
}
#success-message{
	border: 1px solid green;
	color: green;
	position: relative;
	margin: 40px 20px 20px 20px;
	padding: 10px;
}
.center{
    text-align: center;
}
button{
    color: #FFF;
    width: 100%;
    text-align: center;
    border: 0px;
    border-radius: 10px;
    padding: 10px 5px 10px 5px;
    font-size: 16px;
    outline: 0;
    cursor: pointer;
}
.button-style-one{
    color: #FFF;
    max-width: 200px;
    background-color: #70C284;
    box-shadow: 0 2px rgb(95, 167, 113);
}
.button-style-one:hover{
    box-shadow: 0 1px rgb(95, 167, 113);
}
.button-style-one:active{
    box-shadow: 0 0 rgb(95, 167, 113);
}
.button-style-two{
    color: #FFF;
    max-width: 200px;
    margin: auto;
    background-color: #8697CB;
    box-shadow: 0 2px rgb(106, 121, 163);
}
.button-style-two:hover{
    box-shadow: 0 1px rgb(106, 121, 163);
}
.button-style-two:active{
    box-shadow: 0 0 rgb(106, 121, 163);
}
.button-style-three{
    color: #FFF;
    max-width: 200px;
    margin: auto;
    background-color: rgb(196, 196, 196);
    box-shadow: 0 2px rgb(167, 167, 167);
} 
.button-style-three:hover{
    box-shadow: 0 1px rgb(167, 167, 167);
}
.button-style-three:active{
    box-shadow: 0 0 rgb(167, 167, 167);
}
.signInToggle{
    color: #70C284;
}
.createUserToggle{
    color: #8697CB;
}
input{
	width: 100%;
	font-size: 20px;
	padding: 10px 0px 10px 0px;
	border-width: 0px 0px 2px 0px;
}
input::placeholder{
	color: #989898
}
input:focus{
	border-color: green;
	outline: none;
}
```

### Step 2. Import the loading gif. Feel free to pass your own if you don't want to use ours
```
import loading from '../node_modules/firebase-camp/src/loading.gif'
```

### Step 3. Configure state and functions
Initalize these two states. `showAuthModal` allows you to show/hide the modal. `showForm` allows you to toggle between the **sign in**, **create user**, and **forgot password** forms.
```
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [showForm, setShowForm] = useState('')
```

Step 4. Add required functions
These help us manipulate our state
```
const handleShowAuthModal = (form) => {
    setShowForm(form)
    setShowAuthModal(true)
}

const changeForm = (form) => {
    setShowForm(form)
}
```


### Step 4. Call the FirebaseAuthModal component and pass it the required props

```
<FirebaseAuthModal 
    show={showAuthModal} 
    handleHideAuthModal={() => setShowAuthModal(false)}
    showForm={showForm}
    changeForm={changeForm}
    loading={loading}
    Firebase={Firebase}
/>
```

### Step 5. Use the handleShowAuthModal function to open the modal. 
```
<button onClick={() => handleShowAuthModal('signIn')}>Sign in</button>                    
<button onClick={() => handleShowAuthModal('createUser')}>Create user</button>
```

### Step 6. Make your app aware of signed in users with the onAuthStateChangedFunction

```
 useEffect(() => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user){
        console.log(user);
        // do stuff here that you want to happen when user is signed out
      } else {
        console.log('not signed in');
        // do stuff here that you want to happen when user is signed in
      }
    })
}, [])
```

I like to put my use in React state like this

```
const [user, setUser] = useState({})

useEffect(() => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user){
        console.log(user);
        // do stuff here that you want to happen when user is signed out
        setUser(user)
      } else {
        console.log('not signed in');
        // do stuff here that you want to happen when user is signed in
      }
    })
}, [])
```

Final Example App with Cloud Firestore and Authentication

```
import React, { useEffect, useState } from 'react';
import Firebase, { FirebaseConnection, FirebaseAuthModal } from 'firebase-camp'
import loading from '../node_modules/firebase-camp/src/loading.gif'
import '../node_modules/firebase-camp/src/styles.css'
import './App.css';

function App() {

  const [lessons, setLessons] = useState([])
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showForm, setShowForm] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {

    FirebaseConnection({
      apiKey: "AIzaSyDsd32fdsJSuhM5-SwPciefJh4noeuOoIo",
      authDomain: "fullstackcode-camp.firebaseapp.com",
      databaseURL: "https://fullstackcode-camp.firebaseio.com",
      projectId: "fullstackcode-camp",
      storageBucket: "fullstackcode-camp.appspot.com",
      messagingSenderId: "3971746234287",
      appId: "1:397174694587:web:3dd5b6bcffdd23df7"
    })

    Firebase.auth().onAuthStateChanged(user => {
      if (user){
        console.log(user);
        // do stuff here that you want to happen when user is signed out
        setUser(user)
      } else {
        console.log('not signed in');
        // do stuff here that you want to happen when user is signed in
      }
    })

    Firebase.firestore().collection('lessons').onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        let obj = doc.data()
        obj.id = doc.id
        return obj
      })
      setLessons(data)
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
            Firebase={Firebase}
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

