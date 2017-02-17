( function () {

    firebase.database().ref('elements/').once( 'value' ).then( function( data ) { console.log( data.val() ); } )

} () );
