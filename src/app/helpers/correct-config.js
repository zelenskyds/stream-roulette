const VERSION = "v0.4.2";

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
        isRouletteSpinning: false,
        money: {
            earned: 0,
            amount: config.money.startAmountForSpin,
            discountEarned: 0
        },
        donate: {},
        state: {
            discount: false
        }
    };

    return config
}