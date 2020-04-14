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
    var test;
    var userIdHolder;
    var tokenHolder;
    var emailTokenHolder;
    var wikiIdHolder;

//     const header = req.headers.authorization;
//   const bearer = header.split(' ');
//   const token = bearer[1];

    describe(' /POST to /API/USER/SIGNUP user signup correct', () => {
        it(' it should add a user with all the fields correctly', (done) => {
            let user = {
                username: "a",
                password: "a",
                email: "samuel32259@gmail.com"
            }

            chai.request(server)
                .post('/api/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    tokenHolder = res.body.token;
                    //headerHolder = test;
                    //tokenHolder = headerHolder[1];
                    //console.log(test);
                    done();
                });
            

        });
    });
    describe(' /GET to /API/USER/ME to see user data and get email token', () => {
        it(' checking for user info in /me', (done) => {
 

            chai.request(server)
                .get('/api/user/me')
                .set('Authorization', 'Bearer ' + tokenHolder)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    emailTokenHolder = res.body.vtoken;
                    userIdHolder = res.body._id;
                    //console.log(userIdHolder);
                    done();
                });

        });
    }); 

    describe(' /POST /API/EMAIL/VERIFY/:id to test for email verifcation correct', () => {
        it(' testing to see if email verication works', (done) => {
        

            chai.request(server)
                .post('/api/email/verify/' + emailTokenHolder )
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });

        });
    }); 

    describe(' /POST /API/WIKI/WIKI/ADD to test Wiki favorite being added', () => {
        it(' Testing to see if favorites get added to wiki favorite', (done) => {
            let wikiFave = {
                userid: userIdHolder,
                favorite: {
                    "placeName": "testetsetsetset",
                    "placeLocation": {
                        "lat": "6.506233999999999",
                        "lng": "3.3675588"
                    },
                    "articleTitle": "testetset",
                    "articleURL": "https://en.wikipedia.org/wiki/test_test"
                }
            }

            chai.request(server)
                .post('/api/wiki/wiki/add')
                .send(wikiFave)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });

        });
    });

    describe(' /POST /API/WIKI/WIKI/ADD to test Wiki favorite being added part 2', () => {
        it(' Testing to see if favorites get added to wiki favorite', (done) => {
            let wikiFave = {
                userid: userIdHolder,
                favorite: {
                    "placeName": "test part 2",
                    "placeLocation": {
                        "lat": "6.506233999999999",
                        "lng": "3.3675588"
                    },
                    "articleTitle": "testetset",
                    "articleURL": "https://en.wikipedia.org/wiki/test_part 2"
                }
            }

            chai.request(server)
                .post('/api/wiki/wiki/add')
                .send(wikiFave)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });

        });
    });

    describe(' /GET to /API/WIKI/WIKI/GET to see user data and get email token', () => {
        it(' checking for user info in /wiki/get', (done) => {

            chai.request(server)
                .get('/api/wiki/wiki/get')
                .set('Authorization', 'Bearer ' + tokenHolder)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    wikiIdHolder = res.body[1]._id;
                    //console.log(wikiIdHolder);
                    done();
                });

        });
    }); 

    describe(' /DELETE to /API/WIKI/WIKI/:id to see if the first added wiki fav will be deleted', () => {
        it(' checking delete in /wiki/wiki/:id', (done) => {

            chai.request(server)
                .delete('/api/wiki/wiki/' + wikiIdHolder)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });

        });
    }); 

    describe(' /POST /API/USER/SIGNUP signup wrong', () => {
        it(' trying to make a user with out having required fields', (done) => {
            let user = {
            }

            chai.request(server)
                .post('/api/user/signup')
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
                .post('/api/user/login')
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

    describe(' /POST check if user exists', () => {
        it(' User already exists', (done) => {
            let user = {
                username: "a"
            }
            try {
            chai.request(server)
                .post('/api/user/checkuser')
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
                .post('/api/user/checkuser')
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

