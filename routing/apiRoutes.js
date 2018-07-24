var friend = require('../data/friends.js');

module.exports = function (app) {

	app.get('/api/friends', function(req, res){
		res.json(friend);
	})


	app.post('/api/friends', function(req, res){
		var addFriend = req.body;

		for(var i = 0; i < addFriend.scores.length; i++) {
				addFriend.scores[i] = parseInt(addFriend.scores[i]);
		}

		var diffArr = [];

		for(var i = 0; i < friend.length; i++) {

			var compFriend = friend[i];
			var totalDiff = 0;
			
			for(var j = 0; j < compFriend.scores.length; j++) {
				var diffScore = Math.abs(compFriend.scores[j] - addFriend.scores[j]);
				totalDiff += diffScore;
			}

			diffArr[i] = totalDiff;
		}

		var matchFriendInt = diffArr[0];
		var matchIndex = 0;

		for(var i = 1; i < diffArr.length; i++) {
			if(diffArr[i] < matchFriendInt) {
				matchFriendInt = diffArr[i];
				matchIndex = i;
			}
		}

		friend.push(addFriend);

		res.json(friend[matchIndex]);
	})
}