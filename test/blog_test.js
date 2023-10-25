
var chai = require("chai")
let server = require("../index")
let chaiHttp = require("chai-http")
const routes = require("../routes/userRouter")
const utils = require("../models/blogModelSchema")

chai.should();
chai.use(chaiHttp);

describe("POST/api/blog", () => {
    it("It  should return add blog :", (done) => {
        const data = {
            blogTitle: "Blog",
            blogDescription: "Joyfully",
            blogLikes: "5"
        };
        chai
            .request(server)
            .post("/blog/add_blog/63edc62c761fcaaa40664bc5")
            .set("Content-Type","application/x-www-form-urlencoded")
            .field(data)
            .attach("blogPic","/Users/a/Desktop/image1.jpg","image1.jpg")
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.a("object");
                res.body.should.have.property("success").eq("success");
                res.body.should.have.property("message").eq("Blog successfully added");
                done();
            })
    })
})

describe("GET/api/blog", () => {
    it("It  should return blog list :", (done) => {
        const data = {};
        chai
            .request(server)
            .get("/blog/blog_list")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq("success");
                res.body.should.have.property("message").eq("Show blog list here");
                done();
            })
    })

})

describe("GET/api/blog", () => {
    it("It  should return blog search :", (done) => {
        const data = {
            blogTitle: "Education Blog"
        };
        chai
            .request(server)
            .get("/blog/blog_search")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq("success");
                res.body.should.have.property("message").eq("Show your searching blog here");
                done();
            })
    })
})

describe("PATCH/api/blog", () => {
    it("It  should return blog update :", (done) => {
        const data = {
            blogTitle: "Osum",
            blogDescription: "Create unique and clearly blog ",
            blogLikes: "6"
        };
        chai
            .request(server)
            .patch("/blog/blog_update/63f975be5b70b2c92fa9db1e")
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.a("object");
                res.body.should.have.property("success").eq("success");
                res.body.should.have.property("message").eq("Your blog edited successfully");
                done();
            })
    })
})

describe("DELETE/api/blog", () => {
    it("It  should return blog delete :", (done) => {
        const data = {};
        chai
            .request(server)
            .delete("/blog/blog_delete/63fe895423a510b10a7514fd")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq("success");
                res.body.should.have.property("message").eq("Your blog successfully deleted");
                done();
            })
    })
})

it("It  should return blog likes :", (done) => {
    const data = {
        blogLikes: "true"
    };
    chai
        .request(server)
        .patch("/blog/blog_likes/63f4177292a7ed426a6596ab")
        .send(data)
        .end((err, res) => {
            res.should.have.status(202);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("success");
            res.body.should.have.property("message").eq("You liked a blog");
            done();
        })
})

it("It  should return blog likes :", (done) => {
    const data = {
        blogLikes: "false"
    };
    chai
        .request(server)
        .patch("/blog/blog_likes/63f4177292a7ed426a6596ab")
        .send(data)
        .end((err, res) => {
            res.should.have.status(202);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("failure");
            res.body.should.have.property("message").eq("You unliked a blog");
            done();
        })
})
