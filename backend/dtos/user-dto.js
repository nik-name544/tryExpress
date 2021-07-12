module.exports = class UserDto {
    email;
    id;
    isActivated;

    constructor(model) {
        this.id = model._id
        this.email = model.email
        this.isActivated = model.isActivated
    }
}