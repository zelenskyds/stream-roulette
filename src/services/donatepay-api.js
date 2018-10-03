class DonatePay {
    timeout = 20;
    lastDonateId = null;

    constructor(token) {
        this.token = token;
        this.init().catch( err => console.error(err) );
    }

    async init() {
        const lastDonates = this.getLastNewDonates(1);
        if(lastDonates.length === 1) {
            this.lastDonateId = lastDonates[0].id;
        }
    }

    async getLastNewDonates(limit=25) {
        let result;
        try {
            result = await fetch(
                `http://donatepay.ru/api/v1/transactions?access_token=${this.token}&limit=${limit}&type=donation`
                + (this.lastDonateId? `&after=${ this.lastDonateId }`: '')
            );
            result = await result.json();
        } catch (e) {}

        if(result.status !== "success") {
            return [];
        }

        return result && result.data && result.data.filter( d => d.status === "user" || d.status === "success" );
    }

    onDonate(func) {
        this.clear();
        this.func = func;
        this.interval = setInterval(
            async () => {
                const donates = await this.getLastNewDonates();
                if(donates.length > 0) {
                    if(this.lastDonateId === null) {
                        this.lastDonateId = donates[0].id;
                        return
                    }

                    this.lastDonateId = donates[0].id;

                    for(const donate of donates) {
                        this.func({
                            username: donate.what,
                            amount: +donate.sum
                        });
                    }
                }
            },
            this.timeout * 1000
        )
    }

    update(token, timeout) {
        if(token) {
            this.token = token
        } else if(timeout > 20) {
            this.timeout = timeout;
        } else {
            return
        }

        this.clear();
        this.onDonate(this.func);
    }

    clear() {
        if(this.interval) {
            clearInterval(this.interval)
        }
    }
}

export default DonatePay;