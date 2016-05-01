module.exports = [
    {
        model: "User",
        data: {
            email: 'alice@smith.com',
            first_name: 'Alice',
            last_name: 'Smith',
            age: 31
        },
    }, {
        model: "User",
        data: {
            email: 'bob@johnson.com',
            first_name: 'Bob',
            last_name: 'Johnson',
            age: 41
        }
    }, {
        model: "Post",
        data: {
            body: "This is an awesome Post",
            user_id: 1
        }
    }
 ];
