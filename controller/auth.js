exports.getLogin = (req, res, next) => {
    // req.user
    //     .getOrders( {include: ['products']})
    //     .then(orders => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
        
        });
        // })
        // .catch(err=>console.log(err));
};

export.postLogin = (req, res, next) => {
    res.redirect('/');
}