import VoucherSettingsService from '../../services/VoucherSettings.service';


export default async (req, res) => {
    try {

        const voucherSettingsService = new VoucherSettingsService(req);
        const vouchers = await voucherSettingsService.generateFreeVouchers(req.params._id);

        return res.api.send(vouchers, res.api.codes.OK);

    } catch (err) {
        console.error(err);

        return res.api.send(err.stack, res.api.codes.NO_CONTENT);
    }
};
