export default (userDataPrefix) => ({
    tokens: {
        donationAlert: "",
        donatePay: ""
    },

    assets: {
        userDataPrefix,
        images: [],
        sounds: []
    },

    spinChances: {
        silver: 10,
        gold: 1
    },

    tasks: [],

    money: {
        func: "add",
        funcA: 100,
        startAmountForSpin: 300,
    },

    repeats: {
        allow: false
    },

    discount: {
        time: 15,
        duration: 1,
        chance: 50,
        value: 0.5
    },

    windows: {
        roulette: {
            appearance: {
                animation: "slide-down",
                duration: 0.5,
                delay: 5
            },
            spinning: {
                duration: 10,
                cards: 200
            },
            width: 930,
            height: 250,

            paddingTop: 40,
            paddingRight: 40,
            paddingBottom: 40,
            paddingLeft: 40,

            cardWidth: 160,
            cardHeight: 160,

            textOffset: 0,

            color: "#00ff00",
            colorBronze: "#cd5832",
            colorSilver: "#b8b8b8",
            colorGold: "#ffd700",

            images: {
                bg: null,
                frame: null,
                gold: null,
                silver: null,
                bronze: null
            },

            sound: {
                spin: null,
                appearance: null,
                discount: null,
                gold: null,
                silver: null,
                bronze: null
            }
        },

        widgets: [
            {
                id: 1,
                name: "Счет",
                bg: null,
                color: "#00ff00",
                layers: [
                    {
                        id: 1,
                        text: "Осталось {money.amount - money.earned}₽",
                        duration: 2,
                        condition: { discount: false }
                    },
                    {
                        id: 2,
                        text: "Скидка {discount.value * 100}%",
                        duration: 2,
                        condition: { discount: true }
                    },
                    {
                        id: 3,
                        text: "Осталось {Math.ceil((money.amount - money.earned) * discount.value) - money.discountEarned}₽",
                        duration: 2,
                        condition: { discount: true }
                    }
                ],
                width: 250,
                height: 50
            }
        ]
    },
});