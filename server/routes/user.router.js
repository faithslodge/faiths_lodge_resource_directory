const express = require("express");
const {
    rejectUnauthenticated,
    rejectUnauthorized,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, async (req, res) => {
    // Send back user object from the session (previously queried from the database)
    res.send(req.user);
});

// Handles Ajax request for user information if user is authenticated
router.get(
    "/getUsers",
    rejectUnauthenticated,
    rejectUnauthorized,
    async (req, res) => {
        // Send back user object from the session (previously queried from the database)
        try {
            const queryText = `SELECT * FROM users;`;

            const dbRes = await pool.query(queryText);
            res.status(200).send(dbRes.rows);
        } catch (err) {
            console.err("Error with accessing all user information:", err);
            res.sendStatus(500);
        }
    }
);

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);

    const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id;`;
    pool.query(queryText, [username, password])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log("User registration failed: ", err);
            res.sendStatus(500);
        });
});

// Handles POST request with new user data
// <------------------------ POST WILL REPLACE REGISTRATION ABOVE ---------------------------->
router.post(
    "/newUser",
    rejectUnauthenticated,
    rejectUnauthorized,
    async (req, res) => {
        const { username, isAdmin } = req.body;
        const password = encryptLib.encryptPassword(
            `${username}${process.env.PASSWORD_POSTFIX}`
        );
        try {
            const queryText = `INSERT INTO "user" (username, password, is_admin)
    VALUES ($1, $2, $3)`;
            await pool.query(queryText, [username, password, isAdmin]);
            res.sendStatus(201);
        } catch (err) {
            console.error(
                "[inside user.router POST admin register new user] Error in this route",
                err
            );
            res.sendStatus(500);
        }
    }
);

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
    res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
    // Use passport's built-in method to log out the user
    req.logout();
    res.sendStatus(200);
});

router.put(
    "/editAdmin/:id",
    rejectUnauthenticated,
    rejectUnauthorized,
    async (req, res) => {
        const id = req.params.id;
        const { isAdmin } = req.body;

        try {
            if (req.user.id == id) {
                // cannot edit the admin property for yourself
                res.sendStatus(403);
            } else {
                const queryText = `UPDATE "user" SET "is_admin" = $1
                            WHERE "user".id = $2;`;

                await pool.query(queryText, [isAdmin, id]);
                res.sendStatus(204);
            }
        } catch (err) {
            console.error(
                "[inside user.router PUT admin edit selected user] Error in this route",
                err
            );
            res.sendStatus(500);
        }
    }
);

router.delete(
    "/:id",
    rejectUnauthenticated,
    rejectUnauthorized,
    async (req, res) => {
        const loggedInUserId = req.user.id;
        const userToDeleteId = req.params.id;

        try {
            if (loggedInUserId == userToDeleteId) {
                // cannot delete yourself
                res.sendStatus(403);
            } else {
                const queryText = `DELETE FROM "user" WHERE id = $1;`;

                await pool.query(queryText, [userToDeleteId]);
                res.sendStatus(204);
            }
        } catch (err) {
            console.error(
                "[inside user.router DELETE admin delete selected user] Error in this route",
                err
            );
            res.sendStatus(500);
        }
    }
);

module.exports = router;
