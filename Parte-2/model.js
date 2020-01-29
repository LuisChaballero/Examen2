let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

let bookmarkCollection = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
 
});

let Bookmark = mongoose.model('bookmarks', bookmarkCollection);

/* Tu código va aquí */

let BookmarkList{
    updateBookmark : function(ident, newData){
        return Bookmark.findOneAndUpdate({id: ident}, newData)  
            .then( result => {
                return result;
            })
            .catch ( error =>{
                throw Error (error);
            });
    }
}

module.exports = {
    BookmarkList
};