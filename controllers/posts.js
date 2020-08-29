
const postModel = require('../models/posts');					

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		postModel.findById(req.params.postId, function(err, postInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Post found!!!", data:{posts: postInfo}});
			}
		});
	},

	getAll: function(req, res, next) {
		let postsList = [];

		postModel.find({}, function(err, posts){
			if (err){
				next(err);
			} else{
				for (let post of posts) {
					postsList.push({id: post._id, Title: post.Title, Description: post.Description, Author: post.Author});
				}
				res.json({status:"success", message: "posts list found!!!", data:{posts: postsList}});
							
			}

		});
	},

	updateById: function(req, res, next) {
		postModel.findByIdAndUpdate(req.params.postId,{Title:req.body.Title}, function(err, postInfo){

			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Post updated successfully!!!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		postModel.findByIdAndRemove(req.params.postId, function(err, postInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Post deleted successfully!!!", data:null});
			}
		});
	},

	create: function(req, res, next) {
		postModel.create({ Title: req.body.Title, Description: req.body.Description, Author: req.body.Author }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Post added successfully!!!", data: result});
				  
				});
	},

}					