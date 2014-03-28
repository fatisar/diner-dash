exports.clients = function(db) {
    return function(req, res) {
        var collection = db.get('clients');
        collection.find({},{},function(e,docs){
            res.render('clientslist', {
                "allclients" : docs
            });
        });
    };
};

exports.newclient = function(req, res) {
    res.render('newclient', { title: 'Add New Restaurant' });
}

exports.addclient = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var clientName = req.body.name;
        var clientAddress = req.body.address;
        var clientPhone = req.body.phone;

        // Set our collection
        var collection = db.get('clients');

        // Submit to the DB
        collection.insert({
            "name" : clientName,
            "address" : clientAddress,
            "phone" : clientPhone
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("clients");
                // And forward to success page
                res.redirect("clients");
            }
        });

    }
}