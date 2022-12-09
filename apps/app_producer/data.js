const ITALY_DISHES = ['pizza', 'risotto', 'pasta', 'lasagne']
const JAPAN_DISHES = ['ramen', 'sushi', 'tempura', 'tofu']
const INDIA_DISHES = ['tikka_massala', 'biryani', 'madras_curry', 'mutter_panner']
const PERU_DISHES = ['lomo_saltado', 'ceviche', 'arroz_con_pato', 'aji_de_gallina']
const SOUTH_AFRICA_DISHES = ['bobotie', 'potjiekos', 'boerewors', 'mealie_pap']

const data = [
    {
        id: 'italy',
        httpPort: '7001',
        weigth: 1,
        dishes: ITALY_DISHES
    },{
        id: 'japan',
        httpPort: '7002',
        weigth: 2,
        dishes: JAPAN_DISHES
    },{
        id: 'india',
        httpPort: '7003',
        weigth: 3,
        dishes: INDIA_DISHES
    },{
        id: 'peru',
        httpPort: '7004',
        weigth: 4,
        dishes: PERU_DISHES
    },{
        id: 'south_africa',
        httpPort: '7005',
        weigth: 5,
        dishes: SOUTH_AFRICA_DISHES
    },
]

const getServer = (serverId) => {
    const serverData = data.find(({ id }) => id === serverId)
    if(!serverData) return

    return serverData
}

module.exports = { data, getServer }
