import * as Charges from '../../../../piaget_models/models/finances/Charges';
Charges.database.pre = {
    save: [Charges.functions.parseEnrolmentId]
}
export default Charges.database;
