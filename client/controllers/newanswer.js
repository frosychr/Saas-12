const axios = require('axios')

exports.getnewans = (req, res, next) => {
    const checkauth =  req.session.isLoggedIn
    if(checkauth){
       axios.all([
           axios.get(`http://localhost:4001/api/allquestions`),
           axios.get(`http://localhost:4002/api/allanswers`)

       ])
            .then(axios.spread((result, data2) =>{
                const questions = result.data
                islogged = true
                res.render('newanswer',{
                    quest: questions,
                    ans: data2.data,
                    pageTitle:'Answer a Question',
                    path: '/newanswer',
                    isAuthenticated: req.session.isLoggedIn
                });
            })
        /*    .catch(err =>{
                console.log(err)
                return res.redirect('/')
            })*/ )
        }
}

 exports.postnewans =  async (req, res) => {

    const text = req.body.answer;
    const temp = req.body.titles;
    const user = req.session.user;
    const questionid = temp.split(' [')[0];

console.log( questionid)
     const config = {
         method:"post",
         url:"http://localhost:4002/api/answer",
         data: {text,user,questionid}
     }

     axios(config)
         .then(result =>{
             console.log("Successfull answer created")
             res.redirect('/')
         })
         .catch(err =>{
             console.log(err.response.data)
             return res.redirect('/newanswer')
         })


};
