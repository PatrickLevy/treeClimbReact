import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const Trees = new Mongo.Collection('trees');

//NOTE:  The api files must be imported into /server/main.js in order to actually run!!!!!!!!!!! 

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('trees', function treesPublication() {
        return Trees.find({
            // $or: [
            //     { private: { $ne: true } },
            //     { owner: this.userId },
            // ],
        });
    });
}


Meteor.methods({
    'trees.insert'(treeName, treeDescription, treeRating, treeLocation) {
        check(treeName, String);
        check(treeDescription, String);
        check(treeRating, String);
        check(treeLocation, Object);

        // Make sure the user is logged in before inserting a tree
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Trees.insert({
            treeName: treeName,
            treeDescription: treeDescription,
            treeRating: treeRating,
            treeLocation: treeLocation,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'trees.remove'(treeId) {
        check(treeId, String);

        const tree = Trees.findOne(treeId);
        if (tree.owner !== this.userId) {
            // make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Trees.remove(treeId);
    }

});