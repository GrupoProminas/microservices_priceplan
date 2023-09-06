import * as PromotionCourses from '../../../../piaget_models/models/priceplan/priceplan.PromotionCourses';

PromotionCourses.database.post = {
    findOneAndUpdate: PromotionCourses.functions.sortPaymentPlans,
};

export default PromotionCourses.database;
