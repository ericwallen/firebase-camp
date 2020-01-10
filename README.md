# Firebase Camp

## Use Firebase in your React app super easily

### Setting up Firebase in React can be tricky. This pacakge is designed to make configuring Firebase in your app a cinch. It also has robust UI for Firebase Authenticaiton. 

## What you can do with it

1. Initialize using your **Firebase Config**

2. Use Firebase **Authentication** with a modern pop up modal UI

3. Run **Cloud Firestore** queries

## Implementation using React hooks

### **Step 1** Install it through NPM 
```
npm i firebase-camp
```

### **Step 2** Import it into your app
Note: I always use *create-react-app* to initialize React apps. My examples will be based on this configuration.

```
import Firebase, { FirebaseConnection, FirebaseAuthModal } from 'firebase-camp'
```

### **Step 3** Import React hook *useEffect*
```
import React, {useEffect} from 'react';
```

### **Step 4** Use FirebaseConnection inside useEffect
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

### **Step 1** Make the query
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

### **Step 2** Put your data into state
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

### **Step 3** Loop (map) through it in your function return
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
      apiKey: "AIzaSyDtA6DdXoJSuhM5-SwPciefJh4noeuOoIo",
      authDomain: "fullstackcode-camp.firebaseapp.com",
      databaseURL: "https://fullstackcode-camp.firebaseio.com",
      projectId: "fullstackcode-camp",
      storageBucket: "fullstackcode-camp.appspot.com",
      messagingSenderId: "397174694587",
      appId: "1:397174694587:web:3dd5b6bcff4579f7"
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

![Data Structure](images/data-structure.jpg)


## Using the Authenticaton Modal

