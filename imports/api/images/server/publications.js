import { Meteor } from 'meteor/meteor';
import { Images } from '../images.js';

//Isso é um gato - MEOW
if(Meteor.isServer){
    Meteor.publish('images', function imagesPublication() {
        return Images.find({});
    });
    Meteor.publish("image", function imagePublication(imageId){
        return Images.find({_id:imageId});
    });
}
