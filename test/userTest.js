const chai = require('chai');
const chaiHttp = require('chai-http');
var should = chai.should();
const chaiLike = require('chai-like');
const chaiThings = require('chai-things');

const server = require("../index");
// console.log(server)
var serverRun;
chai.use(chaiHttp);
chai.use(chaiLike);
chai.use(chaiThings);

before(done =>{
    serverRun = server.listen(3002, done);
});

after(done => {
    serverRun.close(done);
});

//registration Test
describe('Users', function () {
    describe('post user Register', function () {
        it('it should register the user', function (done) {
            chai.request(server)
                .post('/v1/register')
                .send({
                    'firstName':'Anu','lastName':'Pant','email':'a@gmail.com',
                    'address':'jorpati','username':'anu','password':'a',
                    'image':'pikachu.jpeg-1561709253223.jpeg','userType':'User'
                })
                .end(function (err,res) {
                   // res.should.have.status(200)
                });
                done()
        })
    })
})
