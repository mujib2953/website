( function () {

    var config,
        database,
        storage;

    // Initialize Firebase
    config = {
        apiKey: "AIzaSyAGTwZIbcgCToM49vt4W2GYfWH1XsF7644",
        authDomain: "test-3823e.firebaseapp.com",
        databaseURL: "https://test-3823e.firebaseio.com",
        storageBucket: "test-3823e.appspot.com",
        messagingSenderId: "549062744875"
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    database = firebase.database();

    // Get a reference to the storage service, which is used to create references in your storage bucket
    console.log( firebase );
    storage = firebase.storage();

}() );
