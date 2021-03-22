new Vue({
    el: '#app',
    data: {
        running: true,
        bolsonaroLife: 100,
        covidLife: 100,
        imgBolsonaro: 'img/bolsonaro-inicial.png',
        logs: [],
        countVacina: 0,
    },
    computed: {
        hasResult() {
            if (this.covidLife == 0) {
                this.imgBolsonaro = 'img/bolsonaro-win.png'
            } else if (this.bolsonaroLife == 0) {
                this.imgBolsonaro = 'img/bolsonaro-loser.png'
            }

            return this.bolsonaroLife == 0 || this.covidLife == 0
        },
        hasJacare() {
            return this.countVacina >= 3
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.bolsonaroLife = 100
            this.covidLife = 100
            this.logs = []
            this.imgBolsonaro = 'img/bolsonaro-inicial.png'
            this.countVacina  = 0

        },
        attack(especial) {
            this.hurt('covidLife', 5, 10, especial, 'Bolsonaro', 'Covid', 'player')
            if (this.covidLife > 0)
                this.hurt('bolsonaroLife', 6, 12, false, 'Covid', 'Bolsonaro', 'monster')
            
            this.imgBolsonaro = especial ? 'img/bolsonaro-vacina.png' : 'img/bolsonaro-taok.png'
            
            if (especial)
                this.countVacina++
        },
        hurt(atr, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[atr] = Math.max(this[atr] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        healAndHurt() {
            this.imgBolsonaro = this.bolsonaroLife > 50 ? 'img/bolsonaro-cloroquina-1.png' : 'img/bolsonaro-cloroquina-2.png'

            this.heal(10, 15)
            this.hurt('bolsonaroLife', 6, 12, false, 'Covid', 'Bolsonaro', 'monster')
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.bolsonaroLife = Math.min(this.bolsonaroLife + heal, 100)
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
        },
        getRandom(min, max) {
            const value = Math.random() *  (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls) {
            this.logs.unshift({text, cls })
        }
    },
    watch: {
        hasResult(value) {
            if (value) 
                this.running = false
        },
        hasJacare(value) {
            if (value) {
                this.imgBolsonaro = 'img/bolsonaro-jacare.png'
            }
                
        }
    }
})