module.exports = (sequelize, dataTypes) => {
    let alias = 'Mark';
    let cols = {
        marks_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        marks_description: {
            type: dataTypes.STRING(75),
            allowNull: false
        },
    }
    let config = {
        timestamps: false,
        tableName: 'marks'
    }

    const Mark = sequelize.define(alias, cols, config);

    Mark.associate =  function(models) {
        Mark.hasMany(models.Product, {
            as: 'product',
            foreignKey : "marks_id"
        })
    }; 

    return Mark;
}