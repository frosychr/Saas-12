const axios = require('axios')

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false,
      errorMessage: req.flash('error')
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuthenticated: false,
      errorMessage: req.flash('error'),
      errorMessage2: req.flash('error2'),
      errorMessage3: req.flash('error3')
  });
};

exports.postLogin = (req, res ,next) => {
  const config = {
      method:"post",
      url:"http://localhost:4000/api/login",
      data: req.body
  }
  axios(config)
      .then(result =>{
          req.session.isLoggedIn = true
          req.session.user = result.data.payload.user.id
          req.session.token = result.data.payload.token;
          res.redirect('/')
      })
      .catch(err =>{
          console.log(err.response.data)
          return res.redirect('/login')
      })


};


exports.postSignup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const config = {
        method:"post",
        url:"http://localhost:4000/api/signup",
        data: req.body
    }
    axios(config)
        .then(result =>{
            req.session.isLoggedIn = true
            req.session.user = result.data.payload.user.id
            req.session.token = result.data.payload.token;
            res.redirect('/login')
        })
        .catch(err =>{
            console.log(err.response.data)
            return res.redirect('/signup')
        })

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if(err) console.log(err);
    res.redirect('/');
  });
};
