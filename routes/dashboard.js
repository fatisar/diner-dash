
/*
 * GET dashboard
 */

exports.dashboard = function(req, res){
    res.render('dashboard', {
        title: 'DinerDash'
    });
};