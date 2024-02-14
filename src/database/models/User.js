module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        users_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        users_username: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        users_firstName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        users_lastName: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        users_email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        users_password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        user_types_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        users_image: {
            type: dataTypes.STRING(55),
            allowNull: true
        },
        users_active: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
    }
    let config = {
        timestamps: true,
        createdAt: 'users_created_at',
        updatedAt: 'users_updated_at',
        tableName: 'users'
    }

    const User = sequelize.define(alias, cols, config);

    User.associate =  function(models) {
        User.hasMany(models.User_Type, {
            as: 'user_type',
            foreignKey : "user_types_id"
        })
    }; 

    return User;
}