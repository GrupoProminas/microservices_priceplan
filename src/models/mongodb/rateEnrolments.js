import * as RateEnrolments from '../../../../piaget_models/models/priceplan/priceplan.RateEnrolments';

RateEnrolments.database.post = {
    findOneAndUpdate: RateEnrolments.functions.sortPaymentPlans,
};

export default RateEnrolments.database;
