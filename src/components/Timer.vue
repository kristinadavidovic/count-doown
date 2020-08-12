<template>
    <div class="timer">
        <div class="timer__controls">
            <button
                data-time="300"
                @click.prevent="startTimer"
                class="timer__button"
            >
                5
            </button>
            <button
                data-time="900"
                @click.prevent="startTimer"
                class="timer__button"
            >
                15
            </button>
            <button
                data-time="1200"
                @click.prevent="startTimer"
                class="timer__button"
            >
                20
            </button>
            <div class="timer__form">
                <form
                    name="customForm"
                    @submit.prevent="customMinutes"
                    ref="form"
                >
                    <input
                        type="text"
                        name="minutes"
                        placeholder="Enter Minutes"
                    />
                    <button type="submit"></button>
                </form>
            </div>
        </div>
        <div class="display">
            <h1 class="display__time-left">{{ timeLeft }}</h1>
            <p class="display__end-time" v-if="countdown">
                {{ timeEndsAt }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Timer',
        data() {
            return {
                timeLeft: 0,
                timeEndsAt: 0,
                countdown: null,
            };
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
