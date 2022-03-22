import { Types } from 'mongoose';
import CodeVoucherService from './CodeVoucher.service';

export default class ApiRequestService {

  constructor(models) {
    this.models = models;
  }

  async generateFreeVouchers(_enrolmentId) {
    const enrolment = await this._getEnrolment(_enrolmentId);
    const vouchersConfigs = await this._getVoucherConfig();

    return this._generate(enrolment, vouchersConfigs);
  }

  async _generate(enrolment, vouchersConfigs) {
    const vouchersCreated = [];
    const enrolmentIds = this._isCombo(enrolment) ? enrolment.metadata.combo : [enrolment._id];

    for (const _enrolmentId of enrolmentIds) {
      try {
        const enrolment = await this._getEnrolment(_enrolmentId);

        await this._validate(enrolment, vouchersConfigs);

        const voucherData = {
          code        : await this._generateVoucherCode(),
          userType    : 'student',
          cpf         : enrolment.cpf,
          isActive    : true,
          tags        : vouchersConfigs.tags,
          validateType: vouchersConfigs.validateType,
          usage       : vouchersConfigs.maximunQuantity,
          enrolment   : vouchersConfigs.enrolment,
          course      : vouchersConfigs.course,
          metadata: {
              isFree        : vouchersConfigs.isFree,
              _enrolmentId  : enrolment._id,
              description   : this._getMessage(vouchersConfigs, enrolment.registryCourse.course._certifierName),
          }
        };

        if (voucherData.validateType === 'period') {
          voucherData.dateEnd = vouchersConfigs.dateEnd;
        }

        const voucher = await this.models.Vouchers.create(voucherData);
        vouchersCreated.push(voucher);

      } catch (err) {
        console.error(err);
      }
    }

    return vouchersCreated;
  }

  _getMessage(vouchersConfigs, certifierName) {
    const { description } = this._getVoucherConfigsByCertifier(vouchersConfigs, certifierName);

    if (!description) throw new Error(`no description found for certifier ${certifierName}`);

    return description;
  }

  _generateVoucherCode() {
    return CodeVoucherService.generateVoucher(6, null, null, this.models);
  }

  _isCombo(enrolment) {
    return !!enrolment.metadata.combo;
  }

  async _validate(enrolment, vouchersConfigs) {
    await this._validateVoucherIsAlreadyCreated(enrolment._id);
    await this._validateEnrolmentCourseType(enrolment, vouchersConfigs);
  }

  async _validateEnrolmentCourseType(enrolment, vouchersConfigs) {
    const { courseType: availableCourseTypes } = this._getVoucherConfigsByCertifier(vouchersConfigs, enrolment.registryCourse.course._certifierName);
    const isValidCourseType = availableCourseTypes.includes(enrolment.registryCourse.course._typeName);

    if (!isValidCourseType) throw new Error('invalid course type');

    return true;
  }

  async _validateVoucherIsAlreadyCreated(_enrolmentId) {
    const query = {
      'userType': 'student',
      'metadata._enrolmentId': Types.ObjectId(_enrolmentId),
    };

    const voucher = await this.models.Vouchers.findOne(query);

    if (voucher) throw new Error('voucher already exists');

    return true;
  }

  _getVoucherConfigsByCertifier(vouchersConfigs, certifierName) {
    const certifierVoucherConfigs = vouchersConfigs.certifier.find(_c => _c.name === certifierName);

    if (!certifierVoucherConfigs) throw new Error(`no configs found for certifier ${certifierName}`);

    return certifierVoucherConfigs;
  }

  async _getEnrolment(_enrolmentId) {
    const enrolment = await this.models.Enrolments
      .findById(_enrolmentId)
      .lean();

    if (!enrolment) throw new Error('Aluno não está devidamente matriculado');

    return enrolment;
  }

  async _getVoucherConfig() {
    const vouchersConfigs = await this.models.VouchersConfigs
      .findOne({
        isActive: true
      })
      .lean();

    if (!vouchersConfigs) throw new Error('config not found');

    return vouchersConfigs;
  }
}
