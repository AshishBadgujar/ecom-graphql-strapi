'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        const { amount, shippingAddress, city, state, pincode, user, items } = ctx.request.body

        const order = await strapi.db.query('api::order.order').create({
            data: {
                shippingAddress,
                city,
                state,
                pincode,
                amount,
                user,
                items
            }
        })
        return order
    }

}));
