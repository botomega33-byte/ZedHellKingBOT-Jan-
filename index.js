const fs = require('fs');
const path = require('path');
const express = require('express');
const readline = require('readline');

// Link loops logic execution pipelines directly to external automation modules
const startNicknameLoop = require('./task-nicknames');
const startMessageLoop = require('./task-messages');
const startGroupTitleLoop = require('./task-grouptitle');

process.on('unhandledRejection', () => {});
process.on('uncaughtException', () => {});

const apiNeroPath = path.join(__dirname, 'API-Nero', 'index.js');
const login = require(apiNeroPath); 

// Invoke system secure verification interface
verifyLocalUserSecurely();

function verifyLocalUserSecurely() {
    const rl = readline.createInterface({ 
        input: process.stdin, 
        output: process.stdout,
        terminal: true
    });

    console.clear();
    console.log("====================================================");
    console.log("🕵️‍♂️ SYSTEM CONTROL AUTOMATION - MATRIX INITIALIZED");
    console.log("====================================================\n");

    rl.question('🔑 Enter Username: ', (user) => {
        user = user.trim();
        rl.question('🔒 Enter Password: ', (pass) => {
            pass = pass.trim();

            let targetPort = 0;

            // Route matching identities explicitly directly to separated ports matrix
            if (user === "Shen" && pass === "8264500") {
                targetPort = 3050; 
            } else if (user === "YOULYUS2" && pass === "789456") {
                targetPort = 3060; 
            } else if (user === "YOULYUS" && pass === "9988552") {
                targetPort = 3070; 
            }

            if (targetPort !== 0) {
                console.log(`\n[SUCCESS] Access Granted for [${user}] on Isolated Port: ${targetPort}\n`);
                rl.close();
                runMainBotSystem(user, targetPort);
            } else {
                console.log("\n[DENIED] Invalid Credentials Registry Match! Exiting...");
                rl.close();
                process.exit(1);
            }
        });
    });
}

function runMainBotSystem(username, assignedPort) {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    const userConfigFile = path.join(__dirname, 'config_' + username + '.json');

    if (!fs.existsSync(userConfigFile)) {
        const defaultSettings = {
            groups: ["1548006183593196"], 
            groupTitle1: "👑 Dynamic Core Community " + username, 
            groupTitle2: "💥 International Alliance " + username,
            name1: "🔥 Army Mode " + username + " Alpha", 
            name2: "⚡ Army Mode " + username + " Beta", 
            messages: ["🤖 Automated engine deployed successfully for user: " + username]
        };
        fs.writeFileSync(userConfigFile, JSON.stringify(defaultSettings, null, 2), 'utf8');
    }
    try { fs.writeFileSync('config.json', fs.readFileSync(userConfigFile)); } catch(e){}

    // 🌐 Web management panel configuration router
    app.get('/', (req, res) => {
        const config = JSON.parse(fs.readFileSync(userConfigFile, 'utf8'));
        const displayedMessages = config.messages ? config.messages.join('\n') : '';
        
        let html = '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>𝐈 𝐀𝐌 𝐉𝐀𝐍!</title>';
        // تم تحديث الـ CSS الخاص باللوحة ليطابق الهوية المظلمة والفخمة مع الوهج الناري
        html += '<style>body { font-family: sans-serif; background: #0d0f12; color: #fff; text-align: center; padding: 20px; } ';
        html += '.header-king { background: #161a22; padding: 25px; border-radius: 12px; margin: 10px auto 25px auto; max-width: 480px; box-shadow: 0 4px 20px rgba(0,0,0,0.7); border: 1px solid #ff3838; } ';
        html += '.title-king { color: #0084FF; font-size: 28px; margin: 0; font-weight: bold; text-shadow: 0 0 10px rgba(0,132,255,0.4); } ';
        html += '.subtitle-king { color: #ff3838; font-size: 18px; margin: 5px 0 0 0; font-weight: bold; letter-spacing: 1px; text-shadow: 0 0 10px rgba(255,56,56,0.4); } ';
        html += '.card { background: #161a22; padding: 20px; border-radius: 10px; display: inline-block; text-align: right; width: 480px; border: 1px solid #2f3640; box-shadow: 0 4px 15px rgba(0,0,0,0.5); } ';
        html += 'input, textarea { width: 95%; padding: 10px; margin: 8px 0; background: #0d0f12; color: #fff; border: 1px solid #2f3640; border-radius: 5px; } ';
        html += 'input:focus, textarea:focus { border-color: #0084FF; outline: none; } ';
        html += 'button { background: #0084FF; color: #fff; padding: 12px; width: 100%; font-weight: bold; border-radius: 5px; cursor: pointer; border: none; margin-top: 15px; font-size: 15px; transition: 0.3s; } ';
        html += 'button:hover { background: #0066cc; box-shadow: 0 0 10px rgba(0,132,255,0.5); } ';
        html += 'h3 { color: #0084FF; border-bottom: 1px solid #2f3640; padding-bottom: 5px; margin-top: 15px; font-size: 16px; } ';
        html += 'label { font-weight: bold; color: #a4b0be; font-size: 13px; }</style></head>';
        html += '<body>';
        
        // 👑 حقن الشعار النرجسي الفخم المطلوب في أعلى صفحة الهوست
        html += '<div class="header-king">';
        html += '<h1 class="title-king">𝐈 𝐀𝐌 𝐉𝐀𝐍!</h1>';
        html += '<h2 class="subtitle-king">𝐘𝐎𝐔𝐑 𝐆𝐎𝐃𝐒 𝐅𝐄𝐀𝐑 𝐌𝐄</h2>';
        html += '</div>';

        html += '<h1>🤖 لوحة التحكم للمستخدم: <span style="color: #0084FF;">' + username + '</span></h1>';
        html += '<p style="color: #888; margin-bottom: 20px;">منفذك المخصص الآمن: ' + assignedPort + '</p>';
        html += '<div class="card"><form action="/update" method="POST">';
        html += '<h3>🎯 قائمة مجموعاتك المستهدفة (ID في سطر)</h3><textarea name="groups" rows="3" style="color: #0084FF; font-weight: bold;">' + (config.groups ? config.groups.join('\n') : '') + '</textarea>';
        html += '<h3>⚙️ إعدادات تدوير أسماء المجموعات (الاسمين المختلفين)</h3><label>الاسم الأول للمجموعة:</label><input type="text" name="groupTitle1" value="' + (config.groupTitle1 || '') + '"><label>الاسم الثاني للمجموعة:</label><input type="text" name="groupTitle2" value="' + (config.groupTitle2 || '') + '">';
        html += '<h3>⚙️ إعدادات تدوير كنيات الأعضاء (الكنيتين)</h3><label>الكنية الأولى للأعضاء:</label><input type="text" name="name1" value="' + (config.name1 || '') + '"><label>الكنية الثانية للأعضاء:</label><input type="text" name="name2" value="' + (config.name2 || '') + '">';
        html += '<h3>✉️ صندوق الرسائل اللانهائية المكررة والرد</h3><textarea name="messages" rows="3">' + displayedMessages + '</textarea>';
        html += '<button type="submit">💾 حفظ التعديلات وتحديث الجروبات فوراً</button></form></div></body></html>';
        
        res.send(html);
    });

    app.post('/update', (req, res) => {
        const config = JSON.parse(fs.readFileSync(userConfigFile, 'utf8'));
        config.groups = req.body.groups.split('\n').map(g => g.trim()).filter(g => g.length > 0);
        config.groupTitle1 = req.body.groupTitle1; config.groupTitle2 = req.body.groupTitle2;
        config.name1 = req.body.name1; config.name2 = req.body.name2;
        config.messages = req.body.messages.trim() ? [req.body.messages.trim()] : [];
        
        fs.writeFileSync(userConfigFile, JSON.stringify(config, null, 2), 'utf8');
        try { fs.writeFileSync('config.json', JSON.stringify(config, null, 2), 'utf8'); } catch(e){}
        res.send('<h2>✅ Configuration Updated Successfully!</h2><script>setTimeout(() => { window.location.href = "/"; }, 2000);</script>');
    });

    app.listen(assignedPort, '0.0.0.0', async () => {
        console.log(`\n🔗 [LOCAL ROUTER ALIVE] Dashboard host activated locally on port: ${assignedPort}`);
        
        try {
            const localtunnel = require('localtunnel');
            const secureTunnel = await localtunnel({ port: assignedPort });
            
            console.log(`====================================================`);
            console.log(`👑 CLOUD CONTROL GATEWAY LIVE FOR USER [${username}]`);
            console.log(`👉 WORLDWIDE ACCESS LINK: ${secureTunnel.url}`);
            console.log(`====================================================\n`);
            
            try {
                const { exec } = require('child_process');
                exec(`start chrome --new-window ${secureTunnel.url} 2>nul || start ${secureTunnel.url} 2>nul`);
            } catch (e) {}
            
            secureTunnel.on('close', () => {});
        } catch (tunnelError) {
            console.log(`⚠️ LocalTunnel execution deferred. Access local link via desktop env.`);
        }
    });

    const targetAppStatePath = path.join(__dirname, 'appstate.json');
    const cleanAppState = JSON.parse(fs.readFileSync(targetAppStatePath, 'utf8'));

    login({ appState: cleanAppState }, async (err, api) => {
        if (err) {
            console.log("❌ Facebook Login Failed!");
            return;
        }
        api.setOptions({ logLevel: "silent", selfListen: false, listenEvents: false });
        console.log("⚡ [SUCCESS] Bot execution loops active for: " + username);

        startNicknameLoop(api); 
        startMessageLoop(api); 
        startGroupTitleLoop(api);
    });
}
