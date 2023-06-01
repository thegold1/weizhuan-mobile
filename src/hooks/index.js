export function useRemSize () {
    // 获取设备的宽度
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    if (deviceWidth >= 750) {
        deviceWidth = 750;
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320;
    }
    // 750px --> 1rem = 100px , 375px --> 1rem = 50px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + "px";
    // 设置字体大小
    document.querySelector("body").style.fontSize = 0.3 + 'rem';
}

import { ref, watch, computed, onMounted } from 'vue';

export function useCountdownTimer (countdownSeconds, onTick, onFinish) {
    const isCountingDown = ref(false);
    const remainingSeconds = ref(countdownSeconds);
    let timerId = null;

    const startCountdown = () => {
        isCountingDown.value = true;
        timerId = setInterval(() => {
            remainingSeconds.value -= 1;
            onTick(remainingSeconds.value);
            if (remainingSeconds.value === 0) {
                clearInterval(timerId);
                onFinish();
                remainingSeconds.value = countdownSeconds;
                isCountingDown.value = false;
            }
        }, 1000);
    };

    const stopCountdown = () => {
        clearInterval(timerId);
        isCountingDown.value = false;
        remainingSeconds.value = countdownSeconds;
    };

    // 计算当前倒计时剩余秒数百分比
    const remainingSecondsPercentage = computed(() => {
        return Math.floor((remainingSeconds.value / countdownSeconds) * 100);
    });

    // 清除定时器
    watch(isCountingDown, (newValue) => {
        if (!newValue) {
            clearInterval(timerId);
        }
    });

    return {
        isCountingDown,
        remainingSeconds,
        remainingSecondsPercentage,
        startCountdown,
        stopCountdown,
    };
}

export function useCopyText () {
    const copied = ref(false);
    function copyText(text) {
        navigator.clipboard
            ? navigator.clipboard.writeText(text)
                .then(() => {
                    copied.value = true;
                })
                .catch((error) => {
                    console.error("Copy failed: ", error);
                })
            : (() => {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'absolute';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.focus({ preventScroll: true });
                textarea.select();
                try {
                    document.execCommand('copy');
                    copied.value = true;
                } catch (error) {
                    console.error("Copy failed: ", error);
                }
                document.body.removeChild(textarea);
            })();
    }

    return { copied, copyText };
}

export function useCheckDeviceType() {
    const isMobile = ref(false)

    const { VITE_APP_ENV } = import.meta.env;

    onMounted(() => {
        const userAgentInfo = navigator.userAgent.toLowerCase()
        const agents = ['android', 'iphone', 'symbianos', 'windows phone', 'ipad', 'ipod']
        for (let i = 0; i < agents.length; i++) {
            if (userAgentInfo.indexOf(agents[i]) >= 0) {
                isMobile.value = true
                break
            }
        }
        if (!isMobile.value && VITE_APP_ENV === 'production') {
            window.location.href = 'https://www.weizhuan6.com/client/index.html'
        }
    })

    return { isMobile };
}
