( function() {

    $(document).ready( function() {
        addEvent();
    } );

    function addEvent() {
        console.log( document.getElementById('files') );
        document.getElementById('files').addEventListener('change', handleFileSelect, false);

    }

    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        console.log( 'called' );
        console.log( files );
        // files is a FileList of File objects. List some properties.
        for (var i = 0, f; f = files[i]; i++) {

            console.log( f.name );
            console.log( f.type || 'N/A' );
            console.log( f.size + ' bytes ' );
            console.log( f.lastModifiedDate.toLocaleDateString() || ' N/A ' + ' last modified.' );

            uploadToFire( f );
        }
    }

    function uploadToFire( p_ob ) {

        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = firebase.storage();

        // Create a storage reference from our storage service
        var storageRef = storage.ref();

        // File or Blob named mountains.jpg
        var file = p_ob;

        // Create the file metadata
        var metadata = {
          contentType: p_ob.type
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, function() {
          // Upload completed successfully, now we can get the download URL
          var downloadURL = uploadTask.snapshot.downloadURL;
        });

    }

} () );
