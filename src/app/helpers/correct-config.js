const VERSION = "v0.6.0";

export default function (config, screen) {
    if(config.windows.roulette.width >= screen.width) {
        config.windows.roulette.width = screen.width - 50;
    }

    if(!config.system || config.system.version !== VERSION) {
        config.system = {
            version: VERSION
        }
    }

    config.currentState = {
        isOpened: {
            controls: true
        },
        spinResults: [],
        money: {
            earned: 0,
            amount: config.money.startAmountForSpin,
            discountEarned: 0
        },
        donate: {},
        state: {
            discount: false,
            spinning: false
        }
    };

    return config
}