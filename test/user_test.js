
var chai = require("chai")
let server = require("../index")
let chaiHttp = require("chai-http")
const routes = require("../routes/userRouter")
const utils = require("../models/userModelSchema")

chai.should();
chai.use(chaiHttp);

describe("POST/api/user", () => {
    it("It  should return login user detail :", (done) => {
        const data = {
            userEmail: "mitanshi@gmail.com",
            userPassword: "@$@123MMMDDdddd123",
        };
        chai
            .request(server)
            .post("/user/user_login")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq("success");
                res.body.should.have.property("message").eq("User login successfull");
                res.body.should.have.property("token");
                done();
            })
    })
})

it("It  should return login user detail Error message :", (done) => {
    const data = {
        userEmail: "mitan@gmail.com",
        userPassword: "@$@123MMMDDdddd123",
    };
    chai
        .request(server)
        .post("/user/user_login")
        .send(data)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("failure");
            res.body.should.have.property("message").eq("Not registered user");
            done();
        })
})

it("It  should return login user detail Error message:", (done) => {
    const data = {
        userEmail: "mitanshi@gmail.com",
        userPassword: "@$@123MMMDDdddd12300",
    };
    chai
        .request(server)
        .post("/user/user_login")
        .send(data)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("failure");
            res.body.should.have.property("message").eq("Email or Password is invalid");
            done();
        })
})

// it("It  should return signUp user detail :", (done) => {
//     const data = {
//         userName: "Krish",
//         userEmail: "kriishhh01@gmail.com",
//         userPassword: "$@$123MMMDDdddd123",
//         city: "Indore",
//         phoneNo: "2340945673"
//     };
//     chai
//         .request(server)
//         .post("/user/user_register")
//         .set("Content-Type","application/x-www-form-urlencoded")
//         .field(data)
//         .attach("profilePic","/Users/a/Desktop/image2.jpg","image2.jpg")
//         .send(data)
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.should.be.a("object");
//             res.body.should.have.property("success").eq("success");
//             res.body.should.have.property("message").eq("User's data successfully registered");
//             done();
//         })
// })

it("It  should return signUp user detail Error message:", (done) => {
    const data = {
        userName: "Krish",
        userEmail: "kris@gmail.com",
        userPassword: "$@$123MMMDDdddd123",
        city: "Indore",
        phoneNo: "2340945673"
    };
    chai
        .request(server)
        .post("/user/user_register")
        .send(data)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("failure");
            res.body.should.have.property("message").eq("User email is already exists");
            done();
        })
})

it("It should return user reset password email :", (done) => {
    const data = {
        userEmail: "krish@gmail.com",
    };
    chai
        .request(server)
        .post("/user/reset_password_email")
        .send(data)
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("success");
            res.body.should.have.property("message").eq("Email send to user successfully")
            done();
        })
})

it("It should return user reset password email Error message :", (done) => {
    const data = {
        userEmail: "krishhhh@gmail.com",
    };
    chai
        .request(server)
        .post("/user/reset_password_email")
        .send(data)
        .end((err, res) => {
            res.should.have.status(403);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("failure");
            res.body.should.have.property("message").eq("Email user is not found")
            done();
        })
})

it("It should return user password reset :", (done) => {
    const data = {
        newPassword: "@$@123KKKDDdddd111",
        confirmPassword: "@$@123KKKDDdddd111"
    };
    chai
        .request(server)
        .post("/user/reset_password/63f807bd04f42e5facf4e9de/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTQxMDY1OTgsImV4cCI6MTY5NDExMDE5OH0.AW_QH7T6ezhlhqB6gyzmHnBd3_mdD7xOSXsUyE5jlVY")
        .send(data)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("success");
            res.body.should.have.property("message").eq("Password update successfully")
            done();
        })
})

it("It should return user reset password Error message :", (done) => {
    const data = {
        newPassword: "@$@123KKKDDdddd111",
        confirmPassword: "@$@123KKKDDdddd111"
    };
    chai
        .request(server)
        .post("/user/reset_password/63f807bd04f42e5facf4e9de/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTQxMDY1OTgsImV4cCI6MTY5NDExMDE5OH0.AW_QH7T6ezhlhqB6gyzmHnBd3_mdD7xOSXsUyE5jlVY")
        .send(data)
        .end((err, res) => {
            res.should.have.status(403);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("failure");
            res.body.should.have.property("message").eq("Newpassword and Confirmpassword is not match")
            done();
        })
})
