// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: 'my-app',
        script: 'src/index.js', // Đường dẫn đến file chính của ứng dụng
        instances: 'max', // Số lượng instances; 'max' để sử dụng tất cả các CPU
        exec_mode: 'cluster', // Chạy ứng dụng ở chế độ cluster
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  