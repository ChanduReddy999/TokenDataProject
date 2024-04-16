var mysql=require("mysql2");

const addUserModel = (name, email, password, otp) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1234",
        database: "anil"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        
        var sql = "INSERT INTO register (name, email, password, otp) VALUES (?, ?, ?, ?)";
        con.query(sql, [name, email, password, otp], function(err, result) {
            if (err) throw err;
            console.log("Record inserted:", result);
            var sql1 = "INSERT INTO login (email, password) VALUES (?, ?)";
            con.query(sql1, [email, password], function(err, result1) {
                if (err) throw err;
                console.log("Record inserted:", result1);
                callback(result, result1);
            con.end(); // Close the connection
        });
    });
});
};


const loginModel = (email, password) => {
    return new Promise((resolve, reject) => {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "1234",
            database: "anil"
        });

        con.connect(function (err) {
            if (err) {
                console.error("Error connecting to database:", err);
                reject({ status: 500, message: "Internal server error", data: [] });
                return;
            }
            console.log("Connected!");

            var sql = "SELECT * FROM login WHERE email=? AND password=? AND isVerified='True'";
            console.log("SQL:", sql);
            con.query(sql, [email, password], (err, results) => {
                con.end(); // Close the connection

                if (err) {
                    console.error("Error executing query:", err);
                    reject({ status: 500, message: "Internal server error", data: [] });
                    return;
                }
                if (results.length === 0) {
                    reject({ status: 401, message: "Invalid email or password", data: [] });
                    return;
                }
                resolve({ status: 200, message: "Login successful", data: results });
            });
        });
    });
};

const otpVerificationModel=(email, password, otp)=>{
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1234",
        database: "anil"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        
        var sql = "select * from login inner join register on login.email = register.email where register.email=? and register.password = ? and register.otp =?";
        con.query(sql, [email, password, otp], function(err, result) {
            if (err) throw err;
            console.log("result is", result);
            var sql1 = "update login set isVerified = 'True' where email=?";
            con.query(sql1, [email], function(err, result1) {
                if (err) throw err;
                console.log("Record updated:", result1);
                callback(result, result1);
            con.end(); 
        });
    });
});
}

module.exports = {
    addUserModel,loginModel,otpVerificationModel
}