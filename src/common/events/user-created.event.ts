export class UserCreatedEvent {
    constructor(readonly name: string, readonly email: string) { }
}