
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', {
        title: 'DinerDash'
    });
};

exports.signin = function(req, res) {
    res.render('signin', {

    })
}