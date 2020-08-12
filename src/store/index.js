import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        savedTimers: [
            {
                id: 1,
                minutes: 5,
                seconds: 300,
            },
            {
                id: 2,
                minutes: 10,
                seconds: 600,
            },
            {
                id: 3,
                minutes: 15,
                seconds: 900,
            },
            {
                id: 4,
                minutes: 20,
                seconds: 1200,
            },
        ],
    },
    mutations: {},
});

export default store;
