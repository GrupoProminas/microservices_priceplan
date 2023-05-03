/* eslint-disable quotes,no-undefined,max-statements */

class UserValidator {

    userValidate(req = {headers: {}}) {

        let _userId = '5cf2ef9f4bf9fd51daad5a8c';
        let _userType = 'employer';
        let _userName = 'Computer';

        if ('_userid' in req.headers) {
            _userId = req.headers._userid;
        }

        if ('_usertype' in req.headers) {
            _userType = req.headers._usertype;
        }

        if ('_username' in req.headers) {
            _userName = req.headers._username;
        }

        return {
            _userId: _userId,
            _userType: _userType,
            _userName: _userName
        };
    }
}

export default UserValidator;
