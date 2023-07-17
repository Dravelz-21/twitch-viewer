var channelID = 'xqc';
let live = false;
let alreadySwitched = false;
let platformSwitchBtn = document.getElementById('platformSwitch');


function selectChannel() {
    let alert = prompt("Channel selector", "xqc");
    channelID = alert
    document.getElementById('twitch-player').src = `https://player.twitch.tv/?channel=${channelID}&enableExtensions=false&muted=false&parent=twitch-viewer-demo.netlify.app&player=popout&quality=720p60&volume=0.2`;
    document.getElementById('twitch-chat').src = `https://www.giambaj.it/twitch/jchat/v2/?channel=${channelID}&bots=true&hide_commands=true&size=1&font=2`;
};

selectChannel();

async function checkStream(channel) {
    try {
        let response = await fetch(`https://kick.com/api/v2/channels/${channel}`);
        let data = await response.json();
        if(response.status === 200){
            if(data.livestream.is_live == true){
                return setLive();
            }
        };
        } catch (err ) {
            return setOffline(); 
    }
};

function setLive() {
    live = true;
};

function setOffline() {
    live = false;
};

function switchPlatform() {
    if(platformSwitchBtn.getAttribute('current') === 'twitch') {
        document.getElementById('twitch-player').src = `https://player.kick.com/${channelID}?autoplay=true&muted=false&allowfullscreen=true`;
        document.getElementById('twitch-chat').src = `https://kicktools.ayybabz.com/fusion_chat/fusion-chat.html?kick=${channelID}&twitch=&youtube=&font=Roboto&fontSize=medium&fontShadow=shadow-na&fontColor=%23ffffff&theme=kickgreen&fontCase=none&timestamp=on&platformBadges=on&userBadges=on&bots=on&highlight=on&fadeTime=30`;
        platformSwitchBtn.setAttribute("current", "kick");
        document.getElementById('kick-icon').style.opacity = 0;
        platformSwitchBtn.style.opacity = 0;
        alreadySwitched = true;
    } else if(platformSwitchBtn.getAttribute('current') === 'kick') {
        document.getElementById('twitch-player').src = `https://player.twitch.tv/?channel=${channelID}&enableExtensions=false&muted=false&parent=twitch-viewer-demo.netlify.app&player=popout&quality=720p60&volume=0.2`;
        document.getElementById('twitch-chat').src = `https://www.giambaj.it/twitch/jchat/v2/?channel=${channelID}&bots=true&hide_commands=true&size=1&font=2`;
        platformSwitchBtn.setAttribute("current", "twitch");
        document.getElementById('kick-icon').style.opacity = 0;
        platformSwitchBtn.style.opacity = 0;
        alreadySwitched = false;
    }
}


function platformCheck() {
    checkStream(channelID);
    if(live){
        if(!alreadySwitched){
            switchPlatform();
        }
    } else if(!live){
        if(alreadySwitched){
            switchPlatform();
        }
    }
}

setInterval(() => {
    platformCheck();
}, 10000);

