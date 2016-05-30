/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'new': function(req, res){
		res.view();
	},

	create: function(req,res,next) {
		Blog.create( req.params.all(), function blogCreated(err, blog){
			if(err) return next(err);

			res.redirect('/blog/show/' + blog.id);
		});
	},

	show: function(req,res,next){
		Blog.findOne(req.param('id'), function foundBlog(err, blog) {
			if(err) return next(err);
			if (!blog) return next();
			res.view({
				blog: blog
			});
		});
	},

	index: function(req,res,next){
		Blog.find(function foundBlogs (err, blogs){
			if(err) return next(err);

			res.view({
				blogs: blogs
			});
		});
	},

	edit: function(req,res,next){
		Blog.findOne(req.param('id'), function foundBlog(err, blog) {
			if(err) return next(err);
			if (!blog) return next();
			res.view({
				blog: blog
			});
		});
	},
    update: function(req,res,next) {
		Blog.update(req.param('id'), req.params.all(), function blogUpdated(err){
			if(err){
				return res.redirect('/blog/edit/' + req.param('id'));
			}

			res.redirect('/blog/show/' + req.param('id'));
		});
	},

	destroy: function(req, res, next) {
		Blog.destroy(req.param('id')).exec( function()  {
			res.redirect('/blog/');
			});
			}		

	
};

