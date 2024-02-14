module.exports = (sequelize, dataTypes) => {
    let alias = 'Payment_Type';
    let cols = {
        payment_types_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        payment_types_description: {
            type: dataTypes.STRING(75),
            allowNull: false
        },
    }
    let config = {
        timestamps: false,
        tableName: 'payment_types'
    }

    const Payment_Type = sequelize.define(alias, cols, config);

//    Payment_Type.associate =  function(models) {
//        Payment_Type.hasMany(models.Order, {
//            as: 'order',
//            foreignKey : "payment_types_id"
//        })
//    }; 

    return Payment_Type;
}