module.exports = (sequelize, dataTypes) => {
    let alias = 'User_Type';
    let cols = {
        user_types_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_types_description: {
            type: dataTypes.STRING(75),
            allowNull: false
        },
    }
    let config = {
        timestamps: false,
        tableName: 'user_types'
    }

    const User_Type = sequelize.define(alias, cols, config);

    User_Type.associate =  function(models) {
        User_Type.hasMany(models.User, {
            as: 'user',
            foreignKey : "user_types_id"
        })
    }; 

    return User_Type;
}