
var chai = require("chai")
let server = require("../index")
let chaiHttp = require("chai-http")
const routes = require("../routes/commentRouter")
const utils = require("../models/commentModelSchema")

chai.should();
chai.use(chaiHttp);

describe("POST/api/blog", () => {
    it("It  should return add comment blog :", (done) => {
        const data = {
            blogComment: "Excellent"
        };
        chai
            .request(server)
            .post("/comment/add_comment/63f959f1fc569901c63beb9f/63edc62c761fcaaa40664bc5")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq("success");
                res.body.should.have.property("message").eq("Comment successfully added");
                done();
            })
    })
})
