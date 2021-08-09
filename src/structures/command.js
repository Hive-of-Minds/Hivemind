class Command {

    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.emoji = options.emoji;
        this.aliases = options.aliases;
        this.arguments = options.arguments;
        this.botPermissions = options.botPermissions;
        this.userPermissions = options.userPermissions;
        this.cooldown = options.cooldown;
        this.ownerOnly = options.ownerOnly;
        this.hidden = options.hidden;
        this.run = options.run;
    }
}

module.exports = Command;