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
                    'userType':'User'
                })
                .end(function (err,res) {
                   // res.should.have.status(200)
                });
                done()
        })
    })
})

describe('PUT User', function() {
    userid = 2;
    it('it should edit the user with new values', function(done) {
        chai.request(server)
            .put('/v1/user/' + userid)
            .send({
                'address': 'Kathmandu',
               
            })
            .end(function(err, res) {
                res.should.have.status(201);
                res.body.should.have.property('message');
                done();
            })
    })


});
