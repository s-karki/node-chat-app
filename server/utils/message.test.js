const expect = require("expect");
const {generateMessage} = require("./message");



describe("generateMessage", () => {
    it("should generate the correct message object", () => { //synchronous test does not require done
        var from = "User";
        var text = "Sample message";
        message = generateMessage(from, text);

        expect(message).toEqual({
            from,
            text,
            createdAt: new Date().getTime()
        });
    });
});