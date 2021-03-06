const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controller/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const rootDir = require('./util/path');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use( (req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)

app.use(errorController.get404Page);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem });

//synchronizuje modele z bazą danych, tworząc tabele oraz relacje jeśli takie są zdef.
sequelize
    //.sync({force: true} )
    .sync()
    .then(result => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return User.create( {name: 'Max', email: 'test@test.com'});
        }
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

