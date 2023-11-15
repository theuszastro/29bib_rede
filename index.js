const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const rootPassword = '';

function tryMount() {
    return new Promise(async (r, rj) => {
        setTimeout(() => rj(), 10_000);

        console.log('mounting folders');

        await execAsync(`echo '${rootPassword}' | sudo -S -u root mount -a`);

        r();
    });
}

function tryGetIp() {
    return new Promise(async (r, rj) => {
        setTimeout(() => rj(), 10_000);

        console.log('getting ip');

        await execAsync(`echo '${rootPassword}' | sudo -S -u root dhclient`);

        r();
    });
}

(async () => {
    try {
        await tryMount();
    } catch (e) {
        try {
            await tryGetIp();
            await tryMount();
        } catch (e) {}
    }

    process.exit();
})();
