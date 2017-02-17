(function() {

    /*
    ** My Logics
    */

    var oScope = {};

    // --- reads the elements from JSON file.
    $.ajax({

        // url: 'custom/data/periodictable.json',
        url: 'custom/data/elementsJSON.json',
        method: 'GET',
        success: function( data ) {
            storeData.call( oScope, data )
        },
        error: function( err ) {
            console.log( 'Error occured. ' );
            console.warn( err );
        }

    });

    // --- Iterate all the elements from json file
    function storeData( p_obj ) {
        var i;

        this.elements = p_obj.elements;
        for( i in this.elements ) {
            addElem.call( this, this.elements[ i ] );
        }
    }

    // --- Adds All elements to the firebase DB
    function addElem( p_obj ) {
        firebase.database().ref( '/elements/' + p_obj[ 'name' ] ).set({

            "proton": filterString( p_obj[ 'proton' ] ),

            "Symbol": filterString( p_obj[ 'Symbol' ] ),

            "name": filterString( p_obj[ 'name' ] ),

            "type": filterString( p_obj[ 'type' ] ),

            "block": filterString( p_obj[ 'block' ] ),

            "boilingPoint": filterString( p_obj[ 'boilingPoint' ] ),

            "Electronegativity": filterString( p_obj[ 'Electronegativity' ] ),

            "Density": filterString( p_obj[ 'Density' ] ),

            "AtomicMass": filterString( p_obj[ 'AtomicMass' ] ),

            "IonizationEnergy": filterString( p_obj[ 'IonizationEnergy' ] ),

            "AtomicRadius": filterString( p_obj[ 'AtomicRadius' ] ),

            "AtomicRadius_InPicometers": filterString( p_obj[ 'AtomicRadius_InPicometers' ] ),

            "MeltingPoint": filterString( p_obj[ 'MeltingPoint' ] ),

            "ElementColor": filterString( p_obj[ 'ElementColor' ] )
        });
        console.log( 'data is added to firebase.' );
    };

    // --- filter the string
    function filterString( p_str ) {
        return ( p_str === null ) ? "" : p_str
    }

    window.oScope = oScope;
}() );
