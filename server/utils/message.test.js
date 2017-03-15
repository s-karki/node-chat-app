const expect = require("expect");
const {generateMessage, generateLocationMessage} = require("./message");



describe("generateMessage", () => {
    it("should generate the correct message object", () => { //synchronous test does not require done
        var from = "User";
        var text = "Sample message";
        var message = generateMessage(from, text);

        expect(message).toEqual({
            from,
            text,
            createdAt: new Date().getTime()
        });
    });
});

describe("generateLocationMessage", () => {
    it("should generate a correct Location object", () => {
        var from = "User";
        var lat = "100";
        var long = "200";

        var location = generateLocationMessage(from, lat, long);

        expect(location).toContain({
            from
        });

        expect(location.url).toEqual("https://www.google.com/maps?q=100,200");
        expect(location.createdAt).toBeA("number");
    });
});