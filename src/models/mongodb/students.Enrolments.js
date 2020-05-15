/* eslint-disable array-bracket-newline,no-invalid-this,promise/no-callback-in-promise,id-length,new-cap */
import {SchemaTypes, Types} from 'mongoose';

const checkActivitiesGrade = (enrolment) => {

    const minToApprove = 10 * (enrolment.registryCourse.course.approvalPercentage / 100);

    enrolment.registryCourse.course.disciplines
        .filter(_d => !_d.grade || _d.grade < minToApprove)
        .forEach(_disc => {

            const activities = _disc.isOnRecuperation ? _disc.activities.filter(_a => _a.type === 'recuperation') : _disc.activities.filter(_a => _a.type === 'regular');

            const haveAllGrades = activities.filter(_a => _a.grade !== null).length === activities.length;

            if (haveAllGrades) {
                const avg = activities
                    .map(_a => _a.grade)
                    .reduce((a, b) => a + b, 0) / activities.length;

                let isOnRecuperation = false;

                if (avg < minToApprove) {
                    isOnRecuperation = true;
                }

                if (avg !== _disc.grade) {
                    _disc.grade = avg;
                    _disc.isOnRecuperation = isOnRecuperation;
                    _disc.gradeType = 'standard';

                    _disc.gradeHistory.push({
                        _userName : 'Computer',
                        _userId   : Types.ObjectId('000000000000000000000000'),
                        grade     : avg,
                        gradeType : 'standard',
                        launchedAt: new Date()
                    });
                }
            }
        });

    return enrolment.save();
};

const checkRecuperation = (enrolment) => {

    const minToApprove = 10 * (enrolment.registryCourse.course.approvalPercentage / 100);

    enrolment.registryCourse.course.disciplines
        .filter(_d => _d.grade && _d.grade > -1)
        .forEach(_disc => {
            _disc.isOnRecuperation = _disc.grade < minToApprove;
        });

    return enrolment.save();
};

const checkDisciplineGrade = (enrolment) => {

    const haveAllGrades = enrolment.registryCourse.course.disciplines.filter(_d => !!_d.grade).length === enrolment.registryCourse.course.disciplines.length;

    if (haveAllGrades) {

        const minToApprove = 10 * (enrolment.registryCourse.course.approvalPercentage / 100);

        let approved = true;

        enrolment.registryCourse.course.disciplines.forEach(_d => {
            if (_d.grade < minToApprove) {
                _d.isOnRecuperation = true;
                approved = false;
            }
        });

        if (approved)
            enrolment.pillars = enrolment.pillars.map(_p => {
                return _p.name === 'Avaliação' ? {
                    name       : 'Avaliação',
                    isCompleted: true
                } : _p;
            });

        return enrolment.save();
    }

    return true;
};

export default {
    collection: 'Enrolments',
    fields    : {
        cpf           : {
            type    : String,
            required: true,
            index   : true
        },
        paymentDay    : {
            type    : Number,
            required: true
        },
        paymentMonth  : {
            type    : Number,
            required: true
        },
        expiredAt     : {
            type    : Date,
            required: true
        },
        enrolment     : {
            installment       : {
                type    : Number,
                required: true
            },
            amount            : {
                type    : Number,
                required: true
            },
            dueDate           : {
                type    : Date,
                required: true
            },
            interest          : { // Juros da parcela
                type   : Number,
                default: 0
            },
            scholarshipPercent: { // Bolsista desconto sobre a taxa de inscrição
                type   : Number,
                default: 0
            },
            voucher           : {
                code      : String,
                amountType: {
                    type: String,
                    enum: [
                        'percentage',
                        'value'
                    ]
                },
                amount    : Number
            },
            isPaidToPartner   : {
                type   : Boolean,
                default: false
            }
        },
        indication    : [
            {
                level              : {
                    type: String,
                    index: true,
                    enum: [
                        'master',
                        'level1',
                        'level2'
                    ]
                },
                cpf                : {
                    type: String,
                    index: true
                },
                userType           : {
                    type: String,
                    index: true
                },
                commissionMonthly  : Number,
                commissionEnrolment: Number
            }
        ],
        contract      : {
            type    : String,
            required: true
        },
        geolocation   : {
            ip    : {
                type    : String,
                required: true
            },
            coords: {
                latitude : Number,
                longitude: Number
            }
        },
        metadata      : SchemaTypes.Mixed,
        pillars       : [
            {
                _id        : false,
                name       : {
                    type    : String,
                    required: true
                },
                isCompleted: {
                    type   : Boolean,
                    default: false
                }
            }
        ],
        registryCourse: {
            courseAmount: {
                installment       : {
                    type    : Number,
                    required: true
                },
                amount            : { // Valor em centavos R$
                    type    : Number,
                    required: true
                },
                amountType        : {
                    type   : String,
                    enum   : [
                        'normal',
                        'promotion',
                        'manual'
                    ],
                    default: 'normal'
                },
                _promotionId      : SchemaTypes.ObjectId,
                interest          : { // Juros da parcela
                    type   : Number,
                    default: 0
                },
                scholarshipPercent: { // Bolsista desconto sobre o valor do curso
                    type   : Number,
                    default: 0
                },
                voucher           : {
                    code      : String,
                    amountType: {
                        type: String,
                        enum: [
                            'percentage',
                            'value'
                        ]
                    },
                    amount    : Number
                }
            },
            course      : {
                disciplines         : [
                    {
                        isOnRecuperation: {
                            type   : Boolean,
                            default: false
                        },
                        grade           : {
                            type   : Number,
                            default: null
                        },
                        gradeType       : {
                            type   : String,
                            enum   : [
                                'dispensation',
                                'exploitation',
                                'standard',
                                'manual'
                            ],
                            default: 'standard'
                        },
                        gradeHistory    : [
                            {
                                _userName : {
                                    type    : String,
                                    required: true
                                },
                                _userId   : {
                                    type    : SchemaTypes.ObjectId,
                                    required: true
                                },
                                grade     : {
                                    type    : Number,
                                    required: true
                                },
                                gradeType : {
                                    type   : String,
                                    enum   : [
                                        'dispensation',
                                        'exploitation',
                                        'standard',
                                        'manual'
                                    ],
                                    default: 'standard'
                                },
                                reason    : {
                                    type    : String,
                                    required: false,
                                    default : null
                                },
                                launchedAt: {
                                    type    : Date,
                                    required: true
                                }
                            }
                        ],
                        _name           : {
                            type    : String,
                            required: true
                        },
                        type            : {
                            type: String,
                            enum: [
                                'required',
                                'optional'
                            ]
                        },
                        description     : {
                            type    : String,
                            required: true
                        },
                        workload        : {
                            type    : Number,
                            required: true
                        },
                        activities      : [
                            {
                                type        : {
                                    type    : String,
                                    enum    : [
                                        'regular',
                                        'recuperation'
                                    ],
                                    required: true
                                },
                                modality    : {
                                    type    : String,
                                    enum    : [
                                        'online',
                                        'presential'
                                    ],
                                    required: true
                                },
                                maxDuration : {
                                    type    : Number,
                                    required: true
                                },
                                model       : {
                                    type    : String,
                                    enum    : [
                                        'evaluation',
                                        'upload',
                                        'participation'
                                    ],
                                    required: true
                                },
                                isFinalTest : {
                                    type    : Boolean,
                                    required: true
                                },
                                modelMeta   : {
                                    _id         : false,
                                    numQuestions: {
                                        type    : Number,
                                        required: false
                                    },
                                    enunciation : {
                                        type    : String,
                                        required: false
                                    }
                                },
                                attempts    : {
                                    type    : Number,
                                    required: false,
                                    default : 0
                                },
                                evaluation  : {
                                    _coursewareEvaluationId: {
                                        type    : SchemaTypes.ObjectId,
                                        required: false
                                    },
                                    questions              : [
                                        {
                                            _questionId: {
                                                type    : SchemaTypes.ObjectId,
                                                required: false
                                            },
                                            _response  : {
                                                type    : SchemaTypes.ObjectId,
                                                required: false
                                            },
                                            _correct   : {
                                                type    : SchemaTypes.ObjectId,
                                                required: false
                                            }
                                        }
                                    ]
                                },
                                upload      : {
                                    archive           : {
                                        type    : String,
                                        required: false,
                                        default : null
                                    },
                                    requestNewRevision: {
                                        type    : Boolean,
                                        required: false,
                                        default : true
                                    },
                                    revisions         : [
                                        {
                                            _id      : false,
                                            _userName: String,
                                            _userId  : SchemaTypes.ObjectId,
                                            archive  : {
                                                type    : String,
                                                required: true
                                            },
                                            date     : {
                                                type    : Date,
                                                required: true
                                            }
                                        }
                                    ]
                                },
                                grade       : {
                                    type   : Number,
                                    default: null
                                },
                                gradeType   : {
                                    type    : String,
                                    enum    : [
                                        'standard',
                                        'manual'
                                    ],
                                    required: true,
                                    default : 'standard'
                                },
                                gradeHistory: [
                                    {
                                        _userName : {
                                            type    : String,
                                            required: true
                                        },
                                        _userId   : {
                                            type    : SchemaTypes.ObjectId,
                                            required: true
                                        },
                                        grade     : {
                                            type    : Number,
                                            required: true
                                        },
                                        reason    : {
                                            type    : String,
                                            required: false,
                                            default : null
                                        },
                                        gradeType : {
                                            type   : String,
                                            enum   : [
                                                'standard',
                                                'manual'
                                            ],
                                            default: 'standard'
                                        },
                                        launchedAt: {
                                            type    : Date,
                                            required: true
                                        }
                                    }
                                ]
                            }
                        ],
                        _coursewares    : [SchemaTypes.ObjectId]
                    }
                ],
                _name               : {
                    type    : String,
                    required: true
                },
                _typeName           : {
                    type    : String,
                    required: true
                },
                _certifierName      : {
                    type    : String,
                    required: true
                },
                _knowledgeAreaName  : {
                    type    : String,
                    required: true
                },
                _categoryName       : {
                    type    : String,
                    required: false,
                    default : null
                },
                _areaNames          : {
                    type    : [String],
                    required: true
                },
                acronym             : {
                    type    : String,
                    required: true
                },
                workload            : {
                    type    : Number,
                    required: true
                },
                linkEMec            : {
                    type    : String,
                    required: true
                },
                approvalPercentage  : {
                    type    : Number,
                    required: true
                },
                minimalFrequency    : {
                    type    : Number,
                    required: true
                },
                description         : {
                    type    : String,
                    required: true
                },
                isTccRequired       : {
                    type    : Boolean,
                    required: true
                },
                isInternshipRequired: {
                    type    : Boolean,
                    required: true
                },
                minMonthsToComplete : {
                    type    : Number,
                    required: true
                }
            },
            dateStart   : Date,
            dateEnd     : Date,
            status      : {
                type    : String,
                enum    : [
                    'waiting_confirm', // Aguardando confirmação (Não pagou a taxa de inscrição)
                    'matriculate', // Matriculado (Pagou a taxa de inscrição)
                    'completed' // Completo (Efetuou todas as atividades avaliativas e aguarda emissão do certificado)
                ],
                default : 'waiting_confirm',
                index: true,
                required: true
            }
        },
        status        : {
            type    : String,
            enum    : [
                'blocked', // Bloqueada (Quando e realizada pelo parceiro que ainda não recebeu a taxa de inscrição)
                'in_progress', // Em progresso (Taxa de inscrição paga e curso em andamento)
                'canceled', // Cancelada (Curso cancelado)
                'changed', // Trocada (Curso foi trocado por outro curso e aproveitou pagamento)
                'locked', // Trancada (Curso trancado)
                'completed' // Completa (Certificado emitido)
            ],
            default : 'in_progress',
            required: true
        }
    },
    indexes   : [
        {
            fields : {
                cpf                            : 1,
                status                         : 1,
                'registryCourse.course.acronym': 1
            },
            options: {
                unique: 'already_enrolled',
                name  : 'dup_enrol'
            }
        }
    ],
    post      : {
        findOneAndUpdate: [
            checkActivitiesGrade,
            checkRecuperation,
            checkDisciplineGrade
        ]
    }
};