import ApiRequestService from '../ApiRequest.service';

class VoucherUserService {

    constructor(req) {
        this._userId = '5c62ac258036571ae6646d90';
        this._userType = 'employee';

        if ('_userid' in req.headers) {
            this._userId = req.headers._userid;
        }

        if ('_usertype' in req.headers) {
            this._userType = req.headers._usertype;
        }
    }

    verifyUser() {
        return ApiRequestService
            .get('students', 'students', {
                aggregate: [
                    {
                        $match: {
                            _userId: {$oid: this._userId}
                        }
                    }
                ]
            })
            .then(result => {
                if (result) {
                    return {
                        _userType: this._userType,
                        cpf: result.data[0].cpf
                    }
                }

                return false;
            })
            .catch(() => {
                return {
                    _userType: this._userType,
                    cpf: '00000000000'
                };
            })
    }
}

export default VoucherUserService;