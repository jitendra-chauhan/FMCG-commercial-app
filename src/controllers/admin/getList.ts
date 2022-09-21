import joi        from 'joi';
import mongo    from '../../connection/mongodb';

const payload = {
    body : joi.object().keys({
    }),
};

async function handler({
    body, user
}) {
    const {userId} = user;

    let userInfo = await mongo.fmcg.model(mongo.models.admins).findOne({ // Find admin data
        query:  {
            _id: userId
        },
    })
    // return newUser;
    userInfo.msg = "test auth."
    return userInfo // Return response
}

const exportObject = {
    payload,
    handler,
    auth:true,
    role:"admin"
}

export = exportObject