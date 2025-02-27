```js
/**
 * 프로미스 배열을 동시에 지정된 개수만큼만 실행하는 함수
 * @param {Array<() => Promise>} tasks - 실행할 프로미스를 반환하는 함수들의 배열
 * @param {number} concurrency - 동시에 실행할 프로미스의 최대 개수
 * @param {Object} options - 추가 옵션
 * @param {boolean} options.withTimer - 타이머 표시 여부 (기본값: false)
 * @returns {Promise<Array>} 모든 프로미스의 결과값 배열
 */
async function promisePool(tasks, concurrency = 2, options = {}) {
    if (!Array.isArray(tasks)) {
        throw new Error('tasks must be an array');
    }
    if (typeof concurrency !== 'number' || concurrency < 1) {
        throw new Error('concurrency must be a positive number');
    }

    const startTime = Date.now();
    let timer;

    // 타이머 설정 (옵션)
    if (options.withTimer) {
        timer = setInterval(() => {
            const elapsed = (Date.now() - startTime) / 1000;
            console.log(`⏱ ${elapsed.toFixed(1)}초 경과`);
        }, 1000);
    }

    try {
        const pool = new Set();
        const results = [];

        // 각 태스크 실행
        for (const task of tasks) {
            if (typeof task !== 'function') {
                throw new Error('Each task must be a function that returns a Promise');
            }

            // 풀이 가득 찼다면 하나가 완료될 때까지 대기
            if (pool.size >= concurrency) {
                await Promise.race(pool);
            }

            // 새로운 프로미스 생성 및 풀에 추가
            const promise = task().then(val => {
                pool.delete(promise);
                results.push(val);
                return val;
            }).catch(err => {
                pool.delete(promise);
                throw err;
            });

            pool.add(promise);
        }

        // 남은 프로미스들이 모두 완료될 때까지 대기
        await Promise.all(pool);

        // 타이머 정리
        if (timer) {
            clearInterval(timer);
            const totalTime = (Date.now() - startTime) / 1000;
            console.log(`\n총 실행 시간: ${totalTime.toFixed(1)}초`);
        }

        return results;

    } catch (error) {
        if (timer) clearInterval(timer);
        throw error;
    }
}

// 사용 예시:
async function example() {
    const tasks = [
        () => new Promise(r => setTimeout(() => {console.log('3초 경과 실행완료'); r('Task 3')}, 3000)),
        () => new Promise(r => setTimeout(() => {console.log('1초 경과 실행완료'); r('Task 1')}, 1000)),
        () => new Promise(r => setTimeout(() => {console.log('4초 경과 실행완료'); r('Task 4')}, 4000)),
        () => new Promise(r => setTimeout(() => {console.log('2초 경과 실행완료'); r('Task 2')}, 2000)),
        () => new Promise(r => setTimeout(() => {console.log('5초 경과 실행완료'); r('Task 5')}, 5000))
    ];

    try {
        const results = await promisePool(tasks, 2, { withTimer: true });
        console.log('Results:', results);
    } catch (error) {
        console.error('Error:', error);
    }
}

example(); // 예시 실행
```