import axios from 'axios'
import store from '../REDUX/store';
import { login, logout } from "../REDUX/auth/authSlice";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // 401 에러이고, 이전에 재시도하지 않은 경우
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // 이미 토큰 갱신 중이라면, 갱신 완료 후 원래 요청을 재시도하기 위해 큐에 추가
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                .then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axiosInstance(originalRequest);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true; // 재시도 플래그 설정
            isRefreshing = true;

            try {
                // refresh token으로 새로운 access token 요청 (refresh token은 HTTP Only 쿠키로 자동 전송될 것임)
                const response = await axios.post('/api/v1/user/refresh-token'); // 백엔드의 refresh token 엔드포인트
                const { access_token, user_id } = response.data;

                store.dispatch(login({ token: access_token, userId: user_id })); // Redux 상태 업데이트
                axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + access_token; // 새 토큰으로 기본 헤더 업데이트
                processQueue(null, access_token); // 대기 중인 요청들 처리

                return axiosInstance(originalRequest); // 원래 요청 재시도
            } catch (refreshError) {
                store.dispatch(logout()); // refresh token이 유효하지 않거나 만료된 경우 (로그아웃 처리)
                processQueue(refreshError, null); // 대기 중인 요청들 에러 처리
                // 로그인 페이지로 리다이렉트 또는 에러 메시지 표시
                window.location.href = "/login"; // 로그인 페이지로 이동
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;