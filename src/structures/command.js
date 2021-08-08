class Command {

    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.aliases = options.aliases;
        this.arguments = options.arguments;
        // this.botPermissions = options.botPermissions;
        // this.userPermissions = options.userPermissions;

        this.run = options.run;
    }
}

module.exports = Command;