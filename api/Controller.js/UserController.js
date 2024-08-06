//login TEXT NOT NULL,
//password TEXT NOT NULL,
//first_name TEXT NOT NULL,
//last_name TEXT NOT NULL,
//email TEXT NOT NULL,
//phone_number TEXT NOT NULL
class UserController {
    constructor(db) {
        this.db = db;
    }
    createUser(req, res) {
        const { first_name, last_name, login, password, email, phone_number } = req.body;
        const checkQuery = `SELECT * FROM users WHERE email = ? OR login = ?`
        this.db.get(checkQuery, [email,login], (err, row) => {
            if (err) {
                res.status(500).json({ message: "error cheking users  " });
                return
            }
            if (row) {
                res.status(400).json({ message: "user with  already exists" });
                return;
            }
            const query = `
            INSERT INTO users
            (login,password,first_name,last_name,email,phone_number)
            VALUES (?, ?, ?, ?, ?, ?)
            `
            this.db.run(query, [login, password, first_name, last_name, email, phone_number], function (err) {
                if (err) {
                    res.status(404).json({ message: "incorect data" });
                    return;
                }
                res.status(201).json({ message: "Create users", userId: this.lastID });
            })
        })
    }
    getAll(req, res) {
        const query = `SELECT * FROM users`;
        this.db.all(query, [], (err, row) => {
            if (err) {
                res.status(404).json({ message: "reloading the server" })
            }
            res.status(200).json({ users: row })
        })

    }
    getOne(req, res) {
        const { id } = req.params;
        const query = `SELECT * FROM users WHERE id = ?`;
        this.db.get(query, [id], (err, row) => {
            if (err) {
                res.status(500).json({ message: "reloading the server" })
            }
            res.status(200).json({ message: "user reseived", user: row })
        })
    }
    deleteUser(req, res) {
        const { id } = req.params;
        const query = `DELETE FROM users WHERE id = ?`;
        this.db.get(query, [id], function (err, row) {
            if (err) {
                res.status(500).json({ message: "error corectly data" })
            }
            //* Не працює
            if (this.changes === 0) {
                res.status(404).json({ message: "user not found" });;
            }
            res.status(203).json({ message: "users delete", idUser: id })
        })
    }
    updateUser(req, res) {
        const { id } = req.params;
        const { first_name, last_name, login, password, email, phone_number } = req.body;
        const query = `
        UPDATE users SET 
            first_name = ?, 
            last_name = ?, 
            login = ?, 
            password = ?, 
            email = ?, 
            phone_number = ? 
        WHERE id = ?`;
        this.db.run(query, [first_name, last_name, login, password, email, phone_number, id], function (err) {
            if (err) {
                res.status(404).json({ message: "the data is not corectly transferred" })
            }
            if (this.changes === 0) {
                res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "users uppdate", idUsers: id })
        })
    }

}

export { UserController }