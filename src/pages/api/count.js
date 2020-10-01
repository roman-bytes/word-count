let totalCount = 0;
let lastId;

function hasNumber(str) {
    return /\d/.test(str);
}

function containsSpecialCharacters(str){
    var regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]/g;
    return regex.test(str);
}

export default (req, res) => {
    console.log('totalCount', totalCount);
    const { id, message } = req.body;

    // Ensure that we have a string to work with
    if (typeof message !== 'string') {
        res.status(400).json({
            status: 400,
            message: 'The message you sent is not a string. Please try again.'
        });
        return;
    }

    // Make sure we do not have a string of numbers, because those are still not words
    if (hasNumber(message)) {
        res.status(400).json({
            status: 400,
            message: 'Ahhh ahh ahh, this string contains numbers and those are not words.'
        });
        return;
    }

    // Make sure the string does not have special charcters
    if (containsSpecialCharacters(message)) {
        res.status(400).json({
            status: 400,
            message: 'WHOA! Those are funky looking words. Please do not use any special charcters'
        });
        return;
    }

    // Make sure that the same message is not being sent.
    if (id === lastId) {
        res.status(400).json({
            status: 400,
            message: 'You can not send the same message twice'
        });
        return;
    }

    // Cache the id for the next message
    lastId = id;

    // Clean up input in case of multiple spaces between words to get correct count
    const trimMessage = message && message.replace(/ +(?= )/g, '').trim();
    totalCount = trimMessage.split(' ').length + totalCount;

    if (message.length) {
        res.status(200).json({ count: totalCount });
    } else {
        res.statusCode = 400;
        res.send = 'Something happened......not totally sure what. Find admin.';
    }
};
