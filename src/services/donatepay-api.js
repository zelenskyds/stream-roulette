import axios from 'axios';
import SockJS from 'sockjs-client'

class DonatePay {
    constructor(token) {
        this.token = token;
        this.init().catch( err => console.error(err) );
    }

    async init() {
        if(!this.token) {
            return
        }

        const { data: html } = await axios.get(
            'http://widget.donatepay.ru/alert-box/widget/' + this.token
        );

        const match_user = html.match(/function\sgetUserId\(\)\s{\s*return\sparseInt\('([\w\d]+)'\);/);
        const match_csrf = html.match(/function\scsrf\(\)\s{\s*return\s'([\w\d]+)';/);
        const userId = match_user && match_user[1];
        const csrf = match_csrf && match_csrf[1];

        const { data: { time, token } } = await axios.post(
            'http://widget.donatepay.ru/socket/token',
            `_token=${csrf}&token=${this.token}`
        );


        let uid = 0;
        this.socket = new SockJS("http://136.243.1.101:3002/connection");
        this.socket.onopen = () => {
            this.socket.send(JSON.stringify({
                "method": "connect",
                "params": {
                    "user": userId,
                    "info": "",
                    "timestamp": time.toString(),
                    "token": token
                },
                "uid": (++uid).toString()
            }))
        };

        this.socket.onmessage = (e) => {
            const result = JSON.parse(e.data);
            if(result.method === "connect") {
                this.socket.send(
                    JSON.stringify([
                        {
                            "method": "subscribe",
                            "params": { "channel": `notifications#${userId}` },
                            "uid": (++uid).toString()
                        }
                    ])
                )
            } else if(result.method === "message") {
                const donate = JSON.parse(result.body.data.notification.vars);

                this.func({
                    username: donate.name,
                    amount: +donate.sum,
                    message: donate.comment
                });
            }
        }
    }

    onDonate(func) {
        this.func = func;
    }

    update(token) {
        if(token) {
            this.socket.close();
            this.init();
        }
    }
}

export default DonatePay;