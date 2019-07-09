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
    serverRun = server.listen(3007, done);
});

after(done => {
    serverRun.close(done);
});

//adding note
describe('Craft', function () {
    describe('post craft', function () {
        it('this should add craft', function (done) {
            chai.request(server)
                .post('/v1.0/addcraft')
                .send({
                    //match fieldnames with your respective model class
                    'craftName': 'Dream Catcher',
                    'description': 'a type of product',
                    'origination': 'korea',
                    'craftType':'non-textile',
                     'products':'home decor', 
                    'price':'800' ,
                    'craftimage':'dhaka.jpg-1562417468678.jpg',
                })
                .end(function (err,res) {
                   // res.should.have.status(200)
                });
                done()
        })
    })
})

//getting
describe('Craft', () => {
    describe('/GET Craft info', () => {
        it('this should GET all the Craft', (done) => {
            chai.request(server)
                .get('/v1.0/addcraft')
                .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJhY2Nlc3NMZXZlbCI6ImFkbWluIiwiaWF0IjoxNTYyNjU1MTA4LCJleHAiOjE1NjI2OTExMDh9.E1K7Bq7zJh6Ge3kkhriq2EnHWUM2HZCGBnI--jHPLyo')
                .end((err, res) => {
                    // console.log(err);
                    // console.log(res);
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    //match fieldnames with your respective model class
                    res.body.should.all.have.property('id');
                    res.body.should.all.have.property('craftName');
                    res.body.should.all.have.property('description');
                    res.body.should.all.have.property('origination');
                    res.body.should.all.have.property('products');
                    res.body.should.all.have.property('price');
                    res.body.should.all.have.property('craftimage');
                    res.body.length.should.be.above(0);
                    done();
                })
        })
    })

})

// //update testing
// describe('Craft', function(){
//     describe('update Craft', function(){
//        id = 1; //put your id from database table
//         it('this should update the Craft', function(done){
//             chai.request(server)
//                 .put('/v1.0/addcraft/' + id)
//                 .send({
//                     //match fieldnames with your respective model class
//                     'origination':'Thamel',
//                     'price':'500'
                   
//                 })
//                 .end(function (err,res) {
//                     res.should.have.status(201);
//                     res.body.should.be.an('object');
//                     done()

//                 });

//         })
//     })
// });

//delete testing
describe('delete Craft', function() {
   id = 2;//put your id from database table
    it('this should delete the Item', function(done) {
        chai.request(server)
            .delete('/v1.0/addcraft/' + id)
            .end(function(err, res) {
                res.should.have.status(201);
                res.body.should.have.property('message');
                done();
            })
    })


});