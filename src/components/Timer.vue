<template>
    <div class="timer">
        <div class="timer__controls">
            <button
                v-for="timer in savedTimers"
                :data-time="timer.seconds"
                class="timer__button"
                @click.prevent="startTimer"
            >
                {{ timer.minutes }}
            </button>
        </div>
        <div class="display">
            <h1 class="display__time-left">{{ timeLeft }}</h1>
            <p class="display__end-time" v-if="countdown">
                {{ timeEndsAt }}
            </p>
        </div>
        <div class="timer__form">
            <form name="customForm" @submit.prevent="customMinutes" ref="form">
                <input
                    type="number"
                    name="minutes"
                    placeholder="Enter Minutes"
                />
                <button type="submit"></button>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'Timer',
        data() {
            return {
                timeLeft: 0,
                timeEndsAt: 0,
                countdown: null,
            };
        },
        computed: {
            ...mapState(['savedTimers']),
        },
        methods: {
            timer(seconds) {
                clearInterval(this.countdown);

                const now = Date.now();
                const then = now + seconds * 1000;

                this.displayTimeLeft(seconds);
                this.displayEndTime(then);

                this.countdown = setInterval(() => {
                    const secondsLeft = Math.round((then - Date.now()) / 1000);
                    if (secondsLeft < 0) {
                        clearInterval(this.countdown);
                        return;
                    }

                    this.displayTimeLeft(secondsLeft);
                }, 1000);
            },
            startTimer() {
                const seconds = parseInt(event.target.dataset.time);
                this.timer(seconds);
            },
            displayTimeLeft(seconds) {
                const minutes = Math.floor(seconds / 60);
                const remainderSeconds = `${seconds % 60}`.padStart(2, '0');
                this.timeLeft = `${minutes}:${remainderSeconds}`;
            },
            displayEndTime(timestamp) {
                const end = new Date(timestamp);
                const hours = end.getHours();
                const minutes = `${end.getMinutes()}`.padStart(2, '0');
                this.timeEndsAt = `Timer ends at ${hours}:${minutes}.`;
            },
            customMinutes(submitEvent) {
                const seconds =
                    parseInt(submitEvent.target.elements.minutes.value) * 60;
                this.timer(seconds);
                this.$refs.form.reset();
            },
        },
    };
</script>
