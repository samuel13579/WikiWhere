process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../model/User');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('User DataBase', () => {
    before((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    });

    

    describe(' /POST user signup correct', () => {
        it(' it should add a user with all the fields correctly', (done) => {
            let user = {
                username: "a",
                password: "a",
                email: "samuel32259@gmail.com"
            }

            chai.request(server)
                .post('/api/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });

        });
    });

    describe(' /POST user signup wrong', () => {
        it(' trying to make a user with out having required fields', (done) => {
            let user = {
            }

            chai.request(server)
                .post('/api/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    done();
                });

        });
    }); 
    
    describe(' /POST user login correct', () => {
        it(' User Logs in with correct user, but not verified', (done) => {
            let user = {
                username: "a",
                password: "a",
                email: "samuel32259@gmail.com"
            }
            try {
            chai.request(server)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(405);
                    res.body.should.be.a('object');
                    done();
                });
            }catch(e) {
                console.log('error:', err);
            }

        });
    }); 

    describe(' /POST check if user exists', () => {
        it(' User already exists', (done) => {
            let user = {
                username: "a"
            }
            try {
            chai.request(server)
                .post('/api/checkuser')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
            }catch(e) {
                console.log('error:', err);
            }

        });
    }); 
    describe(' /POST check if user does not exists', () => {
        it(' User does not already exists', (done) => {
            let user = {
                username: "aa"
            }
            try {
            chai.request(server)
                .post('/api/checkuser')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
            }catch(e) {
                console.log('error:', err);
            }

        });
    }); 

});

