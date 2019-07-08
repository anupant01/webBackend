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

// //getting
// describe('Item', () => {
//     describe('/GET Item info', () => {
//         it('this should GET all the Item', (done) => {
//             chai.request(server)
//                 .get('/v1.0/dashboard')
//                 .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpYmVrIiwiYWNjZXNzTGV2ZWwiOiJhZG1pbiIsImlhdCI6MTU2MjQ3OTg3OSwiZXhwIjoxNTYyNTE1ODc5fQ.MJw3aun7-AdL42YOKSEAqtFOa_z5drFYQIc54of3tjw')
//                 .end((err, res) => {
//                     // console.log(err);
//                     // console.log(res);
//                     res.should.have.status(200);
//                     res.body.should.be.an('array');
//                     //match fieldnames with your respective model class
//                     res.body.should.all.have.property('itemid');
//                     res.body.should.all.have.property('newitemname');
//                     res.body.should.all.have.property('newitemquantity');
//                     res.body.should.all.have.property('newitemcomname');
//                     res.body.should.all.have.property('newitemdesc');
//                     res.body.length.should.be.above(0);
//                     done();
//                 })
//         })
//     })
// })

// //update testing
// describe('Item', function(){
//     describe('update Item', function(){
//         itemid = 22; //put your id from database table
//         it('this should update the Item', function(done){
//             chai.request(server)
//                 .put('/v1.0/dashboard/' + itemid)
//                 .send({
//                     //match fieldnames with your respective model class
//                     'newitemquantity':'500',
//                     'newitemdesc':'You will know'
//                 })
//                 .end(function (err,res) {
//                     res.should.have.status(201);
//                     res.body.should.be.an('object');
//                     done()

//                 });

//         })
//     })
// });

// //delete testing
// describe('delete Item', function() {
//     itemid = 23;//put your id from database table
//     it('this should delete the Item', function(done) {
//         chai.request(server)
//             .delete('/v1.0/notes/' + itemid)
//             .end(function(err, res) {
//                 res.should.have.status(201);
//                 res.body.should.have.property('message');
//                 done();
//             })
//     })


// });