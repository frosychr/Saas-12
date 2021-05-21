const Question = require('../models/question');


exports.getperkeyword = (req, res) => {
    const checkauth = req.session.isLoggedIn;
    if (checkauth) {
        Question.find({}).select('keywords -_id')
            .then(questions => {
                var results = new Array();
                for (var i = 0; i < questions.length; i++) {
                    const test = JSON.stringify(questions[i])
                    const result2 = test.split(':[')[1].split(']')[0] // returns 'two'
                    const result3 = result2.split(',')
                    for (var j = 0; j < result3.length; j++) {
                        results.push(result3[j])
                    }
                }
                var total_counts = new Array;
                for (var k = 0; k < results.length; k++) {
                    var res1 = 0;
                    for (var l = 0; l < results.length; l++) {
                        if (results[k] === results[l]) {
                            res1++;
                        }
                    }
                    total_counts.push(res1);

                }

                res.render('perkeyword', {
                    quest: results,
                    counts: total_counts,
                    pageTitle: 'Number of Questions per Keyword',
                    path: '/perkeyword',
                    isAuthenticated: req.session.isLoggedIn
                });
            })
            .catch(err => {
                console.log(err);
            })
    } else{
        res.render('landing',
            {
                pageTitle: 'Landing Page',
                path: '/',
                isAuthenticated: req.session.isLoggedIn
            });
    }
};