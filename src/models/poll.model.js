import joi from 'joi';
export const poolSchema = joi.object({
    title:joi.string().required().min(3),
    expireAt:joi.string().optional()
})