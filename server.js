const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session')
const Razorpay = require('razorpay');
const app = express()
app.use(session({secret : 'hello'}));
app.use(express.static('public'))
app.use(body_parser.urlencoded({
    extended: true
  }));
mongoose.connect('mongodb://localhost:27017/').then((res)=>{
    console.log('Connected')
})
const razorpayInstance = new Razorpay({
  
    // Replace with your key_id
    key_id: 'rzp_test_EA78F546jVbeUE',
  
    // Replace with your key_secret
    key_secret: '8GZdSzapFRVFKKx5jwDZks7J'
});
const User = mongoose.Schema({
    Email : String,
    Name : String,
    Password : String,
})
const UserModel = mongoose.model('UserSchema',User)
const Payment = mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true,
    },
    Phone : {
        type : Number,
        required : true
    },
    Message : {
        type : String,
        required : true
    },
    Amount : {
        type : Number,
        required : true
    },
    ngo : {
        type : String,
        required : true
    }
})
const PaymentModel = mongoose.model("Payment", Payment);
app.use(body_parser.json())
app.get('/',async(req,res)=>{
    res.sendFile(__dirname + '/FrontEnd/signup.html')
})
app.post('/register',async(req,res)=>{
    console.log(req.body)
    const {Email,UserName,Password} = req.body;
    UserData = await UserModel.findOne({Email});
    if(UserData){
        console.log('Already Existing')
        res.redirect('/login')
        
    }
    else{
        const NewUser = new UserModel({Email,UserName,Password});
        await NewUser.save().then((result)=>{
            console.log('Saved')
            console.log(result)
            res.redirect('/login')
        }).catch((err)=>{
            console.log(err)
        })
    }
})
app.get('/login',async(req,res)=>{
    res.sendFile(__dirname + '/FrontEnd/login.html')
})
app.post('/login',async(req,res)=>{
    const {Email,Password} = req.body;
    const UserData = await UserModel.findOne({Email})
    console.log(Email,Password)
    console.log('Here')
    
    if(UserData)
    {
        if(UserData.Password == Password)
        {
            console.log(UserData._id)
            req.session.user_id = UserData._id
            console.log(req.session.user_id)
            res.sendFile(__dirname + '/FrontEnd/index.html')
        }
    }
    else
    {
        console.log('Does not exist')
        res.send('Not found')
    }
})
app.get('/Frontend/index.html',async(req,res)=>{
        res.sendFile(__dirname + '/FrontEnd/index.html')
})
app.get('/Frontend/aboutus.html',async(req,res)=>{
    res.sendFile(__dirname + '/FrontEnd/aboutus.html')
})
app.get('/FrontEnd/events.html',async(req,res)=>{
    res.sendFile(__dirname + '/FrontEnd/events.html')
})
app.get('/FrontEnd/NGOlist.html',async(req,res)=>{
    res.sendFile(__dirname + '/FrontEnd/NGOlist.html')
})
app.get('/FrontEnd/Donation.html',async(req,res)=>{
    res.sendFile(__dirname+'/FrontEnd/Donation.html')
})
app.get('/FrontEnd/Yuva.html',async(req,res)=>{
    res.sendFile(__dirname+'/FrontEnd/Yuva.html')
})
app.get('/FrontEnd/Utthan.html',async(req,res)=>{
    res.sendFile(__dirname+'/FrontEnd/Utthan.html')
})
app.get('/FrontEnd/AksharaFoundation.html',async(req,res)=>{
    res.sendFile(__dirname+'/FrontEnd/AksharaFoundation.html')
})
app.get('/FrontEnd/TheruvoramNGO.html',async(req,res)=>{
    res.sendFile(__dirname+'/FrontEnd/TheruvoramNGO.html')
})
app.get('/FrontEnd/BahujanShikshanSangh.html',async(req,res)=>{
    res.sendFile(__dirname+'/FrontEnd/BahujanShikshanSangh.html')
})
app.get('/FrontEnd/AbhiaanFoundation.html',async(req,res)=>{
    res.sendFile(__dirname+'/FrontEnd/AbhiaanFoundation.html')
})
app.get('/FrontEnd/maheshfoundation.html',async(req,res)=>{
    res.sendFile(__dirname+'/FrontEnd/maheshfoundation.html')
})
app.get('/FrontEnd/events-2.html',async(req,res)=>{
    res.sendFile(__dirname+'/FrontEnd/events-2.html')
})
app.get('/FrontEnd/cryngo.html',async(req,res)=>{
    res.sendFile(__dirname+'/FrontEnd/cryngo.html')
})
app.get('/FrontEnd/donationperks.html',async(req,res)=>{
    const data = await PaymentModel.find({})
    
    var sorted_array = data.sort(function(a, b) {
        return b.Amount - a.Amount;
    });
    newdata = sorted_array.slice(0,8)
    newarr = []
    for(let i = 0;i < newdata.length;i++)
    {
        tempjsonobj = {'Name':newdata[i].Name,'Amount':newdata[i].Amount};
        
        newarr.push(tempjsonobj)
        
    }
    console.log(newarr)
    const html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, maximum-scale=1, user-scalable=no" />
    
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    
        <title>Beyond Kind - Donation Perks</title>
        <!-- Favicon-->
        <link rel="icon" type="image" href="https://i.postimg.cc/xCnvrRpg/logo20.jpg" sizes="192x192" />
    
    
        <!-- custom add-ons -->
        <!-- <link rel="stylesheet" type="text/css" href="style.css"> -->
        <script src="owl.carousel/owl.carousel.min.js"></script>
        <link href="boxicons/css/boxicons.min.css" rel="stylesheet">
        <link rel="stylesheet" href="fontawesome/css/all.css">
        <link rel="stylesheet" href="perks.css">
    
        <!--animation (AOS - Animation on scroll) link-->
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    
        <style>
            /*******************PERKS.CSS FILE*************/
            * {
        font-size: 62, 5%;
        box-sizing: border-box;
        margin: 0;
        clear: both;
    }
    
    .table-container {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 400px;
        padding-bottom: 300px;
    }
    
    #leaderboard {
        width: 100%;
        position: relative;
        background-color: #ddf4db;
    }
    
    .table-data {
        width: 400px;
        height: 150px;
        overflow: scroll;
    }
    main {
        width: 40rem;
        height: 43rem;
        -webkit-box-shadow: 0px 5px 15px 8px #e4e7fb;
        box-shadow: 0px 5px 15px 8px #e4e7fb;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 0.5rem;
    }
    
    /* #header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2.5rem 2rem;
    } */
    
    .share {
        width: 4.5rem;
        height: 3rem;
        background-color: #f55e77;
        border: 0;
        border-bottom: 0.2rem solid #c0506a;
        border-radius: 2rem;
        cursor: pointer;
    }
    
    .share:active {
        border-bottom: 0;
    }
    
    .share i {
        color: #fff;
        font-size: 2rem;
    }
    
    h3 {
        /* font-family: "Rubik", sans-serif; */
        font-family: "Fantasy","Segoe Print";
        font-size: 1.7rem;
        color: #12401a;
        text-transform: uppercase;
        cursor: default;
        margin-left: 442px;  
        font-weight: bold;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        color: #141a39;
        cursor: default;
    }
    
    tr {
        transition: all 0.2s ease-in-out;
        border-radius: 0.2rem;
    }
    
    tr:not(:first-child):hover {
        background-color: #a7e5a2;
        transform: scale(1.1);
        -webkit-box-shadow: 0px 5px 15px 8px #e4e7fb;
        box-shadow: 0px 5px 15px 8px #e4e7fb;
    }
    
    /* tr:nth-child(odd) {
        background-color: #f9f9f9;
    }
    
    tr:nth-child(1) {
        color: #fff;
    } */
    
    td {
        height: 5rem;
        font-family: "Rubik", sans-serif;
        font-size: 1.4rem;
        padding: 1rem 2rem;
        position: relative;
    }
    
    .number {
        width: 1rem;
        font-size: 2.2rem;
        font-weight: bold;
        text-align: left;
    }
    
    .firstnum {
        width: 1rem;
        font-size: 2.2rem;
        font-weight: bold;
        text-align: left;
        color: white;
    }
    
    .name {
        text-align: left;
        font-size: 1.2rem;
    }
    
    .firstname {
        text-align: left;
        font-size: 1.2rem;
        color: white;
    }
    
    .points {
        font-weight: bold;
        font-size: 1.3rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    
    .firstpoints {
        font-weight: bold;
        font-size: 1.3rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: white;
    }
    
    .points:first-child {
        width: 10rem;
    }
    
    
    .ribbon {
        width: 42rem;
        height: 5.5rem;
        top: -0.5rem;
        background-color: #20a837;
        position: absolute;
        left: -1rem;
        -webkit-box-shadow: 0px 15px 11px -6px #7a7a7d;
        box-shadow: 0px 15px 11px -6px #7a7a7d;
    }
    
    .ribbon::before {
        content: "";
        height: 1.5rem;
        width: 1.5rem;
        bottom: -0.8rem;
        left: 0.35rem;
        transform: rotate(45deg);
        background-color: #5c5be5;
        position: absolute;
        z-index: -1;
    }
    
    .ribbon::after {
        content: "";
        height: 1.5rem;
        width: 1.5rem;
        bottom: -0.8rem;
        right: 0.35rem;
        transform: rotate(45deg);
        background-color: #5c5be5;
        position: absolute;
        z-index: -1;
    }
    
    .exit {
        width: 11rem;
        height: 3rem;
        font-family: "Rubik", sans-serif;
        font-size: 1.3rem;
        text-transform: uppercase;
        color: #7e7f86;
        border: 0;
        background-color: #fff;
        border-radius: 2rem;
        cursor: pointer;
    }
    
    .exit:hover {
        border: 0.1rem solid #5c5be5;
    }
    
    .continue:active {
        border-bottom: 0;
    }
    
    @media (max-width: 740px) {
        * {
            font-size: 70%;
        }
    }
    
    @media (max-width: 500px) {
        * {
            font-size: 55%;
        }
    }
    
    @media (max-width: 390px) {
        * {
            font-size: 45%;
        }
    }
    
    .just-space {
        margin-top: 50px;
        margin-right: 400px;
        margin-left: 50px;
    }
    
    * {
        box-sizing: border-box;
    }
    /* ==================================\/image css\/================================ */
    
    .rowim {
        margin-top: 30px;
        /* float: left; */
            /* width: 33.33%; */
            /* padding: 5px; */
    }
    
    .theline {
        margin-top: 80px;
    }
    
    /********************STYLE.CSS **************/
    
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
        
            @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
                body {
                    width: 100%;
                }
            }
        
            html,
            body {
                height: 100%;
                width: 100%;
                color: #222;
                /* background-color: #90d19c; */
            }
        
            /* utility class*/
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                font-family: 'Raleway', sans-serif;
            }
        
            body {
                font-family: 'Open Sans', sans-serif;
                color: #444444;
            }
        
            a {
                color: #009970;
            }
        
            a:hover {
                color: #009970;
                text-decoration: none;
            }
        
            /*------------------top button css---------------------------*/
            #topbtn {
                display: none;
                position: fixed;
                bottom: 20px;
                right: 30px;
                z-index: 99;
                border: 1px solid #009970;
                outline: none;
                background-color: white;
                color: #009970;
                cursor: pointer;
                border-radius: 50%;
                font-size: 18px;
            }
        
            #topbtn:hover {
                background-color: #009970;
                color: #fff;
            }
        
            /*------------- ABout us page css ---------------------*/
            /*header image*/
        
            #header {
                height: 100vh;
                background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                    url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
                background-position: center;
                background-size: cover;
            }
        
            .header-box {
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                position: absolute;
            }
        
            .header-box h1 {
                font-size: 40px;
                color: white;
                font-weight: bold;
                margin: 10px;
            }
        
            /*smoothing scroll */
            * {
                scroll-behavior: smooth;
            }
        
            /*scroll bar effect*/
            ::-webkit-scrollbar {
                width: 12px;
                background: #f6f6f7;
                border-radius: 10px;
                border: 1px solid white;
            }
        
            ::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background-color: #009970;
            }
        
            /*about us cover */
            .about-cover-img {
                height: 750px;
                background-image: url("https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
                background-attachment: fixed;
                background-size: cover;
            }
        
            /*about us heading text*/
            .about h2 {
                font-size: 40px;
                font-weight: bold;
                text-transform: uppercase;
                position: relative;
            }
        
            .green-hr {
                width: 50px;
                display: block;
                height: 2px;
                background: #009970;
            }
        
            /*green cards  */
            .about .icon-box {
                text-align: center;
                padding: 40px 20px;
                transition: all ease-in-out 0.3s;
                background: #009970;
            }
        
            .about .icon-box h4 {
                font-weight: 700;
                margin-bottom: 15px;
                font-size: 24px;
            }
        
            .about .icon-box h4 a {
                color: #fff;
                transition: ease-in-out 0.3s;
            }
        
            .white-hr {
                width: 50px;
                display: block;
                height: 2px;
                background: #fff;
            }
        
            .about .icon-box p {
                font-size: 14px;
                color: #fff;
            }
        
            .about .icon-box:hover {
                border-color: #009970;
                box-shadow: 0px 0 25px 0 black;
            }
        
            .about .icon-box:hover h4 a {
                color: #fff;
            }
        
            .carousel-cell {
                width: 100%;
                /* full width */
                height: 450px;
            }
        
            @media screen and (min-width: 768px) {
        
                /* half-width cells for larger devices */
                .carousel-cell {
                    width: 33%;
                }
            }
        
            .about-name {
                padding-top: 10px;
            }
        
            /*flip card part*/
        
            .about-flip-card {
                perspective: 1000px;
                border-radius: 10px;
                display: flex;
            }
        
            .about-flip-card-inner {
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
                transition: transform 0.6s;
                transform-style: preserve-3d;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                border: 1px solid #009970;
                background-color: #009970;
            }
        
            .about-flip-card:hover .about-flip-card-inner {
                cursor: pointer;
                transform: rotateY(180deg);
            }
        
            .about-flip-card-front,
            .about-flip-card-back {
                position: absolute;
                width: 100%;
                height: 100%;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }
        
            .about-flip-card-front {
                font-variant: small-caps;
                color: black;
            }
        
            .about-flip-card-back {
                color: black;
                transform: rotateY(180deg);
                padding: 10px;
                text-align: justify;
                font-variant: small-caps;
            }
        
            [class*='col-'] {
                padding: 1rem;
            }
        
            /*------------- ABout us page css end---------------------*/
            /* ----------------------------------------------------------------------------------------------------------------- */
            /*--------------------------Donation page css-----------*/
        
            /*Donation cover */
            .donation-head {
                background-color: beige;
            }
        
            .donation h2 {
                font-size: 35px;
                font-weight: bold;
                text-transform: uppercase;
                position: relative;
                text-align: center;
            }
        
            .donation {
                width: 60px;
                display: block;
                height: 2px;
                background: #009970;
            }
        
            /*form part*/
            #internshipform {
                width: 350px;
            }
        
        
            .donation label {
                font-size: 20px;
                font-weight: bold;
            }
        
            .donation input,
            #donation-option,
            .donation textarea {
                border: 1px solid #000;
                background-color: gainsboro;
            }
        
            /*resume upload button style*/
            .donation input[type='file']::-webkit-file-upload-button {
                font-size: small;
                color: #009970;
                font-weight: bold;
                background-color: white;
                border: 1px solid #009970;
                border-radius: 5px;
            }
        
            .donation input[type='file']::-ms-browse {
                font-size: small;
                color: #009970;
                font-weight: bold;
                background-color: white;
                border: 1px solid #009970;
                border-radius: 5px;
            }
        
            .donation input[type='file']::-webkit-file-upload-button:hover {
                color: white;
                background-color: #009970;
            }
        
            .donation input:focus,
            #donation-option:focus,
            .donation textarea:focus {
                box-shadow: 2px 2px 2px 2px #009970 !important;
            }
        
            .donation button {
                border-color: #009970 !important;
                color: #009970 !important;
                font-weight: bold;
            }
        
            .donation button:hover {
                background-color: #009970 !important;
                color: #fff !important;
            }
        
            /*--------------------------Donation page css end-----------*/
        
            /* Donation Perks css start*/
            .cover-img {
                height: 750px;
                background-image: url(images/main.jpeg);
                background-attachment: fixed;
                background-size: cover;
            }
        
            .img {
                width: 100%;
                height: 50%;
            }
        
            .carousel-caption {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }
        
            .carousel-caption h1 {
                font-size: 250%;
                text-transform: uppercase;
                text-shadow: 1px 1px 15px #000;
            }
        
            .carousel-caption h3 {
                font-size: 200%;
                font-weight: 100;
                text-shadow: 1px 1px 10px #000;
                padding-bottom: 1rem;
            }
        
            .btn {
                font-size: 90%;
            }
        
            .btn-primary {
                background-color: #009970;
                border: 1px solid #009970;
            }
        
            .btn-primary:hover {
                background-color: #ffff;
                border: 1px solid #009970;
                color: #009970;
            }
        
            .jumbotron {
                padding: 1rem;
                border-radius: 0;
            }
        
            .welcome {
                width: 75%;
                margin: 0 auto;
                padding-top: 2rem;
            }
        
            .welcome hr {
                border-top: 2px solid #b4b4b4;
                width: 95%;
                margin-top: 0.3rem;
                margin-bottom: 1rem;
            }
        
            .fa-money {
                color: red;
            }
        
            .fa-university {
                color: #562d7c;
            }
        
            .fa-times {
                color: #2163af;
            }
        
            .fa-money,
            .fa-university,
            .fa-times {
                font-size: 4em;
                margin: 1rem;
            }
        
            .fun {
                width: 100%;
                margin-bottom: 2rem;
            }
        
            .gif {
                max-width: 100%;
            }
        
            .img1 {
                width: 330px;
                padding: 10px;
                filter: grayscale(0);
                transition: 1s;
                display: inline-block;
            }
        
            .img1:hover {
                opacity: 0.5;
            }
        
            .content {
                position: absolute;
                font-size: 0px;
                top: 45%;
                left: 50%;
            }
        
            .content btn2 {
                position: absolute;
                padding: 10px 10px;
                display: block;
            }
        
            .content span:nth-child(4) {
                top: 0;
                left: -50%;
                width: 50%;
                height: 1pxl;
                background: linear-gradient(90deg, trasparent, black);
            }
        
            .content:hover span:nth-child(4) {
                left: 50%;
                transition: 1s;
            }
        
            .anim:hover>.content {
                font-size: 30px;
                font-family: unset;
                text-align: center;
                padding: 10px 10px;
                top: 35%;
                left: 34%;
                display: block;
                position: absolute;
                color: white;
                background: black;
                box-shadow: 0 0 10px black, 0 0 40px black, 0 0 80px black;
                transition: 1s;
            }
        
            .anim:hover>.content btn2 {
                font-size: 10px;
                display: block;
                cursor: pointer;
            }
        
            .card-img-top1 {
                height: 165px;
            }
        
            section {
                padding: 60px 0;
                overflow: hidden;
            }
        
            .section-bg {
                background-color: #f6f6f7;
            }
        
            .section-title {
                padding-bottom: 30px;
        
            }
        
            .section-title h2 {
                font-size: 32px;
                font-weight: bold;
                text-transform: uppercase;
                margin-bottom: 20px;
                padding-bottom: 20px;
                position: relative;
            }
        
            .section-title h2::after {
                content: '';
                position: absolute;
                display: block;
                width: 50px;
                height: 3px;
                background: #009970;
                bottom: 0;
                left: 0;
            }
        
            .section-title-new h2::after {
                content: '';
                position: absolute;
                display: block;
                width: 50px;
                height: 3px;
                background: #009970;
                bottom: 0;
                left: 511px;
            }
        
        
            .section-title p {
                margin-bottom: 0;
            }
        
            .services .icon-box {
                text-align: center;
                padding: 40px 20px;
                transition: all ease-in-out 0.3s;
                background: #fff;
            }
        
            .services .icon-box .icon {
                margin: 0 auto;
                width: 64px;
                height: 64px;
                border-radius: 50px;
                border: 1px solid #009970;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                transition: ease-in-out 0.3s;
                color: #009970;
            }
        
            .services .icon-box .icon i {
                font-size: 28px;
            }
        
            .services .icon-box h4 {
                font-weight: 700;
                margin-bottom: 15px;
                font-size: 24px;
            }
        
            .services .icon-box h4 a {
                color: #36343a;
                transition: ease-in-out 0.3s;
            }
        
            .services .icon-box p {
                line-height: 24px;
                font-size: 14px;
                margin-bottom: 0;
            }
        
            .services .icon-box:hover {
                border-color: #fff;
                box-shadow: 0px 0 20px 0 rgba(0, 0, 0, 0.9);
            }
        
            .services .icon-box:hover h4 a {
                color: #009970;
            }
        
            .services .icon-box:hover .icon {
                color: #fff;
                background: #009970;
            }
        
            hr.light {
                border-top: 1px solid white;
                width: 75%;
                margin-top: 0.8rem;
                margin-bottom: 1rem;
            }
        
            /* donation css ends */
            hr.light-100 {
                border-top: 1px solid white;
                width: 100%;
                margin-top: 0.8rem;
                margin-bottom: 1rem;
            }
        
            .carousel-item {
                transition: -webkit-transform 0.5s ease;
                transition: transform 0.5s ease;
                transition: transform 0.4s ease, -webkit-transform 0.5s ease;
                -webkit-backface-visibility: visible;
                backface-visibility: visible;
            }
        
            figure {
                position: relative;
                width: 100%;
                height: 60%;
                margin: 0 !important;
            }
        
            /* Donation Perks css ends */
            /* ----------------------------------------------------------------------------------------------------------------- */
            /*---------------NGO list css----------------------*/
            .donate-btn {
                border-color: #009970 !important;
                color: white !important;
                font-weight: bold;
                background-color: #009970;
            }
        
            .donate-btn:hover {
                background-color: white !important;
                color: #009970 !important;
            }
        
            /*donation form part*/
            .donation form {
                width: 350px;
            }
        
            .donation .container {
                box-shadow: 10px 20px 20px #777777;
            }
        
            .donation h4 {
                font-size: 25px;
                font-weight: bold;
                text-transform: uppercase;
                position: relative;
            }
        
            .donation-green-hr {
                width: 20%;
                display: block;
                height: 2px;
                background: #009970;
            }
        
            .donation label {
                font-size: 20px;
                font-weight: bold;
            }
        
            .donation input,
            #donation-option {
                border: 1px solid #000;
                background-color: gainsboro;
            }
        
            .donation input:focus,
            #donation-option:focus {
                box-shadow: 2px 2px 2px 2px #009970 !important;
            }
        
            .donation button {
                border-color: #009970 !important;
                color: #009970 !important;
                font-weight: bold;
            }
        
            .donation button:hover {
                background-color: #009970 !important;
                color: #fff !important;
            }
        
            /*---------------ngo list css end---------*/
        
            /*Profile page css*/
            /*details part*/
            .contact h2 {
                font-size: 35px;
                font-weight: bold;
                text-transform: uppercase;
                position: relative;
                text-align: center;
            }
        
            .contact-green-hr {
                width: 60px;
                display: block;
                height: 2px;
                background: #009970;
            }
        
            .contact a {
                color: #009970;
                font-weight: bold;
            }
        
            .contact-h4 {
                font-size: 25px;
                font-weight: bold;
                text-transform: uppercase;
                position: relative;
            }
        
            .line {
                border: 1.2px solid #000;
            }
        
            /*form part*/
            .contact label {
                font-size: 20px;
                font-weight: bold;
            }
        
            .contact input,
            .contact textarea {
                border: 1px solid #000;
                background-color: gainsboro;
            }
        
            .contact input:focus,
            .contact textarea:focus {
                box-shadow: 2px 2px 2px 2px #009970 !important;
            }
        
            .contact button {
                border-color: #009970 !important;
                color: #009970 !important;
                font-weight: bold;
            }
        
            .contact button:hover {
                background-color: #009970 !important;
                color: #fff !important;
            }
        
            /*social media part*/
            .social-icon {
                font-size: 3.2em;
                text-align: center;
            }
        
            .sm-bttn {
                display: block;
                width: 80px;
                height: 80px;
                background: #f1f1f1;
                margin: 10px;
                border-radius: 30%;
                box-shadow: 0 5px 15px -5px #00000070;
                overflow: hidden;
                position: relative;
            }
        
            .sm-bttn i {
                line-height: 90px;
                font-size: 24px;
                transition: 0.2s linear;
            }
        
            .sm-bttn:hover .fa-facebook-f {
                transform: scale(1.3);
                color: white;
            }
        
            .sm-bttn:hover .fa-linkedin-in {
                transform: scale(1.2);
                color: white;
            }
        
            .sm-bttn:hover .fa-youtube {
                transform: scale(1.3);
                color: white;
            }
        
            .sm-bttn:hover .fa-instagram {
                transform: scale(1.3);
                color: white;
            }
        
            .sm-bttn:hover .fa-twitter {
                transform: scale(1.3);
                color: white;
            }
        
            .sm-bttn::before {
                content: '';
                position: absolute;
                width: 120%;
                height: 120%;
                background-color: #009970;
                transform: rotate(45deg);
                left: -110%;
                top: 90%;
            }
        
            .sm-bttn:hover::before {
                animation: sm-am 0.7s 1;
                top: -10%;
                left: -10%;
            }
        
            @keyframes sm-am {
                0% {
                    top: 90%;
                    left: -110%;
                }
        
                50% {
                    top: -30%;
                    left: 10%;
                }
        
                100% {
                    top: -10%;
                    left: -10%;
                }
            }
        
            /*Profile CSS ends*/
            /* ----------------------------------------------------------------------------------------------------------------- */
            /*navbar code*/
    
            /**********ADD.CSS**********/
            @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&display=swap');
        
            .menu {
                position: relative;
                width: 90%;
                z-index: 9999;
            }
        
            .my-navbar {
                width: 100%;
                padding: 10px 20px;
                background-color: white;
                position: absolute;
                top: 20px;
                left: 0;
                z-index: 999;
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
            }
        
            .nav-item .nav-link {
                font-family: 'Oswald', sans-serif;
                font-size: 15px;
                font-weight: 300;
                text-transform: uppercase;
                margin: 0px 10px;
                position: relative;
                color: black;
            }
        
            .nav-item .nav-link:before {
                position: absolute;
                left: 0;
                content: '';
                bottom: 0;
                width: 100%;
                height: 2px;
                transform: scaleX(0);
                transform-origin: left;
                background-color: #009970;
                transition: 0.5s;
            }
        
            .nav-item .nav-link:hover:before {
                transform: scaleX(1);
                transform-origin: right;
            }
        
            .navbar-brand {
                text-transform: capitalize;
                font-size: 35px;
                color: #2f3542;
                font-style: italic;
                font-family: 'Oswald', sans-serif;
                font-weight: bold;
            }
        
            .navbar-scroll {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background-color: rgba(255, 255, 255, 0.7);
                padding: 5px 20px;
                transition: 0.5s;
                animation: scroll 0.6s 1;
            }
        
            @keyframes scroll {
                0% {
                    transform: translateY(-100%);
                }
        
                100% {
                    transform: translateY(0%);
                }
            }
        
            .nav-item .active {
                color: #009970;
            }
        
            .custom-toggler.navbar-toggler {
                border-color: #009970;
            }
        
            .custom-toggler .navbar-toggler-icon {
                background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 128, 0, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
            }
        
            .navbar {
                padding: 0.8ren;
                position: relative;
                width: 100%;
                z-index: 9999;
            }
        
            .navbar-nav li {
                padding: 3px;
            }
        
            .nav-link {
                font-size: 1.2em !important;
            }
        
            .nav-link li:hover {
                background-color: black;
            }
        
            .nav-item .nav-link:after {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 100%;
                height: 1px;
                transform: scaleX(0);
                transition: 0.5s;
                content: '';
                transform-origin: left;
                background-color: white;
            }
        
            .nav-item .nav-link:hover after {
                transform-origin: right;
                transform: scaleX(1);
            }
        
            .navbar-scroll {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background-color: rgba(255, 255, 255, 0.7);
                padding: 0px 20px;
                transition: 0.5s;
                animation: scroll 0.6s 1;
            }
        
            @keyframes scroll {
                0% {
                    transform: translateY(-100%);
                }
        
                100% {
                    transform: translateY(0%);
                }
            }
        
            .navbar-brand {
                text-transform: capitalize;
                font-size: 35px;
                color: black;
            }
        
            /*navbar code*/
        </style>
    </head>
    
    <body>
    
        <!------navigation------->
        <div class="container-fluid menu">
            <nav class="navbar navbar-expand-lg my-navbar">
                <a class="navbar-brand " href="#"><img src="https://i.postimg.cc/tRBkXd4P/Whats-App-Image-2023-04-25-at-17-12-59.jpg" height="50" width='250' alt=""
                        loading="lazy"></a>
                <button class="navbar-toggler custom-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
    
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/FrontEnd/index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/Frontend/aboutus.html">About us</a>
                        </li>
                        <li class="nav-item">
                            <a href="/Frontend/events.html" class="nav-link">Events</a>
                        </li>
                        <li class="nav-item">
                            <a href="/FrontEnd/Donation.html" class="nav-link">Donation</a>
                        </li>
                        <li class="nav-item">
                            <a href="/FrontEnd/donationperks.html" class="nav-link active">Donation Perks</a>
                        </li>
                        <li class="nav-item">
                            <a href="/FrontEnd/NGOlist.html" class="nav-link">NGO list</a>
                        </li>
                        <li class="nav-item">
                            <a href="/login" class="nav-link">Log Out</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    
        <div class="just-space">
            <h3 style='margin-left: 590px; margin-top: 100px; font-size:3em;'>⚜  Top Donors  ⚜
            </h3>
        </div>
    
        <div class="table-container">
            <main>
                <!-- <div><h1>DONATION</h1></div> -->
                <div id="leaderboard">
                    <div class="ribbon"></div>
                    <table>
                        <tr>
                            <td class="firstnum">1</td>
                            <td class="firstname">${newarr[0].Name}</td>
                            <td class="firstpoints">${newarr[0].Amount}</td>
                        </tr>
                        <tr>
                            <td class="number">2</td>
                            <td class="name">${newarr[1].Name}</td>
                            <td class="points">${newarr[1].Amount}</td>
                        </tr>
                        <tr>
                            <td class="number">3</td>
                            <td class="name">${newarr[2].Name}</td>
                            <td class="points">${newarr[2].Amount}</td>
                        </tr>
                        <tr>
                            <td class="number">4</td>
                            <td class="name">${newarr[3].Name}</td>
                            <td class="points">${newarr[3].Amount}</td>
                        </tr>
                        <tr>
                            <td class="number">5</td>
                            <td class="name">${newarr[4].Name}</td>
                            <td class="points">${newarr[4].Amount}</td>
                        </tr>
                        <tr>
                            <td class="number">6</td>
                            <td class="name">${newarr[5].Name}</td>
                            <td class="points">${newarr[5].Amount}</td>
                        </tr>
                        <tr>
                            <td class="number">7</td>
                            <td class="name">${newarr[6].Name}</td>
                            <td class="points">${newarr[6].Amount}</td>
                        </tr>
                        <tr>
                            <td class="number">8</td>
                            <td class="name">${newarr[7].Name}</td>
                            <td class="points">${newarr[7].Amount}</td>
                        </tr>
                        
                    </table>
                </div>
            </main>
        </div>
        <hr class="theline" size="10px" color="#20a837">
        <div class="rowim">
            <table>
                <tr>
                    <td><img src="https://i.postimg.cc/MG6QL8qx/1pic.jpg" width="100%;"></td>
                    <td><img src="https://i.postimg.cc/qq2Nn3NL/pratik-3.jpg" width="100%;"></td>
                    <td><img src="https://i.postimg.cc/J4XdQS1P/3pic.jpg" width="100%;"></td>
                </tr>
            </table>
    
    
        <!---------footer---------->
        <button onclick="topFunction()" id="topbtn"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
            crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
            integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
            crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
            integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
            crossorigin="anonymous"></script>
        <!-- navbar animation -->
        <script>
            $(document).ready(function () {
                $(window).scroll(function () {
                    if ($(window).scrollTop() > 60) {
                        $('.my-navbar').addClass('navbar-scroll');
                    }
                    else {
                        $('.my-navbar').removeClass('navbar-scroll');
                    }
                });
            });
    
        </script>
        <!--back to top btn-->
        <script type="text/javascript">
            myButton = document.getElementById("topbtn");
            window.onscroll = function () { scrollfunction() };
            function scrollfunction() {
                if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
                    myButton.style.display = "Block";
                } else {
                    myButton.style.display = "none";
                }
            }
            function topFunction() {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        </script>
        <script src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
    
        <!--Animation on scroll (Aos) link and script-->
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <script>AOS.init();</script>
    
    </body>
    
    </html>`
    res.send(html)
    
})
app.post('/paymentAuth',(req,res)=>{
    const {name,email,phone,message,Amount,ngo} = req.body;
    console.log(name,email,phone,message,Amount,ngo);
    var options = {
        amount: Amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      razorpayInstance.orders.create(options, async function(err, order) {
        if(order == null)
        {
            res.sendFile('C:/Users/Atharva Suryavanshi/Desktop/final Mini proj sem6/FinalProj/FrontEnd/fail.html')
        }
        if(order)
        {
            const TempPaymentModel = new PaymentModel({Name : name,Email : email,Phone : phone,Message : message, Amount : Amount, ngo: ngo})
            try {
                tp = await TempPaymentModel.save()
                console.log(tp)
            } catch (error) {
                console.log(err)
            }
            
            res.sendFile('C:/Users/Atharva Suryavanshi/OneDrive/Desktop/SEM - 5/CS TE mini project/Beyond Kind/success.html')
        }
      });
})

app.listen(3000,async(req,res)=>{
    console.log('Listening on 3000')
})