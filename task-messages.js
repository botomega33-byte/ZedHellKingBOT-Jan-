const fs = require('fs');

async function startMessageLoop(api) {
    let counter = 0;
    console.log("🔄 تم إطلاق مهمة إرسال الرسائل اللانهائية لكافة المجموعات...");

    while (true) {
        try {
            const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
            const messagesList = config.messages;
            const activeGroups = config.groups.filter(g => g && g.trim().length > 0);

            if (messagesList.length > 0 && activeGroups.length > 0) {

                const signature = "\n\n𝐁̶̷̸𝐎̲̍𝐓̶̷̸ 卍 𝐙̶̷̸𝐄̲̍𝐃̶̷̸ 卍 𝐇̶̷̸𝐄̲̍𝐋̶̷̸𝐋̲̍ 卍 𝐊̶̷̸𝐈̲̍𝐍̶̷̸𝐆̲̍";

                const textToSend =
                    messagesList[counter % messagesList.length] + signature;

                for (const gID of activeGroups) {
                    api.sendMessage(textToSend, gID, (err) => {
                        if (!err) {
                            console.log(`📤 [رسائل] تم إرسال رسالة للمجموعة (${gID})`);
                        }
                    });
                }

                counter++;
            }

            await new Promise(resolve => setTimeout(resolve, 15000));

        } catch (error) {
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

module.exports = startMessageLoop;
