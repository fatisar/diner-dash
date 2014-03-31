
/*
 * GET dashboard
 */

exports.dashboard = function(req, res){
    var dailySales = 1742;
    var averageDailySales = 1378;
    var hourlySales = 92;
    var averageHourlySales = 132;
    var hourlyCustomers = 34;
    var averageHourlyCustomers = 17;

    var dailySalesColor = computeColor(dailySales,  averageDailySales)
    var hourlySalesColor = computeColor(hourlySales,  averageHourlySales)
    var hourlyCustomersColor = computeColor(hourlyCustomers,  averageHourlyCustomers)

    glance = {
        dailySales: dailySales,
        averageDailySales: averageDailySales,
        hourlySales: hourlySales,
        averageHourlySales: averageHourlySales,
        hourlyCustomers: hourlyCustomers,
        averageHourlyCustomers: averageHourlyCustomers,
        dailySalesColor: dailySalesColor,
        hourlySalesColor: hourlySalesColor,
        hourlyCustomersColor: hourlyCustomersColor
    }
    res.render('dashboard', {
        title: 'DinerDash',
        glance: glance
    });
};

var computeColor = function(current, average) {
    var ratio = current / average;

    var r, g, b = 0x80;

    if (current >= average) {
        g = Math.min(Math.round(ratio * 0x80), 0xEF);
        r = 0xFF - g;
    } else {
        r = Math.min(Math.round(0x80 / ratio), 0xEF);
        g = 0xFF - r;
    }

    return "#" + ((r*0x10000) + (g * 0x100) + b).toString(16);


}