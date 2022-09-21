import joi        from 'joi';
import httpStatus from 'http-status';

import mongo    from '../../connection/mongodb';
import ApiError from '../../utils/ApiError';
import {CUSTOM_MESSAGE} from '../../constants';

const payload = {
    body : joi.object().keys({
        email    : joi.string().required().email(),
        password : joi.string().min(8).required(),
        firstName: joi.string().required(),
        lastName : joi.string().required(),
    }),
};

async function handler({
    body
}) {
    let { email, firstName, lastName, password } = body;

    let oldUser = await mongo.fmcg.model(mongo.models.admins).findOne({ // Find admin data
        query:  {
            email: email
        },
        select: { _id: 1}
    })
    if (oldUser) { // Check for above admin data
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.ACCOUNT_ALREADY_EXISTS)
    }
    let newUser  = await mongo.fmcg.model(mongo.models.admins).insertOne({ // Insert new record
        document: {
            email,
            password,
            firstName,
            lastName,
        }
    })
    // return newUser;
    newUser.msg = "User register successfully."
    return newUser // Return response
}

const exportObject = {
    payload,
    handler
}

export = exportObject